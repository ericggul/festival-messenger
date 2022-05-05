import { createSlice } from "@reduxjs/toolkit";

type SliceState = { isLoading: boolean };
const initialState: SliceState = {
  isLoading: false,
};

const slice = createSlice({
  name: "usersLoading",
  initialState,
  reducers: {
    setLoading: (state, action: any) => {
      state.isLoading = action.payload;
      return state;
    },
  },
});
export default slice.reducer;
export const actions = slice.actions;
