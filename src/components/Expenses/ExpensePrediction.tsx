import React from 'react';
import {Button, Card, Text} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '../../services/axiosInstance';

const fetchPredictedExpense = async () => {
    const response = await axiosInstance.get('/Expenses/predictWithMovingAverage');
    return response.data;
};

const ExpensePrediction = () => {
    const {data: prediction, refetch, isFetching} = useQuery({
        queryKey: ['expensePrediction'],
        queryFn: fetchPredictedExpense
    });

    return (
        <Card shadow="sm" padding="lg" mt="md">
            <Text size="lg">
                Predicted Expense for Next Week
            </Text>
            <Text size="xl" color="blue" mt="sm">
                ${prediction?.toFixed(2) || 'Loading...'}
            </Text>
            <Button onClick={() => refetch()} loading={isFetching} mt="xs">
                Refresh
            </Button>
        </Card>
    );
};

export default ExpensePrediction;
