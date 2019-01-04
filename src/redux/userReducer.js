import { SET_USER_DATA } from "./actionTypes";

export const user = (state = [], action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return action.payload;

        default:
            return state;
    }
};
