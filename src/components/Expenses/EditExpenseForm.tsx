import React from 'react';
import {Box, Button, Select, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {ExpenseResponseDto} from '../../types/expense';
import {CategoryDto} from "../../types/categories";

interface EditExpenseFormProps {
    expense: ExpenseResponseDto;
    onSave: (expense: ExpenseResponseDto) => void;
    onCancel: () => void;
    categories: CategoryDto[];
}

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({expense, onCancel, onSave, categories}) => {
    const form = useForm<ExpenseResponseDto>({
        initialValues: expense,
    });

    const handleSubmit = () => {
        onSave(form.values);
    }

    return (
        <Box mx="auto">
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