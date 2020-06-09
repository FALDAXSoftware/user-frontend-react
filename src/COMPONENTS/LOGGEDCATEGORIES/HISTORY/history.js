/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import "antd/dist/antd.css";
import moment from "moment";
import { Checkbox, Select, notification, Tabs } from "antd";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import { translate } from "react-i18next";

/* components */
import LoggedNavigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { globalVariables } from "Globals.js";

/* STYLED-COMPONENTS */
import {
  ContactWrap,
  GreyWrap,
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import {
  ContainerContact,
  HisTitle,
  HisWrap,
  Tablediv,
  HisTable,
  HeadHis,
  Filter,
  EXPButton,
  FontAwesomeIconS,
  Datediv,
  RangePickerS,
} from "STYLED-COMPONENTS/LOGGED_STYLE/historyStyle";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { LogoutUser } from "../../../ACTIONS/authActions";

let { API_URL } = globalVariables;
const { TabPane } = Tabs;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const Select1 = styled(Select)`
  &.display-value {
    width: 120px;
  }
  & .ant-select-selection {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#01090f" : ""};
  }
  & .ant-select-arrow > i {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-selection-selected-value {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-search__field {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-search__field {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const Select2 = styled(Select)`
  &.display-value {
    width: 120px;
  }
  & .ant-select-selection {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#01090f" : ""};
  }
  & .ant-select-arrow > i {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-selection-selected-value {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-search__field {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const CheckboxGroupS = styled(CheckboxGroup)`
  & .ant-checkbox-group-item > span {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const NDF = styled.tbody`
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  font-family: "Open Sans";
  height: 500px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ddd;
  > tr {
    > td {
      border-top: 0 !important;
      background: ${(props) =>
        props.theme.mode === "dark" ? "#041422" : "white"};
    }
  }
  @media (max-width: 767px) {
    height: 300px;
  }
  @media (max-width: 575px) {
    height: 250px;
  }
  @media (max-width: 375px) {
    height: 150px;
  }
`;
const SideBuySell = styled.td`
  color: ${(props) => (props.side === true ? "#59b55d" : "#f13e46")} !important;
`;

export const FilterDiv = styled.div`
  display: inline-flex;
  width: 390px;
  align-items: center;
`;

export const FilterDivSelection = styled.div`
  padding-left: 15px;
  margin-top: 20px;
`;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinList: [],
      drop1List: [],
      drop2List: [],
      // toDate: moment().format("YYYY-MM-DD"),
      // fromDate: moment(moment().subtract(1, "months"), "YYYY-MM-DD").format(
      //   "YYYY-MM-DD"
      // ),
      toDate: "",
      fromDate: "",
      historyData: [],
      historySimplexData: [],
      historyTradeData: [],
      historyJSTData: "",
      sell: true,
      buy: true,
      send: true,
      receive: true,
      drop1Value: "",
      drop2Value: "",
      loader: false,
      csvFields: [],
      checkedGroupValue: ["SEND", "RECEIVE", "SELL", "BUY"],
      activeKey: "1",
      // csvHeadersTrade: [
      //   { label: "Date", key: "date" },
      //   { label: "Side", key: "side" },
      //   { label: "Filled Price", key: "filled_price" },
      //   { label: "Amount", key: "amount" },
      //   { label: "Fee", key: "fee" },
      //   { label: "Volume", key: "volume" }
      // ],
      csvHeadersSimplex: [
        { label: "Coin", key: "symbol" },
        { label: "Date", key: "date" },
        { label: "Filled Price", key: "filled_price" },
        { label: "Amount", key: "quantity" },
        { label: "Wallet Address", key: "address" },
        { label: "Payment Id", key: "payment_id" },
        { label: "Quote Id", key: "quote_id" },
        { label: "Payment Status", key: "simplex_payment_status" },
      ],
      csvHeadersJST: [
        { label: "Coin", key: "symbol" },
        { label: "Side", key: "side" },
        { label: "Date", key: "date" },
        { label: "Date", key: "date" },
        { label: "Order Id", key: "order_id" },
        { label: "Filled Price", key: "filled_price" },
        { label: "Amount", key: "amount" },
        { label: "Fees", key: "fees" },
      ],
      csvHeadersTrade: [
        { label: "Coin", key: "symbol" },
        { label: "Date", key: "date" },
        { label: "Filled Price", key: "filled_price" },
        { label: "Amount", key: "amount" },
        { label: "Side", key: "side" },
        { label: "Order Type", key: "order_type" },
        { label: "Limit Price", key: "limit_price" },
        { label: "Stop Price", key: "stop_price" },
      ],
    };
    this.historyResult = this.historyResult.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.loadCoinList = this.loadCoinList.bind(this);
    this.selectChange1 = this.selectChange1.bind(this);
    this.selectChange2 = this.selectChange2.bind(this);
    this.callback = this.callback.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.t = this.props.t;
  }

  /* Life-Cycle Methods */
  componentDidMount() {
    if (
      this.props.profileData &&
      this.props.profileData.is_terms_agreed == false
    ) {
      this.props.history.push("/editProfile");
    }
    console.log("test^^^", this.props.location);
    if (
      this.props.location === undefined ||
      this.props.location.flag === "" ||
      this.props.location.flag === null
    ) {
      this.props.history.push("/");
    }
    if (this.props.location.tradeType === "1") {
      this.setState({ activeKey: "1" }, () => {
        this.historyResult();
        this.loadCoinList();
      });
    } else if (this.props.location.tradeType === "2") {
      this.setState({ activeKey: "2" }, () => {
        this.historyResult();
        this.loadCoinList();
      });
    } else if (this.props.location.tradeType === "3") {
      this.setState({ activeKey: "3" }, () => {
        this.historyResult();
        this.loadCoinList();
      });
    } else {
      this.loadCoinList();
      this.historyResult();
    }
  }

  loadCoinList() {
    var self = this;
    if (this.state.activeKey === "1") {
      // if (this.state.activeKey === "1" || this.state.activeKey === "3") {
      fetch(API_URL + "/conversion/get-jst-pair", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          self.setState({
            coinList: responseData.coinList,
            drop1List: responseData.coinList,
            drop2List: responseData.coinList,
          });
        })
        .catch((error) => {});
    } else if (this.state.activeKey === "2") {
      fetch(API_URL + "/get-simplex-coin-list", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === 200) {
            self.setState({
              coinList: responseData.object.coinList,
              drop1List: responseData.object.coinList,
              drop2List: responseData.object.fiat,
            });
          } else if (responseData.status === 403) {
            let tempValue2 = {};
            tempValue2["user_id"] = this.props.profileData.id;
            tempValue2["jwt_token"] = this.props.isLoggedIn;
            this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
          }
        })
        .catch((error) => {});
    }
  }

  callback(e) {
    this.setState(
      {
        activeKey: e,
        drop1Value: null,
        drop2Value: null,
        toDate: "",
        fromDate: "",
      },
      () => {
        this.loadCoinList();
        this.historyResult();
      }
    );
  }

  historyResult() {
    let { drop1Value, drop2Value, toDate, fromDate, activeKey } = this.state;
    let key;
    if (activeKey === "1") {
      key = "3";
    }
    if (activeKey === "3") {
      key = "1";
    }
    if (activeKey === "2") {
      key = "2";
    }
    let url =
      API_URL +
      `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&sell=${this.state.sell}&toDate=${this.state.toDate}&fromDate=${this.state.fromDate}&trade_type=${key}`;
    if (toDate && fromDate) {
      let url =
        API_URL +
        `/get-user-history?send=${this.state.send}&receive=${
          this.state.receive
        }&buy=${this.state.buy}&sell=${
          this.state.sell
        }&toDate=${this.state.toDate.format(
          "YYYY-MM-DD"
        )}&fromDate=${this.state.fromDate.format(
          "YYYY-MM-DD"
        )}&trade_type=${key}`;
    }
    if (drop1Value && drop2Value && key === "1") {
      url =
        url + "&symbol=" + this.state.drop1Value + "/" + this.state.drop2Value;
    }
    if (drop1Value && drop2Value && key === "2") {
      url =
        url + "&symbol=" + this.state.drop1Value + "-" + this.state.drop2Value;
    }
    if (drop1Value && drop2Value && key === "3") {
      url =
        url + "&symbol=" + this.state.drop1Value + "-" + this.state.drop2Value;
    }
    this.setState({ loader: true });
    fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ loader: false });
        if (responseData.status === 200) {
          if (key === "1") {
            let csvJSTFields = [];
            if (responseData.data && responseData.data.length > 0) {
              for (var i = 0; i < responseData.data.length; i++) {
                let temp = responseData.data[i];
                let obj = {};
                var symbol = temp.symbol;
                var date = moment
                  .utc(temp.created_at)
                  .local()
                  .format(`${this.props.profileData.date_format} HH:mm:ss`);
                if (temp.side === "Sell") {
                  var fill_price = precision(temp.buy_currency_amount);
                } else {
                  var fill_price = precision(temp.sell_currency_amount);
                }
                var fees_total = precision(
                  parseFloat(temp.faldax_fees) + parseFloat(temp.network_fees)
                );
                var amount = precision(
                  parseFloat(temp.execution_report.CumQty) -
                    parseFloat(fees_total)
                );
                var status = temp.order_status.toUpperCase();
                var order_id = temp.order_id;
                obj["symbol"] = symbol;
                obj["side"] = temp.side;
                obj["date"] = date;
                obj["order_id"] = order_id;
                obj["order_status"] = status;
                obj["filled_price"] = fill_price;
                obj["amount"] = amount;
                obj["fees"] = fees_total;
                csvJSTFields.push(obj);
              }
              this.setState({
                historyJSTData: responseData.data,
                csvJSTFields,
              });
            } else if (responseData.data.length === 0) {
              this.setState({
                historyJSTData: responseData.data,
                csvJSTFields,
              });
            } else {
              this.openNotificationWithIcon(
                "error",
                this.t("validations:error_text.message"),
                responseData.err
              );
            }
          } else if (key === "2") {
            let csvSimplexFields = [];
            if (responseData.data && responseData.data.length > 0) {
              for (var i = 0; i < responseData.data.length; i++) {
                let temp = responseData.data[i];
                let obj = {};
                var symbol = temp.symbol;
                var date = moment
                  .utc(temp.created_at)
                  .local()
                  .format(`${this.props.profileData.date_format} HH:mm:ss`);
                var side = temp.side;
                var fill_price = precision(temp.fill_price);
                var quantity = precision(temp.quantity);
                var payment_id = temp.payment_id;
                var quote_id = temp.quote_id;
                var address = temp.address;

                if (temp.simplex_payment_status === 1) {
                  var simplex_payment_status = "Under Approval";
                }
                if (temp.simplex_payment_status === 2) {
                  var simplex_payment_status = "Approved";
                }
                if (temp.simplex_payment_status === 3) {
                  var simplex_payment_status = "Cancelled";
                }
                obj["symbol"] = symbol;
                obj["date"] = date;
                obj["filled_price"] = fill_price;
                obj["quantity"] = quantity;
                obj["payment_id"] = payment_id;
                obj["quote_id"] = quote_id;
                obj["address"] = address;
                obj["simplex_payment_status"] = simplex_payment_status;
                csvSimplexFields.push(obj);
              }
              this.setState({
                historySimplexData: responseData.data,
                csvSimplexFields,
              });
            } else if (responseData.data.length === 0) {
              this.setState({
                historySimplexData: responseData.data,
                csvSimplexFields,
              });
            } else {
              this.openNotificationWithIcon(
                "error",
                this.t("validations:error_text.message"),
                responseData.err
              );
            }
          } else if (key === "3") {
            let csvTradeFields = [];
            if (responseData.data && responseData.data.length > 0) {
              for (var i = 0; i < responseData.data.length; i++) {
                // console.log("^^^^ inside", responseData.data[i]);
                let temp = responseData.data[i];
                let obj = {};
                var date = moment
                  .utc(temp.created_at)
                  .local()
                  .format(`${this.props.profileData.date_format} HH:mm:ss`);
                var limit_price =
                  temp.order_type != "Market" ? temp.limit_price : 0.0;
                var stop_price =
                  temp.order_type == "SopLimit" ? temp.stop_price : 0.0;
                obj["symbol"] = temp.symbol;
                obj["date"] = date;
                obj["filled_price"] = temp.fill_price;
                obj["amount"] = temp.quantity;
                obj["side"] = temp.side;
                obj["order_type"] = temp.order_type;
                obj["limit_price"] = limit_price;
                obj["stop_price"] = stop_price;
                csvTradeFields.push(obj);
              }
              // console.log(responseData.data);
              this.setState({
                historyTradeData: responseData.data,
                csvTradeFields,
              });
            } else if (responseData.data.length === 0) {
              this.setState({
                historyTradeData: responseData.data,
                csvTradeFields,
              });
            } else {
              this.openNotificationWithIcon(
                "error",
                this.t("validations:error_text.message"),
                responseData.err
              );
            }
          }
        } else if (responseData.status === 403) {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.err
          );
          let tempValue2 = {};
          tempValue2["user_id"] = this.props.profileData.id;
          tempValue2["jwt_token"] = this.props.isLoggedIn;
          this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
        } else {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.err
          );
        }
        this.setState({ loader: false });
      })
      .catch((error) => {});
  }

  range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  isabledRangeTime(_, type) {
    if (type === "start") {
      return {
        disabledHours: () => this.range(0, 60).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => this.range(0, 60).splice(20, 4),
      disabledMinutes: () => this.range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }

  changeDate(date, dateString) {
    var self = this;
    var fromDate = "";
    fromDate = moment(dateString[0]);
    var toDate = "";
    toDate = moment(dateString[1]);
    this.setState({ toDate, fromDate }, () => {
      self.historyResult();
    });
  }

  onChangeCheck(checkedValues) {
    var self = this;
    var send, receive, sell, buy;
    if (checkedValues.includes("SEND")) {
      send = true;
    } else {
      send = false;
    }
    if (checkedValues.includes("RECEIVE")) {
      receive = true;
    } else {
      receive = false;
    }
    if (checkedValues.includes("BUY")) {
      buy = true;
    } else {
      buy = false;
    }
    if (checkedValues.includes("SELL")) {
      sell = true;
    } else {
      sell = false;
    }
    this.setState(
      { send, receive, sell, buy, checkedGroupValue: checkedValues },
      () => {
        self.historyResult();
      }
    );
  }

  selectChange1(value) {
    var self = this;
    let coinList = [...this.state.coinList];
    for (let index = 0; index < coinList.length; index++) {
      const element = coinList[index];
      if (element.coin === value) {
        coinList.splice(index, 1);
        break;
      }
    }
    if (this.state.drop2Value) {
      this.setState(
        {
          drop2List: coinList,
          drop1Value: value,
        },
        () => {
          self.loadCoinList();
          self.historyResult();
        }
      );
    } else {
      this.setState(
        {
          drop2List: coinList,
          drop1Value: value,
          drop2Value: null,
        },
        () => {
          self.loadCoinList();
        }
      );
    }
  }

  selectChange2(value) {
    var self = this;
    let coinList = [...this.state.coinList];
    for (let index = 0; index < coinList.length; index++) {
      const element = coinList[index];
      if (element.coin === value) {
        coinList.splice(index, 1);
        break;
      }
    }
    if (this.state.drop1Value) {
      this.setState(
        {
          drop1List: coinList,
          drop2Value: value,
        },
        () => {
          self.loadCoinList();
          self.historyResult();
        }
      );
    } else {
      this.setState(
        {
          drop1List: coinList,
          drop2Value: value,
          drop1Value: null,
        },
        () => {
          self.loadCoinList();
        }
      );
    }
  }

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5,
    });
  }

  resetFilters() {
    this.setState(
      {
        toDate: "",
        fromDate: "",
        sell: true,
        buy: true,
        send: true,
        receive: true,
        drop1Value: null,
        drop2Value: null,
        checkedGroupValue: ["SEND", "RECEIVE", "SELL", "BUY"],
      },
      () => {
        this.loadCoinList();
        this.historyResult();
      }
    );
  }

  render() {
    var self = this;
    const { t } = this.props;
    const options = [
      { label: t("buy_text.message"), value: "BUY" },
      { label: t("sell_text.message"), value: "SELL" },
    ];
    console.log(self.props.profileData.id);
    return (
      <div>
        <ContactWrap>
          <LoggedNavigation />
          <GreyWrap>
            <ContainerContact>
              <HeadHis>
                <Filter>
                  <FilterDiv>
                    <Select1
                      showSearch
                      className="display-value"
                      onChange={this.selectChange1}
                      value={this.state.drop1Value}
                    >
                      {this.state.drop1List &&
                        this.state.drop1List.map((element) => {
                          if (this.state.activeKey === "1") {
                            if (this.state.drop2Value === "ETH") {
                              if (
                                element.coin != this.state.drop2Value &&
                                element.coin != "BTC" &&
                                element.coin != "SUSU" &&
                                element.coin != "ERC20"
                              ) {
                                return (
                                  <Option value={element.coin}>
                                    {element.coin}
                                  </Option>
                                );
                              }
                            } else if (this.state.drop2Value === "BTC") {
                              if (
                                element.coin != this.state.drop2Value &&
                                element.coin != "ERC20"
                              ) {
                                return (
                                  <Option value={element.coin}>
                                    {element.coin}
                                  </Option>
                                );
                              }
                            } else {
                              if (element.coin != this.state.drop2Value) {
                                return (
                                  <Option value={element.coin}>
                                    {element.coin}
                                  </Option>
                                );
                              }
                            }
                            // if (this.state.drop2Value === "XRP") {
                            //   if (
                            //     element.coin != this.state.drop2Value &&
                            //     element.coin != "LTC" &&
                            //     element.coin != "ETH"
                            //   ) {
                            //     return (
                            //       <Option value={element.coin}>
                            //         {element.coin}
                            //       </Option>
                            //     );
                            //   }
                            // } else if (this.state.drop2Value === "LTC") {
                            //   if (
                            //     element.coin != this.state.drop2Value &&
                            //     element.coin != "XRP" &&
                            //     element.coin != "ETH"
                            //   ) {
                            //     return (
                            //       <Option value={element.coin}>
                            //         {element.coin}
                            //       </Option>
                            //     );
                            //   }
                            // } else if (this.state.drop2Value === "ETH") {
                            //   if (
                            //     element.coin != this.state.drop2Value &&
                            //     element.coin != "XRP" &&
                            //     element.coin != "LTC"
                            //   ) {
                            //     return (
                            //       <Option value={element.coin}>
                            //         {element.coin}
                            //       </Option>
                            //     );
                            //   }
                            // } else {
                            //   if (element.coin != this.state.drop2Value) {
                            //     return (
                            //       <Option value={element.coin}>
                            //         {element.coin}
                            //       </Option>
                            //     );
                            //   }
                            // }
                          } else {
                            if (element.coin != this.state.drop2Value) {
                              return (
                                <Option value={element.coin}>
                                  {element.coin}
                                </Option>
                              );
                            }
                          }
                        })}
                    </Select1>
                    {this.state.activeKey === "3" ? (
                      <FontAwesomeIconS
                        className="click_change"
                        onClick={() => {
                          if (this.state.drop1Value && this.state.drop2Value) {
                            let temp1 = this.state.drop1Value;
                            let temp2 = this.state.drop2Value;
                            this.setState(
                              {
                                drop1Value: temp2,
                                drop2Value: temp1,
                              },
                              () => {
                                this.loadCoinList();
                                this.historyResult();
                              }
                            );
                          }
                        }}
                        icon={faExchangeAlt}
                        color="#909090"
                      />
                    ) : (
                      <FontAwesomeIconS icon={faExchangeAlt} color="#909090" />
                    )}
                    <Select2
                      showSearch
                      className="display-value"
                      onChange={this.selectChange2}
                      value={this.state.drop2Value}
                    >
                      {this.state.drop2List &&
                        this.state.drop2List.map((element) => {
                          if (this.state.activeKey === "1") {
                            if (
                              element.coin != "BCH" &&
                              element.coin != "LTC" &&
                              element.coin != "SUSU" &&
                              element.coin != "ERC20" &&
                              element.coin != "XRP"
                            ) {
                              if (element.coin != this.state.drop1Value) {
                                return (
                                  <Option value={element.coin}>
                                    {element.coin}
                                  </Option>
                                );
                              }
                            }
                          } else {
                            if (element.coin != this.state.drop1Value) {
                              return (
                                <Option value={element.coin}>
                                  {element.coin}
                                </Option>
                              );
                            }
                          }
                        })}
                    </Select2>
                  </FilterDiv>
                  <Datediv>
                    <RangePickerS
                      disabledDate={this.disabledDate}
                      disabledTime={this.disabledRangeTime}
                      placeholder={[
                        this.t("start_date_text.message"),
                        this.t("end_date_text.message"),
                      ]}
                      onChange={this.changeDate}
                      allowClear={false}
                      value={[this.state.fromDate, this.state.toDate]}
                      format="YYYY-MM-DD"
                    />
                  </Datediv>
                  {this.state.activeKey === "1" && (
                    <div>
                      <EXPButton
                        onClick={this.resetFilters}
                        className="reset_btn"
                      >
                        {t("reset_btn.message")}
                      </EXPButton>
                      {this.state.csvTradeFields !== undefined ? (
                        this.state.csvTradeFields.length > 0 &&
                        this.state.csvTradeFields !== null ? (
                          <EXPButton>
                            <CSVLink
                              filename="tradereportfile.csv"
                              data={this.state.csvTradeFields}
                              headers={this.state.csvHeadersTrade}
                            >
                              {t("export_btn.message")}
                            </CSVLink>
                          </EXPButton>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  {this.state.activeKey === "2" && (
                    <div>
                      <EXPButton
                        onClick={this.resetFilters}
                        className="reset_btn"
                      >
                        {t("reset_btn.message")}
                      </EXPButton>
                      {this.state.csvSimplexFields !== undefined ? (
                        this.state.csvSimplexFields.length > 0 &&
                        this.state.csvSimplexFields !== null ? (
                          <EXPButton>
                            <CSVLink
                              filename="simplexreportfile.csv"
                              data={this.state.csvSimplexFields}
                              headers={this.state.csvHeadersSimplex}
                            >
                              {t("export_btn.message")}
                            </CSVLink>
                          </EXPButton>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  {this.state.activeKey === "3" && (
                    <div>
                      <EXPButton
                        onClick={this.resetFilters}
                        className="reset_btn"
                      >
                        {t("reset_btn.message")}
                      </EXPButton>
                      {this.state.csvJSTFields !== undefined ? (
                        this.state.csvJSTFields.length > 0 ? (
                          <EXPButton>
                            <CSVLink
                              filename="jstreportfile.csv"
                              data={this.state.csvJSTFields}
                              headers={this.state.csvHeadersJST}
                            >
                              {t("export_btn.message")}
                            </CSVLink>
                          </EXPButton>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Filter>
                {this.state.activeKey === "2" ? (
                  ""
                ) : (
                  <FilterDivSelection>
                    <CheckboxGroupS
                      options={options}
                      value={this.state.checkedGroupValue}
                      onChange={this.onChangeCheck}
                    />
                  </FilterDivSelection>
                )}
              </HeadHis>
              <HisWrap>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback}>
                  {/* <TabPane
                    tab={t(
                      "header:navbar_sub_menu_conversation_crypto_only.message"
                    )}
                    key="1"
                  >
                    <Tablediv>
                      <HisTable responsive striped condensed>
                        <thead>
                          <tr>
                            <th>{t("settings:table_head_coin.message")}</th>
                            <th>{t("side_text.message")}</th>
                            <th>{t("wallet:date_text.message")}</th>
                            <th>
                              {t("order_text.message")}&nbsp;
                              {t("id_text.message")}
                            </th>
                            <th>{t("security_tab:title_status.message")}</th>
                            <th>
                              {t("filled_text.message")}&nbsp;
                              {t("price_text.message")}
                            </th>
                            <th>{t("wallet:amount_text.message")}</th>
                            <th>{t("footer:subhead_fees.message")}</th>
                          </tr>
                        </thead>
                        {this.state.historyJSTData !== undefined ? (
                          this.state.historyJSTData.length > 0 ? (
                            <tbody>
                              {this.state.historyJSTData.map(function(temps) {
                                var date = moment
                                  .utc(temps.created_at)
                                  .local()
                                  .format(
                                    `${self.props.profileData.date_format} HH:mm:ss`
                                  );
                                var fees_total = precision(
                                  parseFloat(temps.faldax_fees) +
                                  parseFloat(temps.network_fees)
                                );
                                var coin =
                                  temps.side == "Buy"
                                    ? temps.currency
                                    : temps.settle_currency;

                                fees_total =
                                  temps.fill_price == 0 && temps.quantity == 0
                                    ? 0.0 + " " + coin
                                    : fees_total + " " + coin;
                                // var fill_price = temps.execution_report.SettlCurrAmt.toFixed(
                                //   8
                                // );
                                if (temps.side === "Sell") {
                                  var fill_price = precision(
                                    temps.buy_currency_amount
                                  );
                                } else {
                                  var fill_price = precision(
                                    temps.sell_currency_amount
                                  );
                                }
                                var amount = precision(temps.quantity);
                                var str = temps.order_status;
                                var status =
                                  str.charAt(0).toUpperCase() + str.slice(1);

                                return (
                                  <tr>
                                    <td>{temps.symbol}</td>
                                    <td>{temps.side}</td>
                                    <td>{date}</td>
                                    <td>{temps.order_id}</td>
                                    <td>
                                      <span
                                        className={
                                          status == "Filled"
                                            ? "order-sucess"
                                            : "order-cancelled"
                                        }
                                      >
                                        {status}
                                      </span>
                                    </td>
                                    <td>{fill_price}</td>
                                    <td>{amount}</td>
                                    <td>{fees_total}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          ) : (
                            <NDF>
                              <tr>
                                <td colSpan="5">
                                  {t("support:no_data_found.message")}
                                </td>
                              </tr>
                            </NDF>
                          )
                        ) : (
                          ""
                        )}
                      </HisTable>
                    </Tablediv>
                  </TabPane> */}
                  <TabPane tab={this.t("trade:trade_head.message")} key="1">
                    <Tablediv>
                      <HisTable responsive striped condensed>
                        <thead>
                          <tr>
                            <th>
                              {this.t("settings:table_head_coin.message")}
                            </th>
                            <th>{this.t("wallet:date_text.message")}</th>
                            <th>
                              {this.t("history:filled_text.message")}{" "}
                              {this.t("history:price_text.message")}
                            </th>
                            <th>{this.t("wallet:amount_text.message")}</th>
                            <th>{this.t("history:side_text.message")}</th>
                            <th>{this.t("trade:order_type_text.message")}</th>
                            <th>{this.t("trade:limit_price_text.message")}</th>
                            <th>{this.t("trade:stop_price_text.message")}</th>
                          </tr>
                        </thead>
                        {/* {console.log(this.state.historyTradeData)} */}
                        {this.state.historyTradeData !== undefined ? (
                          this.state.historyTradeData.length > 0 ? (
                            <tbody>
                              {this.state.historyTradeData.map(function (
                                temps
                              ) {
                                var date = moment
                                  .utc(temps.created_at)
                                  .local()
                                  .format(
                                    `${self.props.profileData.date_format} HH:mm:ss`
                                  );
                                var side =
                                  Number(temps.user_id) ===
                                  self.props.profileData.id
                                    ? temps.side
                                    : temps.side === "Buy"
                                    ? "Sell"
                                    : "Buy";

                                var limit_price =
                                  temps.order_type != "Market"
                                    ? precision(temps.limit_price)
                                    : 0.0;
                                var stop_price =
                                  temps.order_type == "StopLimit"
                                    ? precision(temps.stop_price)
                                    : 0.0;

                                console.log(self.props.profileData.id);
                                return (
                                  <tr>
                                    <td>{temps.symbol}</td>
                                    <td>{date}</td>
                                    <td>{temps.fill_price}</td>
                                    <td>{temps.quantity}</td>
                                    <td
                                      className={
                                        side == "Buy" ? "green" : "red"
                                      }
                                    >
                                      {side}
                                    </td>
                                    <td>{temps.order_type}</td>
                                    <td>{limit_price}</td>
                                    <td>{stop_price}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          ) : (
                            <NDF>
                              <tr>
                                <td colSpan="8">
                                  {t("support:no_data_found.message")}
                                </td>
                              </tr>
                            </NDF>
                          )
                        ) : (
                          ""
                        )}
                      </HisTable>
                    </Tablediv>
                  </TabPane>
                  <TabPane
                    tab={this.t(
                      "header:navbar_sub_menu_conversation_credit_card.message"
                    )}
                    key="2"
                  >
                    <Tablediv>
                      <HisTable responsive striped condensed>
                        <thead>
                          <tr>
                            <th>{t("settings:table_head_coin.message")}</th>
                            <th>{t("wallet:date_text.message")}</th>
                            <th>
                              {t("filled_text.message")}&nbsp;
                              {t("price_text.message")}
                            </th>
                            <th>{t("wallet:amount_text.message")}</th>
                            <th>
                              {t("header:navbar_menu_wallet.message")}&nbsp;
                              {t("wallet:address_text.message")}
                            </th>
                            <th>
                              {t("payment_text.message")}&nbsp;
                              {t("id_text.message")}
                            </th>
                            <th>
                              {t("quote_text.message")}&nbsp;
                              {t("id_text.message")}
                            </th>
                            <th>
                              {t("payment_text.message")}&nbsp;
                              {t("security_tab:title_status.message")}
                            </th>
                          </tr>
                        </thead>
                        {this.state.historySimplexData !== undefined ? (
                          this.state.historySimplexData.length > 0 ? (
                            <tbody>
                              {this.state.historySimplexData.map(function (
                                temps
                              ) {
                                var date = moment
                                  .utc(temps.created_at)
                                  .local()
                                  .format(
                                    `${self.props.profileData.date_format} HH:mm:ss`
                                  );
                                var side =
                                  Number(temps.user_id) ===
                                  self.props.profileData.id
                                    ? temps.side
                                    : temps.side === "Buy"
                                    ? t("sell_text.message")
                                    : t("buy_text.message");
                                if (temps.simplex_payment_status === 1) {
                                  var simplex_payment_status = "Under Approval";
                                }
                                if (temps.simplex_payment_status === 2) {
                                  var simplex_payment_status = "Approved";
                                }
                                if (temps.simplex_payment_status === 3) {
                                  var simplex_payment_status = "Cancelled";
                                }
                                return (
                                  <tr>
                                    <td>{temps.symbol}</td>
                                    <td>{date}</td>
                                    <td>{temps.fill_price}</td>
                                    <td>{temps.quantity}</td>
                                    <td>{temps.address}</td>
                                    <td>{temps.payment_id}</td>
                                    <td>{temps.quote_id}</td>
                                    <td>
                                      {simplex_payment_status ==
                                        "Under Approval" && (
                                        <span className="order-inapproval">
                                          {self.t(
                                            "under_approval_text.message"
                                          )}
                                        </span>
                                      )}
                                      {simplex_payment_status == "Approved" && (
                                        <span className="order-sucess">
                                          {self.t("approved_text.message")}
                                        </span>
                                      )}
                                      {simplex_payment_status ==
                                        "Cancelled" && (
                                        <span className="order-cancelled">
                                          {self.t("cancelled_text.message")}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          ) : (
                            <NDF>
                              <tr>
                                <td colSpan="8">
                                  {t("support:no_data_found.message")}
                                </td>
                              </tr>
                            </NDF>
                          )
                        ) : (
                          ""
                        )}
                      </HisTable>
                    </Tablediv>
                  </TabPane>
                </Tabs>
              </HisWrap>
            </ContainerContact>
          </GreyWrap>
          <CommonFooter />
          {this.state.loader === true ? <FaldaxLoader /> : ""}
        </ContactWrap>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  LogoutUser: (isLoggedIn, user_id) =>
    dispatch(LogoutUser(isLoggedIn, user_id)),
});
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    profileData:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : {},
  };
}

export default translate([
  "history",
  "settings",
  "wallet",
  "security_tab",
  "footer",
  "header",
  "support",
  "trade",
])(connect(mapStateToProps, mapDispatchToProps)(History));
function precision(x) {
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
  if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 8) {
    {
      x = parseFloat(x).toFixed(8);
      if (
        x.toString()[x.toString().length - 1] == "0" &&
        (x.toString().split(".")[1][0] != "0" ||
          x.toString().split(".")[1][5] != "0")
      ) {
        return parseFloat(x);
      } else if (x.toString().split(".")[1][7] == "0") {
        if (x.toString().split(".")[1][6] == "0") {
          if (x.toString().split(".")[1][5] == "0") {
            if (x.toString().split(".")[1][4] == "0") {
              if (x.toString().split(".")[1][3] == "0") {
                if (x.toString().split(".")[1][2] == "0") {
                  if (x.toString().split(".")[1][1] == "0") {
                    if (x.toString().split(".")[1][0] == "0") {
                      return parseFloat(x).toFixed(0);
                    } else return parseFloat(x).toFixed(1);
                  } else return parseFloat(x).toFixed(2);
                } else return parseFloat(x).toFixed(3);
              } else return parseFloat(x).toFixed(4);
            } else return parseFloat(x).toFixed(5);
          } else return parseFloat(x).toFixed(6);
        } else return parseFloat(x).toFixed(7);
      } else return parseFloat(x).toFixed(8);
    }
  }
  return x;
}
