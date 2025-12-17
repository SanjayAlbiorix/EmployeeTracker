import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isVerified: boolean;
  login: () => void;
  logout: () => void;
  verify: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isVerified: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, isVerified: false }),
  verify: () => set({ isVerified: true }),
}));
