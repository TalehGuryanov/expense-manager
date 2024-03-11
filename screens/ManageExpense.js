import {View, StyleSheet, Pressable, Keyboard} from 'react-native';
import {useCallback, useLayoutEffect, useMemo} from "react";

import {IconButton} from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {useDispatch, useSelector} from "react-redux";
import {
  addExpenseThunk,
  deleteExpenseThunk,
  updateExpenseThunk
} from "../store/redux/expeneses";
import {ExpenseForm} from "../components/ManageExpense/ExpenseForm";

export const ManageExpense = ({route, navigation}) => {
  const {expensesList} = useSelector(state => state.expenses) || [];
  const dispatch = useDispatch();
  const expenseId = route.params?.expenseId;
  const isNewExpense = !expenseId;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNewExpense ? 'Add Expense' : 'Edit Expense'
    });
  }, [navigation, isNewExpense]);
  
  const selectedExpense = useMemo(() => expensesList.find((item) => item.id === expenseId), [expensesList])
  
  const confirmHandler = useCallback((expenseData) => {
    if(isNewExpense) {
      dispatch(addExpenseThunk(expenseData));
    } else {
      dispatch(updateExpenseThunk({expenseId, expenseData}));
    }
    cancelHandler();
  },[]);
  
  const deleteHandler = useCallback(() => {
    dispatch(deleteExpenseThunk(expenseId));
    cancelHandler();
  },[]);
  
  const cancelHandler = useCallback(() => {
    navigation.goBack();
  },[]);
  
  return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <ExpenseForm
            onCancel={cancelHandler}
            onSubmit={confirmHandler}
            buttonLabel={isNewExpense ? 'Add' : 'Update'}
            expense={selectedExpense}
        />
        
        {!isNewExpense &&
            <View style={styles.deleteButton}>
              <IconButton color={GlobalStyles.colors.error500} size={36} name={"trash"} onPress={deleteHandler}/>
            </View>
        }
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteButton: {
    padding: 8,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
})