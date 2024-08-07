import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';
import { getUserData, getUserBalance, getExchangeRate } from '../../api/user';

const Form = () => {
    const { tg } = useTelegram();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('https://via.placeholder.com/150');
    const [userId, setUserId] = useState('Loading...');
    const [silverAmount, setSilverAmount] = useState('Loading...');
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [exchangeRate, setExchangeRate] = useState('Loading...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = tg.initDataUnsafe?.user;
            console.log('Telegram user data:', user);
            if (user && user.id) {
                const telegramId = user.id;
                try {
                    // Отримання id користувача в бд
                    const data = await getUserData(telegramId);
                    console.log('User data received:', data);
                    setUserId(data.uid);

                    // Fetch silver and gold amount after getting userId
                    const balanceData = await getUserBalance(data.uid);
                    const silverCurrency = balanceData.find(currency => currency.currency_name === 'Silver');
                    const goldCurrency = balanceData.find(currency => currency.currency_name === 'Gold');
                    const silverQuantity = silverCurrency ? parseInt(silverCurrency.quantity) : 0;
                    const goldQuantity = goldCurrency ? parseInt(goldCurrency.quantity) : 0;
                    setSilverAmount(silverQuantity);
                    setGoldAmount(goldQuantity);

                    // Обчислення еквівалент золота до срібла
                    const exchangeRateData = await getExchangeRate();
                    setExchangeRate(exchangeRateData.rate);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError(error.message);
                    setUserId('Error');
                    setSilverAmount('Error');
                    setGoldAmount('Error');
                }
            } else {
                setProfilePhotoUrl('https://via.placeholder.com/150');
                setUserId('Error');
                setSilverAmount('Error');
                setGoldAmount('Error');
            }
        };
        fetchUserData();
    }, [tg]);

    const username = tg.initDataUnsafe?.user?.username || 'Username not available';

    return (
        <div className="form">
            <h3>Your Data</h3>
            <div className="profile-info">
                <img
                    src={profilePhotoUrl}
                    alt="Profile"
                    className="profile-photo"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                />
                <span className="username">{username}</span>
            </div>
            <div className="amounts">
                <div className="amount">
                    <label>Статок</label>
                    <span>{goldAmount * exchangeRate}</span>
                </div>
                <div className="amount">
                    <label>Gold Amount</label>
                    <span>{goldAmount}</span>
                </div>
                <div className="amount">
                    <label>Silver Amount</label>
                    <span>{silverAmount}</span>
                </div>
            </div>
            {error && <div className="error">Error: {error}</div>}
        </div>
    );
};

export default Form;
