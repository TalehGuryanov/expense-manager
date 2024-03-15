import {Text} from 'react-native';
import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getExpensesThunk} from "../store/redux/expeneses";

export const AllExpenses = () => {
  const {expensesList, status, error} = useSelector(state => state.expenses) || [];
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!expensesList.length) {
      dispatch(getExpensesThunk());
    }
  }, []);
  
  return (
      <>
        {status === 'loading' && <Text>Loading...</Text>}
        {error !== null && <Text>{error}</Text>}
        {!!expensesList.length && <ExpensesOutput
            expenses={expensesList}
            expensesPeriod={"Total"}
            fallBackText="No registered expenses found"
        />}
      </>
  );
}
