import { RootState } from "../../app/store";
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { deleteExpenseApi, fetchExpensesApi } from "./expensesApi";
import { fetchExpensesRequest, fetchExpensesFailure, fetchExpensesSuccess, deleteExpenseRequest } from "./expensesSlice";
import { Expense } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";


function* fetchExpensesWorker() {
    try {
        const expensesState: RootState['expenses'] = yield select((state: RootState) => state.expenses);

        const result: { data: Expense[]; total: number } = yield call(fetchExpensesApi, {
            page: expensesState.page,
            pageSize: expensesState.pageSize,
            startPrice: expensesState.startPrice,
            startDate: expensesState.startDate,
            endDate: expensesState.endDate,
            endPrice: expensesState.endPrice
        });
        yield put(fetchExpensesSuccess({ data: result.data, total: result.total }))
    } catch (error) {

        const message = error instanceof Error ? error.message : 'Failed to load expenses';
        yield put(fetchExpensesFailure(message));
    }
}

function* deleteExpenseWorker(action: PayloadAction<number>) {
    try {
        yield call(deleteExpenseApi, action.payload);
        yield put(fetchExpensesRequest());
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete expense';
        yield put(fetchExpensesFailure(message));
    }
}

export function* expensesSaga() {
    yield all(
        [takeLatest(fetchExpensesRequest.type, fetchExpensesWorker),
        takeLatest(deleteExpenseRequest.type, deleteExpenseWorker)
        ])
}