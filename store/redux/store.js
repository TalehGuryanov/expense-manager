import { configureStore } from '@reduxjs/toolkit';
import {expensesReducer} from "./expeneses";

export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});