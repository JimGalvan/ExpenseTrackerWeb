import React from 'react';
import {Box, Button, PasswordInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {UserDto} from '../../types/auth';
import {useRegisterMutation} from '../../queries/authQueries';

const RegisterForm = () => {
    const form = useForm<UserDto>({
        initialValues: {
            username: '',
            password: '',
        },
    });

    const {mutate: register} = useRegisterMutation();

    const handleSubmit = (values: UserDto) => {
        register(values, {
            onSuccess: () => {
                alert('Registration successful! Please log in.');
                form.reset();
            },
            onError: (error) => {
                alert('Registration failed. Please try again.');
            },
        });
    };

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    {...form.getInputProps('password')}
                />
                <Button type="submit" mt="sm">
                    Register
                </Button>
            </form>
        </Box>
    );
};

export default RegisterForm;