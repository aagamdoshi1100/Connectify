import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./action";

const initialState = {
  user: [],
  userProfileId: "",
  stat: {
    loading: false,
    error: "",
  },
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.stat.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.profile;
        state.stat.loading = false;
        state.stat.error = "";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.stat.error = action.error.message;
      });
  },
});

export default userProfileSlice;
export const { setUserprofileId } = userProfileSlice.actions;
