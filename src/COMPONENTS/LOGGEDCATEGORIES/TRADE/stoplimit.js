/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import "antd/dist/antd.css";
import { Row, Col, Radio, notification, Spin, Icon } from "antd";
import { translate } from "react-i18next";
import { withRouter, Link } from "react-router-dom";

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
  ButtonETH,
  FlexWrapDiv,
  TriggerDiv,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import {
  Approx,
  ApproxBelow,
  WillpayBelow,
  WillpayBelow2,
} from "../../../STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import { precise } from "../../../precision";
import CountryAccess from "../../../SHARED-COMPONENTS/CountryAccess";
import CompleteKYC from "../../../SHARED-COMPONENTS/CompleteKYC";
import PanicEnabled from "../../../SHARED-COMPONENTS/PanicEnabled";
import CompleteProfile from "../../../SHARED-COMPONENTS/completeProfile";
import TrialTierUpgrade from "../../../SHARED-COMPONENTS/trailTierUpgrade";

// let { API_URL } = globalVariables;
let { SOCKET_HOST } = globalVariables;
class StopLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: "Buy",
      crypto: this.props.crypto ? this.props.crypto : "XRP",
      currency: this.props.currency ? this.props.currency : "BTC",
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
      loader: false,
      singlefiatCryptoValue: "",
      singlefiatCurrencyValue: "",
      fiatCryptoValue: "",
      fiatCurrencyValue: 0,
      fiatCurrency: "",
      latestFillPrice: "",
      disabledBtn: false,
      sellTotal: 0,
      buyTotal: 0,
      disabledMode: false,
      disabledBtnMode: false,
      bestAsk: 0,
      bestBid: 0,
      maxValue: 0,
      minCryptoValue: 0,
      disabledCryptoMode: false,
      completeKYC: false,
      countryAccess: false,
      completeProfile: false,
      panic_status: this.props.panic_status,
      tradeLimit: 0,
      tradeLimitLeft: 0,
      tradeLimitLeftAfter: 0,
      tradeLimitFlag: false,
      trialTierUpgrade: false,
      tradeDaysCompleted: false,
      freeTierDays: "",
      showTierOne: false,
      tier0Inactive: false,
    };
    this.timeout = null;
    this.t = this.props.t;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.marketAccess = this.marketAccess.bind(this);
    this.walletAccess = this.walletAccess.bind(this);
    this.emitAmount = this.emitAmount.bind(this);
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

  /*Life Cycle Methods  */
  async marketAccess() {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else if (this.props.profileDetails.is_tier_enabled) {
      if (this.props.profileDetails.is_user_updated) {
        if (this.props.profileDetails.legal_allowed) {
        } else {
          await this.setState({ countryAccess: true });
        }
      } else {
        this.setState({
          completeProfile: true,
        });
      }
    } else if (
      !this.props.profileDetails.is_tier_enabled &&
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
    } else if (this.props.profileDetails.is_tier_enabled) {
      if (this.props.profileDetails.is_user_updated) {
        if (this.props.profileDetails.legal_allowed) {
          this.props.history.push(`/walletDetails?coinID0=${coin}`);
        } else {
          this.setState({ countryAccess: true });
        }
      } else {
        this.setState({
          completeProfile: true,
        });
      }
    } else if (
      !this.props.profileDetails.is_user_updated &&
      !this.props.profileDetails.is_tier_enabled &&
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
  componentDidMount() {
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
          disabledBtnMode: false,
        });
      } else {
        this.setState({
          disabledBtnMode: true,
        });
      }
    }
    let fiat, currency;
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
              latestFillPrice: data.lastPrice,
              minCryptoValue: data.minimumValue,
            },
            () => {
              this.emitAmount();
              if (this.state.amount > 0) {
                if (this.state.side === "Buy") {
                  if (
                    parseFloat(this.state.amount) <
                    parseFloat(this.state.minCryptoValue)
                  ) {
                    this.setState({
                      disabledCryptoMode: true,
                    });
                  } else {
                    this.setState({
                      disabledCryptoMode: false,
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
                    parseFloat(this.state.amount) <
                    parseFloat(this.state.minCryptoValue)
                  ) {
                    this.setState({
                      disabledCryptoMode: true,
                    });
                  } else {
                    this.setState({
                      disabledCryptoMode: false,
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
                    sellEstPrice: 0,
                  });
                }
              }
              if (this.state.stop_price > 0) {
                if (this.state.side === "Buy") {
                  if (
                    parseFloat(this.state.stop_price) >
                    parseFloat(this.state.latestFillPrice)
                  ) {
                    this.setState({
                      disabledBtn: false,
                    });
                  } else {
                    this.setState({
                      disabledBtn: true,
                    });
                  }
                } else {
                  if (
                    parseFloat(this.state.stop_price) <
                    parseFloat(this.state.latestFillPrice)
                  ) {
                    this.setState({
                      disabledBtn: false,
                    });
                  } else {
                    this.setState({
                      disabledBtn: true,
                    });
                  }
                }
              } else {
                this.setState({
                  disabledBtn: false,
                });
              }
            }
          );
        } else {
          this.setState({
            latestFillPrice: "",
            disabledBtn: false,
          });
        }
      });
      this.props.io.emit("tier-0-trade-limit", {
        amount: 0,
        crypto: this.state.crypto,
        symbol: `${this.state.crypto}-${this.state.currency}`,
        user_id: this.props.profileDetails.id,
      });
      this.props.io.on("trade-user-limit-availability", (data) => {
        if (data) {
          if (data.account_tier_flag && data.response_flag && data.tier_flag) {
            this.setState({
              trialTierUpgrade: true,
              freeTierDays: data.days,
              showTierOne: true,
              tier0Inactive: false,
            });
          } else if (data.account_tier_flag && data.tier_flag == false) {
            this.setState({
              showTierOne: false,
              tier0Inactive: true,
            });
          } else if (!data.account_tier_flag) {
            this.setState({
              showTierOne: false,
              tier0Inactive: false,
            });
          }
          if (data.valueObject) {
            this.setState(
              {
                tradeLimit: data.valueObject.available_trade_limit_actual
                  ? data.valueObject.available_trade_limit_actual
                  : "0",
                tradeLimitLeft: data.valueObject.current_left_limit
                  ? data.valueObject.current_left_limit
                  : "0",
                tradeLimitLeftAfter: data.valueObject.amount_left_after_trade
                  ? data.valueObject.amount_left_after_trade
                  : "0",
                tradeLimitFlag: !data.leftFlag,
                tradeDaysCompleted: data.response_flag,
                showTierOne: true,
                tier0Inactive: false,
              },
              () => {
                if (this.state.tradeDaysCompleted) {
                  this.setState({
                    trialTierUpgrade: true,
                  });
                } else {
                  this.setState({
                    trialTierUpgrade: false,
                  });
                }
              }
            );
          }
        }
      });
    }
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
      userBalFees: this.props.userBal.fees,
      amount: "",
      total: 0,
      limit_price: "",
      stop_price: "",
      buyEstPrice: 0,
      sellEstPrice: 0,
      sellPayAmt: 0,
      buyPayAmt: 0,
      fiatCurrency: "USD",
      singlefiatCryptoValue: this.props.userBal.cryptoFiat,
      singlefiatCurrencyValue: this.props.userBal.currencyFiat,
    });
  }

  componentWillReceiveProps(props, newProps) {
    if (Object.keys(props.userBal).length > 0) {
      if (
        Object.keys(props.userBal.crypto).length > 0 &&
        Object.keys(props.userBal.currency).length > 0
      ) {
        this.setState({
          disabledBtnMode: false,
        });
      } else {
        this.setState({
          disabledBtnMode: true,
        });
      }
    }
    if (!props.walletIsAllowed) {
      this.setState({
        illegalbtn: true,
      });
    } else {
      this.setState({
        illegalbtn: false,
      });
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
        limit_price: "",
        stop_price: "",
        buyEstPrice: 0,
        sellEstPrice: 0,
        sellPayAmt: 0,
        buyPayAmt: 0,
        singlefiatCryptoValue: props.userBal.cryptoFiat,
        singlefiatCurrencyValue: props.userBal.currencyFiat,
        disabledMode: false,
        disabledCryptoMode: false,
      });
    } else {
      this.setState({
        userBalFees: props.userBal.fees,
        singlefiatCryptoValue: props.userBal.cryptoFiat,
        singlefiatCurrencyValue: props.userBal.currencyFiat,
      });
    }
    if (props.crypto && props.crypto !== this.props.crypto) {
      this.setState({ crypto: props.crypto }, () => {
        this.emitAmount();
      });
    }
    if (props.currency && props.currency !== this.props.currency) {
      this.setState({ currency: props.currency }, () => {
        this.emitAmount();
      });
    }
    // if (
    //   props.latestFillPrice &&
    //   props.latestFillPrice != this.props.latestFillPrice
    // ) {
    //   this.setState(
    //     {
    //       disabledBtn: false,
    //       latestFillPrice: props.latestFillPrice,
    //     },
    //     () => {
    //       if (this.state.stop_price > 0) {
    //         if (this.state.side === "Buy") {
    //           if (
    //             parseFloat(this.state.stop_price) >
    //             parseFloat(this.state.latestFillPrice)
    //           ) {
    //             this.setState({
    //               disabledBtn: false,
    //             });
    //           } else {
    //             this.setState({
    //               disabledBtn: true,
    //             });
    //           }
    //         } else {
    //           if (
    //             parseFloat(this.state.stop_price) <
    //             parseFloat(this.state.latestFillPrice)
    //           ) {
    //             this.setState({
    //               disabledBtn: false,
    //             });
    //           } else {
    //             this.setState({
    //               disabledBtn: true,
    //             });
    //           }
    //         }
    //       } else {
    //         this.setState({
    //           disabledBtn: false,
    //         });
    //       }
    //     }
    //   );
    // } else {
    //   this.setState({
    //     latestFillPrice: this.props.latestFillPrice,
    //     disabledBtn: false,
    //   });
    // }
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
  comingCancel = (e) => {
    this.setState({
      countryAccess: false,
      completeKYC: false,
      panicEnabled: false,
      completeProfile: false,
      trialTierUpgrade: false,
    });
  };
  emitAmount() {
    this.props.io.emit("tier-0-trade-limit", {
      amount: this.state.amount ? parseFloat(this.state.amount) : 0,
      crypto: this.state.crypto,
      symbol: `${this.state.crypto}-${this.state.currency}`,
      user_id: this.props.profileDetails.id,
    });
  }
  onChange(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.emitAmount();
    }, 1500);
    var self = this;
    let obj = {};
    let name = e.target.name;
    let value = e.target.value;
    if (name === "side") {
      obj[name] = value;
      obj["amount"] = "";
      obj["total"] = 0;
      obj["limit_price"] = "";
      obj["stop_price"] = "";
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
      this.emitAmount();
      this.setState({
        tradeLimit: 0,
        tradeLimitLeft: 0,
        tradeLimitLeftAfter: 0,
      });
    } else {
      obj[name] = parseFloat(value).toFixed(8);
    }
    this.setState(
      {
        ...obj,
      },
      () => {
        obj = {};
        if (this.state.stop_price > 0) {
          if (this.state.side === "Buy") {
            if (
              parseFloat(this.state.stop_price) >
              parseFloat(this.state.latestFillPrice)
            ) {
              this.setState({
                disabledBtn: false,
              });
            } else {
              this.setState({
                disabledBtn: true,
              });
            }
          } else {
            if (
              parseFloat(this.state.stop_price) <
              parseFloat(this.state.latestFillPrice)
            ) {
              this.setState({
                disabledBtn: false,
              });
            } else {
              this.setState({
                disabledBtn: true,
              });
            }
          }
        }
        if (this.state.amount >= 0 && this.state.stop_price > 0) {
          if (this.state.side === "Buy") {
            if (this.validator.allValid()) {
              this.validator.hideMessages();
            }
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
            obj["total"] = this.state.amount * parseFloat(this.state.bestAsk);
            self.setState({
              buyPayAmt: this.state.amount * parseFloat(this.state.bestAsk),
              buyEstPrice:
                this.state.amount * this.props.userBal.buyEstimatedPrice,
            });
            let fiatValue =
              parseFloat(this.state.singlefiatCurrencyValue) *
              parseFloat(
                this.state.amount * parseFloat(this.state.bestAsk)
              ).toFixed(8);
            this.setState({
              fiatCurrencyValue: fiatValue,
            });
          } else if (this.state.side === "Sell") {
            if (this.validator.allValid()) {
              this.validator.hideMessages();
            }
            if (
              // parseFloat(this.state.amount) > parseFloat(this.state.maxValue) ||
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
            obj["total"] = this.state.amount * parseFloat(this.state.bestBid);
            self.setState({
              sellPayAmt: this.state.amount * parseFloat(this.state.bestBid),
              sellEstPrice:
                this.state.amount *
                parseFloat(this.props.userBal.sellEstimatedPrice),
            });
            let fiatValue =
              parseFloat(this.state.singlefiatCurrencyValue) *
              parseFloat(
                this.state.amount * parseFloat(this.state.bestBid)
              ).toFixed(8);
            this.setState({
              fiatCurrencyValue: fiatValue,
            });
          }
          if (this.state.side === "Buy") {
            if (value > 0 && name === "amount") {
              let fiatValue =
                parseFloat(this.state.singlefiatCurrencyValue) *
                parseFloat(
                  this.state.amount * parseFloat(this.state.bestAsk)
                ).toFixed(8);
              this.setState({
                fiatCurrencyValue: fiatValue,
              });
            } else if (value == 0 && name === "amount") {
              this.setState({
                fiatCurrencyValue: 0,
              });
            }
          } else if (this.state.side === "Sell") {
            if (value > 0 && name === "amount") {
              let fiatValue =
                parseFloat(this.state.singlefiatCurrencyValue) *
                parseFloat(
                  this.state.amount * parseFloat(this.state.bestBid)
                ).toFixed(8);
              this.setState({
                fiatCurrencyValue: fiatValue,
              });
            } else if (value == 0 && name === "amount") {
              this.setState({
                fiatCurrencyValue: 0,
              });
            }
          }
        } else if (this.state.amount > 0) {
          if (this.state.side === "Buy") {
            if (value > 0 && name === "amount") {
              if (
                parseFloat(this.state.amount) <
                parseFloat(this.state.minCryptoValue)
              ) {
                self.setState({
                  disabledMode: false,
                  disabledCryptoMode: true,
                });
              } else if (
                parseFloat(
                  parseFloat(this.state.amount) * parseFloat(this.state.bestAsk)
                ) > parseFloat(this.props.userBal.currency.placed_balance)
              ) {
                self.setState({
                  disabledMode: true,
                  disabledCryptoMode: false,
                });
              } else {
                self.setState({
                  disabledMode: false,
                  disabledCryptoMode: false,
                });
              }
            }
          } else if (this.state.side === "Sell") {
            if (value > 0 && name === "amount") {
              if (
                parseFloat(this.state.amount) <
                parseFloat(this.state.minCryptoValue)
              ) {
                self.setState({
                  disabledMode: false,
                  disabledCryptoMode: true,
                });
              } else if (
                parseFloat(this.state.amount) >
                parseFloat(this.props.userBal.crypto.placed_balance)
              ) {
                self.setState({
                  disabledMode: true,
                  disabledCryptoMode: false,
                });
              } else {
                self.setState({
                  disabledMode: false,
                  disabledCryptoMode: false,
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
              disabledBtn: false,
              disabledCryptoMode: false,
            });
          } else if (this.state.side === "Sell") {
            this.setState({
              fiatCurrencyValue: 0,
              sellPayAmt: 0,
              sellEstPrice: 0,
              disabledMode: false,
              disabledBtn: false,
              disabledCryptoMode: false,
            });
          }
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
      description: desc,
    });
  }

  /* 
        Page: /trade --> Stop Limit
        This method is called on submit of form according to buy and sell of order.
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
        order_type: "StopLimit",
        orderQuantity: self.state.amount,
        limit_price: self.state.limit_price,
        stop_price: self.state.stop_price,
      };
      this.setState({ loader: true });
      fetch(
        SOCKET_HOST +
          `/api/v1/tradding/orders/pending-${self.state.side.toLowerCase()}-order-create`,
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
                this.emitAmount();
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
          this.setState({
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
      tradeLimit,
      tradeLimitLeft,
      tradeLimitLeftAfter,
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
                  <a
                    onClick={() => {
                      this.walletAccess(this.props.cryptoCode);
                    }}
                    disabled={this.props.userBal.cryptoinactive}
                    className={
                      this.props.userBal.cryptoinactive ? "inactive" : ""
                    }
                    // href={`/walletDetails?coinID0=${this.props.cryptoCode}`}
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
              placeholder="0"
              value={precise(this.state.amount, this.props.qtyPrecision)}
              name="amount"
              onChange={this.onChange}
            />
            {this.validator.message(
              "amount",
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
            ) : this.state.disabledCryptoMode ? (
              <div className="trade-action-validation">
                {this.t("tier_changes:min_limit_check_text.message")}
                {this.state.minCryptoValue} {this.state.crypto}
              </div>
            ) : (
              ""
            )}
          </TotalWrap>
        </ETHWrap>
        <FlexWrapDiv>
          <BTCWrap className="width_class">
            <Label>{this.t("stop_price_text.message")}</Label>
            <TotalWrap>
              <TotInput
                min="0"
                type="number"
                placeholder="0"
                step={limitPrecision}
                addonAfter={this.state.currency}
                value={precise(
                  this.state.stop_price,
                  this.props.pricePrecision
                )}
                name="stop_price"
                onChange={this.onChange}
              />
              {this.validator.message(
                "stop_price",
                this.state.stop_price,
                "required|gtzero|numeric|decimalrestrict8",
                "trade-action-validation",
                {
                  required: `${this.t("stop_price_text.message")}${" "}${this.t(
                    "validations:field_is_required.message"
                  )}`,
                  numeric: `${this.t("stop_price_text.message")}${" "}${this.t(
                    "must_be_a_number.message"
                  )}`,
                  gtzero: `${this.t("stop_price_text.message")}${" "}${this.t(
                    "should_be_greater_than_0.message"
                  )}`,
                  decimalrestrict8: `${this.t(
                    "stop_price_text.message"
                  )}${" "}${this.t("validations:8_decimal_error.message")}`,
                }
              )}
            </TotalWrap>
            {this.state.side === "Buy" && this.state.latestFillPrice ? (
              <TriggerDiv className={this.state.disabledBtn ? "red" : ""}>
                <span>
                  {this.t("tier_changes:trigger_text.message")}{" "}
                  <Icon type="right" />{" "}
                </span>
                <span>
                  {precise(
                    this.state.latestFillPrice,
                    this.props.pricePrecision
                  )}
                </span>
              </TriggerDiv>
            ) : (
              this.state.latestFillPrice && (
                <TriggerDiv className={this.state.disabledBtn ? "red" : ""}>
                  <span>
                    {this.t("tier_changes:trigger_text.message")}{" "}
                    <Icon type="left" />{" "}
                  </span>
                  <span>
                    {precise(
                      this.state.latestFillPrice,
                      this.props.pricePrecision
                    )}
                  </span>
                </TriggerDiv>
              )
            )}
          </BTCWrap>
          <BTCWrap className="width_class">
            <Label>{this.t("limit_price_text.message")}</Label>
            <TotalWrap>
              <TotInput
                min="0"
                type="number"
                placeholder="0"
                step={limitPrecision}
                addonAfter={this.state.currency}
                value={precise(
                  this.state.limit_price,
                  this.props.pricePrecision
                )}
                name="limit_price"
                onChange={this.onChange}
              />
              {this.validator.message(
                "Limit_Price",
                this.state.limit_price,
                "required|gtzero|numeric|decimalrestrict8",
                "trade-action-validation",
                {
                  required: `${this.t(
                    "limit_price_text.message"
                  )}${" "}${this.t("validations:field_is_required.message")}`,
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
        </FlexWrapDiv>
        <BTCWrap>
          <Label>{this.t("conversion:total_text.message")}</Label>
          <TotalWrap className="readonly-input">
            <TotInput
              min="0"
              readOnly="true"
              type="number"
              addonAfter={this.state.currency}
              value={precise(this.state.total, this.props.pricePrecision)}
              name="total"
              onChange={this.onChange}
            />
            {/* {this.validator.message(
              "Total",
              this.state.total,
              "required|gtzero|numeric",
              "trade-action-validation",
              {
                gtzero: "Total should be greater than zero.",
              }
            )} */}
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
                {this.state.showTierOne && !this.state.trialTierUpgrade ? (
                  <>
                    <hr />
                    <ApproxBelow>
                      <WillpayBelow>
                        {this.t("tier_0_text:starter_trade_limit_text.message")}
                      </WillpayBelow>
                      <WillpayBelow2>
                        {tradeLimit == "Unlimited"
                          ? this.t("tiers:unlimited_text.message")
                          : `${precise(parseFloat(tradeLimit), "2")} USD`}
                      </WillpayBelow2>
                    </ApproxBelow>
                    <ApproxBelow>
                      <WillpayBelow>
                        {this.t(
                          "tier_0_text:available_trade_limit_text.message"
                        )}
                      </WillpayBelow>
                      <WillpayBelow2>
                        {tradeLimitLeft == "Unlimited"
                          ? this.t("tiers:unlimited_text.message")
                          : `${precise(parseFloat(tradeLimitLeft), "2")} USD`}
                      </WillpayBelow2>
                    </ApproxBelow>
                    <ApproxBelow>
                      <WillpayBelow>
                        {this.t(
                          "tier_0_text:estimated_limit_after_trade_text.message"
                        )}
                      </WillpayBelow>
                      <WillpayBelow2
                        className={this.state.tradeLimitFlag ? "red" : ""}
                      >
                        {this.state.tradeLimitFlag
                          ? this.t(
                              "tier_0_text:exceeds_trade_limit_text.message"
                            )
                          : tradeLimitLeftAfter == "Unlimited"
                          ? this.t("tiers:unlimited_text.message")
                          : `${precise(
                              parseFloat(tradeLimitLeftAfter),
                              "2"
                            )} USD`}
                      </WillpayBelow2>
                    </ApproxBelow>
                  </>
                ) : this.state.showTierOne ? (
                  <>
                    <hr />
                    <ApproxBelow>
                      <WillpayBelow className="tier_upgrade">
                        {this.t("tier_0_text:congratulations_text.message")}{" "}
                        {this.state.freeTierDays}{" "}
                        {this.t("tier_0_text:congratulations_text1.message")}
                        <Link to="/editProfile">
                          {" "}
                          {this.t(
                            "settings:deactivate_popup_click_here.message"
                          )}
                          .
                        </Link>
                      </WillpayBelow>
                    </ApproxBelow>
                  </>
                ) : this.state.tier0Inactive ? (
                  <>
                    <hr />
                    <ApproxBelow>
                      <WillpayBelow className="tier_upgrade">
                        {this.t("tier_0_text:wallet_info_strip_text.message")}
                      </WillpayBelow>
                    </ApproxBelow>
                  </>
                ) : (
                  ""
                )}
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
                {this.state.showTierOne && !this.state.trialTierUpgrade ? (
                  <>
                    <hr />
                    <ApproxBelow>
                      <WillpayBelow>
                        {this.t("tier_0_text:starter_trade_limit_text.message")}
                      </WillpayBelow>
                      <WillpayBelow2>
                        {tradeLimit == "Unlimited"
                          ? this.t("tiers:unlimited_text.message")
                          : `${precise(parseFloat(tradeLimit), "2")} USD`}
                      </WillpayBelow2>
                    </ApproxBelow>
                    <ApproxBelow>
                      <WillpayBelow>
                        {this.t(
                          "tier_0_text:available_trade_limit_text.message"
                        )}
                      </WillpayBelow>
                      <WillpayBelow2>
                        {tradeLimitLeft == "Unlimited"
                          ? this.t("tiers:unlimited_text.message")
                          : `${precise(parseFloat(tradeLimitLeft), "2")} USD`}
                      </WillpayBelow2>
                    </ApproxBelow>
                    <ApproxBelow>
                      <WillpayBelow>
                        {this.t(
                          "tier_0_text:estimated_limit_after_trade_text.message"
                        )}
                      </WillpayBelow>
                      <WillpayBelow2
                        className={this.state.tradeLimitFlag ? "red" : ""}
                      >
                        {this.state.tradeLimitFlag
                          ? this.t(
                              "tier_0_text:exceeds_trade_limit_text.message"
                            )
                          : tradeLimitLeftAfter == "Unlimited"
                          ? this.t("tiers:unlimited_text.message")
                          : `${precise(
                              parseFloat(tradeLimitLeftAfter),
                              "2"
                            )} USD`}
                      </WillpayBelow2>
                    </ApproxBelow>
                  </>
                ) : this.state.showTierOne ? (
                  <>
                    <hr />
                    <ApproxBelow>
                      <WillpayBelow className="tier_upgrade">
                        {this.t("tier_0_text:congratulations_text.message")}{" "}
                        {this.state.freeTierDays}{" "}
                        {this.t("tier_0_text:congratulations_text1.message")}
                        <Link to="/editProfile">
                          {" "}
                          {this.t(
                            "settings:deactivate_popup_click_here.message"
                          )}
                          .
                        </Link>
                      </WillpayBelow>
                    </ApproxBelow>
                  </>
                ) : this.state.tier0Inactive ? (
                  <>
                    <hr />
                    <ApproxBelow>
                      <WillpayBelow className="tier_upgrade">
                        {this.t("tier_0_text:wallet_info_strip_text.message")}
                      </WillpayBelow>
                    </ApproxBelow>
                  </>
                ) : (
                  ""
                )}
              </Esti>
            </Pay>
          )
        ) : (
          ""
        )}
        <ButtonWrap>
          {/* <div>Last order Fill price: {this.state.latestFillPrice}</div>
          <div>Stop price: {this.state.stop_price}</div> */}
          <ButtonETH
            // disabled={
            //   parseFloat(this.state.stop_price) ===
            //   parseFloat(this.state.latestFillPrice)
            //     ? true
            //     : false
            // }
            // disabled={
            //   parseFloat(this.state.stop_price) >
            //   parseFloat(this.state.latestFillPrice)
            //     ? false
            //     : true
            // }
            disabled={
              this.state.disabledBtn ||
              this.state.disabledMode ||
              this.state.disabledBtnMode ||
              this.state.disabledCryptoMode ||
              this.state.tradeLimitFlag ||
              this.state.tier0Inactive
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
        {/* <TrialTierUpgrade
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.trialTierUpgrade}
        /> */}
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
  "tier_0_text",
  "settings",
  "tiers",
])(connect(mapStateToProps)(withRouter(StopLimit)));
