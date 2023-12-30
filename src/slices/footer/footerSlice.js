import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: "",
    id: "",
  },
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    setDataArray: (state, action) => {
      state.data.name = action.payload.name;
      state.data.id = action.payload.id;
    },
  },
  extraReducers: (builders) => {},
});

export default footerSlice;
export const { setDataArray } = footerSlice.actions;
