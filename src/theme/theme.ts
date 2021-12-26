import { Appearance } from 'react-native';
import { ColorMode, extendTheme, StorageManager } from 'native-base';

import StorageService from '~services/Storage.service';

const APP_COLOR_MODE_KEY = '@app-color-mode';

const colors = {
  primary: {
    50: '#EEF2F6',
    100: '#CFD9E7',
    200: '#B1C1D8',
    300: '#92A9C9',
    400: '#7491B9',
    500: '#5578AA',
    600: '#446088',
    700: '#334866',
    800: '#223044',
    900: '#111822',
  },
  amber: {
    400: '#d97706',
  },
};

class ColorStorageManager implements StorageManager {
  constructor(public key: string = APP_COLOR_MODE_KEY) {}

  async get() {
    try {
      const val = await StorageService.getStringAsync(this.key);

      return val === 'dark' ? val : 'light';
    } catch (error) {
      console.error(error);
      return Appearance.getColorScheme() as ColorMode;
    }
  }

  async set(value: ColorMode) {
    try {
      await StorageService.setStringAsync(this.key, value as string);
    } catch (error) {
      console.error(error);
    }
  }
}

export const colorModeManager = new ColorStorageManager();

const theme = extendTheme({ colors });

export default theme;
