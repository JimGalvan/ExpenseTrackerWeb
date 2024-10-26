import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7218/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors can be added here to handle token refresh, etc.
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
