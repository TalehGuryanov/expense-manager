import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {gaeDayMinusDays} from "../util/date";

export const RecentExpenses = () => {
  const expenses = useSelector(state => state.expenses) || [];
  const resentExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const today = new Date();
      const dateOf7DaysAgo = gaeDayMinusDays(today, 7);
      return expense.date > dateOf7DaysAgo;
  })}, [expenses]);
  
  return (
      <ExpensesOutput expenses={resentExpenses} expensesPeriod={"Last 7 Days"}/>
  );
}