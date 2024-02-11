import { View } from 'react-native';

import {ExpensesSummary} from "./ExpensesSummary";
import {ExpensesList} from "./ExpensesList";

const DUMMY_EXPENSES = [
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
  }
]

export const ExpensesOutput = ({expenses, expensesPeriod}) => {
  const expensesSum = DUMMY_EXPENSES.reduce((acc, expense) => acc + expense.amount, 0);
  
  return (
    <View>
      <ExpensesSummary expensesSum={expensesSum} periodName={expensesPeriod}/>
      
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  );
}