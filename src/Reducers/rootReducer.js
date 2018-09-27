import { combineReducers } from 'redux';
import Auth from './Auth';
import { reducer as tooltip } from "redux-tooltip"
import simpleReducer from './Auth'

export default combineReducers({
 simpleReducer,
 tooltip
});