import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import {LoginResponse, UserDto} from '../types/auth';
import useAuthStore from '../state/authStore';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {setToken, clearToken} = useAuthStore();
    const navigate = useNavigate();

    const login = async (userDto: UserDto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post<LoginResponse>('/Auth/Login', userDto);
            setToken(response.data.token);
            setLoading(false);
            navigate('/expenses'); // Redirect to a protected route after successful login
        } catch (err) {
            setLoading(false);
            setError('Login failed. Please check your username and password.');
        }
    };

    const register = async (userDto: UserDto) => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post('/Auth/Register', userDto);
            setLoading(false);
            alert('Registration successful! You can now log in.');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setLoading(false);
            setError('Registration failed. Please try again.');
        }
    };

    const logout = () => {
        clearToken();
        navigate('/login'); // Redirect to login after logout
    };

    return {
        login,
        register,
        logout,
        loading,
        error,
    };
};

export default useAuth;