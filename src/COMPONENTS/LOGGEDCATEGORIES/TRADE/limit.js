/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import "antd/dist/antd.css";
import { Row, Col, Radio, notification, Spin } from "antd";
import { translate } from "react-i18next";

/* components */
import { SpinSingle } from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import { globalVariables } from "Globals.js";

/* STYLED-COMPONENTS */
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
  ButtonETH,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import {
  Approx,
  ApproxBelow,
  WillpayBelow2,
  WillpayBelow,
} from "../../../STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

let { SOCKET_HOST } = globalVariables;

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
class Limit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: "Buy",
      crypto: this.props.crypto ? this.props.crypto : "XRP",
      currency: this.props.currency ? this.props.currency : "BTC",
      sellprice: 0.001,
      buyPrice: 0.002,
      amount: "",
      limit_price: "",
      total: 0,
      buyPayAmt: 0,
      buyEstPrice: 0,
      sellEstPrice: 0,
      sellPayAmt: 0,
      userBalFees: 0,
      loader: false,
      singlefiatCryptoValue: "",
      singlefiatCurrencyValue: "",
      fiatCryptoValue: "",
      fiatCurrencyValue: 0,
      fiatCurrency: "",
      sellTotal: 0,
      buyTotal: 0,
      disabledMode: false,
    };
    this.t = this.props.t;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.validator = new SimpleReactValidator({
      gtzero: {
        // name the rule
        message: this.t("validations:value_greater_than_0_error.message"),
        rule: (val, params, validator) => {
          if (val > 0) {
            return true;
          } else {
            return false;
          }
        },
        required: true, // optional
      },
      decimalrestrict3: {
        message: this.t("3_decimal_error.message"),
        rule: (val) => {
          var RE = /^\d*\.?\d{0,3}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
      decimalrestrict5: {
        message: this.t("5_decimal_error.message"),
        rule: (val) => {
          var RE = /^\d*\.?\d{0,5}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
      decimalrestrict8: {
        message: this.t("validations:8_decimal_error.message"),
        rule: (val) => {
          var RE = /^\d*\.?\d{0,8}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    if (this.props.sellTotal) {
      this.setState(
        {
          sellTotal: this.props.sellTotal,
        },
        () => {
          if (
            this.state.side === "Buy" &&
            !this.state.loader &&
            parseFloat(this.state.amount) > parseFloat(this.state.sellTotal)
          ) {
            this.setState({
              disabledMode: true,
            });
          } else {
            this.setState({
              disabledMode: false,
            });
          }
        }
      );
    }
    if (this.props.buyTotal) {
      this.setState(
        {
          buyTotal: this.props.buyTotal,
        },
        () => {
          if (
            this.state.side === "Sell" &&
            !this.state.loader &&
            parseFloat(this.state.amount) > parseFloat(this.state.buyTotal)
          ) {
            this.setState({
              disabledMode: true,
            });
          } else {
            this.setState({
              disabledMode: false,
            });
          }
        }
      );
    }
    let fiat, currency;
    if (this.props.profileDetails) {
      switch (this.props.profileDetails.fiat) {
        case "USD":
          fiat = "10";
          currency = "$";
          break;
        case "EUR":
          fiat = "11";
          currency = "€";
          break;
        case "INR":
          fiat = "12";
          currency = "₹";
          break;
        default:
          fiat = "";
          currency = "";
          break;
      }
    }
    this.setState({
      amount: "",
      total: 0,
      limit_price: "",
      userBalFees: this.props.userBal.fees,
      buyEstPrice: 0,
      sellEstPrice: 0,
      buyPayAmt: 0,
      sellPayAmt: 0,
      loader: false,
      fiatCurrency: "USD",
      // fiatCryptoValue: this.props.userBal.cryptoFiat,
      // fiatCurrencyValue: this.props.userBal.currencyFiat,
      singlefiatCryptoValue: this.props.userBal.cryptoFiat,
      singlefiatCurrencyValue: this.props.userBal.currencyFiat,
    });
  }
  componentWillReceiveProps(props, newProps) {
    this.setState({
      amount: "",
      total: 0,
      limit_price: "",
      userBalFees: props.userBal.fees,
      // fiatCryptoValue: props.userBal.cryptoFiat,
      // fiatCurrencyValue: props.userBal.currencyFiat,
      singlefiatCryptoValue: props.userBal.cryptoFiat,
      singlefiatCurrencyValue: props.userBal.currencyFiat,
    });
    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState({ crypto: props.cryptoPair.crypto });
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState({ currency: props.cryptoPair.currency });
      }
    }
    if (props.sellTotal && props.sellTotal != this.props.sellTotal) {
      this.setState(
        {
          sellTotal: props.sellTotal,
        },
        () => {
          if (
            this.state.side === "Buy" &&
            !this.state.loader &&
            parseFloat(this.state.amount) > parseFloat(this.state.sellTotal)
          ) {
            this.setState({
              disabledMode: true,
            });
          } else {
            this.setState({
              disabledMode: false,
            });
          }
        }
      );
    }
    if (props.buyTotal && props.buyTotal != this.props.buyTotal) {
      this.setState(
        {
          buyTotal: props.buyTotal,
        },
        () => {
          if (
            this.state.side === "Sell" &&
            !this.state.loader &&
            parseFloat(this.state.amount) > parseFloat(this.state.buyTotal)
          ) {
            this.setState({
              disabledMode: true,
            });
          } else {
            this.setState({
              disabledMode: false,
            });
          }
        }
      );
    }
  }

  /* 
        Page: /trade --> limit
        this method is called depended on side BUY/SELL.
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
    // this.setState({
    //   fiatCurrencyValue: 0
    // });
    if (name === "side") {
      obj["amount"] = "";
      obj["total"] = 0;
      obj["limit_price"] = "";
      this.clearValidation();
      if (e.target.value === "Buy") {
        this.setState({
          fiatCurrencyValue: 0,
        });
      } else if (e.target.value === "Sell") {
        this.setState({
          fiatCurrencyValue: 0,
        });
      }
    }
    this.setState(
      {
        ...obj,
      },
      () => {
        obj = {};
        if (this.state.amount > 0 && this.state.limit_price > 0) {
          if (this.state.side === "Buy") {
            if (this.validator.allValid()) {
              this.validator.hideMessages();
            }
            obj["total"] =
              Number(this.state.amount) * this.props.userBal.buyPay;
            // obj["amount"] = Number(this.state.amount).toFixed(3);
            // obj["limit_price"] = Number(this.state.limit_price).toFixed(5);
            self.setState({
              buyPayAmt: Number(this.state.amount) * this.props.userBal.buyPay,
              buyEstPrice:
                Number(this.state.amount) *
                this.props.userBal.buyEstimatedPrice,
            });
            let fiatValue =
              parseFloat(this.state.singlefiatCurrencyValue) *
              parseFloat(
                Number(this.state.amount) * this.props.userBal.buyPay
              ).toFixed(8);
            this.setState({
              fiatCurrencyValue: fiatValue,
            });
          } else if (this.state.side === "Sell") {
            if (this.validator.allValid()) {
              this.validator.hideMessages();
            }
            self.setState({
              sellPayAmt:
                Number(this.state.amount) * this.props.userBal.sellPay,
              sellEstPrice:
                Number(this.state.amount) *
                this.props.userBal.sellEstimatedPrice,
            });
            obj["total"] =
              Number(this.state.amount) * this.props.userBal.sellPay;
            let fiatValue =
              parseFloat(this.state.singlefiatCurrencyValue) *
              parseFloat(
                Number(this.state.amount) *
                  this.props.userBal.sellEstimatedPrice
              ).toFixed(8);
            this.setState({
              fiatCurrencyValue: fiatValue,
            });
            // obj["amount"] = Number(this.state.amount).toFixed(3);
            // obj["limit_price"] = Number(this.state.limit_price).toFixed(5);
          }
          if (this.state.side === "Buy") {
            if (value > 0 && name === "amount") {
              let fiatValue =
                parseFloat(this.state.singlefiatCurrencyValue) *
                parseFloat(
                  Number(this.state.amount) * this.props.userBal.buyPay
                ).toFixed(8);
              this.setState({
                fiatCurrencyValue: fiatValue,
              });
            }
          } else if (this.state.side === "Sell") {
            if (value > 0 && name === "amount") {
              let fiatValue =
                parseFloat(this.state.singlefiatCurrencyValue) *
                parseFloat(
                  Number(this.state.amount) *
                    this.props.userBal.sellEstimatedPrice
                ).toFixed(8);
              this.setState({
                fiatCurrencyValue: fiatValue,
              });
            }
          }
        } else if (this.state.amount > 0) {
          console.log("^^^^", this.state.amount);
          if (this.state.side === "Buy") {
            if (value > 0 && name === "amount") {
              // let fiatValue =
              //   parseFloat(this.state.singlefiatCurrencyValue) *
              //   parseFloat(obj["total"]).toFixed(8);
              // this.setState({
              //   fiatCurrencyValue: fiatValue,
              // });
              if (
                parseFloat(this.state.amount) > parseFloat(this.state.sellTotal)
              ) {
                self.setState({
                  disabledMode: true,
                });
              } else {
                self.setState({
                  disabledMode: false,
                });
              }
            }
          } else if (this.state.side === "Sell") {
            if (value > 0 && name === "amount") {
              // let fiatValue =
              //   parseFloat(this.state.singlefiatCurrencyValue) *
              //   parseFloat(obj["total"]).toFixed(8);
              // this.setState({
              //   fiatCurrencyValue: fiatValue,
              // });
              if (
                parseFloat(this.state.amount) > parseFloat(this.state.buyTotal)
              ) {
                self.setState({
                  disabledMode: true,
                });
              } else {
                self.setState({
                  disabledMode: false,
                });
              }
            }
          }
        } else {
          obj["total"] = 0;
          if (this.state.side === "Buy") {
            this.setState({
              fiatCurrencyValue: 0,
              buyPayAmt: 0,
              buyEstPrice: 0,
              disabledMode: false,
            });
          } else if (this.state.side === "Sell") {
            this.setState({
              fiatCurrencyValue: 0,
              sellPayAmt: 0,
              sellEstPrice: 0,
              disabledMode: false,
            });
          }
          // obj["amount"] = Number(this.state.amount).toFixed(3);
          // obj["limit_price"] = Number(this.state.limit_price).toFixed(5);
        }
        self.setState({ ...obj });
      }
    );
  }

  /* 
        Page: /trade --> limit
        this method is called for cutom notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }

  /* 
        Page: /trade --> limit
        this method is called when Submit is called for BUY/SELL.
    */

  onSubmit() {
    var self = this;
    if (this.validator.allValid()) {
      this.validator.hideMessages();
      let params = {
        symbol:
          self.state.crypto.toUpperCase() +
          "-" +
          self.state.currency.toUpperCase(),
        side: self.state.side,
        order_type: "Limit",
        orderQuantity: self.state.amount,
        limit_price: self.state.limit_price,
      };
      this.setState({ loader: true });
      fetch(
        SOCKET_HOST +
          `/api/v1/tradding/orders/limit-${self.state.side.toLowerCase()}-order-create`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": localStorage["i18nextLng"],
            Authorization: "Bearer " + self.props.isLoggedIn,
          },
          body: JSON.stringify(params),
        }
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === 200) {
            this.setState(
              {
                limit_price: "",
                total: 0,
                amount: "",
                loader: false,
                buyPayAmt: 0,
                sellPayAmt: 0,
                buyEstPrice: 0,
                sellEstPrice: 0,
              },
              () => {
                if (this.state.side === "Buy") {
                  this.setState({
                    fiatCurrencyValue: 0,
                  });
                } else if (this.state.side === "Sell") {
                  this.setState({
                    fiatCurrencyValue: 0,
                  });
                }
              }
            );
            self.openNotificationWithIcon(
              "success",
              this.t("validations:success_text.message"),
              responseData.message
            );
          } else if (responseData.status === 201) {
            this.setState(
              {
                stop_price: "",
                limit_price: "",
                total: 0,
                amount: "",
                loader: false,
                buyPayAmt: 0,
                sellPayAmt: 0,
                buyEstPrice: 0,
                sellEstPrice: 0,
              },
              () => {
                if (this.state.side === "Buy") {
                  this.setState({
                    fiatCurrencyValue: 0,
                  });
                } else if (this.state.side === "Sell") {
                  this.setState({
                    fiatCurrencyValue: 0,
                  });
                }
              }
            );
            self.openNotificationWithIcon(
              "warning",
              "Warning",
              responseData.message
            );
          } else if (responseData.status === 500) {
            self.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.message
            );
          } else {
            this.setState({ loader: false });
            self.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.err
            );
          }
          this.setState({
            loader: false,
          });
        })
        .catch((error) => {
          self.openNotificationWithIcon(
            "error",
            self.t("validations:error_text.message"),
            self.t("tier_changes:something_went_wrong_text.message")
          );
          self.setState({
            stop_price: "",
            limit_price: "",
            total: 0,
            amount: "",
            loader: false,
            buyPayAmt: 0,
            sellPayAmt: 0,
            buyEstPrice: 0,
            sellEstPrice: 0,
          });
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
      sellPayAmt,
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
              <BuySellRadio value="Buy">
                {this.t("history:buy_text.message")}
              </BuySellRadio>
              <BuySellRadio value="Sell">
                {this.t("history:sell_text.message")}
              </BuySellRadio>
            </RadioGroup>
          </BuySell>
        </BuyWrap>

        {Object.keys(this.props.userBal).length > 0 ? (
          this.state.side === "Buy" ? (
            <BalanceWrap>
              <Row>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <Balance1>{this.t("balance_text.message")}</Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {this.props.userBal.currency
                          ? this.props.userBal.currency.placed_balance
                            ? `${precision(
                                this.props.userBal.currency.placed_balance
                              )}${" "}`
                            : `0${" "}`
                          : `0${" "}`}
                        {this.state.currency}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <Balance1>
                        {this.t("conversion:total_text.message")}
                      </Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {this.props.userBal.currency
                          ? this.props.userBal.currency.balance
                            ? `${precision(
                                this.props.userBal.currency.balance
                              )}${" "}`
                            : `0${" "}`
                          : `0${" "}`}
                        {this.state.currency}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <Balance1>
                        {this.t("wallet:in_order_text.message")}
                      </Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {this.props.userBal.currency
                          ? this.props.userBal.currency.balance
                            ? `${precision(
                                Math.abs(
                                  this.props.userBal.currency.balance -
                                    this.props.userBal.currency.placed_balance
                                )
                              )}${" "}`
                            : `0${" "}`
                          : `0${" "}`}
                        {this.state.currency}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <Balance1>
                        {this.t("best_text.message")}{" "}
                        {this.t("ask_text.message")}
                      </Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {precision(this.props.userBal.buyPay)}{" "}
                        {this.state.currency}
                      </Balance>
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
                    <Col span={24}>
                      <Balance1>{this.t("balance_text.message")}</Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {this.props.userBal.crypto
                          ? this.props.userBal.crypto.placed_balance
                            ? `${precision(
                                this.props.userBal.crypto.placed_balance
                              )}${" "}`
                            : `0${" "}`
                          : `0${" "}`}
                        {this.state.crypto}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <Balance1>
                        {this.t("conversion:total_text.message")}
                      </Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {this.props.userBal.crypto
                          ? this.props.userBal.crypto.balance
                            ? `${precision(
                                this.props.userBal.crypto.balance
                              )}${" "}`
                            : `0${" "}`
                          : `0${" "}`}
                        {this.state.crypto}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <Balance1>
                        {this.t("wallet:in_order_text.message")}
                      </Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {this.props.userBal.crypto
                          ? this.props.userBal.crypto.balance
                            ? `${precision(
                                Math.abs(
                                  this.props.userBal.crypto.balance -
                                    this.props.userBal.crypto.placed_balance
                                )
                              )}${" "}`
                            : `0${" "}`
                          : `0${" "}`}
                        {this.state.crypto}
                      </Balance>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <Balance1>
                        {this.t("best_text.message")}{" "}
                        {this.t("bid_text.message")}
                      </Balance1>
                    </Col>
                    <Col span={24}>
                      <Balance>
                        {precision(this.props.userBal.sellPay)}{" "}
                        {this.state.currency}
                      </Balance>
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
          <Label>{this.t("wallet:amount_text.message")}</Label>
          <TotalWrap>
            <AMTInput
              min="0"
              type="number"
              step="0.001"
              addonAfter={this.state.crypto}
              value={this.state.amount}
              name="amount"
              placeholder="0"
              onChange={this.onChange}
            />
            {this.validator.message(
              "Amount",
              this.state.amount,
              "required|gtzero|numeric|decimalrestrict8",
              "trade-action-validation",
              {
                required: this.t(
                  "general_3:validation_amount_required.message"
                ),
                numeric: this.t("general_3:validation_amount_numeric.message"),
              }
            )}
            {this.state.disabledMode ? (
              <div className="trade-action-validation">
                {this.t("tier_changes:invalid_order_quantity_text.message")}
              </div>
            ) : (
              ""
            )}
          </TotalWrap>
        </ETHWrap>
        <BTCWrap>
          <Label>{this.t("limit_price_text.message")}</Label>
          <TotalWrap>
            <TotInput
              min="0"
              step="0.00001"
              type="number"
              placeholder="0"
              addonAfter={this.state.currency}
              value={this.state.limit_price}
              name="limit_price"
              onChange={this.onChange}
            />
            {this.validator.message(
              "Limit_price",
              this.state.limit_price,
              "required|gtzero|numeric|decimalrestrict8",
              "trade-action-validation",
              {
                required: `${this.t("limit_price_text.message")}${" "}${this.t(
                  "validations:field_is_required.message"
                )}`,
                numeric: `${this.t("limit_price_text.message")}${" "}${this.t(
                  "must_be_a_number.message"
                )}`,
                gtzero: `${this.t("limit_price_text.message")}${" "}${this.t(
                  "should_be_greater_than_0.message"
                )}`,
                decimalrestrict8: `${this.t(
                  "limit_price_text.message"
                )}${" "}${this.t("validations:8_decimal_error.message")}`,
              }
            )}
          </TotalWrap>
        </BTCWrap>
        <BTCWrap>
          <Label>{this.t("conversion:total_text.message")}</Label>
          <TotalWrap className="readonly-input">
            <TotInput
              min="0"
              type="number"
              addonAfter={this.state.currency}
              value={precision(this.state.total)}
              name="total"
              readOnly="true"
            />
          </TotalWrap>
        </BTCWrap>
        {Object.keys(this.props.userBal).length > 0 ? (
          this.state.side === "Buy" ? (
            <Pay>
              <Approx>
                <Willpay>
                  {this.t("you_approximate_text.message")}{" "}
                  {this.t("pay_text.message")}
                </Willpay>
                <Willpay2>
                  {precision(buyPayAmt)} {this.state.currency}
                </Willpay2>
              </Approx>
              <Esti>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t(
                      "settings:deactivate_popup_table_head_fiat_value.message"
                    )}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {precision(this.state.fiatCurrencyValue)}{" "}
                    {this.state.fiatCurrency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("estimated_best_price_text.message")}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {precision(buyPayAmt)} {this.state.currency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("conversion:fee_text.message")} {userBalFees} %
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {precision(buyPayAmt - buyEstPrice)} {this.state.crypto} */}
                    {precision(
                      (this.state.amount * this.state.userBalFees) / 100
                    )}{" "}
                    {this.state.crypto}
                  </WillpayBelow2>
                </ApproxBelow>
              </Esti>
            </Pay>
          ) : (
            <Pay>
              <Approx>
                <Willpay>
                  {this.t("you_approximate_text.message")}{" "}
                  {this.t("receive_text.message")}
                </Willpay>
                <Willpay2>
                  {precision(sellEstPrice)} {this.state.currency}
                </Willpay2>
              </Approx>
              <Esti>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t(
                      "settings:deactivate_popup_table_head_fiat_value.message"
                    )}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {precision(this.state.fiatCurrencyValue)}{" "}
                    {this.state.fiatCurrency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("estimated_best_price_text.message")}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {precision(sellPayAmt)} {this.state.currency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("conversion:fee_text.message")} {userBalFees} %
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {precision(sellPayAmt - sellEstPrice)} {this.state.currency} */}
                    {precision(
                      (this.state.total * this.state.userBalFees) / 100
                    )}{" "}
                    {this.state.currency}
                  </WillpayBelow2>
                </ApproxBelow>
              </Esti>
            </Pay>
          )
        ) : (
          ""
        )}
        <ButtonWrap>
          <ButtonETH
            disabled={this.state.disabledMode}
            side={this.state.side}
            onClick={this.onSubmit}
          >
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
        : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default translate([
  "trade",
  "conversion",
  "wallet",
  "validations",
  "history",
  "general_3",
  "tier_changes",
])(connect(mapStateToProps)(Limit));
