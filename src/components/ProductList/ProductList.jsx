import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useTelegram } from '../../hooks/useTelegram';
import { fetchMarketData, getUserData, getUserBalance, makeTransaction } from '../../api/user';

const ProductList = () => {
    const { tg, user } = useTelegram();
    const [goldAmount, setGoldAmount] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);
    const [silverAmount, setSilverAmount] = useState(0);
    const [users, setUsers] = useState([]);
    const [buyGoldAmount, setBuyGoldAmount] = useState(0);
    const [sellGoldAmount, setSellGoldAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const marketData = await fetchMarketData();
                const userData = await getUserData(user.id);
                const userBalance = await getUserBalance(user.id);

                setGoldAmount(Number(marketData.goldAmount));
                setSilverPrice(Number(marketData.silverPrice) || 1);
                setSilverAmount(Number(userBalance.silver));  // Отримуємо баланс конкретного користувача
                setUsers(marketData.users);
            } catch (error) {
                console.error('Error fetching market data:', error);
            }
        };

        fetchData();
    }, [user.id]);

    const handleBuyGold = async () => {
        if (buyGoldAmount <= 0) return;
        try {
            const totalCost = buyGoldAmount * silverPrice;
            if (totalCost <= silverAmount) {
                await makeTransaction(user.id, buyGoldAmount, 'buy');
                setGoldAmount(prevGoldAmount => prevGoldAmount + buyGoldAmount);
                setSilverAmount(prevSilverAmount => prevSilverAmount - totalCost);
            } else {
                alert('Не вистачає срібла для покупки!');
            }
        } catch (error) {
            console.error('Error buying gold:', error);
        }
    };

    const handleSellGold = async () => {
        if (sellGoldAmount <= 0) return;
        try {
            const totalEarnings = sellGoldAmount * silverPrice;
            if (sellGoldAmount <= goldAmount) {
                await makeTransaction(user.id, sellGoldAmount, 'sell');
                setGoldAmount(prevGoldAmount => prevGoldAmount - sellGoldAmount);
                setSilverAmount(prevSilverAmount => prevSilverAmount + totalEarnings);
            } else {
                alert('Не вистачає золота для продажу!');
            }
        } catch (error) {
            console.error('Error selling gold:', error);
        }
    };

    return (
        <div className="gold-market">
            <h2>Gold Market</h2>
            <div className="market-summary">
                <div>
                    <h3>Current Gold Amount:</h3>
                    <p>{goldAmount} Gold</p>
                </div>
                <div>
                    <h3>Silver Price per Gold:</h3>
                    <p>{silverPrice} Silver</p>
                </div>
                <div>
                    <h3>Current Silver Amount:</h3>
                    <p>{silverAmount} Silver</p>
                </div>
            </div>
            <div className="buy-sell">
                <div>
                    <h3>Buy Gold</h3>
                    <input
                        type="number"
                        value={buyGoldAmount}
                        onChange={(e) => setBuyGoldAmount(Number(e.target.value))}
                        placeholder="Amount to buy"
                    />
                    <button onClick={handleBuyGold} disabled={buyGoldAmount <= 0}>Buy</button>
                </div>
                <div>
                    <h3>Sell Gold</h3>
                    <input
                        type="number"
                        value={sellGoldAmount}
                        onChange={(e) => setSellGoldAmount(Number(e.target.value))}
                        placeholder="Amount to sell"
                    />
                    <button onClick={handleSellGold} disabled={sellGoldAmount <= 0}>Sell</button>
                </div>
            </div>
            <div className="user-list">
                <h3>Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Gold</th>
                            <th>Silver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.gold}</td>
                                <td>{user.silver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
