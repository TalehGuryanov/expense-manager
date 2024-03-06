import {View, Text, StyleSheet, Alert} from 'react-native';
import {AppInput} from "../ui/AppInput";
import {GlobalStyles} from "../../constants/styles";
import {useState} from "react";
import {AppButton} from "../ui/AppButton";
import {getFormattedDate} from "../../util/date";

export const ExpenseForm = ({onCancel, onSubmit, expense, buttonLabel}) => {
  const [inputValues, setInputValues] = useState({
    amount: expense ? expense.amount.toString() : '',
    date: expense ? getFormattedDate(expense.date) : '',
    title: expense ? expense.title : ''
  });
  
  const inputChangedHandler = (inputId, enteredValue) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputId]: enteredValue
      }
    });
  }
  
  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      title: inputValues.title,
    }
    
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isTitleValid = expenseData.title.trim().length > 0;

    if(!isAmountValid || !isDateValid || !isTitleValid) {
      Alert.alert('Invalid Date', 'Please check your input values');
      
      return;
    }
  
    onSubmit(expenseData);
  }
  
  return (
      <View style={styles.form}>
        <Text style={styles.title}> Your expense </Text>
        <View style={styles.inputsRow}>
          <AppInput
              label="Amount"
              textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangedHandler.bind(null ,'amount'),
                value: inputValues.amount
              }}
              style={styles.inputContainer}
          />
          <AppInput
              label="Date"
              textInputConfig={{
                keyboardType: 'default',
                onChangeText: inputChangedHandler.bind(null ,'date'),
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                value: inputValues.date,
              }}
              style={styles.inputContainer}
          />
        </View>
        <AppInput
            label="Description"
            textInputConfig={{
              keyboardType: 'default',
              onChangeText: inputChangedHandler.bind(null ,'title'),
              multiline: true,
              value: inputValues.title
            }}
        />
  
        <View style={styles.buttons}>
          <AppButton onPress={onCancel} mode="flat" style={styles.button}>Cancel</AppButton>
          <AppButton onPress={submitHandler} style={styles.button}>{buttonLabel}</AppButton>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: GlobalStyles.colors.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputsRow: {
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 1
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