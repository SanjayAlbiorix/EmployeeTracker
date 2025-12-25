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
  orgHydrated: boolean;
  joinRequestStatus: "none" | "pending";
  setOrg: (org: Organization) => void;
  clearOrg: () => void;
  fetchOrganizations: () => Promise<void>;
  createOrganization: (name: string) => Promise<void>;
  joinOrganization: (code: string) => Promise<void>;
  hydrateOrganizationState: () => Promise<void>;
  hydrateEmployeeState: () => Promise<void>;
}
export const useOrgStore = create<OrgState>((set) => ({
  orgId: null,
  organizations: [],
  isLoading: false,
  orgHydrated: false,
  joinRequestStatus: "none",
  setOrg: (org) => {
    set({ orgId: org.id });
  },
  clearOrg: () => {
    set({
      orgId: null,
      organizations: [],
      orgHydrated: false,
      isLoading: false,
      joinRequestStatus: "none",
    });
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
      console.error("No active session");
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
    // Success -> but we are pending now.
    // The requirement says: join_organization_by_code creates a row in organization_join_requests (status = pending)
    // So we should NOT set orgId here. We should set joinRequestStatus = "pending".
    // Re-verify strictly from requirements:
    // "join_organization_by_code -> creates a row in organization_join_requests (status = pending)"
    // "Employee must NOT access dashboard until approved"
    
    set({
      joinRequestStatus: "pending",
      orgId: null,
      isLoading: false,
    });
  },
  hydrateOrganizationState: async () => {
    const { data, error } = await supabase.functions.invoke(
      "get_my_organizations"
    );
    if (error) {
      console.error("Error hydrating organizations:", error);
      set({ orgHydrated: true });
      return;
    }
    const orgs: Organization[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.orgs)
      ? data.orgs
      : [];
    if (orgs.length === 1) {
      set({
        organizations: orgs,
        orgId: orgs[0].id,
        orgHydrated: true,
      });
    } else {
      set({
        organizations: orgs,
        orgHydrated: true,
      });
    }
  },
  hydrateEmployeeState: async () => {
    // 1. Call get_my_organizations
    const { data: orgData, error: orgError } = await supabase.functions.invoke(
      "get_my_organizations"
    );
    if (orgError) {
      console.error("Error hydrating employee state (orgs):", orgError);
      // Fallback: assume no org, but still hydrated to avoid infinite loading
      set({ orgHydrated: true }); 
      return;
    }
    const orgs: Organization[] = Array.isArray(orgData)
      ? orgData
      : Array.isArray(orgData?.orgs)
      ? orgData.orgs
      : [];
    // 2. If response has length === 1
    if (orgs.length === 1) {
      set({
        orgId: orgs[0].id,
        joinRequestStatus: "none",
        orgHydrated: true,
      });
      return;
    }
    // 3. If response length === 0
    if (orgs.length === 0) {
      // Call get_my_join_requests
      const { data: requestData, error: requestError } = await supabase.functions.invoke(
        "get_my_join_requests"
      );
      
      if (requestError) {
         console.error("Error hydrating employee state (requests):", requestError);
         set({ orgHydrated: true });
         return;
      }
      // Check if join request exists
      // Assuming get_my_join_requests returns an array or a single object. 
      // Safe bet: check if data exists and is not empty.
      // Typically single row or null.
      
      const hasRequest = Array.isArray(requestData) ? requestData.length > 0 : !!requestData;
      
      // 4. If join request exists
      if (hasRequest) {
          set({
              orgId: null,
              joinRequestStatus: "pending",
              orgHydrated: true
          });
          return;
      }
      // 5. If no join request
      set({
          orgId: null,
          joinRequestStatus: "none",
          orgHydrated: true
      });
    }
  },
}));