import React from 'react';
import {Box, Button, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {ExpenseDto} from '../../types/expense';
import {useAddExpenseMutation} from '../../queries/expenseQueries';

const CreateExpenseForm: React.FC = () => {
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
                <TextInput label="Category" {...form.getInputProps('category')} />
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