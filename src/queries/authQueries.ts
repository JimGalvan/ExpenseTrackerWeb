import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import {LoginResponse, UserDto} from '../types/auth';
import useAuthStore from "../state/authStore";

export const useLoginMutation = () => {
    const setToken = useAuthStore((state) => state.setToken);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

    return useMutation<LoginResponse, Error, UserDto>({
        mutationFn: (userDto: UserDto) =>
            axiosInstance.post<LoginResponse>('/Auth/Login', userDto).then((res) => {
                return res.data;
            }),
        onSuccess: (data) => {
            setToken(data.token);
            setIsAuthenticated(true);
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