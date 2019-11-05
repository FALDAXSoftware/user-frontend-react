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
  ConversionRightSpan,
  ConversionLeftSpan,
  RightTotal,
  LeftTotal,
  RadioMainRow,
  RadioGroupMainRow,
  ConversionLeftCol,
  CryptoFiatRow,
  CryptoFiatCol,
  CryptoFiatText
} from "../../../STYLED-COMPONENTS/CONVERSION/style";
import { parse } from "@fortawesome/fontawesome-svg-core";

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
      orderQuantity: "",
      Quantity: "",
      OriginalQuantity: ""
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

  componentWillMount() {
    if (
      this.props.profileDetails.is_allowed === true &&
      this.props.profileDetails.is_kyc_done === 2
    ) {
      if (this.props.location.pathname !== "/crypto-conversion")
        this.props.history.push("/crypto-conversion");
    } else {
      if (
        this.props.profileDetails.is_allowed === false &&
        this.props.profileDetails.is_kyc_done !== 2
      ) {
        this.props.history.push("/conversion");
      } else {
        this.setState({ countryAccess: true });
        this.props.history.push("/conversion");
      }
    }
  }

  componentDidMount() {
    this.getCrypto();
    // this.getCurrencies();
    this.getFiatCurrencyList();
  }
  sendCurrencyChange(e) {
    console.log("Send Currency Change");
    clearTimeout(this.timeout);
    this.clearValidation();
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
    if (this.validator2.allValid() && e.target.value != null) {
      this.setState(
        {
          sendCurrencyInput: e.target.value
        },
        () => {}
      );
    } else {
      this.setState(
        {
          sendCurrencyInput: e.target.value
        },
        () => {}
      );
      this.validator2.showMessages();
      this.forceUpdate();
    }
    // if (e.target.value > 0 && e.target.value !== null) {
    //   this.clearValidation();
    //   this.timeout = setTimeout(this.showCalculatedValues, 1000);
    //   this.setState(
    //     {
    //       sendCurrencyInput: e.target.value
    //     },
    //     () => {
    //       this.state.JSTPairList.map((element, i) => {
    //         if (
    //           element.crypto === this.state.crypto &&
    //           element.currency === this.state.currency
    //         ) {
    //           if (element.original_pair != element.order_pair) {
    //             this.setState({
    //               OrdType: "2"
    //             });
    //           } else {
    //             this.setState({
    //               OrdType: "1"
    //             });
    //           }
    //           this.setState({
    //             original_pair: element.original_pair,
    //             order_pair: element.order_pair
    //           });
    //         }
    //       });
    //     }
    //   );
    // }
  }
  recieveCurrencyChange(e) {
    clearTimeout(this.timeout);
    console.log("Recieve Currency Change");
    this.clearValidation();
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
    if (this.validator1.allValid() && e.target.value != null) {
      this.setState(
        {
          recieveCurrencyInput: e.target.value
        },
        () => {}
      );
    } else {
      this.setState(
        {
          recieveCurrencyInput: e.target.value
        },
        () => {}
      );
      this.validator1.showMessages();
      this.forceUpdate();
    }
  }
  fiatJSTValueChange(e) {
    clearTimeout(this.timeout);
    console.log("Fiat Currency Change");
    this.clearValidation();
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
    this.timeout = setTimeout(this.showCalculatedValuesUSDTerms, 1000);
    if (this.state.includeFees === 1) {
      if (this.validator1.allValid() && e.target.value != null) {
        this.setState(
          {
            fiatJSTValue: e.target.value
          },
          () => {}
        );
      } else {
        this.setState(
          {
            fiatJSTValue: e.target.value
          },
          () => {}
        );
        this.validator1.showMessages();
        this.forceUpdate();
      }
    } else {
      if (this.validator2.allValid() && e.target.value != null) {
        this.setState(
          {
            fiatJSTValue: e.target.value
          },
          () => {}
        );
      } else {
        this.setState(
          {
            fiatJSTValue: e.target.value
          },
          () => {}
        );
        this.validator2.showMessages();
        this.forceUpdate();
      }
    }

    // console.log("Fiat Value Change");
    // clearTimeout(this.timeout);
    // if (e.target.value > 0 && e.target.value !== null) {
    //   this.clearValidation();
    //   this.timeout = setTimeout(this.showCalculatedValuesUSDTerms, 1000);
    //   this.clearValidation();
    //   this.setState(
    //     {
    //       fiatJSTValue: e.target.value
    //     },
    //     () => {
    //       this.state.JSTPairList.map((element, i) => {
    //         if (
    //           element.crypto === this.state.crypto &&
    //           element.currency === this.state.currency
    //         ) {
    //           if (element.original_pair != element.order_pair) {
    //             this.setState({
    //               OrdType: "2"
    //             });
    //           } else {
    //             this.setState({
    //               OrdType: "1"
    //             });
    //           }
    //           this.setState({
    //             original_pair: element.original_pair,
    //             order_pair: element.order_pair
    //           });
    //         }
    //       });
    //     }
    //   );
    // }
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
    if (
      (values.OrderQty === null || values.OrderQty === "") &&
      this.state.includeFees === 1
    ) {
      // this.setState({ loader: false });
      this.validator1.showMessages();
      this.forceUpdate();
      this.setState({
        recieveCurrencyInput: 0,
        includeFees: 1,
        sendCurrencyInput: 0,
        fiatJSTValue: 0,
        crypto: "XRP",
        displayCurrency: null,
        currency: "BTC",
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
      // this.setState({ loader: false });
      this.validator2.showMessages();
      this.forceUpdate();
      this.setState({
        sendCurrencyInput: 0,
        includeFees: 2,
        sendCurrencyInput: 0,
        fiatJSTValue: 0,
        crypto: "XRP",
        displayCurrency: null,
        currency: "BTC",
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        networkFee: 0,
        loader: false
      });
    } else {
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
            this.setState({
              subTotal: parseFloat(responseData.data.original_value).toFixed(8),
              faldaxFee: parseFloat(responseData.data.faldax_fee).toFixed(8),
              networkFee: parseFloat(responseData.data.network_fee).toFixed(8),
              totalAmount: responseData.data.total_value.toFixed(8),
              fiatJSTValue: parseFloat(responseData.data.price_usd).toFixed(2),
              displayCurrency: responseData.data.currency,
              Quantity: parseFloat(responseData.data.total_value).toFixed(8)
            });
            if (this.state.includeFees === 1) {
              // if (this.state.OrdType === "1") {
              //   console.log(this.state.includeFees, this.state.OrdType);
              //   this.setState({
              //     OriginalQuantity: parseFloat(
              //       responseData.original_value
              //     ).toFixed(8)
              //   });
              // } else {
              //   console.log(this.state.includeFees, this.state.OrdType);
              //   this.setState({
              //     OriginalQuantity: parseFloat(
              //       responseData.total_value
              //     ).toFixed(8)
              //   });
              // }
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
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.original_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.original_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "1"
            ) {
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.total_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.total_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "2"
            ) {
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.currency_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 1 &&
              this.state.OrdType === "2"
            ) {
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.currency_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else {
              console.log("no scenario");
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
    if (
      (values.usd_value === null || values.usd_value === "") &&
      this.state.includeFees === 1
    ) {
      // this.setState({ loader: false });
      this.validator1.showMessages();
      this.forceUpdate();
      this.setState({
        recieveCurrencyInput: 0,
        includeFees: 1,
        sendCurrencyInput: 0,
        fiatJSTValue: 0,
        crypto: "XRP",
        displayCurrency: null,
        currency: "BTC",
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
      // this.setState({ loader: false });
      this.validator2.showMessages();
      this.forceUpdate();
      this.setState({
        sendCurrencyInput: 0,
        includeFees: 2,
        sendCurrencyInput: 0,
        fiatJSTValue: 0,
        crypto: "XRP",
        displayCurrency: null,
        currency: "BTC",
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        networkFee: 0,
        loader: false
      });
    } else {
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
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.original_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.original_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "1"
            ) {
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.total_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.total_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 2 &&
              this.state.OrdType === "2"
            ) {
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.currency_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else if (
              this.state.includeFees === 1 &&
              this.state.OrdType === "2"
            ) {
              console.log(
                this.state.includeFees,
                this.state.OrdType,
                responseData.data.currency_value
              );
              this.setState({
                OriginalQuantity: parseFloat(
                  responseData.data.currency_value
                ).toFixed(8)
              });
            } else {
              console.log("no scenario");
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
  calculateOrderVaules() {
    console.log("Order");
    this.setState({ loader: true });
    if (this.state.includeFees === 1) {
      var values = {
        Symbol: this.state.original_pair,
        Side: this.state.OrdType,
        OrderQty: parseFloat(this.state.orderQuantity).toFixed(8),
        Quantity: parseFloat(this.state.Quantity).toFixed(8),
        OriginalQuantity: parseFloat(this.state.OriginalQuantity).toFixed(8),
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
        OrderQty: parseFloat(this.state.orderQuantity).toFixed(8),
        Quantity: parseFloat(this.state.Quantity).toFixed(8),
        OriginalQuantity: parseFloat(this.state.OriginalQuantity).toFixed(8),
        Currency: this.state.currency,
        OrdType: "1",
        original_pair: this.state.original_pair,
        order_pair: this.state.order_pair
      };
      console.log(values);
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
          this.openNotificationWithIcon(
            "success",
            "Success",
            responseData.message
          );
          this.setState({
            recieveCurrencyInput: 0,
            includeFees: 1,
            sendCurrencyInput: 0,
            fiatJSTValue: 0,
            crypto: this.state.crypto,
            displayCurrency: null,
            currency: this.state.currency,
            subTotal: 0,
            totalAmount: 0,
            faldaxFee: 0,
            networkFee: 0,
            loader: false
          });
          this.clearValidation();
        } else if (responseData.status === 500) {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.message);
        } else {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.message);
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
          this.setState({
            cryptoList: responseData.coinList,
            currencyList: responseData.coinList,
            originalCoinList: responseData.coinList,
            JSTPairList: responseData.getJSTPair
          });
          this.setState({
            loader: false
          });
        }
      })
      .catch(error => {});
  }
  handleCryptoChange(value, option: Option) {
    if (value === this.state.currency) {
      this.state.currencyList.map((element, i) => {
        if (element.coin === this.state.currency) {
          var list = this.state.currencyList.splice(i, 1);
          // console.log(list);
          this.setState({
            cryptoList: this.state.cryptoList.push(list[0])
          });
        }
      });
      this.setState({
        currency: this.state.currencyList[0].coin
      });
    }
    clearTimeout(this.timeout);
    this.setState(
      {
        crypto: value,
        cryptoList: this.state.originalCoinList
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
            console.log(
              "If original_pair-----------",
              this.state.original_pair
            );
            console.log("If order_pair-----------", this.state.order_pair);
            console.log("If crypto-----------", this.state.crypto);
            console.log("If currency-----------", this.state.currency);
            this.timeout = setTimeout(this.showCalculatedValues, 1000);
          }
        } else {
          if (this.state.sendCurrencyInput > 0) {
            console.log(
              "Else original_pair-----------",
              this.state.original_pair
            );
            console.log("Else order_pair-----------", this.state.order_pair);
            console.log("Else crypto-----------", this.state.crypto);
            console.log("Else currency-----------", this.state.currency);
            this.timeout = setTimeout(this.showCalculatedValues, 1000);
          }
        }
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
    if (value === this.state.crypto) {
      this.state.cryptoList.map((element, i) => {
        if (element.coin === this.state.crypto) {
          var list1 = this.state.cryptoList.splice(i, 1);
          // console.log(list1);
          this.setState({
            currencyList: this.state.currencyList.push(list1[0])
          });
        }
      });
      this.setState({
        crypto: this.state.cryptoList[0].coin
      });
    }
    clearTimeout(this.timeout);
    this.setState(
      {
        currency: value,
        currencyList: this.state.originalCoinList
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
            this.timeout = setTimeout(this.showCalculatedValues, 1000);
          }
        } else {
          if (this.state.sendCurrencyInput > 0) {
            this.timeout = setTimeout(this.showCalculatedValues, 1000);
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
    if (this.state.includeFees === 1) {
      if (this.validator1.allValid()) {
        this.calculateOrderVaules();
        // alert("success");
      } else {
        this.validator1.showMessages();
        this.forceUpdate();
      }
    }
    if (this.state.includeFees === 2) {
      if (this.validator2.allValid()) {
        this.calculateOrderVaules();
        // alert("success");
      } else {
        this.validator2.showMessages();
        this.forceUpdate();
      }
    }
  }
  clearValidation() {
    if (this.state.includeFees === 1) {
      this.validator1.hideMessages();
      this.forceUpdate();
    } else {
      this.validator2.hideMessages();
      this.forceUpdate();
    }
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
                            disabled
                            placeholder="0"
                          />
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
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
                            `required|numeric|gtzero|decimalrestrict8`,
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
                          {this.validator1.message(
                            "fiat value",
                            this.state.fiatJSTValue,
                            `required|numeric|gtzerofiat|decimalrestrict2`,
                            "text-danger-validation"
                            // {
                            //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            // }
                          )}
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          style={{
                            height: "42px",
                            alignItems: "center",
                            display: "flex"
                          }}
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
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
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
                          {this.validator2.message(
                            "send currency",
                            this.state.sendCurrencyInput,
                            `required|numeric|gtzero|decimalrestrict8`,
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
                          {console.log(this.state.currencyList)}
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
                                            selecteddata={element}
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
                          {this.validator2.message(
                            "fiat value",
                            this.state.fiatJSTValue,
                            `required|numeric|gtzerofiat|decimalrestrict2`,
                            "text-danger-validation"
                            // {
                            //   minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            // }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
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
                          ({this.state.faldaxFee}){" "}
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
                          ({this.state.networkFee}){" "}
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
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(withRouter(ConversionDetail));
