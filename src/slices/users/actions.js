import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const users = await fetch(`${API_URL}/users`);
    if (!users.ok) {
      throw users;
    }
    const usersData = await users.json();
    return usersData;
  } catch (e) {
    console.error(e);
    throw e;
  }
});
