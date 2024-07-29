import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useTelegram } from '../../hooks/useTelegram';
import { getUserData, getTotalGold, getExchangeRate, getCurrencyGold, updateExchangeRate, buyGold } from '../../api/user';

const ProductList = () => {
    const { tg } = useTelegram();
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [currencyGoldAmount, setCurrencyGoldAmount] = useState('Loading...');
    const [exchangeRate, setExchangeRate] = useState('Loading...');
    const [goldPrice, setGoldPrice] = useState('Loading...');
    const [userBaseRate, setUserBaseRate] = useState(1);
    const [sellPriceInSilver, setSellPriceInSilver] = useState('Loading...');
    const [userId, setUserId] = useState(0);


    useEffect(() => {
        const fetchGoldAmount = async () => {
            const user = tg.initDataUnsafe?.user;
            if (user && user.id) {
                const telegramId = user.id;
                try {
                    // Отримання id користувача в бд
                    const data = await getUserData(telegramId)
                    setUserId(data.id
                    )
                    const totalGoldData = await getTotalGold();
                    const currencyGoldData = await getCurrencyGold();
                    const exchangeRateData = await getExchangeRate();

                    const totalGold = parseFloat(totalGoldData.total_capacity);
                    const currencyGold = parseFloat(currencyGoldData.currency_capacity);
                    const rate = parseFloat(exchangeRateData.rate);

                    if (isNaN(totalGold) || isNaN(currencyGold) || isNaN(rate)) {
                        throw new Error('Invalid data');
                    }

                    const calculatedPrice = rate + 0.000000000001 * (totalGold / userBaseRate)
                    setGoldPrice(calculatedPrice.toFixed(8)); // Округлюємо до 2 знаків після коми

                    setGoldAmount(totalGold);
                    setCurrencyGoldAmount(currencyGold);
                    setExchangeRate(rate.toFixed(8));

                    // Розрахунок ціни продажу золота за срібло
                    if (userBaseRate) {
                        const sellPrice = rate - 0.000000000001 * (totalGold / userBaseRate)
                        setSellPriceInSilver(sellPrice.toFixed(8));
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setGoldAmount('Error fetching data');
                    setExchangeRate('Error fetching data');
                    setGoldPrice('Error fetching data');
                }
            } else {
                setUserId('Error');
            }
        }
        fetchGoldAmount();
    }, [userBaseRate]);

    const handleSellOrBuyChange = (event) => {
        const user_input = parseFloat(event.target.value);
        if (!isNaN(user_input)) {
            setUserBaseRate(user_input);
        }
    };

    const handleButtonClick = () => {
        handleBuyGold();
        handleUpdateExchangeRate();
    }

    const handleBuyGold = async () => {
        try {
            const result = await buyGold(userId, userBaseRate);
            alert(`Successfully purchased. ${userId} ${userBaseRate}`)
        } catch (error) {
            console.log('Error buying gold:', error);
            alert(`Error buying gold ${userId} ${userBaseRate}`)
        }
    };

    const handleUpdateExchangeRate = async () => {
        try {
            const result = await updateExchangeRate(exchangeRate);
            if (result.success) {
                await fetchGoldAmount();
            }
            alert('Exchange rate successfully updated')
        } catch (error) {
            console.log('Error update exchange rate:', error)
            alert(`Error update exchange rate`)
        }
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
                <button onClick={handleButtonClick} className="buy-button">
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