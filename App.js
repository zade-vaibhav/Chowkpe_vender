import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyDetailsScreen from './CompanyDetailsScreen';
import TaskListScreen from './TaskListScreen'; // Import the TaskListScreen
import WorkerProfileScreen from './WorkerProfileScreen';
import ForkliftOperatorScreen from './ForkliftOperatorScreen'; // Import the ForkliftOperatorScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CompanyDetails">
        <Stack.Screen
          name="CompanyDetails"
          component={CompanyDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkerProfile"
          component={WorkerProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForkliftOperator"
          component={ForkliftOperatorScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
