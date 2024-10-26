export interface ExpenseDto {
    amount: number;
    category: string;
    description: string;
}

export interface ExpenseResponseDto {
    id: string;
    date: string;
    amount: number;
    category: string;
    description: string;
}
