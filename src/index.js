/* In-build packages */
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import registerServiceWorker, { unregister } from "./registerServiceWorker";
import App from "./App";
import i18n from "./i18n.js";

/* Redux store */
import configureStore from "./store";
import { loadState, saveState } from "./localstorage";

let persisteState = loadState();
if (persisteState) {
  if (persisteState.walletReducer) {
    delete persisteState.walletReducer.cryptoPair;
  }
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
if (!getCookie("isLoggedIn")) {
  saveState({});
  persisteState = {};
}

let store = configureStore(persisteState);
store.subscribe(() => {
  saveState(store.getState());
});
/* Appication start from here */
ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </I18nextProvider>,
  document.getElementById("root")
);
// registerServiceWorker();
unregister();
