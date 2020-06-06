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
import { precise } from "../../../precision";
import CountryAccess from "../../../SHARED-COMPONENTS/CountryAccess";

let { SOCKET_HOST } = globalVariables;

class Limit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: "Buy",
      crypto: this.props.crypto ? this.props.crypto : "ETH",
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
      disabledbtn: false,
      bestAsk: 0,
      bestBid: 0,
      maxValue: 0,
      illegalbtn: false,
      countryAccess: false,
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
    console.log("^^^Test Did mount limit");
    if (!this.props.walletIsAllowed) {
      this.setState({
        illegalbtn: true,
      });
    } else {
      this.setState({
        illegalbtn: false,
      });
    }
    if (Object.keys(this.props.userBal).length > 0) {
      if (
        Object.keys(this.props.userBal.crypto).length > 0 &&
        Object.keys(this.props.userBal.currency).length > 0
      ) {
        this.setState({
          disabledbtn: false,
        });
      } else {
        this.setState({
          disabledbtn: true,
        });
      }
    }
    if (this.props.io) {
      console.log("^^^Test Did mount limit props");
      this.props.io.emit("get-limit-stop-latest", {
        symbol: `${this.state.crypto}-${this.state.currency}`,
      });
      this.props.io.on("get-latest-price", (data) => {
        console.log("^^^^^Test Data%%%%", data);
        if (data) {
          this.setState(
            {
              bestAsk: data.askPrice,
              bestBid: data.bidPrice,
              // maxValue: data.maximumValue,
            },
            () => {
              if (this.state.amount > 0) {
                if (this.state.side === "Buy") {
                  // if (
                  //   parseFloat(this.state.amount) >
                  //   parseFloat(this.state.maxValue)
                  // ) {
                  //   this.setState({
                  //     disabledMode: true,
                  //   });
                  // } else {
                  //   this.setState({
                  //     disabledMode: false,
                  //   });
                  // }
                  this.setState({
                    buyPayAmt:
                      parseFloat(this.state.amount) *
                      parseFloat(this.state.bestAsk),
                    total:
                      parseFloat(this.state.amount) *
                      parseFloat(this.state.bestAsk),
                    fiatCurrencyValue:
                      parseFloat(this.state.singlefiatCurrencyValue) *
                      parseFloat(
                        Number(this.state.amount) *
                          parseFloat(this.state.bestAsk)
                      ).toFixed(8),
                  });
                } else {
                  this.setState({
                    sellPayAmt:
                      Number(this.state.amount) *
                      parseFloat(this.state.bestBid),
                    total:
                      parseFloat(this.state.amount) *
                      parseFloat(this.state.bestBid),
                    fiatCurrencyValue:
                      parseFloat(this.state.singlefiatCurrencyValue) *
                      parseFloat(
                        Number(this.state.amount) *
                          parseFloat(this.state.bestBid)
                      ).toFixed(8),
                  });
                }
              } else {
                if (this.state.side === "Buy") {
                  this.setState({
                    buyPayAmt: 0,
                    total: 0,
                    fiatCurrencyValue: 0,
                  });
                } else {
                  this.setState({
                    sellPayAmt: 0,
                    total: 0,
                    fiatCurrencyValue: 0,
                  });
                }
              }
            }
          );
        }
      });
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
      singlefiatCryptoValue: this.props.userBal.cryptoFiat,
      singlefiatCurrencyValue: this.props.userBal.currencyFiat,
    });
  }
  componentWillReceiveProps(props, newProps) {
    if (!props.walletIsAllowed) {
      this.setState({
        illegalbtn: true,
      });
    } else {
      this.setState({
        illegalbtn: false,
      });
    }
    if (Object.keys(props.userBal).length > 0) {
      if (
        Object.keys(props.userBal.crypto).length > 0 &&
        Object.keys(props.userBal.currency).length > 0
      ) {
        this.setState({
          disabledbtn: false,
        });
      } else {
        this.setState({
          disabledbtn: true,
        });
      }
    }

    if (props.userBal && props.userBal != this.props.userBal) {
      this.setState({
        amount: "",
        total: 0,
        limit_price: "",
        userBalFees: props.userBal.fees,
        singlefiatCryptoValue: props.userBal.cryptoFiat,
        singlefiatCurrencyValue: props.userBal.currencyFiat,
        disabledMode: false,
      });
    } else {
      this.setState({
        userBalFees: props.userBal.fees,
        singlefiatCryptoValue: props.userBal.cryptoFiat,
        singlefiatCurrencyValue: props.userBal.currencyFiat,
      });
    }

    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState({ crypto: props.cryptoPair.crypto });
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState({ currency: props.cryptoPair.currency });
      }
    }
    // if (props.sellTotal && props.sellTotal != this.props.sellTotal) {
    //   this.setState(
    //     {
    //       sellTotal: props.sellTotal,
    //     },
    //     () => {
    //       if (
    //         this.state.side === "Buy" &&
    //         !this.state.loader &&
    //         parseFloat(this.state.amount) > parseFloat(this.state.sellTotal)
    //       ) {
    //         this.setState({
    //           disabledMode: true,
    //         });
    //       } else {
    //         this.setState({
    //           disabledMode: false,
    //         });
    //       }
    //     }
    //   );
    // }
    // if (props.buyTotal && props.buyTotal != this.props.buyTotal) {
    //   this.setState(
    //     {
    //       buyTotal: props.buyTotal,
    //     },
    //     () => {
    //       if (
    //         this.state.side === "Sell" &&
    //         !this.state.loader &&
    //         parseFloat(this.state.amount) > parseFloat(this.state.buyTotal)
    //       ) {
    //         this.setState({
    //           disabledMode: true,
    //         });
    //       } else {
    //         this.setState({
    //           disabledMode: false,
    //         });
    //       }
    //     }
    //   );
    // }
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
  comingCancel = (e) => {
    this.setState({
      countryAccess: false,
    });
  };
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
              Number(this.state.amount) * parseFloat(this.state.bestAsk);
            if (
              // parseFloat(this.state.amount) > parseFloat(this.state.maxValue) ||
              parseFloat(
                parseFloat(this.state.amount) * parseFloat(this.state.bestAsk)
              ) > parseFloat(this.props.userBal.currency.placed_balance)
            ) {
              self.setState({
                disabledMode: true,
              });
            } else {
              self.setState({
                disabledMode: false,
              });
            }
            self.setState({
              buyPayAmt:
                Number(this.state.amount) * parseFloat(this.state.bestAsk),
              buyEstPrice:
                Number(this.state.amount) *
                this.props.userBal.buyEstimatedPrice,
            });
            let fiatValue =
              parseFloat(this.state.singlefiatCurrencyValue) *
              parseFloat(
                Number(this.state.amount) * parseFloat(this.state.bestAsk)
              ).toFixed(8);
            this.setState({
              fiatCurrencyValue: fiatValue,
            });
          } else if (this.state.side === "Sell") {
            if (this.validator.allValid()) {
              this.validator.hideMessages();
            }
            if (value > 0 && name === "amount") {
              if (
                // parseFloat(this.state.amount) >
                //   parseFloat(this.state.maxValue) ||
                parseFloat(this.state.amount) >
                parseFloat(this.props.userBal.crypto.placed_balance)
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
            self.setState({
              sellPayAmt:
                Number(this.state.amount) * parseFloat(this.state.bestBid),
              sellEstPrice:
                Number(this.state.amount) *
                parseFloat(this.props.userBal.sellEstimatedPrice),
            });
            obj["total"] =
              Number(this.state.amount) * parseFloat(this.state.bestBid);
            let fiatValue =
              parseFloat(this.state.singlefiatCurrencyValue) *
              parseFloat(
                Number(this.state.amount) * parseFloat(this.state.bestBid)
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
                  Number(this.state.amount) * parseFloat(this.state.bestAsk)
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
                  Number(this.state.amount) * this.state.bestBid
                ).toFixed(8);
              this.setState({
                fiatCurrencyValue: fiatValue,
              });
            }
          }
        } else if (this.state.amount > 0) {
          console.log("^^^^Testdatalimit", this.state.amount);
          if (this.state.side === "Buy") {
            if (value > 0 && name === "amount") {
              if (
                // parseFloat(this.state.amount) >
                //   parseFloat(this.state.maxValue) ||
                parseFloat(
                  parseFloat(this.state.amount) * parseFloat(this.state.bestAsk)
                ) > parseFloat(this.props.userBal.currency.placed_balance)
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
              if (
                // parseFloat(this.state.amount) >
                //   parseFloat(this.state.maxValue) ||
                parseFloat(this.state.amount) >
                parseFloat(this.props.userBal.crypto.placed_balance)
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
    if (this.state.illegalbtn) {
      this.setState({
        countryAccess: true,
      });
    } else {
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
    let stepValue, limitPrecision;
    switch (this.props.qtyPrecision.toString()) {
      case "0":
        stepValue = "1";
        break;
      case "1":
        stepValue = "0.1";
        break;
      case "2":
        stepValue = "0.01";
        break;
      case "3":
        stepValue = "0.001";
        break;
      case "4":
        stepValue = "0.0001";
        break;
      case "5":
        stepValue = "0.00001";
        break;
      case "6":
        stepValue = "0.000001";
        break;
      case "7":
        stepValue = "0.0000001";
      case "8":
        stepValue = "0.00000001";
        break;
      default:
        break;
    }
    switch (this.props.pricePrecision.toString()) {
      case "0":
        limitPrecision = "1";
        break;
      case "1":
        limitPrecision = "0.1";
        break;
      case "2":
        limitPrecision = "0.01";
        break;
      case "3":
        limitPrecision = "0.001";
        break;
      case "4":
        limitPrecision = "0.0001";
        break;
      case "5":
        limitPrecision = "0.00001";
        break;
      case "6":
        limitPrecision = "0.000001";
        break;
      case "7":
        limitPrecision = "0.0000001";
      case "8":
        limitPrecision = "0.00000001";
        break;
      default:
        break;
    }
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
          Object.keys(this.props.userBal.crypto).length > 0 &&
          Object.keys(this.props.userBal.currency).length > 0 ? (
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
                              ? `${precise(
                                  this.props.userBal.currency.placed_balance,
                                  this.props.pricePrecision
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
                              ? `${precise(
                                  this.props.userBal.currency.balance,
                                  this.props.pricePrecision
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
                              ? `${precise(
                                  Math.abs(
                                    this.props.userBal.currency.balance -
                                      this.props.userBal.currency.placed_balance
                                  ),
                                  this.props.pricePrecision
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
                          {precise(
                            this.state.bestAsk,
                            this.props.pricePrecision
                          )}{" "}
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
                              ? `${precise(
                                  this.props.userBal.crypto.placed_balance,
                                  this.props.pricePrecision
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
                              ? `${precise(
                                  this.props.userBal.crypto.balance,
                                  this.props.pricePrecision
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
                              ? `${precise(
                                  Math.abs(
                                    this.props.userBal.crypto.balance -
                                      this.props.userBal.crypto.placed_balance
                                  ),
                                  this.props.pricePrecision
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
                          {precise(
                            this.state.bestBid,
                            this.props.pricePrecision
                          )}{" "}
                          {this.state.currency}
                        </Balance>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </BalanceWrap>
            )
          ) : (
            <div>
              {!Object.keys(this.props.userBal.crypto).length > 0 ? (
                <BTCWrap className="no_wallet">
                  <span>
                    {this.t("general_3:dont_have_text.message")}{" "}
                    {this.props.cryptoName}{" "}
                    {this.t("header:navbar_menu_wallet.message")}?
                  </span>
                  <a href={`/walletDetails?coinID0=${this.props.cryptoCode}`}>
                    {this.t("general_3:generate_wallet_text.message")}
                  </a>
                </BTCWrap>
              ) : (
                ""
              )}
              {!Object.keys(this.props.userBal.currency).length > 0 ? (
                <BTCWrap className="no_wallet">
                  <span>
                    {this.t("general_3:dont_have_text.message")}{" "}
                    {this.props.currencyName}{" "}
                    {this.t("header:navbar_menu_wallet.message")}?
                  </span>
                  <a href={`/walletDetails?coinID0=${this.props.currencyCode}`}>
                    {this.t("general_3:generate_wallet_text.message")}
                  </a>
                </BTCWrap>
              ) : (
                ""
              )}
            </div>
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
              step={stepValue}
              addonAfter={this.state.crypto}
              value={precise(this.state.amount, this.props.qtyPrecision)}
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
              step={limitPrecision}
              type="number"
              placeholder="0"
              addonAfter={this.state.currency}
              value={precise(this.state.limit_price, this.props.pricePrecision)}
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
              value={precise(this.state.total, this.props.pricePrecision)}
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
                  {precise(buyPayAmt, this.props.pricePrecision)}{" "}
                  {this.state.currency}
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
                    {precise(this.state.fiatCurrencyValue, "2")}{" "}
                    {this.state.fiatCurrency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("estimated_best_price_text.message")}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {precise(buyPayAmt, this.props.pricePrecision)}{" "}
                    {this.state.currency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("conversion:fee_text.message")} {userBalFees} %
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {precision(buyPayAmt - buyEstPrice)} {this.state.crypto} */}
                    {/* {precise(
                      (this.state.amount * this.state.userBalFees) / 100,
                      this.props.pricePrecision
                    )}{" "}
                    {this.state.crypto} */}
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
                  {precise(sellEstPrice, this.props.pricePrecision)}{" "}
                  {this.state.currency}
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
                    {precise(this.state.fiatCurrencyValue, "2")}{" "}
                    {this.state.fiatCurrency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("estimated_best_price_text.message")}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {precise(sellEstPrice, this.props.pricePrecision)}{" "}
                    {this.state.currency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("conversion:fee_text.message")} {userBalFees} %
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {precision(sellPayAmt - sellEstPrice)} {this.state.currency} */}
                    {/* {precise(
                      (this.state.total * this.state.userBalFees) / 100,
                      this.props.pricePrecision
                    )}{" "}
                    {this.state.currency} */}
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
            disabled={this.state.disabledMode || this.state.disabledbtn}
            side={this.state.side}
            onClick={this.onSubmit}
          >
            {`${this.state.side.toUpperCase()} ${" "} ${this.state.crypto}`}
          </ButtonETH>
        </ButtonWrap>
        <CountryAccess
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.countryAccess}
        />
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
  "header",
])(connect(mapStateToProps)(Limit));
