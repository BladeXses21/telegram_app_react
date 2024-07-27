import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'send data'
        });
    }, []);

    const username = tg.initDataUnsafe?.user?.username || 'Username not available';
    const profilePhotoUrl = tg.initDataUnsafe?.user?.photo_url || 'https://via.placeholder.com/150';

    return (
        <div className={"form"}>
            <h3>Ur data</h3>
            <div className="profile-info">
                <img src={profilePhotoUrl} alt="Profile" className="profile-photo" />
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
