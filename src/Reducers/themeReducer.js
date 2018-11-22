export default (state = {}, action) => {
    console.log(action)
    switch (action.type) {

        case "FALDAXTHEME":
        return {
          ...state,
          theme: action.payload
        }  

        default:
        /* console.log("default") */
        return { ...state };
  }

}
