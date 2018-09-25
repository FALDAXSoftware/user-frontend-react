/* In-build packages */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

/* Redux store */
import configureStore from "./store";
import {loadState,saveState} from './localstorage';
let persisteState= loadState();
let store =configureStore(persisteState);
store.subscribe(() =>{
    saveState(store.getState())
  })
/* Appication start from here */
ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    ,
    document.getElementById('root')
);
registerServiceWorker();
