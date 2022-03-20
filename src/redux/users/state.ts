import { configureStore } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

type SliceState = { uid: any; email: any; isLoading: any };
const initialState: SliceState = {
  uid: null,
  email: null,
  isLoading: null,
};

const slice = createSlice({
  name: "users",
  initialState: initialState as SliceState,
  reducers: {
    setValue: (state: any, action: any) => {
      console.log(action);
      state = { ...state, ...action.payload };
    },
    setLoading: (state: any, action: any) => {
      state.isLoading = action.isLoading;
    },
    reset: (state: any) => {
      state.uid = null;
      state.email = null;
      state.isLoading = null;
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
