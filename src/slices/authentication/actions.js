import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

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
