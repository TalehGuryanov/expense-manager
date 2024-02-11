import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useSelector} from "react-redux";

export const AllExpenses = () => {
  const expenses = useSelector(state => state.expenses) || [];
  console.log(123)
  
  return (
      <ExpensesOutput expenses={expenses} expensesPeriod={"Total"}/>
  );
}