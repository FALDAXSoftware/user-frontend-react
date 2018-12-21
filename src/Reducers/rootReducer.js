import { combineReducers } from 'redux';
import Auth from './Auth';
import { reducer as tooltip } from "redux-tooltip"
import simpleReducer from './Auth'
import passwordReducer from './changePassword'
import themeReducer from './themeReducer'
import walletReducer from './walletReducer'


export default combineReducers({

    passwordReducer,
    simpleReducer,
    tooltip,
    themeReducer,
    walletReducer
});