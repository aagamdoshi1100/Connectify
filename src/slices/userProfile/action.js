import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (userId) => {
    try {
      const userProfile = await fetch(`${API_URL}/users/${userId}/profile`);
      const user = await userProfile.json();
      console.log(userProfile, user, "10");
      if (!userProfile.ok) {
        throw userProfile;
      }
      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
