import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllMessagesFromFirestore, fetchMessageFromFirestore, createNewMessageFromFirestore, deleteMessageFromFirestore } from "@R/messages/api";

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

export const delteMessage = createAsyncThunk("messages/deleteMessage", async (props: any) => {
  await deleteMessageFromFirestore(props.chatId, props.messageId);
});
