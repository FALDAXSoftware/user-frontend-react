export default (state = {}, action) => {
    switch (action.type) {

        case "WALLET_DATA":
            return {
                ...state,
                walletData: action.payload
            }

        case "ALLCOINS_DATA":
            return {
                ...state,
                allCoinsData: action.payload
            }
        case "CRYPT_PAIR":
            return {
                ...state,
                cryptoPair: action.payload
            }

        default:
            return { ...state };
    }

}
