import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from '@expo/vector-icons/MaterialIcons';

import SelectProvider from './SelectProvider';
import SelectDateTime from './SelectDateTime';
import Confirm from './Confirm';

// import { Container } from './styles';

const Stack = createStackNavigator();

const New = ({ navigation }) => {
  navigation.setOptions({
    title: 'Criar',
    tabBarVisible: false,
    tabBarIcon: ({ size, color }) => (
      <Icon name="add-circle-outline" size={size} color={color} />
    ),
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerLeftContainerStyle: { marginLeft: 20 },
      }}
    >
      <Stack.Screen name="SelectProvider" component={SelectProvider} />
      <Stack.Screen name="SelectDateTime" component={SelectDateTime} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
};

export default New;
