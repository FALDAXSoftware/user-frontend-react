import React, { Component } from "react";
import IdleTimer from "react-idle-timer";
import moment from "moment";
import { connect } from "react-redux";

/* import NavigationBar from 'COMPONENTS/LANDING/homepage';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import LoggedNavigation from 'COMPONENTS/NAVIGATIONS/loggednavigation';
import About from 'COMPONENTS/about';
import Referral from "COMPONENTS/SETTINGS/referral" */
import Editprofile from "COMPONENTS/SETTINGS/edit_profile";
import HubspotTickets from "COMPONENTS/SETTINGS/Account_settings/hubspot_tickets";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import HomePage from "COMPONENTS/LANDING/homepage";
import Wallet from "COMPONENTS/LOGGEDCATEGORIES/WALLET/wallet";
import WalletDetails from "COMPONENTS/LOGGEDCATEGORIES/WALLET/walletdetails";
import History2 from "COMPONENTS/LOGGEDCATEGORIES/HISTORY/history";
import OpenTicket from "COMPONENTS/LANDINGCATEGORIES/open_ticket";
import { globalVariables } from "./Globals.js";
import { LogoutUser } from "ACTIONS/authActions";
import MarketPage from "./COMPONENTS/LOGGEDCATEGORIES/MARKET/market_page";

