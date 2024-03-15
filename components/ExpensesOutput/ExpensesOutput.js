import { View, StyleSheet, Text } from 'react-native';

import {ExpensesSummary} from "./ExpensesSummary";
import {ExpensesList} from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

export const ExpensesOutput = ({expenses, expensesPeriod, fallBackText}) => {
  const expensesSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  const fallBack = <Text style={styles.infoText}>{fallBackText}</Text>
  
  return (
    <View style={styles.container}>
      <ExpensesSummary expensesSum={expensesSum} periodName={expensesPeriod}/>
  
      {!!expenses.length ? <ExpensesList expenses={expenses}/> : fallBack}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: GlobalStyles.colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  }
});