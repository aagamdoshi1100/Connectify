import { configureStore } from "@reduxjs/toolkit";
import { userfeedSlice } from "./slices/userfeed/userfeedSlice";
import { authSlice } from "./slices/authentication/authSlice";
import userProfileSlice from "./slices/userProfile/userProfileSlice";
import footerSlice from "./slices/footer/footerSlice";
import { usersSlice } from "./slices/users/usersSlices";

export default configureStore({
  reducer: {
    userfeed: userfeedSlice.reducer,
    auth: authSlice.reducer,
    userProfile: userProfileSlice.reducer,
    footer: footerSlice.reducer,
    users: usersSlice.reducer,
  },
});
