export default (state = {}, action) => {

    switch (action.type) {
        
        case "TF_ENABLE":
        console.log(action.payload)
            return {
                ...state,
                QR_code:action.payload
            };
        
        case "VERIFYOTP":
        console.log(action.payload)
            return{
                ...state,
                verifyOTP:action.payload
            };

        case "DISABLETF":
            return{
                ...state,
                DisableTF:action.payload
            }

        default:
        /* console.log("default") */
        return { ...state, forgot: undefined };
    }

}
