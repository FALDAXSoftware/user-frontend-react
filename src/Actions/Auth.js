
export function Login(values)
{
    console.log(values)
    return(dispatch) => {
        console.log(values)
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
            console.log(responseData);
            dispatch(loginAction(responseData.token))
        })
        .catch(error => { console.log(error) })
    }
}
export const loginAction = (isLoggedIn) => dispatch => {
    dispatch({
     type: 'LOGIN',
     payload: isLoggedIn
     
    })
}
export function Signup(values)
{
    console.log(values)
    return(dispatch) => {
        console.log(values)
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
            console.log(responseData);
            dispatch(signupAction(responseData.token))
        })
        .catch(error => { console.log(error) })
    }
}
export const signupAction = (isLoggedIn) => dispatch => {
    dispatch({
     type: 'SIGNUP',
     payload: isLoggedIn
     
    })
}
   