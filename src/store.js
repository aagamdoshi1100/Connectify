import { configureStore } from "@reduxjs/toolkit";
import { userfeedSlice } from "./slices/userfeed/userfeedSlice";

export default configureStore({
  reducer: {
    userfeed: userfeedSlice.reducer,
  },
});
