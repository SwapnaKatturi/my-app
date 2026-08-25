export interface Expense {
    id: number;
    title: string;
    amount: number,
    type: 'in' | 'out';
    description: string;
    date: string;
}