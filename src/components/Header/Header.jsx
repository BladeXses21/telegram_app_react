import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';

const Header = () => {
    const {tg, user, onClose} = useTelegram();

    return (
        <div class={'header'}>
            <Button onClick={onClose}>Закрити</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>
        </div>
    );
};

export default Header;