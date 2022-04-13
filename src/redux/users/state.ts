import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInformation, createUserInformation } from "@R/users/middleware";

type SliceState = { uid: any; email: any; isLoading: any; token?: any; landingUrl?: any; name?: any; profileImage?: any };
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
    setLandingUrl: (state, action: any) => {
      state.landingUrl = action.payload;
      return state;
    },
    reset: (state) => {
      state.uid = null;
      state.email = null;
      state.isLoading = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInformation.fulfilled, (state, action) => {
        state = action.payload;
      })
      .addCase(createUserInformation.fulfilled, (state, action) => {
        state.token = action.meta.arg.token;
        state.email = action.meta.arg.email;
        state.name = action.meta.arg.name;

        console.log(action.payload);
        if (action.payload) {
          state.profileImage = action.payload;
        }
      });
  },
});
export default slice.reducer;
export const actions = slice.actions;
