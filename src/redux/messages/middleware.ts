import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllMessagesFromFirestore, fetchMessageFromFirestore, createNewMessageFromFirestore, deleteMessageFromFirestore } from "@R/messages/api";

export const fetchAllMessages = createAsyncThunk("chats/fetchAllMessages", async (chatId: String) => {
  const response: any = await fetchAllMessagesFromFirestore(chatId);
  return response;
});

export const fetchMessage = createAsyncThunk("chats/fetchMessage", async (props: any) => {
  const response: any = await fetchMessageFromFirestore(props.chatId, props.messageId);
  return response;
});

export const createNewMessage = createAsyncThunk("chats/createNewMessage", async (props: any) => {
  const response: any = await createNewMessageFromFirestore(props.chatId, props.messageText, props.messageFrom, props.messageTo);
  return response;
});

export const deleteMessage = createAsyncThunk("chats/deleteMessage", async (props: any) => {
  await deleteMessageFromFirestore(props.chatId, props.messageId);
});
