import {Text, StyleSheet, Pressable, View} from 'react-native';
import {GlobalStyles} from "../../constants/styles";

export  const ExpenseItem = ({expense}) => {
  
  const onPressHandler = () => {
    console.log('Pressed', expense.id)
  }
  
  return (
    <Pressable
        style={({pressed}) => pressed ? [styles.container, styles.pressed] : styles.container}
        onPress={onPressHandler}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {expense.title}
          </Text>
          <Text style={styles.textBase}>
            {expense.date.toString()}
          </Text>
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{expense.amount}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.5,
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
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  }
});