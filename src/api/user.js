import axios from 'axios';

const apiUrl = 'https://be95-91-245-124-201.ngrok-free.app';

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
        console.log('Market Data API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in Market Data API call:', error);
        throw new Error('Error: ' + error.message);
    }
};

export { getUserData, getUserBalance, fetchMarketData };