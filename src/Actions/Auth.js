import { globalVariables } from '../Globals';

let { API_URL } = globalVariables;

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
                if (responseData.status == 200)
                    dispatch(loginAction(responseData.token))
                else
                    dispatch(errorAction(responseData))
            }).catch(error => {
                console.log("error", error)
            })
    }
}

export const loginAction = (isLoggedIn) => dispatch => {
    dispatch({
        type: 'LOGIN',
        payload: isLoggedIn
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
                    dispatch(signupAction(responseData))
                } else {
                    dispatch(signupAction(responseData))
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
        fetch("http://18.191.87.133:8084/users/forgotPassword", {
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
        fetch("http://18.191.87.133:8084/users/resetPassword", {
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
export const errorAction = (error) => dispatch => {
    dispatch({
        type: 'ERROR',
        payload: error
    })
}