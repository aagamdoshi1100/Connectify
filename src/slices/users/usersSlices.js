import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./actions";

const initialState = {
  users: [],
  loading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action, "extr24");
      });
  },
});
