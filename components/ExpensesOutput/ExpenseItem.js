import {Text, StyleSheet, Pressable, View, Platform} from 'react-native';
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate} from "../../util/date";
import {useNavigation} from "@react-navigation/native";

export  const ExpenseItem = ({expense}) => {
  const navigation = useNavigation();
  
  const pressHandler = () => {
    navigation.navigate('ManageExpense', {expenseId: expense.id});
  }
  
  return (
    <Pressable
        style={({pressed}) => pressed && Platform.OS === 'ios' ? [styles.pressed, styles.container] : [styles.container]}
        onPress={pressHandler}
        android_ripple={{color: GlobalStyles.colors.primary200}}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {expense.title}
          </Text>
          <Text style={[styles.textBase, styles.description]}>
            {expense.id}
          </Text>
          <Text style={styles.textBase}>
            {getFormattedDate(expense.date)}
          </Text>
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    marginBottom: 8,
    borderRadius: 8,
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  }
});