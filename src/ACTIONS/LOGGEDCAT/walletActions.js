import { globalVariables } from 'Globals';
import { removeLoader, addLoader } from "../SETTINGS/settingActions";

let { API_URL } = globalVariables;

/*  
    Action : This action is called for wallet balance.
*/

export function walletBal(isLoggedIn) {
    return (dispatch) => {
        /* dispatch(addLoader()) */
        fetch(API_URL + "/wallet/balance", {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + isLoggedIn
            }

        })
            .then(response => response.json())
            .then((responseData) => {
                // console.log(responseData);
                if (responseData.status == 200)
                    dispatch(walletData(responseData));
                dispatch(removeLoader());
            })
            .catch(error => {
                dispatch(removeLoader());
            })
    }
}

/*  
    Action : This action is called for crypto-currency pair.
*/

export const walletData = (data) => dispatch => {

    dispatch({
        type: 'WALLET_DATA',
        payload: data
    })

}

/*  
    Action : This action is called to get all coins.
*/

export function getAllCoins(isLoggedIn) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/get-all-coins?page=1&limit=100", {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + isLoggedIn
            }

        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200)
                    dispatch(allCoinsData(responseData));
                dispatch(removeLoader())
            })
            .catch(error => {
                dispatch(removeLoader())
            })
    }
}

/*  
    Action : This action is called to pass coins data to reducer.
*/

export const allCoinsData = (data) => dispatch => {

    dispatch({
        type: 'ALLCOINS_DATA',
        payload: data
    })

}