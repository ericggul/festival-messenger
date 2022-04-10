import userReducer from "@R/users/state";
import chatReducer from "@R/chats/state";
import messageReducer from "@R/messages/state";

import geoLocationReducer from "@R/geoLocation/state";
import messagePreviewReducer from "@R/singleMessage/messagePreview/state";

import { configureStore, combineReducers, ThunkDispatch, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  users: userReducer,
  chats: chatReducer,
  messages: messageReducer,
  geoLocation: geoLocationReducer,
  singleMessagePreview: messagePreviewReducer,
});

const persistConfig = {
  key: "root",
  storage,
  timeout: 100,
};

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
