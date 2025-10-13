import { atomWithStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const counterAtom = atomWithStorage<number>("counter", 0, {
  getItem: async (key: string) => {
    const item = await AsyncStorage.getItem(key);
    return item != null ? JSON.parse(item) : null;
  },
  setItem: async (key: string, value: number) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
});
