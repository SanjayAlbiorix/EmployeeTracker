import { create } from "zustand";

type RoleState = {
  role: "admin" | "employee" | null;
  setRole: (role: "admin" | "employee" | null) => void;
};

export const useRoleStore = create<RoleState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
