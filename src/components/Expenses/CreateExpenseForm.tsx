import React from 'react';
import {Box, Button, Select, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {ExpenseDto} from '../../types/expense';
import {useAddExpenseMutation} from '../../queries/expenseQueries';
import {CategoryDto} from '../../types/categories';

interface CreateExpenseFormProps {
    categories: CategoryDto[];
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({categories}) => {

    const form = useForm<ExpenseDto>({
        initialValues: {
            categoryId: '',
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
                    {...form.getInputProps('categoryId')}
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