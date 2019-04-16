import { globalVariables } from '../../Globals';
import { removeLoader, addLoader } from "../Settings/settings";

let { API_URL } = globalVariables;

export function walletBal(isLoggedIn, currency = null) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/wallet/balance", {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + isLoggedIn
            },
            body: JSON.stringify({
                currency: currency,
            })

        })
            .then(response => response.json())
            .then((responseData) => {
                /* this.setState({mywallet:responseData}); */
                dispatch(walletData(responseData));
                dispatch(removeLoader())
            })
            .catch(error => {
            })
    }
}
export const walletData = (data) => dispatch => {

    dispatch({
        type: 'WALLET_DATA',
        payload: data
    })

}
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
                /*  this.setState({myCoins:responseData}); */
                dispatch(allCoinsData(responseData));
            })
            .catch(error => {
            })
    }
}
export const allCoinsData = (data) => dispatch => {

    dispatch({
        type: 'ALLCOINS_DATA',
        payload: data
    })

}