import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface AboutMeState {
  hint: null | string;
}
const initialState: AboutMeState = {
  hint: null,
};
const SLICE_NAME = "common";

const commonSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    // Action to add a new todo
    addHint: (state, action) => {
      state.hint = action.payload;
    },
  },
});

export const { addHint } = commonSlice.actions;
export const selectHint = (state: RootState) => state.common.hint;

export default commonSlice.reducer;
