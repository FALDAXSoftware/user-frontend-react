/* In-build packages */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

/* Redux store */
import initStore from "./redux/store";

/* Appication start from here */
ReactDOM.render(
    <Provider store={initStore}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
