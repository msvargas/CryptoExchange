import React from 'react';
import { useColorModeValue } from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sidebar from '~components/Sidebar';
import CoinDetailsScreen from '~screens/coin-details/CoinDetails.screen';
import HomeScreen from '~screens/home/Home.screen';

import type { RootStackParamList } from './types';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => (
  <NavigationContainer
    theme={useColorModeValue(DefaultTheme, DarkTheme)}
    onReady={() => RNBootSplash.hide({ fade: true })}
  >
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        return {
          headerShown: false,
          drawerType: 'back',
          overlayColor: '#00000000',
          swipeEnabled: routeName === 'Home',
        };
      }}
    >
      <Drawer.Screen name="Main">
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} />
          </Stack.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigator;
