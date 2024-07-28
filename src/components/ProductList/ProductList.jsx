import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { fetchMarketData } from '../../api/user';

const ProductList = () => {
    const [marketData, setMarketData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarketDataAsync = async () => {
            try {
                const data = await fetchMarketData();
                console.log('Market data received:', data);
                setMarketData(data);
            } catch (error) {
                console.error('Error fetching market data:', error);
                setError(error.message);
            }
        };

        fetchMarketDataAsync();
    }, []);

    return (
        <div className="product-list">
            <h3>Market Data</h3>
            {error && <div className="error">Error: {error}</div>}
            {marketData ? (
                <>
                    <div className="amounts">
                        <div className="amount">
                            <label>Gold Amount</label>
                            <span>{marketData.goldAmount}</span>
                        </div>
                        <div className="amount">
                            <label>Silver Price</label>
                            <span>{marketData.silverPrice}</span>
                        </div>
                    </div>
                    <h4>Users</h4>
                    <ul>
                        {marketData.users.map(user => (
                            <li key={user.id}>
                                {user.name} - Gold: {user.goldAmount}, Silver: {user.silverAmount}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProductList;
