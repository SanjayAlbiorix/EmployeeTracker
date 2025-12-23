import { create } from "zustand";
import { zustandPersist } from "./zustandPersist";

type RoleState = {
  role: "admin" | "employee" | null;
  setRole: (role: "admin" | "employee" | null) => void;
  clearRole: () => void;
};

export const useRoleStore = create<RoleState>()(
  zustandPersist<RoleState>("role-store", localStorage)((set) => ({
    role: null,
    setRole: (role) => set({ role }),
    clearRole: () => set({ role: null }),
  }))
);
