import React from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';
import { useColorModeValue } from 'native-base';

function RefreshControlColorMode(props: RefreshControlProps) {
  const refreshControlColor = useColorModeValue(undefined, 'white');

  return (
    <RefreshControl
      colors={refreshControlColor ? [refreshControlColor] : undefined}
      tintColor={refreshControlColor}
      {...props}
    />
  );
}

export default RefreshControlColorMode;
