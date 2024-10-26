import React from 'react';
import {useExpensesQuery} from '../../queries/expenseQueries';
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
    const {data: expenses, isLoading, error} = useExpensesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading expenses.</p>;

    return (
        <div>
            {expenses?.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense}/>
            ))}
        </div>
    );
};

export default ExpenseList;
