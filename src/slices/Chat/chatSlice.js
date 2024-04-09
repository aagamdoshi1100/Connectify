import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRooms, findCurrentRoom } from "./actions";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messageWindow: {
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

    messageHandler: (state, action) => {
      state.inputs.message = action.payload;
    },
    clearMessageField: (state, action) => {
      state.inputs.message = "";
    },
    receivedMessageEventHandler: (state, action) => {
      console.log("rec event", action);

      state.rooms = state.rooms.map((room) => {
        if (room.recipient._id === action.payload.senderId) {
          return {
            ...room,
            chats: [...room.chats, action.payload],
          };
        }
        return room;
      });
    },
    sentMessageEventHandler: (state, action) => {
      state.rooms = state.rooms.map((room) => {
        if (room._id === action.payload.roomId) {
          return {
            ...room,
            chats: [...room.chats, action.payload.sentMessage],
          };
        }
        return room;
      });
      state.inputs.message = "";
    },
  },
  extraReducers: (builders) => {
    builders

      //find current message room
      .addCase(findCurrentRoom.pending, (state, action) => {})
      .addCase(findCurrentRoom.fulfilled, (state, action) => {
        if (!state.rooms.find((room) => room._id === action.payload.data._id)) {
          state.rooms = [...state.rooms, action.payload.data];
        }
      })
      .addCase(findCurrentRoom.rejected, (state, action) => {
        console.error(action.error.message);
      })

      //fetch all message room
      .addCase(fetchAllRooms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
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
  messageHandler,
  sentMessageEventHandler,
  receivedMessageEventHandler,
  clearMessageField,
} = chatSlice.actions;
