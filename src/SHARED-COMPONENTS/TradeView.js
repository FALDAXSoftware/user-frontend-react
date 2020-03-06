/* Built-in packages */
import React from "react";
import {
  Row,
  Col /* , Select */,
  Radio,
  notification,
  Collapse,
  Icon
} from "antd";
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
  ConversionLeftCol,
  CryptoFiatRow,
  CryptoFiatCol,
  RadioMainRow,
  RadioGroupMainRow,
  CryptoFiatText
} from "../STYLED-COMPONENTS/CONVERSION/tradeCalcStyle";

const API_URL = globalVariables.API_URL;
const TRADE_URL = globalVariables.TRADE_URL;
const WP_URL = globalVariables.WordpressSiteURL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

const { Panel } = Collapse;
let io = null;

class TradeView extends React.Component {
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
      orderQuantity: "",
      Quantity: "",
      OriginalQuantity: "",
      minCrypto: 0,
      minCurrency: 0,
      disabledClass: ""
    };
    this.getCrypto = this.getCrypto.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    this.getFiatCurrencyList = this.getFiatCurrencyList.bind(this);
    this.handleFiatChange = this.handleFiatChange.bind(this);
    this.sendCurrencyChange = this.sendCurrencyChange.bind(this);
    this.recieveCurrencyChange = this.recieveCurrencyChange.bind(this);
    this.fiatJSTValueChange = this.fiatJSTValueChange.bind(this);
    this.showCalculatedValues = this.showCalculatedValues.bind(this);
    this.showCalculatedValuesUSDTerms = this.showCalculatedValuesUSDTerms.bind(
      this
    );
  }
  componentDidMount() {
    this.getCrypto();
  }
  getFiatCurrencyList() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/get-simplex-list`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          this.setState({
            fiatCurrencyList: responseData.object.fiat,
            loader: false
          });
        } else {
          this.setState({
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
    fetch(API_URL + `/conversion/jst-pair`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          var cryptoData = responseData.coinList,
            minLimit,
            minCurrLimit;
          for (var i = 0; i < cryptoData.length; i++) {
            if (cryptoData[i].coin == this.state.crypto) {
              minLimit = cryptoData[i].jst_min_coin_limit;
            }
            if (cryptoData[i].coin == this.state.currency) {
              minCurrLimit = cryptoData[i].jst_min_coin_limit;
            }
          }
          this.setState({
            cryptoList: responseData.coinList,
            currencyList: responseData.coinList,
            originalCoinList: responseData.coinList,
            JSTPairList: responseData.getJSTPair,
            minCrypto: minLimit,
            minCurrency: minCurrLimit
          });
          this.setState({
            loader: false
          });
        } else {
          this.setState({
            loader: false
          });
        }
      })
      .catch(error => {});
  }
  radioChange(e) {
    this.setState({ loader: true });
    var self = this;
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
        // console.log(
        //   "Matched crytpo and currency pair selected Radio change",
        //   this.state.crypto + this.state.currency
        // );
        // console.log(
        //   "Matched crytpo and currency pair Radiochange",
        //   element.crypto + element.currency
        // );
        this.setState({
          original_pair: element.original_pair,
          order_pair: element.order_pair
        });
      }
    });
    this.setState(
      {
        includeFees: e.target.value,
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
            recieveCurrencyInput: this.state.minCrypto
          });
        } else {
          this.timeout = setTimeout(this.showCalculatedValues, 1000);
          this.setState({
            sendCurrencyInput: this.state.minCurrency
          });
        }
      }
    );
  }
  sendCurrencyChange(e) {
    clearTimeout(this.timeout);
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
    this.timeout = setTimeout(this.showCalculatedValues, 1000);
    this.setState({
      sendCurrencyInput: e.target.value
    });
  }
  recieveCurrencyChange(e) {
    clearTimeout(this.timeout);
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
    this.timeout = setTimeout(this.showCalculatedValues, 1000);
    this.setState({
      recieveCurrencyInput: e.target.value
    });
  }
  fiatJSTValueChange(e) {
    clearTimeout(this.timeout);
    // console.log("Fiat Currency Change");
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
    this.setState({
      fiatJSTValue: e.target.value
    });
    this.timeout = setTimeout(this.showCalculatedValuesUSDTerms, 1000);
  }
  handleFiatChange(value, option) {
    // console.log(option.props.selectedData.min_limit);
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
  handleCryptoChange(value, option) {
    if (value === this.state.currency) {
      this.state.currencyList.map((element, i) => {
        if (element.coin === this.state.currency) {
          var list = this.state.currencyList.splice(i, 1);
          this.setState({
            cryptoList: this.state.cryptoList.push(list[0])
          });
        }
      });
      if (value === "XRP") {
        if (this.state.currencyList[0].coin === "LTC") {
          this.setState({
            currency: this.state.currencyList[1].coin,
            minCurrency: this.state.currencyList[1].jst_min_coin_limit
          });
        } else {
          this.setState({
            currency: this.state.currencyList[0].coin,
            minCurrency: this.state.currencyList[0].jst_min_coin_limit
          });
        }
      } else if (value === "LTC") {
        if (this.state.currencyList[0].coin === "XRP") {
          this.setState({
            currency: this.state.currencyList[1].coin,
            minCurrency: this.state.currencyList[1].jst_min_coin_limit
          });
        } else {
          this.setState({
            currency: this.state.currencyList[0].coin,
            minCurrency: this.state.currencyList[0].jst_min_coin_limit
          });
        }
      } else {
        this.setState({
          currency: this.state.currencyList[0].coin,
          minCurrency: this.state.currencyList[0].jst_min_coin_limit
        });
      }
    }
    clearTimeout(this.timeout);
    this.setState(
      {
        crypto: value,
        cryptoList: this.state.originalCoinList,
        minCrypto: option.props.selectedData.jst_min_coin_limit
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
            // console.log(
            //   "Matched crytpo and currency pair selected Crypto change",
            //   this.state.currency + this.state.crypto
            // );
            // console.log(
            //   "Matched crytpo and currency pair crypto change",
            //   element.crypto + element.currency
            // );
            this.setState({
              original_pair: element.original_pair,
              order_pair: element.order_pair
            });
          }
        });
        if (this.state.includeFees === 1) {
          this.setState(
            {
              recieveCurrencyInput: option.props.selectedData.jst_min_coin_limit
            },
            () => {
              if (this.state.recieveCurrencyInput > 0) {
                // console.log(
                //   "If original_pair-----------",
                //   this.state.original_pair
                // );
                // console.log("If order_pair-----------", this.state.order_pair);
                // console.log("If crypto-----------", this.state.crypto);
                // console.log("If currency-----------", this.state.currency);
                this.timeout = setTimeout(this.showCalculatedValues, 1000);
              }
            }
          );
        } else {
          if (this.state.sendCurrencyInput > 0) {
            // console.log(
            //   "Else original_pair-----------",
            //   this.state.original_pair
            // );
            // console.log("Else order_pair-----------", this.state.order_pair);
            // console.log("Else crypto-----------", this.state.crypto);
            // console.log("Else currency-----------", this.state.currency);
            this.timeout = setTimeout(this.showCalculatedValues, 1000);
          }
        }
      }
    );
  }
  handleCurrencyChange(value, option) {
    if (value === this.state.crypto) {
      this.state.cryptoList.map((element, i) => {
        if (element.coin === this.state.crypto) {
          var list1 = this.state.cryptoList.splice(i, 1);
          this.setState({
            currencyList: this.state.currencyList.push(list1[0])
          });
        }
      });
      if (value === "XRP") {
        if (this.state.cryptoList[0].coin === "LTC") {
          this.setState({
            crypto: this.state.cryptoList[1].coin,
            minCrypto: this.state.cryptoList[1].jst_min_coin_limit
          });
        } else {
          this.setState({
            crypto: this.state.cryptoList[0].coin,
            minCrypto: this.state.cryptoList[0].jst_min_coin_limit
          });
        }
      } else if (value === "LTC") {
        if (this.state.cryptoList[0].coin === "XRP") {
          this.setState({
            crypto: this.state.cryptoList[1].coin,
            minCrypto: this.state.cryptoList[1].jst_min_coin_limit
          });
        } else {
          this.setState({
            crypto: this.state.cryptoList[0].coin,
            minCrypto: this.state.cryptoList[0].jst_min_coin_limit
          });
        }
      } else {
        this.setState({
          crypto: this.state.cryptoList[0].coin,
          minCrypto: this.state.cryptoList[0].jst_min_coin_limit
        });
      }
    }
    clearTimeout(this.timeout);
    this.setState(
      {
        currency: value,
        currencyList: this.state.originalCoinList,
        minCurrency: option.props.selectedData.jst_min_coin_limit
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
            // console.log(
            //   "Matched crytpo and currency pair selected currency change",
            //   this.state.crypto + this.state.currency
            // );
            // console.log(
            //   "Matched crytpo and currency pair Currency change",
            //   element.crypto + element.currency
            // );
            this.setState({
              original_pair: element.original_pair,
              order_pair: element.order_pair
            });
          }
        });
        if (this.state.includeFees === 1) {
          if (this.state.recieveCurrencyInput > 0) {
            this.timeout = setTimeout(this.showCalculatedValues, 1000);
          }
        } else {
          this.setState(
            {
              sendCurrencyInput: option.props.selectedData.jst_min_coin_limit
            },
            () => {
              if (this.state.sendCurrencyInput > 0) {
                this.timeout = setTimeout(this.showCalculatedValues, 1000);
              }
            }
          );
        }
      }
    );
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
      // console.log(values);
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
    // console.log("Values-----------", values);
    if (
      (values.OrderQty === null || values.OrderQty === "") &&
      this.state.includeFees === 1
    ) {
      this.forceUpdate();
      this.setState({
        // recieveCurrencyInput: 0,
        includeFees: 1,
        sendCurrencyInput: 0,
        fiatJSTValue: "",
        crypto: this.state.crypto,
        displayCurrency: null,
        currency: this.state.currency,
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        networkFee: 0,
        loader: false
      });
    } else if (
      (values.OrderQty === null || values.OrderQty === "") &&
      this.state.includeFees === 2
    ) {
      this.forceUpdate();
      this.setState({
        // sendCurrencyInput: 0,
        includeFees: 2,
        recieveCurrencyInput: 0,
        fiatJSTValue: "",
        crypto: this.state.crypto,
        displayCurrency: null,
        currency: this.state.currency,
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        networkFee: 0,
        loader: false
      });
    } else {
      fetch(`${API_URL}/conversion/jst-price-value`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          // Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.setState({
              subTotal: parseFloat(responseData.data.original_value).toFixed(8),
              faldaxFee: parseFloat(responseData.data.faldax_fee).toFixed(8),
              networkFee: parseFloat(responseData.data.network_fee).toFixed(8),
              totalAmount: parseFloat(responseData.data.total_value).toFixed(8),
              fiatJSTValue: parseFloat(responseData.data.price_usd).toFixed(2),
              displayCurrency: responseData.data.currency,
              Quantity: parseFloat(responseData.data.total_value).toFixed(8)
            });
            if (this.state.includeFees === 1) {
              this.setState({
                sendCurrencyInput: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8),
                orderQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8),
                loader: false
              });
            } else {
              // if (this.state.OrdType === "2") {
              //   console.log("if", this.state.OrdType);
              //   this.setState({
              //     OriginalQuantity: parseFloat(
              //       responseData.original_value
              //     ).toFixed(8)
              //   });
              // } else {
              //   console.log("else", this.state.OrdType);
              //   this.setState({
              //     OriginalQuantity: parseFloat(
              //       responseData.original_value
              //     ).toFixed(8)
              //   });
              // }
              this.setState({
                recieveCurrencyInput: parseFloat(
                  responseData.data.total_value
                ).toFixed(8),
                orderQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8),
                loader: false
              });
            }
            if (this.state.includeFees === 1 && this.state.OrdType === "1") {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.original_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.original_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "1"
            ) {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.total_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.total_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "2"
            ) {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.currency_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 1 &&
              this.state.OrdType === "2"
            ) {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.currency_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else {
              // console.log("no scenario");
            }
            this.setState({ loader: false });
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
  }
  showCalculatedValuesUSDTerms() {
    this.setState({ loader: true });
    // console.log("Order values to display");
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
    if (
      (values.usd_value === null || values.usd_value === "") &&
      this.state.includeFees === 1
    ) {
      this.forceUpdate();
      this.setState({
        recieveCurrencyInput: "",
        includeFees: 1,
        sendCurrencyInput: "",
        // fiatJSTValue: 0,
        crypto: this.state.crypto,
        displayCurrency: null,
        currency: this.state.currency,
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        networkFee: 0,
        loader: false
      });
    } else if (
      (values.usd_value === null || values.usd_value === "") &&
      this.state.includeFees === 2
    ) {
      this.forceUpdate();
      this.setState({
        recieveCurrencyInput: "",
        includeFees: 2,
        sendCurrencyInput: "",
        // fiatJSTValue: 0,
        crypto: this.state.crypto,
        displayCurrency: null,
        currency: this.state.currency,
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        networkFee: 0,
        loader: false
      });
    } else {
      fetch(`${API_URL}/conversion/jst-price-value`, {
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
            // console.log("Response Data 200", responseData.data);
            this.setState({
              // subTotal: parseFloat(responseData.data.original_value).toFixed(8),
              faldaxFee: parseFloat(responseData.data.faldax_fee).toFixed(8),
              networkFee: parseFloat(responseData.data.network_fee).toFixed(8),
              // totalAmount: parseFloat(responseData.data.total_value).toFixed(8),
              displayCurrency: responseData.data.currency,
              Quantity: parseFloat(responseData.data.total_value).toFixed(8)
              // orderQuantity: responseData.data.orderQuantity
            });
            if (this.state.includeFees === 1) {
              this.setState({
                sendCurrencyInput: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8),
                recieveCurrencyInput: parseFloat(
                  responseData.data.original_value
                ).toFixed(8),
                orderQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8),
                subTotal: parseFloat(responseData.data.original_value).toFixed(
                  8
                ),
                totalAmount: parseFloat(responseData.data.total_value).toFixed(
                  8
                ),
                loader: false
              });
            } else {
              this.setState({
                recieveCurrencyInput: parseFloat(
                  responseData.data.total_value
                ).toFixed(8),
                sendCurrencyInput: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8),
                orderQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8),
                subTotal: parseFloat(responseData.data.original_value).toFixed(
                  8
                ),
                totalAmount: parseFloat(responseData.data.total_value).toFixed(
                  8
                ),
                loader: false
              });
            }
            if (this.state.includeFees === 1 && this.state.OrdType === "1") {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.original_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.original_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "1"
            ) {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.total_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.total_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "2"
            ) {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.currency_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 1 &&
              this.state.OrdType === "2"
            ) {
              // console.log(
              //   this.state.includeFees,
              //   this.state.OrdType,
              //   responseData.data.currency_value
              // );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else {
              // console.log("no scenario");
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
  }
  btnClicked() {
    this.setState({
      loader: false
    });
    if (this.props.isLoggedIn) {
      if (
        this.props.profileDetails.is_allowed &&
        this.props.profileDetails.is_kyc_done == 2
      ) {
        window.open(
          WP_URL + "/crypto-only-coming-soon",
          "_blank" // <- This is what makes it open in a new window.
        );
      } else {
        window.open(
          TRADE_URL + "/conversion",
          "_blank" // <- This is what makes it open in a new window.
        );
      }
    } else {
      window.open(
        TRADE_URL + "/login/",
        "_blank" // <- This is what makes it open in a new window.
      );
    }
  }
  render() {
    return (
      <ConversionWrap className="tradeview">
        {/* <Navigation conversion={true} /> */}
        <ConversionContainer className="trade-view-conversion">
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
                        <RowTitle>You Receive</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.recieveCurrencyInput}
                            disabled
                            placeholder="0"
                          />
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          className="value-display"
                          // style={{ height: "42px" }}
                        >
                          {this.state.cryptoList &&
                            this.state.cryptoList.length > 0 && (
                              <ConversionDropDown
                                value={this.state.crypto}
                                onChange={this.handleCryptoChange}
                              >
                                {this.state.cryptoList.map((element, index) => {
                                  if (this.state.currency === "XRP") {
                                    if (
                                      // element.coin != this.state.currency &&
                                      element.coin != "LTC"
                                    ) {
                                      // console.log(this.state.cryptoList);
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
                                  } else if (this.state.currency === "LTC") {
                                    if (
                                      // element.coin != this.state.currency &&
                                      element.coin != "XRP"
                                    ) {
                                      // console.log(this.state.cryptoList);
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
                                  } else {
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
                                  // else {
                                  //   if (element.coin != this.state.currency) {
                                  //     return (
                                  //       <DropDownOption
                                  //         key={index}
                                  //         value={element.coin}
                                  //         selectedData={element}
                                  //       >
                                  //         {" "}
                                  //         <DropIcon
                                  //           src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                  //           height="20px"
                                  //         />{" "}
                                  //         {element.coin}
                                  //       </DropDownOption>
                                  //     );
                                  //   }
                                  // }
                                })}
                              </ConversionDropDown>
                            )}
                        </Col>
                      </RadioBorderRow>
                    ) : (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>You Receive</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.recieveCurrencyInput}
                            onChange={this.recieveCurrencyChange}
                            placeholder="0"
                            step="0.00000001"
                          />
                          {/* {this.validator1.message(
                            "recieve currency",
                            this.state.recieveCurrencyInput,
                            `required|numeric|gtzero|decimalrestrict8|minCryptoValid`,
                            "text-danger-validation",
                            {
                              minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            }
                          )} */}
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          className="value-display"
                          // style={{ height: "42px" }}
                        >
                          {this.state.cryptoList &&
                            this.state.cryptoList.length > 0 && (
                              <ConversionDropDown
                                value={this.state.crypto}
                                onChange={this.handleCryptoChange}
                              >
                                {this.state.cryptoList.map((element, index) => {
                                  if (this.state.currency === "XRP") {
                                    if (
                                      // element.coin != this.state.currency &&
                                      element.coin != "LTC"
                                    ) {
                                      // console.log(this.state.cryptoList);
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
                                  } else if (this.state.currency === "LTC") {
                                    if (
                                      // element.coin != this.state.currency &&
                                      element.coin != "XRP"
                                    ) {
                                      // console.log(this.state.cryptoList);
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
                                  } else {
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
                                  //  else {
                                  //   if (element.coin != this.state.currency) {
                                  //     return (
                                  //       <DropDownOption
                                  //         key={index}
                                  //         value={element.coin}
                                  //         selectedData={element}
                                  //       >
                                  //         {" "}
                                  //         <DropIcon
                                  //           src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                  //           height="20px"
                                  //         />{" "}
                                  //         {element.coin}
                                  //       </DropDownOption>
                                  //     );
                                  //   }
                                  // }
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
                          {/* {this.validator1.message(
                        "fiat value",
                        this.state.fiatJSTValue,
                        `required|numeric|gtzerofiat|decimalrestrict2`,
                        "text-danger-validation"
                        // {
                        //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                        // }
                      )} */}
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          // style={{
                          //   height: "42px",
                          //   alignItems: "center",
                          //   display: "flex"
                          // }}
                        >
                          <CryptoFiatRow>
                            <CryptoFiatCol>
                              <img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/usd.png" />
                            </CryptoFiatCol>
                            <CryptoFiatText>{this.state.fiat}</CryptoFiatText>
                          </CryptoFiatRow>
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
                            disabled
                            placeholder="0"
                          />
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          className="value-display"
                          // style={{ height: "42px" }}
                        >
                          {this.state.currencyList &&
                            this.state.currencyList.length > 0 && (
                              <ConversionDropDown
                                value={this.state.currency}
                                onChange={this.handleCurrencyChange}
                              >
                                {/* {console.log(this.state.currencyList)} */}
                                {this.state.currencyList.map(
                                  (element, index) => {
                                    if (this.state.crypto === "XRP") {
                                      if (
                                        // element.coin != this.state.crypto &&
                                        element.coin != "LTC"
                                      ) {
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
                                    } else if (this.state.crypto === "LTC") {
                                      if (
                                        // element.coin != this.state.crypto &&
                                        element.coin != "XRP"
                                      ) {
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
                                    } else {
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
                                    // else {
                                    //   if (element.coin != this.state.crypto) {
                                    //     return (
                                    //       <DropDownOption
                                    //         key={index}
                                    //         value={element.coin}
                                    //         selectedData={element}
                                    //       >
                                    //         {" "}
                                    //         <DropIcon
                                    //           src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                    //           height="20px"
                                    //         />{" "}
                                    //         {element.coin}
                                    //       </DropDownOption>
                                    //     );
                                    //   }
                                    // }
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
                          {/* {this.validator2.message(
                            "send currency",
                            this.state.sendCurrencyInput,
                            `required|numeric|gtzero|decimalrestrict8|minCurrValid`,
                            "text-danger-validation",
                            {
                              minCurrValid: `Minimum limit is ${this.state.minCurrency}`
                            }
                          )} */}
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          className="value-display"
                          // style={{ height: "42px" }}
                        >
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
                          {/* {console.log(this.state.currencyList)} */}
                          {this.state.currencyList &&
                            this.state.currencyList.length > 0 && (
                              <ConversionDropDown
                                value={this.state.currency}
                                onChange={this.handleCurrencyChange}
                              >
                                {this.state.currencyList.map(
                                  (element, index) => {
                                    if (this.state.crypto === "XRP") {
                                      if (
                                        // element.coin != this.state.crypto &&
                                        element.coin != "LTC"
                                      ) {
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
                                    } else if (this.state.crypto === "LTC") {
                                      if (
                                        // element.coin != this.state.crypto &&
                                        element.coin != "XRP"
                                      ) {
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
                                    } else {
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
                                    // else {
                                    //   if (element.coin != this.state.crypto) {
                                    //     return (
                                    //       <DropDownOption
                                    //         key={index}
                                    //         value={element.coin}
                                    //         selectedData={element}
                                    //       >
                                    //         {" "}
                                    //         <DropIcon
                                    //           src={`${_AMAZONBUCKET}${element.coin_icon}`}
                                    //           height="20px"
                                    //         />{" "}
                                    //         {element.coin}
                                    //       </DropDownOption>
                                    //     );
                                    //   }
                                    // }
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
                          {/* {this.validator2.message(
                        "fiat value",
                        this.state.fiatJSTValue,
                        `required|numeric|gtzerofiat|decimalrestrict2`,
                        "text-danger-validation"
                        // {
                        //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                        // }
                      )} */}
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          // style={{ height: "42px" }}
                        >
                          <CryptoFiatRow>
                            <CryptoFiatCol>
                              <img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/usd.png" />
                            </CryptoFiatCol>
                            <CryptoFiatText>{this.state.fiat}</CryptoFiatText>
                          </CryptoFiatRow>
                        </Col>
                      </RadioBorderRow>
                    ) : null}
                  </RadioMainRow>
                </RadioGroupMainRow>
              </Radio.Group>
            </ConversionRadioRow>
            <ConversionLeftCol md={12} lg={12}>
              <Row>
                <Col>
                  <ConversionSubmitBtn
                    className={`conversion_btn ${this.state.disabledClass}`}
                    onClick={this.btnClicked}
                    type="primary"
                    size="large"
                    block
                  >
                    Exchange
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
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    theme: state.themeReducer.theme !== undefined ? false : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : ""
  };
}

export default connect(mapStateToProps)(withRouter(TradeView));
