import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchUserInformationFromFirestore, createUserInformationFromFirestore, changeUserInformationFromFirestore } from "@R/users/api";

export const fetchUserInformation = createAsyncThunk("messages/fetchUserInformation", async (userId: String) => {
  const response: any = await fetchUserInformationFromFirestore(userId);
  return response;
});

export const createUserInformation = createAsyncThunk("messages/createUserInformation", async (user: any) => {
  await createUserInformationFromFirestore(user);
});

export const changeUserInformation = createAsyncThunk("messages/changeUserInformation", async (user: any) => {
  await changeUserInformation(user);
});
