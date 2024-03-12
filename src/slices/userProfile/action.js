import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (userId) => {
    const getToken = localStorage.getItem("token");
    try {
      const userProfileResponse = await fetch(
        `${API_URL}/users/${userId}/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: getToken,
          },
        }
      );
      const userProfile = await userProfileResponse.json();
      if (!userProfileResponse.ok) {
        throw userProfile;
      }
      return userProfile;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const setProfilePicture = createAsyncThunk(
  "userProfile/setProfilePicture",
  async ({ image, userId }) => {
    const getToken = localStorage.getItem("token");
    try {
      const setProfilePicResponse = await fetch(
        `${API_URL}/users/${userId}/profileImage`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            authorization: getToken,
          },
          body: JSON.stringify({ profileIcon: image }),
        }
      );
      const responseData = await setProfilePicResponse.json();
      if (!setProfilePicResponse.ok) {
        throw responseData;
      }
      return responseData;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const setEditedData = createAsyncThunk(
  "userProfile/setEditedData",
  async ({ loggedUserId, data }) => {
    const getToken = localStorage.getItem("token");
    try {
      const editProfileResponse = await fetch(
        `${API_URL}/users/${loggedUserId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            authorization: getToken,
          },
          body: JSON.stringify({ data }),
        }
      );
      const responseData = await editProfileResponse.json();
      console.log(editProfileResponse, responseData, data, "76");
      if (!editProfileResponse.ok) {
        throw responseData;
      }
      return responseData;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);
