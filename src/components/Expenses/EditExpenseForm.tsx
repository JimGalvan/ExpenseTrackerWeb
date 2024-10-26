import React from 'react';
import {Box, Button, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {ExpenseResponseDto} from '../../types/expense';

interface EditExpenseFormProps {
    expense: ExpenseResponseDto;
    onSave: (expense: ExpenseResponseDto) => void;
    onCancel: () => void;
}

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({expense, onCancel, onSave}) => {
    const form = useForm<ExpenseResponseDto>({
        initialValues: expense,
    });

    const handleSubmit = () => {
        onSave(form.values);
    }

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Category" {...form.getInputProps('category')} />
                <TextInput label="Description" {...form.getInputProps('description')} />
                <TextInput label="Amount" type="number" {...form.getInputProps('amount')} />
                <Button type="submit" mt="sm">
                    Save
                </Button>
                <Button variant="light" mt="sm" onClick={onCancel}>
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default EditExpenseForm;