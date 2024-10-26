import React from 'react';
import {Box, Button, Card, Group, Text} from '@mantine/core';
import {ExpenseResponseDto} from '../../types/expense';

interface ExpenseItemProps {
    expense: ExpenseResponseDto;
    onEdit: (expense: ExpenseResponseDto) => void;
    onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({expense, onEdit, onDelete}) => {
    return (
        <Card shadow="sm" padding="md" mb="sm">
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
        </Card>
    );
};

export default ExpenseItem;
