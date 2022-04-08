import { createSlice } from "@reduxjs/toolkit";
// import { fetchChatsById, fetchChatsByMember } from "@R/chats/middleware";
// import { createNewChat, addMemberToChat, fetchAllMessages, fetchMessage, createNewMessage, alterMessageReadState, alterMessageTo, deleteMessage } from "@R/messages/middleware";

//members only include users who are registered priorly: updateMembers used to update
export type User = { uid: any; name?: String };
export type MessageLocal = { toId: String; toName: String; mainText: String; latLngPos: any; color: any; font: any; imageFile?: any; musicFile?: any };

const initialState: MessageLocal = {
  toId: "",
  toName: "",
  mainText: "",
  latLngPos: null,
  color: null,
  font: null,
  imageFile: null,
  musicFile: null,
};

const slice = createSlice({
  name: "singleMessagePreview",
  initialState,
  reducers: {
    setValues: (state, action) => {
      state.toId = action.payload.toId;
      state.toName = action.payload.toName;
      state.mainText = action.payload.mainText;
      state.latLngPos = action.payload.latLngPos;
      state.color = action.payload.color;
      state.font = action.payload.font;
      state.imageFile = action.payload.imageFile || null;
      state.musicFile = action.payload.musicFile || null;
    },
    reset: (state) => {
      state.toId = "";
      state.toName = "";
      state.mainText = "";
      state.latLngPos = null;
      state.color = null;
      state.font = null;
      state.imageFile = null;
      state.musicFile = null;
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
