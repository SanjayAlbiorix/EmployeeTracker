import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState: any = {};

const defaultSlice = createSlice({
  name: "default",
  initialState: initState,
  reducers: {
    setAuthToken: (state, payload: PayloadAction<{ token: string }>) => {
      state["AuthToken"] = payload?.payload?.token;
    },

    addItem: (state, params: PayloadAction<{ key: string; item: string }>) => {
      state[params.payload?.key] = params.payload?.item;
    },

    addObj: (state, params: PayloadAction<{ key: string; item: any }>) => {
      state[params.payload?.key] = params.payload?.item;
    },

    removeItem: (state, params: PayloadAction<{ key: string }>) => {
      state[params.payload?.key] = undefined;
    },

    clearStore: () => {
      return {};
    },
  },
});

export const { addItem, addObj, clearStore, removeItem } = defaultSlice.actions;
export const defaultReducer = defaultSlice.reducer;
export const defaultStoreState = (state: any) => state?.default;
export const storeAuthToken = (state: any) => state?.default?.AuthToken;
