/* Built-in packages */
import React from "react";
import { Row, Col /* , Select */, Radio, notification, Collapse } from "antd";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
// import CompleteKYC from "SHARED-COMPONENTS/CompleteKYC";
// import CountryAccess from "SHARED-COMPONENTS/CountryAccess";

/* STYLED-COMPONENTS */
import {
  ConversionWrap,
  ConversionContainer,
  MainRow,
  ConversionRadioRow,
  RadioBorderRow,
  RowTitle,
  ConversionInput,
  ConversionDropDown,
  DropDownOption,
  DropIcon,
  ConversionSubmitBtn,
  ConversionRightSpan,
  ConversionLeftSpan,
  RightTotal,
  LeftTotal,
  RadioMainRow,
  RadioGroupMainRow,
  ConversionLeftCol
} from "../../../STYLED-COMPONENTS/CONVERSION/style";

const API_URL = globalVariables.API_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

const { Panel } = Collapse;
let io = null;
class ConversionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      currencyList: [],
      cryptoList: [],
      originalCoinList: [],
      JSTPairList: [],
      currency: "BTC",
      crypto: "XRP",
      prevRoom: "",
      askPrice: 0,
      bidPrice: 0,
      buyCryptoInput: null,
      buyCurrencyInput: null,
      sellCryptoInput: null,
      sellCurrencyInput: null,
      includeFees: 1,
      krakenFees: 0,
      faldaxFees: 0,
      loader: false,
      minCrypto: 0,
      minCurrency: 0,
      fiatValue: 0,
      networkFee: 0,
      faldaxFee: 0,
      totalAmount: 0,
      subTotal: 0,
      fiat: "USD",
      fiatCurrencyList: "",
      fiatJSTValue: null,
      sendCurrencyInput: null,
      recieveCurrencyInput: null,
      original_pair: "",
      order_pair: "",
      displayCurrency: "",
      OrdType: "",
      orderQuantity: ""
    };
    io = this.props.io;
    this.timeout = null;
    this.validator1 = new SimpleReactValidator({
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
      gtzerofiat: {
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
      decimalrestrict2: {
        message:
          "Value must be less than or equal to 2 digits after decimal point.",
        rule: val => {
          var RE = /^\d*\.?\d{0,2}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      decimalrestrict8: {
        message:
          "Value must be less than or equal to 8 digits after decimal point.",
        rule: val => {
          var RE = /^\d*\.?\d{0,8}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
    this.validator2 = new SimpleReactValidator({
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
      gtzerofiat: {
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
      decimalrestrict2: {
        message:
          "Value must be less than or equal to 2 digits after decimal point.",
        rule: val => {
          var RE = /^\d*\.?\d{0,2}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      decimalrestrict8: {
        message:
          "Value must be less than or equal to 8 digits after decimal point.",
        rule: val => {
          var RE = /^\d*\.?\d{0,8}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
    // this.getCurrencies = this.getCurrencies.bind(this);
    this.getCrypto = this.getCrypto.bind(this);
    this.radioChange = this.radioChange.bind(this);
    // this.getPairDetails = this.getPairDetails.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    // this.handleTabChange = this.handleTabChange.bind(this);
    // this.onBuyCryptoChange = this.onBuyCryptoChange.bind(this);
    // this.onBuyCurrencyChange = this.onBuyCurrencyChange.bind(this);
    // this.calculateBuyCurrency = this.calculateBuyCurrency.bind(this);
    // this.calculateBuyCrypto = this.calculateBuyCrypto.bind(this);
    // this.onSellCryptoChange = this.onSellCryptoChange.bind(this);
    // this.onSellCurrencyChange = this.onSellCurrencyChange.bind(this);
    // this.calculateSellCurrency = this.calculateSellCurrency.bind(this);
    // this.calculateSellCrypto = this.calculateSellCrypto.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    // this.getBuyCurrencyWithFees = this.getBuyCurrencyWithFees.bind(this);
    // this.getFiatValue = this.getFiatValue.bind(this);
    this.getFiatCurrencyList = this.getFiatCurrencyList.bind(this);
    this.handleFiatChange = this.handleFiatChange.bind(this);
    this.sendCurrencyChange = this.sendCurrencyChange.bind(this);
    this.recieveCurrencyChange = this.recieveCurrencyChange.bind(this);
    this.fiatJSTValueChange = this.fiatJSTValueChange.bind(this);
    this.calculateOrderVaules = this.calculateOrderVaules.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.showCalculatedValues = this.showCalculatedValues.bind(this);
    this.showCalculatedValuesUSDTerms = this.showCalculatedValuesUSDTerms.bind(
      this
    );
    // this.getPairWiseCrypto = this.getPairWiseCrypto.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    this.getCrypto();
    // this.getCurrencies();
    this.getFiatCurrencyList();
    // this.getPairWiseCrypto();
  }
  sendCurrencyChange(e) {
    console.log("Send Currency Change");
    clearTimeout(this.timeout);
    if (e.target.value >= 0 && e.target.value !== null) {
      this.clearValidation();
      this.timeout = setTimeout(this.showCalculatedValues, 1000);
      this.setState(
        {
          sendCurrencyInput: e.target.value
        },
        () => {
          this.state.JSTPairList.map((element, i) => {
            if (
              element.crypto === this.state.crypto &&
              element.currency === this.state.currency
            ) {
              if (element.original_pair != element.order_pair) {
                this.setState({
                  OrdType: "2"
                });
              } else {
                this.setState({
                  OrdType: "1"
                });
              }
              this.setState({
                original_pair: element.original_pair,
                order_pair: element.order_pair
              });
            }
          });
        }
      );
    }
  }
  recieveCurrencyChange(e) {
    console.log("Recieve Currency Change");
    clearTimeout(this.timeout);
    if (e.target.value >= 0 && e.target.value !== null) {
      this.clearValidation();
      this.timeout = setTimeout(this.showCalculatedValues, 1000);
      this.setState(
        {
          recieveCurrencyInput: e.target.value
        },
        () => {
          this.state.JSTPairList.map((element, i) => {
            if (
              element.crypto === this.state.crypto &&
              element.currency === this.state.currency
            ) {
              if (element.original_pair != element.order_pair) {
                this.setState({
                  OrdType: "2"
                });
              } else {
                this.setState({
                  OrdType: "1"
                });
              }
              this.setState({
                original_pair: element.original_pair,
                order_pair: element.order_pair
              });
            }
          });
        }
      );
    }
  }
  fiatJSTValueChange(e) {
    console.log("Fiat Value Change");
    clearTimeout(this.timeout);
    if (e.target.value >= 0 && e.target.value !== null) {
      this.clearValidation();
      this.timeout = setTimeout(this.showCalculatedValuesUSDTerms, 1000);
      this.clearValidation();
      this.setState(
        {
          fiatJSTValue: e.target.value
        },
        () => {
          this.state.JSTPairList.map((element, i) => {
            if (
              element.crypto === this.state.crypto &&
              element.currency === this.state.currency
            ) {
              if (element.original_pair != element.order_pair) {
                this.setState({
                  OrdType: "2"
                });
              } else {
                this.setState({
                  OrdType: "1"
                });
              }
              this.setState({
                original_pair: element.original_pair,
                order_pair: element.order_pair
              });
            }
          });
        }
      );
    }
  }
  showCalculatedValues() {
    this.setState({ loader: true });
    if (this.state.includeFees === 1) {
      var values = {
        Symbol: this.state.original_pair,
        // Symbol: `${this.state.crypto}/${this.state.currency}`,
        Side: this.state.OrdType,
        OrderQty: this.state.recieveCurrencyInput,
        Currency: this.state.crypto,
        OrdType: "1",
        flag: "2",
        usd_value: "",
        original_pair: this.state.original_pair,
        order_pair: this.state.order_pair
      };
      console.log(values);
    } else {
      var values = {
        Symbol: this.state.original_pair,
        // Symbol: `${this.state.crypto}/${this.state.currency}`,
        Side: this.state.OrdType,
        OrderQty: this.state.sendCurrencyInput,
        Currency: this.state.currency,
        OrdType: "1",
        flag: "1",
        usd_value: "",
        original_pair: this.state.original_pair,
        order_pair: this.state.order_pair
      };
    }
    console.log("Values-----------", values);
    fetch(`${API_URL}/conversion/get-jst-price-value`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          // this.setState({ loader: false });
          // this.openNotificationWithIcon(
          //   "success",
          //   "Success",
          //   responseData.message
          // );
          console.log("Response Data 200", responseData.data);
          this.setState({
            subTotal: parseFloat(responseData.data.original_value).toFixed(8),
            faldaxFee: parseFloat(responseData.data.faldax_fee).toFixed(8),
            networkFee: parseFloat(responseData.data.network_fee).toFixed(8),
            totalAmount: responseData.data.total_value.toFixed(8),
            fiatJSTValue: parseFloat(responseData.data.price_usd).toFixed(2),
            displayCurrency: responseData.data.currency,
            orderQuantity: responseData.data.orderQuantity
          });
          if (this.state.includeFees === 1) {
            this.setState({
              sendCurrencyInput: parseFloat(
                responseData.data.currency_value
              ).toFixed(8),
              loader: false
            });
          } else {
            this.setState({
              recieveCurrencyInput: parseFloat(
                responseData.data.total_value
              ).toFixed(8),
              loader: false
            });
          }
        } else if (responseData.status === 500) {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.err);
        } else {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.err);
        }
      })
      .catch(error => {});
  }
  showCalculatedValuesUSDTerms() {
    this.setState({ loader: true });
    console.log("Order values to display");
    if (this.state.includeFees === 1) {
      var values = {
        Symbol: this.state.original_pair,
        Side: this.state.OrdType,
        OrderQty: this.state.recieveCurrencyInput,
        Currency: this.state.crypto,
        OrdType: "1",
        flag: "2",
        usd_value: this.state.fiatJSTValue,
        original_pair: this.state.original_pair,
        order_pair: this.state.order_pair
      };
    } else {
      var values = {
        Symbol: this.state.original_pair,
        Side: this.state.OrdType,
        OrderQty: this.state.sendCurrencyInput,
        Currency: this.state.currency,
        OrdType: "1",
        flag: "1",
        usd_value: this.state.fiatJSTValue,
        original_pair: this.state.original_pair,
        order_pair: this.state.order_pair
      };
    }
    console.log("Values-----------", values);
    fetch(`${API_URL}/conversion/get-jst-price-value`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          console.log("Response Data 200", responseData.data);
          this.setState({
            // subTotal: parseFloat(responseData.data.original_value).toFixed(8),
            faldaxFee: parseFloat(responseData.data.faldax_fee).toFixed(8),
            networkFee: parseFloat(responseData.data.network_fee).toFixed(8),
            // totalAmount: parseFloat(responseData.data.total_value).toFixed(8),
            displayCurrency: responseData.data.currency
          });
          if (this.state.includeFees === 1) {
            this.setState({
              sendCurrencyInput: parseFloat(
                responseData.data.currency_value
              ).toFixed(8),
              recieveCurrencyInput: parseFloat(
                responseData.data.original_value
              ).toFixed(8),
              subTotal: parseFloat(responseData.data.original_value).toFixed(8),
              totalAmount: parseFloat(responseData.data.total_value).toFixed(8),
              loader: false
            });
          } else {
            this.setState({
              recieveCurrencyInput: parseFloat(
                responseData.data.original_value
              ).toFixed(8),
              sendCurrencyInput: parseFloat(
                responseData.data.currency_value
              ).toFixed(8),
              subTotal: parseFloat(responseData.data.original_value).toFixed(8),
              totalAmount: parseFloat(responseData.data.total_value).toFixed(8),
              loader: false
            });
          }
        } else if (responseData.status === 500) {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.err);
        } else {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.err);
        }
      })
      .catch(error => {});
  }
  calculateOrderVaules() {
    console.log("Order");
    this.setState({ loader: true });
    if (this.state.includeFees === 1) {
      var values = {
        Symbol: this.state.original_pair,
        Side: this.state.OrdType,
        OrderQty: this.state.orderQuantity,
        Currency: this.state.crypto,
        OrdType: "1",
        original_pair: this.state.original_pair,
        order_pair: this.state.order_pair
      };
      console.log(values);
    } else {
      var values = {
        Symbol: this.state.original_pair,
        Side: this.state.OrdType,
        OrderQty: this.state.orderQuantity,
        Currency: this.state.currency,
        OrdType: "1",
        original_pair: this.state.original_pair,
        order_pair: this.state.order_pair
      };
    }
    fetch(`${API_URL}/converion/jst-create-order`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "success",
            "Success",
            responseData.message
          );
        } else if (responseData.status === 500) {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.err);
        } else {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.err);
        }
      })
      .catch(error => {});
  }
  getFiatCurrencyList() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/get-simplex-coin-list`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          this.setState({
            fiatCurrencyList: responseData.object.fiat,
            loader: false
          });
        }
      })
      .catch(error => {});
  }
  getCrypto() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/conversion/get-jst-pair`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          // var cryptoData = responseData.data,
          //   minLimit,
          //   minCurrLimit;
          // for (var i = 0; i < cryptoData.length; i++) {
          //   if (cryptoData[i].coin == this.state.crypto) {
          //     minLimit = cryptoData[i].min_limit;
          //   }
          //   if (cryptoData[i].coin == this.state.currency) {
          //     minCurrLimit = cryptoData[i].min_limit;
          //   }
          // }
          this.setState(
            {
              cryptoList: responseData.coinList,
              currencyList: responseData.coinList,
              originalCoinList: responseData.coinList,
              JSTPairList: responseData.getJSTPair
            },
            () => {
              // this.getPairWiseCrypto();
            }
          );
          // console.log("CryptoList", this.state.cryptoList);
          // console.log("currencyList", this.state.currencyList);
          this.setState({
            loader: false
          });
        }
      })
      .catch(error => {});
    // fetch(API_URL + `/coin-list-converison`, {
    //   method: "get",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + this.props.isLoggedIn
    //   }
    // })
    //   .then(response => response.json())
    //   .then(responseData => {
    //     if (responseData.status == 200) {
    //       var cryptoData = responseData.data,
    //         minLimit,
    //         minCurrLimit;
    //       for (var i = 0; i < cryptoData.length; i++) {
    //         if (cryptoData[i].coin == this.state.crypto) {
    //           minLimit = cryptoData[i].min_limit;
    //         }
    //         if (cryptoData[i].coin == this.state.currency) {
    //           minCurrLimit = cryptoData[i].min_limit;
    //         }
    //       }
    //       this.setState({
    //         cryptoList: responseData.data,
    //         krakenFees: responseData.kraken_fees,
    //         faldaxFees: responseData.faldax_fees,
    //         minCrypto: minLimit,
    //         minCurrency: minCurrLimit
    //       });
    //     }
    //   })
    //   .catch(error => {});
  }
  // getPairWiseCrypto() {
  //   // console.log(
  //   //   "currencyList---------------------------",
  //   //   this.state.currencyList
  //   // );
  //   var self = this.state;
  //   let temp = self.currencyList;
  //   if (self.includeFees === 1) {
  //     if (self.crypto === "XRP") {
  //       self.currencyList.map((element, i) => {
  //         if (element.coin === "LTC") {
  //           self.currencyList.splice(i, i);
  //           console.log("Updated Currency", self.currencyList);
  //         }
  //       });
  //       this.setState({

  //       })
  //     } else if (self.crypto === "ETH") {
  //       self.currencyList.map((element, i) => {
  //         if (element.coin === "LTC") {
  //           console.log("coin", i);
  //           self.currencyList.splice(i, i);
  //           console.log("Updated Currency", self.currencyList);
  //         }
  //       });
  //     }
  //   } else {
  //     alert("send");
  //   }
  // }
  // getCurrencies() {
  //   fetch(
  //     `${API_URL}/coin-currency-list-conversion?crypto=${this.state.crypto}`,
  //     {
  //       method: "get",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + this.props.isLoggedIn
  //       }
  //     }
  //   )
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({ currencyList: responseData.data });
  //     })
  //     .catch(error => {});
  // }
  handleCryptoChange(value, option: Option) {
    this.setState(
      {
        crypto: value
      },
      () => {
        this.state.JSTPairList.map((element, i) => {
          if (
            element.crypto === this.state.crypto &&
            element.currency === this.state.currency
          ) {
            if (element.original_pair != element.order_pair) {
              this.setState({
                OrdType: "2"
              });
            } else {
              this.setState({
                OrdType: "1"
              });
            }
            console.log(
              "Matched crytpo and currency pair selected Crypto change",
              this.state.currency + this.state.crypto
            );
            console.log(
              "Matched crytpo and currency pair crypto change",
              element.crypto + element.currency
            );
            this.setState({
              original_pair: element.original_pair,
              order_pair: element.order_pair
            });
          }
        });
        if (this.state.includeFees === 1) {
          if (this.state.recieveCurrencyInput > 0) {
            this.showCalculatedValues();
          }
        } else {
          if (this.state.sendCurrencyInput > 0) {
            this.showCalculatedValues();
          }
        }
        // this.showCalculatedValues();
        // this.getPairWiseCrypto();
      }
    );
  }
  handleFiatChange(value, option: Option) {
    console.log(option.props.selectedData.min_limit);
    let prevRoom = this.state.crypto + "-" + this.state.currency;
    this.setState(
      {
        fiat: value
      },
      () => {
        // this.showCalculatedValues();
      }
    );
  }
  handleCurrencyChange(value, option: Option) {
    console.log(option.props.selectedData.min_limit);
    // if (this.state.includeFees === 1) {
    //   this.setState({
    //     includeFees: 2,
    //     sendCurrencyInput: 1
    //   });
    // } else {
    //   this.setState({
    //     includeFees: 1,
    //     recieveCurrencyInput: 1
    //   });
    // }
    this.setState(
      {
        currency: value
      },
      () => {
        this.state.JSTPairList.map((element, i) => {
          if (
            element.crypto === this.state.currency &&
            element.currency === this.state.crypto
          ) {
            if (element.original_pair != element.order_pair) {
              this.setState({
                OrdType: "2"
              });
            } else {
              this.setState({
                OrdType: "1"
              });
            }
            console.log(
              "Matched crytpo and currency pair selected currency change",
              this.state.crypto + this.state.currency
            );
            console.log(
              "Matched crytpo and currency pair Currency change",
              element.crypto + element.currency
            );
            this.setState({
              original_pair: element.original_pair,
              order_pair: element.order_pair
            });
          }
        });
        if (this.state.includeFees === 1) {
          if (this.state.recieveCurrencyInput > 0) {
            this.showCalculatedValues();
          }
        } else {
          if (this.state.sendCurrencyInput > 0) {
            this.showCalculatedValues();
          }
        }
        // this.showCalculatedValues();
      }
    );
  }
  radioChange(e) {
    this.setState({ loader: true });
    this.clearValidation();
    var self = this;
    console.log("radio===========", e.target.value);
    // if (e.target.value === 1) {
    //   this.setState({
    //     recieveCurrencyInput: 0
    //   });
    // } else {
    //   this.setState({
    //     sendCurrencyInput: 0
    //   });
    // }
    this.state.JSTPairList.map((element, i) => {
      if (
        element.crypto === this.state.crypto &&
        element.currency === this.state.currency
      ) {
        if (element.original_pair != element.order_pair) {
          this.setState({
            OrdType: "2"
          });
        } else {
          this.setState({
            OrdType: "1"
          });
        }
        console.log(
          "Matched crytpo and currency pair selected Radio change",
          this.state.crypto + this.state.currency
        );
        console.log(
          "Matched crytpo and currency pair Radiochange",
          element.crypto + element.currency
        );
        this.setState({
          original_pair: element.original_pair,
          order_pair: element.order_pair
        });
      }
    });
    this.setState(
      {
        includeFees: e.target.value,
        // sendCurrencyInput: 0,
        // recieveCurrencyInput: 0,
        subTotal: 0,
        faldaxFee: 0,
        networkFee: 0,
        totalFees: 0,
        fiatJSTValue: 0,
        totalAmount: 0,
        displayCurrency: null,
        loader: false
      },
      () => {
        clearTimeout(this.timeout);
        if (e.target.value === 1) {
          this.timeout = setTimeout(this.showCalculatedValues, 1000);
          this.setState({
            recieveCurrencyInput: 1
          });
        } else {
          this.timeout = setTimeout(this.showCalculatedValues, 1000);
          this.setState({
            sendCurrencyInput: 1
          });
        }
      }
      // () => {
      //   if (self.state.selectedTab === 1) {
      //     self.calculateBuyCurrency();
      //   } else if (self.state.selectedTab === 2) {
      //     self.calculateSellCurrency();
      //   }
      // }
    );
  }
  btnClicked() {
    this.calculateOrderVaules();
  }
  clearValidation() {
    if (this.state.includeFees === 1) {
      this.validator1.hideMessages();
    } else {
      this.validator2.hideMessages();
    }
    this.forceUpdate();
    // rerender to hide messages for the first time
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }
  render() {
    return (
      <ConversionWrap>
        <Navigation conversion={true} />
        <ConversionContainer>
          <MainRow>
            <ConversionRadioRow>
              <Radio.Group
                onChange={this.radioChange}
                value={this.state.includeFees}
              >
                <RadioGroupMainRow>
                  <Radio value={1}></Radio>
                  <RadioMainRow>
                    {this.state.includeFees === 2 ? (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>You Recieve</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.recieveCurrencyInput}
                            onChange={this.recieveCurrencyChange}
                            disabled
                            placeholder="0"
                          />
                          {/* {this.validator1.message(
                            "crypto",
                            this.state.recieveCurrencyInput,
                            `required|numeric|gtzero`,
                            "text-danger-validation"
                            // {
                            //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            // }
                          )} */}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.cryptoList &&
                            this.state.cryptoList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.crypto}
                                onChange={this.handleCryptoChange}
                                // disabled
                              >
                                {this.state.cryptoList.map((element, index) => {
                                  if (element.coin != this.state.currency) {
                                    return (
                                      <DropDownOption
                                        key={index}
                                        value={element.coin}
                                        selectedData={element}
                                      >
                                        {" "}
                                        <DropIcon
                                          src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                          height="20px"
                                        />{" "}
                                        {element.coin}
                                      </DropDownOption>
                                    );
                                  }
                                })}
                              </ConversionDropDown>
                            )}
                        </Col>
                      </RadioBorderRow>
                    ) : (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>You Recieve</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.recieveCurrencyInput}
                            onChange={this.recieveCurrencyChange}
                            placeholder="0"
                            step="0.00000001"
                          />
                          {this.validator1.message(
                            "recieve currency",
                            this.state.recieveCurrencyInput,
                            `required|numeric|gtzero`,
                            "text-danger-validation"
                            // {
                            //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            // }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.cryptoList &&
                            this.state.cryptoList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.crypto}
                                onChange={this.handleCryptoChange}
                              >
                                {this.state.cryptoList.map((element, index) => {
                                  if (element.coin != this.state.currency) {
                                    return (
                                      <DropDownOption
                                        key={index}
                                        value={element.coin}
                                        selectedData={element}
                                      >
                                        {" "}
                                        <DropIcon
                                          src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                          height="20px"
                                        />{" "}
                                        {element.coin}
                                      </DropDownOption>
                                    );
                                  }
                                })}
                              </ConversionDropDown>
                            )}
                        </Col>
                      </RadioBorderRow>
                    )}
                    {this.state.includeFees === 1 ? (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>Fiat Value</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.fiatJSTValue}
                            onChange={this.fiatJSTValueChange}
                            placeholder="0"
                            step="0.01"
                          />
                          {this.validator1.message(
                            "fiat value",
                            this.state.fiatJSTValue,
                            `required|numeric|gtzerofiat`,
                            "text-danger-validation"
                            // {
                            //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            // }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.fiatCurrencyList &&
                            this.state.fiatCurrencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.fiat}
                                onChange={this.handleFiatChange}
                              >
                                {this.state.fiatCurrencyList.map(
                                  (element, index) => {
                                    // console.log("index", index);
                                    if (
                                      index == 0 &&
                                      element.coin != this.state.currency
                                    ) {
                                      return (
                                        <DropDownOption
                                          key={index}
                                          value={element.coin}
                                          selectedData={element}
                                        >
                                          {" "}
                                          <DropIcon
                                            src={element.coin_icon}
                                            height="20px"
                                          />{" "}
                                          {element.coin}
                                        </DropDownOption>
                                      );
                                    }
                                  }
                                )}
                              </ConversionDropDown>
                            )}
                        </Col>
                      </RadioBorderRow>
                    ) : (
                      ""
                    )}
                  </RadioMainRow>
                </RadioGroupMainRow>
                <RadioGroupMainRow>
                  <Radio value={2}></Radio>
                  <RadioMainRow>
                    {this.state.includeFees === 1 ? (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>You Send</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.sendCurrencyInput}
                            onChange={this.sendCurrencyChnage}
                            disabled
                            placeholder="0"
                          />
                          {/* {this.validator1.message(
                            "currency",
                            this.state.sendCurrencyInput,
                            `required|numeric|gtzero|minCurrValid`,
                            "text-danger-validation",
                            {
                              minCurrValid: `Minimum Currency limit is ${this.state.minCurrency}`
                            }
                          )} */}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {/* {this.state.currencyList &&
                            this.state.currencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.currency}
                                onChange={this.handleCurrencyChange}
                                // disabled
                              >
                                {this.state.currencyList.map(
                                  (element, index) => (
                                    <DropDownOption
                                      key={index}
                                      value={element.coin}
                                    >
                                      {" "}
                                      <DropIcon
                                        src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                        height="20px"
                                      />{" "}
                                      {element.coin}
                                    </DropDownOption>
                                  )
                                )}
                              </ConversionDropDown>
                            )} */}
                          {this.state.currencyList &&
                            this.state.currencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.currency}
                                onChange={this.handleCurrencyChange}
                              >
                                {this.state.currencyList.map(
                                  (element, index) => {
                                    if (element.coin != this.state.crypto) {
                                      return (
                                        <DropDownOption
                                          key={index}
                                          value={element.coin}
                                          selectedData={element}
                                        >
                                          {" "}
                                          <DropIcon
                                            src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                            height="20px"
                                          />{" "}
                                          {element.coin}
                                        </DropDownOption>
                                      );
                                    }
                                  }
                                )}
                              </ConversionDropDown>
                            )}
                        </Col>
                      </RadioBorderRow>
                    ) : (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>You Send</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.sendCurrencyInput}
                            onChange={this.sendCurrencyChange}
                            placeholder="0"
                            step="0.00000001"
                          />
                          {this.validator2.message(
                            "send currency",
                            this.state.sendCurrencyInput,
                            `required|numeric|gtzero`,
                            "text-danger-validation"
                            // {
                            //   minCurrValid: `Minimum Currency limit is ${this.state.minCurrency}`
                            // }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {/* {this.state.currencyList &&
                            this.state.currencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.currency}
                                onChange={this.handleCurrencyChange}
                              >
                                {this.state.currencyList.map(
                                  (element, index) => (
                                    <DropDownOption
                                      key={index}
                                      value={element.coin}
                                    >
                                      {" "}
                                      <DropIcon
                                        src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                        height="20px"
                                      />{" "}
                                      {element.coin}
                                    </DropDownOption>
                                  )
                                )}
                              </ConversionDropDown>
                            )} */}
                          {this.state.currencyList &&
                            this.state.currencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.currency}
                                onChange={this.handleCurrencyChange}
                              >
                                {this.state.currencyList.map(
                                  (element, index) => {
                                    if (element.coin != this.state.crypto) {
                                      return (
                                        <DropDownOption
                                          key={index}
                                          value={element.coin}
                                          selectedData={element}
                                        >
                                          {" "}
                                          <DropIcon
                                            src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                            height="20px"
                                          />{" "}
                                          {element.coin}
                                        </DropDownOption>
                                      );
                                    }
                                  }
                                )}
                              </ConversionDropDown>
                            )}
                        </Col>
                      </RadioBorderRow>
                    )}
                    {this.state.includeFees === 2 ? (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>Fiat Value</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.fiatJSTValue}
                            onChange={this.fiatJSTValueChange}
                            placeholder="0"
                            step="0.01"
                          />
                          {this.validator2.message(
                            "fiat value",
                            this.state.fiatJSTValue,
                            `required|numeric|gtzerofiat`,
                            "text-danger-validation"
                            // {
                            //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            // }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.fiatCurrencyList &&
                            this.state.fiatCurrencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.fiat}
                                onChange={this.handleFiatChange}
                              >
                                {this.state.fiatCurrencyList.map(
                                  (element, index) => {
                                    if (element.coin != this.state.currency) {
                                      return (
                                        <DropDownOption
                                          key={index}
                                          value={element.coin}
                                          selectedData={element}
                                        >
                                          {" "}
                                          <DropIcon
                                            src={element.coin_icon}
                                            height="20px"
                                          />{" "}
                                          {element.coin}
                                        </DropDownOption>
                                      );
                                    }
                                  }
                                )}
                              </ConversionDropDown>
                            )}
                        </Col>
                      </RadioBorderRow>
                    ) : null}
                  </RadioMainRow>
                </RadioGroupMainRow>
              </Radio.Group>
            </ConversionRadioRow>
            <ConversionLeftCol md={12} lg={12}>
              <Collapse accordion>
                <Panel header="Details" key="1">
                  <div>
                    <Row>
                      <Col xs={12} style={{ textAlign: "left" }}>
                        <ConversionRightSpan>Subtotal</ConversionRightSpan>
                      </Col>
                      <Col xs={12} style={{ textAlign: "right" }}>
                        {this.state.includeFees === 1 ? (
                          <ConversionLeftSpan>
                            {this.state.totalAmount}{" "}
                            {this.state.displayCurrency}
                          </ConversionLeftSpan>
                        ) : (
                          <ConversionLeftSpan>
                            {this.state.subTotal} {this.state.displayCurrency}
                          </ConversionLeftSpan>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} style={{ textAlign: "left" }}>
                        <ConversionRightSpan>
                          FALDAX Fee (0.24%)
                        </ConversionRightSpan>
                      </Col>
                      <Col xs={12} style={{ textAlign: "right" }}>
                        {/* <ConversionRightSpan>{this.state.faldaxFees.toFixed(5)}%</ConversionRightSpan> */}
                        <ConversionLeftSpan>
                          {this.state.faldaxFee}{" "}
                          {/* {this.state.includeFees === 1 ? (
                            <span>{this.state.currency}</span>
                          ) : (
                            <span>{this.state.crypto}</span>
                          )} */}
                          {this.state.displayCurrency}
                        </ConversionLeftSpan>
                      </Col>
                    </Row>
                    <Row className="network_fee">
                      <Col xs={12} style={{ textAlign: "left" }}>
                        <ConversionRightSpan>Network Fee</ConversionRightSpan>
                      </Col>
                      <Col xs={12} style={{ textAlign: "right" }}>
                        {/* <ConversionRightSpan>{this.state.krakenFees.toFixed(5)}%</ConversionRightSpan> */}
                        <ConversionLeftSpan>
                          {this.state.networkFee}{" "}
                          {/* {this.state.includeFees === 1 ? (
                            <span>{this.state.currency}</span>
                          ) : (
                            <span>{this.state.crypto}</span>
                          )} */}
                          {this.state.displayCurrency}
                        </ConversionLeftSpan>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} style={{ textAlign: "left" }}>
                        <RightTotal>total</RightTotal>
                      </Col>
                      <Col xs={12} style={{ textAlign: "right" }}>
                        {this.state.includeFees === 1 ? (
                          <LeftTotal>
                            {this.state.subTotal} {this.state.displayCurrency}
                          </LeftTotal>
                        ) : (
                          <LeftTotal>
                            {this.state.totalAmount}{" "}
                            {this.state.displayCurrency}
                          </LeftTotal>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Panel>
              </Collapse>
              <Row>
                <Col>
                  <ConversionSubmitBtn
                    className="conversion_btn"
                    onClick={this.btnClicked}
                    type="primary"
                    size="large"
                    block
                  >
                    Confirm
                  </ConversionSubmitBtn>
                </Col>
              </Row>
            </ConversionLeftCol>
          </MainRow>
        </ConversionContainer>
        {/* <CountryAccess
          comingCancel={e => this.comingCancel(e)}
          visible={this.state.countryAccess}
        />
        <CompleteKYC
          comingCancel={e => this.comingCancel(e)}
          visible={this.state.completeKYC}
        /> */}
        {this.state.loader == true ? <FaldaxLoader /> : ""}
      </ConversionWrap>
    );
  }
}
// export default Conversion;
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(withRouter(ConversionDetail));
