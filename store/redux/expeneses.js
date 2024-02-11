import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: 'e2',
    title: 'New TV',
    amount: 799.49,
    date: new Date(2021, 2, 12),
  },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
  {
    id: 'e5',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: 'e6',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: 'e7',
    title: 'New TV',
    amount: 799.49,
    date: new Date(2021, 2, 12),
  },
  {
    id: 'e8',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e9',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2024, 2, 10),
  },
  {
    id: 'e10',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2024, 2, 10),
  },
  {
    id: 'e11',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2024, 2, 10),
  },
  {
    id: 'e12',
    title: 'New TV',
    amount: 799.49,
    date: new Date(2024, 2, 10),
  },
  {
    id: 'e13',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2024, 2, 10),
  },
  {
    id: 'e14',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2024, 2, 10),
  },
  {
    id: 'e15',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: 'e16',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: 'e17',
    title: 'New TV',
    amount: 799.49,
    date: new Date(2021, 2, 12),
  },
  {
    id: 'e18',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e19',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
  {
    id: 'e20',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  }
]

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload)
    },
    removeExpense: (state, action) => {
      state.filter(expense => expense.id !== action.payload.id)
    },
    updateExpense: (state, action) => {
      state.find(expense => expense.id === action.payload.id)
          .title = action.payload.title
          .amount = action.payload.amount
    }
  }
});

export const { addExpense, removeExpense,updateExpense } = expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;