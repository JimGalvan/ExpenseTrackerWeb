import axios from 'axios';
import authStore from "../state/authStore";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5107/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors can be added here to handle token refresh, etc.
axiosInstance.interceptors.request.use(
    (config) => {
        const token = authStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
