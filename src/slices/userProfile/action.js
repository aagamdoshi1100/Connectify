import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (userId) => {
    try {
      const userProfile = await fetch(`${API_URL}/users/${userId}/profile`);
      const user = await userProfile.json();
      if (!userProfile.ok) {
        throw user;
      }
      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const setProfilePicture = createAsyncThunk(
  "userProfile/setProfilePicture",
  async ({ image, userId }) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/profileImage`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ profileIcon: image }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw responseData;
      }
      return responseData;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
