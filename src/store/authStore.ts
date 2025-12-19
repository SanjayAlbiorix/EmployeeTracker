import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface AuthState {
  session: any | null;
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isVerified: boolean;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  set({ isLoading: true });
  
  // Initialize auth state listener
  supabase.auth.getSession().then(({ data: { session } }) => {
    set({ 
      session, 
      user: session?.user ?? null,
      isAuthenticated: !!session?.user,
      isVerified: !!session?.user?.email_confirmed_at,
      isLoading: false
    });
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    // Strict derivation from session
    set({ 
      session, 
      user: session?.user ?? null, 
      isAuthenticated: !!session?.user,
      isVerified: !!session?.user?.email_confirmed_at,
      isLoading: false
    });
  });

  return {
    session: null,
    user: null,
    isLoading: true, // Start loading
    isAuthenticated: false,
    isVerified: false,
    logout: async () => {
      await supabase.auth.signOut();
    },
  };
});
