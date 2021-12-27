import 'react-native';

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { fireEvent, render } from '@testing-library/react-native';

import ThemeToggle from '~components/ThemeToggle';

it('must toggle color mode using switch', async () => {
  const wrapper = ({ children }: any) => (
    <NativeBaseProvider
      initialWindowMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      {children}
    </NativeBaseProvider>
  );

  const { getByA11yRole } = render(<ThemeToggle />, { wrapper });
  fireEvent(getByA11yRole('switch'), 'valueChange', false);
});
