import React,{Component} from 'react';
import NavigationBar from './components/Landing/HomePage';
import Navigation from './components/Navigations/Navigation';
import LoggedNavigation from './components/Navigations/LoggedNavigation';
import About from './components/About';
import Referral from "../src/components/Settings/Referral"
import Editprofile from '../src/components/Settings/EditProfile';
import Footer from '../src/components/Landing/Footers/Footer';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import HomePage from "../src/components/Landing/HomePage";

const routes = [
 
    {
      exact:false,
      path: "/editProfile",
      component:Editprofile 
    },
    {
      exact:false,
      path: "/home",
      component:HomePage 
    }
  ];
  
 export default class AppRouter extends Component {
    render() {
      const { url } = this.props.match;
        /* console.log("asdasdasdasdasdasdasdasdasdasd", this.props) */
      return (
        <div>
          {routes.map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact === false ? false : true}
                key={singleRoute.path}
                path={`${singleRoute.path}`}
                {...otherProps}
                {...this.props}
              />
            );
          })}
        </div>
      );
    }
  }
  
