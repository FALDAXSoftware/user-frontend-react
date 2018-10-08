import { globalVariables } from '../../Globals';

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

