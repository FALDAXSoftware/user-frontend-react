import React, { Component } from 'react';
import NavigationBar from './components/Landing/HomePage';
import Navigation from './components/Navigations/Navigation';
import LoggedNavigation from './components/Navigations/LoggedNavigation';
import About from './components/About';
import Referral from "../src/components/Settings/Referral"
import Editprofile from '../src/components/Settings/EditProfile';
import Footer from '../src/components/Landing/Footers/Footer';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import HomePage from "../src/components/Landing/HomePage";
import Wallet from "../src/components/LoggedCategories/Wallet/wallet";
import WalletDetails from "../src/components/LoggedCategories/Wallet/WalletDetails";
import Trade from "../src/components/LoggedCategories/Trade/trade"
import History2 from "../src/components/LoggedCategories/History/history"
import Dashboard from "../src/components/LoggedCategories/Dashboard/dashboard"
import { globalVariables } from './Globals';
let { API_URL } = globalVariables;
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
let io = sailsIOClient(socketIOClient);
io.sails.url = API_URL;

const routes = [
  {
    exact: false,
    path: "/editProfile",
    component: Editprofile
  },
  {
    exact: false,
    path: "/home",
    component: HomePage
  },
  {
    exact: false,
    path: "/wallet",
    component: Wallet
  },
  {
    exact: false,
    path: "/walletDetails",
    component: WalletDetails
  },
  {
    exact: false,
    path: "/trade",
    component: () => (<Trade io={io} />),
  },
  {
    exact: false,
    path: "/history",
    component: History2
  },
  {
    exact: false,
    path: "/dashboard",
    component: () => (<Dashboard io={io} />),
    io: io
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
