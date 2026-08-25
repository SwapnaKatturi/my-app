import { RootState } from "../../app/store";
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchExpensesApi } from "./expensesApi";
import { fetchExpensesRequest, fetchExpensesFailure, fetchExpensesSuccess } from "./expensesSlice";
import { Expense } from "./types";


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

export function* expensesSaga() {
    yield takeLatest(fetchExpensesRequest.type, fetchExpensesWorker);
}