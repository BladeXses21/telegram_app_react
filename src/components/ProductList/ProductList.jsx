import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useTelegram } from '../../hooks/useTelegram';
import { getUserData, getTotalGold, fetchUsers, fetchUserBalance, getExchangeRate, getCurrencyGold, updateExchangeRate, buyGold, sellGold } from '../../api/user';

const ProductList = () => {
    const { tg } = useTelegram();
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [currencyGoldAmount, setCurrencyGoldAmount] = useState('Loading...');
    const [exchangeRate, setExchangeRate] = useState('Loading...');
    const [goldPrice, setGoldPrice] = useState('Loading...');
    const [userBaseRate, setUserBaseRate] = useState(1);
    const [sellPriceInSilver, setSellPriceInSilver] = useState('Loading...');
    const [userId, setUserId] = useState('Loading...');
    const [reload, setReload] = useState(false);
    const [users, setUsers] = useState([]);
    const [balances, setBalances] = useState({});

    useEffect(() => {
        const fetchGoldAmount = async () => {
            const user = tg.initDataUnsafe?.user;
            if (user && user.id) {
                const telegramId = user.id;
                try {
                    // Отримання id користувача в бд
                    const data = await getUserData(telegramId);
                    setUserId(data.uid);

                    const totalGoldData = await getTotalGold();
                    const currencyGoldData = await getCurrencyGold();
                    const exchangeRateData = await getExchangeRate();

                    const totalGold = parseFloat(totalGoldData.total_capacity);
                    const currencyGold = parseFloat(currencyGoldData.currency_capacity);
                    const rate = parseFloat(exchangeRateData.rate);

                    if (isNaN(totalGold) || isNaN(currencyGold) || isNaN(rate)) {
                        throw new Error('Invalid data');
                    }

                    const calculatedPrice = rate + 0.000000000001 * (totalGold / userBaseRate)
                    setGoldPrice(calculatedPrice.toFixed(8)); // Округлюємо до 2 знаків після коми

                    setGoldAmount(totalGold);
                    setCurrencyGoldAmount(currencyGold);
                    setExchangeRate(rate.toFixed(8));

                    // Розрахунок ціни продажу золота за срібло
                    if (userBaseRate) {
                        const sellPrice = rate - 0.000000000001 * (totalGold / userBaseRate)
                        setSellPriceInSilver(sellPrice.toFixed(8));
                    }
                    try {
                        const usersData = await fetchUsers();
                        setUsers(usersData);

                        const balancesData = {};
                        for (const user of usersData) {
                            const balance = await fetchUserBalance(user.uid);
                            balancesData[user.uid] = balance;
                        }
                        setBalances(balancesData);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setGoldAmount('Error fetching data');
                    setExchangeRate('Error fetching data');
                    setGoldPrice('Error fetching data');
                }
            } else {
                setUserId('Error');
            }
        }
        setReload(false);
        fetchGoldAmount();
    }, [userBaseRate, tg, reload]);

    const handleBuyGoldButtonClick = async () => {
        await handleBuyGold();
        await handleUpdateExchangeRate();
        setReload(true); // refresh page 
    };

    const handleSellGoldButtonClick = async () => {
        await handleSellGold();
        await handleUpdateExchangeRate();
        setReload(true);
    };

    const handleSellOrBuyChange = (event) => {
        const user_input = parseFloat(event.target.value);
        if (!isNaN(user_input)) {
            setUserBaseRate(user_input);
        }
    };

    const handleSellGold = async () => {
        try {
            const result = await sellGold(userId, userBaseRate);
            alert(`Successfully sold. UserId ${userId} Rate ${userBaseRate}`);
        } catch (error) {
            console.log('Error sell gold:', error);
            alert(`Error selling gold ${userId} ${userBaseRate}`);
        }
    }

    const handleBuyGold = async () => {
        try {
            const result = await buyGold(userId, userBaseRate);
            alert(`Successfully purchased. ${userId} ${userBaseRate}`);
        } catch (error) {
            console.log('Error buying gold:', error);
            alert(`Error buying gold ${userId} ${userBaseRate}`);
        }
    };

    const handleUpdateExchangeRate = async () => {
        try {
            const result = await updateExchangeRate(goldPrice);
            alert('Exchange rate successfully updated')
        } catch (error) {
            console.log('Error update exchange rate:', error)
            alert(`Error update exchange rate`)
        }
    };

    return (
        <div className="product-list-container">
            <div className="info-container">
                <div className="amount">
                    <label>Total Gold Amount</label>
                    <span>{goldAmount}</span>
                </div>
                <div className="amount">
                    <label>Currency Gold Amount</label>
                    <span>{currencyGoldAmount}</span>
                </div>
                <div className="amount">
                    <label>Exchange Rate</label>
                    <span>{exchangeRate}</span>
                </div>
                <div className="amount">
                    <label>Silver to gold exchange rate</label>
                    <span>{goldPrice}</span>
                </div>
                <div className="amount">
                    <label>Gold to silver exchange rate</label>
                    <span>{sellPriceInSilver}</span>
                </div>
            </div>
            <div className="input-container">
                <label>Enter the amount of gold to buy or sell:</label>
                <input
                    type="number"
                    value={userBaseRate}
                    onChange={handleSellOrBuyChange}
                    step="1"
                    min="0"
                />
                <button onClick={handleBuyGoldButtonClick} className="buy-button">
                    Buy Gold
                </button>
                <button onClick={handleSellGoldButtonClick} className="sell-button">
                    Sell Gold
                </button>
            </div>
            <div className="user-list">
                <h2>User Balances</h2>
                <ul>
                    {users.map((user) => (
                        <div key={user.uid} className="user-item">
                            <h3>{user.username}</h3>
                            <ul>
                                {balances[user.uid] && balances[user.uid].map(balance => (
                                    <li key={balance.currency_name}>
                                        {balance.currency_name}: {balance.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductList;