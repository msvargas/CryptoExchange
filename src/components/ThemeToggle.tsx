import React from 'react';
import { HStack, Switch, Text, useColorMode } from 'native-base';

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        accessibilityRole="switch"
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
      />
      <Text>Light</Text>
    </HStack>
  );
}
