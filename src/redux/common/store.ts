import userReducer from "@R/users/state";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type RootStat = ReturnType<typeof store.getState>;

export default store;
