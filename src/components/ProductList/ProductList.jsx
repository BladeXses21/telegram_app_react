import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { getTotalGold, getExchangeRate, getCurrencyGold } from '../../api/user';

const ProductList = () => {
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [currencyGoldAmount, setCurrencyGoldAmount] = useState('Loading...');
    const [exchangeRate, setExchangeRate] = useState('Loading...');
    const [goldPrice, setGoldPrice] = useState('Loading...');
    const [userBaseRate, setUserBaseRate] = useState(1);
    const [sellPriceInSilver, setSellPriceInSilver] = useState('Loading...');


    useEffect(() => {
        const fetchGoldAmount = async () => {
            try {
                const totalGoldData = await getTotalGold();
                const currencyGoldData = await getCurrencyGold();
                const exchangeRateData = await getExchangeRate();

                const totalGold = parseFloat(totalGoldData.total_capacity);
                const currencyGold = parseFloat(currencyGoldData.currency_capacity);
                const rate = parseFloat(exchangeRateData.rate);

                if (isNaN(totalGold) || isNaN(currencyGold) || isNaN(rate)) {
                    throw new Error('Invalid data');
                }

                const calculatedPrice = userBaseRate * (1 + rate * (currencyGold / totalGold));
                setGoldPrice(calculatedPrice.toFixed(2)); // Округлюємо до 2 знаків після коми

                setGoldAmount(totalGold);
                setCurrencyGoldAmount(currencyGold);
                setExchangeRate(rate);

                // Розрахунок ціни продажу золота за срібло
                if (userBaseRate) {
                    const sellPrice = userBaseRate * (1 + rate * (currencyGold / totalGold));
                    setSellPriceInSilver(sellPrice.toFixed(2));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setGoldAmount('Error fetching data');
                setExchangeRate('Error fetching data');
                setGoldPrice('Error fetching data');
            }
        };

        fetchGoldAmount();
    }, [userBaseRate]);

    const handleSellOrBuyChange = (event) => {
        const user_input = parseFloat(event.target.value);
        if (!isNaN(user_input)) {
            setUserBaseRate(user_input);
        }
    };

    const handleBuyGold = () => {
        // функціонал купівлі золота тут
        alert('Buy Gold functionality not implemented yet!');
    };

    const handleSellGold = () => {
        console.log('Sell gold clicked with amount:', amountToSell);
        // логіку продажу золота тут
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
                    step="0.1"
                    min="0"
                />
                <button onClick={handleBuyGold} className="buy-button">
                    Buy Gold
                </button>
                <button onClick={handleSellGold} className="sell-button">
                    Buy Gold
                </button>
            </div>
        </div>
    );
};

export default ProductList;