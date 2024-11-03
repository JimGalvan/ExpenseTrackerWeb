import {CategoryDto} from "./categories";

export interface ExpenseDto {
    amount: number;
    categoryId: string;
    description: string;
}

export interface ExpenseResponseDto {
    id: string;
    date: string;
    amount: number;
    category?: CategoryDto;
    categoryId: string;
    description: string;
}
