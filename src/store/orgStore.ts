import { create } from "zustand";

interface OrgState {
  orgId: string | null;
  setOrg: (orgId: string) => void;
  clearOrg: () => void;
}

export const useOrgStore = create<OrgState>((set) => ({
    orgId: null,
    setOrg: (orgId) => set({ orgId }),
    clearOrg: () => set({ orgId: null }),
  }));
