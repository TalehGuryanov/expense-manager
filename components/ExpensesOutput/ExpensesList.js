import {View, Text, FlatList} from 'react-native';

export const ExpensesList = ({expenses}) => {
  return (
      <FlatList
          data={expenses}
          renderItem={({item}) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.amount}</Text>
              </View>
          )}
          keyExtractor={item => item.id}
      />
  );
}