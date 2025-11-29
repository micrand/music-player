import AsyncStorage from '@react-native-async-storage/async-storage';

type Response = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
};
export const useStorage = (): Response => {
  return {
    get: (key) => AsyncStorage.getItem(key),
    put: (key, value) => AsyncStorage.setItem(key, value),
  };
};
