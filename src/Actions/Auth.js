import { globalVariables } from '../Globals';
import {removeLoader,addLoader} from "./Settings/settings";
let { API_URL } = globalVariables;

export function deleteAccount(isLoggedIn,value)
{
    console.log(isLoggedIn,value)
    return (dispatch) => {
        dispatch(addLoader())
        fetch(API_URL + "/users/deleteAccount", {
            method: "delete",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:"Bearer " + isLoggedIn
            },
            body: JSON.stringify(value)
        }).then(response => response.json())
            .then((responseData) => {
                // console.log(responseData)
                if (responseData.status == 200)
                    dispatch(Logout(responseData))

                dispatch(removeLoader())
            }).catch(error => {
                console.log("error", error)
            })
    }
}



export function Login(values) {
    return (dispatch) => {
        fetch(API_URL + "/login", {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
            .then((responseData) => {
                // console.log(responseData)
                if (responseData.status == 200)
                    dispatch(loginAction(responseData))
                else
                    dispatch(errorAction(responseData,"login"))
            }).catch(error => {
                console.log("error", error)
            })
    }
}
export function clearLogin() {
    console.Login
    return (dispatch) => {
        dispatch(loginAction())
    }
}
export const loginAction = (data) => dispatch => {
    dispatch({
        type: 'LOGIN',
        payload: data
    })
}

export const otpRequiredAction = (data) => dispatch => {
    dispatch({
        type: 'otpRequired',
        payload: data
    })
}

export const Logout = (Data) => dispatch => {
    dispatch({
        type: 'LOGOUT',
        payload: Data
    })
}

export function Signup(values) {
    return (dispatch) => {
        fetch(API_URL + "/users/create", {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    console.log("Response Data")
                    dispatch(signupAction(responseData))
                }
                else {
                    console.log("Error")
                    dispatch(errorAction(responseData))
                }
            }).catch(error => {
                console.log('error', error)
            })
    }
}

export function clearSignUp() {
    return (dispatch) => {
        dispatch(signupAction())
    }
}

export const signupAction = (data) => dispatch => {
    dispatch({
        type: 'SIGNUP',
        payload: data
    })
}

export function forgotAction(email) {
    return (dispatch) => {
        fetch(API_URL + "/users/forgotPassword", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email)
        })
            .then(response => response.json())
            .then((responseData) => {
                dispatch(forgotData(true));
            })
            .catch(error => {
                dispatch(forgotData(false));
            })
    }
}

export const forgotData = (value) => dispatch => {
    dispatch({
        type: 'FORGOT',
        payload: value
    })
}

export function resetAction(value) {
    /*  console.log(value) */
    return (dispatch) => {
        fetch(API_URL + "/users/resetPassword", {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        })
            .then(response => response.json())
            .then((responseData) => {
                dispatch(resetData(true));
            })
            .catch(error => {
                dispatch(forgotData(false));
            })
    }
}

export const resetData = (value) => dispatch => {
    dispatch({
        type: 'RESET',
    })
}
export const errorAction = (error,status="") => dispatch => {
    console.log(error)
    dispatch({
        type: 'ERROR',
        payload: error,
        status:status
    })

}
