import { View, Text } from 'react-native';

export const ExpensesSummary = ({expenses, periodName}) => {
  const expensesSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  return (
    <View>
      <View>
        <Text>{periodName}</Text>
        <Text>{expensesSum.toFixed(2)}</Text>
      </View>
    </View>
  );
}