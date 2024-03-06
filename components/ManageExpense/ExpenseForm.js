import {View, Text, StyleSheet, Alert} from 'react-native';
import {AppInput} from "../ui/AppInput";
import {GlobalStyles} from "../../constants/styles";
import {useState} from "react";
import {AppButton} from "../ui/AppButton";
import {getFormattedDate} from "../../util/date";

export const ExpenseForm = ({onCancel, onSubmit, expense, buttonLabel}) => {
  const [inputs, setInputs] = useState({
    amount: {value: expense ? expense.amount.toString() : '', isValid: true},
    date: {value: expense ? getFormattedDate(expense.date) : '', isValid: true},
    title: {value: expense ? expense.title : '', isValid: true}
  });
  
  const isFormInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid;
  
  const inputChangedHandler = (inputId, enteredValue) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputId]: {value:enteredValue, isValid: true}
      }
    });
  }
  
  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      title: inputs.title.value,
    }
    
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date?.toString() !== 'Invalid Date';
    const isTitleValid = expenseData.title?.trim().length > 0;

    if(!isAmountValid || !isDateValid || !isTitleValid) {
      setInputs((prevState) => {
        return {
          amount: {value: prevState.amount.value, isValid: isAmountValid},
          date: {value: prevState.date.value, isValid: isDateValid},
          title: {value: prevState.title.value, isValid: isTitleValid},
        }
      });
      
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
                value: inputs.amount.value
              }}
              style={styles.inputContainer}
              invalid={!inputs.amount.isValid}
          />
          <AppInput
              label="Date"
              textInputConfig={{
                keyboardType: 'default',
                onChangeText: inputChangedHandler.bind(null ,'date'),
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                value: inputs.date.value,
              }}
              style={styles.inputContainer}
              invalid={!inputs.date.isValid}
          />
        </View>
        <AppInput
            label="Description"
            textInputConfig={{
              keyboardType: 'default',
              onChangeText: inputChangedHandler.bind(null ,'title'),
              multiline: true,
              value: inputs.title.value
            }}
            invalid={!inputs.title.isValid}
        />
  
        {isFormInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
        
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
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