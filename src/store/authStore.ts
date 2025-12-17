import { create } from "zustand";
import { Platform } from "react-native";
import { zustandPersist } from "./zustandPersist";

interface AuthState {
  isAuthenticated: boolean;
  isVerified: boolean;
  login: () => void;
  logout: () => void;
  verify: () => void;
}

const createStore = () =>
  create<AuthState>((set) => ({
    isAuthenticated: false,
    isVerified: false,
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false, isVerified: false }),
    verify: () => set({ isVerified: true }),
  }));

const createMobileStore = async () => {
  const { default: AsyncStorage } = await import(
    "@react-native-async-storage/async-storage"
  );

  return create<AuthState>()(
    zustandPersist<AuthState>("auth-store", AsyncStorage)((set) => ({
      isAuthenticated: false,
      isVerified: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false, isVerified: false }),
      verify: () => set({ isVerified: true }),
    }))
  );
};

export const useAuthStore =
  Platform.OS === "web" ? createStore() : createStore();
