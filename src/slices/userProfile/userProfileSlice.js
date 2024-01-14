import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, setProfilePicture } from "./action";

const resetProfileState = {
  uploadProfileImageStates: {
    isEnabled: false,
    image: "",
  },
};

const initialState = {
  user: [],
  userProfileId: "",
  uploadProfileImageStates: {
    isEnabled: false,
    image: "",
  },
  loading: false,
  error: [],
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    enableUpload: (state, action) => {
      state.uploadProfileImageStates.isEnabled =
        !state.uploadProfileImageStates.isEnabled;
    },
    setImageToState: (state, action) => {
      state.uploadProfileImageStates.image = action.payload;
    },
    clearImageState: (state, action) => {
      state.uploadProfileImageStates.image = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = [action.payload.profile];
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = [...state.error, action.error.message];
        state.loading = false;
      })

      //Set Profile Pic
      .addCase(setProfilePicture.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setProfilePicture.fulfilled, (state, action) => {
        state.user = [action.payload.profile];
        state.uploadProfileImageStates =
          resetProfileState.uploadProfileImageStates;
        state.loading = false;
      })
      .addCase(setProfilePicture.rejected, (state, action) => {
        state.error = [...state.error, action.error.message];
        state.loading = false;
      });
  },
});

export default userProfileSlice;
export const {
  setUserprofileId,
  enableUpload,
  setImageToState,
  clearImageState,
} = userProfileSlice.actions;
