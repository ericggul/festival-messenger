import { createSlice } from "@reduxjs/toolkit";

//members only include users who are registered priorly: updateMembers used to update
type SliceState = { createdAt: any; memebers: any; chatId: any };
const initialState: SliceState = {
  createdAt: null,
  chatId: null,
  memebers: null,
};

const slice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    createNewChat: (state, action: any) => {
      console.log(state, action);
    },
    updateMembers: (state, action: any) => {
      console.log(state, action);
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
