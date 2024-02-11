import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
]

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload)
    },
    removeExpense: (state, action) => {
      state.splice(state.indexOf(action.payload), 1)
    },
    updateExpense: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      
      if (index !== -1) {
        state[index].title = action.payload.title;
        state[index].amount = action.payload.amount;
      }
    }
  }
});

export const { addExpense, removeExpense,updateExpense } = expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;