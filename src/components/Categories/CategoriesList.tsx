import React, {useState} from 'react';
import {useCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation} from '../../queries/categoryQueries';
import {Box, Grid, Text} from '@mantine/core';
import Category from "./Category";
import EditCategoryForm from './EditCategoryForm';
import {CategoryDto} from "../../types/categories";

const CategoryList = () => {
    const {data: categories, isLoading, error} = useCategoriesQuery();
    const deleteCategoryMutation = useDeleteCategoryMutation();
    const updateCategoryMutation = useUpdateCategoryMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<CategoryDto>({id: 0, name: '', color: ''});

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text color="red">Error loading categories.</Text>;

    if (categories?.length === 0) {
        return <Text>No categories found.</Text>;
    }

    const handleEdit = (category: CategoryDto) => {
        setCurrentCategory(category);
        setIsEditing(true);
    };

    const handleDelete = (id: number) => {
        deleteCategoryMutation.mutate(id.toString());
    };

    const handleSave = async (updatedCategory: CategoryDto) => {
        await updateCategoryMutation.mutateAsync(updatedCategory);
        setIsEditing(false);
        setCurrentCategory({id: 0, name: '', color: ''});
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentCategory({id: 0, name: '', color: ''});
    };

    return (
        <Box mt="md" p="md">
            {isEditing && currentCategory ? (
                <EditCategoryForm
                    category={currentCategory}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <Grid gutter={4} style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px'}}>
                    {categories?.map((category) => (
                        <Grid.Col span={3} key={category.id}>
                            <Category
                                name={category.name}
                                color={category.color}
                                onEdit={() => handleEdit(category)}
                                onDelete={() => handleDelete(category.id)}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default CategoryList;