import { configureStore } from "@reduxjs/toolkit";
import { userfeedSlice } from "./slices/userfeed/userfeedSlice";
import { authSlice } from "./slices/authentication/authSlice";
import userProfileSlice from "./slices/userProfile/userProfileSlice";
import footerSlice from "./slices/footer/footerSlice";
import { usersSlice } from "./slices/users/usersSlices";
import headerSlice from "./slices/header/headerSlice";
import { chatSlice } from "./slices/Chat/chatSlice";

export default configureStore({
  reducer: {
    userfeed: userfeedSlice.reducer,
    auth: authSlice.reducer,
    userProfile: userProfileSlice.reducer,
    header: headerSlice.reducer,
    footer: footerSlice.reducer,
    users: usersSlice.reducer,
    chats: chatSlice.reducer,
  },
});
