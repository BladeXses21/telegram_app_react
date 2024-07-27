import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';
import { getUserUidByTelegramId, getUserBalance } from '../../api/user';

const Form = () => {
    const { tg } = useTelegram();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('https://via.placeholder.com/150');
    const [silverAmount, setSilverAmount] = useState(0);

    useEffect(() => {
        const fetchUserIdAndBalance = async () => {
            const user = tg.initDataUnsafe?.user;

            if (user) {
                try {
                    const userData = await getUserUidByTelegramId(user.id);
                    const uid = userData.uid;

                    // Отримання балансу Silver
                    const balanceResponse = await getUserBalance(uid);
                    setSilverAmount(balanceResponse.data.quantity || 0);
                } catch (error) {
                    console.error('Error fetching user or balance:', error);
                }
            }
        };

        fetchUserIdAndBalance();

        const user = tg.initDataUnsafe?.user;
        if (user) {
            setProfilePhotoUrl(user.photo_url || 'https://via.placeholder.com/150');
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
                    <span>{silverAmount}</span>
                </div>
            </div>
        </div>
    );
};

export default Form;
