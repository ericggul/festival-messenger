import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewChatFromFirestore,
  addMemberToChatFromFirestore,
  updateChatLastUpdatedAtFromFirestore,
  fetchAllMessagesFromFirestore,
  fetchMessageFromFirestore,
  createNewMessageFromFirestore,
  alterMessageReadStateFromFirestore,
  alterMessageToFromFireStore,
  deleteMessageFromFirestore,
} from "@/redux/messages/api";

export const createNewChat = createAsyncThunk("messages/createNewChat", async (members: any) => {
  const response: any = await createNewChatFromFirestore(members);
  return response;
});

export const addMemberToChat = createAsyncThunk("messages/addMemberToChat", async (params: any) => {
  const response = await addMemberToChatFromFirestore(params.chatId, params.members);
  return response;
});

export const updateChatLastUpdatedAt = createAsyncThunk("messages/updateChatLastUpdatedAt", async (chatId: any) => {
  await updateChatLastUpdatedAtFromFirestore(chatId);
});

export const fetchAllMessages = createAsyncThunk("messages/fetchAllMessages", async (chatId: String) => {
  const response: any = await fetchAllMessagesFromFirestore(chatId);
  return response;
});

export const fetchMessage = createAsyncThunk("messages/fetchMessage", async (props: any) => {
  const response: any = await fetchMessageFromFirestore(props.chatId, props.messageId);
  return response;
});

export const createNewMessage = createAsyncThunk("messages/createNewMessage", async (props: any) => {
  const response: any = await createNewMessageFromFirestore(props);
  return response;
});

export const alterMessageReadState = createAsyncThunk("messages/alterMessageReadState", async (props: any) => {
  await alterMessageReadStateFromFirestore(props.chatId, props.messageId, props.newReadState);
});
export const alterMessageTo = createAsyncThunk("messages/alterMessageTo", async (props: any) => {
  await alterMessageToFromFireStore(props.chatId, props.messageId, props.newMessageTo);
});

export const deleteMessage = createAsyncThunk("messages/deleteMessage", async (props: any) => {
  await deleteMessageFromFirestore(props.chatId, props.messageId);
});
