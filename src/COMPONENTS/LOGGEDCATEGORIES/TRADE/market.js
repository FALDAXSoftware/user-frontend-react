/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import "antd/dist/antd.css";
import { Row, Col, Radio, notification, Spin } from "antd";
import { translate } from "react-i18next";
import { withRouter } from "react-router-dom";

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
  Approx,
  ApproxBelow,
  WillpayBelow,
  WillpayBelow2,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

/* Components */
import { SpinSingle } from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import { globalVariables } from "Globals.js";
import { precise } from "../../../precision";
import { parse } from "@fortawesome/fontawesome-svg-core";
import CountryAccess from "../../../SHARED-COMPONENTS/CountryAccess";
import { ThirdLabel } from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import CompleteKYC from "../../../SHARED-COMPONENTS/CompleteKYC";
import PanicEnabled from "../../../SHARED-COMPONENTS/PanicEnabled";
import CompleteProfile from "../../../SHARED-COMPONENTS/completeProfile";

let { SOCKET_HOST } = globalVariables;
const API_URL = globalVariables.API_URL;
class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: "Buy",
      crypto: this.props.crypto ? this.props.crypto : "ETH",
      currency: this.props.currency ? this.props.currency : "BTC",
      sellprice: 0.001,
      buyPrice: 0.002,
      amount: "",
      total: 0,
      Loader: false,
      buyPayAmt: 0,
      buyEstPrice: 0,
      sellEstPrice: 0,
      sellPayAmt: 0,
      disabledMode: false,
      disabledInvalidMode: false,
      singlefiatCryptoValue: "",
      singlefiatCurrencyValue: "",
      fiatCryptoValue: "",
      fiatCurrencyValue: 0,
      fiatCurrency: "",
      sellTotal: this.props.sellTotal,
      buyTotal: this.props.buyTotal,
      disabledbtn: false,
      bestAsk: 0,
      bestBid: 0,
      buyMaxValue: 0,
      sellMaxValue: 0,
      completeKYC: false,
      countryAccess: false,
      completeProfile: false,
      panic_status: this.props.panic_status,
    };
    this.t = this.props.t;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.marketAccess = this.marketAccess.bind(this);
    this.walletAccess = this.walletAccess.bind(this);
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

  async marketAccess() {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else if (
      !this.props.profileDetails.is_user_updated &&
      this.props.profileDetails.is_kyc_done != "2"
    ) {
      this.setState({
        completeProfile: true,
      });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        this.setState({ completeKYC: false, countryAccess: false });
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else if (
          this.props.profileDetails.is_allowed === true &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  walletAccess(coin) {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else if (
      !this.props.profileDetails.is_user_updated &&
      this.props.profileDetails.is_kyc_done != "2"
    ) {
      this.setState({
        completeProfile: true,
      });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        this.setState({ completeKYC: false, countryAccess: false });
        this.props.history.push(`/walletDetails?coinID0=${coin}`);
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else if (
          this.props.profileDetails.is_allowed === true &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  componentWillReceiveProps(props, newProps) {
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
    if (props.panic_status && props.panic_status != this.props.panic_status) {
      this.setState({
        panic_status: props.panic_status,
      });
    }
    if (props.userBal && props.userBal != this.props.userBal) {
      this.setState({
        userBalFees: props.userBal.fees,
        amount: "",
        total: 0,
        buyPayAmt: 0,
        sellPayAmt: 0,
        buyEstPrice: 0,
        sellEstPrice: 0,
        disabledBtn: false,
        disabledMode: false,
        disabledInvalidMode: false,
        singlefiatCryptoValue: props.userBal.cryptoFiat,
        singlefiatCurrencyValue: props.userBal.currencyFiat,
      });
    } else {
      this.setState({
        userBalFees: props.userBal.fees,
        disabledBtn: false,
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
  }
  componentDidMount() {
    if (Object.keys(this.props.userBal).length > 0) {
      if (
        Object.keys(this.props.userBal.crypto).length > 0 &&
        Object.keys(this.props.userBal.currency).length > 0
      ) {
        this.setState({
          disabledbtn: false,
          userBalFees: this.props.userBal.fees,
          amount: "",
          total: 0,
          buyPayAmt: 0,
          sellPayAmt: 0,
          buyEstPrice: 0,
          sellEstPrice: 0,
          disabledBtn: false,
          disabledMode: false,
          disabledInvalidMode: false,
          singlefiatCryptoValue: this.props.userBal.cryptoFiat,
          singlefiatCurrencyValue: this.props.userBal.currencyFiat,
        });
      } else {
        this.setState({
          disabledbtn: true,
          userBalFees: this.props.userBal.fees,
          disabledBtn: false,
          singlefiatCryptoValue: this.props.userBal.cryptoFiat,
          singlefiatCurrencyValue: this.props.userBal.currencyFiat,
        });
      }
    }
    if (this.props.io) {
      this.props.io.emit("get-limit-stop-latest", {
        symbol: `${this.state.crypto}-${this.state.currency}`,
      });
      this.props.io.on("get-latest-price", (data) => {
        if (data) {
          this.setState(
            {
              bestAsk: data.askPrice,
              bestBid: data.bidPrice,
              buyMaxValue: data.buyMaximumValue,
              sellMaxValue: data.sellMaximumValue,
            },
            () => {
              if (this.state.amount > 0) {
                if (this.state.side === "Buy") {
                  if (
                    parseFloat(
                      parseFloat(this.state.amount) *
                        parseFloat(this.state.bestAsk)
                    ) > parseFloat(this.props.userBal.currency.placed_balance)
                  ) {
                    this.setState({
                      disabledInvalidMode: false,
                      disabledMode: true,
                    });
                  } else if (
                    parseFloat(this.state.amount) >
                    parseFloat(this.state.buyMaxValue)
                  ) {
                    this.setState({
                      disabledInvalidMode: true,
                      disabledMode: false,
                    });
                  } else if (
                    parseFloat(this.state.amount) >
                      parseFloat(this.state.buyMaxValue) &&
                    parseFloat(
                      parseFloat(this.state.amount) *
                        parseFloat(this.state.bestAsk)
                    ) > parseFloat(this.props.userBal.currency.placed_balance)
                  ) {
                    this.setState({
                      disabledMode: true,
                      disabledInvalidMode: false,
                    });
                  } else {
                    this.setState({
                      disabledInvalidMode: false,
                      disabledMode: false,
                    });
                  }
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
                  if (
                    parseFloat(this.state.amount) >
                    parseFloat(this.props.userBal.crypto.placed_balance)
                  ) {
                    this.setState({
                      disabledInvalidMode: false,
                      disabledMode: true,
                    });
                  } else if (
                    parseFloat(this.state.amount) >
                    parseFloat(this.state.sellMaxValue)
                  ) {
                    this.setState({
                      disabledInvalidMode: true,
                      disabledMode: false,
                    });
                  } else if (
                    parseFloat(this.state.amount) >
                      parseFloat(this.state.sellMaxValue) &&
                    parseFloat(this.state.amount) >
                      parseFloat(this.props.userBal.crypto.placed_balance)
                  ) {
                    this.setState({
                      disabledMode: true,
                      disabledInvalidMode: false,
                    });
                  } else {
                    this.setState({
                      disabledInvalidMode: false,
                      disabledMode: false,
                    });
                  }
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
      // fiatValue: this.props.userBal.cryptoFiat,
      fiatCurrency: "USD",
    });
    //   if (this.state.panic_status === true) {
    //     this.setState({ panicEnabled: true });
    //   } else {
    //     if (
    //       this.props.profileDetails.is_allowed === true &&
    //       this.props.profileDetails.is_kyc_done === 2
    //     ) {
    //       if (this.props.location.pathname !== "/trade")
    //         this.setState({
    //           disabledMode: false
    //         });
    //     } else {
    //       this.setState({
    //         disabledMode: true
    //       });
    //       if (
    //         this.props.profileDetails.is_allowed === false &&
    //         this.props.profileDetails.is_kyc_done !== 2
    //       ) {
    //         this.setState({ completeKYC: true });
    //       } else {
    //         this.setState({ countryAccess: true });
    //       }
    //     }
    //   }
  }
  /*
        Page: /trade --> market
        this method is called for clearing validation messages.
    */
  comingCancel = (e) => {
    this.setState({
      countryAccess: false,
      completeKYC: false,
      panicEnabled: false,
      completeProfile: false,
    });
  };
  clearValidation() {
    this.validator.hideMessages();
    this.forceUpdate();
    // rerender to hide messages for the first time
  }

  /*
        Page: /trade --> market
        this method is called to change BUY/SELL side.
    */

  onChange(e) {
    var self = this;
    let obj = {};
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      fiatCurrencyValue: 0,
    });
    this.clearValidation();
    if (name === "side") {
      obj[name] = value;
      obj["amount"] = "";
      obj["total"] = 0;
      if (e.target.value === "Buy") {
        this.setState({
          fiatCurrencyValue: 0,
          buyPayAmt: 0,
          total: 0,
        });
      } else if (e.target.value === "Sell") {
        this.setState({
          fiatCurrencyValue: 0,
          sellPayAmt: 0,
          total: 0,
        });
      }
    } else {
      obj[name] = parseFloat(value).toFixed(8);
    }
    this.setState(
      {
        ...obj,
      },
      () => {
        obj = {};
        if (this.state.amount > 0) {
          if (this.state.side === "Buy") {
            self.setState({
              // buyPayAmt: Number(this.state.amount) * this.props.userBal.buyPay,
              buyPayAmt:
                parseFloat(this.state.amount) * parseFloat(this.state.bestAsk),
              buyEstPrice:
                Number(this.state.amount) *
                this.props.userBal.buyEstimatedPrice,
            });
            obj["total"] =
              parseFloat(this.state.amount) * parseFloat(this.state.bestAsk);
            if (value > 0 && name === "amount") {
              let fiatValue =
                parseFloat(this.state.singlefiatCurrencyValue) *
                parseFloat(
                  Number(this.state.amount) * parseFloat(this.state.bestAsk)
                ).toFixed(8);
              this.setState({
                // fiatCryptoValue: fiatValue
                fiatCurrencyValue: fiatValue,
              });
            }
            if (
              parseFloat(
                parseFloat(this.state.amount) * parseFloat(this.state.bestAsk)
              ) > parseFloat(this.props.userBal.currency.placed_balance)
            ) {
              this.setState({
                disabledInvalidMode: false,
                disabledMode: true,
              });
            } else if (
              parseFloat(this.state.amount) > parseFloat(this.state.buyMaxValue)
            ) {
              this.setState({
                disabledMode: false,
                disabledInvalidMode: true,
              });
            } else if (
              parseFloat(this.state.amount) >
                parseFloat(this.state.buyMaxValue) &&
              parseFloat(
                parseFloat(this.state.amount) * parseFloat(this.state.bestAsk)
              ) > parseFloat(this.props.userBal.currency.placed_balance)
            ) {
              this.setState({
                disabledInvalidMode: false,
                disabledMode: true,
              });
            } else {
              this.setState({
                disabledInvalidMode: false,
                disabledMode: false,
              });
            }
          } else if (this.state.side === "Sell") {
            self.setState({
              sellPayAmt:
                Number(this.state.amount) * parseFloat(this.state.bestBid),
              sellEstPrice:
                Number(this.state.amount) *
                this.props.userBal.sellEstimatedPrice,
            });
            obj["total"] =
              Number(this.state.amount) * parseFloat(this.state.bestBid);
            // obj["amount"] = Number(this.state.amount).toFixed(3);
            if (value > 0 && name === "amount") {
              // console.log(
              //   "^^^user",
              //   parseFloat(
              //     parseFloat(this.state.amount) *
              //       parseFloat(this.props.userBal.sellPay)
              //   ).toFixed(8)
              // );
              // obj["total"] = parseFloat(
              //   parseFloat(
              //     parseFloat(this.state.amount) *
              //       parseFloat(this.props.userBal.sellPay)
              //   ).toFixed(8)
              // ).toString();
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
            if (
              parseFloat(this.state.amount) >
              parseFloat(this.props.userBal.crypto.placed_balance)
            ) {
              this.setState({
                disabledInvalidMode: false,
                disabledMode: true,
              });
            } else if (
              parseFloat(this.state.amount) >
              parseFloat(this.state.sellMaxValue)
            ) {
              this.setState({
                disabledInvalidMode: true,
                disabledMode: false,
              });
            } else if (
              parseFloat(this.state.amount) >
                parseFloat(this.state.sellMaxValue) &&
              parseFloat(this.state.amount) >
                parseFloat(this.props.userBal.crypto.placed_balance)
            ) {
              this.setState({
                disabledMode: true,
                disabledInvalidMode: false,
              });
            } else {
              this.setState({
                disabledInvalidMode: false,
                disabledMode: false,
              });
            }
          }
        } else {
          obj["total"] = 0;
          if (this.state.side === "Buy") {
            this.setState({
              buyPayAmt: 0,
              total: 0,
              fiatCurrencyValue: 0,
              disabledMode: false,
              disabledInvalidMode: false,
            });
          } else {
            this.setState({
              sellPayAmt: 0,
              total: 0,
              fiatCurrencyValue: 0,
              disabledMode: false,
              disabledInvalidMode: false,
            });
          }
        }
        self.setState({ ...obj });
      }
    );
  }

  /*
        Page: /trade --> market
        this method is called for cutom notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }

  /*
        Page: /trade --> market
        this method is called when u submit form to BUY/SELL.
    */

  onSubmit() {
    var self = this;
    this.marketAccess();
    if (
      this.validator.allValid() &&
      !this.state.completeKYC &&
      !this.state.completeProfile &&
      !this.state.completeProfile
    ) {
      let params = {
        symbol:
          self.state.crypto.toUpperCase() +
          "-" +
          self.state.currency.toUpperCase(),
        side: self.state.side,
        order_type: "Market",
        orderQuantity: self.state.amount,
      };
      self.setState({ Loader: true });
      fetch(
        SOCKET_HOST +
          `/api/v1/tradding/orders/market-${self.state.side.toLowerCase()}-create/`,
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
          this.setState(
            {
              Loader: false,
              total: 0,
              amount: "",
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
          if (responseData.status === 200) {
            self.openNotificationWithIcon(
              "success",
              this.t("validations:success_text.message"),
              responseData.message
            );
          } else if (responseData.status === 201) {
            self.openNotificationWithIcon(
              "warning",
              this.t("validations:warning_text.message"),
              responseData.message
            );
          } else if (responseData.status === 500) {
            self.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.message
            );
          } else {
            self.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.err
            );
          }
          this.setState({
            Loader: false,
          });
        })
        .catch((error) => {
          self.openNotificationWithIcon(
            "error",
            self.t("validations:error_text.message"),
            self.t("tier_changes:something_went_wrong_text.message")
          );
          self.setState(
            {
              Loader: false,
              total: 0,
              amount: "",
              buyPayAmt: 0,
              sellPayAmt: 0,
              buyEstPrice: 0,
              sellEstPrice: 0,
            },
            () => {
              if (self.state.side === "Buy") {
                self.setState({
                  fiatCurrencyValue: 0,
                });
              } else if (self.state.side === "Sell") {
                self.setState({
                  fiatCurrencyValue: 0,
                });
              }
            }
          );
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const {
      buyPayAmt,
      buyEstPrice,
      sellEstPrice,
      sellPayAmt,
      amount,
    } = this.state;
    const RadioGroup = Radio.Group;
    let stepValue;
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
                  <a
                    onClick={() => {
                      this.walletAccess(this.props.cryptoCode);
                    }}
                    disabled={this.props.userBal.cryptoinactive}
                    className={
                      this.props.userBal.cryptoinactive ? "inactive" : ""
                    }
                    //  href={`/walletDetails?coinID0=${this.props.cryptoCode}`}
                  >
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
                  <a
                    onClick={() => {
                      this.walletAccess(this.props.currencyCode);
                    }}
                    disabled={this.props.userBal.currencyinactive}
                    className={
                      this.props.userBal.currencyinactive ? "inactive" : ""
                    }
                    // href={`/walletDetails?coinID0=${this.props.currencyCode}`}
                  >
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
              placeholder="0"
              name="amount"
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
                {this.t("tier_changes:insufficient_balance_text.message")}
              </div>
            ) : this.state.disabledInvalidMode ? (
              <div className="trade-action-validation">
                {this.t("tier_changes:invalid_order_quantity_text.message")}
              </div>
            ) : (
              ""
            )}
            {/* {this.state.disabledInvalidMode ? (
              <div className="trade-action-validation">
                {this.t("tier_changes:invalid_order_quantity_text.message")}
              </div>
            ) : (
              ""
            )} */}
          </TotalWrap>
        </ETHWrap>
        <BTCWrap>
          <Label>{this.t("conversion:total_text.message")}</Label>
          <TotalWrap className="readonly-input">
            <TotInput
              min="0"
              readOnly="true"
              type="number"
              addonAfter={this.state.currency}
              // value={this.state.total.toFixed(8)}
              value={precise(this.state.total, this.props.pricePrecision)}
              // value={this.state.total.toPrecise(8)}
              name="total"
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
                  {/* {buyPayAmt.toFixed(8)} {this.state.currency} */}
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
                    {/* {parseFloat(this.state.fiatCurrencyValue).toFixed(8)}{" "} */}
                    {precise(this.state.fiatCurrencyValue, "2")}{" "}
                    {this.state.fiatCurrency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("estimated_best_price_text.message")}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {buyPayAmt.toFixed(8)} {this.state.currency} */}
                    {precise(buyPayAmt, this.props.pricePrecision)}{" "}
                    {this.state.currency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("conversion:fee_text.message")}{" "}
                    {this.state.userBalFees} %
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {console.log(
                      "buyPayAmt - buyEstPrice %%%",
                      amount,
                      (amount * this.state.userBalFees) / 100
                    )} */}
                    {/* {(buyPayAmt - buyEstPrice).toFixed(8)} {this.state.crypto} */}
                    {/* {precision(buyPayAmt - buyEstPrice)} {this.state.crypto} */}
                    {/* {precise(
                      (amount * this.state.userBalFees) / 100,
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
                  {/* {sellEstPrice.toFixed(8)} {this.state.currency} */}
                  {precise(sellPayAmt, this.props.pricePrecision)}{" "}
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
                    {/* {parseFloat(this.state.fiatCurrencyValue).toFixed(8)}{" "} */}
                    {precise(this.state.fiatCurrencyValue, "2")}{" "}
                    {this.state.fiatCurrency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("estimated_best_price_text.message")}
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {sellPayAmt.toFixed(8)} {this.state.currency} */}
                    {precise(sellEstPrice, this.props.pricePrecision)}{" "}
                    {this.state.currency}
                  </WillpayBelow2>
                </ApproxBelow>
                <ApproxBelow>
                  <WillpayBelow>
                    {this.t("conversion:fee_text.message")}{" "}
                    {this.state.userBalFees} %
                  </WillpayBelow>
                  <WillpayBelow2>
                    {/* {console.log(
                      "sellPayAmt - sellEstPrice %%%",
                      sellPayAmt,
                      sellEstPrice
                    )} */}
                    {/* {(sellPayAmt - sellEstPrice).toFixed(8)}{" "} */}
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
            disabled={
              this.state.disabledMode ||
              this.state.disabledbtn ||
              this.state.disabledInvalidMode
            }
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
        <CompleteKYC
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.completeKYC}
        />
        <PanicEnabled
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.panicEnabled}
        />
        <CompleteProfile
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.completeProfile}
        />
        {this.state.Loader === true ? (
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
])(connect(mapStateToProps)(withRouter(Market)));
