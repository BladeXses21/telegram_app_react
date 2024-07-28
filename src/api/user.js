import axios from 'axios';

const apiUrl = 'https://33ea-91-245-124-201.ngrok-free.app';

const getUserData = async (telegramUserId) => {
    try {
        const timestamp = new Date().getTime();
        const response = await axios.get(`${apiUrl}/api/user/telegram/${telegramUserId}?timestamp=${timestamp}`);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        throw new Error('Error: ' + error.message);
    }
};

const getUserBalance = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/user/${userId}/balance`);
        console.log('Balance API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in Balance API call:', error);
        throw new Error('Error: ' + error.message);
    }
};

const fetchMarketData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/market-data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching market data:', error);
        throw error;
    }
};

const makeTransaction = async (userId, amount, transactionType) => {
    try {
        await axios.post(`${apiUrl}/api/transaction`, {
            userId,
            amount,
            transactionType
        });
    } catch (error) {
        console.error('Error making transaction:', error);
        throw error;
    }
};

export { getUserData, getUserBalance, fetchMarketData, makeTransaction };