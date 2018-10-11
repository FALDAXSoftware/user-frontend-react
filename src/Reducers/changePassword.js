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
        case "KYCFORMDATA":
        console.log("KYC DTAAAAA",action.payload)
            return{
                ...state,
                kycData:action.payload
            }

        case "KYCDOCDATA":
        return{
            ...state
        }
        default:
        /* console.log("default") */
        return { ...state, forgot: undefined };
    }

}
