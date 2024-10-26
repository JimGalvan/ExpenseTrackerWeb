import React from 'react';
import {Box, Button, PasswordInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {UserDto} from '../../types/auth';
import {useLoginMutation} from '../../queries/authQueries';
import useAuthStore from '../../state/authStore';

const LoginForm = () => {
    const form = useForm<UserDto>({
        initialValues: {
            username: '',
            password: '',
        },
    });

    const {mutate: login} = useLoginMutation();
    const setToken = useAuthStore((state) => state.setToken);

    const handleSubmit = (values: UserDto) => {
        login(values, {
            onSuccess: (data) => {
                setToken(data.token);
                alert('Login successful!');
            },
            onError: (error) => {
                alert('Login failed. Please try again.');
            },
        });
    };

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Username" {...form.getInputProps('username')} />
                <PasswordInput label="Password" {...form.getInputProps('password')} />
                <Button type="submit" mt="sm">
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;