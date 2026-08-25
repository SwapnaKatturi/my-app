import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "./types";

interface ExpensesState {
    items: Expense[];
    total: number;
    status: 'idle' | 'succeeded' | 'loading' | 'failed';
    error: string | null;
    page: number;
    pageSize: number;
    startPrice?: number;
    endPrice?: number;
    startDate?: string;
    endDate?: string;
}

const initialState: ExpensesState = {
    items: [],
    status: 'idle',
    error: null,
    total: 0,
    page: 1,
    pageSize: 5
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        fetchExpensesRequest: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        fetchExpensesSuccess: (state, action: PayloadAction<{ data: Expense[]; total: number }>) => {
            state.status = 'succeeded';
            state.error = null;
            state.items = action.payload.data;
            state.total = action.payload.total;

        },
        fetchExpensesFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;

        },
        setFilters: (state, action: PayloadAction<{ startPrice?: number; endPrice?: number; startDate?: string; endDate?: string }>) => {
            state.endPrice = action.payload.endPrice;
            state.endDate = action.payload.endDate;
            state.startDate = action.payload.startDate;
            state.startPrice = action.payload.startPrice;
            state.page = 1;
        }
    }
})

export const { fetchExpensesFailure, fetchExpensesRequest, fetchExpensesSuccess, setPage, setFilters } = expenseSlice.actions;

export default expenseSlice.reducer;