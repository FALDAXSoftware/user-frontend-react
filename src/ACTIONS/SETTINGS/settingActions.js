import { globalVariables } from 'Globals';

let { API_URL } = globalVariables;

/* 
    Action : this action is called to Update Profile 
*/
export function profileupdateAction(isLoggedIn, form) {
    return (dispatch) => {
        dispatch(addLoader());
        fetch(API_URL + "/users/update", {
            method: "put",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            },
            body: form
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    dispatch(profileupdatedData(responseData))
                    dispatch(getProfileDataAction(isLoggedIn))
                }
                dispatch(removeLoader());
            })
            .catch(error => { dispatch(removeLoader()); })
    }
}

/*  
    Action :  This action is called to pass response of above action through Redux.
*/

export const profileupdatedData = (Data) => dispatch => {

    dispatch({
        type: 'EDITPROFILE',
        payload: Data
    })

}

/*  
    Action :  This action is called to clear edit profile data.
*/
export function clearEditData() {
    return (dispatch) => {
        dispatch(profileupdatedData())
    }
}



/* 
    Action : This action is called to GET Profile Data. 
*/
export const getProfileDataAction = (token) => dispatch => {

    dispatch(addLoader());
    fetch(API_URL + "/users/getUserDetails", {
        method: "get",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    })
        .then(response => response.json())
        .then((responseData) => {
            if (responseData.status == 200) {
                dispatch(addprofileData(responseData))

            }
            dispatch(removeLoader());
        })
        .catch(error => { dispatch(removeLoader()); })

}

/*  
    Action :  This action is called to pass response of above action through Redux.
*/
export const addprofileData = (Data) => dispatch => {

    dispatch({
        type: 'ADDPROFILE',
        payload: Data

    })

}

/* 
    Action : This action is to remove Profile Picture.
*/

export function removepicAction(isLoggedIn, form) {
    return (dispatch) => {

        fetch(API_URL + "/users/update", {
            method: "put",
            headers: {
                Authorization: "Bearer " + isLoggedIn
            },
            body: form
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200)
                    dispatch(getProfileDataAction(isLoggedIn))
                dispatch(removeLoader());
            })
            .catch(error => { dispatch(removeLoader()); })
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