/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import "antd/dist/antd.css";
import moment from "moment";
import { Checkbox, Select, notification, Tabs } from "antd";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";

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

let { API_URL } = globalVariables;
const { TabPane } = Tabs;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: "BUY", value: "BUY" },
  { label: "SELL", value: "SELL" }
];
const Select1 = styled(Select)`
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
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinList: [],
      drop1List: [],
      drop2List: [],
      toDate: moment().format("YYYY-MM-DD"),
      fromDate: moment(moment().subtract(1, "months"), "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      ),
      historyData: [],
      historySimplexData: [],
      sell: true,
      buy: true,
      send: true,
      receive: true,
      drop1Value: "",
      drop2Value: "",
      loader: false,
      csvFields: [],
      activeKey: "1"
    };
    this.historyResult = this.historyResult.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.repeatClick = this.repeatClick.bind(this);
    this.loadCoinList = this.loadCoinList.bind(this);
    this.selectChange1 = this.selectChange1.bind(this);
    this.selectChange2 = this.selectChange2.bind(this);
    this.callback = this.callback.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    if (this.props.location.tradeType === "1") {
      this.setState({ activeKey: "1" }, () => {
        this.historyResult();
      });
    } else if (this.props.location.tradeType === "2") {
      this.setState({ activeKey: "2" }, () => {
        this.historyResult();
      });
    } else {
      this.historyResult();
    }
    this.loadCoinList();
  }

  /* 
        Page: /history
        It is called from componentDidMount.
        API is called to get coin-list for dropdowns.
    */

  loadCoinList() {
    var self = this;
    fetch(API_URL + "/coin-list", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        self.setState({
          coinList: responseData.data,
          drop1List: responseData.data,
          drop2List: responseData.data
        });
      })
      .catch(error => {});
  }

  /* 
        Page: /history
        It is called from componentDidMount.
        API is called to get result of user's history.
    */
  callback(e) {
    // console.log("Key", key);
    this.setState(
      {
        activeKey: e
      },
      () => {
        this.historyResult();
      }
    );
  }

  historyResult() {
    console.log("Activekey===============>", this.state.activeKey);
    let { drop1Value, drop2Value } = this.state;
    // let flag = false;
    if (drop1Value !== null && drop2Value !== null) {
      let url =
        API_URL +
        `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&toDate=${this.state.toDate}&fromDate=${this.state.fromDate}&sell=${this.state.sell}&trade_type=${this.state.activeKey}`;
      if (this.state.toDate === "" && this.state.toDate === "") {
        url =
          API_URL +
          `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&sell=${this.state.sell}&trade_type=${this.state.activeKey}`;
      }
      if (this.state.drop1Value !== "" && this.state.drop1Value !== "") {
        url =
          url +
          "&symbol=" +
          this.state.drop1Value +
          "-" +
          this.state.drop2Value;
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
            console.log(
              "ActiveKey after getting response",
              this.state.activeKey
            );
            if (this.state.activeKey === "1") {
              // alert("Trade History Loop");
              let csvFields = [];
              // self = this;
              if (responseData.data && responseData.data.length > 0) {
                for (var i = 0; i < responseData.data.length; i++) {
                  let temp = responseData.data[i];
                  let obj = {};
                  var date = moment
                    .utc(temp.created_at)
                    .local()
                    .format(`${this.props.profileData.date_format} HH:mm:ss`);
                  var side =
                    Number(temp.user_id) === this.props.profileData.id
                      ? temp.side
                      : temp.side === "Buy"
                      ? "Sell"
                      : "Buy";
                  var filledPrice = temp.fill_price.toFixed(4);
                  var amount = temp.quantity.toFixed(4);
                  var fee =
                    Number(temp.user_id) === this.props.profileData.id
                      ? temp.user_fee !== null
                        ? temp.user_fee.toFixed(8)
                        : "-"
                      : temp.requested_fee !== null
                      ? temp.requested_fee.toFixed(8)
                      : "-";
                  var volume = (temp.fill_price * temp.quantity).toFixed(4);

                  obj["date"] = date;
                  obj["side"] = side;
                  obj["filled_price"] = filledPrice;
                  obj["amount"] = amount;
                  obj["fee"] = fee;
                  obj["volume"] = volume;
                  csvFields.push(obj);
                }
                this.setState(
                  { historyData: responseData.data, csvFields },
                  () => {
                    console.log(
                      "historyData after loop",
                      this.state.historyData
                    );
                  }
                );
              } else {
                this.openNotificationWithIcon(
                  "error",
                  "Error",
                  responseData.err
                );
              }
            } else if (this.state.activeKey === "2") {
              console.log(
                "ActiveKey after getting response",
                this.state.activeKey
              );
              let csvSimplexFields = [];
              if (responseData.data && responseData.data.length > 0) {
                // alert("Simplex History Loop");
                for (var i = 0; i < responseData.data.length; i++) {
                  let temp = responseData.data[i];
                  let obj = {};
                  var symbol = temp.symbol;
                  var date = moment
                    .utc(temp.created_at)
                    .local()
                    .format(`${this.props.profileData.date_format} HH:mm:ss`);
                  var side = temp.side;
                  var fill_price = temp.fill_price.toFixed(4);
                  var quantity = temp.quantity.toFixed(4);
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
                  obj["side"] = side;
                  obj["filled_price"] = fill_price;
                  obj["quantity"] = quantity;
                  obj["payment_id"] = payment_id;
                  obj["quote_id"] = quote_id;
                  obj["address"] = address;
                  obj["simplex_payment_status"] = simplex_payment_status;
                  csvSimplexFields.push(obj);
                }
                this.setState(
                  { historySimplexData: responseData.data, csvSimplexFields },
                  () => {
                    console.log(
                      "historySimplexData",
                      this.state.historySimplexData
                    );
                  }
                );
              } else {
                this.openNotificationWithIcon(
                  "error",
                  "Error",
                  responseData.err
                );
              }
            }
          } else {
            this.openNotificationWithIcon("error", "Error", responseData.err);
          }
          this.setState({ loader: false });
        })
        .catch(error => {});
    }
  }

  /* 
        Page: /history
        It is called to show start and end of date-picker.
    */

  range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  /* 
        Page: /history
        It is called to disable the date of today and before today.
    */

  disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  }

  /* 
        Page: /history
        It is called to set range which is valid.
    */

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

  /* 
        Page: /history
        It is called when a date is selected between a Range .
    */

  changeDate(date, dateString) {
    var self = this;
    var fromDate = "";
    fromDate = dateString[0];
    var toDate = "";
    toDate = dateString[1];

    this.setState({ toDate, fromDate }, () => {
      self.historyResult();
    });
  }

  /* 
        Page: /history
        It is called when we check any of the checkboxes .
    */

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
    this.setState({ send, receive, sell, buy }, () => {
      self.historyResult();
    });
  }

  /* 
        Page: /history
        It is called when a change happens in Select Tag for Coin first.
    */

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
    if (this.state.drop2Value !== "")
      this.setState(
        {
          drop2List: coinList,
          drop1Value: value
        },
        () => {
          self.historyResult();
        }
      );
    else
      this.setState(
        {
          drop2List: coinList,
          drop1Value: value,
          drop2Value: null
        },
        () => {
          self.historyResult();
        }
      );
  }

  /* 
        Page: /history
        It is called when a change happens in Select Tag for Coin second.
    */

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
    if (this.state.drop1Value !== "")
      this.setState(
        {
          drop1List: coinList,
          drop2Value: value
        },
        () => {
          self.historyResult();
        }
      );
    else
      this.setState(
        {
          drop1List: coinList,
          drop2Value: value,
          drop1Value: null
        },
        () => {
          self.historyResult();
        }
      );
  }

  /* 
        Page: /history
        It is called when u call repeat button in history table.
    */

  repeatClick(data) {
    if (data.order_type === "Limit") {
      let params = {
        symbol: data.symbol,
        side: data.side,
        order_type: data.order_type,
        orderQuantity: data.quantity,
        limit_price: data.limit_price
      };
      fetch(API_URL + "/limit/" + data.side.toLowerCase(), {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.historyResult();
          } else {
          }
        })
        .catch(error => {
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Something went wrong!"
          );
        });
    } else if (data.order_type === "StopLimit") {
      let params = {
        symbol: data.symbol,
        side: data.side,
        order_type: data.order_type,
        orderQuantity: data.quantity,
        limit_price: data.limit_price,
        stop_price: data.stop_price
      };
      fetch(API_URL + "/stop/limit/" + data.side.toLowerCase(), {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.historyResult();
          } else {
          }
        })
        .catch(error => {
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Something went wrong!"
          );
        });
    } else if (data.order_type === "Market") {
      let params = {
        symbol: data.symbol,
        side: data.side,
        order_type: data.order_type,
        orderQuantity: data.quantity
      };
      fetch(API_URL + "/market/" + data.side.toLowerCase(), {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.historyResult();
          } else {
          }
        })
        .catch(error => {
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Something went wrong!"
          );
        });
    }
  }

  /* 
        Page: /history
        It is called for custom notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  }

  render() {
    var self = this;
    return (
      <div>
        <ContactWrap>
          <LoggedNavigation />
          <GreyWrap>
            <ContainerContact>
              <HeadHis>
                <Filter>
                  <div
                    style={{
                      display: "inline-flex",
                      width: "390px",
                      alignItems: "center"
                    }}
                  >
                    <Select1
                      showSearch
                      style={{ width: 120 }}
                      onChange={this.selectChange1}
                    >
                      {this.state.drop1List.map(element => (
                        <Option value={element.coin}>{element.coin}</Option>
                      ))}
                    </Select1>
                    <FontAwesomeIconS icon={faExchangeAlt} color="#909090" />
                    <Select2
                      showSearch
                      style={{ width: 120 }}
                      onChange={this.selectChange2}
                    >
                      {this.state.drop2List.map(element => (
                        <Option value={element.coin}>{element.coin}</Option>
                      ))}
                    </Select2>
                  </div>
                  <Datediv>
                    <RangePickerS
                      disabledDate={this.disabledDate}
                      disabledTime={this.disabledRangeTime}
                      onChange={this.changeDate}
                      defaultValue={[
                        moment(moment().subtract(1, "months"), "YYYY-MM-DD"),
                        moment(moment(), "YYYY-MM-DD")
                      ]}
                      format="YYYY-MM-DD"
                    />
                  </Datediv>
                  {this.state.csvFields !== undefined ? (
                    this.state.csvFields.length > 0 ? (
                      <EXPButton>
                        <CSVLink data={this.state.csvFields}>EXPORT</CSVLink>
                      </EXPButton>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </Filter>
                <div style={{ paddingLeft: "15px", marginTop: "20px" }}>
                  <CheckboxGroupS
                    options={options}
                    defaultValue={["SEND", "RECEIVE", "SELL", "BUY"]}
                    onChange={this.onChangeCheck}
                  />
                </div>
              </HeadHis>
              <HisWrap>
                <Tabs
                  activeKey={this.state.activeKey}
                  // onChange={this.handleChange}
                  onChange={this.callback}
                >
                  <TabPane tab="Trade History" key="1">
                    <Tablediv>
                      <HisTable responsive striped condensed>
                        <thead>
                          <tr>
                            <th>Coin</th>
                            <th>Date</th>
                            <th>Side</th>
                            <th>Filled price</th>
                            <th>Amount</th>
                            <th>FEE</th>
                            <th>Volume</th>
                          </tr>
                        </thead>
                        {this.state.historyData !== undefined ? (
                          this.state.historyData.length > 0 ? (
                            <tbody>
                              {this.state.historyData.map(function(temp) {
                                var date = moment
                                  .utc(temp.created_at)
                                  .local()
                                  .format(
                                    `${self.props.profileData.date_format} HH:mm:ss`
                                  );
                                var side =
                                  Number(temp.user_id) ===
                                  self.props.profileData.id
                                    ? temp.side
                                    : temp.side === "Buy"
                                    ? "Sell"
                                    : "Buy";
                                var fee =
                                  Number(temp.user_id) ===
                                  self.props.profileData.id
                                    ? temp.user_fee !== null
                                      ? temp.user_fee.toFixed(8)
                                      : "-"
                                    : temp.requested_fee !== null
                                    ? temp.requested_fee.toFixed(8)
                                    : "-";
                                return (
                                  <tr>
                                    <td>{temp.symbol}</td>
                                    <td>{date}</td>
                                    <SideBuySell
                                      side={side === "Buy" ? true : false}
                                    >
                                      {side}
                                    </SideBuySell>
                                    <td>{temp.fill_price.toFixed(5)}</td>
                                    <td>{temp.quantity.toFixed(3)}</td>
                                    <td>{fee}</td>
                                    <td>
                                      {(
                                        temp.fill_price * temp.quantity
                                      ).toFixed(8)}
                                    </td>
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
                  </TabPane>
                  <TabPane tab="Simplex History" key="2">
                    <Tablediv>
                      <HisTable responsive striped condensed>
                        <thead>
                          <tr>
                            <th>Symbol</th>
                            <th>Fill Price</th>
                            <th>Quantity</th>
                            <th>Side</th>
                            <th>Date</th>
                            <th>Payment Id</th>
                            <th>Quote Id</th>
                            <th>Simplex Payment Status</th>
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
                                    ? "Sell"
                                    : "Buy";
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
                                    <td>{temps.fill_price}</td>
                                    <td>{temps.quantity}</td>
                                    <SideBuySell
                                      side={side === "Buy" ? true : false}
                                    >
                                      {side}
                                    </SideBuySell>
                                    <td>{date}</td>
                                    <td>{temps.payment_id}</td>
                                    <td>{temps.quote_id}</td>
                                    <td>{simplex_payment_status}</td>
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

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    profileData:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : {}
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}
export default connect(mapStateToProps)(History);
