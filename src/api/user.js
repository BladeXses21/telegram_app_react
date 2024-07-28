import axios from 'axios';

const apiUrl = 'https://20be-91-245-124-201.ngrok-free.app';

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

// Отримання загальної кількості золота в системі
const getTotalGold = async () => {
    const response = await axios.get(`${API_URL}/api/total-gold`);
    return response.data;
};

// Отримання кількості золота у користувача
const getUserGold = async (userId) => {
    const response = await axios.get(`${API_URL}/api/user-gold/${userId}`);
    return response.data;
};

// Отримання кількості срібла у користувача
const getUserSilver = async (userId) => {
    const response = await axios.get(`${API_URL}/api/user-silver/${userId}`);
    return response.data;
};

// Отримання списку всіх користувачів та їх статків
const getUsersWealth = async () => {
    const response = await axios.get(`${API_URL}/api/users-wealth`);
    return response.data;
};

// Отримання поточної ціни золота за срібло
const getCurrentGoldPrice = async () => {
    const response = await axios.get(`${API_URL}/api/current-gold-price`);
    return response.data;
};


export { getUserData, getUserBalance, getTotalGold, getUserGold, getUserSilver, getUsersWealth, getCurrentGoldPrice };