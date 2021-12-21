import React from 'react';
import { NativeBaseProvider } from 'native-base';

import theme, { colorModeManager } from './theme';

const ThemeProvider: React.FC = ({ children }) => (
  <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
    {children}
  </NativeBaseProvider>
);

export default ThemeProvider;
