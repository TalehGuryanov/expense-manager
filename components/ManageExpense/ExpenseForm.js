import {View, Text, StyleSheet} from 'react-native';
import {AppInput} from "../ui/AppInput";
import {GlobalStyles} from "../../constants/styles";
import {useState} from "react";
import {AppButton} from "../ui/AppButton";

export const ExpenseForm = ({onCancel, onSubmit, buttonLabel}) => {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '2024-03-04',
    title: ''
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