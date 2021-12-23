import React from 'react';
import { useColorModeValue } from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sidebar from '~components/Sidebar';
import HomeScreen from '~screens/Home.screen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Navigator = () => (
  <NavigationContainer
    theme={useColorModeValue(DefaultTheme, DarkTheme)}
    onReady={() => RNBootSplash.hide({ fade: true })}
  >
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}
    >
      <Drawer.Screen name="Main">
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{
                headerSearchBarOptions: {},
                headerShown: false,
              }}
              component={HomeScreen}
            />
          </Stack.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigator;
