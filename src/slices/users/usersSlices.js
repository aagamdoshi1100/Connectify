import { createSlice } from "@reduxjs/toolkit";
import {
  registerFollowing,
  fetchUsers,
  followHandler,
  followBack,
} from "./actions";

const initialState = {
  users: [],
  following: [],
  loadingUsers: false,
  error: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchUsers.pending, (state, action) => {
        state.loadingUsers = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loadingUsers = false;
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loadingUsers = false;
        console.log(action, "extr24");
      })
      //follow manager
      .addCase(followHandler.pending, (state, action) => {})
      .addCase(followHandler.fulfilled, (state, action) => {
        state.following = action.payload.response;
      })
      .addCase(followHandler.rejected, (state, action) => {
        console.log(action.error.message);
      })
      //follow structure creation
      .addCase(registerFollowing.pending, (state, action) => {})
      .addCase(registerFollowing.fulfilled, (state, action) => {
        state.following = action.payload.response;
      })
      .addCase(registerFollowing.rejected, (state, action) => {
        console.log(action.error.message);
      })
      //follow back
      .addCase(followBack.pending, (state, action) => {})
      .addCase(followBack.fulfilled, (state, action) => {
        state.following = action.payload.response;
      })
      .addCase(followBack.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});
