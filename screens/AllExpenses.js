import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useDispatch, useSelector} from "react-redux";
import {getExpensesThunk} from "../store/redux/expeneses";
import {LoadingOverlay} from "../components/ui/LoadingOverlay";
import {ErrorOverlay} from "../components/ui/ErrorOverlay";

export const AllExpenses = () => {
  const {expensesList, status, error} = useSelector(state => state.expenses) || [];
  const dispatch = useDispatch();
  
  if(status === 'loading') {
    return <LoadingOverlay/>;
  }
  
  if(status === 'rejected') {
    return <ErrorOverlay errorMessage={error} onConfirm={() => dispatch(getExpensesThunk())}/>
  }
  
  return (
      <ExpensesOutput
          expenses={expensesList}
          expensesPeriod={"Total"}
          fallBackText="No registered expenses found"
      />
  );
}
