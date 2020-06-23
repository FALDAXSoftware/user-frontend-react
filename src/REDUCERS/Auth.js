export default (
  state = {
    profileDetails: undefined,
    profileError: undefined,
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      if (action.payload !== undefined) {
        if (action.payload.token) {
          document.cookie = "isLoggedIn=true";
          document.cookie = `${process.env.REACT_APP_COOKIE_NAME}=true; domain=faldax.com`;
        }
        return {
          ...state,
          isLoggedIn: action.payload.token,
          isKYCDone: action.payload.user.is_kyc_done,
          errorStatus: action.payload,
        };
      } else {
        return {
          ...state,
          errorStatus: undefined,
        };
      }

    case "otpRequired":
      return {
        ...state,
        isOtpRequired: true,
        OtpParams: action.payload,
      };

    case "ERROR":
      /* console.log(action.payload) */
      if (action.status === "login") {
        return {
          ...state,
          errorStatus: action.payload,
        };
      } else {
        return {
          ...state,
          isSignUp: action.payload,
        };
      }

    case "LOGOUT":
      document.cookie = "isLoggedIn=false";
      document.cookie = `${process.env.REACT_APP_COOKIE_NAME}=false; domain=faldax.com`;
      return {
        ...state,
        isLoggedIn: undefined,
        isKYCDone: undefined,
        profileDetails: undefined,
      };

    case "SIGNUP":
      return {
        ...state,
        isSignUp: action.payload,
      };

    case "FORGOT":
      return {
        ...state,
        forgot: action.payload,
      };

    case "EDITPROFILE":
      /* console.log("EDITPROFILE",action.payload) */
      return { ...state, update: action.payload };

    case "ADDPROFILE":
      /* console.log("ADDPROFILE", action.payload) */
      return {
        ...state,
        profileDetails: action.payload,
      };
    case "ERRORPROFILE":
      return {
        ...state,
        profileError: action.payload,
      };
    case "REMOVELOADER":
      /* console.log("REMOVELOADER",action.payload) */
      return {
        ...state,
        loader: action.payload,
      };

    case "ADDLOADER":
      /* console.log("ADDLOADER",action.payload) */
      return {
        ...state,
        loader: action.payload,
      };

    case "RESET":
      return {
        ...state,
        resetPass: action.payload,
      };

    case "CHANGEPASSWORD":
      return {
        ...state,
        changePass: action.payload,
      };

    default:
      /* console.log("default") */
      return { ...state, forgot: undefined };
  }
};
