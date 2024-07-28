import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { getTotalGold, getGoldPrice, getExchangeRate } from '../../api/user';

const ProductList = () => {
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [goldPrice, setGoldPrice] = useState('Loading...');
    const [exchangeRate, setExchangeRate] = useState('Loading...');

    useEffect(() => {
        const fetchGoldAmount = async () => {
            try {
                const data = await getTotalGold();
                setGoldAmount(data.total_capacity);
                const gold_price_data = await getExchangeRate();
                setExchangeRate(gold_price_data.rate)
            } catch (error) {
                setGoldAmount('Error fetching data');
                setExchangeRate('Error fetching data');
            }
        };

        fetchGoldAmount();
    }, []);

    return (
        <div className="store">
            <div className="amount">
                <label>Gold amount</label>
                <span>{goldAmount}</span>
            </div>
            <div className="amount">
                <label>Exchange Rate</label>
                <span>{exchangeRate}</span>
            </div>
        </div>
    );
};

export default ProductList;