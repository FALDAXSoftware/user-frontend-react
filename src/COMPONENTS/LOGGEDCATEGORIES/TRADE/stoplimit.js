/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import "antd/dist/antd.css";
import { Row, Col, Radio, notification, Spin } from "antd";

/* Components */
import { globalVariables } from "Globals.js";

/* Styled-components */
import { SpinSingle } from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import {
  Label,
  MarketWrap,
  BuyWrap,
  BuySell,
  BuySellRadio,
  BalanceWrap,
  Balance,
  Balance1,
  Total,
  ETHWrap,
  BTCWrap,
  Willpay,
  Willpay2,
  AMTInput,
  TotalWrap,
  TotInput,
  Pay,
  Esti,
  ButtonWrap,
  ButtonETH
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

let { API_URL } = globalVariables;

class StopLimit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      side: "Buy",
      crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
      currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
      sellprice: 0.001,
      buyPrice: 0.002,
      amount: "",
      stop_price: "",
      limit_price: "",
      total: 0,
      buyPayAmt: 0,
      buyEstPrice: 0,
      sellEstPrice: 0,
      sellPayAmt: 0,
      loader: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.validator = new SimpleReactValidator({
      gtzero: {
        // name the rule
        message: "Amount must be greater than zero",
        rule: (val, params, validator) => {
          if (val > 0) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      },
      decimalrestrict3: {
        message:
          "Value must be less than or equal to 3 digits after decimal point.",
        rule: val => {
          var RE = /^\d*\.?\d{0,3}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      decimalrestrict5: {
        message:
          "Value must be less than or equal to 5 digits after decimal point.",
        rule: val => {
          var RE = /^\d*\.?\d{0,5}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
  }

  /*Life Cycle Methods  */

  componentDidMount() {
    this.setState({
      userBalFees: this.props.userBal.fees,
      amount: "",
      total: 0,
      limit_price: "",
      stop_price: "",
      buyEstPrice: 0,
      sellEstPrice: 0,
      sellPayAmt: 0,
      buyPayAmt: 0
    });
  }

  componentWillReceiveProps(props, newProps) {
    this.setState({
      userBalFees: props.userBal.fees,
      amount: "",
      total: 0,
      limit_price: "",
      stop_price: "",
      buyEstPrice: 0,
      sellEstPrice: 0,
      sellPayAmt: 0,
      buyPayAmt: 0
    });
    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState({ crypto: props.cryptoPair.crypto });
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState({ currency: props.cryptoPair.currency });
      }
    }
  }

  /* 
        Page: /trade --> Stop Limit
        This method is called when u change side between BUY and SELL and form is reset here.
    */
  clearValidation() {
    this.validator.hideMessages();
    this.forceUpdate();
    // rerender to hide messages for the first time
  }

  onChange(e) {
    var self = this;
    let obj = {};
    let name = e.target.name;

    let value = e.target.value;
    obj[name] = value;
    if (name === "side") {
      obj["amount"] = "";
      obj["total"] = 0;
      obj["limit_price"] = "";
      obj["stop_price"] = "";
      this.clearValidation();
    }
    this.setState(
      {
        ...obj
      },
      () => {
        obj = {};
        if (this.state.amount >= 0 && this.state.stop_price > 0) {
          if (this.state.side === "Buy") {
            if (this.validator.allValid()) {
              this.validator.hideMessages();
            }
            obj["total"] = this.state.amount * this.props.userBal.buyPay;
            self.setState({
              buyPayAmt: this.state.amount * this.props.userBal.buyPay,
              buyEstPrice:
                this.state.amount * this.props.userBal.buyEstimatedPrice
            });
          } else if (this.state.side === "Sell") {
            if (this.validator.allValid()) {
              this.validator.hideMessages();
            }
            obj["total"] = this.state.amount * this.props.userBal.sellPay;
            self.setState({
              sellPayAmt: this.state.amount * this.props.userBal.sellPay,
              sellEstPrice:
                this.state.amount * this.props.userBal.sellEstimatedPrice
            });
          }
        } else {
          obj["total"] = 0;
        }
        self.setState({ ...obj });
      }
    );
  }

  /* 
        Page: /trade --> Stop Limit
        this method is called for custom notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }

  /* 
        Page: /trade --> Stop Limit
        This method is called on submit of form according to buy and sell of order.
    */

  onSubmit() {
    var self = this;
    if (this.validator.allValid()) {
      let params = {
        symbol:
          self.state.crypto.toUpperCase() +
          "-" +
          self.state.currency.toUpperCase(),
        side: self.state.side,
        order_type: "StopLimit",
        orderQuantity: self.state.amount,
        limit_price: self.state.limit_price,
        stop_price: self.state.stop_price
      };
      this.setState({ loader: true });
      fetch(API_URL + "/stop/limit/" + self.state.side.toLowerCase(), {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + self.props.isLoggedIn
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.setState({
              stop_price: 0,
              limit_price: 0,
              total: 0,
              amount: 0,
              loader: false,
              buyPayAmt: 0,
              sellPayAmt: 0,
              buyEstPrice: 0,
              sellEstPrice: 0
            });
            self.openNotificationWithIcon(
              "success",
              "Success",
              responseData.message
            );
          } else if (responseData.status === 201) {
            this.setState({
              stop_price: 0,
              limit_price: 0,
              total: 0,
              amount: 0,
              loader: false,
              buyPayAmt: 0,
              sellPayAmt: 0,
              buyEstPrice: 0,
              sellEstPrice: 0
            });
            self.openNotificationWithIcon(
              "warning",
              "Warning",
              responseData.message
            );
          } else {
            this.setState({ loader: false });
            self.openNotificationWithIcon("error", "Error", responseData.err);
          }
        })
        .catch(error => {
          this.setState({ loader: false });
          self.openNotificationWithIcon(
            "error",
            "Error",
            "Something went wrong!"
          );
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  onChangeCheck(e) {}

  render() {
    const {
      userBalFees,
      buyEstPrice,
      buyPayAmt,
      sellEstPrice,
      sellPayAmt
    } = this.state;
    const RadioGroup = Radio.Group;

    return (
      <MarketWrap>
        <BuyWrap>
          <BuySell>
            <RadioGroup
              value={this.state.side}
              size="large"
              buttonStyle="solid"
              onChange={this.onChange}
              name="side"
            >
              <BuySellRadio value="Buy">BUY</BuySellRadio>
              <BuySellRadio value="Sell">SELL</BuySellRadio>
            </RadioGroup>
          </BuySell>
        </BuyWrap>
        {Object.keys(this.props.userBal).length > 0 ? (
          this.state.side === "Buy" ? (
            <BalanceWrap>
              <Row>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>Balance</Balance1>
                    </Col>
                    <Col span={12}>
                      <Balance>
                        {this.props.userBal.currency[0]
                          ? `${this.props.userBal.currency[0].balance.toFixed(
                              8
                            )}${" "}`
                          : `00${" "}`}
                        {this.state.currency}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>Total</Balance1>
                    </Col>
                    <Col span={12}>
                      <Total>
                        {this.props.userBal.currency[0]
                          ? `${this.props.userBal.currency[0].balance.toFixed(
                              8
                            )}${" "}`
                          : `00${" "}`}
                        {this.state.currency}
                      </Total>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>In orders</Balance1>
                    </Col>
                    <Col span={12}>
                      <Total>
                        {this.props.userBal.currency[0]
                          ? `${Math.abs(
                              this.props.userBal.currency[0].balance -
                                this.props.userBal.currency[0].placed_balance
                            ).toFixed(8)}${" "}`
                          : `00${" "}`}

                        {this.state.currency}
                      </Total>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>Best ask</Balance1>
                    </Col>
                    <Col span={12}>
                      <Total>
                        {this.props.userBal.buyPay.toFixed(5)}{" "}
                        {this.state.crypto}
                      </Total>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </BalanceWrap>
          ) : (
            <BalanceWrap>
              <Row>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>Balance</Balance1>
                    </Col>
                    <Col span={12}>
                      <Balance>
                        {this.props.userBal.crypto[0]
                          ? `${this.props.userBal.crypto[0].balance.toFixed(
                              8
                            )}${" "}`
                          : `00${" "}`}
                        {this.state.crypto}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>Total</Balance1>
                    </Col>
                    <Col span={12}>
                      <Total>
                        {this.props.userBal.crypto[0]
                          ? `${this.props.userBal.crypto[0].balance.toFixed(
                              8
                            )}${" "}`
                          : `00${" "}`}
                        {this.state.crypto}
                      </Total>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>In orders</Balance1>
                    </Col>
                    <Col span={12}>
                      <Total>
                        {this.props.userBal.crypto[0]
                          ? `${Math.abs(
                              this.props.userBal.crypto[0].balance -
                                this.props.userBal.crypto[0].placed_balance
                            ).toFixed(8)}${" "}`
                          : `00${" "}`}
                        {this.state.crypto}
                      </Total>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={12}>
                      <Balance1>Best ask</Balance1>
                    </Col>
                    <Col span={12}>
                      <Total>
                        {this.props.userBal.sellPay.toFixed(5)}{" "}
                        {this.state.currency}
                      </Total>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </BalanceWrap>
          )
        ) : (
          ""
        )}
        <ETHWrap>
          <Label>Amount</Label>
          <TotalWrap style={{ marginBottom: 16 }}>
            <AMTInput
              min="0"
              type="number"
              step="0.001"
              addonAfter={this.state.crypto}
              placeholder="0"
              value={this.state.amount}
              name="amount"
              onChange={this.onChange}
            />
            {/* {this.validator.message(
              "amount",
              this.state.amount,
              "required|gtzero|numeric|decimalrestrict3",
              "text-danger-validation",
              {
                gtzero: "Amount should be greater than zero.",
                decimalrestrict3:
                  "Amount must be less than or equal to 5 digits after decimal point."
              }
            )} */}
            {this.validator.message(
              "amount",
              this.state.amount,
              "required|gtzero|numeric|decimalrestrict3",
              "text-danger-validation",
              {
                gtzero: "Amount should be greater than zero.",
                decimalrestrict3:
                  "Amount must be less than or equal to 3 digits after decimal point."
              }
            )}
          </TotalWrap>
        </ETHWrap>
        <BTCWrap>
          <Label>Stop Price</Label>
          <TotalWrap style={{ marginBottom: 16 }}>
            <TotInput
              min="0"
              type="number"
              placeholder="0"
              step="0.00001"
              addonAfter={this.state.currency}
              value={this.state.stop_price}
              name="stop_price"
              onChange={this.onChange}
            />
            {this.validator.message(
              "stop_price",
              this.state.stop_price,
              "required|gtzero|numeric|decimalrestrict5",
              "text-danger-validation",
              {
                gtzero: "Amount should be greater than zero.",
                decimalrestrict5:
                  "Amount must be less than or equal to 5 digits after decimal point."
              }
            )}
          </TotalWrap>
        </BTCWrap>
        <BTCWrap>
          <Label>Limit Price</Label>
          <TotalWrap style={{ marginBottom: 16 }}>
            <TotInput
              min="0"
              type="number"
              placeholder="0"
              step="0.00001"
              addonAfter={this.state.currency}
              value={this.state.limit_price}
              name="limit_price"
              onChange={this.onChange}
            />
            {this.validator.message(
              "Limit_Price",
              this.state.limit_price,
              "required|gtzero|numeric|decimalrestrict5",
              "text-danger-validation",
              {
                gtzero: "Limit Price should be greater than zero.",
                decimalrestrict5:
                  "Limit Price must be less than or equal to 5 digits after decimal point."
              }
            )}
          </TotalWrap>
        </BTCWrap>
        <BTCWrap>
          <Label>Total</Label>
          <TotalWrap style={{ marginBottom: 16 }} className="readonly-input">
            <TotInput
              min="0"
              readOnly="true"
              type="number"
              addonAfter={this.state.currency}
              value={this.state.total.toFixed(8)}
              name="total"
              onChange={this.onChange}
            />
            {this.validator.message(
              "Total",
              this.state.total,
              "required|gtzero|numeric",
              "text-danger-validation",
              {
                gtzero: "Total should be greater than zero."
              }
            )}
          </TotalWrap>
        </BTCWrap>
        {Object.keys(this.props.userBal).length > 0 ? (
          this.state.side === "Buy" ? (
            <Pay>
              <Row>
                <Col xs={15} sm={12}>
                  <div>
                    <Willpay>You will approximately pay</Willpay>
                  </div>
                </Col>
                <Col xs={9} sm={12}>
                  <div>
                    <Willpay2>
                      {buyPayAmt.toFixed(8)} {this.state.currency}
                    </Willpay2>
                  </div>
                </Col>
              </Row>
              <Esti>
                <Row>
                  <Col xs={15} sm={12}>
                    Estimated Best Price
                  </Col>
                  <Col xs={9} sm={12}>
                    {buyPayAmt.toFixed(8)} {this.state.currency}
                  </Col>
                  <Col xs={15} sm={12}>
                    Fee {userBalFees} %
                  </Col>
                  <Col xs={9} sm={12}>
                    {(buyPayAmt - buyEstPrice).toFixed(8)} {this.state.currency}
                  </Col>
                </Row>
              </Esti>
            </Pay>
          ) : (
            <Pay>
              <Row>
                <Col xs={15} sm={12}>
                  <div>
                    <Willpay>You will approximately receive</Willpay>
                  </div>
                </Col>
                <Col xs={9} sm={12}>
                  <div>
                    <Willpay2>
                      {sellEstPrice.toFixed(8)} {this.state.currency}
                    </Willpay2>
                  </div>
                </Col>
              </Row>
              <Esti>
                <Row>
                  <Col xs={15} sm={12}>
                    Estimated Best Price
                  </Col>
                  <Col xs={9} sm={12}>
                    {sellPayAmt.toFixed(8)} {this.state.currency}
                  </Col>
                  <Col xs={15} sm={12}>
                    Fee {userBalFees} %
                  </Col>
                  <Col xs={9} sm={12}>
                    {(sellPayAmt - sellEstPrice).toFixed(8)}{" "}
                    {this.state.currency}
                  </Col>
                </Row>
              </Esti>
            </Pay>
          )
        ) : (
          ""
        )}
        <ButtonWrap>
          <ButtonETH side={this.state.side} onClick={this.onSubmit}>
            {`${this.state.side.toUpperCase()} ${" "} ${this.state.crypto}`}
          </ButtonETH>
        </ButtonWrap>
        {this.state.loader === true ? (
          <SpinSingle className="Single_spin">
            <Spin size="small" />
          </SpinSingle>
        ) : (
          ""
        )}
      </MarketWrap>
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
        : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(StopLimit);
