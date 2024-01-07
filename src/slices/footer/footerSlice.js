import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builders) => {},
});

export default footerSlice;
export const { logout } = footerSlice.actions;
