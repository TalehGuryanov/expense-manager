import {StatusBar} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux'

import {store} from "./store/redux/store";
import {ManageExpense} from "./screens/ManageExpense";
import {AllExpenses} from "./screens/AllExpenses";
import {RecentExpenses} from "./screens/RecentExpenses";
import {GlobalStyles} from "./constants/styles";
import {IconButton} from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
        <Tab.Navigator
            screenOptions={({navigation}) => ({
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: GlobalStyles.colors.white,
              tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
              tabBarActiveTintColor: GlobalStyles.colors.white,
              headerRight: () => {
                return (
                    <IconButton
                        name="add"
                        size={24}
                        color={GlobalStyles.colors.white}
                        onPress={() => navigation.navigate('ManageExpense')}
                    />
                );
              }
            })}
        >
          <Tab.Screen
              name="RecentExpenses"
              component={RecentExpenses}
              options={{
                title: 'Recent Overview',
                tabBarLabel: 'Recent',
                tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color} />
              }}
          />
          <Tab.Screen
              name="AllExpenses"
              component={AllExpenses}
              options={{
                title: 'All Overview',
                tabBarLabel: 'All',
                tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color} />
              }}
          />
        </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
          <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: GlobalStyles.colors.white,
            }}
          >
            <Stack.Screen
                name="ExpensesOverview"
                component={ExpensesOverview}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
                options={{
                  presentation: 'modal',
                }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <StatusBar style="light" />
      </>
  );
}
