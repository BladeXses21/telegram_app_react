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
    const response = await fetch(`${API_BASE_URL}/market-data`);
    const data = await response.json();
    return data;
};

const makeTransaction = async (userId, amount, transactionType) => {
    const response = await fetch(`${API_BASE_URL}/transaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            amount,
            transactionType
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return await response.json();
};

export { getUserData, getUserBalance, fetchMarketData, makeTransaction };