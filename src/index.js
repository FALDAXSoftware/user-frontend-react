import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import initStore from "./redux/store";

ReactDOM.render(
    <Provider store={initStore}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
