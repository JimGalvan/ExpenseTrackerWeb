import React from 'react';
import {Box, Button, Group, Text} from '@mantine/core';

interface CategoryProps {
    name: string;
    color: string;
    onEdit: () => void;
    onDelete: () => void;
}

// Utility function to determine if a color is light or dark
const isColorLight = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};

const Category: React.FC<CategoryProps> = ({name, color, onEdit, onDelete}) => {
    const textColor = isColorLight(color) ? '#000' : '#fff';

    return (
        <Box
            style={{
                backgroundColor: color ?? 'gray',
                borderRadius: '4px',
                padding: '8px',
                margin: '5px',
                textAlign: 'center',
                display: 'inline-block',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                minWidth: '150px',
                minHeight: '100px'
            }}
        >
            <Text size="sm" color={textColor}>
                <h2>{name}</h2>
            </Text>
            <Group mt="sm">
                <Button variant="light" onClick={onEdit}>
                    Edit
                </Button>
                <Button color="red" onClick={onDelete}>
                    Delete
                </Button>
            </Group>
        </Box>
    );
};

export default Category;