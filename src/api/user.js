import axios from 'axios';

const apiUrl = 'https://b84c-91-245-124-201.ngrok-free.app';

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

export default getUserData;
