import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getExpensesThunk} from "../store/redux/expeneses";
import {LoadingOverlay} from "../components/ui/LoadingOverlay";

export const AllExpenses = () => {
  const {expensesList, status} = useSelector(state => state.expenses) || [];
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!expensesList.length) {
      dispatch(getExpensesThunk());
    }
  }, []);
  
  if(status === 'loading') {
    return <LoadingOverlay/>;
  }
  
  return (
      <ExpensesOutput
          expenses={expensesList}
          expensesPeriod={"Total"}
          fallBackText="No registered expenses found"
      />
  );
}
