import { createSlice } from "@reduxjs/toolkit";

export type User = { uid: any; name?: String };
export type MessageLocal = { toId: String; toName: String; mainText: String; uuid: String; latLngPos: any; color: any; font: any };

const initialState: MessageLocal = {
  toId: "",
  toName: "",
  mainText: "",
  uuid: "",
  latLngPos: null,
  color: null,
  font: null,
};

const slice = createSlice({
  name: "singleMessagePreview",
  initialState,
  reducers: {
    setValues: (state, action) => {
      state.toId = action.payload.toId;
      state.toName = action.payload.toName;
      state.mainText = action.payload.mainText;
      state.uuid = action.payload.uuid;
      state.latLngPos = action.payload.latLngPos;
      state.color = action.payload.color;
      state.font = action.payload.font;
    },
    reset: (state) => {
      state.toId = "";
      state.toName = "";
      state.mainText = "";
      state.uuid = "";
      state.latLngPos = null;
      state.color = null;
      state.font = null;
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
