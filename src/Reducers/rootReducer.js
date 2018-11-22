import { combineReducers } from 'redux';
import Auth from './Auth';
import { reducer as tooltip } from "redux-tooltip"
import simpleReducer from './Auth'
import passwordReducer from './changePassword'
import themeReducer from './themeReducer'
export default combineReducers({

    passwordReducer,
    simpleReducer,
    tooltip,
    themeReducer
});