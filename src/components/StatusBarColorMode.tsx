import React from 'react';
import { StatusBar } from 'react-native';
import { useColorModeValue } from 'native-base';

export default function StatusBarColorMode() {
  return (
    <StatusBar
      barStyle={useColorModeValue('dark-content', 'light-content')}
      translucent
      backgroundColor="transparent"
    />
  );
}
