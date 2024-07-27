import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
    const apiUrl = 'http://localhost:8080';
    const { tg, user } = useTelegram();
    // Стан для загальної кількості золота і ціни
    const [goldAmount, setGoldAmount] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);
    const [silverAmount, setSilverAmount] = useState(0);
    const [users, setUsers] = useState([]);

    // Стан для полів купівлі/продажу
    const [buyGoldAmount, setBuyGoldAmount] = useState(0);
    const [sellGoldAmount, setSellGoldAmount] = useState(0);

    // Стан для користувацького вводу
    const [userGoldInput, setUserGoldInput] = useState(0);
    const [userSilverInput, setUserSilverInput] = useState(0);

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

    // Запуск при монтуванні компонента
    useEffect(() => {
        // Тут ти б робив запити до бази даних, а поки просто ініціалізуємо дані
        setGoldAmount(100); // загальна кількість золота
        setSilverPrice(10); // ціна золота в сріблі
        setSilverAmount(500); // кількість срібла
        setUsers([
            { username: 'user1', gold: 20, silver: 150 },
            { username: 'user2', gold: 10, silver: 250 }
        ]);
    }, []);

    // Обробка покупки золота
    const handleBuyGold = () => {
        // Логіка для покупки золота
        const totalCost = buyGoldAmount * silverPrice;
        if (totalCost <= silverAmount) {
            setGoldAmount(goldAmount + buyGoldAmount);
            setSilverAmount(silverAmount - totalCost);
        } else {
            alert('Не вистачає срібла для покупки!');
        }
    };

    // Обробка продажу золота
    const handleSellGold = () => {
        // Логіка для продажу золота
        const totalEarnings = sellGoldAmount * silverPrice;
        if (sellGoldAmount <= goldAmount) {
            setGoldAmount(goldAmount - sellGoldAmount);
            setSilverAmount(silverAmount + totalEarnings);
        } else {
            alert('Не вистачає золота для продажу!');
        }
    };

    // Оновлення полів вводу
    const handleUserGoldInputChange = (e) => setUserGoldInput(Number(e.target.value));
    const handleUserSilverInputChange = (e) => setUserSilverInput(Number(e.target.value));

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
                    <button onClick={handleBuyGold}>Buy</button>
                </div>
                <div>
                    <h3>Sell Gold</h3>
                    <input
                        type="number"
                        value={sellGoldAmount}
                        onChange={(e) => setSellGoldAmount(Number(e.target.value))}
                        placeholder="Amount to sell"
                    />
                    <button onClick={handleSellGold}>Sell</button>
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
                        {users.map(user => (
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
