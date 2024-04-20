import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, CHAT_API_URL } from "../../constants";

export const wakeUpRenderServer = createAsyncThunk(
  "auth/wakeUpRenderServer",
  async () => {
    try {
      const response = await fetch(`${CHAT_API_URL}`);
      const serverResponse = await response.json();
      if (!response.ok) {
        throw serverResponse;
      }
      console.log(serverResponse, "success");
      return serverResponse;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const loginHandler = createAsyncThunk(
  "auth/loginHandler",
  async ({ username, password }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const loginResponse = await response.json();
      if (!response.ok) {
        throw loginResponse;
      }
      return loginResponse;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  }
);

export const signUpHandler = createAsyncThunk(
  "auth/signUpHandler",
  async (data) => {
    try {
      const signupResponse = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await signupResponse.json();
      if (!signupResponse.ok) {
        throw responseData;
      }
      return responseData;
    } catch (e) {
      console.error("Error while creating user: ", e);
      throw e;
    }
  }
);
