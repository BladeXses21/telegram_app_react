import { useState } from 'react';
import axios from 'axios';

const apiUrl = 'https://e0dc-91-245-124-201.ngrok-free.app'; // todo - замінити url

const useBuyGold = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const buyGold = async (userUid, amount) => {
        setLoading(true);
        setError(null);
        try {
            const exchangeRateResponse = await axios.get(`${apiUrl}/api/get-rate`);
            const exchangeRate = parseFloat(exchangeRateResponse.data.rate);

            const priceInSilver = amount * exchangeRate;

            // Виконати запит на покупку золота
            await axios.post(`${apiUrl}/api/buy-gold`, { user_uid: userUid, amount, price_in_silver: priceInSilver });

            // Оновити курс обміну
            await axios.post(`${apiUrl}/api/update-rate`, { exchange_rate: exchangeRate + 0.000000000001 * amount });

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { buyGold, loading, error };
};

export default useBuyGold;
