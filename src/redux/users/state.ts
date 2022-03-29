import { createSlice } from "@reduxjs/toolkit";

type SliceState = { uid: any; email: any; isLoading: any; name?: any; profileImage?: any };
const initialState: SliceState = {
  uid: null,
  email: null,
  isLoading: false,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setValue: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    setLoading: (state, action: any) => {
      state.isLoading = action.payload;
      return state;
    },
    reset: (state) => {
      state.uid = null;
      state.email = null;
      state.isLoading = false;
      return state;
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
