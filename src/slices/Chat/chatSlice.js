import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRooms, findCurrentRoom } from "./actions";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    // currentChat: {},
    // messageList: {},
    messageWindow: {
      userChats: [],
      recipient: {},
      _ids: {
        senderId: "",
        recipientId: "",
      },
    },
    rooms: [],
    inputs: {
      message: "",
      room: "",
    },
    loading: false,
  },
  reducers: {
    setSenderRecipientDetails: (state, action) => {
      state.messageWindow._ids = {
        senderId: action.payload.senderId,
        recipientId: action.payload.recipientId,
      };
    },
    messageWindowHandler: (state, action) => {
      state.messageWindow.userChats = action.payload.userChats;
      state.messageWindow.recipient = action.payload.recipient;
    },
    messageHandler: (state, action) => {
      state.inputs.message = action.payload;
    },
    clearMessageField: (state, action) => {
      state.inputs.message = "";
    },
    receivedMessageEventHandler: (state, action) => {
      state.messageWindow.userChats = [
        ...state.messageWindow.userChats,
        action.payload,
      ];
    },
  },
  extraReducers: (builders) => {
    builders

      //find current message room
      .addCase(findCurrentRoom.pending, (state, action) => {})
      .addCase(findCurrentRoom.fulfilled, (state, action) => {
        // console.log(action.payload, "messageist");
        // state.messageList = action.payload.data;
      })
      .addCase(findCurrentRoom.rejected, (state, action) => {})

      //fetch all message room
      .addCase(fetchAllRooms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        console.log(action.payload, "fetch all mess room,user chat profiles");
        state.rooms = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.loading = false;
        console.error(action.error.message);
      });
  },
});

export const {
  setSenderRecipientDetails,
  messageWindowHandler,
  messageHandler,
  receivedMessageEventHandler,
  clearMessageField,
} = chatSlice.actions;
