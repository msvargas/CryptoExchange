import MMKVStorage, { useMMKVStorage } from 'react-native-mmkv-storage';

const StorageService = new MMKVStorage.Loader().initialize(); // Returns an MMKV Instance

export const useStorage = (key: string, defaultValue?: unknown) =>
  useMMKVStorage(key, StorageService, defaultValue);

export default StorageService;
