import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerMenu: {
    isEnabled: false,
  },
};

const headerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    toggleHeaderMenu: (state, action) => {
      state.headerMenu.isEnabled = !state.headerMenu.isEnabled;
    },
  },
  extraReducers: (builders) => {},
});

export default headerSlice;
export const { toggleHeaderMenu } = headerSlice.actions;
