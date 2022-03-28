import { createSlice } from "@reduxjs/toolkit";
import { fetchChatsById, fetchChatsByMember } from "@R/chats/middleware";
import { createNewChat, fetchAllMessages, fetchMessage, createNewMessage, deleteMessage, addMemberToChat } from "@R/messages/middleware";

//members only include users who are registered priorly: updateMembers used to update
export type User = { uid: String; name?: String };
export type Message = { messageId: String; messageFrom: User; messageTo: User; messageText: String };
export type Chat = { members: User[]; chatId: String; messages: Message[] };

const initialState: Chat = {
  chatId: "",
  members: [],
  messages: [],
};

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reset: (state) => {
      state.chatId = "";
      state.members = [];
      state.messages = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChat.fulfilled, (state, action) => {
        state.members = action.meta.arg;
        state.chatId = action.payload;
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(addMemberToChat.fulfilled, (state, action) => {
        state.members = action.payload;
      })
      .addCase(createNewMessage.fulfilled, (state, action) => {
        let copiedMessages = state.messages || [];
        let newMessage = action.meta.arg;
        delete newMessage.chatId;
        newMessage = { ...newMessage, messageId: action.payload };
        copiedMessages = [...copiedMessages, newMessage];
        state.messages = copiedMessages;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});
export default slice.reducer;
export const actions = slice.actions;
