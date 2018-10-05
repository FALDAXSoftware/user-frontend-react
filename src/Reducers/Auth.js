export default (state = {}, action) => {

  switch (action.type) {

    case 'LOGIN':
    if(action.payload!==undefined)
    {
        return {
          ...state,
          isLoggedIn: action.payload.token,
          errorStatus: action.payload
        }
      }
    else
    {
      return {
        ...state,
        errorStatus:undefined
      }
    }

    case 'ERROR':
        console.log(action.payload)
        if(action.status=="login")
        {
          return{
            ...state,
            errorStatus:action.payload
          }
        }
        else
        {
          return {
            ...state,
            isSignUp: action.payload
          }
        }

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: undefined,
        profileDetails: undefined
      }

    case "SIGNUP":
      return {
        ...state,
        isSignUp: action.payload,
      }

    case "FORGOT":
      return {
        ...state,
        forgot: action.payload
      }

    case "EDITPROFILE":
      /* console.log("EDITPROFILE",action.payload) */
      return { ...state }

    case "ADDPROFILE":
      console.log("ADDPROFILE", action.payload)
      return {
        ...state,
        profileDetails: action.payload
      }

    case "REMOVELOADER":
      /* console.log("REMOVELOADER",action.payload) */
      return {
        ...state,
        loader: action.payload
      }

    case "ADDLOADER":
      /* console.log("ADDLOADER",action.payload) */
      return {
        ...state,
        loader: action.payload
      }

    case "RESET":
      return { ...state }

    default:
      /* console.log("default") */
      return { ...state, forgot: undefined };
  }

}