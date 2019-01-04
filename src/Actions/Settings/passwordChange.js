import { globalVariables } from '../../Globals';
import {getProfileDataAction } from "./settings";
import {removeLoader,addLoader} from "../Settings/settings";
let { API_URL } = globalVariables;

export function passwordChange(isLoggedIn,values)
{
        return(dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/changePassword",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:JSON.stringify(values)
        })
        .then(response => response.json())  
        .then((responseData) => {
            dispatch(passwordChangeData(responseData))
            dispatch(removeLoader())
        })
        .catch(error => {  })
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
    return(dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/setup-two-factor",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
        })
        .then(response => response.json())
        .then((responseData) => {
            dispatch(QRData(responseData))
            dispatch(removeLoader())
        })
        .catch(error => { })
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
    return(dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/verify-two-factor",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:JSON.stringify(value)
        })
        .then(response => response.json())
        .then((responseData) => {
            dispatch(verifyQRData(responseData));
            dispatch(getProfileDataAction(isLoggedIn));
            dispatch(removeLoader())
        })
        .catch(error => {  })
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
    return(dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/disable-two-factor",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            dispatch(disableAction(responseData));
            dispatch(getProfileDataAction(isLoggedIn));
            dispatch(removeLoader())
        })
        .catch(error => {  })
    } 
}

export const disableAction = (data) => dispatch =>{
    dispatch({
        type: 'DISABLETF',
        payload: data
    })
}

export function kycFormAction(isLoggedIn,value)
{
    return(dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/add-kyc-details",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:JSON.stringify(value)
        })
        .then(response => response.json())
        .then((responseData) => {
            if((value.front_doc!==undefined && value.front_doc!=="") || (value.ssn!=="" && value.ssn!==undefined))
            dispatch(getProfileDataAction(isLoggedIn))
            dispatch(kycformData(responseData));
            dispatch(removeLoader())
        })
        .catch(error => { })
    } 
}

export const kycformData = (data) => dispatch =>{
    dispatch({
        type: 'KYCFORMDATA',
        payload: data
    })
}

export function kycDoc(isLoggedIn, value,type)
{
    return(dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/add-kyc-docs",{
            method:"post",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:value
        })
        .then(response => response.json())
        .then((responseData) => {
            var Data = {};
            if(type=="front-doc")
            {Data["front_doc"]=responseData.data}
            else
            {Data["back_doc"]=responseData.data}
            dispatch(kycDocData(responseData));
            dispatch(removeLoader())
        })
        .catch(error => {  })
    } 
}
export const kycDocData = (data) => dispatch =>{
    dispatch({
        type: 'KYCDOCDATA',
        payload: data
    })
}
