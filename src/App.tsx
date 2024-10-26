import React from 'react';
import {Container, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import LoginForm from './components/Auth/LoginForm';
import ExpenseList from './components/Expenses/ExpenseList';

const queryClient = new QueryClient();

const App = () => {
  return (
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <Container>
            <h1>Expense Tracker</h1>
            <LoginForm/>
            <ExpenseList/>
          </Container>
        </QueryClientProvider>
      </MantineProvider>
  );
};

export default App;
