import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useSelector} from "react-redux";

export const AllExpenses = () => {
  const expenses = useSelector(state => state.expenses) || [];
  
  return (
      <ExpensesOutput
          expenses={expenses}
          expensesPeriod={"Total"}
          fallBackText="No registered expenses found"
      />
  );
}