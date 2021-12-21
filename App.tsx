import React from 'react';
import {
  Center,
  Code,
  Heading,
  HStack,
  Link,
  StatusBar,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from '~theme';

const Stack = createNativeStackNavigator();

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggle = () => {
    toggleColorMode();
  };
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light' ? true : false}
        onToggle={handleToggle}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

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
      <Link href="https://docs.nativebase.io" isExternal>
        <Text color="primary.500" underline fontSize={'xl'}>
          Learn NativeBase
        </Text>
      </Link>
      <ToggleDarkMode />
    </VStack>
  </Center>
);

const AppContainer = () => (
  <>
    <StatusBar
      barStyle={useColorModeValue('dark-content', 'light-content')}
      translucent
      backgroundColor="transparent"
    />
    <NavigationContainer
      theme={useColorModeValue(DefaultTheme, DarkTheme)}
      onReady={() => RNBootSplash.hide({ fade: true })}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

const App = () => {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
};

export default App;
