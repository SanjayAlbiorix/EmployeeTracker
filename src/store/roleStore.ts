import { create } from "zustand";
import { Platform } from "react-native";
import { zustandPersist } from "./zustandPersist";

type Role = "admin" | "employee" | null;

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
  clearRole: () => void;
}

const createStore = () =>
  create<RoleState>((set) => ({
    role: null,
    setRole: (role) => set({ role }),
    clearRole: () => set({ role: null }),
  }));

const createMobileStore = async () => {
  const { default: AsyncStorage } = await import(
    "@react-native-async-storage/async-storage"
  );

  return create<RoleState>()(
    zustandPersist<RoleState>("role-store", AsyncStorage)((set) => ({
      role: null,
      setRole: (role) => set({ role }),
      clearRole: () => set({ role: null }),
    }))
  );
};

export const useRoleStore =
  Platform.OS === "web" ? createStore() : createStore();
