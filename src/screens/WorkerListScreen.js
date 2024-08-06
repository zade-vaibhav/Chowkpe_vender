import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Workerjoined from './Tabscreen/Workerjoined';
import Workerinreview from './Tabscreen/Workerinreview';
import WorkerSelected from './Tabscreen/WorkerSelected';


const Tab = createMaterialTopTabNavigator();

const WorkersListScreen = () => {
  return (
      <Tab.Navigator
        initialRouteName="JoinedWorker"
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarLabelStyle: { fontSize: 14, fontWeight: '600',marginTop:40 },
          tabBarStyle: { backgroundColor: '#FAF9F6' },
          tabBarIndicatorStyle: { backgroundColor: '#007BFF' },
        }}
      >
        <Tab.Screen
          name="JoinedWorker"
          component={Workerjoined}
          options={{ title: 'Joined Worker' }}
        />
        <Tab.Screen
          name="WorkerInReview"
          component={Workerinreview}
          options={{ title: 'Worker in Review' }}
        />
        <Tab.Screen
          name="SelectedWorker"
          component={WorkerSelected}
          options={{ title: 'Selected Worker' }}
        />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WorkersListScreen;
