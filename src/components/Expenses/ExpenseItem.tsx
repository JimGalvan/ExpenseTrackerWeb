import React, {useState} from 'react';
import {Box, Button, Group, Text} from '@mantine/core';
import {ExpenseResponseDto} from '../../types/expense';
import {useDeleteExpenseMutation, useUpdateExpenseMutation} from "../../queries/expenseQueries";
import isColorLight, {parseExpenseResponseDto} from "../../utils/utils";
import EditExpenseForm from "./EditExpenseForm";
import {CategoryDto} from '../../types/categories';

interface ExpenseItemProps {
    expense: ExpenseResponseDto;
    categories: CategoryDto[];
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({expense, categories}) => {
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

    const handleSave = async (updatedExpense: ExpenseResponseDto) => {
        const parsedExpense = parseExpenseResponseDto(updatedExpense);
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

    let categoryColor = 'gray';
    let categoryName = 'No Category';

    if (expense.category) {
        categoryName = expense.category.name;
    }

    if (expense.category) {
        categoryColor = expense.category.color;
    }

    const textColor = isColorLight(categoryColor) ? '#000' : '#fff';

    return (
        <Box
            style={{
                '--radius': '0.5rem',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                position: 'relative'
            }}
            p="md"
            mb="md"
        >
            {isEditing && currentExpense ? (
                <>
                    <EditExpenseForm categories={categories} expense={expense} onSave={handleSave}
                                     onCancel={handleCancel}/>
                </>
            ) : (
                <>
                    <Group>
                        <Box>
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
                    <Box
                        style={{
                            backgroundColor: categoryColor ?? 'gray',
                            borderRadius: '4px',
                            padding: '4px',
                            textAlign: 'center',
                            display: 'inline-block',
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            minWidth: '75px',
                            minHeight: '20px',
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                            borderWidth: '2px',
                        }}
                    >
                        <Text size="xs" color={textColor}>
                            <h3>{categoryName}</h3>
                        </Text>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ExpenseItem;