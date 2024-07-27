import React, { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
//     const [name, setName] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [email, setEmail] = useState('');
    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'send data'
        });
    }, []);

    useEffect(() => {
        if (!name || !lastname || !email) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, lastname, email]);

//     const onChangeName = (e) => {
//         setName(e.target.value);
//     };
//
//     const onChangeLastname = (e) => {
//         setLastname(e.target.value);
//     };
//
//     const onChangeEmail = (e) => {
//         setEmail(e.target.value);
//     };

    const username = tg.initDataUnsafe?.user?.username || 'Username not available';
    const profilePhotoUrl = tg.initDataUnsafe?.user?.photo_url || 'https://via.placeholder.com/150';

    return (
        <div className={"form"}>
            <h3>Ur data</h3>
            <div className="profile-info">
                <img src={profilePhotoUrl} alt="Profile" className="profile-photo" />
                <span className={'username'}>{username}</span>
            </div>
{/*             <input className={'input'} type='text' placeholder={'Name'} value={name} onChange={onChangeName} /> */}
{/*             <input className={'input'} type='text' placeholder={'LastName'} value={lastname} onChange={onChangeLastname} /> */}
{/*             <input className={'input'} type='text' placeholder={'Email'} value={email} onChange={onChangeEmail} /> */}
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
