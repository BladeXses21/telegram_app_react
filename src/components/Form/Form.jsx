import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const { tg, user } = useTelegram();
    const apiUrl = 'http://localhost:8080';
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        tg.ready();

        const registerUser = async () => {
            if (tg.initDataUnsafe?.user) {
                const { username } = tg.initDataUnsafe.user;

                try {
                    await fetch(`${apiUrl}/api/user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username
                        })
                    });
                } catch (error) {
                    console.error('Error registering user:', error);
                }
            }
        };

        registerUser();
    }, [tg]);

    useEffect(() => {
        const user = tg.initDataUnsafe?.user;
        console.log('User Data:', user);

        if (user) {
            if (user.photo_url) {
                setProfilePhotoUrl(user.photo_url);
            } else {
                setProfilePhotoUrl('https://via.placeholder.com/150');
            }
        } else {
            setProfilePhotoUrl('https://via.placeholder.com/150');
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
                    <span>0</span>
                </div>
            </div>
        </div>
    );
};

export default Form;
