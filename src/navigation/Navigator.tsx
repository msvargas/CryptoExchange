import React from 'react';
import {
  Center,
  Code,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sidebar from '~components/Sidebar';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Home = () => (
  <Center
    _dark={{ bg: 'blueGray.900' }}
    _light={{ bg: 'blueGray.50' }}
    px={4}
    flex={1}
  >
    <VStack space={5} alignItems="center">
      <Heading size="lg">Welcome to NativeBase</Heading>
      <HStack space={2} alignItems="center">
        <Text>Edit</Text>
        <Code>App.tsx</Code>
        <Text>and save to reload.</Text>
      </HStack>
      <Image source={require('~assets/bootsplash_logo.png')} alt="App logo" />
      <Link href="https://docs.nativebase.io" isExternal>
        <Text color="primary.500" underline fontSize={'xl'}>
          Learn NativeBase
        </Text>
      </Link>
    </VStack>
  </Center>
);

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
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigator;
