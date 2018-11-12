import { globalVariables } from '../../Globals';

let { API_URL } = globalVariables;

/* Action to Update Profile */
export function profileupdateAction(isLoggedIn,form)
{
    /* console.log(isLoggedIn,form) */
    return(dispatch) => {
        dispatch(addLoader());
        fetch(API_URL + "/users/update",{
            method:"put",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:form
        })
        .then(response => response.json())
        .then((responseData) => {
            /* console.log(responseData); */
           dispatch(profileupdatedData(responseData))
           dispatch(getProfileDataAction(isLoggedIn))
        })
        .catch(error => { /* console.log(error) */ })
    } 
}
export function clearEditData() {
    return (dispatch) => {
        dispatch(profileupdatedData())
    }
}

export const profileupdatedData = (Data) => dispatch => {

    dispatch({
        type: 'EDITPROFILE',
        payload: Data
    })

}

/* Action to GET Profile Data */

export const getProfileDataAction = (token) => dispatch => {

    dispatch(addLoader());
    fetch(API_URL + "/users/getUserDetails",{
        method:"get",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:"Bearer " + token
        }
    })
    .then(response => response.json())
    .then((responseData) => {
        /* console.log("I m in API get",responseData) */
        dispatch(addprofileData(responseData))
        dispatch(removeLoader());
    })
    .catch(error => { /* console.log(error) */ })

}

export const addprofileData = (Data) => dispatch => {
    
    dispatch({
        type: 'ADDPROFILE',
        payload: Data
        
    })

}

/* Action to remove Profile Picture */

export function removepicAction(isLoggedIn,form)
{
   /*  console.log(isLoggedIn,form) */
    return(dispatch) => {

        fetch(API_URL + "/users/update",{
            method:"put",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:form
        })
        .then(response => response.json())
        .then((responseData) => {
            /* console.log(responseData); */
            dispatch(getProfileDataAction(isLoggedIn))
        })
        .catch(error => {/*  console.log(error) */ })
    } 

}

/* Actions for Removing and Adding Loaders */
export const removeLoader = () => dispatch => {
    dispatch({
        type: 'REMOVELOADER',
        payload: false
    })
}

export const addLoader = () => dispatch => {
    dispatch({
        type: 'ADDLOADER',
        payload: true
        
    })
}