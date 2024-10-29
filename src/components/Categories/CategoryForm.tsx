import React, {useState} from 'react';
import {useAddCategoryMutation} from '../../queries/categoryQueries';
import {CategoryDto} from '../../types/categories';
import {Box, Button, Text, TextInput} from '@mantine/core';

const CategoryForm = () => {
    const [category, setCategory] = useState<CategoryDto>({id: 0, name: '', color: ''});
    const {mutate, isPending, error} = useAddCategoryMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({...category, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(category);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextInput
                label="Category Name"
                id="name"
                name="name"
                value={category.name}
                onChange={handleChange}
                required
                mb="sm"
            />
            <Button type="submit" disabled={isPending}>
                {isPending ? 'Adding...' : 'Add Category'}
            </Button>
            {error && <Text color="red" mt="sm">Error adding category.</Text>}
        </Box>
    );
};

export default CategoryForm;