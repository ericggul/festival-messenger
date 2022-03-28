import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChatsFromFirestore, fetchChatsByMemberFromFirestore, createNewChatFromFirestore, addMemberToChatFromFirestore } from "@R/chats/api";

export const fetchChatsById = createAsyncThunk("chats/fetchChatsById", async (chatId: String, thunkAPI: any) => {
  const response: any = await fetchChatsFromFirestore(chatId);
  return response;
});

export const fetchChatsByMember = createAsyncThunk("chats/fetchChatsByMember", async (member: String) => {
  const response: any = await fetchChatsByMemberFromFirestore(member);
  return response;
});

export const createNewChat = createAsyncThunk("chats/createNewChat", async (members: any) => {
  const response: any = await createNewChatFromFirestore(members);
  return response;
});

export const addMemberToChat = createAsyncThunk("chats/addMemberToChat", async (params: any) => {
  await addMemberToChatFromFirestore(params.chatId, params.member);
});
