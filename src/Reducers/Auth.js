export default (state = {}, action) => {
    
  switch (action.type) {
     
      case 'LOGIN':
      console.log("i am in reducer login",action.payload)
        return {
          ...state,
          isLoggedIn: action.payload
        }
        
      case 'ERROR':
        return{
          ...state,
          error:action.payload
        }

      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: undefined,
          profileDetails:undefined
        }

      case "SIGNUP":
      /* console.log("SIGNUP") */
        return {
          ...state,
          isLoggedIn:undefined
        }

      case "FORGOT":
        return {
          ...state,
          forgot:action.payload
        }

      case "EDITPROFILE":
        /* console.log("EDITPROFILE",action.payload) */
        return {...state}
      
      case "ADDPROFILE":
        console.log("ADDPROFILE",action.payload)
        return {
          ...state,
          profileDetails:action.payload
        }

      case "REMOVELOADER":
        /* console.log("REMOVELOADER",action.payload) */
        return{
          ...state,
          loader:action.payload
        }

      case "ADDLOADER":
        /* console.log("ADDLOADER",action.payload) */
        return{
          ...state,
          loader:action.payload
        }

      case "RESET":
        return {...state}
        
      default:
        /* console.log("default") */
        return {...state,forgot:undefined};
    }
    
}