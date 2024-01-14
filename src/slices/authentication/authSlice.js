import { createSlice } from "@reduxjs/toolkit";
import { loginHandler, signUpHandler } from "./actions";

const resetAuthState = {
  inputs: {
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    inputs: {
      email: "",
      password: "",
      username: "",
      firstname: "",
      lastname: "",
    },
    success: false,
    loading: false,
    error: {
      message: "",
      enabled: false,
    },
    password: {
      hide: true,
    },
  },
  reducers: {
    inputsHandler(state, action) {
      state.inputs[action.payload.type] = action.payload.value;
    },
    passwordManager(state, action) {
      state.password.hide = !state.password.hide;
    },
    disableError(state, action) {
      state.error.message = "";
      state.error.enabled = false;
    },
    disableLoginSuccessRedirection: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        const { loggedInUser, token } = action.payload;
        localStorage.setItem("token", token);
        localStorage.setItem("username", loggedInUser.username);
        localStorage.setItem("userId", loggedInUser._id);
        state.loading = false;
        state.success = true;
        state.inputs = resetAuthState.inputs;
        state.error.message = "";
      })
      .addCase(loginHandler.rejected, (state, action) => {
        console.error(action.error.message);
        state.error.enabled = true;
        state.error.message = action.error.message;
      })
      //signup
      .addCase(signUpHandler.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        const { createdUser, token } = action.payload.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", createdUser.username);
        localStorage.setItem("userId", createdUser._id);
        state.loading = false;
        state.success = true;
        state.inputs = resetAuthState.inputs;
        state.error.message = "";
      })
      .addCase(signUpHandler.rejected, (state, action) => {
        console.error(action.error.message);
        state.error.enabled = true;
        state.loading = false;
        state.error.message = action.error.message;
      });
  },
});

export const {
  inputsHandler,
  passwordManager,
  disableError,
  disableLoginSuccessRedirection,
} = authSlice.actions;
