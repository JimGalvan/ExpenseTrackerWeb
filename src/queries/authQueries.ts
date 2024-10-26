import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import {LoginResponse, UserDto} from '../types/auth';
import useAuthStore from "../state/authStore";
import {useNavigate} from "react-router-dom";

export const useLoginMutation = () => {
    const setToken = useAuthStore((state) => state.setToken);
    const clearToken = useAuthStore((state) => state.clearToken);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, UserDto>({
        mutationFn: (userDto: UserDto) =>
            axiosInstance.post<LoginResponse>('/Auth/Login', userDto).then((res) => {
                return res.data;
            }),
        onSuccess: (data) => {
            setToken(data.token);
            setIsAuthenticated(true);
            navigate('/expenses');
        },
        onError: (error) => {
            alert('Login failed: ' + error.message)
            if (error.message.toString().toLowerCase().includes("token is blacklisted")) {
                // clear token
                clearToken();
            }
        }
    });
};

export const useRegisterMutation = () => {
    return useMutation<void, Error, UserDto>({
        mutationFn: async (userDto: UserDto) => {
            await axiosInstance.post<void>('/Auth/Register', userDto);
        }
    });
};