import { create } from "zustand";

type RoleState = {
  role: "admin" | "employee" | null;
  setRole: (role: "admin" | "employee") => void;
};

export const useRoleStore = create<RoleState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
