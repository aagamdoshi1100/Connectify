import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const findCurrentRoom = createAsyncThunk(
  "chat/findCurrentRoom",
  async ({ senderId, recipientId }) => {
    try {
      const response = await fetch(
        `${API_URL}/chat/${senderId}/${recipientId}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw responseData;
      }
      console.log(response);
      return responseData;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const fetchAllRooms = createAsyncThunk(
  "chat/fetchAllRooms",
  async (loggedUserId) => {
    try {
      const response = await fetch(`${API_URL}/chat/user/${loggedUserId}`);
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
