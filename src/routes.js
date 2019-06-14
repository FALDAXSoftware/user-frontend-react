import React, { Component } from 'react';
/* import NavigationBar from 'COMPONENTS/LANDING/homepage';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import LoggedNavigation from 'COMPONENTS/NAVIGATIONS/loggednavigation';
import About from 'COMPONENTS/about';
import Referral from "COMPONENTS/SETTINGS/referral" */
import Editprofile from 'COMPONENTS/SETTINGS/edit_profile';
import HubspotTickets from 'COMPONENTS/SETTINGS/Account_settings/hubspot_tickets'
import Footer from 'COMPONENTS/LANDING/FOOTERS/footer';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import HomePage from "COMPONENTS/LANDING/homepage";
import Wallet from "COMPONENTS/LOGGEDCATEGORIES/WALLET/wallet";
import WalletDetails from "COMPONENTS/LOGGEDCATEGORIES/WALLET/walletdetails";
import Trade from "COMPONENTS/LOGGEDCATEGORIES/TRADE/trade";
import History2 from "COMPONENTS/LOGGEDCATEGORIES/HISTORY/history"
import Dashboard from "COMPONENTS/LOGGEDCATEGORIES/DASHBOARD/dashboard"
import OpenTicket from "COMPONENTS/LANDINGCATEGORIES/open_ticket";
import { globalVariables } from 'Globals';
/* import Chart from "COMPONENTS/tradingviewchart"; */
import Conversion from 'COMPONENTS/LOGGEDCATEGORIES/CONVERSION/conversion';
let { API_URL } = globalVariables;
const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
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
  },
  {
    exact: false,
    path: "/open-ticket",
    component: () => (<OpenTicket io={io} />),
    io: io
  },
  {
    exact: false,
    path: "/conversion",
    component: () => (<Conversion io={io} />),
    io: io
  },
  {
    exact: false,
    path: "/tickets",
    component: () => (<HubspotTickets io={io} />),
  }
];

export default class AppRouter extends Component {
  componentDidMount() {
  }
  render() {
    const { url } = this.props.match;
    return (
      <div>
        {/* {console.log("App.js")} */}
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
