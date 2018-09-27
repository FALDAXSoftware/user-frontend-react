import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter, Switch } from 'react-router-redux';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import HomePage from "../src/components/Landing/HomePage";
import Editprofile from "../src/components/Settings/Editprofile";
import Routes from './routes'
const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  
    <Route
      {...rest}
      render={props => isLoggedIn
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/siginin',
              state: { from: props.location },
            }}
          />}
    />
  );
  const PublicRoutes = ({ history, isLoggedIn }) => {
    console.log("is",isLoggedIn)
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path={'/signin'}
            component={HomePage}
          />
          <RestrictedRoute
            path="/"
            
            component={Routes}
            isLoggedIn={isLoggedIn}
          />
        </Switch>
      </ConnectedRouter>
    );
  };
  
  export default connect(
    state => ({
      isLoggedIn: state.simpleReducer.isLoggedIn?true:false
    })
  ,null)(PublicRoutes);
  