import { createSlice } from "@reduxjs/toolkit";

export type Pos = { pos: any; permittedStatus: boolean };

//Initial position: SNU Main Gate
const initialState: Pos = {
  pos: { lat: 37.46619, lng: 126.94855 },
  permittedStatus: false,
};

const slice = createSlice({
  name: "geoLocation",
  initialState,
  reducers: {
    setValues: (state, action) => {
      state.pos = action.payload.pos;
      state.permittedStatus = action.payload.permittedStatus;
    },
    reset: (state) => {
      state.pos = { lat: 0, lng: 0 };
      state.permittedStatus = false;
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