// import Chart from "COMPONENTS/tradingviewchart";
import Conversion from "COMPONENTS/LOGGEDCATEGORIES/CONVERSION/conversion";
import ConversionDetail from "COMPONENTS/LOGGEDCATEGORIES/CONVERSION/conversion_detail";
import TierUpgradeInfo from "./COMPONENTS/SETTINGS/tier_upgrade_information.js";
import TierUpgradeInfoImageRequirements from "./COMPONENTS/SETTINGS/tier-upgrade-info-image-requirements.js";
import TierIDConfirmation from "./COMPONENTS/SETTINGS/tier_id_confirmation.js";
import Simplex from "./COMPONENTS/LOGGEDCATEGORIES/SIMPLEX/simplex.js";
import SimplexExchange from "./COMPONENTS/LOGGEDCATEGORIES/SIMPLEX/simplex_exchange.js";
import NotFound from "./SHARED-COMPONENTS/NotFound.js";
import Dashboard from "./COMPONENTS/LOGGEDCATEGORIES/DASHBOARD/dashboard.js";
import Trade from "./COMPONENTS/LOGGEDCATEGORIES/TRADE/trade.js";
import Tradingviewchart from "./COMPONENTS/tradingviewchart.js";
import TierOne from "./COMPONENTS/SETTINGS/TIERS/tier_one.js";
import TierTwo from "./COMPONENTS/SETTINGS/TIERS/tier_two.js";
import TierThree from "./COMPONENTS/SETTINGS/TIERS/tier_three.js";
import TierFour from "./COMPONENTS/SETTINGS/TIERS/tier_four.js";
// let { API_URL } = globalVariables;
const socketIOClient = require("socket.io-client");
// const sailsIOClient = require("sails.io.js");
// let io = sailsIOClient(socketIOClient);
// io.sails.url = API_URL;
let io = null;
const routes = [
  {
    exact: false,
    path: "/editProfile",
    component: Editprofile,
  },
  // {
  //   exact: false,
  //   path: "/home",
  //   component: HomePage
  // },
  {
    exact: false,
    path: "/wallet",
    component: Wallet,
  },
  {
    exact: false,
    path: "/walletDetails",
    component: WalletDetails,
  },
  {
    exact: false,
    path: "/market",
    component: () => <MarketPage />,
  },
  {
    exact: false,
    path: "/trade",
    component: () => <Trade io={io} />,
  },
  {
    exact: false,
    path: "/chart/:pair",
    component: (props) => <Tradingviewchart io={io} />,
  },
  {
    exact: false,
    path: "/history",
    component: History2,
  },
  {
    exact: false,
    path: "/dashboard",
    component: () => <Dashboard io={io} />,
    io: io,
  },
  {
    exact: false,
    path: "/open-ticket",
    component: () => <OpenTicket />,
    // io: io
  },
  {
    exact: false,
    path: "/conversion",
    component: () => <Conversion />,
    // io: io
  },
  {
    exact: false,
    path: "/crypto-conversion",
    component: () => <ConversionDetail io={io} />,
    io: io,
  },
  // {`${globalVariables.WordpressSiteURL}/crypto-only-coming-soon`}
  // {
  //   exact: false,
  //   path: "/crypto-conversion",
  //   component: () => (
  //     <Redirect
  //       to={`${globalVariables.WordpressSiteURL}/crypto-only-coming-soon`}
  //     />
  //   ),
  //   io: io
  // },
  {
    exact: false,
    path: "/simplex",
    component: () => <Simplex />,
  },
  {
    exact: false,
    path: "/simplex-exchange",
    component: () => <SimplexExchange />,
  },
  // {
  //   exact: false,
  //   path: "/token",
  //   component: () => <LoginToken io={io} />,
  //   io: io
  // },
  // {
  //   exact: false,
  //   path: "/token-security-check",
  //   component: () => <SecurityCheck io={io} />,
  //   io: io
  // },
  // {
  //   exact: false,
  //   path: "/token-dashboard",
  //   component: () => <TokenDashboard io={io} />,
  //   io: io
  // },
  {
    exact: false,
    path: "/tier1",
    component: () => <TierOne />,
  },
  {
    exact: false,
    path: "/tier2",
    component: () => <TierTwo />,
  },
  {
    exact: false,
    path: "/tier3",
    component: () => <TierThree />,
  },
  {
    exact: false,
    path: "/tier4",
    component: () => <TierFour />,
  },
  {
    exact: false,
    path: "/tier-upgrade-information",
    component: () => <TierUpgradeInfo />,
  },
  {
    exact: false,
    path: "/tier-image-information",
    component: () => <TierUpgradeInfoImageRequirements />,
  },
  {
    exact: false,
    path: "/tier-idcp-confirmation",
    component: () => <TierIDConfirmation />,
  },
  {
    exact: false,
    path: "/tickets",
    component: () => <HubspotTickets />,
  },
  // {
  //   exact: true,
  //   path: "*",
  //   component: () => <NotFound io={io} />
  // }
];

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    /* this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this) */
    this.onIdle = this._onIdle.bind(this);
    io = socketIOClient(globalVariables.SOCKET_HOST, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: "Bearer " + this.props.isLoggedIn, //ahiya header pass karide auth
          },
        },
      },
      transports: ["websocket"],
      upgrade: false,
    });
  }
  componentDidMount() {
    // console.log("^^headert", this.props.isLoggedIn);
    // io = socketIOClient(globalVariables.SOCKET_HOST, {
    //   transportOptions: {
    //     polling: {
    //       extraHeaders: {
    //         Authorization: "Bearer " + this.props.isLoggedIn //ahiya header pass karide auth
    //       }
    //     }
    //   }
    // });
  }
  /*   _onAction(e) {
      console.log('user did something', e)
    }

    _onActive(e) {
      console.log('user is active', e)
      console.log('time remaining', moment.unix(this.idleTimer.getRemainingTime()).format("MM/DD/YYYY"))
    }
   */
  _onIdle(e) {
    // console.log(this.props);
    this.props.LogoutUser(this.props.isLoggedIn, {
      jwt_token: this.props.isLoggedIn,
      user_id: this.props.profileDetails.id,
    });
    // console.log("user is idle", e);
    // console.log(
    //   "last active",
    //   moment.unix(this.idleTimer.getLastActiveTime()).format("MM/DD/YYYY")
    // );
  }
  render() {
    const { url } = this.props.match;
    return (
      <div>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          /*  onActive={this.onActive} */
          onIdle={this.onIdle}
          /* onAction={this.onAction} */
          debounce={250}
          timeout={30 * 60 * 1000}
        />
        {/* {console.log("App.js")} */}
        <Switch>
          {routes.map((singleRoute) => {
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
          <Route
            component={NotFound}
            // path="/privacy-policy"
            // loc="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies"
          />
          {/* <Route
  path="/privacy-policy"
  component={ Redirect }
  loc="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies"
  /> */}
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    LogoutUser: (isLoggedIn, user_id) =>
      dispatch(LogoutUser(isLoggedIn, user_id)),
  };
}
function mapStateToProps(state, ownProps) {
  return {
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : false,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppRouter)
);
