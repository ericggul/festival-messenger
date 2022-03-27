import { createSlice } from "@reduxjs/toolkit";

//messageTo may be null
type SliceState = { createdAt: any; text: String; messagesId: any; messageFrom: any; messageTo: any };
const initialState: SliceState = {
  createdAt: null,
  text: "",
  messagesId: null,
  messageFrom: null,
  messageTo: null,
};

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setFirestoreMessages: (state, action: any) => {
      return { ...state, ...action.payload };
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
