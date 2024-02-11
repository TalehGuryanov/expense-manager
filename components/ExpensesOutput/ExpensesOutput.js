import { View, StyleSheet } from 'react-native';

import {ExpensesSummary} from "./ExpensesSummary";
import {ExpensesList} from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

export const ExpensesOutput = ({expenses, expensesPeriod}) => {
  const expensesSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  return (
    <View style={styles.container}>
      <ExpensesSummary expensesSum={expensesSum} periodName={expensesPeriod}/>
      
      <ExpensesList expenses={expenses}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  }
});