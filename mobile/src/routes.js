import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const signed = false;

const Routes = ({ signed }) => {
  // console.log({ signed });
  return (
    <NavigationContainer>
      {signed ? (
        <Tab.Navigator initialRouteName="Dashboard">
          <Tab.Screen name="Dashboard" component={Dashboard} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Routes;
