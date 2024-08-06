import { StyleSheet, Text, View,  StatusBar } from "react-native";
import SplashScreen from "./src/screens/splashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import Welcome from "./src/screens/Welcome";
import LoginScreen from "./src/screens/LoginScreen";
import OtpScreen from "./src/screens/OtpScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import CreateTask from "./src/screens/CreateTask";
import BottomNavigtor from "./src/navigation/BottomNavigator";
import DetailsScreen from "./src/screens/DetailsScreen";
import WorkerProfileScreen from "./src/screens/WorkerProfileScreen";
import TaskDetail from "./src/screens/TaskDetail";
import WorkersListScreen from "./src/screens/WorkerListScreen";
import CompanyDetailsScreen from "./src/screens/CompanyDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#021F93"
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Onbord" component={SplashScreen} options={{ headerShown: false, ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
         <Stack.Screen name="OtpNew" component={OtpScreen} />
         <Stack.Screen name="BottomNavigator" component={BottomNavigtor} />
         <Stack.Screen name="Create Task" component={CreateTask} />
         <Stack.Screen name="TaskDetail" component={TaskDetail} />
         <Stack.Screen name="WorkerListScreen" component={WorkersListScreen} />
         <Stack.Screen name="WorkerProfile" component={WorkerProfileScreen} />
         <Stack.Screen name="Select Category" component={CategoryScreen}  />
         <Stack.Screen name="Details Screen" component={DetailsScreen} />
         <Stack.Screen name="Company Details" component={CompanyDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
