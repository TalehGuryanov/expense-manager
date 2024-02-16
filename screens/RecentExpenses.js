import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {getDayMinusDays} from "../util/date";

export const RecentExpenses = () => {
  const expenses = useSelector(state => state.expenses) || [];
  const resentExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const today = new Date();
      const dateOf7DaysAgo = getDayMinusDays(today, 7);
      return (expense.date > dateOf7DaysAgo) && (expense.date <= today);
  })}, [expenses]);
  
  return (
      <ExpensesOutput
          expenses={resentExpenses}
          expensesPeriod={"Last 7 Days"}
          fallBackText="No expenses registered for the last 7 days"
      />
  );
}