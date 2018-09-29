
export function Login(values)
{
    /* console.log(values) */
    return(dispatch) => {
        /* console.log(values) */
        fetch("http://192.168.2.224:1337/login",{
            method:"post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            body:JSON.stringify(values)
        })
        .then(response => response.json())
        .then((responseData) => {
            /* console.log(responseData); */
            dispatch(loginAction(responseData.token))
        })
        .catch(error => { /* console.log(error) */ })
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

export function Signup(values)
{
    /* console.log(values) */
    return(dispatch) => {
        /* console.log(values) */
        fetch("http://192.168.2.224:1337/users/create",{
            method:"post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(values)
        })
        .then(response => response.json())
        .then((responseData) => {
            /* console.log(responseData); */
            dispatch(signupAction(responseData.token))
        })
        .catch(error => { /* console.log(error) */ })
    }
}

export const signupAction = (isLoggedIn) => dispatch => {
    dispatch({
     type: 'SIGNUP',
     payload: isLoggedIn
    })
}
   
export function forgotAction(email)
{
    return(dispatch) => {
        fetch("http://192.168.2.224:1337/users/forgotPassword",{
            method:"post",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(email)
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
     payload:value
    })
}

export function resetAction(value)
{
   /*  console.log(value) */
    return(dispatch) => {
        fetch("http://192.168.2.224:1337/users/resetPassword",{
            method:"put",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(value)
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