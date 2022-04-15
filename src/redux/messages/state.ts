import { createSlice } from "@reduxjs/toolkit";
import { fetchChatsById, fetchChatsByMember } from "@R/chats/middleware";
import { addMemberToChat, fetchMessage, createNewMessage, alterMessageReadState, alterMessageTo, deleteMessage } from "@/redux/messages/middleware";

//members only include users who are registered priorly: updateMembers used to update
// export type User = { uid: String; name?: String };
export type Message = { messageId: String; messageFrom: String; messageTo: String; toName: String; mainText: String; latLngPos: any; read: any; color: any; font: any; imageUrl?: any; musicUrl?: any };
export type Chat = { members: String[]; chatId: String; messages: Message[]; lastUpdatedAt: any };

const initialState: Chat = {
  chatId: "",
  members: [],
  messages: [],
  lastUpdatedAt: null,
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

      .addCase(addMemberToChat.fulfilled, (state, action) => {
        state.members = action.payload;
      })

      .addCase(createNewMessage.fulfilled, (state, action) => {
        let copiedMessages = state.messages || [];
        let newMessage = action.meta.arg;
        delete newMessage.chatId;
        newMessage = { ...newMessage, messageId: action.payload.id, imageUrl: action.payload.imageUrl, muiscUrl: action.payload.muiscUrl, read: false };
        copiedMessages = [...copiedMessages, newMessage];
        state.messages = copiedMessages;
      })
      .addCase(alterMessageReadState.fulfilled, (state, action) => {
        let copiedMessages = state.messages || [];
        copiedMessages.filter((msg) => msg.messageId === action.meta.arg.messageId).forEach((msg) => (msg.read = action.meta.arg.newReadState));
        state.messages = copiedMessages;
      })
      .addCase(alterMessageTo.fulfilled, (state, action) => {
        let copiedMessages = state.messages || [];
        copiedMessages.filter((msg) => msg.messageId === action.meta.arg.messageId).forEach((msg) => (msg.messageTo = action.meta.arg.newMessageTo));
        state.messages = copiedMessages;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});
export default slice.reducer;
export const actions = slice.actions;
