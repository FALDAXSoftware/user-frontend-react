import { combineReducers } from 'redux';
import Auth from './Auth';
import { reducer as tooltip } from "redux-tooltip"
import simpleReducer from './Auth'
import passwordReducer from './changePassword'

export default combineReducers({

 passwordReducer,
 simpleReducer,
 tooltip
 
});