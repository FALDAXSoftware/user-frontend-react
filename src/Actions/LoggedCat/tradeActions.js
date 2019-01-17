import { globalVariables } from '../../Globals';
import { removeLoader, addLoader } from "../Settings/settings";

let { API_URL } = globalVariables;

export function cryptoCurrency(cryptoPair) {
    return (dispatch) => {
        dispatch(cryptoData(cryptoPair))
    }
}
export const cryptoData = (cryptoPair) => dispatch => {

    dispatch({
        type: 'CRYPT_PAIR',
        payload: cryptoPair
    })

}