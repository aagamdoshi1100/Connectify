import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRooms, findCurrentRoom } from "./actions";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentChats: [],
    messageList: {},
    usersChatProfiles: [],
    inputs: {
      message: "",
      room: "",
    },
  },
  reducers: {
    messageHandler: (state, action) => {
      state.inputs.message = action.payload;
    },
    receivedMessageList: (state, action) => {
      state.messageList = action.payload;
    },
    updateSentMessageToList: (state, action) => {
      state.messageList.chats = [...state.messageList.chats, action.payload];
      state.inputs.message = "";
    },
  },
  extraReducers: (builders) => {
    builders

      //find current message room
      .addCase(findCurrentRoom.pending, (state, action) => {})
      .addCase(findCurrentRoom.fulfilled, (state, action) => {
        state.messageList = action.payload.data;
      })
      .addCase(findCurrentRoom.rejected, (state, action) => {})

      //fetch all message room
      .addCase(fetchAllRooms.pending, (state, action) => {})
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        state.usersChatProfiles = action.payload.data;
      })
      .addCase(fetchAllRooms.rejected, (state, action) => {});
  },
});

export const { messageHandler, receivedMessageList, updateSentMessageToList } =
  chatSlice.actions;
