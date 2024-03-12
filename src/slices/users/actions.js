import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const getToken = localStorage.getItem("token");
  const getUserId = localStorage.getItem("userId");
  try {
    const users = await fetch(`${API_URL}/users?userId=${getUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getToken,
      },
    });
    const usersData = await users.json();
    if (!users.ok) {
      throw usersData;
    }
    return usersData;
  } catch (err) {
    console.error({ Error_message: err.message });
    throw err;
  }
});

export const registerFollowing = createAsyncThunk(
  "users/registerFollowing",
  async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`);
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

export const followHandler = createAsyncThunk(
  "users/followHandler",
  async ({ userId, followingId }) => {
    try {
      const response = await fetch(`${API_URL}/${userId}/${followingId}`);
      const responseData = await response.json();
      console.log(response, responseData);
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

export const followBack = createAsyncThunk(
  "users/followBack",
  async ({ userId, followingId }) => {
    try {
      const response = await fetch(
        `${API_URL}/${userId}/${followingId}/followBack`
      );
      const responseData = await response.json();
      console.log(response, responseData);
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
