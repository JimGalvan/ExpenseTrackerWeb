import React from 'react';
import {Button, Card, Group, Text} from '@mantine/core';
import {useExpensesQuery} from '../../queries/expenseQueries';

const ExpenseList = () => {
    const {data: expenses, isLoading, error} = useExpensesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading expenses.</p>;

    return (
        <div>
            {expenses?.map((expense) => (
                <Card key={expense.id} shadow="sm" mb="sm">
                    <Group>
                        <Text>{expense.category}</Text>
                        <Text>${expense.amount.toFixed(2)}</Text>
                    </Group>
                    <Text size="sm" color="dimmed">
                        {expense.description}
                    </Text>
                    <Button mt="sm">Edit</Button>
                </Card>
            ))}
        </div>
    );
};

export default ExpenseList;
