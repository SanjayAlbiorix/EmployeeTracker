import { create, StateCreator } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

type User = { email?: string } | null;

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: { token: string; user: User }) => void;
  logout: () => void;
  setToken: (t: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  zustandPersist<AuthState>(
    "auth-storage",
    Platform.OS === "web" ? localStorage : AsyncStorage
  )((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    login: (payload) =>
      set({
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
      }),
    logout: () => set({ token: null, user: null, isAuthenticated: false }),
    setToken: (t) => set({ token: t }),
  }))
);

type StorageLike = {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
};

export function zustandPersist<T>(key: string, storage: StorageLike) {
  return (config: StateCreator<T>): StateCreator<T> => {
    return (set, get, api) => {
      const initial = config(
        (partial) => {
          set(partial);

          // after writing → persist
          const state = get();
          try {
            storage.setItem(key, JSON.stringify(state));
          } catch {}
        },
        get,
        api
      );

      // hydration
      Promise.resolve(storage.getItem(key)).then((raw) => {
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            set(parsed);
          } catch {}
        }
      });

      return initial;
    };
  };
}
