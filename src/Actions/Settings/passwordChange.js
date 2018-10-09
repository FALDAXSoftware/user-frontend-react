import { globalVariables } from '../../Globals';
import {getProfileDataAction } from "./settings";
let { API_URL } = globalVariables;

export function passwordChange(isLoggedIn,values)
{
    console.log(isLoggedIn,values)
        return(dispatch) => {

        fetch(API_URL + "/users/changePassword",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:JSON.stringify(values)
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            dispatch(passwordChangeData(responseData))
        })
        .catch(error => { console.log(error) })
    } 
}
export function clearPassword()
{
    return (dispatch) => {
        dispatch(passwordChangeData())
    }
}
export const passwordChangeData = (data) => dispatch => {

    dispatch({
        type: 'CHANGEPASSWORD',
        payload: data
    })

}


export function TF_Enable(isLoggedIn)
{
    console.log(isLoggedIn)
    return(dispatch) => {

        fetch(API_URL + "/users/setup-two-factor",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            dispatch(QRData(responseData))
        })
        .catch(error => { console.log(error) })
    } 
}

export const QRData = (data) => dispatch => {

    dispatch({
        type: 'TF_ENABLE',
        payload: data
    })

}

//finalTFEnable

export function verifyTF(isLoggedIn,value)
{
    console.log(isLoggedIn,value)
    return(dispatch) => {

        fetch(API_URL + "/users/verify-two-factor",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:JSON.stringify(value)
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            dispatch(verifyQRData(responseData));
            dispatch(getProfileDataAction(isLoggedIn));
        })
        .catch(error => { console.log(error) })
    } 
}

export const verifyQRData = (data) => dispatch => {

    dispatch({
        type: 'VERIFYOTP',
        payload: data
    })

}

export function TF_Disable(isLoggedIn)
{
    console.log(isLoggedIn)
    return(dispatch) => {

        fetch(API_URL + "/users/disable-two-factor",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            dispatch(disableAction(responseData));
            dispatch(getProfileDataAction(isLoggedIn));
        })
        .catch(error => { console.log(error) })
    } 
}

export const disableAction = (data) => dispatch =>{
    dispatch({
        type: 'DISABLETF',
        payload: data
    })
}