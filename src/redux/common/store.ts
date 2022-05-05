import userReducer from "@R/users/state";
import chatReducer from "@R/chats/state";
import messageReducer from "@R/messages/state";

import messagePreviewReducer from "@R/singleMessage/messagePreview/state";
import usersLoadingReducer from "@R/usersLoading/state";

import { configureStore, combineReducers, ThunkDispatch, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["usersLoading"],
  timeout: 100,
};

const usersLoadingPersistConfig = {
  key: "usersLoading",
  storage: sessionStorage,
};

const reducers = combineReducers({
  users: userReducer,
  chats: chatReducer,
  messages: messageReducer,
  singleMessagePreview: messagePreviewReducer,
  usersLoading: persistReducer(usersLoadingPersistConfig, usersLoadingReducer),
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  // middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export default store;
export const persistor = persistStore(store);
