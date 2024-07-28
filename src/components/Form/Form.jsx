import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';
import { getUserId, getUserBalance } from '../../api/user';

const Form = () => {
    const { tg } = useTelegram();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('https://via.placeholder.com/150');
    const [userId, setUserId] = useState('Loading...');
    const [silver, setSilver] = useState('Loading...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const telegramId = tg.initDataUnsafe?.user?.id;
                const data = await getUserId(telegramId);
                console.log('User data received:', data);
                setUserId(data.uid);
                const balance = await getUserBalance(telegramId);
                setSilver(balance.balance);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
                setUserId('Error');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const user = tg.initDataUnsafe?.user;
        if (user && user.photo_url) {
            setProfilePhotoUrl(user.photo_url);
        } else {
            setProfilePhotoUrl('https://via.placeholder.com/150');
        }
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
                    <span>{silver}</span>
                </div>
            </div>
            {error && <div className="error">Error: {error}</div>}
        </div>
    );
};

export default Form;
