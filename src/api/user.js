import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const getUserUidByTelegramId = async (telegramId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/user/telegram/${telegramId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user UID:', error);
        throw error;
    }
};

export const getUserBalance = async (uid) => {
    try {
        const response = await axios.get(`${apiUrl}/api/user/${uid}/balance`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user balance:', error);
        throw error;
    }
};
