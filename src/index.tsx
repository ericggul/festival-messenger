import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeKakao } from "./utils/initalizer/kakao";
import reduxRoot from "@R/common/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@R/common/store";

initializeKakao();

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<p>Redux 로딩중..</p>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
