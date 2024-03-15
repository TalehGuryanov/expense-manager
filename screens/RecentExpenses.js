import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getDayMinusDays} from "../util/date";
import {getExpensesThunk} from "../store/redux/expeneses";
import {LoadingOverlay} from "../components/ui/LoadingOverlay";
import {ErrorOverlay} from "../components/ui/ErrorOverlay";

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
  
  if(status === 'loading') {
    return <LoadingOverlay/>;
  }
  
  if(status === 'rejected') {
    return <ErrorOverlay errorMessage={error} onConfirm={() => dispatch(getExpensesThunk())}/>
  }
  
  return (
      <ExpensesOutput
          expenses={resentExpenses}
          expensesPeriod={"Last 7 Days"}
          fallBackText="No expenses registered for the last 7 days"
      />
  );
}