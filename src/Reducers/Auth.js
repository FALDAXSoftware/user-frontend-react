export default (state = {}, action) => {
    
  switch (action.type) {
     
      case 'LOGIN':
      console.log("i am in reducer login",action.payload)
        return {
          ...state,
          isLoggedIn: action.payload
        }

      case "SIGNUP":
      console.log("SIGNUP")
        return {...state,isLoggedIn:undefined}

      default:
        return {...state,isLoggedIn:undefined};
    }
   }