import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyDetailsScreen from './src/screens/CompanyDetailsScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import WorkerProfileScreen from './src/screens/WorkerProfileScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import OtpScreen from './src/screens/OtpScreen';
import Welcome from './src/screens/Welcome';
import SplashScreen from './src/screens/splashScreen';
import LoginScreen from './src/screens/LoginScreen';
import TaskDetail from './src/screens/TaskDetail';
import BottomNavigator from './src/screens/BottomNavigator';
import WorkersListScreen from './src/screens/workers/WorkersListScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#021F93"
        translucent={true}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="CompanyDetails" component={CompanyDetailsScreen} />
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfileScreen} />
        <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
        <Stack.Screen name="WorkersListScreen" component={WorkersListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




export default App;
