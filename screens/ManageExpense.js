import {View, StyleSheet, Text} from 'react-native';
import {useCallback, useLayoutEffect} from "react";

import {IconButton} from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {AppButton} from "../components/ui/AppButton";
import {useDispatch, useSelector} from "react-redux";
import {addExpense, removeExpense, updateExpense} from "../store/redux/expeneses";

export const ManageExpense = ({route, navigation}) => {
  const expenses = useSelector(state => state.expenses) || [];
  const dispatch = useDispatch();
  const expenseId = route.params?.expenseId;
  const isNew = !expenseId;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNew ? 'Add Expense' : 'Edit Expense'
    });
  }, [navigation, isNew]);
  
  const deleteHandler = useCallback(() => {
    dispatch(removeExpense(expenseId));
    cancelHandler();
  },[]);
  
  const cancelHandler = useCallback(() => {
    navigation.goBack();
  },[]);
  
  const confirmHandler = useCallback(() => {
    if(isNew) {
      dispatch(addExpense(  {
        id: Math.random().toString(),
        title: 'Toilet Paper New',
        amount: 94.12,
        date: new Date(),
      }));
    } else {
      dispatch(updateExpense(  {
        id: `${expenseId}`,
        title: 'Updated',
        amount: 94.12,
      }));
    }
    cancelHandler();
  },[]);
  
  return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} mode="flat" style={styles.button}>Cancel</AppButton>
          <AppButton onPress={confirmHandler} style={styles.button}>{isNew ? 'Add' : 'Update'}</AppButton>
        </View>
        <Text style={{color: 'white'}}>{expenseId}</Text>
        {!isNew &&
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  }
})