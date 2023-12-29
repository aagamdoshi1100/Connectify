import { configureStore } from "@reduxjs/toolkit";
import { userfeedSlice } from "./slices/userfeed/userfeedSlice";
import { authSlice } from "./slices/authentication/authSlice";

export default configureStore({
  reducer: {
    userfeed: userfeedSlice.reducer,
    auth: authSlice.reducer,
  },
});
