import React from 'react';
import {Box, Button, Group, Text} from '@mantine/core';
import isColorLight from "../../utils/utils";

interface CategoryProps {
    name: string;
    color: string;
    onEdit: () => void;
    onDelete: () => void;
}

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