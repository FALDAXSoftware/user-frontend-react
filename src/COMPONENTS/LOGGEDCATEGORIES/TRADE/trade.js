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
  Tooltip
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
/* import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader'; */

/* Styled-Components */
import {
  ContactWrap,
  GreyWrap
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
  SettingDropdown
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

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
  padding-top: 120px;
  & .tradeView {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    overflow:hidden;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius:5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .instruments {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    overflow: auto;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius:5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .tradeAction {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    overflow: auto;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius:5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .buysellBook {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    overflow: auto;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius:5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .depthChart {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    overflow: auto;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius:5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .orderHistory {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    overflow: auto;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius:5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
  & .myorder {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    overflow: auto;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-radius:5px;
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  }
`;

const RGL = styled(ResponsiveReactGridLayout)`
  & .react-resizable-handle::after {
    border-right: ${props =>
      props.theme.mode === "dark"
        ? "2px solid rgb(255, 255, 255) !important"
        : ""};
    border-bottom: ${props =>
      props.theme.mode === "dark"
        ? "2px solid rgb(255, 255, 255) !important"
        : ""};
  }
`;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
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
    }
  },
  {
    title: "Price",
    dataIndex: "price",
    defaultSortOrder: "descend",
    className: "tblInsPrice",
    sorter: (a, b) => a.price - b.price
  },
  {
    title: "Volume",
    dataIndex: "volume",
    defaultSortOrder: "ascend",
    className: "tblInsVolumn",
    render: text => text,
    sorter: (a, b) => a.volume - b.volume,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Change",
    dataIndex: "change",
    defaultSortOrder: "ascend",
    className: "tblInsChange",
    render: text => {
      if (text < 0)
        return <span style={{ color: "red" }}>{Math.abs(text) + "%"}</span>;
      else
        return <span style={{ color: "green" }}>{Math.abs(text) + "%"}</span>;
    },
    sorter: (a, b) => a.change - b.change
  }
];

const TabPane = Tabs.TabPane;
let io = null;
class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePeriod: "1",
      status: "1",
      crypto: "XRP",
      currency: "BTC",
      prevRoom: {},
      orderTradeData: {},
      InsCurrency: "BTC",
      InsData: [],
      searchedInstu: null,
      userBal: {},
      insLoader: false,
      userBalLoader: false,
      instrumentTableHeight: 260,
      orderHistoryTableHeight: 330,
      myOrderTableHeight: 150,
      buySellOrderHeight: 91,
      depthChartHeight: 538,
      buySellLoader: false,
      hisLoader: false,
      depthLoader: false,
      editState: false,
      saveState: true,
      isFullscreen: false,
      prevlayout: JSON.parse(JSON.stringify(originalLayouts)),
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      MLS: "",
      loader: false
    };
    io = this.props.io;
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
    // this.handleLayoutResize = this.handleLayoutResize.bind(this);
  }

  /* Life-Cycle Methods */

  componentWillReceiveProps(props, newProps) {
    var self = this;
    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState(
          {
            crypto: props.cryptoPair.crypto,
            prevRoom: props.cryptoPair.prevRoom
          },
          () => {
            // self.orderSocket(self.state.timePeriod, self.state.status);
            // self.getUserBal();
            this.joinRoom(
              props.cryptoPair.prevRoom.crypto + "-" + props.cryptoPair.currency
            );
          }
        );
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState(
          {
            currency: props.cryptoPair.currency,
            prevRoom: props.cryptoPair.prevRoom
          },
          () => {
            // self.orderSocket(self.state.timePeriod, self.state.status);
            // self.getUserBal();
            this.joinRoom(
              props.cryptoPair.prevRoom.crypto + "-" + props.cryptoPair.currency
            );
          }
        );
      }
    }
  }

  componentDidMount() {
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
      this.setState({
        insLoader: true,
        userBalLoader: true,
        orderTradeLoader: true
      });
      // this.setState({ userBalLoader: true });
      this.props.io.on("users-all-trade-data", data => {
        console.log("^^^^data", data);
        this.updateMyOrder(data);
      });
      this.orderSocket(this.state.timePeriod, this.state.status);
      this.props.io.on("instrument-data", data => {
        console.log(data);
        this.updateInstrumentsData(data);
      });
      this.props.io.on("user-wallet-balance", data => {
        // console.log("^^^^userdata", data);
        this.setState({ userBal: data, userBalLoader: false });
      });
    }
  }
  joinRoom = (prevRoom = null) => {
    console.log(this.state, prevRoom);
    io.emit("join", {
      room: this.state.crypto + "-" + this.state.currency,
      previous_room: prevRoom
    });
  };
  // created by Meghal Patel at 2019-04-27 15:09.
  //
  // Description: Crypto Pair changes from here.It will go in redux.
  //
  //

  onInsChange(e) {
    var self = this;
    // console.log(e.target.value);
    let cryptoPair = {
      crypto: self.state.crypto,
      currency: e.target.value,
      prevRoom: {
        crypto: self.state.crypto,
        currency: self.state.InsCurrency
      }
    };
    this.setState(
      {
        InsCurrency: e.target.value,
        InsData: []
      },
      () => {
        self.props.cryptoCurrency(cryptoPair);
        // self.getInstrumentData();
        // this.props
        this.joinRoom(
          cryptoPair.prevRoom.crypto + "-" + cryptoPair.prevRoom.currency
        );
      }
    );
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
    let res = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      res.push({
        name: element.name.split("-")[0],
        price: parseFloat(element.last_price).toFixed(5),
        volume: parseFloat(element.volume).toFixed(3),
        change: parseFloat(element.percentChange).toFixed(5)
      });
    }
    this.setState({
      InsData: res,
      insLoader: false
    });
  }

  // created by Meghal Patel at 2019-04-27 15:13.
  //
  // Description: method is called when we change tabs of Market Limit and Stop-limit.
  //
  //

  callback(key) {
    this.setState({
      MLS: key
    });
  }

  // created by Meghal Patel at 2019-04-27 15:13.
  //
  // Description: Method is called when we change months in Orders and trades
  //
  //

  handleChangeOT(value) {
    this.setState({ timePeriod: value.key });
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
    this.setState({ status });
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
    console.log({
      month,
      flag: filter_type,
      pair: `${this.state.crypto}-${this.state.currency}`
    });
    if (this.props.io) {
      console.log(
        "^^^jf",
        month,
        filter_type,
        `${this.state.crypto}-${this.state.currency}`
      );
      this.props.io.emit("trade_users_history_event", {
        month: month,
        flag: filter_type,
        pair: `${this.state.crypto}-${this.state.currency}`
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
    this.setState({ orderTradeData: response, orderTradeLoader: false });
  }

  // created by Meghal Patel at 2019-04-27 15:23.
  //
  // Description:Method is called when user wants to cancel the order which are pending in orders and trades.
  //
  //

  cancelOrder(id, side, type) {
    console.log(id, side, type);
    fetch(SOCKET_HOST + `/api/v1/tradding/cancel-pending-order`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({
        id: id,
        side: side,
        order_type: type
      })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          this.orderSocket(this.state.timePeriod, this.state.status);
          this.openNotificationWithIcon(
            "success",
            "Successfull",
            "Your order has been successfully cancelled"
          );
        } else
          this.openNotificationWithIcon("error", "Error", responseData.err);
      })
      .catch(error => {});
  }

  // created by Meghal Patel at 2019-04-27 15:24.
  //
  // Description:this method is common notification for every message.
  //
  //

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }

  // created by Meghal Patel at 2019-04-27 15:25.
  //
  // Description:Method is called when we click on any row in instruments component to change pair.
  //
  //

  currencyPair(crypto) {
    let cryptoPair = {
      crypto: crypto,
      currency: this.state.InsCurrency,
      prevRoom: {
        crypto: this.state.crypto,
        currency: this.state.InsCurrency
      }
    };
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
      var searchedInstu = this.state.InsData.filter(function(temp) {
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
      depthChartHeight
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
          [key]: value
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
        layouts: this.state.prevlayout
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
        prevlayout: this.state.layouts
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
              minW: 6,
              minH: 3
            },
            {
              w: 4,
              h: 4,
              x: 8,
              y: 0,
              i: "instruments",
              minW: 4,
              minH: 2
            },
            {
              w: 4,
              h: 4,
              x: 4,
              y: 4,
              i: "tradeAction",
              minW: 3,
              minH: 2,
              maxH: 5
            },
            {
              w: 4,
              h: 4,
              x: 8,
              y: 4,
              i: "buysellBook",
              minW: 4,
              minH: 3
            },
            {
              w: 4,
              h: 4,
              x: 0,
              y: 4,
              i: "depthChart",
              minW: 4,
              minH: 4,
              maxH: 4
            },
            {
              w: 12,
              h: 3,
              x: 0,
              y: 8,
              i: "orderHistory",
              minW: 4,
              minH: 2
            },
            {
              w: 12,
              h: 4,
              x: 0,
              y: 11,
              i: "myorder",
              minW: 6,
              minH: 2
            }
          ],
          md: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 10,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 5,
              h: 2,
              minW: 5
            },
            {
              i: "tradeAction",
              x: 5,
              y: 1,
              w: 5,
              h: 2,
              minW: 3
            },
            {
              i: "buysellBook",
              x: 0,
              y: 2,
              w: 5,
              h: 3,
              minH: 3,
              minW: 5
            },
            {
              i: "depthChart",
              x: 5,
              y: 2,
              w: 5,
              h: 2,
              minW: 5
            },
            {
              i: "orderHistory",
              x: 0,
              y: 3,
              w: 12,
              h: 2,
              minH: 2,
              minW: 5
            },
            {
              i: "myorder",
              x: 0,
              y: 4,
              w: 10,
              h: 4,
              minW: 5,
              minH: 4
            }
          ],
          sm: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 6,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 6,
              h: 2,
              minW: 6
            },
            {
              i: "tradeAction",
              x: 0,
              y: 2,
              w: 6,
              h: 2,
              minW: 6
            },
            {
              i: "buysellBook",
              x: 0,
              y: 3,
              w: 6,
              h: 3,
              minH: 3,
              minW: 6
            },
            {
              i: "depthChart",
              x: 0,
              y: 4,
              w: 6,
              h: 2,
              minW: 6
            },
            {
              i: "orderHistory",
              x: 0,
              y: 5,
              w: 6,
              h: 2,
              minH: 2,
              minW: 6
            },
            {
              i: "myorder",
              x: 0,
              y: 6,
              w: 6,
              h: 2,
              minW: 6
            }
          ],
          xs: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 4,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 4,
              h: 2,
              minW: 4
            },
            {
              i: "tradeAction",
              x: 0,
              y: 2,
              w: 4,
              h: 2,
              minW: 4
            },
            {
              i: "buysellBook",
              x: 0,
              y: 3,
              w: 4,
              h: 3,
              minH: 3,
              minW: 4
            },
            {
              i: "depthChart",
              x: 0,
              y: 4,
              w: 4,
              h: 2,
              minW: 4
            },
            {
              i: "orderHistory",
              x: 0,
              y: 5,
              w: 4,
              h: 2,
              minH: 2,
              minW: 4
            },
            {
              i: "myorder",
              x: 0,
              y: 5,
              w: 5,
              h: 2,
              minW: 4
            }
          ],
          xxs: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 2,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 2,
              h: 2,
              minW: 2
            },
            {
              i: "tradeAction",
              x: 0,
              y: 2,
              w: 2,
              h: 2,
              minW: 2
            },
            {
              i: "buysellBook",
              x: 0,
              y: 3,
              w: 2,
              h: 3,
              minH: 3,
              minW: 2
            },
            {
              i: "depthChart",
              x: 0,
              y: 4,
              w: 2,
              h: 2,
              minW: 2
            },
            {
              i: "orderHistory",
              x: 0,
              y: 5,
              w: 2,
              h: 2,
              minH: 2,
              minW: 2
            },
            {
              i: "myorder",
              x: 0,
              y: 6,
              w: 2,
              h: 2,
              minW: 2
            }
          ]
        }
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
      isFullscreen: true
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
      isFullscreen: false
    });
  }

  // created by Meghal Patel at 2019-04-27 15:35.
  //
  // Description: Render method starts.
  //
  //

  render() {
    var self = this;
    const menu = (
      <Menu className="SettingMenu">
        <Menu.Item
          onClick={this.editLayout.bind(this)}
          disabled={this.state.editState}
          key="1"
        >
          Edit Layout
        </Menu.Item>
        {self.state.isFullscreen && (
          <Menu.Item key="2" onClick={this.exitFullScreen}>
            <Icon type="fullscreen-exit" />
            Exit Full Screen
          </Menu.Item>
        )}
        {!self.state.isFullscreen && (
          <Menu.Item key="2" onClick={this.goFullScreen}>
            <Icon type="fullscreen" /> Full Screen
          </Menu.Item>
        )}
        <Menu.Item
          onClick={this.clearLayout.bind(this)}
          disabled={this.state.saveState}
          key="3"
        >
          Clear Layout
        </Menu.Item>
        <Menu.Item
          onClick={this.saveLayout.bind(this)}
          disabled={this.state.saveState}
          key="2"
        >
          Save
        </Menu.Item>
        <Menu.Item onClick={this.resetLayout.bind(this)} key="4">
          Reset Layout
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
                            {this.state.crypto}-{this.state.currency}
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            window.open(
                              tvChartURL,
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
                      <Instru>INSTRUMENTS</Instru>
                      {this.state.InsData.length > 0 ? (
                        <SearchInput
                          onChange={e => this.searchInstu(e)}
                          style={{ width: 200 }}
                        />
                      ) : (
                        ""
                      )}
                      <FIATWrap>
                        <FIAT>
                          <RadioSelect
                            value={this.state.InsCurrency}
                            size="large"
                            buttonStyle="solid"
                            onChange={this.onInsChange}
                          >
                            <RadioButton value="BTC">BTC</RadioButton>
                            <RadioButton value="XRP">XRP</RadioButton>
                          </RadioSelect>
                        </FIAT>
                      </FIATWrap>
                      <InstruTable>
                        <TableIns
                          InsCurrency
                          onRow={(record, rowIndex) => {
                            return {
                              onClick: event => {
                                self.currencyPair(record.name);
                              } // click row
                            };
                          }}
                          pagination={false}
                          columns={columns}
                          dataSource={
                            this.state.searchedInstu === null
                              ? this.state.InsData
                              : this.state.searchedInstu.length === 0
                              ? []
                              : this.state.searchedInstu
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
                        defaultActiveKey="1"
                        onChange={this.callback}
                        className="tardeActionCard"
                      >
                        <TabPane tab="Market" key="1">
                          <Market
                            MLS={this.state.MLS}
                            userBal={this.state.userBal}
                          />
                        </TabPane>
                        <TabPane tab="Limit" key="2">
                          <Limit
                            MLS={this.state.MLS}
                            userBal={this.state.userBal}
                          />
                        </TabPane>
                        <TabPane tab="Stop-Limit" key="3">
                          <StopLimit
                            MLS={this.state.MLS}
                            userBal={this.state.userBal}
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
                      buySellLoader={loader => {
                        this.buySellLoaderFunc(loader);
                      }}
                      io={io}
                      height={this.state.buySellOrderHeight}
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
                      <DepthChart
                        crypto={this.state.crypto}
                        currency={this.state.currency}
                        depthLoaderFunc={loader => this.depthLoaderFunc(loader)}
                        io={this.props.io}
                        height={this.state.depthChartHeight}
                      />
                    </RightDiv>
                  </div>
                </div>
                <div key="orderHistory">
                  <div
                    className="orderHistory"
                    // style={{ height: "100%", width: "100%", overflow: "auto" }}
                  >
                    {/* {this.state.hisLoader === true ? (
                      <Loader color="#1990ff" width="50" height="50" />
                    ) : (
                      ""
                    )} */}
                    <OrderHIstory
                      io={io}
                      hisFunc={loader => this.hisFunc(loader)}
                      height={self.state.orderHistoryTableHeight}
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
                        <InstruOrder>MY ORDERS AND TRADES</InstruOrder>
                        <OrderTradeWrap>
                          <SelectMonth
                            labelInValue
                            defaultValue={{ key: "1" }}
                            style={{ width: 120, marginRight: "30px" }}
                            onChange={this.handleChangeOT}
                          >
                            <Option value="1">1 Month</Option>
                            <Option value="3">3 Months</Option>
                            <Option value="6">6 Months</Option>
                            <Option value="12">12 Months</Option>
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
                                <RadioButton value="a">COMPLETED</RadioButton>
                                <RadioButton value="b">PENDING</RadioButton>
                                <RadioButton value="c">CANCELED</RadioButton>
                              </RadioSelect>
                            </FIAT>
                          </FIATWrap2>
                        </OrderTradeWrap>
                      </OrderWrap>
                      <OrderTrade
                        profileDetails={this.props.profileDetails}
                        pending={this.state.status}
                        cancelOrder={(id, side, type) => {
                          this.cancelOrder(id, side, type);
                        }}
                        orderTradeData={this.state.orderTradeData}
                        height={self.state.myOrderTableHeight}
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
    loader: state.simpleReducer.loader ? state.simpleReducer.loader : false
  };
}
const mapDispatchToProps = dispatch => ({
  cryptoCurrency: Pair => dispatch(cryptoCurrency(Pair))
});

export default connect(mapStateToProps, mapDispatchToProps)(Trade);

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
              minW: 6,
              minH: 3
            },
            {
              w: 4,
              h: 4,
              x: 8,
              y: 0,
              i: "instruments",
              minW: 4,
              minH: 2
            },
            {
              w: 4,
              h: 4,
              x: 4,
              y: 4,
              i: "tradeAction",
              minW: 3,
              minH: 2,
              maxH: 5
            },
            {
              w: 4,
              h: 4,
              x: 8,
              y: 4,
              i: "buysellBook",
              minW: 4,
              minH: 3
            },
            {
              w: 4,
              h: 4,
              x: 0,
              y: 4,
              i: "depthChart",
              minW: 4,
              minH: 4,
              maxH: 4
            },
            {
              w: 12,
              h: 3,
              x: 0,
              y: 8,
              i: "orderHistory",
              minW: 4,
              minH: 2
            },
            {
              w: 12,
              h: 4,
              x: 0,
              y: 11,
              i: "myorder",
              minW: 6,
              minH: 2
            }
          ],
          md: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 10,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 5,
              h: 2,
              minW: 5
            },
            {
              i: "tradeAction",
              x: 5,
              y: 1,
              w: 5,
              h: 2,
              minW: 3
            },
            {
              i: "buysellBook",
              x: 0,
              y: 2,
              w: 5,
              h: 3,
              minH: 3,
              minW: 5
            },
            {
              i: "depthChart",
              x: 5,
              y: 2,
              w: 5,
              h: 2,
              minW: 5
            },
            {
              i: "orderHistory",
              x: 0,
              y: 3,
              w: 12,
              h: 2,
              minH: 2,
              minW: 5
            },
            {
              i: "myorder",
              x: 0,
              y: 4,
              w: 10,
              h: 4,
              minW: 5,
              minH: 4
            }
          ],
          sm: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 6,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 6,
              h: 2,
              minW: 6
            },
            {
              i: "tradeAction",
              x: 0,
              y: 2,
              w: 6,
              h: 2,
              minW: 6
            },
            {
              i: "buysellBook",
              x: 0,
              y: 3,
              w: 6,
              h: 3,
              minH: 3,
              minW: 6
            },
            {
              i: "depthChart",
              x: 0,
              y: 4,
              w: 6,
              h: 2,
              minW: 6
            },
            {
              i: "orderHistory",
              x: 0,
              y: 5,
              w: 6,
              h: 2,
              minH: 2,
              minW: 6
            },
            {
              i: "myorder",
              x: 0,
              y: 6,
              w: 6,
              h: 2,
              minW: 6
            }
          ],
          xs: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 4,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 4,
              h: 2,
              minW: 4
            },
            {
              i: "tradeAction",
              x: 0,
              y: 2,
              w: 4,
              h: 2,
              minW: 4
            },
            {
              i: "buysellBook",
              x: 0,
              y: 3,
              w: 4,
              h: 3,
              minH: 3,
              minW: 4
            },
            {
              i: "depthChart",
              x: 0,
              y: 4,
              w: 4,
              h: 2,
              minW: 4
            },
            {
              i: "orderHistory",
              x: 0,
              y: 5,
              w: 4,
              h: 2,
              minH: 2,
              minW: 4
            },
            {
              i: "myorder",
              x: 0,
              y: 5,
              w: 5,
              h: 2,
              minW: 4
            }
          ],
          xxs: [
            {
              i: "tradeView",
              x: 0,
              y: 0,
              w: 2,
              h: 3,
              minH: 3
            },
            {
              i: "instruments",
              x: 0,
              y: 1,
              w: 2,
              h: 2,
              minW: 2
            },
            {
              i: "tradeAction",
              x: 0,
              y: 2,
              w: 2,
              h: 2,
              minW: 2
            },
            {
              i: "buysellBook",
              x: 0,
              y: 3,
              w: 2,
              h: 3,
              minH: 3,
              minW: 2
            },
            {
              i: "depthChart",
              x: 0,
              y: 4,
              w: 2,
              h: 2,
              minW: 2
            },
            {
              i: "orderHistory",
              x: 0,
              y: 5,
              w: 2,
              h: 2,
              minH: 2,
              minW: 2
            },
            {
              i: "myorder",
              x: 0,
              y: 6,
              w: 2,
              h: 2,
              minW: 2
            }
          ]
        }
      };
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
