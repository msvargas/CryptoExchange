import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  VStack,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import config from '~config';

import MenuButton from './MenuButton';
import ThemeToggle from './ThemeToggle';

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props;
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);

  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handlePressMenuAbout = useCallback(() => {
    Linking.openURL(config.githubProfileUrl);
  }, []);

  return (
    <Box safeArea flex={1} bg={useColorModeValue('blue.50', undefined)} p={7}>
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700'),
            }}
          />
        </HStack>
        <Avatar
          source={{
            uri: config.avatarProfileUrl,
          }}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="darkBlue.600"
          borderWidth={3}
        />
        <Heading mb={4} size="xl">
          {config.author}
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon="inbox"
        >
          Crypto Exchange
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon="info"
        >
          About
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </Box>
  );
};

export default Sidebar;
