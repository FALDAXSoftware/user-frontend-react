/* In-Build components */
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import AppRouter from '../src/routes';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';  
/* Components */
import HomePage from './components/Landing/HomePage';

library.add(faStroopwafel)

/* Component defination start here */
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    console.log(this.props)
    const {isLoggedIn} = this.props
    console.log(isLoggedIn)

    const RestrictedRoute = ({
      component: Component,
      isLoggedIn,
      ...rest
    }) => (
  
      <Route
        {...rest}
        render={props => isLoggedIn
        ? <Component {...props}/>
        : <Redirect
          to={{
          pathname: '/login',
          state: {
            from: props.location
          }
        }}/>}/>
    );
    // console.log("this", this.props)
    
    return (
      <div className="App">
       <Router>
        <Route
          render={({location}) => (
          <Switch location={location}>
            {console.log(location)}
            {/* <Route path="/" exact title="Login" component={HomePage}/> */}
            <Route  path="/login" exact title="Login" component={HomePage}/>
            {console.log(this.props.isLoggedIn)}
            <RestrictedRoute
              path="/"
              component={AppRouter}
              isLoggedIn={isLoggedIn}/>
          </Switch>
        )}/></Router>
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log(state)
  return({
    isLoggedIn:state.simpleReducer.isLoggedIn!==undefined ? true : false 
  })
 }

export default connect(mapStateToProps, null)(App);