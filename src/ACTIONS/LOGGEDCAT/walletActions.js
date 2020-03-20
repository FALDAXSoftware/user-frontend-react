import { globalVariables } from "Globals.js";
import { removeLoader, addLoader } from "../SETTINGS/settingActions";
import { LogoutUser } from "../authActions";
let { API_URL } = globalVariables;
let count = 0;
/*  
    Action : This action is called for wallet balance.
*/

export function walletBal(isLoggedIn) {
  return dispatch => {
    /* dispatch(addLoader()) */
    // console.log("Count >>>", count);
    dispatch(addLoader());
    fetch(API_URL + "/wallet/balance", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLoggedIn,
        "Accept-Language": localStorage["i18nextLng"]
      }
    })
      .then(response => response.json())
      .then(responseData => {
        count++;
        // console.log(responseData);
        if (responseData.status == 200) dispatch(walletData(responseData));
        else if (responseData.status == 403) {
          dispatch(LogoutUser(isLoggedIn));
        }
        if (count == 2) {
          count = 0;
          dispatch(removeLoader());
        }
      })
      .catch(error => {
        dispatch(removeLoader());
      });
  };
}

/*  
    Action : This action is called for crypto-currency pair.
*/

export const walletData = data => dispatch => {
  dispatch({
    type: "WALLET_DATA",
    payload: data
  });
};

/*  
    Action : This action is called to get all coins.
*/

export function getAllCoins(isLoggedIn) {
  return dispatch => {
    dispatch(addLoader());
    fetch(API_URL + "/get-all-coins?page=1&limit=100", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLoggedIn,
        "Accept-Language": localStorage["i18nextLng"]
      }
    })
      .then(response => response.json())
      .then(responseData => {
        count++;
        if (responseData.status == 200) dispatch(allCoinsData(responseData));
        else if (responseData.status == 403) {
          dispatch(LogoutUser(isLoggedIn));
        }
        if (count == 2) {
          count = 0;
          dispatch(removeLoader());
        }
      })
      .catch(error => {
        dispatch(removeLoader());
      });
  };
}

/*  
    Action : This action is called to pass coins data to reducer.
*/

export const allCoinsData = data => dispatch => {
  dispatch({
    type: "ALLCOINS_DATA",
    payload: data
  });
};
