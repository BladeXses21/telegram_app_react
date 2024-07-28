import React, { useEffect, useState } from 'react';
import {
    getTotalGold,
    getUserGold,
    getUserSilver,
    getUsersWealth,
    getCurrentGoldPrice,
} from '../../api/user';

const ProductList = () => {
    const [totalGold, setTotalGold] = useState(0);
    const [userGold, setUserGold] = useState(0);
    const [userSilver, setUserSilver] = useState(0);
    const [usersWealth, setUsersWealth] = useState([]);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.ready();

        setUserId(tg.initDataUnsafe.user.id);

        const fetchData = async () => {
            try {
                const totalGoldData = await getTotalGold();
                const userGoldData = await getUserGold(tg.initDataUnsafe.user.id);
                const userSilverData = await getUserSilver(tg.initDataUnsafe.user.id);
                const usersWealthData = await getUsersWealth();
                const currentGoldPriceData = await getCurrentGoldPrice();

                setTotalGold(totalGoldData.total_gold);
                setUserGold(userGoldData.user_gold);
                setUserSilver(userSilverData.user_silver);
                setUsersWealth(usersWealthData);
                setCurrentGoldPrice(currentGoldPriceData.gold_price);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        if (tg.initDataUnsafe.user) {
            fetchData();
        }
    }, []);

    const handleBuy = async () => {
        try {
            const response = await buyGold(userId, amount);
            setMessage(response.message);
        } catch (error) {
            setMessage('Failed to buy gold');
        }
    };

    const handleSell = async () => {
        try {
            const response = await sellGold(userId, amount);
            setMessage(response.message);
        } catch (error) {
            setMessage('Failed to sell gold');
        }
    };

    return (
        <div>
            <h2>Trade Gold</h2>
            <p>Total Gold in System: {totalGold}</p>
            <p>Your Gold: {userGold}</p>
            <p>Your Silver: {userSilver}</p>
            <p>Current Gold Price: {currentGoldPrice} Silver</p>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button onClick={handleBuy}>Buy Gold</button>
            <button onClick={handleSell}>Sell Gold</button>
            {message && <p>{message}</p>}
            <h3>Users Wealth</h3>
            <ul>
                {usersWealth.map((user) => (
                    <li key={user.username}>
                        {user.username}: {user.total_wealth} Silver
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
