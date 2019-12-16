/* In-build packages */
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import registerServiceWorker, { unregister } from "./registerServiceWorker";
import App from "./App";

/* Redux store */
import configureStore from "./store";
import { loadState, saveState } from "./localstorage";

let persisteState = loadState();
if (persisteState) {
  if (persisteState.walletReducer) {
    delete persisteState.walletReducer.cryptoPair;
  }
}
let store = configureStore(persisteState);
store.subscribe(() => {
  saveState(store.getState());
});
/* Appication start from here */
ReactDOM.render(
  <Router>
    <Provider store={store}>
<<<<<<< HEAD
      <App />
=======
      <App {...this.props} />
>>>>>>> c715e5522c3c05e4353612a09f87e72603cdd19a
    </Provider>
  </Router>,
  document.getElementById("root")
);
// registerServiceWorker();
unregister();
