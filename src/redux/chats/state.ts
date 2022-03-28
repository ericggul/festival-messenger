import { createSlice } from "@reduxjs/toolkit";
import { createNewChat, addMemberToChat } from "@R/chats/middleware";
import { createNewMessage, deleteMessage } from "@R/messages/middleware";

//members only include users who are registered priorly: updateMembers used to update
type User = { uid: String; name?: String };
type Message = { messageId: String; messageFrom: User; messageTo: User; messageText: String };
type SliceState = { members: User[]; chatId: String; messages: Message[] };

const initialState: SliceState = {
  chatId: "",
  members: [],
  messages: [],
};

const slice = createSlice({
  name: "chats",
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
