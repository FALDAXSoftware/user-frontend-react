export default (state = {
  theme:false
}, action) => {
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
