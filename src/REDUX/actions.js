import {
    SET_USER_DATA,
} from "./actionTypes";

export const setLoggedUser = user => {
    return {
        type: SET_USER_DATA,
        user
    };
};
