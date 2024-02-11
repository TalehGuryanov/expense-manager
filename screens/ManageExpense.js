import {View, StyleSheet} from 'react-native';
import {useCallback, useLayoutEffect} from "react";

import {IconButton} from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {AppButton} from "../components/ui/AppButton";
import {useSelector} from "react-redux";

export const ManageExpense = ({route, navigation}) => {
  const expenses = useSelector(state => state.expenses) || [];
  const expenseId = route.params?.expenseId;
  const isNew = !expenseId;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNew ? 'Add Expense' : 'Edit Expense'
    });
  }, [navigation, isNew]);
  
  const deleteHandler = useCallback(() => {
    cancelHandler();
  },[]);
  
  const cancelHandler = useCallback(() => {
    navigation.goBack();
  },[]);
  
  const confirmHandler = useCallback(() => {
    cancelHandler();
  },[]);
  
  return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} mode="flat" style={styles.button}>Cancel</AppButton>
          <AppButton onPress={confirmHandler} style={styles.button}>{isNew ? 'Add' : 'Update'}</AppButton>
        </View>
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