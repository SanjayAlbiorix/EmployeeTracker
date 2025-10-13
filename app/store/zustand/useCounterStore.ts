import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { delay } from "../../utils/delay";

interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  asyncTask: (val: string) => void;
  isCalled: string;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      isCalled: "",
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      asyncTask: async (val) => {
        set({ isCalled: val });
        await delay(2000);
        set({ isCalled: "" });
      },
    }),
    { name: "counter-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);
