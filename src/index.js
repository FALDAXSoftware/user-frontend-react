/* In-build packages */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

/* Redux store */
import initStore from "./store";

/* Appication start from here */
ReactDOM.render(
    <Router>
        <Provider store={initStore}>
            <App />
        </Provider>
    </Router>
    ,
    document.getElementById('root')
);
registerServiceWorker();
