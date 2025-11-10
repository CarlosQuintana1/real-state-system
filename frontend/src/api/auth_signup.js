import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/user/`, userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};