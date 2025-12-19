import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface Organization {
  id: string;
  name: string;
  role: "admin" | "employee";
}

interface OrgState {
  orgId: string | null;
  organizations: Organization[];
  isLoading: boolean;
  setOrg: (org: Organization) => void;
  clearOrg: () => void;
  fetchOrganizations: () => Promise<void>;
  createOrganization: (name: string) => Promise<void>;
  joinOrganization: (code: string) => Promise<void>;
}

export const useOrgStore = create<OrgState>((set) => ({
  orgId: null,
  organizations: [],
  isLoading: false,

  setOrg: (org) => {
    set({ orgId: org.id });
  },

  clearOrg: () => {
    set({ orgId: null });
  },

 fetchOrganizations: async () => {
  set({ isLoading: true });

  const { data, error } = await supabase.functions.invoke(
    "get_my_organizations"
  );

  if (error) {
    console.error("Error fetching organizations:", error);
    set({ isLoading: false });
    return;
  }

  // 🔥 HARD NORMALIZATION
  const orgs: Organization[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.orgs)
    ? data.orgs
    : [];

  set({
    organizations: orgs,
    isLoading: false,
  });
},


createOrganization: async (name: string) => {
  set({ isLoading: true });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    console.error("No active session");
    set({ isLoading: false });
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    "create_organization",
    {
      body: { name },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (error) {
    console.error("Error creating organization:", error);
    set({ isLoading: false });
    return;
  }

  const org = data as Organization;

  // 🔥 ONLY SET orgId
  set({
    orgId: org.id,
    isLoading: false,
  });
},



joinOrganization: async (code: string) => {
  set({ isLoading: true });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    console.error("No active session found");
    set({ isLoading: false });
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    "join_organization_by_code",
    {
      body: { code },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (error) {
    console.error("Error joining organization:", error);
    set({ isLoading: false });
    return;
  }

  const org = data as Organization;

  set((state) => ({
    organizations: [...state.organizations, org],
    orgId: org.id,
    isLoading: false,
  }));
},


}));
