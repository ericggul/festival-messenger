import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewChatFromFirestore,
  addMemberToChatFromFirestore,
  fetchAllMessagesFromFirestore,
  fetchMessageFromFirestore,
  createNewMessageFromFirestore,
  deleteMessageFromFirestore,
} from "@R/messages/api";

export const createNewChat = createAsyncThunk("messages/createNewChat", async (members: any) => {
  const response: any = await createNewChatFromFirestore(members);
  return response;
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
  const response: any = await createNewMessageFromFirestore(props.chatId, props.messageText, props.messageFrom, props.messageTo);
  return response;
});

export const deleteMessage = createAsyncThunk("messages/deleteMessage", async (props: any) => {
  await deleteMessageFromFirestore(props.chatId, props.messageId);
});

export const addMemberToChat = createAsyncThunk("messages/addMemberToChat", async (params: any) => {
  const response = await addMemberToChatFromFirestore(params.chatId, params.member);
  return response;
});
