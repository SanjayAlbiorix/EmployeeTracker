import { StateCreator } from "zustand";

type StorageLike = {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
};

export function zustandPersist<T>(key: string, storage: StorageLike) {
  return (config: StateCreator<T>): StateCreator<T> => {
    return (set, get, api) => {
      const initialState = config(
        (partial) => {
          set(partial);
          try {
            const state = get();
            storage.setItem(key, JSON.stringify(state));
          } catch {}
        },
        get,
        api
      );

      Promise.resolve(storage.getItem(key)).then((raw) => {
        if (raw) {
          try {
            set(JSON.parse(raw));
          } catch {}
        }
      });

      return initialState;
    };
  };
}
