import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import reducer from "./store/reducers/auth";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

// reportWebVitals();

ReactDOM.render(app, document.getElementById("root"));

// serviceWorker.unregister();
