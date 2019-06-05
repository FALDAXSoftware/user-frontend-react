import { globalVariables } from 'Globals';
import { getProfileDataAction } from "./settingActions";
import { removeLoader, addLoader } from "./settingActions";
let { API_URL } = globalVariables;

/*  
    Action : This action is called to change password.
*/
export function passwordChange(isLoggedIn, values) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/changePassword", {
            method: "post",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200)
                    dispatch(passwordChangeData(responseData))
                dispatch(removeLoader())
            })
            .catch(error => { })
    }
}

/*  
    Action : This action is called to clear password.
*/
export function clearPassword() {
    return (dispatch) => {
        dispatch(passwordChangeData())
    }
}

/*  
    Action : This action is called to pass data change password to redux.
*/
export const passwordChangeData = (data) => dispatch => {

    dispatch({
        type: 'CHANGEPASSWORD',
        payload: data
    })

}

/*  
    Action : This action is called to setup two factor.
*/
export function TF_Enable(isLoggedIn) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/setup-two-factor", {
            method: "post",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            },
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200)
                    dispatch(QRData(responseData))
                dispatch(removeLoader())
            })
            .catch(error => { })
    }
}

/*  
    Action : This action is called to pass QR data to redux.
*/
export const QRData = (data) => dispatch => {

    dispatch({
        type: 'TF_ENABLE',
        payload: data
    })

}

//finalTFEnable

/*  
    Action : This action is called to verify two factor with OTP.
*/
export function verifyTF(isLoggedIn, value) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/verify-two-factor", {
            method: "post",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            },
            body: JSON.stringify(value)
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    dispatch(verifyQRData(responseData));
                    dispatch(getProfileDataAction(isLoggedIn));
                }
                dispatch(removeLoader())
            })
            .catch(error => {
                dispatch(removeLoader())
            })
    }
}

/*  
    Action :  This action is called to pass response of above action through Redux.
*/
export const verifyQRData = (data) => dispatch => {

    dispatch({
        type: 'VERIFYOTP',
        payload: data
    })

}

/*  
    Action :  This action is called to disable two factor authentication.
*/

export function TF_Disable(isLoggedIn) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/disable-two-factor", {
            method: "post",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    dispatch(disableAction(responseData));
                    dispatch(getProfileDataAction(isLoggedIn));
                }
                dispatch(removeLoader())
            })
            .catch(error => {
                dispatch(removeLoader())
            })
    }
}

/*  
    Action :  This action is called to pass response of above action through Redux.
*/

export const disableAction = (data) => dispatch => {
    dispatch({
        type: 'DISABLETF',
        payload: data
    })
}

/*  
    Action :  This action is called to submit KYC form details to redux.
*/

export function kycFormAction(isLoggedIn, value) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/add-kyc-details", {
            method: "post",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            },
            body: JSON.stringify(value)
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    if ((value.front_doc !== undefined && value.front_doc !== "") || (value.ssn !== "" && value.ssn !== undefined))
                        dispatch(getProfileDataAction(isLoggedIn))
                    dispatch(kycformData(responseData));
                }
                dispatch(removeLoader())
            })
            .catch(error => {
                dispatch(removeLoader())
            })
    }
}

/*  
    Action :  This action is called to pass response of above action through Redux.
*/

export const kycformData = (data) => dispatch => {
    dispatch({
        type: 'KYCFORMDATA',
        payload: data
    })
}

/*  
    Action : This action is called to upload documents.
*/

export function kycDoc(isLoggedIn, value, type) {
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/add-kyc-docs", {
            method: "post",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            },
            body: value
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    var Data = {};
                    if (type === "front-doc") { Data["front_doc"] = responseData.data }
                    else { Data["back_doc"] = responseData.data }
                    dispatch(kycDocData(responseData));
                }
                dispatch(removeLoader())
            })
            .catch(error => { })
    }
}

/*  
    Action :  This action is called to pass response of above action through Redux.
*/

export const kycDocData = (data) => dispatch => {
    dispatch({
        type: 'KYCDOCDATA',
        payload: data
    })
}
