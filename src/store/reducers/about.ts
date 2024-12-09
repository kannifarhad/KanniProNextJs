import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoadingEnum } from "@/types/common";
import { getAboutMeInfo } from "@/services/AboutServices";

interface AboutMeInfo {
  title: string;
  shortInfo: string;
  biography: string;
}

interface AboutMeState {
  about: null | AboutMeInfo;
  loading: LoadingEnum;
  error: null | string;
}
const initialState: AboutMeState = {
  about: null,
  loading: LoadingEnum.IDLE,
  error: null,
};
const SLICE_NAME = "about";

// Async thunk to fetch todos from an API
export const fetchAboutMe = createAsyncThunk(
  `${SLICE_NAME}/fetchAboutMe`,
  async () => {
    const response = await getAboutMeInfo().then((response) => response.data);
    if (!response.title) {
      throw new Error("Failed to fetch about me");
    }
    return response;
  }
);

const aboutSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutMe.pending, (state) => {
        state.loading = LoadingEnum.LOADING;
      })
      .addCase(fetchAboutMe.fulfilled, (state, action) => {
        state.loading = LoadingEnum.SUCCESS;
        state.about = {
          title: action.payload.title,
          biography: action.payload.fullstory,
          shortInfo: action.payload.shortstory,
        };
      })
      .addCase(fetchAboutMe.rejected, (state, action) => {
        state.loading = LoadingEnum.FAILED;
        state.error = action.error?.message ?? null;
      });
  },
});

// export const { addTodo } = aboutSlice.actions;
// export const selectAbout = (state: RootState) => state.about.about;
// export const selectAboutLoading = (state: RootState) => state.about.loading;

export default aboutSlice.reducer;
