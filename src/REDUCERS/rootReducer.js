import { combineReducers } from "redux";
import simpleReducer from "./Auth";
import passwordReducer from "./changePassword";
import themeReducer from "./themeReducer";
import walletReducer from "./walletReducer";

export default combineReducers({
  passwordReducer,
  simpleReducer,
  themeReducer,
  walletReducer
});
