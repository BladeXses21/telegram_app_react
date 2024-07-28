import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { getTotalGold, getGoldPrice } from '../../api/user';

const ProductList = () => {
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [goldPrice, setGoldPrice] = useState('Loading...');

    useEffect(() => {
        const fetchGoldAmount = async () => {
            try {
                const data = await getTotalGold();
                setGoldAmount(data.total_capacity);
                const gold_price_data = await getGoldPrice();
                setGoldPrice(gold_price_data.price_in_silver)
            } catch (error) {
                setGoldAmount('Error fetching data');
                setGoldPrice('Error fetching data');
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
                <label>Gold price</label>
                <span>{goldPrice}</span>
            </div>
        </div>
    );
};

export default ProductList;