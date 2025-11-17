import { createSlice } from "@reduxjs/toolkit";

const initState: any = {};

const defaultSlice = createSlice({
  name: "default",
  initialState: initState,
  reducers: {},
});

export const {} = defaultSlice.actions;
export const defaultReducer = defaultSlice.reducer;
