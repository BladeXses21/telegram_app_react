import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useTelegram } from '../../hooks/useTelegram';
import { fetchMarketData, getUserData, getUserBalance, makeTransaction } from '../../api/user';

const ProductList = () => {
    const { tg, user } = useTelegram();
    const [users, setUsers] = useState([]);
    const [goldAmount, setGoldAmount] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);
    const [silverAmount, setSilverAmount] = useState(0);
    const [buyGoldAmount, setBuyGoldAmount] = useState(0);
    const [sellGoldAmount, setSellGoldAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const marketData = await fetchMarketData();
            setGoldAmount(marketData.goldAmount);
            setSilverPrice(marketData.silverPrice);
            setSilverAmount(marketData.silverAmount);
            setUsers(marketData.users);
        };
        fetchData();
    }, []);

    const handleBuyGold = async () => {
        try {
            await makeTransaction(user.id, buyGoldAmount, 'buy');
            setBuyGoldAmount(0);
            const marketData = await fetchMarketData();
            setGoldAmount(marketData.goldAmount);
            setSilverPrice(marketData.silverPrice);
            setSilverAmount(marketData.silverAmount);
            setUsers(marketData.users);
        } catch (error) {
            console.error('Error buying gold:', error);
        }
    };

    const handleSellGold = async () => {
        try {
            await makeTransaction(user.id, sellGoldAmount, 'sell');
            setSellGoldAmount(0);
            const marketData = await fetchMarketData();
            setGoldAmount(marketData.goldAmount);
            setSilverPrice(marketData.silverPrice);
            setSilverAmount(marketData.silverAmount);
            setUsers(marketData.users);
        } catch (error) {
            console.error('Error selling gold:', error);
        }
    };

    return (
        <div className="list">
            <h1>Сторінка торгівлі</h1>
            <div>
                <div className="market-data">
                    <h2>Ринкові дані</h2>
                    <p>Золото в системі: {goldAmount}</p>
                    <p>Срібло в системі: {silverAmount}</p>
                    <p>Курс золота до срібла: {silverPrice}</p>
                </div>
                <div className="transaction-section">
                    <div className="buy-section">
                        <h3>Купити золото</h3>
                        <input
                            type="number"
                            value={buyGoldAmount}
                            onChange={(e) => setBuyGoldAmount(e.target.value)}
                        />
                        <button onClick={handleBuyGold}>Купити</button>
                    </div>
                    <div className="sell-section">
                        <h3>Продати золото</h3>
                        <input
                            type="number"
                            value={sellGoldAmount}
                            onChange={(e) => setSellGoldAmount(e.target.value)}
                        />
                        <button onClick={handleSellGold}>Продати</button>
                    </div>
                </div>
                <h2>Інші користувачі</h2>
                {users.map((user) => (
                    <div key={user.username} className="user-card">
                        <p>Ім'я: {user.username}</p>
                        <p>Золото: {user.gold}</p>
                        <p>Срібло: {user.silver}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
