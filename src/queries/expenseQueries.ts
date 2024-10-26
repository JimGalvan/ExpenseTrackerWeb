import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import {ExpenseDto, ExpenseResponseDto} from '../types/expense';

export const useExpensesQuery = () => {
    return useQuery<ExpenseResponseDto[], Error>({
        queryKey: ['expenses'],
        queryFn: () => axiosInstance.get('/Expenses').then((res) => res.data),
    });
};

const addExpense = async (expenseDto: ExpenseDto): Promise<ExpenseResponseDto> => {
    const response = await axiosInstance.post('/Expenses', expenseDto);
    return response.data;
};

export const useAddExpenseMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<ExpenseResponseDto, Error, ExpenseDto>({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expenses']});
        },
    });
};