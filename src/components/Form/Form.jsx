import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';
import { getUserData, getUserBalance } from '../../api/user';

const Form = () => {
    const { tg } = useTelegram();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('https://via.placeholder.com/150');
    const [userId, setUserId] = useState('Loading...');
    const [silverAmount, setSilverAmount] = useState('Loading...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = tg.initDataUnsafe?.user;
            if (user && user.id) {
                const telegramId = user.id;
                try {
                    const data = await getUserData(telegramId);
                    console.log('User data received:', data);
                    setUserId(data.uid);
                    // Fetch silver amount after getting userId
                    const balanceData = await getUserBalance(data.uid);
                    setSilverAmount(balanceData.silver || 0);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError(error.message);
                    setUserId('Error');
                    setSilverAmount('Error');
                }

                if (user.photo_url) {
                    setProfilePhotoUrl(user.photo_url);
                }
            } else {
                setProfilePhotoUrl('https://via.placeholder.com/150');
                setUserId('Error');
                setSilverAmount('Error');
            }
        };

        fetchUserData();
    }, [tg]);

    const username = tg.initDataUnsafe?.user?.username || 'Username not available';

    return (
        <div className="form">
            <h3>Ur data</h3>
            <div className="profile-info">
                <img src={profilePhotoUrl} alt="Profile" className="profile-photo" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                <span className="username">{username}</span>
            </div>
            <div className="amounts">
                <div className="amount">
                    <label>Статок</label>
                    <span>0</span>
                </div>
                <div className="amount">
                    <label>Gold amount</label>
                    <span>0</span>
                </div>
                <div className="amount">
                    <label>Silver amount</label>
                    <span>{silverAmount}</span>
                </div>
            </div>
            {error && <div className="error">Error: {error}</div>}
        </div>
    );
};

export default Form;
