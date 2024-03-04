import {View, StyleSheet} from 'react-native';
import {useCallback, useLayoutEffect} from "react";

import {IconButton} from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {useDispatch} from "react-redux";
import {addExpense, removeExpense, updateExpense} from "../store/redux/expeneses";
import {ExpenseForm} from "../components/ManageExpense/ExpenseForm";

export const ManageExpense = ({route, navigation}) => {
  const dispatch = useDispatch();
  const expenseId = route.params?.expenseId;
  const isNewExpense = !expenseId;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNewExpense ? 'Add Expense' : 'Edit Expense'
    });
  }, [navigation, isNewExpense]);
  
  const confirmHandler = useCallback((expense) => {
    if(isNewExpense) {
      dispatch(addExpense({...expense, id: Math.random().toString(),}));
    } else {
      dispatch(updateExpense({...expense, id: `${expenseId}`}));
    }
    cancelHandler();
  },[]);
  
  const deleteHandler = useCallback(() => {
    dispatch(removeExpense(expenseId));
    cancelHandler();
  },[]);
  
  const cancelHandler = useCallback(() => {
    navigation.goBack();
  },[]);
  
  return (
      <View style={styles.container}>
        <ExpenseForm
            onCancel={cancelHandler}
            onSubmit={confirmHandler}
            buttonLabel={isNewExpense ? 'Add' : 'Update'}
        />
        
        {!isNewExpense &&
            <View style={styles.deleteButton}>
              <IconButton color={GlobalStyles.colors.error500} size={36} name={"trash"} onPress={deleteHandler}/>
            </View>
        }
      </View>
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