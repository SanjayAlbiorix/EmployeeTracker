import { create } from 'zustand';
import { User } from '../types/models';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  setRole: (role: User['role']) => void;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isEmployee: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
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
  setRole: (role) => {
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    }));
  },
  isAdmin: () => {
    const user = get().user;
    return user?.role === 'admin';
  },
  isManager: () => {
    const user = get().user;
    return user?.role === 'manager';
  },
  isEmployee: () => {
    const user = get().user;
    return user?.role === 'employee';
  },
}));

