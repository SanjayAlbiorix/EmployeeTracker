import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { thunkExample } from "./thunk";

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

    sagaRequest: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.loading = true;
      state.saga = null;
    },
    sagaSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.saga = action.payload;
    },
    sagaFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.saga = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkExample.pending, (state) => {
      state.thunkLoad = true;
    });
    builder.addCase(thunkExample.fulfilled, (state, action) => {
      state.thunk = action.payload;
      state.thunkLoad = false;
    });
    builder.addCase(thunkExample.rejected, (state, action) => {
      state.thunk = action.payload;
      state.thunkLoad = false;
    });
  },
});

export const {
  addItem,
  addObj,
  clearStore,
  removeItem,
  sagaFailure,
  sagaRequest,
  sagaSuccess,
} = defaultSlice.actions;
export const defaultReducer = defaultSlice.reducer;
export const defaultStoreState = (state: any) => state?.default;
export const storeAuthToken = (state: any) => state?.default?.AuthToken;
