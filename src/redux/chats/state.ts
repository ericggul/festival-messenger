import { createSlice } from "@reduxjs/toolkit";
import { fetchChatsById, fetchChatsByMember, createNewChat, addMemberToChat } from "@R/chats/middleware";

//members only include users who are registered priorly: updateMembers used to update
type SliceState = { members: any; chatId: any };
const initialState: SliceState = {
  chatId: null,
  members: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatsById.fulfilled, (state, action: any) => {
        console.log("here!");
      })
      .addCase(fetchChatsByMember.fulfilled, (state, action: any) => {
        console.log("here!");
      })
      .addCase(createNewChat.fulfilled, (state, action: any) => {
        state.members = action.meta.arg;
        state.chatId = action.payload;
      })
      .addCase(addMemberToChat.fulfilled, (state, action: any) => {
        state.members = action.payload;
      });
  },
});
export default slice.reducer;
export const actions = slice.actions;
