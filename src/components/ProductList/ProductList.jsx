import React, { useState, useEffect } from 'react';
import './ProductList.css';
import useBuyGold from '../../hooks/useBuyGold';
import { useTelegram } from '../../hooks/useTelegram';
import { getTotalGold, getExchangeRate, getCurrencyGold } from '../../api/user';

const ProductList = () => {
    const { tg } = useTelegram();
    const [goldAmount, setGoldAmount] = useState('Loading...');
    const [currencyGoldAmount, setCurrencyGoldAmount] = useState('Loading...');
    const [exchangeRate, setExchangeRate] = useState('Loading...');
    const [goldPrice, setGoldPrice] = useState('Loading...');
    const [userBaseRate, setUserBaseRate] = useState(1);
    const [sellPriceInSilver, setSellPriceInSilver] = useState('Loading...');
    const [amountToBuy, setAmountToBuy] = useState(0);
    const [amountToSell, setAmountToSell] = useState(0); // Додано для продажу золота

    const { buyGold, loading: buyingGold, error: buyGoldError } = useBuyGold();  // Використовуємо хук для покупки золота

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

                const calculatedPrice = rate + 0.000000000001 * (totalGold / userBaseRate)
                setGoldPrice(calculatedPrice.toFixed(10)); // Округлюємо до 2 знаків після коми

                setGoldAmount(totalGold);
                setCurrencyGoldAmount(currencyGold);
                setExchangeRate(rate.toFixed(10));

                // Розрахунок ціни продажу золота за срібло
                if (userBaseRate) {
                    const sellPrice = rate - 0.000000000001 * (totalGold / userBaseRate)
                    setSellPriceInSilver(sellPrice.toFixed(10));
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

    const handleAmountToBuyChange = (event) => {
        setAmountToBuy(parseFloat(event.target.value));
    };

    const handleAmountToSellChange = (event) => {
        setAmountToSell(parseFloat(event.target.value));
    };

    const handleBuyGold = async () => {
        try {
            const user = tg.initDataUnsafe?.user;
            if (user && user.id) {
                const userUid = user.id;
                const result = await buyGold(userUid, amountToBuy);

                if (result.success) {
                    // Оновлюємо дані після покупки
                    await fetchGoldAmount(); // Переконайтеся, що ця функція визначена в компоненті
                    alert('Gold purchased successfully!');
                } else {
                    alert('Failed to purchase gold.');
                }
            } else {
                alert('User ID is not available.');
            }
        } catch (error) {
            console.error('Error buying gold:', error);
            alert('Error buying gold.');
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
                <label>Enter the amount of gold to buy:</label>
                <input
                    type="number"
                    value={amountToBuy}
                    onChange={handleAmountToBuyChange}
                    step="0.1"
                    min="0"
                />
                <button onClick={handleBuyGold} className="buy-button" disabled={buyingGold}>
                    {buyingGold ? 'Buying...' : 'Buy Gold'}
                </button>
                {buyGoldError && <div className="error-message">{buyGoldError}</div>}

                <label>Enter the amount of gold to sell:</label>
                <input
                    type="number"
                    value={amountToSell}
                    onChange={handleAmountToSellChange}
                    step="0.1"
                    min="0"
                />
                <button onClick={handleSellGold} className="sell-button">
                    Sell Gold
                </button>
            </div>
        </div>
    );
};

export default ProductList;