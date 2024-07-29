import axios from 'axios';

const apiUrl = 'https://e0dc-91-245-124-201.ngrok-free.app';

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

const getTotalGold = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/total-gold`);
        console.log('Total Gold api response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in Total Gold API call:', error);
        throw new Error('Error: ' + error.message);
    }
};

const getCurrencyGold = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/currency-gold`);
        console.log('Currency Gold api response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in Currency Gold API call:', error);
        throw new Error('Error: ' + error.message);
    }
};

const getExchangeRate = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/get-rate`);
        console.log('Gold api response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in Gold API call:', error);
        throw new Error('Error: ' + error.message);
    }
};



export { getUserData, getUserBalance, getTotalGold, getCurrencyGold, getExchangeRate };