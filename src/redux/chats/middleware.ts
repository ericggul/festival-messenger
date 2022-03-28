import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChatsFromFirestore, fetchChatsByMemberFromFirestore } from "@R/chats/api";

export const fetchChatsById = createAsyncThunk("chats/fetchChatsById", async (chatId: String, thunkAPI: any) => {
  const response: any = await fetchChatsFromFirestore(chatId);
  return response;
});

export const fetchChatsByMember = createAsyncThunk("chats/fetchChatsByMember", async (member: String) => {
  const response: any = await fetchChatsByMemberFromFirestore(member);
  return response;
});
