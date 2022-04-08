import { createSlice } from "@reduxjs/toolkit";
import { fetchChatsById, fetchChatsByMember } from "@R/chats/middleware";

import type { Chat } from "@/redux/messages/state";

export type SliceState = { chats: Chat[] };

const initialState: SliceState = {
  chats: [],
};

const slice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    reset: (state) => {
      state.chats = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatsByMember.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
  },
});
export default slice.reducer;
export const actions = slice.actions;
