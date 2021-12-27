import 'react-native-gesture-handler/jestSetup';

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native-bootsplash', () => {
  return {
    show: jest.fn().mockResolvedValueOnce(),
    hide: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-mmkv-storage', () => ({
  Loader: class {
    initialize = jest.fn();
  },
  useMMKVStorage: jest.fn(),
}));

jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return {
    default: mockComponent('react-native/Libraries/Components/Switch/Switch'),
  };
});
