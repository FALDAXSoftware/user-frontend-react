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
  GreyWrap
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
  RangePickerS
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
    background-color: ${props =>
      props.theme.mode === "dark" ? "#01090f" : ""};
  }
  & .ant-select-arrow > i {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-selection-selected-value {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-search__field {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-search__field {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const Select2 = styled(Select)`
  &.display-value {
    width: 120px;
  }
  & .ant-select-selection {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#01090f" : ""};
  }
  & .ant-select-arrow > i {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-selection-selected-value {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-select-search__field {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const CheckboxGroupS = styled(CheckboxGroup)`
  & .ant-checkbox-group-item > span {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const NDF = styled.tbody`
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
  font-family: "Open Sans";
  height: 500px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ddd;
  > tr {
    > td {
      border-top: 0 !important;
      background: ${props =>
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
  color: ${props => (props.side === true ? "#59b55d" : "#f13e46")} !important;
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
      csvHeadersTrade: [
        { label: "Date", key: "date" },
        { label: "Side", key: "side" },
        { label: "Filled Price", key: "filled_price" },
        { label: "Amount", key: "amount" },
        { label: "Fee", key: "fee" },
        { label: "Volume", key: "volume" }
      ],
      csvHeadersSimplex: [
        { label: "Coin", key: "symbol" },
        { label: "Date", key: "date" },
        { label: "Filled Price", key: "filled_price" },
        { label: "Amount", key: "quantity" },
        { label: "Wallet Address", key: "address" },
        { label: "Payment Id", key: "payment_id" },
        { label: "Quote Id", key: "quote_id" },
        { label: "Payment Status", key: "simplex_payment_status" }
      ],
      csvHeadersJST: [
        { label: "Coin", key: "symbol" },
        { label: "Side", key: "side" },
        { label: "Date", key: "date" },
        { label: "Date", key: "date" },
        { label: "Order Id", key: "order_id" },
        { label: "Filled Price", key: "filled_price" },
        { label: "Amount", key: "amount" },
        { label: "Fees", key: "fees" }
      ],
      csvHeadersTrade: [
        { label: "Coin", key: "symbol" },
        { label: "Side", key: "side" },
        { label: "Date", key: "date" },
        { label: "Date", key: "date" },
        { label: "Order Id", key: "order_id" },
        { label: "Filled Price", key: "filled_price" },
        { label: "Amount", key: "amount" },
        { label: "Fees", key: "fees" }
      ]
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
      fetch(API_URL + "/conversion/get-jst-pair", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        }
      })
        .then(response => response.json())
        .then(responseData => {
          self.setState({
            coinList: responseData.coinList,
            drop1List: responseData.coinList,
            drop2List: responseData.coinList
          });
        })
        .catch(error => {});
    } else if (this.state.activeKey === "2") {
      fetch(API_URL + "/get-simplex-coin-list", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        }
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            self.setState({
              coinList: responseData.object.coinList,
              drop1List: responseData.object.coinList,
              drop2List: responseData.object.fiat
            });
          } else if (responseData.status === 403) {
            let tempValue2 = {};
            tempValue2["user_id"] = this.props.profileData.id;
            tempValue2["jwt_token"] = this.props.isLoggedIn;
            this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
          }
        })
        .catch(error => {});
    }
  }

  callback(e) {
    this.setState(
      {
        activeKey: e,
        drop1Value: null,
        drop2Value: null,
        toDate: "",
        fromDate: ""
      },
      () => {
        this.loadCoinList();
        this.historyResult();
      }
    );
  }

  historyResult() {
    let { drop1Value, drop2Value, toDate, fromDate, activeKey } = this.state;
    let url =
      API_URL +
      `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&sell=${this.state.sell}&toDate=${this.state.toDate}&fromDate=${this.state.fromDate}&trade_type=${this.state.activeKey}`;
    if (toDate && fromDate) {
      let url =
        API_URL +
        `/get-user-history?send=${this.state.send}&receive=${
          this.state.receive
        }&buy=${this.state.buy}&sell=${
          this.state.sell
        }&toDate=${this.state.toDate.format(
          "YYYY-MM-DD"
        )}&fromDate=${this.state.fromDate.format("YYYY-MM-DD")}&trade_type=${
          this.state.activeKey
        }`;
    }
    if (drop1Value && drop2Value && activeKey === "1") {
      url =
        url + "&symbol=" + this.state.drop1Value + "/" + this.state.drop2Value;
    }
    if (drop1Value && drop2Value && activeKey === "2") {
      url =
        url + "&symbol=" + this.state.drop1Value + "-" + this.state.drop2Value;
    }
    this.setState({ loader: true });
    fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ loader: false });
        if (responseData.status === 200) {
          if (this.state.activeKey === "1") {
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
                  var fill_price = parseFloat(temp.buy_currency_amount).toFixed(
                    8
                  );
                } else {
                  var fill_price = parseFloat(
                    temp.sell_currency_amount
                  ).toFixed(8);
                }
                var fees_total = parseFloat(
                  parseFloat(temp.faldax_fees) + parseFloat(temp.network_fees)
                ).toFixed(8);
                var amount = parseFloat(
                  parseFloat(temp.execution_report.CumQty) -
                    parseFloat(fees_total)
                ).toFixed(8);
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
                csvJSTFields
              });
            } else if (responseData.data.length === 0) {
              this.setState({
                historyJSTData: responseData.data,
                csvJSTFields
              });
            } else {
              this.openNotificationWithIcon(
                "error",
                this.t("validations:error_text.message"),
                responseData.err
              );
            }
          } else if (this.state.activeKey === "2") {
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
                var fill_price = parseFloat(temp.fill_price).toFixed(8);
                var quantity = parseFloat(temp.quantity).toFixed(8);
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
                csvSimplexFields
              });
            } else if (responseData.data.length === 0) {
              this.setState({
                historySimplexData: responseData.data,
                csvSimplexFields
              });
            } else {
              this.openNotificationWithIcon(
                "error",
                this.t("validations:error_text.message"),
                responseData.err
              );
            }
          } else if (this.state.activeKey === "3") {
            // alert("trade");
            let csvTradeFields = [];
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
                  var fill_price = parseFloat(temp.buy_currency_amount).toFixed(
                    8
                  );
                } else {
                  var fill_price = parseFloat(
                    temp.sell_currency_amount
                  ).toFixed(8);
                }
                var fees_total = parseFloat(
                  parseFloat(temp.faldax_fees) + parseFloat(temp.network_fees)
                ).toFixed(8);
                var amount = parseFloat(
                  parseFloat(temp.execution_report.CumQty) -
                    parseFloat(fees_total)
                ).toFixed(8);
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
                csvTradeFields.push(obj);
              }
              this.setState({
                historyTradeData: responseData.data,
                csvTradeFields
              });
            } else if (responseData.data.length === 0) {
              this.setState({
                historyTradeData: responseData.data,
                csvTradeFields
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
      .catch(error => {});
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
        disabledSeconds: () => [55, 56]
      };
    }
    return {
      disabledHours: () => this.range(0, 60).splice(20, 4),
      disabledMinutes: () => this.range(0, 31),
      disabledSeconds: () => [55, 56]
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
          drop1Value: value
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
          drop2Value: null
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
          drop2Value: value
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
          drop1Value: null
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
      duration: 5
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
        checkedGroupValue: ["SEND", "RECEIVE", "SELL", "BUY"]
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
      { label: t("sell_text.message"), value: "SELL" }
    ];
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
                        this.state.drop1List.map(element => {
                          if (this.state.activeKey === "1") {
                            if (this.state.drop2Value === "XRP") {
                              if (
                                element.coin != this.state.drop2Value &&
                                element.coin != "LTC"
                              ) {
                                return (
                                  <Option value={element.coin}>
                                    {element.coin}
                                  </Option>
                                );
                              }
                            } else if (this.state.drop2Value === "LTC") {
                              if (
                                element.coin != this.state.drop2Value &&
                                element.coin != "XRP"
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
                    <FontAwesomeIconS icon={faExchangeAlt} color="#909090" />
                    <Select2
                      showSearch
                      className="display-value"
                      onChange={this.selectChange2}
                      value={this.state.drop2Value}
                    >
                      {this.state.drop2List &&
                        this.state.drop2List.map(element => {
                          if (this.state.activeKey === "1") {
                            if (this.state.drop1Value === "XRP") {
                              if (
                                element.coin != this.state.drop1Value &&
                                element.coin != "LTC"
                              ) {
                                return (
                                  <Option value={element.coin}>
                                    {element.coin}
                                  </Option>
                                );
                              }
                            } else if (this.state.drop1Value === "LTC") {
                              if (
                                element.coin != this.state.drop1Value &&
                                element.coin != "XRP"
                              ) {
                                return (
                                  <Option value={element.coin}>
                                    {element.coin}
                                  </Option>
                                );
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
                        this.t("end_date_text.message")
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
                        RESET
                      </EXPButton>
                      {this.state.csvTradeFields !== undefined ? (
                        this.state.csvTradeFields.length > 0 ? (
                          <EXPButton>
                            <CSVLink
                              filename="tradereportfile.csv"
                              data={this.state.csvTradeFields}
                              headers={this.state.csvHeadersTrade}
                            >
                              EXPORT
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
                  <TabPane
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
                                var fees_total = (
                                  parseFloat(temps.faldax_fees) +
                                  parseFloat(temps.network_fees)
                                ).toFixed(8);
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
                                  var fill_price = parseFloat(
                                    temps.buy_currency_amount
                                  ).toFixed(8);
                                } else {
                                  var fill_price = parseFloat(
                                    temps.sell_currency_amount
                                  ).toFixed(8);
                                }
                                var amount = parseFloat(temps.quantity).toFixed(
                                  8
                                );
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
                              {this.state.historySimplexData.map(function(
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
                                          {simplex_payment_status}
                                        </span>
                                      )}
                                      {simplex_payment_status == "Approved" && (
                                        <span className="order-sucess">
                                          {simplex_payment_status}
                                        </span>
                                      )}
                                      {simplex_payment_status ==
                                        "Cancelled" && (
                                        <span className="order-cancelled">
                                          {simplex_payment_status}
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
                  {/* <TabPane tab="Trade" key="3">
                    <Tablediv>
                      <HisTable responsive striped condensed>
                        <thead>
                          <tr>
                            <th>Coin</th>
                            <th>Date</th>
                            <th>Filled Price</th>
                            <th>Amount</th>
                            <th>Wallet Address</th>
                            <th>Payment Id</th>
                            <th>Quote Id</th>
                            <th>Payment Status</th>
                          </tr>
                        </thead>
                        {this.state.historyTradeData !== undefined ? (
                          this.state.historyTradeData.length > 0 ? (
                            <tbody>
                              {this.state.historyTradeData.map(function(temps) {
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

                                return (
                                  <tr>
                                    <td>{temps.symbol}</td>
                                    <td>{date}</td>
                                    <td>{temps.fill_price}</td>
                                    <td>{temps.quantity}</td>
                                    <td>{temps.address}</td>
                                    <td>{temps.payment_id}</td>
                                    <td>{temps.quote_id}</td>
                                    <td>{temps.symbol}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          ) : (
                            <NDF>
                              <tr>
                                <td colSpan="8">No Data Found</td>
                              </tr>
                            </NDF>
                          )
                        ) : (
                          ""
                        )}
                      </HisTable>
                    </Tablediv>
                  </TabPane> */}
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
const mapDispatchToProps = dispatch => ({
  LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    profileData:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : {}
  };
}

export default translate([
  "history",
  "settings",
  "wallet",
  "security_tab",
  "footer",
  "header",
  "support"
])(connect(mapStateToProps, mapDispatchToProps)(History));
