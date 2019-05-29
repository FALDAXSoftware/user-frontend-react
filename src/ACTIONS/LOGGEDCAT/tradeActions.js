import { globalVariables } from 'Globals';
/* import { removeLoader, addLoader } from "../SETTINGS/settingActions"; */

let { API_URL } = globalVariables;

/*  
    Action : This action is called for crypto-currency pair.
*/

export function cryptoCurrency(cryptoPair) {
    return (dispatch) => {
        dispatch(cryptoData(cryptoPair))
    }
}

/*  
    Action : This action is called for crypto-currency pair.
*/

export const cryptoData = (cryptoPair) => dispatch => {

    dispatch({
        type: 'CRYPT_PAIR',
        payload: cryptoPair
    })

}