import { globalVariables } from "Globals.js";
import { removeLoader, addLoader } from "./SETTINGS/settingActions";
import { darkTheme } from "./THEME/themeActions";
let { API_URL } = globalVariables;

/*  
    Action :  This action is called to delete account.
*/
// export function deleteAccount(isLoggedIn, value) {
//   let tempValue = {};
//   tempValue["email"] = value.email;
//   return dispatch => {
//     dispatch(addLoader());
//     fetch(API_URL + "/users/deleteAccount", {
//       method: "delete",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + isLoggedIn
//       },
//       body: JSON.stringify(tempValue)
//     })
//       .then(response => response.json())
//       .then(responseData => {
//         if (responseData.status == 200) {
//           let tempValue2 = {};
//           tempValue2["user_id"] = tempValue.user_id;
//           tempValue2["jwt_token"] = tempValue.jwt_token;
//           dispatch(LogoutUser(isLoggedIn, tempValue2));
//         }
//         dispatch(removeLoader());
//       })
//       .catch(error => {
//         dispatch(removeLoader());
//       });
//   };
// }

export function deleteAccount(isLoggedIn, value) {
  let tempValue = {};
  tempValue = value;
  return dispatch => {
    dispatch(addLoader());
    fetch(API_URL + "/users/deleteAccount", {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLoggedIn
      },
      body: JSON.stringify(value)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          let tempValue2 = {};
          tempValue2["user_id"] = tempValue.user_id;
          tempValue2["jwt_token"] = tempValue.jwt_token;
          dispatch(LogoutUser(isLoggedIn, tempValue2));
        } else if (responseData.status == 201) {
          alert(responseData.err);
          // dispatch(errorAction(responseData, "login"));
        }
        dispatch(removeLoader());
      })
      .catch(error => {
        dispatch(removeLoader());
      });
  };
}

/*  
    Action : This action is called to get jwt token after login.
*/
export function Login(values) {
  return dispatch => {
    fetch(API_URL + "/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) dispatch(loginAction(responseData));
        else dispatch(errorAction(responseData, "login"));
      })
      .catch(error => {});
  };
}

/*  
    Action : This action is called to pass above response through redux.
*/

export const loginAction = data => dispatch => {
  dispatch({
    type: "LOGIN",
    payload: data
  });
};

// Language change action
export const langAction = data => dispatch => {
  dispatch({
    type: "LANG_DATA",
    payload: data
  });
};

/*  
    Action : This action is called to clear login data.
*/

export function clearLogin() {
  return dispatch => {
    dispatch(loginAction());
  };
}

/*  
    Action : This action is called to logout and clear data accordingly.
*/

export function LogoutUser(isLoggedIn, value) {
  return dispatch => {
    dispatch(addLoader());
    fetch(API_URL + "/logout", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLoggedIn
      },
      body: JSON.stringify(value)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          dispatch({
            type: "LOGOUT",
            payload: responseData
          });
          dispatch(darkTheme(false));
        }
        dispatch(removeLoader());
      })
      .catch(error => {
        dispatch(removeLoader());
      });
  };
}

/*  
    Action : This action is called to pass OTP action data through redux.
*/

export const otpRequiredAction = data => dispatch => {
  dispatch({
    type: "otpRequired",
    payload: data
  });
};

// export const Logout = (Data) => dispatch => {
//     dispatch({
//         type: 'LOGOUT',
//         payload: Data
//     })
// }

/*  
    Action : This action is called to when user sign up.
*/

export function Signup(values) {
  return dispatch => {
    dispatch(addLoader());
    fetch(API_URL + "/users/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          dispatch(signupAction(responseData));
        } else {
          dispatch(errorAction(responseData));
        }
        dispatch(removeLoader());
      })
      .catch(error => {});
  };
}

/*  
    Action : This action is called to pass data of above action through redux.
*/

export const signupAction = data => dispatch => {
  dispatch({
    type: "SIGNUP",
    payload: data
  });
};

/*  
    Action : This action is called to clear user sign up data.
*/

export function clearSignUp() {
  return dispatch => {
    dispatch(signupAction());
  };
}

export function forgotAction(email) {
  return dispatch => {
    fetch(API_URL + "/users/forgotPassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email)
    })
      .then(response => response.json())
      .then(responseData => {
        dispatch(forgotData(responseData));
      })
      .catch(error => {
        dispatch(forgotData(error));
      });
  };
}

/*  
    Action : This action is called to pass data of above action through redux.
*/

export const forgotData = value => dispatch => {
  dispatch({
    type: "FORGOT",
    payload: value
  });
};

/*  
    Action : This action is called to clear forgot password data.
*/

export function clearForgot() {
  return dispatch => {
    dispatch(forgotData());
  };
}

/*  
    Action : This action is called to reset password.
*/

export function resetAction(value) {
  return dispatch => {
    fetch(API_URL + "/users/resetPassword", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          dispatch(resetData(responseData));
        } else {
          dispatch(resetData(responseData));
        }
      })
      .catch(error => {
        // console.log(error)
      });
  };
}

/*  
    Action : This action is called to pass data of above action through redux.
*/

export const resetData = value => dispatch => {
  dispatch({
    type: "RESET",
    payload: value
  });
};

/*  
    Action : This action is called to pass error data through redux.
*/

export const errorAction = (error, status = "") => dispatch => {
  dispatch({
    type: "ERROR",
    payload: error,
    status: status
  });
};
