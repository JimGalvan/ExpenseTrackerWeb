import React, {useState} from 'react';
import {Box, Button, Group, Text} from '@mantine/core';
import {ExpenseDto, ExpenseResponseDto} from '../../types/expense';
import EditExpenseForm from './EditExpenseForm';
import {useDeleteExpenseMutation, useUpdateExpenseMutation} from "../../queries/expenseQueries";

interface ExpenseItemProps {
    expense: ExpenseResponseDto;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({expense}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentExpense, setCurrentExpense] = useState<ExpenseResponseDto | null>(null);
    const updateExpenseMutation = useUpdateExpenseMutation();
    const deleteExpenseMutation = useDeleteExpenseMutation();

    if (updateExpenseMutation.isPending) return <p>Updating...</p>;
    if (updateExpenseMutation.isError) return <p>Error updating expense.</p>;

    if (deleteExpenseMutation.isPending) return <p>Deleting...</p>;
    if (deleteExpenseMutation.isError) return <p>Error deleting expense.</p>;

    const onEdit = (expense: ExpenseResponseDto) => {
        setCurrentExpense(expense);
        setIsEditing(true);
    };

    const onDelete = (id: string) => {
        deleteExpenseMutation.mutate(id);
    };

    const handleSave = async (updatedExpense: ExpenseDto) => {
        await updateExpenseMutation.mutateAsync({
            expenseId: expense?.id,
            expenseDto: updatedExpense,
        });
        setIsEditing(false);
        setCurrentExpense(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentExpense(null);
    };

    return (
        <Box
            style={{
                '--radius': '0.5rem',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            p="md"
            mb="md"
        >
            {isEditing && currentExpense ? (
                <EditExpenseForm
                    expense={currentExpense}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <>
                    <Group>
                        <Box>
                            <Text>{expense.category}</Text>
                            <Text size="sm" color="dimmed">
                                {expense.description}
                            </Text>
                        </Box>
                        <Text>${expense.amount.toFixed(2)}</Text>
                    </Group>
                    <Group mt="sm">
                        <Button variant="light" onClick={() => onEdit(expense)}>
                            Edit
                        </Button>
                        <Button color="red" onClick={() => onDelete(expense.id)}>
                            Delete
                        </Button>
                    </Group>
                </>
            )}
        </Box>
    );
};

export default ExpenseItem;