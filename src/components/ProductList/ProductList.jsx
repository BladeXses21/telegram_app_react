import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { getTotalGold } from '../../api/user';

const ProductList = () => {
    const [goldAmount, setGoldAmount] = useState('Loading...');

    useEffect(() => {
        const fetchGoldAmount = async () => {
            try {
                const data = await getTotalGold();
                setGoldAmount(data.total_capacity);
            } catch (error) {
                setGoldAmount('Error fetching data');
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
        </div>
    );
};

export default ProductList;