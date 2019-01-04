export default (state = {}, action) => {
    switch (action.type) {

        case "WALLET_DATA":
            return {
            ...state,
            walletData:action.payload
            }  

        case "ALLCOINS_DATA":
            return {
            ...state,
            allCoinsData:action.payload
            }  
            

        default:
        /* console.log("default") */
        return { ...state };
  }

}
