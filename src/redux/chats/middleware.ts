import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChatsFromFirestore, fetchChatsByMemberFromFirestore, fetchChatsByMembersFromFirestore } from "@R/chats/api";

export const fetchChatsById = createAsyncThunk("chats/fetchChatsById", async (chatId: String, thunkAPI: any) => {
  const response: any = await fetchChatsFromFirestore(chatId);
  return response;
});

export const fetchChatsByMember = createAsyncThunk("chats/fetchChatsByMember", async (member: any) => {
  const response: any = await fetchChatsByMemberFromFirestore(member);
  return response;
});

export const fetchChatsByMembers = createAsyncThunk("chats/fetchChatsByMembers", async (members: any[]) => {
  const response: any = await fetchChatsByMembersFromFirestore(members);
  return response;
});
