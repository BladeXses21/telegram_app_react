import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { getTotalGold, getExchangeRate, getCurrencyGold } from '../../api/user';

const ProductList = () => {
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [currencyGoldAmount, setCurrencyGoldAmount] = useState('Loading...');
    const [exchangeRate, setExchangeRate] = useState('Loading...');
    const [goldPrice, setGoldPrice] = useState('Loading...');
    const [baseRate, setBaseRate] = useState(1);

    useEffect(() => {
        const fetchGoldAmount = async () => {
            try {
                const total_gold_data = await getTotalGold();
                setGoldAmount(total_gold_data.total_capacity);

                const currency_gold_data = await getCurrencyGold();
                setCurrencyGoldAmount(currency_gold_data.currency_capacity);

                const exchange_rate = await getExchangeRate();
                setExchangeRate(exchange_rate.rate);

                const priceInSilver = baseRate * (1 + exchangeRate * (currencyGoldAmount.currency_capacity / goldAmount.total_capacity));
                setGoldPrice(priceInSilver);

            } catch (error) {
                setGoldAmount('Error fetching data');
                setCurrencyGoldAmount('Error fetching data');
                setExchangeRate('Error fetching data');
                setGoldPrice('Error calculating price');
            }
        };

        fetchGoldAmount();
    }, [baseRate]);

    const handleBaseRateChange = (event) => {
        const newBaseRate = parseFloat(event.target.value);
        if (!isNan(newBaseRate)) {
            setBaseRate(newBaseRate);
        }
    };

    return (
        <div className="store">
            <div className="amount">
                <label>Total Gold amount</label>
                <span>{goldAmount}</span>
            </div>
            <div className="amount">
                <label>Currency Gold amount</label>
                <span>{currencyGoldAmount}</span>
            </div>
            <div className="amount">
                <label>Exchange Rate</label>
                <span>{exchangeRate}</span>
            </div>
            <div className="amount">
                <label>Base Rate (User Input)</label>
                <input
                    type="number"
                    value={baseRate}
                    onChange={handleBaseRateChange}
                />
            </div>
            <div className="amount">
                <label>Current Gold Price in Silver</label>
                <span>{goldPrice}</span>
            </div>
        </div>
    );
};

export default ProductList;