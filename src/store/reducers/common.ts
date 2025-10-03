import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ModelsTypes } from "@/components/sections/Hero/constants";

interface AboutMeState {
  hint: null | string;
  infoBox: null | ModelsTypes;
}
const initialState: AboutMeState = {
  hint: null,
  infoBox: null,
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
    setInfoBox: (state, action) => {
      state.infoBox = action.payload;
    },
    resetInfoBox: (state) => {
      state.infoBox = null;
    },
  },
});

export const { addHint, setInfoBox, resetInfoBox } = commonSlice.actions;
export const selectHint = (state: RootState) => state.common.hint;
export const selectInfoBox = (state: RootState) => state.common.infoBox;

export default commonSlice.reducer;
