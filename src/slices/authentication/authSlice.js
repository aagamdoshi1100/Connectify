import { createSlice } from "@reduxjs/toolkit";
import { loginHandler } from "./actions";

const finalState = {
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
    isLoading: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        const { loggedInUser, token } = action.payload;
        localStorage.setItem("token", token);
        localStorage.setItem("username", loggedInUser.username);
        localStorage.setItem("userId", loggedInUser._id);
        state.inputs = finalState.inputs;
        state.error.message = "";
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.error.enabled = true;
        state.error.message = action.error.message;
      });
  },
});

export const { inputsHandler, passwordManager, disableError } =
  authSlice.actions;
