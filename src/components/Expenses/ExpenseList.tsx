import React, {useEffect, useState} from 'react';
import {useExpensesQuery} from '../../queries/expenseQueries';
import ExpenseItem from "./ExpenseItem";
import CreateExpenseForm from "./CreateExpenseForm";
import ExpensePrediction from "./ExpensePrediction";
import {CategoryDto} from "../../types/categories";
import axiosInstance from "../../services/axiosInstance";

const ExpenseList = () => {
    const {data: expenses, isLoading, error} = useExpensesQuery();
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axiosInstance.get('/categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading expenses.</p>;

    if (expenses?.length === 0) {
        return (
            <>
                <CreateExpenseForm categories={categories}/>
                <p>No expenses found.</p>
            </>
        );
    }

    return (
        <div>
            <h2>Expenses</h2>
            <ExpensePrediction/>
            <CreateExpenseForm categories={categories}/>
            {expenses?.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} categories={categories}/>
            ))}
        </div>
    );
};

export default ExpenseList;
