import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerMenu: {
    isEnabled: false,
  },
  searchManager: {
    isEnabled: false,
  },
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleHeaderMenu: (state, action) => {
      state.headerMenu.isEnabled = !state.headerMenu.isEnabled;
    },
    toggleSearch: (state, action) => {
      state.searchManager.isEnabled = !state.searchManager.isEnabled;
    },
  },
  extraReducers: (builders) => {},
});

export default headerSlice;
export const { toggleHeaderMenu, toggleSearch } = headerSlice.actions;
