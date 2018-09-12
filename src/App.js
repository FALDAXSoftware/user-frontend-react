import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
      </div>
    );
  }
}

export default App;
