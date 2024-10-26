import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import {LoginResponse, UserDto} from '../types/auth';

export const useLoginMutation = () => {
    return useMutation<LoginResponse, Error, UserDto>({
        mutationFn: (userDto: UserDto) =>
            axiosInstance.post<LoginResponse>('/Auth/Login', userDto).then((res) => res.data)
    });
};

export const useRegisterMutation = () => {
    return useMutation<void, Error, UserDto>({
        mutationFn: async (userDto: UserDto) => {
            await axiosInstance.post<void>('/Auth/Register', userDto);
        }
    });
};