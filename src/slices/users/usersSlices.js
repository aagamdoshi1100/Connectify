import { createSlice } from "@reduxjs/toolkit";
import {
  registerFollowing,
  fetchUsers,
  followHandler,
  followBack,
  deleteUserAccount,
  userFeedback,
} from "./actions";

const initialState = {
  users: [],
  following: [],
  loadingUsers: false,
  error_Message: "",
  accountDeletionReq: {
    isEnabledConfirmation: false,
  },
  feedback: {
    isEnabled: false,
    rating: "",
    message: "",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    manageConfirmationPage: (state, action) => {
      state.accountDeletionReq.isEnabledConfirmation =
        !state.accountDeletionReq.isEnabledConfirmation;
    },
    manageFeedbackPage: (state, action) => {
      state.feedback.isEnabled = !state.feedback.isEnabled;
      state.feedback.message = "";
    },
    manageFeedbackInput: (state, action) => {
      state.feedback = {
        ...state.feedback,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchUsers.pending, (state, action) => {
        state.loadingUsers = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loadingUsers = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error_Message = action.error.message;
        state.loadingUsers = false;
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
      })

      // Delete user account
      .addCase(deleteUserAccount.pending, (state, action) => {})
      .addCase(deleteUserAccount.fulfilled, (state, action) => {})
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.error_Message = action.error.message;
      })
      // User feedback
      .addCase(userFeedback.pending, (state, action) => {})
      .addCase(userFeedback.fulfilled, (state, action) => {})
      .addCase(userFeedback.rejected, (state, action) => {
        state.error_Message = action.error.message;
      });
  },
});

export const {
  manageConfirmationPage,
  manageFeedbackPage,
  manageFeedbackInput,
} = usersSlice.actions;
