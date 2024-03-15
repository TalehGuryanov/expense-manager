import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getDayMinusDays} from "../util/date";
import {getExpensesThunk} from "../store/redux/expeneses";
import {Text} from "react-native";
import {LoadingOverlay} from "../components/ui/LoadingOverlay";

export const RecentExpenses = () => {
  const {expensesList, status, error} = useSelector(state => state.expenses) || [];
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getExpensesThunk())
  }, []);

  const resentExpenses = useMemo(() => {
    return expensesList.filter(expense => {
      const today = new Date();
      const dateOf7DaysAgo = getDayMinusDays(today, 7);
      return (expense.date > dateOf7DaysAgo) && (expense.date <= today);
  })}, [expensesList]);
  
  return (
      <>
        {status === 'loading' && <LoadingOverlay />}
        {status === 'rejected' && <Text >{error !== null ? error : 'Something went wrong'}</Text>}
        {status === 'resolved' && <ExpensesOutput
            expenses={resentExpenses}
            expensesPeriod={"Last 7 Days"}
            fallBackText="No expenses registered for the last 7 days"
        />}
      </>
  );
}