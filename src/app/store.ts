import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import expensesReducer from '../features/expenses/expensesSlice';
import createSagaMiddleware from 'redux-saga';
import { expensesSaga } from '../features/expenses/expensesSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses: expensesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(expensesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
