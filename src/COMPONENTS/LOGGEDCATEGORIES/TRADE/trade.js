/**
 * Welcome to FALDAX TRADING COMPONENT
 *
 * @description :: Trade main component.
 */

/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import {
  Row,
  Col,
  Tabs,
  Radio,
  Select,
  notification,
  Icon,
  Menu,
  Tooltip,
  Spin,
} from "antd";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

/* Components */
/* import Tableofcoin from './TableofCoin'
import WalletDetails from './WalletDetails' */
import Loader from "SHARED-COMPONENTS/Loader";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import Market from "./market";
import Limit from "./limit";
import StopLimit from "./stoplimit";
import BuySell from "./buysell";
import OrderHIstory from "./orderhistory";
import DepthChart from "./depthchart";
import OrderTrade from "./ordertrade";
import { globalVariables } from "Globals.js";
import TradingViewChart from "COMPONENTS/tradingviewchart";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
/* import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader'; */

/* Styled-Components */
import {
  ContactWrap,
  GreyWrap,
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { cryptoCurrency } from "ACTIONS/LOGGEDCAT/tradeActions";
import {
  MainTV,
  TVBar,
  LeftDiv1,
  LeftDiv2,
  Instru,
  SearchInput,
  RightDiv1,
  RightDiv,
  FIATWrap,
  FIATWrap2,
  FIAT,
  InstruTable,
  TableIns,
  TabsRight,
  RadioSelect,
  OrderWrap,
  InstruOrder,
  SelectMonth,
  SettingDropdown,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import DepthChartAm from "./depth_ammchart";
import { getProfileDataAction } from "../../../ACTIONS/SETTINGS/settingActions";
import { precise } from "../../../precision";
import { APIUtility } from "../../../httpHelper";
function precision(x) {}
function precisionTwo(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 2) {
    {
      x = parseFloat(x).toFixed(2);
      if (
        x.toString()[x.toString().length - 1] == "0" &&
        (x.toString().split(".")[1][0] != "0" ||
          x.toString().split(".")[1][5] != "0")
      ) {
        return parseFloat(x);
      } else if (x.toString().split(".")[1][1] == "0") {
        if (x.toString().split(".")[1][0] == "0") {
          return parseFloat(x).toFixed(0);
        } else return parseFloat(x).toFixed(1);
      }
    }
  }
  return x;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;
let { API_URL, tvChartURL, SOCKET_HOST } = globalVariables;
/* var socketIOClient = require('socket.io-client');
io.sails.url = API_URL;
var sailsIOClient = require('sails.io.js');
let io = sailsIOClient(socketIOClient); */
const Option = Select.Option;
const RadioButton = Radio.Button;
const OrderTradeWrap = styled.div`
  display: inline-flex;
  margin-left: auto;
  align-items: center;
  @media (max-width: 856px) {
    display: flex;
    width: 100%;
    margin-left: 30px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
`;
const GreyWrapTrade = styled(GreyWrap)`
  font-family: "Open sans";
  padding-top: 95px;
  & .tradeView {
    height: 100%;
    width: 100%;
    // margin: 5px;
    overflow: hidden;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius: 5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .instruments {
    height: 100%;
    width: 100%;
    // margin: 5px;
    overflow: auto;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius: 5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .tradeAction {
    height: 100%;
    width: 100%;
    // margin: 5px;
    overflow: auto;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius: 5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .buysellBook {
    height: 100%;
    width: 100%;
    // margin: 5px;
    overflow: auto;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius: 5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .depthChart {
    height: 100%;
    width: 100%;
    // margin: 5px;
    overflow: auto;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius: 5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .orderHistory {
    height: 100%;
    width: 100%;
    // margin: 5px;
    overflow: auto;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius: 5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .myorder {
    height: 100%;
    width: 100%;
    // margin: 5px;
    overflow: auto;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius: 5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
`;

const RGL = styled(ResponsiveReactGridLayout)`
  & .react-resizable-handle::after {
    border-right: ${(props) =>
      props.theme.mode === "dark"
        ? "2px solid rgb(255, 255, 255) !important"
        : ""};
    border-bottom: ${(props) =>
      props.theme.mode === "dark"
        ? "2px solid rgb(255, 255, 255) !important"
        : ""};
  }
`;
export const PairMainDiv = styled(Col)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  border-radius: 5px;
  -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  margin: 0 0 10px;
  padding: 25px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.spin_load {
    justify-content: center;
    height: 100px;
  }
  @media (max-width: 990px) {
    flex-wrap: wrap;
  }
`;
const TopDiv = styled.div`
  display: flex;
  width: 16.66%;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  &:after {
    content: "";
    display: inherit;
    background: #e8e8e8;
    height: 20px;
    width: 1px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  &.last_child:after {
    display: none;
  }
  & .top_head {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 15px;
    margin: 0 0 10px 0;
    line-height: 1;
    align-items: flex-end;
    > .highlighted {
      line-height: 1;
      font-size: 24px;
      font-weight: 600;
      margin: 0 4px 0 0;
    }
  }
  & .bottom_name {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 14px;
    line-height: 1;
    font-weight: bold;
    align-items: center;
    color: ${(props) => (props.theme.mode === "dark" ? "#1890ff" : "#174c7e")};
    > img {
      height: 20px;
      margin: 0 10px 0 0;
    }
  }
  & .bottom_name.top {
    margin: 0 0 10px 0;
  }
  & .values_data {
    font-weight: bold;
    font-size: 16px;
    color: ${(props) =>
      props.theme.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.65)"};
    > .change {
      padding: 0 15px 0 0;
    }
    > .red {
      color: red;
    }
    > .green {
      color: green;
    }
  }
  @media (max-width: 1024px) {
    & .top_head {
      font-size: 13px;
      > .highlighted {
        font-size: 20px;
      }
    }
    & .bottom_name {
      font-size: 13px;
    }
    & .values_data {
      font-size: 14px;
    }
  }
  &.pair_name {
    & .top_head {
      color: ${(props) =>
        props.theme.mode === "dark" ? "#1890ff" : "#174c7e"};
    }
    & .bottom_name {
      color: ${(props) =>
        props.theme.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.65)"};
    }
  }
  @media (max-width: 990px) {
    flex-wrap: wrap;
    width: 33.33%;
    margin: 0 0 20px 0;
  }
  @media (max-width: 600px) {
    width: 50%;
  }
`;

const TabPane = Tabs.TabPane;
let io = null;
class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePeriod: "1",
      status: "1",
      crypto: "ETH",
      currency: "BTC",
      prevRoom: {},
      orderTradeData: {},
      InsCurrency: "BTC",
      InsData: {},
      searchedInstu: null,
      userBal: {},
      insLoader: false,
      userBalLoader: false,
      instrumentTableHeight: 260,
      orderHistoryTableHeight: 330,
      myOrderTableHeight: 150,
      buySellOrderHeight: 91,
      depthChartHeight: 700,
      buySellLoader: false,
      hisLoader: false,
      depthLoader: false,
      editState: false,
      saveState: true,
      isFullscreen: false,
      prevlayout: JSON.parse(JSON.stringify(originalLayouts)),
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      MLS: "",
      loader: false,
      butonEnable: false,
      symbolHighLevelInfo: "",
      pricePrecision: "0",
      quantityPrecision: "0",
      panic_status: false,
      spreadPer: "",
    };
    io = this.props.io;
    this.t = this.props.t;
    // io.sails.url = API_URL;
    this.handleChangeOT = this.handleChangeOT.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.getUserBal = this.getUserBal.bind(this);
    this.onInsChange = this.onInsChange.bind(this);
    // this.getInstrumentData = this.getInstrumentData.bind(this);
    this.updateInstrumentsData = this.updateInstrumentsData.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);
    this.exitFullScreen = this.exitFullScreen.bind(this);
    this.callback = this.callback.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.panicStatus = this.panicStatus.bind(this);
    // this.handleLayoutResize = this.handleLayoutResize.bind(this);
  }

  /* Life-Cycle Methods */

  componentWillReceiveProps(props, newProps) {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        alert("Esc key pressed.");
      }
    };
    var self = this;
    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState(
          {
            crypto: props.cryptoPair.crypto,
            prevRoom: props.cryptoPair.prevRoom,
          },
          () => {
            // self.orderSocket(self.state.timePeriod, self.state.status);
            // self.getUserBal();
            this.joinRoom(
              props.cryptoPair.prevRoom.crypto +
                "-" +
                props.cryptoPair.prevRoom.currency
            );
          }
        );
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState(
          {
            currency: props.cryptoPair.currency,
            prevRoom: props.cryptoPair.prevRoom,
          },
          () => {
            // self.orderSocket(self.state.timePeriod, self.state.status);
            // self.getUserBal();
            this.joinRoom(
              props.cryptoPair.prevRoom.crypto +
                "-" +
                props.cryptoPair.prevRoom.currency
            );
          }
        );
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.io.disconnect();
  }
  componentWillMount() {
    // if (!this.props.profileDetails.is_terms_agreed) {
    //   this.props.history.push("/editProfile");
    // }
  }
  async componentDidMount() {
    if (!this.props.profileDetails) {
      this.props.getProfileDataAction(this.props.isLoggedIn);
    }
    this.setState({
      crypto: "ETH",
      currency: "BTC",
    });
    var self = this;
    // io.sails.headers = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   Authorization: "Bearer " + this.props.isLoggedIn
    // };
    // this.orderSocket(this.state.timePeriod, this.state.status);
    // this.getInstrumentData();
    // this.getUserBal();

    // io.socket.on("orderUpdated", data => {
    //   self.orderSocket(self.state.timePeriod, self.state.status);
    //   // self.getUserBal();
    // });

    this.joinRoom();
    if (this.props.io) {
      this.props.getProfileDataAction(this.props.isLoggedIn);
      this.setState({
        insLoader: true,
        userBalLoader: true,
        orderTradeLoader: true,
      });
      // this.setState({ userBalLoader: true });
      this.props.io.on("symbol-high-level-info", (data) => {
        if (data.name == this.state.crypto + "-" + this.state.currency) {
          this.setState({
            symbolHighLevelInfo: data,
          });
        }
      });
      this.props.io.on("users-all-trade-data", (data) => {
        this.updateMyOrder(data);
      });
      this.props.io.on("users-completed-flag", (data) => {
        this.orderSocket(this.state.timePeriod, this.state.status);
      });
      this.orderSocket(this.state.timePeriod, this.state.status);
      this.getInstrumentData();
      this.interval = setInterval(() => {
        this.getInstrumentData();
      }, 10000);
      this.props.io.on("user-wallet-balance", (data) => {
        if (data == true) {
          this.props.io.emit("user_wallet_data", {
            user_id: this.props.profileDetails.id,
            crypto: this.state.crypto,
            currency: this.state.currency,
          });
        } else {
          // if (data) {
          this.setState({ userBal: data, userBalLoader: false });
          // }
        }
      });
      this.props.io.on("user-after-wallet-balance", (data) => {
        if (data) {
          this.setState({ userBal: data, userBalLoader: false });
        }
      });
      this.props.io.on("spread-values", (data) => {
        if (data) {
          if (data[0].name == this.state.crypto + "-" + this.state.currency) {
            if (data[0].ask_price && data[0].bid_price) {
              let spread =
                (data[0].ask_price - data[0].bid_price) /
                ((data[0].bid_price + data[0].ask_price) / 2);
              this.setState({
                spreadPer: precise(parseFloat(spread), "8"),
              });
            }
          }
        }
      });
    }
  }
  panicStatus() {
    this.setState({
      loader: true,
    });
    fetch(API_URL + `/check-panic-status`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === 200) {
          this.setState({
            panic_status: JSON.parse(responseData.data),
            loader: false,
          });
        } else {
          this.setState({
            panic_status: false,
            loader: false,
          });
        }
      })
      .catch((error) => {});
  }
  getInstrumentData = () => {
    fetch(SOCKET_HOST + `/api/v1/tradding/get-instrument-data`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status == 200) {
          for (let index = 0; index < responseData.data.length; index++) {
            const element = responseData.data[index];
            if (element.name == `${this.state.crypto}-${this.state.currency}`) {
              let pricePrecision = element.price_precision;
              let qtyPrecision = element.quantity_precision;
              this.setState({
                pricePrecision: pricePrecision,
                quantityPrecision: qtyPrecision,
              });
            }
          }
          this.updateInstrumentsData(responseData.data);
        }
      })
      .catch((error) => {});
  };
  joinRoom = (prevRoom = null) => {
    io.emit("join", {
      room: this.state.crypto + "-" + this.state.currency,
      previous_room: prevRoom,
    });
  };
  // created by Meghal Patel at 2019-04-27 15:09.
  //
  // Description: Crypto Pair changes from here.It will go in redux.
  //
  //

  onInsChange(e) {
    // this.setState({
    //   insLoader: true
    // });
    // var self = this;
    // console.log("onInsChange^^^^", self.state.crypto, e.target.value);
    // let cryptoPair = {
    //   crypto: self.state.crypto,
    //   currency: e.target.value,
    //   prevRoom: {
    //     crypto: self.state.crypto,
    //     currency: self.state.InsCurrency
    //   }
    // };
    // this.setState(
    //   {
    //     InsCurrency: e.target.value,
    //     InsData: []
    //   },
    //   () => {
    //     // self.props.cryptoCurrency(cryptoPair);
    //     // self.getInstrumentData();
    //     // this.props
    //     this.joinRoom(
    //       cryptoPair.prevRoom.crypto + "-" + cryptoPair.prevRoom.currency
    //     );
    //   }
    // );
    this.setState({
      // userBalLoader: true,
      InsCurrency: e.target.value,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:10.
  //
  // Description: method with api of Instruments
  //
  //

  // getInstrumentData() {
  //   var self = this;
  //   self.setState({ insLoader: true });
  //   io.socket.request(
  //     {
  //       method: "GET",
  //       url: `/socket/get-instrument-data?coin=${self.state.InsCurrency}`,
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + this.props.isLoggedIn
  //       }
  //     },
  //     (body, JWR) => {
  //       if (body.status === 200) {
  //         self.updateInstrumentsData(body.data);
  //       }
  //     }
  //   );
  //   this.props.io.on("instrument-data", data => {
  //     self.updateInstrumentsData(data);
  //   });
  // }

  // created by Meghal Patel at 2019-04-27 15:11.
  //
  // Description:this method is called when socket updates of getInstrumentData().
  //
  //

  updateInstrumentsData(data) {
    let res = {};
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let currency = element.name.split("-")[1];
      if (!res[currency]) {
        res[currency] = [];
      }

      res[currency].push({
        name: element.name.split("-")[0],
        currency,
        price: precise(element.last_price, this.state.pricePrecision),
        volume: precise(element.volume, "2"),
        change: precise(element.percentChange, "2"),
        pricePrecision: element.price_precision,
        quantityPrecision: element.quantity_precision,
        pairName: element.name,
      });
    }
    this.setState({
      InsData: res,
      insLoader: false,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:13.
  //
  // Description: method is called when we change tabs of Market Limit and Stop-limit.
  //
  //

  callback(key) {
    this.setState({
      MLS: key,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:13.
  //
  // Description: Method is called when we change months in Orders and trades
  //
  //

  handleChangeOT(value) {
    this.setState({
      timePeriod: value.key,
      orderTradeData: {},
      orderTradeLoader: true,
    });
    this.orderSocket(value.key, this.state.status);
  }

  // created by Meghal Patel at 2019-04-27 15:14.
  //
  // Description: Method is called when we change status in orders and trades.
  //
  //

  statusChange(e) {
    var status;
    if (e.target.value === "a") {
      status = 1;
    } else if (e.target.value === "b") {
      /*             var self = this; */
      status = 2;
    } else if (e.target.value === "c") {
      status = 3;
    }
    this.setState({ status, orderTradeData: {}, orderTradeLoader: true });
    this.orderSocket(this.state.timePeriod, status);
  }

  // created by Meghal Patel at 2019-04-27 15:20.
  //
  // Description:Method contains socket of trades and orders.
  //
  //
  //

  orderSocket(month, filter_type) {
    // io.emit("")
    // this.setState({ orderTradeLoader: true });
    if (this.props.io) {
      this.props.io.emit("trade_users_history_event", {
        month: month,
        flag: filter_type,
        pair: `${this.state.crypto}-${this.state.currency}`,
      });
    }
    // var URL;
    // this.setState({ orderTradeLoader: true });
    // if (Object.keys(this.state.prevRoom).length > 0)
    //   URL = `/socket/get-user-trade-data?prevRoom=${this.state.prevRoom.crypto}-${this.state.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}&month=${month}&filter_type=${filter_type}`;
    // else
    //   URL = `/socket/get-user-trade-data?room=${this.state.crypto}-${this.state.currency}&month=${month}&filter_type=${filter_type}`;
    // io.socket.request(
    //   {
    //     method: "GET",
    //     url: URL,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + this.props.isLoggedIn
    //     }
    //   },
    //   (body, JWR) => {
    //     if (body.status === 200) {
    //       let res = body.data;
    //       this.updateMyOrder(res);
    //     }
    //     this.setState({ orderTradeLoader: false });
    //   }
    // );
  }

  // created by Meghal Patel at 2019-04-27 15:22.
  //
  // Description:Method is updated when socket is called again from orderSocket();
  //
  //

  updateMyOrder(response) {
    this.setState({
      orderTradeData: response,
      orderTradeLoader: false,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:23.
  //
  // Description:Method is called when user wants to cancel the order which are pending in orders and trades.
  //
  //

  cancelOrder(id, side, type, flagValue) {
    this.setState({
      orderTradeLoader: true,
    });
    fetch(SOCKET_HOST + `/api/v1/tradding/cancel-pending-order`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
      body: JSON.stringify({
        id: id,
        side: side,
        order_type: type,
        flag: flagValue,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === 200) {
          this.orderSocket(this.state.timePeriod, this.state.status);
          this.openNotificationWithIcon(
            "success",
            this.t("validations:success_text.message"),
            responseData.message
          );
        } else if (responseData.status === 500) {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.message
          );
        } else {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.err
          );
        }
        this.setState({
          butonEnable: true,
          orderTradeLoader: false,
        });
      })
      .catch((error) => {});
  }

  // created by Meghal Patel at 2019-04-27 15:24.
  //
  // Description:this method is common notification for every message.
  //
  //

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:25.
  //
  // Description:Method is called when we click on any row in instruments component to change pair.
  //
  //

  currencyPair(crypto) {
    this.setState({
      userBalLoader: true,
    });
    let cryptoPair = {
      crypto: crypto,
      currency: this.state.InsCurrency,
      prevRoom: {
        crypto: this.state.crypto,
        // currency: this.state.InsCurrency,
        currency: this.state.currency,
      },
    };
    // console.log("prev room", this.state.crypto, this.state.currency);
    this.props.cryptoCurrency(cryptoPair);
  }

  // created by Meghal Patel at 2019-04-27 15:26.
  //
  // Description:Method is called to fetch user balance for buy/sell coins component
  //
  //

  getUserBal() {
    // var URL;
    // this.setState({ userBalLoader: true });
    // if (Object.keys(this.state.prevRoom).length > 0)
    //   URL = `/socket/get-user-balance?prevRoom=${this.state.prevRoom.crypto}-${this.state.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}&userId=${this.props.profileDetails.id}`;
    // else
    //   URL = `/socket/get-user-balance?room=${this.state.crypto}-${this.state.currency}&userId=${this.props.profileDetails.id}`;
    // io.socket.request(
    //   {
    //     method: "GET",
    //     url: URL,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + this.props.isLoggedIn
    //     }
    //   },
    //   (body, JWR) => {
    //     if (body.status === 200) {
    //       let res = body.data;
    //       this.setState({ userBal: res, userBalLoader: false });
    //     }
    //   }
    // );
    // io.socket.on("orderUpdate", data => {
    //   this.setState({ userBal: data, userBalLoader: false });
    // });
  }

  // created by Meghal Patel at 2019-04-27 15:27.
  //
  // Description:Method is called when we search in INstruments.
  //
  //

  searchInstu(e) {
    var search = e.target.value;
    if (search.trim() !== "") {
      var searchedInstu = this.state.InsData.filter(function (temp) {
        if (temp.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({ searchedInstu });
    } else {
      this.setState({ searchedInstu: null });
    }
  }

  // created by Meghal Patel at 2019-04-27 15:27.
  //
  // Description:Method is called when layout is changed of grid.
  //
  //

  onLayoutChange(currentLayout, wholeLayout) {
    /*        let self = this; */
    let instrumentTableHeight,
      orderHistoryTableHeight,
      myOrderTableHeight,
      buySellOrderHeight,
      depthChartHeight;
    for (let index = 0; index < currentLayout.length; index++) {
      const element = currentLayout[index];
      if (element.i === "instruments") {
        let newHeight = 0;
        if (element.h === 2) {
          newHeight = 80;
        } else {
          newHeight = 80 + 160 * (element.h - 2);
        }
        instrumentTableHeight = newHeight;
      }
      if (element.i === "orderHistory") {
        let newHeight = 0;
        if (element.h === 2) {
          newHeight = 150;
        } else {
          newHeight = 150 + 160 * (element.h - 2);
        }
        orderHistoryTableHeight = newHeight;
      }
      if (element.i === "myorder") {
        let newHeight = 0;
        if (element.h === 2) {
          newHeight = 130;
        } else {
          newHeight = 130 + 160 * (element.h - 2);
        }
        myOrderTableHeight = newHeight;
      }

      if (element.i === "buysellBook") {
        let newHeight = 0;
        if (element.h === 3) {
          newHeight = 81;
        } else {
          newHeight = 81 + 80 * (element.h - 3);
        }
        buySellOrderHeight = newHeight;
      }
      if (element.i === "depthChart") {
        let newHeight = 0;
        if (element.h === 3) {
          newHeight = 378;
        } else {
          newHeight = 378 + 160 * (element.h - 3);
        }
        depthChartHeight = newHeight;
      }
    }
    this.setState({
      layouts: wholeLayout,
      instrumentTableHeight,
      orderHistoryTableHeight,
      myOrderTableHeight,
      buySellOrderHeight,
      depthChartHeight,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:30.
  //
  // Description:Method is called when user saves the layout.
  //
  //

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  }

  /* RGL ends here */

  // created by Meghal Patel at 2019-04-27 15:31.
  //
  // Description:Method for buy sell loader.
  //
  //

  buySellLoaderFunc(loader) {
    this.setState({ buySellLoader: loader });
  }

  // created by Meghal Patel at 2019-04-27 15:31.
  //
  // Description:Method for history loader.
  //
  //

  hisFunc(loader) {
    this.setState({ hisLoader: loader });
  }

  // created by Meghal Patel at 2019-04-27 15:31.
  //
  // Description:Method for depth chart loader.
  //
  //

  depthLoaderFunc(loader) {
    this.setState({ depthLoader: loader });
  }

  // created by Meghal Patel at 2019-04-27 15:31.
  //
  // Description:Method for state change when edit layout is clicked.
  //
  //

  editLayout() {
    if (this.state.editState === false)
      this.setState({ editState: true, saveState: false });
    else this.setState({ editState: false });
  }

  // created by Meghal Patel at 2019-04-27 15:31.
  //
  // Description:Method for state change when clear layout is clicked.
  //
  //

  clearLayout() {
    if (this.state.saveState === false) {
      this.setState({
        saveState: true,
        editState: false,
        layouts: this.state.prevlayout,
      });
    } else {
      this.setState({ saveState: false });
    }
  }

  // created by Meghal Patel at 2019-04-27 15:31.
  //
  // Description:Method for state change when save layout is clicked and store it on local.
  //
  //

  saveLayout() {
    if (this.state.saveState === false) {
      this.setState({
        saveState: true,
        editState: false,
        prevlayout: this.state.layouts,
      });
      this.saveToLS("layouts", this.state.layouts);
      window.location.reload();
    } else {
      this.setState({ saveState: false });
    }
  }

  // created by Meghal Patel at 2019-04-27 15:34.
  //
  // Description:Method is called when reset layout is clicked.
  //
  //

  resetLayout() {
    this.setState(
      {
        saveState: false,
        layouts: {
          lg: [
            {
              w: 8,
              h: 4,
              x: 0,
              y: 0,
              i: "tradeView",
              minW: 4,
              minH: 3,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 4,
              x: 8,
              y: 0,
              i: "instruments",
              minW: 3,
              minH: 2,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 4,
              x: 4,
              y: 4,
              i: "tradeAction",
              minW: 3,
              minH: 2,
              maxH: 5,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 8,
              x: 8,
              y: 4,
              i: "buysellBook",
              minW: 3,
              minH: 3,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 4,
              x: 4,
              y: 8,
              i: "depthChart",
              minW: 3,
              minH: 4,
              maxH: 5,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 8,
              x: 0,
              y: 4,
              i: "orderHistory",
              minW: 3,
              minH: 2,
              moved: false,
              static: false,
            },
            {
              w: 12,
              h: 5,
              x: 0,
              y: 12,
              i: "myorder",
              minW: 3,
              minH: 2,
              moved: false,
              static: false,
            },
          ],
          md: [
            { i: "tradeView", x: 0, y: 0, w: 10, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 5, h: 2, minW: 5 },
            { i: "tradeAction", x: 5, y: 1, w: 5, h: 2, minW: 3 },
            { i: "buysellBook", x: 0, y: 2, w: 5, h: 3, minH: 3, minW: 5 },
            { i: "depthChart", x: 5, y: 2, w: 5, h: 2, minW: 5 },
            { i: "orderHistory", x: 0, y: 3, w: 12, h: 2, minH: 2, minW: 5 },
            { i: "myorder", x: 0, y: 4, w: 10, h: 4, minW: 5, minH: 4 },
          ],
          sm: [
            { i: "tradeView", x: 0, y: 0, w: 6, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 6, h: 2, minW: 6 },
            { i: "tradeAction", x: 0, y: 2, w: 6, h: 2, minW: 6 },
            { i: "buysellBook", x: 0, y: 3, w: 6, h: 3, minH: 3, minW: 6 },
            { i: "depthChart", x: 0, y: 4, w: 6, h: 2, minW: 6 },
            { i: "orderHistory", x: 0, y: 5, w: 6, h: 2, minH: 2, minW: 6 },
            { i: "myorder", x: 0, y: 6, w: 6, h: 2, minW: 6 },
          ],
          xs: [
            { i: "tradeView", x: 0, y: 0, w: 4, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 4, h: 2, minW: 4 },
            { i: "tradeAction", x: 0, y: 2, w: 4, h: 2, minW: 4 },
            { i: "buysellBook", x: 0, y: 3, w: 4, h: 3, minH: 3, minW: 4 },
            { i: "depthChart", x: 0, y: 4, w: 4, h: 2, minW: 4 },
            { i: "orderHistory", x: 0, y: 5, w: 4, h: 2, minH: 2, minW: 4 },
            { i: "myorder", x: 0, y: 5, w: 5, h: 2, minW: 4 },
          ],
          xxs: [
            { i: "tradeView", x: 0, y: 0, w: 2, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 2, h: 2, minW: 2 },
            { i: "tradeAction", x: 0, y: 2, w: 2, h: 2, minW: 2 },
            { i: "buysellBook", x: 0, y: 3, w: 2, h: 3, minH: 3, minW: 2 },
            { i: "depthChart", x: 0, y: 4, w: 2, h: 2, minW: 2 },
            { i: "orderHistory", x: 0, y: 5, w: 2, h: 2, minH: 2, minW: 2 },
            { i: "myorder", x: 0, y: 6, w: 2, h: 2, minW: 2 },
          ],
        },
        // layouts: {
        //   lg: [
        //     {
        //       w: 8,
        //       h: 4,
        //       x: 0,
        //       y: 0,
        //       i: "tradeView",
        //       minW: 6,
        //       minH: 3,
        //     },
        //     {
        //       w: 4,
        //       h: 4,
        //       x: 8,
        //       y: 0,
        //       i: "instruments",
        //       minW: 4,
        //       minH: 2,
        //     },
        //     {
        //       w: 4,
        //       h: 5,
        //       x: 4,
        //       y: 4,
        //       i: "tradeAction",
        //       minW: 3,
        //       minH: 2,
        //       maxH: 5,
        //     },
        //     {
        //       w: 4,
        //       h: 5,
        //       x: 8,
        //       y: 4,
        //       i: "buysellBook",
        //       minW: 4,
        //       minH: 3,
        //     },
        //     {
        //       w: 4,
        //       h: 5,
        //       x: 0,
        //       y: 4,
        //       i: "depthChart",
        //       minW: 4,
        //       minH: 4,
        //       maxH: 5,
        //     },
        //     {
        //       w: 12,
        //       h: 3,
        //       x: 0,
        //       y: 8,
        //       i: "orderHistory",
        //       minW: 4,
        //       minH: 2,
        //     },
        //     {
        //       w: 12,
        //       h: 4,
        //       x: 0,
        //       y: 11,
        //       i: "myorder",
        //       minW: 6,
        //       minH: 2,
        //     },
        //   ],
        //   md: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 10,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 5,
        //       h: 2,
        //       minW: 5,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 5,
        //       y: 1,
        //       w: 5,
        //       h: 2,
        //       minW: 3,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 2,
        //       w: 5,
        //       h: 3,
        //       minH: 3,
        //       minW: 5,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 5,
        //       y: 2,
        //       w: 5,
        //       h: 2,
        //       minW: 5,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 3,
        //       w: 12,
        //       h: 2,
        //       minH: 2,
        //       minW: 5,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 4,
        //       w: 10,
        //       h: 4,
        //       minW: 5,
        //       minH: 4,
        //     },
        //   ],
        //   sm: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 6,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 0,
        //       y: 2,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 3,
        //       w: 6,
        //       h: 3,
        //       minH: 3,
        //       minW: 6,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 0,
        //       y: 4,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 5,
        //       w: 6,
        //       h: 2,
        //       minH: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 6,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //   ],
        //   xs: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 4,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 4,
        //       h: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 0,
        //       y: 2,
        //       w: 4,
        //       h: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 3,
        //       w: 4,
        //       h: 3,
        //       minH: 3,
        //       minW: 4,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 0,
        //       y: 4,
        //       w: 4,
        //       h: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 5,
        //       w: 4,
        //       h: 2,
        //       minH: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 5,
        //       w: 5,
        //       h: 2,
        //       minW: 4,
        //     },
        //   ],
        //   xxs: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 2,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 0,
        //       y: 2,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 3,
        //       w: 2,
        //       h: 3,
        //       minH: 3,
        //       minW: 2,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 0,
        //       y: 4,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 5,
        //       w: 2,
        //       h: 2,
        //       minH: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 6,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //   ],
        // },
      },
      () => {
        window.location.reload();
      }
    );
  }

  // created by Meghal Patel at 2019-04-27 15:34.
  //
  // Description:Method is called for full-screen mode
  //
  //

  goFullScreen() {
    let body = document.getElementsByTagName("body");
    let element = body[0];
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
    this.setState({
      isFullscreen: true,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:35.
  //
  // Description:Method is called when exit full-screen is clicked.
  //
  //

  exitFullScreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();

    this.setState({
      isFullscreen: false,
    });
  }

  // created by Meghal Patel at 2019-04-27 15:35.
  //
  // Description: Render method starts.
  //
  //

  render() {
    var self = this;
    const columns = [
      {
        title: `${this.t("referral:referral_table_head_name.message")}`,
        dataIndex: "pairName",
        className: "tblInsName",
        sorter: (a, b, sortOrder) => {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        },
        render: (text) => text.replace("-", "/"),
      },
      {
        title: `${this.t("history:price_text.message")}`,
        dataIndex: "price",
        defaultSortOrder: "descend",
        className: "tblInsPrice",
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: `${this.t("volume_text.message")}`,
        dataIndex: "volume",
        defaultSortOrder: "ascend",
        className: "tblInsVolumn",
        render: (text) => text,
        sorter: (a, b) => a.volume - b.volume,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: `${this.t("change_text.message")}`,
        dataIndex: "change",
        defaultSortOrder: "ascend",
        className: "tblInsChange",
        render: (text) => {
          if (text < 0)
            return <span style={{ color: "red" }}>{Math.abs(text) + "%"}</span>;
          else
            return (
              <span style={{ color: "green" }}>{Math.abs(text) + "%"}</span>
            );
        },
        sorter: (a, b) => a.change - b.change,
      },
    ];
    const menu = (
      <Menu className="SettingMenu">
        <Menu.Item
          onClick={this.editLayout.bind(this)}
          disabled={this.state.editState}
          key="1"
        >
          {this.t("edit_layout_text.message")}
        </Menu.Item>
        {self.state.isFullscreen && (
          <Menu.Item key="2" onClick={this.exitFullScreen}>
            <Icon type="fullscreen-exit" />
            {this.t("exit_full_screen_text.message")}
          </Menu.Item>
        )}
        {!self.state.isFullscreen && (
          <Menu.Item key="2" onClick={this.goFullScreen}>
            <Icon type="fullscreen" /> {this.t("full_screen_text.message")}
          </Menu.Item>
        )}
        <Menu.Item
          onClick={this.clearLayout.bind(this)}
          disabled={this.state.saveState}
          key="3"
        >
          {this.t("clear_layout_text.message")}
        </Menu.Item>
        <Menu.Item
          onClick={this.saveLayout.bind(this)}
          disabled={this.state.saveState}
          key="2"
        >
          {this.t("edit_profile_titles:subhead_personal_form_save_btn.message")}
        </Menu.Item>
        <Menu.Item onClick={this.resetLayout.bind(this)} key="4">
          {this.t("reset_layout_text.message")}
        </Menu.Item>
      </Menu>
    );
    return (
      <ContactWrap>
        <SettingDropdown
          overlay={menu}
          placement="bottomLeft"
          trigger={["click"]}
          overlayClassName="dropSettings"
        >
          <Icon type="setting" />
        </SettingDropdown>
        <Navigation />
        <GreyWrapTrade>
          <Row>
            {this.state.symbolHighLevelInfo ? (
              <PairMainDiv>
                <TopDiv className="pair_name">
                  <span className="top_head">
                    <span className="highlighted">{this.state.crypto}</span>/{" "}
                    {this.state.currency}
                  </span>

                  <span className="bottom_name">
                    <img
                      src={`${_AMAZONBUCKET}${this.state.symbolHighLevelInfo.icon}`}
                    />
                    <span>{this.state.symbolHighLevelInfo.coin_name}</span>
                  </span>
                </TopDiv>
                <TopDiv>
                  <span className="bottom_name top">
                    <span>
                      {this.t("tier_changes:last_price_text.message")}
                    </span>
                  </span>
                  <span className="values_data">
                    <span
                      className={
                        this.state.symbolHighLevelInfo.side === "Sell"
                          ? "red change"
                          : "green change"
                      }
                    >
                      {this.state.symbolHighLevelInfo.last_price
                        ? precise(
                            this.state.symbolHighLevelInfo.last_price,
                            this.state.pricePrecision
                          )
                        : "0"}
                    </span>
                  </span>
                  <span className="values_data">
                    <NumberFormat
                      value={
                        this.state.symbolHighLevelInfo.fiatValue
                          ? precise(
                              this.state.symbolHighLevelInfo.fiatValue,
                              "2"
                            )
                          : "0"
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </span>
                </TopDiv>
                <TopDiv>
                  <span className="bottom_name top">
                    <span>
                      {this.t("tier_changes:24h_change_text.message")}
                    </span>
                  </span>
                  <span className="values_data">
                    <span
                      className={
                        parseFloat(this.state.symbolHighLevelInfo.change) >= 0
                          ? "green"
                          : "red"
                      }
                    >
                      <NumberFormat
                        value={
                          this.state.symbolHighLevelInfo.change
                            ? precise(
                                Math.abs(this.state.symbolHighLevelInfo.change),
                                "2"
                              )
                            : "0"
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix="%"
                      />
                    </span>
                  </span>
                </TopDiv>
                <TopDiv>
                  <span className="bottom_name top">
                    <span>{this.t("tier_changes:24h_high_text.message")}</span>
                  </span>
                  <span className="values_data">
                    <span>
                      {this.state.symbolHighLevelInfo.high
                        ? precise(
                            this.state.symbolHighLevelInfo.high,
                            this.state.pricePrecision
                          )
                        : "0"}
                    </span>
                  </span>
                </TopDiv>
                <TopDiv>
                  <span className="bottom_name top">
                    <span>{this.t("tier_changes:24h_low_text.message")}</span>
                  </span>
                  <span className="values_data">
                    <span>
                      {this.state.symbolHighLevelInfo.low
                        ? precise(
                            this.state.symbolHighLevelInfo.low,
                            this.state.pricePrecision
                          )
                        : "0"}
                    </span>
                  </span>
                </TopDiv>
                <TopDiv className="last_child">
                  <span className="bottom_name top">
                    <span>
                      {this.t("tier_changes:24h_volume_text.message")}
                    </span>
                  </span>
                  <span className="values_data">
                    <span>
                      <NumberFormat
                        value={
                          this.state.symbolHighLevelInfo.volume
                            ? precise(
                                this.state.symbolHighLevelInfo.volume,
                                "2"
                              )
                            : "0"
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={`${" "}${this.state.currency}`}
                      />
                    </span>
                  </span>
                </TopDiv>
              </PairMainDiv>
            ) : (
              <PairMainDiv className="spin_load">
                {/* <Spin size="small" /> */}
                <Loader color="#1990ff" width="50" height="50" />
              </PairMainDiv>
            )}
            <Col>
              <RGL
                className="layout"
                layouts={this.state.layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                isDraggable={this.state.editState}
                isResizable={this.state.editState}
                onLayoutChange={(layout, layouts) =>
                  this.onLayoutChange(layout, layouts)
                }
              >
                <div key="tradeView">
                  <div
                    className="tradeView"
                    // style={{ height: "100%", width: "100%" }}
                  >
                    <MainTV>
                      <TVBar>
                        <div>
                          <span>
                            {this.state.crypto}/{this.state.currency}
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            window.open(
                              tvChartURL +
                                `/${this.state.crypto}-${this.state.currency}`,
                              "_blank",
                              "location=yes,height=800,width=1000,scrollbars=yes,status=yes"
                            );
                          }}
                          style={{ marginLeft: "auto" }}
                        >
                          <Tooltip
                            placement="bottomLeft"
                            title={"Chart in New Window"}
                          >
                            <Icon type="arrows-alt" />
                          </Tooltip>
                        </div>
                      </TVBar>
                      <TradingViewChart
                        crypto={this.state.crypto}
                        currency={this.state.currency}
                        theme={this.props.theme}
                      />
                    </MainTV>
                  </div>
                </div>
                <div key="instruments">
                  <div
                    className="instruments"
                    // style={{ height: "100%", width: "100%", overflow: "auto" }}
                  >
                    {this.state.insLoader === true ? (
                      <Loader color="#1990ff" width="50" height="50" />
                    ) : (
                      ""
                    )}
                    <LeftDiv1>
                      <Instru>{this.t("instruments_text.message")}</Instru>
                      {/* {this.state.InsData ? (
                        <SearchInput
                          onChange={(e) => this.searchInstu(e)}
                          style={{ width: 200 }}
                        />
                      ) : (
                          ""
                        )} */}
                      <FIATWrap>
                        <FIAT>
                          <RadioSelect
                            value={this.state.InsCurrency}
                            size="large"
                            buttonStyle="solid"
                            onChange={this.onInsChange}
                          >
                            {Object.keys(this.state.InsData).map((k) => (
                              <RadioButton value={k}>{k}</RadioButton>
                            ))}
                          </RadioSelect>
                        </FIAT>
                      </FIATWrap>
                      <InstruTable>
                        <TableIns
                          InsCurrency
                          onRow={(record, rowIndex) => {
                            return {
                              onClick: (event) => {
                                self.currencyPair(record.name);
                                self.setState({
                                  pricePrecision: record.pricePrecision
                                    ? record.pricePrecision
                                    : "0",
                                  quantityPrecision: record.quantityPrecision
                                    ? record.quantityPrecision
                                    : "0",
                                });
                              }, // click row
                            };
                          }}
                          pagination={false}
                          columns={columns}
                          rowClassName={(record) => {
                            if (
                              record.name == this.state.crypto &&
                              record.currency == this.state.currency
                            ) {
                              return "selectedIns";
                            } else {
                              return "";
                            }
                          }}
                          dataSource={
                            this.state.InsData[this.state.InsCurrency]
                          }
                          onChange={this.onChange}
                          scroll={{ y: self.state.instrumentTableHeight }}
                        />
                      </InstruTable>
                    </LeftDiv1>
                  </div>
                </div>
                <div key="tradeAction">
                  <div
                    className="tradeAction"
                    // style={{ height: "100%", width: "100%", overflow: "auto" }}
                  >
                    {this.state.userBalLoader === true ? (
                      <Loader color="#1990ff" width="50" height="50" />
                    ) : (
                      ""
                    )}
                    <RightDiv1>
                      <TabsRight
                        defaultActiveKey="2"
                        onChange={this.callback}
                        className="tardeActionCard"
                      >
                        <TabPane tab={this.t("market_head.message")} key="1">
                          <Market
                            panic_status={this.state.panic_status}
                            MLS={this.state.MLS}
                            userBal={this.state.userBal}
                            crypto={this.state.crypto}
                            currency={this.state.currency}
                            io={this.props.io}
                            cryptoCode={
                              this.state.symbolHighLevelInfo.crypto_coin_code
                                ? this.state.symbolHighLevelInfo
                                    .crypto_coin_code
                                : "teth"
                            }
                            cryptoName={
                              this.state.symbolHighLevelInfo.coin_name
                                ? this.state.symbolHighLevelInfo.coin_name
                                : "Ethereum"
                            }
                            currencyName={
                              this.state.symbolHighLevelInfo.currency_coin_name
                                ? this.state.symbolHighLevelInfo
                                    .currency_coin_name
                                : "Bitcoin"
                            }
                            currencyCode={
                              this.state.symbolHighLevelInfo.currency_coin_code
                                ? this.state.symbolHighLevelInfo
                                    .currency_coin_code
                                : "tbtc"
                            }
                            pricePrecision={this.state.pricePrecision}
                            qtyPrecision={this.state.quantityPrecision}
                          />
                        </TabPane>
                        <TabPane tab={this.t("limit_head.message")} key="2">
                          <Limit
                            panic_status={this.state.panic_status}
                            MLS={this.state.MLS}
                            userBal={this.state.userBal}
                            crypto={this.state.crypto}
                            currency={this.state.currency}
                            io={this.props.io}
                            cryptoCode={
                              this.state.symbolHighLevelInfo.crypto_coin_code
                                ? this.state.symbolHighLevelInfo
                                    .crypto_coin_code
                                : "teth"
                            }
                            cryptoName={
                              this.state.symbolHighLevelInfo.coin_name
                                ? this.state.symbolHighLevelInfo.coin_name
                                : "Ethereum"
                            }
                            currencyName={
                              this.state.symbolHighLevelInfo.currency_coin_name
                                ? this.state.symbolHighLevelInfo
                                    .currency_coin_name
                                : "Bitcoin"
                            }
                            currencyCode={
                              this.state.symbolHighLevelInfo.currency_coin_code
                                ? this.state.symbolHighLevelInfo
                                    .currency_coin_code
                                : "tbtc"
                            }
                            pricePrecision={this.state.pricePrecision}
                            qtyPrecision={this.state.quantityPrecision}
                          />
                        </TabPane>
                        <TabPane
                          tab={this.t("stop_limit_head.message")}
                          key="3"
                        >
                          <StopLimit
                            panic_status={this.state.panic_status}
                            MLS={this.state.MLS}
                            userBal={this.state.userBal}
                            crypto={this.state.crypto}
                            currency={this.state.currency}
                            io={this.props.io}
                            cryptoCode={
                              this.state.symbolHighLevelInfo.crypto_coin_code
                                ? this.state.symbolHighLevelInfo
                                    .crypto_coin_code
                                : "teth"
                            }
                            cryptoName={
                              this.state.symbolHighLevelInfo.coin_name
                                ? this.state.symbolHighLevelInfo.coin_name
                                : "Ethereum"
                            }
                            currencyName={
                              this.state.symbolHighLevelInfo.currency_coin_name
                                ? this.state.symbolHighLevelInfo
                                    .currency_coin_name
                                : "Bitcoin"
                            }
                            currencyCode={
                              this.state.symbolHighLevelInfo.currency_coin_code
                                ? this.state.symbolHighLevelInfo
                                    .currency_coin_code
                                : "tbtc"
                            }
                            pricePrecision={this.state.pricePrecision}
                            qtyPrecision={this.state.quantityPrecision}
                          />
                        </TabPane>
                      </TabsRight>
                    </RightDiv1>
                  </div>
                </div>
                <div key="buysellBook">
                  <div
                    className="buysellBook"
                    // style={{ height: "100%", width: "100%", overflow: "auto" }}
                  >
                    {/* {this.state.buySellLoader === true ? (
                      <Loader color="#1990ff" width="50" height="50" />
                    ) : (
                      ""
                    )} */}
                    <BuySell
                      crypto={this.state.crypto}
                      currency={this.state.currency}
                      buySellLoader={(loader) => {
                        this.buySellLoaderFunc(loader);
                      }}
                      io={io}
                      height={this.state.buySellOrderHeight}
                      pricePrecision={this.state.pricePrecision}
                      qtyPrecision={this.state.quantityPrecision}
                    />
                  </div>
                </div>
                <div key="depthChart">
                  <div
                    className="depthChart"
                    // style={{ height: "100%", width: "100%", overflow: "auto" }}
                  >
                    {this.state.depthLoader === true ? (
                      <Loader color="#1990ff" width="50" height="50" />
                    ) : (
                      ""
                    )}
                    <RightDiv>
                      {/* <DepthChart
                        crypto={this.state.crypto}
                        currency={this.state.currency}
                        depthLoaderFunc={(loader) =>
                          this.depthLoaderFunc(loader)
                        }
                        io={this.props.io}
                        height={this.state.depthChartHeight}
                      /> */}
                      <DepthChartAm
                        crypto={this.state.crypto}
                        currency={this.state.currency}
                        io={this.props.io}
                        height={this.state.depthChartHeight}
                        pricePrecision={this.state.pricePrecision}
                        spread={this.state.spreadPer}
                      />
                    </RightDiv>
                  </div>
                </div>
                <div key="orderHistory">
                  <div
                    className="orderHistory"
                    // style={{ height: "100%", width: "100%", overflow: "auto" }}
                  >
                    {this.state.hisLoader === true ? (
                      <Loader color="#1990ff" width="50" height="50" />
                    ) : (
                      ""
                    )}
                    <OrderHIstory
                      io={io}
                      hisFunc={(loader) => this.hisFunc(loader)}
                      height={self.state.orderHistoryTableHeight}
                      currency={this.state.currency}
                      crypto={this.state.crypto}
                      pricePrecision={this.state.pricePrecision}
                      qtyPrecision={this.state.quantityPrecision}
                    />
                  </div>
                </div>
                <div key="myorder">
                  <div
                    className="myorder"
                    // style={{ height: "100%", width: "100%", overflow: "auto" }}
                  >
                    {/* {this.state.orderTradeLoader === true ? (
                      <Loader color="#1990ff" width="50" height="50" />
                    ) : (
                      ""
                    )} */}
                    <LeftDiv2>
                      <OrderWrap>
                        <InstruOrder>
                          {this.t("my_order_and_trade_head.message")}
                        </InstruOrder>
                        <OrderTradeWrap>
                          <SelectMonth
                            labelInValue
                            defaultValue={{ key: "1" }}
                            style={{ width: 120, marginRight: "30px" }}
                            onChange={this.handleChangeOT}
                          >
                            <Option value="1">
                              1 {this.t("month_text.message")}
                            </Option>
                            <Option value="3">
                              3 {this.t("months_text.message")}
                            </Option>
                            <Option value="6">
                              6 {this.t("months_text.message")}
                            </Option>
                            <Option value="12">
                              12 {this.t("months_text.message")}
                            </Option>
                          </SelectMonth>
                          <FIATWrap2>
                            <FIAT>
                              <RadioSelect
                                onChange={this.statusChange}
                                defaultValue="a"
                                size="large"
                                buttonStyle="solid"
                                className="order-tab-select"
                              >
                                <RadioButton value="a">
                                  {this.t("completed_text.message")}
                                </RadioButton>
                                <RadioButton value="b">
                                  {this.t("pending_text.message")}
                                </RadioButton>
                                <RadioButton value="c">
                                  {this.t("cancelled_text.message")}
                                </RadioButton>
                              </RadioSelect>
                            </FIAT>
                          </FIATWrap2>
                        </OrderTradeWrap>
                      </OrderWrap>
                      <OrderTrade
                        orderTradeLoader={this.state.orderTradeLoader}
                        profileDetails={this.props.profileDetails}
                        pending={this.state.status}
                        cancelOrder={(id, side, type, flagValue) => {
                          this.cancelOrder(id, side, type, flagValue);
                        }}
                        orderTradeData={this.state.orderTradeData}
                        height={self.state.myOrderTableHeight}
                        butonEnable={this.state.butonEnable}
                        currency={this.state.currency}
                        crypto={this.state.crypto}
                        pricePrecision={this.state.pricePrecision}
                        qtyPrecision={this.state.quantityPrecision}
                      />
                    </LeftDiv2>
                  </div>
                </div>
              </RGL>
            </Col>
          </Row>
        </GreyWrapTrade>
        <CommonFooter />
      </ContactWrap>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    cryptoPair:
      state.walletReducer.cryptoPair !== undefined
        ? state.walletReducer.cryptoPair
        : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    loader: state.simpleReducer.loader ? state.simpleReducer.loader : false,
  };
}
const mapDispatchToProps = (dispatch) => ({
  cryptoCurrency: (Pair) => dispatch(cryptoCurrency(Pair)),
  getProfileDataAction: (isLoggedIn) =>
    dispatch(getProfileDataAction(isLoggedIn)),
});

export default translate([
  "trade",
  "edit_profile_titles",
  "referral",
  "history",
  "validations",
])(connect(mapStateToProps, mapDispatchToProps)(withRouter(Trade)));

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {
        layouts: {
          lg: [
            {
              w: 8,
              h: 4,
              x: 0,
              y: 0,
              i: "tradeView",
              minW: 4,
              minH: 3,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 4,
              x: 8,
              y: 0,
              i: "instruments",
              minW: 3,
              minH: 2,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 4,
              x: 4,
              y: 4,
              i: "tradeAction",
              minW: 3,
              minH: 2,
              maxH: 5,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 8,
              x: 8,
              y: 4,
              i: "buysellBook",
              minW: 3,
              minH: 3,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 4,
              x: 4,
              y: 8,
              i: "depthChart",
              minW: 3,
              minH: 4,
              maxH: 5,
              moved: false,
              static: false,
            },
            {
              w: 4,
              h: 8,
              x: 0,
              y: 4,
              i: "orderHistory",
              minW: 3,
              minH: 2,
              moved: false,
              static: false,
            },
            {
              w: 12,
              h: 5,
              x: 0,
              y: 12,
              i: "myorder",
              minW: 3,
              minH: 2,
              moved: false,
              static: false,
            },
          ],
          md: [
            { i: "tradeView", x: 0, y: 0, w: 10, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 5, h: 2, minW: 5 },
            { i: "tradeAction", x: 5, y: 1, w: 5, h: 2, minW: 3 },
            { i: "buysellBook", x: 0, y: 2, w: 5, h: 3, minH: 3, minW: 5 },
            { i: "depthChart", x: 5, y: 2, w: 5, h: 2, minW: 5 },
            { i: "orderHistory", x: 0, y: 3, w: 12, h: 2, minH: 2, minW: 5 },
            { i: "myorder", x: 0, y: 4, w: 10, h: 4, minW: 5, minH: 4 },
          ],
          sm: [
            { i: "tradeView", x: 0, y: 0, w: 6, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 6, h: 2, minW: 6 },
            { i: "tradeAction", x: 0, y: 2, w: 6, h: 2, minW: 6 },
            { i: "buysellBook", x: 0, y: 3, w: 6, h: 3, minH: 3, minW: 6 },
            { i: "depthChart", x: 0, y: 4, w: 6, h: 2, minW: 6 },
            { i: "orderHistory", x: 0, y: 5, w: 6, h: 2, minH: 2, minW: 6 },
            { i: "myorder", x: 0, y: 6, w: 6, h: 2, minW: 6 },
          ],
          xs: [
            { i: "tradeView", x: 0, y: 0, w: 4, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 4, h: 2, minW: 4 },
            { i: "tradeAction", x: 0, y: 2, w: 4, h: 2, minW: 4 },
            { i: "buysellBook", x: 0, y: 3, w: 4, h: 3, minH: 3, minW: 4 },
            { i: "depthChart", x: 0, y: 4, w: 4, h: 2, minW: 4 },
            { i: "orderHistory", x: 0, y: 5, w: 4, h: 2, minH: 2, minW: 4 },
            { i: "myorder", x: 0, y: 5, w: 5, h: 2, minW: 4 },
          ],
          xxs: [
            { i: "tradeView", x: 0, y: 0, w: 2, h: 3, minH: 3 },
            { i: "instruments", x: 0, y: 1, w: 2, h: 2, minW: 2 },
            { i: "tradeAction", x: 0, y: 2, w: 2, h: 2, minW: 2 },
            { i: "buysellBook", x: 0, y: 3, w: 2, h: 3, minH: 3, minW: 2 },
            { i: "depthChart", x: 0, y: 4, w: 2, h: 2, minW: 2 },
            { i: "orderHistory", x: 0, y: 5, w: 2, h: 2, minH: 2, minW: 2 },
            { i: "myorder", x: 0, y: 6, w: 2, h: 2, minW: 2 },
          ],
        },
        // layouts: {
        //   lg: [
        //     {
        //       w: 8,
        //       h: 4,
        //       x: 0,
        //       y: 0,
        //       i: "tradeView",
        //       minW: 6,
        //       minH: 3,
        //     },
        //     {
        //       w: 4,
        //       h: 4,
        //       x: 8,
        //       y: 0,
        //       i: "instruments",
        //       minW: 4,
        //       minH: 2,
        //     },
        //     {
        //       w: 4,
        //       h: 5,
        //       x: 4,
        //       y: 4,
        //       i: "tradeAction",
        //       minW: 3,
        //       minH: 2,
        //       maxH: 5,
        //     },
        //     {
        //       w: 4,
        //       h: 5,
        //       x: 8,
        //       y: 4,
        //       i: "buysellBook",
        //       minW: 4,
        //       minH: 3,
        //     },
        //     {
        //       w: 4,
        //       h: 5,
        //       x: 0,
        //       y: 4,
        //       i: "depthChart",
        //       minW: 4,
        //       minH: 4,
        //       maxH: 5,
        //     },
        //     {
        //       w: 12,
        //       h: 3,
        //       x: 0,
        //       y: 8,
        //       i: "orderHistory",
        //       minW: 4,
        //       minH: 2,
        //     },
        //     {
        //       w: 12,
        //       h: 4,
        //       x: 0,
        //       y: 11,
        //       i: "myorder",
        //       minW: 6,
        //       minH: 2,
        //     },
        //   ],
        //   md: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 10,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 5,
        //       h: 2,
        //       minW: 5,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 5,
        //       y: 1,
        //       w: 5,
        //       h: 2,
        //       minW: 3,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 2,
        //       w: 5,
        //       h: 3,
        //       minH: 3,
        //       minW: 5,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 5,
        //       y: 2,
        //       w: 5,
        //       h: 2,
        //       minW: 5,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 3,
        //       w: 12,
        //       h: 2,
        //       minH: 2,
        //       minW: 5,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 4,
        //       w: 10,
        //       h: 4,
        //       minW: 5,
        //       minH: 4,
        //     },
        //   ],
        //   sm: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 6,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 0,
        //       y: 2,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 3,
        //       w: 6,
        //       h: 3,
        //       minH: 3,
        //       minW: 6,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 0,
        //       y: 4,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 5,
        //       w: 6,
        //       h: 2,
        //       minH: 2,
        //       minW: 6,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 6,
        //       w: 6,
        //       h: 2,
        //       minW: 6,
        //     },
        //   ],
        //   xs: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 4,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 4,
        //       h: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 0,
        //       y: 2,
        //       w: 4,
        //       h: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 3,
        //       w: 4,
        //       h: 3,
        //       minH: 3,
        //       minW: 4,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 0,
        //       y: 4,
        //       w: 4,
        //       h: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 5,
        //       w: 4,
        //       h: 2,
        //       minH: 2,
        //       minW: 4,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 5,
        //       w: 5,
        //       h: 2,
        //       minW: 4,
        //     },
        //   ],
        //   xxs: [
        //     {
        //       i: "tradeView",
        //       x: 0,
        //       y: 0,
        //       w: 2,
        //       h: 3,
        //       minH: 3,
        //     },
        //     {
        //       i: "instruments",
        //       x: 0,
        //       y: 1,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "tradeAction",
        //       x: 0,
        //       y: 2,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "buysellBook",
        //       x: 0,
        //       y: 3,
        //       w: 2,
        //       h: 3,
        //       minH: 3,
        //       minW: 2,
        //     },
        //     {
        //       i: "depthChart",
        //       x: 0,
        //       y: 4,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "orderHistory",
        //       x: 0,
        //       y: 5,
        //       w: 2,
        //       h: 2,
        //       minH: 2,
        //       minW: 2,
        //     },
        //     {
        //       i: "myorder",
        //       x: 0,
        //       y: 6,
        //       w: 2,
        //       h: 2,
        //       minW: 2,
        //     },
        //   ],
        // },
      };
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
