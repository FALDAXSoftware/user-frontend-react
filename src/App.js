/* In-Build components */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/routes';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

/* Component defination start here */
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
