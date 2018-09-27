
export function profileupdateAction(isLoggedIn,form)
{
    console.log(isLoggedIn,form)
    return(dispatch) => {
        fetch("http://192.168.2.224:1337/users/update",{
            method:"put",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:form
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
           dispatch(profileupdatedData(responseData))
           dispatch(getProfileDataAction(isLoggedIn))
        })
        .catch(error => { console.log(error) })
    } 
}
export const profileupdatedData = (Data) => dispatch => {
    dispatch({
        type: 'EDITPROFILE',
        payload: Data
        
    })
}
export const getProfileDataAction = (token) => dispatch => {
    fetch("http://192.168.2.224:1337/users/getUserDetails",{
                    method:"get",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization:"Bearer " + token
                    }
            })
            .then(response => response.json())
            .then((responseData) => {
                console.log("I m in API get",responseData)
                dispatch(addprofileData(responseData))
            })
            .catch(error => { console.log(error) })
}
export const addprofileData = (Data) => dispatch => {
    dispatch({
        type: 'ADDPROFILE',
        payload: Data
        
    })
}
export function removepicAction(isLoggedIn,form)
{
    console.log(isLoggedIn,form)
    return(dispatch) => {
        fetch("http://192.168.2.224:1337/users/update",{
            method:"put",
            headers: {
                Authorization:"Bearer " + isLoggedIn
            },
            body:form
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            dispatch(getProfileDataAction(isLoggedIn))
        })
        .catch(error => { console.log(error) })
    } 
}