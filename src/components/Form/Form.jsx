import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const { tg } = useTelegram();
    const apiUrl = 'http://localhost:8080';
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('https://via.placeholder.com/150');
    const [id, setId] = useState(0);

    useEffect(() => {
        const fetchUserIdAndBalance = async () => {
            const user = tg.initDataUnsafe?.user;

            if (user) {
                const telegramId = user.id
                const userResponse = await fetch(`${apiUrl}/api/user/telegram/${telegramId}`);
                const userData = await userResponse.json();
                const uid = userData.uid;
                setId(uid);
            }

            if (user) {
                if (user.photo_url) {
                    setProfilePhotoUrl(user.photo_url);
                } else {
                    setProfilePhotoUrl('https://via.placeholder.com/150');
                }

            } else {
                setProfilePhotoUrl('https://via.placeholder.com/150');
            }
        }
    }, [tg]);

    const username = tg.initDataUnsafe?.user?.username || 'Username not available';

    return (
        <div className={"form"}>
            <h3>Ur data</h3>
            <div className="profile-info">
                <img src={profilePhotoUrl} alt="Profile" className="profile-photo" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                <span className={'username'}>{username}</span>
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
                    <span>{id}</span>
                </div>
            </div>
        </div>
    );
};

export default Form;
