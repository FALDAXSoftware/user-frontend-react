/* In-Build components */
import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

/* Components */
import HomePage from './components/HomePage';

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
