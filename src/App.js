/* In-Build components */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppRouter from '../src/routes';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
/* Components */
import HomePage from './components/Landing/HomePage';
import FaqPage from './components/Landing/FaqPage';
import AboutUs from './components/Landing/About_us';

library.add(faStroopwafel);

/* Component defination start here */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {

      window.scrollTo(0, 0);
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    console.log(this.props)

    const { isLoggedIn } = this.props
    /* console.log(isLoggedIn) */

    const RestrictedRoute = ({
      component: Component,
      isLoggedIn,
      ...rest
    }) => (

        <Route
          {...rest}
          render={props => {

            if (isLoggedIn) {
              if (props.location.pathname == '/') {
                return <Redirect
                  to={{
                    pathname: '/home',
                    state: { from: props.location },
                  }}
                />
              } else {
                return <Component {...props} />
              }
            } else {
              if (props.location.pathname == '/') {
                return <Redirect
                  to={{
                    pathname: '/home',
                    state: { from: props.location },
                  }}
                />
              } else {
                return <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location },
                  }}
                />
              }

            }
          }}
        />
      );

    return (
      <div className="App">

        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route path='/reset-password' title="Login" component={HomePage} />
              <Route path="/" exact title="Home" component={HomePage} />
              <Route path="/login" exact title="Login" component={HomePage} />
              <Route {...this.props} path="/about-us" exact title="About Us" component={AboutUs} />
              <Route path="/faq" exact title="Faq Page" component={FaqPage} />
              <RestrictedRoute
                path="/"
                component={AppRouter}
                isLoggedIn={isLoggedIn} />
            </Switch>
          )} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false
  })
}

export default withRouter(connect(mapStateToProps, null)(App));