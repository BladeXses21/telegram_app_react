import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const getUserUidByTelegramId = async (telegramId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/user/telegram/${telegramId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response ? error.response.data : error.message;
        console.error('Error fetching user UID:', errorMsg);
        throw new Error(errorMsg);
    }
};
