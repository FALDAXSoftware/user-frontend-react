
import {
    createStore,
    combineReducers,
} from "redux"
  
import { reducer as tooltip } from "redux-tooltip"
  
const appReducer = (state = {}, action) => {
    switch (action.type) {
        default:
        return state
    }
}

export default createStore(combineReducers({ appReducer, tooltip }));