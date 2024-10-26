// src/App.tsx
import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Container, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ExpenseList from './components/Expenses/ExpenseList';
import AuthRoute from './components/Auth/AuthRoute';
import '@mantine/core/styles.css';
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Layout";

const queryClient = new QueryClient();

const App = () => {
    return (
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <Container>
                    <Router>
                        <Layout>
                            <Routes>
                                <Route path="/login" element={<LoginForm/>}/>
                                <Route path="/register" element={<RegisterForm/>}/>
                                <Route path="/expenses" element={<AuthRoute><ExpenseList/></AuthRoute>}/>
                                <Route path="/" element={<ProtectedRoute><Navigate to="/expenses" replace/></ProtectedRoute>}/>
                            </Routes>
                        </Layout>
                    </Router>
                </Container>
            </QueryClientProvider>
        </MantineProvider>
    );
};

export default App;