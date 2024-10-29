import React, {useEffect, useState} from 'react';
import {Box, Button, Select, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {ExpenseDto} from '../../types/expense';
import {useAddExpenseMutation} from '../../queries/expenseQueries';
import {CategoryDto} from '../../types/categories';
import axiosInstance from '../../services/axiosInstance';

const CreateExpenseForm: React.FC = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axiosInstance.get('/categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const form = useForm<ExpenseDto>({
        initialValues: {
            category: '',
            description: '',
            amount: 0,
        },
    });

    const {mutate: addExpense, isPending} = useAddExpenseMutation();

    const handleSubmit = () => {
        addExpense(form.values);
    };

    return (
        <Box p="sm"
             mb="sm"
             style={{
                 '--radius': '0.5rem',
                 borderRadius: 'var(--radius)',
                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
             }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select
                    label="Category"
                    data={[{value: '', label: 'None'}, ...categories.map(category => ({
                        value: category.id.toString(), // Convert id to string
                        label: category.name
                    }))]}
                    {...form.getInputProps('category')}
                />
                <TextInput label="Description" {...form.getInputProps('description')} />
                <TextInput label="Amount" type="number" {...form.getInputProps('amount')} />
                <Button type="submit" mt="sm" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                </Button>
            </form>
        </Box>
    );
};

export default CreateExpenseForm;