import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { fetchMarketData } from '../../api/user';
import { useTelegram } from '../../hooks/useTelegram';

const ProductList = () => {
    const { tg } = useTelegram();
    const [marketData, setMarketData] = useState(null);
    const [currentUserGold, setCurrentUserGold] = useState(0);
    const [currentUserSilver, setCurrentUserSilver] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarketDataAsync = async () => {
            try {
                const data = await fetchMarketData();
                setMarketData(data);

                // Отримання даних користувача
                const user = tg.initDataUnsafe?.user;
                if (user && user.id && data.users) {
                    const currentUser = data.users.find(u => u.id.toString() === user.id.toString());
                    if (currentUser) {
                        setCurrentUserGold(currentUser.goldAmount);
                        setCurrentUserSilver(currentUser.silverAmount);
                    }
                }
            } catch (error) {
                console.error('Error fetching market data:', error);
                setError(error.message);
            }
        };

        fetchMarketDataAsync();
    }, [tg]);

    return (
        <div className="product-list">
            <h1>Market Data</h1>
            {error && <div>Error: {error}</div>}
            {marketData ? (
                <div>
                    <div>
                        <h2>Total Gold in System: {marketData.goldAmount}</h2>
                        <h2>Total Silver in System: {marketData.silverAmount}</h2>
                        <h2>Gold to Silver Exchange Rate: {marketData.silverPrice}</h2>
                    </div>
                    <div>
                        <h2>Your Gold: {currentUserGold}</h2>
                        <h2>Your Silver: {currentUserSilver}</h2>
                    </div>
                    <h2>All Users</h2>
                    <ul>
                        {marketData.users.map(user => (
                            <li key={user.id}>
                                {user.name}: {user.goldAmount} Gold, {user.silverAmount} Silver
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProductList;
