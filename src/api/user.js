import axios from 'axios';

const apiUrl = 'https://6056-91-245-124-201.ngrok-free.app'; // todo - замінити url

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

const fetchUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/user`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const fetchUserBalance = async (uid) => {
    try {
    const response = await axios.get(`${API_URL}/user/${uid}/balance`);
    return response.data;
    } catch (error) {
        console.error('Error fetching user balance:', error);
        throw error;
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

const updateExchangeRate = async (newRate) => {
    try {
        const response = await axios.post(`${apiUrl}/api/update-rate`, { exchange_rate: newRate });
        console.log('Update Exchange Rate API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in Update Exchange Rate API call:', error);
        throw new Error('Error: ' + error.message);
    }
};

const buyGold = async (userUid, amount) => {
    try {
        const response = await axios.post(`${apiUrl}/api/buy-gold`, { userUid: userUid, amount: amount });
        console.log('Buy Gold API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in Buy Gold API call:', error);
        throw new Error('Error: ' + error.message);
    }
};

const sellGold = async (userUid, amount) => {
    try {
        const response = await axios.post(`${apiUrl}/api/sell-gold`, { userUid: userUid, amount: amount });
        console.log('Sell Gold API response:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error in Sell Gold API call', error);
        throw new Error('Error: ' + error.message);
    }
};

export { getUserData, fetchUsers, fetchUserBalance, getUserBalance, getTotalGold, getCurrencyGold, getExchangeRate, updateExchangeRate, buyGold, sellGold };