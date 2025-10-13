import { atom, selector } from "recoil";

// Atom (source of truth)
export const counterState = atom<number>({
  key: "counterState",
  default: 0,
});

// Selector (derived state)
export const doubledCounter = selector<number>({
  key: "doubledCounter",
  get: ({ get }) => {
    const count = get(counterState);
    return count * 2;
  },
});
