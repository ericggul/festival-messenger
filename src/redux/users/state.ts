import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInformation, createUserInformation } from "@R/users/middleware";

type SliceState = { uid: any; isLoading: any; name?: any; email?: any; profileImage?: any; token?: any; landingUrl?: any };
const initialState: SliceState = {
  uid: null,
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
    setLandingUrl: (state, action: any) => {
      state.landingUrl = action.payload;
      return state;
    },
    reset: (state) => {
      state.uid = null;

      state.isLoading = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInformation.fulfilled, (state, action) => {
        state.profileImage = action.payload.profileImage || null;
        state.name = action.payload.name;
      })
      .addCase(createUserInformation.fulfilled, (state, action) => {
        if (action.meta.arg.token) {
          state.token = action.meta.arg.token;
        }

        state.name = action.meta.arg.name;

        if (action.payload) {
          state.profileImage = action.payload;
        }
      });
  },
});
export default slice.reducer;
export const actions = slice.actions;
