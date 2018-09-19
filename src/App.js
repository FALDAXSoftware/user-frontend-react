/* In-Build components */
import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

/* Components */
import HomePage from './components/HomePage';

library.add(faStroopwafel)

/* Component defination start here */
class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage/>
      </div>
    );
  }
}

export default App;
