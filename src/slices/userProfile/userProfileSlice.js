import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, setEditedData, setProfilePicture } from "./action";

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
  editUserProfile: {
    isEnabled: false,
  },
  userProfileData: {
    dob: "",
    bio: "",
    email: "",
    country: "",
    interest: "",
    interestArr: [],
  },
  isUserDetailsSelected: "User details",
  error: [],
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    enableUpload: (state, action) => {
      state.uploadProfileImageStates.isEnabled = true;
    },
    disableUpload: (state, action) => {
      state.uploadProfileImageStates.isEnabled = false;
      state.uploadProfileImageStates.image = "";
    },
    setImageToState: (state, action) => {
      state.uploadProfileImageStates.image = action.payload;
    },
    clearImageState: (state, action) => {
      state.uploadProfileImageStates.image = "";
    },
    enableProfileForEditing: (state, action) => {
      state.editUserProfile.isEnabled = !state.editUserProfile.isEnabled;
    },
    profileDataFeeder: (state, action) => {
      state.userProfileData[action.payload.key] = action.payload.value;
    },
    interestsFeeder: (state, action) => {
      state.userProfileData.interestArr = [
        ...state.userProfileData.interestArr,
        state.userProfileData.interest,
      ];
      state.userProfileData.interest = "";
    },
    removeInterest: (state, action) => {
      state.userProfileData.interestArr =
        state.userProfileData.interestArr.filter(
          (int) => int !== action.payload
        );
    },
    togglerUserDetailsAndPosts: (state, action) => {
      state.isUserDetailsSelected = action.payload;
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
        state.userProfileData = {
          dob: action.payload.profile.dob,
          bio: action.payload.profile.bio,
          email: action.payload.profile.email,
          country: action.payload.profile.country,
          interest: "",
          interestArr: action.payload.profile.interestArr,
        };
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
      })

      //Set edited data
      .addCase(setEditedData.pending, (state, action) => {})
      .addCase(setEditedData.fulfilled, (state, action) => {
        state.user = [action.payload.profile];
        state.userProfileData = {
          dob: action.payload.profile.dob,
          bio: action.payload.profile.bio,
          email: action.payload.profile.email,
          country: action.payload.profile.country,
          interest: "",
          interestArr: action.payload.profile.interestArr,
        };
        state.editUserProfile.isEnabled = false;
      })
      .addCase(setEditedData.rejected, (state, action) => {
        console.error = action.error.message;
      });
  },
});

export default userProfileSlice;
export const {
  setUserprofileId,
  enableUpload,
  disableUpload,
  setImageToState,
  clearImageState,
  enableProfileForEditing,
  profileDataFeeder,
  interestsFeeder,
  removeInterest,
  isUserDetailsSelected,
  togglerUserDetailsAndPosts,
} = userProfileSlice.actions;
