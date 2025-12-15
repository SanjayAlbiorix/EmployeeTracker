import { create } from 'zustand';
import { User } from '../types/models';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
  },
  login: (email: string, password: string) => {
    // Mock login - just set logged in state
    set({
      isLoggedIn: true,
      user: {
        id: 'admin-1',
        name: 'Admin User',
        email: email,
        role: 'admin',
      },
    });
  },
  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
    });
  },
}));

