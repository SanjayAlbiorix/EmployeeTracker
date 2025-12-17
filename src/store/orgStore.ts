import { create } from "zustand";
import { Platform } from "react-native";
import { zustandPersist } from "./zustandPersist";

interface OrgState {
  orgId: string | null;
  setOrg: (orgId: string) => void;
  clearOrg: () => void;
}

const createStore = () =>
  create<OrgState>((set) => ({
    orgId: null,
    setOrg: (orgId) => set({ orgId }),
    clearOrg: () => set({ orgId: null }),
  }));

const createMobileStore = async () => {
  const { default: AsyncStorage } = await import(
    "@react-native-async-storage/async-storage"
  );

  return create<OrgState>()(
    zustandPersist<OrgState>("org-store", AsyncStorage)((set) => ({
      orgId: null,
      setOrg: (orgId) => set({ orgId }),
      clearOrg: () => set({ orgId: null }),
    }))
  );
};

export const useOrgStore =
  Platform.OS === "web" ? createStore() : createStore();
