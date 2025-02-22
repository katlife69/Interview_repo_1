// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { bindActionCreators } from "@reduxjs/toolkit";

import App from "./App.tsx";
import { HTTP_SERVICE, setupAxiosInterceptors } from "./config/axios.config.ts";
import "./index.css";
import store from "./store/index.ts";
import { decreaseFetch, increaseFetch, openMsg } from "./store/reducer/app.reducer.ts";

const actions = bindActionCreators({ increaseFetch, decreaseFetch, openMsg }, store.dispatch);

setupAxiosInterceptors(
  () => actions.increaseFetch(),
  () => actions.decreaseFetch(),
  (msg) => actions.openMsg(msg),
  [HTTP_SERVICE]
);

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</StrictMode>
);
