import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../../utils/delay";

export const thunkExample = createAsyncThunk(
  "thunk/example",
  async (_, thunkApi) => {
    try {
      await delay(2000);
      return true;
    } catch (er) {
      thunkApi.rejectWithValue(false);
    }
  }
);

//dispatch(thunkExample());
