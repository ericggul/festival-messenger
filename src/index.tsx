import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeKakao } from "./utils/initalizer/kakao";
import reduxRoot from "@R/common/store";
import { Provider } from "react-redux";
import store from "@R/common/store";

initializeKakao();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
