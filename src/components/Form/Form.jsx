import React, { useState, useEffect } from 'react';
import './Form.css';
import {useTelegram} from '../../hooks/useTelegram'

const Form = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'send data'
        })
    }, [])

    useEffect(() => {
        if(!name || !lastname || email) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, lastname, email])

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    
    const onChangeLastname = (e) => {
        setLastname(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Ur data</h3>
            <input className={'input'} type='text' placeholder={'Name'} value={name} onChange={onChangeName}/>
            <input className={'input'} type='text' placeholder={'LastName'} value={lastname} onChange={onChangeLastname}/>
            <input className={'input'} type='text' placeholder={'email'} value={email} onChange={onChangeEmail}/>
        </div>
    );
};

export default Form;