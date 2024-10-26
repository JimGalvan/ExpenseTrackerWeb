import React, {useState} from 'react';
import {Box, Button, Card, Group, Text} from '@mantine/core';
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
        <Card shadow="sm" padding="md" mb="sm">
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
        </Card>
    );
};

export default ExpenseItem;