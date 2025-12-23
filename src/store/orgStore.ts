import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

/* ============================================================
   TYPES
============================================================ */

interface Organization {
  id: string;
  name: string;
  role: "admin" | "employee";
}

interface OrgState {
  orgId: string | null;
  organizations: Organization[];
  isLoading: boolean;

  setOrgId: (orgId: string) => void;
  clearOrg: () => void;

  fetchOrganizations: () => Promise<void>;
  createOrganization: (name: string) => Promise<void>;
  joinOrganization: (code: string) => Promise<void>;
}

/* ============================================================
   PERSISTENCE HELPERS (OUR METHOD)
============================================================ */

const ORG_STORAGE_KEY = "active_org_id";

const loadOrgId = (): string | null => {
  try {
    return typeof window !== "undefined"
      ? localStorage.getItem(ORG_STORAGE_KEY)
      : null;
  } catch {
    return null;
  }
};

const saveOrgId = (orgId: string | null) => {
  try {
    if (typeof window === "undefined") return;

    if (orgId) {
      localStorage.setItem(ORG_STORAGE_KEY, orgId);
    } else {
      localStorage.removeItem(ORG_STORAGE_KEY);
    }
  } catch {
    // ignore storage errors
  }
};

/* ============================================================
   STORE
============================================================ */

export const useOrgStore = create<OrgState>((set) => ({
  /* ================== STATE ================== */
  orgId: loadOrgId(),
  organizations: [],
  isLoading: false,

  /* ================== BASIC ACTIONS ================== */
  setOrgId: (orgId) => {
    saveOrgId(orgId);
    set({ orgId });
  },

  clearOrg: () => {
    saveOrgId(null);
    set({
      orgId: null,
      organizations: [],
      isLoading: false,
    });
  },

  /* ================== FETCH ORGS ================== */
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

    // 🔥 HARD NORMALIZATION (MANDATORY)
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

  /* ================== CREATE ORG ================== */
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

    // ✅ ONLY set orgId (navigation reacts)
    saveOrgId(org.id);

    set({
      orgId: org.id,
      isLoading: false,
    });
  },

  /* ================== JOIN ORG ================== */
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

    const org = data as Organization;

    saveOrgId(org.id);

    set({
      orgId: org.id,
      isLoading: false,
    });
  },
}));
