import axios from "axios";

const BACKEND_URL = 'https://expense-manager-rn-default-rtdb.firebaseio.com';

export const addExpenseAsync = (expenseData) => axios.post(`${BACKEND_URL}/expenses.json`, expenseData);

export const getExpensesAsync = () => axios.get(`${BACKEND_URL}/expenses.json`);

export const updateExpenseAsync = (expenseId, expenseData) => axios.put(`${BACKEND_URL}/expenses/${expenseId}.json`, expenseData);

export const deleteExpenseAsync = (expenseId) => axios.delete(`${BACKEND_URL}/expenses/${expenseId}.json`);