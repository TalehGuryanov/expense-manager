import {View, Text, StyleSheet} from 'react-native';
import {AppInput} from "../ui/AppInput";
import {GlobalStyles} from "../../constants/styles";
import {useState} from "react";

export const ExpenseForm = () => {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: ''
  });
  
  const inputChangedHandler = (inputId, enteredValue) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputId]: enteredValue
      }
    });
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
              onChangeText: inputChangedHandler.bind(null ,'description'),
              multiline: true,
              value: inputValues.description
            }}
        />
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
  }
})