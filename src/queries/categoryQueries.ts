import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axiosInstance from "../services/axiosInstance";
import {CategoryDto} from "../types/categories";

const fetchCategories = async () => {
    const {data} = await axiosInstance.get('/categories');
    return data;
};

export const useCategoriesQuery = () => {
    return useQuery<CategoryDto[]>({queryKey: ['categories'], queryFn: fetchCategories});
};

const addCategory = async (categoryDto: CategoryDto): Promise<CategoryDto> => {
    const response = await axiosInstance.post('/categories', categoryDto);
    return response.data;
};

export const useAddCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CategoryDto, Error, CategoryDto>({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};

const deleteCategory = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
};

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};

const updateCategory = async (categoryDto: CategoryDto): Promise<CategoryDto> => {
    const response = await axiosInstance.put(`/categories/${categoryDto.id}`, categoryDto);
    return response.data;
};

export const useUpdateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CategoryDto, Error, CategoryDto>({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};