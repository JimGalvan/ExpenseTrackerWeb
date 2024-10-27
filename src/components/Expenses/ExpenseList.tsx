import React from 'react';
import {useExpensesQuery} from '../../queries/expenseQueries';
import ExpenseItem from "./ExpenseItem";
import CreateExpenseForm from "./CreateExpenseForm";
import ExpensePrediction from "./ExpensePrediction";

const ExpenseList = () => {
    const {data: expenses, isLoading, error} = useExpensesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading expenses.</p>;

    if (expenses?.length === 0) {
        return (
            <>
                <CreateExpenseForm/>
                <p>No expenses found.</p>
            </>
        );
    }

    return (
        <div>
            <ExpensePrediction/>
            <CreateExpenseForm/>
            {expenses?.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense}/>
            ))}
        </div>
    );
};

export default ExpenseList;
