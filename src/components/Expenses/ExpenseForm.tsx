import React, {useEffect} from 'react';
import {Box, Button, NumberInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {ExpenseDto, ExpenseResponseDto} from '../../types/expense';

interface ExpenseFormProps {
    onSubmit: (expense: ExpenseDto) => void;
    initialValues?: ExpenseResponseDto;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({onSubmit, initialValues}) => {
    const form = useForm<ExpenseDto>({
        initialValues: {
            amount: initialValues?.amount || 0,
            category: initialValues?.category || '',
            description: initialValues?.description || '',
        },
    });

    useEffect(() => {
        if (initialValues) {
            form.setValues({
                amount: initialValues.amount,
                category: initialValues.category,
                description: initialValues.description,
            });
        }
    }, [initialValues, form]);

    const handleSubmit = (values: ExpenseDto) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <NumberInput
                    label="Amount"
                    placeholder="Enter the expense amount"
                    {...form.getInputProps('amount')}
                />
                <TextInput
                    label="Category"
                    placeholder="Enter the expense category"
                    {...form.getInputProps('category')}
                />
                <TextInput
                    label="Description"
                    placeholder="Enter a description (optional)"
                    {...form.getInputProps('description')}
                />
                <Button type="submit" mt="sm">
                    {initialValues ? 'Update Expense' : 'Add Expense'}
                </Button>
            </form>
        </Box>
    );
};

export default ExpenseForm;