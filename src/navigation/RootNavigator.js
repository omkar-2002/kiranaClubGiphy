import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Trending, {TrendingOptions} from '../screens/trending';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Trending' component={Trending} options={TrendingOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
