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

      case "EDITPROFILE":
        console.log("EDITPROFILE",action.payload)
        return {...state}
      
      case "ADDPROFILE":
        console.log("ADDPROFILE",action.payload)
        return {...state,profileDetails:action.payload}
        
      default:
        console.log("default")
        return {...state};
    }
   }