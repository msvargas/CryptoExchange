import React from 'react';
import { Provider } from 'react-redux';

import StatusBarColorMode from '~components/StatusBarColorMode';
import Navigator from '~navigation/Navigator';
import { store } from '~store/store';
import { ThemeProvider } from '~theme';

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <StatusBarColorMode />
      <Navigator />
    </ThemeProvider>
  </Provider>
);

export default App;
