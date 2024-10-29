import React, {useState} from 'react';
import {Box, Button, TextInput} from '@mantine/core';
import {CategoryDto} from "../../types/categories";

// Define the props interface
interface EditCategoryFormProps {
    category: CategoryDto;
    onSave: (category: CategoryDto) => Promise<void>;
    onCancel: () => void;
}

// Type the props in the component
const EditCategoryForm: React.FC<EditCategoryFormProps> = ({category, onSave, onCancel}) => {
    const [name, setName] = useState(category.name);
    const [color, setColor] = useState(category.color);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({...category, name, color});
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextInput
                label="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
            />
            <Button type="submit" mt="md">Save</Button>
            <Button variant="light" mt="md" onClick={onCancel}>Cancel</Button>
        </Box>
    );
};
export default EditCategoryForm;