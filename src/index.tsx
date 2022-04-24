import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoadingContainer from "@C/Loading";
import App from "./App";
import { initializeGA } from "@/utils/initializer/googleAnalytics";
import { initializeKakao } from "@/utils/initializer/kakao";
import reduxRoot from "@R/common/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@R/common/store";

initializeGA();
initializeKakao();

let persistor = persistStore(store);

let root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingContainer />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
