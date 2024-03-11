import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addExpenseAsync, deleteExpenseAsync, getExpensesAsync, updateExpenseAsync} from "../../util/http";

export const getExpensesThunk = createAsyncThunk(
    'expenses/getExpensesThunk',
    async function(_, {rejectWithValue, dispatch}) {
      try {
        const response = await getExpensesAsync();
        const expenses = [];
  
        for(const key in response.data) {
          const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            title: response.data[key].title,
          }
    
          expenses.push(expenseObj)
        }
        
        return expenses;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
)

export const deleteExpenseThunk = createAsyncThunk(
    'expenses/deleteExpenseThunk',
    async function(id, {rejectWithValue, dispatch}) {
      try {
         await deleteExpenseAsync(id);
         dispatch(removeExpense(id))
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
)

export const updateExpenseThunk = createAsyncThunk(
    'expenses/updateExpenseThunk',
    async function(data, {rejectWithValue, dispatch}) {
      const {expenseId, expenseData} = data
      try {
         await updateExpenseAsync(expenseId, expenseData);
         dispatch(updateExpense({expenseId, ...expenseData}));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
)

export const addExpenseThunk = createAsyncThunk(
    'expenses/addExpenseThunk',
    async function(expenseData, {rejectWithValue, dispatch}) {
      try {
         const {data} = await addExpenseAsync(expenseData);
         dispatch(addExpense({...expenseData, id: data.name}));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
)

const initialState = {
  expensesList: [],
  status: null,
  error: null
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expensesList.unshift(action.payload)
    },
    removeExpense: (state, action) => {
      const index = state.expensesList.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.expensesList.splice(index, 1);
      }
    },
    updateExpense: (state, action) => {
      const index = state.expensesList.findIndex(item => item.id === action.payload.expenseId);
      
      if (index !== -1) {
        state.expensesList[index].title = action.payload.title;
        state.expensesList[index].amount = action.payload.amount;
        state.expensesList[index].date = action.payload.date;
      }
      console.log(state.expensesList)
    }
  },
  extraReducers: (builder => {
    builder.addCase(getExpensesThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(getExpensesThunk.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.expensesList = action.payload.reverse();
    });
    builder.addCase(getExpensesThunk.rejected, setError);
    builder.addCase(deleteExpenseThunk.rejected, setError);
    builder.addCase(updateExpenseThunk.rejected, setError);
    builder.addCase(addExpenseThunk.rejected, setError);
  }),
});

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload
};

export const { getExpenses, addExpense, removeExpense,updateExpense } = expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;