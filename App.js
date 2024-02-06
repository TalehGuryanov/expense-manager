import {StatusBar} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {ManageExpense} from "./screens/ManageExpense";
import {AllExpenses} from "./screens/AllExpenses";
import {RecentExpenses} from "./screens/RecentExpenses";
import {GlobalStyles} from "./constants/styles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: GlobalStyles.colors.white,
          tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
          tabBarActiveTintColor: GlobalStyles.colors.white,
        }}
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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="ExpensesOverview"
                component={ExpensesOverview}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
                options={{title: 'Manage Overview'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </>
  );
}
