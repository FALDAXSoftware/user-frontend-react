import { combineReducers } from "redux";
import { user } from "./Client/common/reducers/userReducer";

export const RootReducer = combineReducers({
    user,
});

export const reducers = {
    user,
};
