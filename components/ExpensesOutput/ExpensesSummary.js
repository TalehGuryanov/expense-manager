import { View, Text } from 'react-native';

export const ExpensesSummary = ({expensesSum, periodName}) => {
  
  return (
    <View>
      <View>
        <Text>{periodName}</Text>
        <Text>{expensesSum.toFixed(2)}</Text>
      </View>
    </View>
  );
}