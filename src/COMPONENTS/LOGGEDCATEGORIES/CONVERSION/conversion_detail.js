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
import TFAModal from "SHARED-COMPONENTS/TFAModal";
import NumberFormat from "react-number-format";
import { translate } from "react-i18next";
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
import {
  VerifyModal,
  NewP,
  OTPInput,
  ButtonDiv
} from "../../SETTINGS/Account_settings/ip_modal";
import {
  NewButton,
  NewInput
} from "../../SETTINGS/changePassword/change_email";
import { parse } from "@fortawesome/fontawesome-svg-core";
import { LogoutUser } from "../../../ACTIONS/authActions";

const API_URL = globalVariables.API_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

const { Panel } = Collapse;
let io = null;
class ConversionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyList: [],
      cryptoList: [],
      originalCoinList: [],
      JSTPairList: [],
      faldax_fee_value: "",
      currency: "BTC",
      crypto: "XRP",
      includeFees: 1,
      loader: false,
      minCrypto: 0,
      minCurrency: 0,
      fiatValue: 0,
      networkFee: 0,
      faldaxFee: 0,
      faldaxFeeActual: 0,
      limitPrice: 0,
      totalAmount: 0,
      subTotal: 0,
      subTotalJST: 0,
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
      disabledClass: "",
      promoCode: "",
      showPromoModal: false,
      offerMsg: "",
      applyPromoCode: false,
      appliedOfferCode: "",
      showAppliedPromoModal: false,
      validPromo: false,
      buy_currency_amount: 0,
      sell_currency_amount: 0,
      showTFAModal: false,
      checkOTP: false,
      startSocket: false,
      socketTime: 20000,
      disabledButton: true,
      values: {},
      usdvalues: {}
    };
    io = this.props.io;
    this.t = this.props.t;
    this.timeout = null;
    this.validator1 = new SimpleReactValidator({
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
        required: true // optional
      },
      gtzerofiat: {
        // name the rule
        message: this.t("validations:value_greater_than_0_error.message"),
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
        message: this.t("validations:2_decimal_error.message"),
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
        message: this.t("validations:8_decimal_error.message"),
        rule: val => {
          var RE = /^\d*\.?\d{0,8}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      minCryptoValid: {
        message: `${this.t("validations:min_limit_error.message")} ${
          this.state.minCrypto
        }`,
        rule: (val, params, validator) => {
          // console.log("this is val?????", val);
          if (val >= this.state.minCrypto) {
            // console.log("here call");
            return true;
          } else {
            // console.log("else call");
            return false;
          }
        },
        required: true // optional
      }
    });
    this.validator2 = new SimpleReactValidator({
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
        required: true // optional
      },
      gtzerofiat: {
        // name the rule
        message: this.t("validations:value_greater_than_0_error.message"),
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
        message: this.t("validations:2_decimal_error.message"),
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
        message: this.t("validations:8_decimal_error.message"),
        rule: val => {
          var RE = /^\d*\.?\d{0,8}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      minCurrValid: {
        message: `${this.t("validations:min_limit_error.message")} ${
          this.state.minCurrency
        }`,
        rule: (val, params, validator) => {
          if (val >= this.state.minCurrency) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      }
    });
    this.validator3 = new SimpleReactValidator({});
    this.getCrypto = this.getCrypto.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    this.promoCode = this.promoCode.bind(this);
    this.checkPromo = this.checkPromo.bind(this);
    this.applyPromo = this.applyPromo.bind(this);
    this.closePromoModal = this.closePromoModal.bind(this);
    this.getFiatCurrencyList = this.getFiatCurrencyList.bind(this);
    this.handleFiatChange = this.handleFiatChange.bind(this);
    this.sendCurrencyChange = this.sendCurrencyChange.bind(this);
    this.recieveCurrencyChange = this.recieveCurrencyChange.bind(this);
    this.fiatJSTValueChange = this.fiatJSTValueChange.bind(this);
    this.calculateOrderVaules = this.calculateOrderVaules.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateUSDData = this.updateUSDData.bind(this);
    // this.showCalculatedValues = this.showCalculatedValues.bind(this);
    // this.showCalculatedValuesUSDTerms = this.showCalculatedValuesUSDTerms.bind(
    //   this
    // );
    this.getValuesSocket = this.getValuesSocket.bind(this);
    this.getValuesUSDSocket = this.getValuesUSDSocket.bind(this);
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
    if (this.props.io) {
      this.props.io.on("conversion-data-outgoing", data => {
        if (data.is_usd_set) {
          this.updateUSDData(data);
        } else {
          this.updateData(data);
        }
      });
    }
    // if (this.state.includeFees === 1) {
    //   if (
    //     this.state.recieveCurrencyInput !== "" ||
    //     this.state.fiatJSTValue !== ""
    //   ) {
    //     console.log("recieve editable");
    //     this.interval = setInterval(() => {
    //       this.getValuesSocket();
    //     }, 5000);
    //   } else {
    //     console.log("clear editable");
    //     clearInterval(this.interval);
    //   }
    //   // else {
    //   //   clearInterval(this.interval);
    //   // }
    //   // else if (
    //   //   this.state.fiatJSTValue !== "" &&
    //   //   this.state.recieveCurrencyInput === ""
    //   // ) {
    //   //   console.log("fiat editable");
    //   //   this.interval1 = setInterval(() => {
    //   //     this.getValuesUSDSocket();
    //   //   }, 5000);
    //   // } else {
    //   //   // clearInterval(this.interval1);
    //   //   console.log("else");
    //   //   clearInterval(this.interval);
    //   // }
    // }
    // if (this.state.includeFees === 2) {
    //   if (
    //     this.state.sendCurrencyInput !== "" ||
    //     this.state.fiatJSTValue !== ""
    //   ) {
    //     this.interval = setInterval(() => {
    //       this.getValuesSocket();
    //     }, 5000);
    //   } else {
    //     clearInterval(this.interval);
    //   }
    //   if (this.state.fiatJSTValue !== "") {
    //     this.interval1 = setInterval(() => {
    //       this.getValuesUSDSocket();
    //     }, 5000);
    //   } else {
    //     clearInterval(this.interval1);
    //   }
    // }
    // if (this.props.io) {
    //   this.props.io.on("conversion-data-incoming", data => {
    //     console.log(data);
    //     this.updateInstrumentsData(data);
    //   });
    // }
    this.getCrypto();
    if (this.props.profileDetails.is_twofactor) {
      this.setState({
        checkOTP: true
      });
    } else {
      this.setState({
        checkOTP: false
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getValuesSocket(showLoader = true) {
    if (showLoader) {
      this.setState({
        loader: true
      });
    }
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
        order_pair: this.state.order_pair,
        offer_code: this.state.appliedOfferCode
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
        order_pair: this.state.order_pair,
        offer_code: this.state.appliedOfferCode
      };
    }
    if (
      (values.OrderQty === null ||
        values.OrderQty === "" ||
        isNaN(this.state.recieveCurrencyInput) === true) &&
      this.state.includeFees === 1
    ) {
      this.setState({
        includeFees: 1,
        sendCurrencyInput: 0,
        fiatJSTValue: "",
        crypto: this.state.crypto,
        displayCurrency: null,
        currency: this.state.currency,
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        faldaxFeeActual: 0,
        limitPrice: 0,
        networkFee: 0,
        loader: false
      });
    } else if (
      (values.OrderQty === null ||
        values.OrderQty === "" ||
        isNaN(this.state.sendCurrencyInput) === true) &&
      // !isNaN(this.state.sendCurrencyInput) &&
      this.state.includeFees === 2
    ) {
      // this.setState({ loader: false });
      // this.validator2.showMessages();
      // this.forceUpdate();
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
        faldaxFeeActual: 0,
        limitPrice: 0,
        networkFee: 0,
        loader: false
      });
    } else {
      if (this.props.io) {
        this.props.io.emit("conversion-data-incoming", {
          user_id: this.props.profileDetails.id,
          Symbol: values.Symbol,
          Side: values.Side,
          OrderQty: values.OrderQty,
          Currency: values.Currency,
          OrdType: values.OrdType,
          flag: values.flag,
          offer_code: values.offer_code,
          order_pair: values.order_pair,
          original_pair: values.original_pair,
          usd_value: values.usd_value
        });
      }
      this.setState({
        values
      });
      // let URL = `/socket/get-conversionDetail?Currency=${values.Currency}&OrdType=${values.OrdType}&OrderQty=${values.OrderQty}&Side=${values.Side}&Symbol=${values.Symbol}&flag=${values.flag}&offer_code=${values.offer_code}&order_pair=${values.order_pair}&original_pair=${values.original_pair}&usd_value=${values.usd_value}`;
      // io.socket.request(
      //   {
      //     method: "GET",
      //     url: URL,
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + this.props.isLoggedIn
      //     }
      //   },
      //   (body, JWR) => {
      //     if (body.status === 200) {
      //       let res = body.data;
      //       // console.log("getsocketvalues", res);
      //       this.setState({
      //         // loader: false,
      //         subTotal: parseFloat(res.original_value).toFixed(8),
      //         faldaxFee: parseFloat(res.faldax_fee).toFixed(8),
      //         faldaxFeeActual: parseFloat(res.faldax_fees_actual).toFixed(8),
      //         limitPrice: parseFloat(res.limit_price).toFixed(8),
      //         networkFee: parseFloat(res.network_fee).toFixed(8),
      //         totalAmount: parseFloat(res.total_value).toFixed(8),
      //         fiatJSTValue: parseFloat(res.price_usd).toFixed(2),
      //         displayCurrency: res.currency,
      //         Quantity: parseFloat(res.total_value).toFixed(8),
      //         flag: values.flag,
      //         disabledButton: false
      //       });
      //       if (this.state.includeFees === 1) {
      //         this.setState({
      //           sendCurrencyInput: parseFloat(res.currency_value).toFixed(8),
      //           orderQuantity: parseFloat(res.currency_value).toFixed(8),
      //           subTotalJST: parseFloat(res.total_value).toFixed(8)
      //           // loader: false
      //         });
      //       } else {
      //         this.setState({
      //           recieveCurrencyInput: parseFloat(res.total_value).toFixed(8),
      //           orderQuantity: parseFloat(res.currency_value).toFixed(8),
      //           subTotalJST: parseFloat(res.original_value).toFixed(8)
      //           // loader: false
      //         });
      //       }
      //       if (this.state.includeFees === 1 && this.state.OrdType === "1") {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.original_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else if (
      //         this.state.includeFees === 2 &&
      //         this.state.OrdType === "1"
      //       ) {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.total_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else if (
      //         this.state.includeFees === 2 &&
      //         this.state.OrdType === "2"
      //       ) {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else if (
      //         this.state.includeFees === 1 &&
      //         this.state.OrdType === "2"
      //       ) {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else {
      //         // console.log("no scenario");
      //       }
      //     } else if (body.status === 403) {
      //       // console.log(body.err);
      //       this.openNotificationWithIcon("error", "Error", body.err);
      //       let tempValue2 = {};
      //       tempValue2["user_id"] = this.props.profileDetails.id;
      //       tempValue2["jwt_token"] = this.props.isLoggedIn;
      //       this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
      //     } else {
      //       // console.log(body.err);
      //       this.openNotificationWithIcon("error", "Error", body.err);
      //     }
      //     // console.log("getsocketvalues", body);
      //     this.setState({
      //       loader: false
      //     });
      //   }
      // );
    }
  }
  updateData(data) {
    console.log("^^^^^crypto", data);
    let res = data;
    let values = this.state.values;
    this.setState({
      subTotal: parseFloat(res.original_value).toFixed(8),
      faldaxFee: parseFloat(res.faldax_fee).toFixed(8),
      faldaxFeeActual: parseFloat(res.faldax_fees_actual).toFixed(8),
      limitPrice: parseFloat(res.limit_price).toFixed(8),
      networkFee: parseFloat(res.network_fee).toFixed(8),
      totalAmount: parseFloat(res.total_value).toFixed(8),
      fiatJSTValue: parseFloat(res.price_usd).toFixed(2),
      displayCurrency: res.currency,
      Quantity: parseFloat(res.total_value).toFixed(8),
      flag: values.flag,
      disabledButton: false
    });
    if (this.state.includeFees === 1) {
      this.setState({
        sendCurrencyInput: parseFloat(res.currency_value).toFixed(8),
        orderQuantity: parseFloat(res.currency_value).toFixed(8),
        subTotalJST: parseFloat(res.total_value).toFixed(8)
      });
    } else {
      this.setState({
        recieveCurrencyInput: parseFloat(res.total_value).toFixed(8),
        orderQuantity: parseFloat(res.currency_value).toFixed(8),
        subTotalJST: parseFloat(res.original_value).toFixed(8)
      });
    }
    if (this.state.includeFees === 1 && this.state.OrdType === "1") {
      this.setState({
        OriginalQuantity: parseFloat(res.original_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else if (this.state.includeFees === 2 && this.state.OrdType === "1") {
      this.setState({
        OriginalQuantity: parseFloat(res.total_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else if (this.state.includeFees === 2 && this.state.OrdType === "2") {
      this.setState({
        OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else if (this.state.includeFees === 1 && this.state.OrdType === "2") {
      this.setState({
        OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else {
      // console.log("no scenario");
    }
    this.setState({
      loader: false
    });
  }
  updateUSDData(data) {
    let res = data;
    let values = this.state.usdvalues;
    console.log("^^^^USD", data);
    this.setState({
      faldaxFee: parseFloat(res.faldax_fee).toFixed(8),
      faldaxFeeActual: parseFloat(res.faldax_fees_actual).toFixed(8),
      limitPrice: parseFloat(res.limit_price).toFixed(8),
      networkFee: parseFloat(res.network_fee).toFixed(8),
      displayCurrency: res.currency,
      Quantity: parseFloat(res.total_value).toFixed(8),
      flag: values.flag,
      disabledButton: false
    });
    if (this.state.includeFees === 1) {
      this.setState({
        sendCurrencyInput: parseFloat(res.currency_value).toFixed(8),
        recieveCurrencyInput: parseFloat(res.original_value).toFixed(8),
        orderQuantity: parseFloat(res.currency_value).toFixed(8),
        subTotal: parseFloat(res.original_value).toFixed(8),
        totalAmount: parseFloat(res.total_value).toFixed(8),
        subTotalJST: parseFloat(res.total_value).toFixed(8)
      });
    } else {
      this.setState({
        recieveCurrencyInput: parseFloat(res.total_value).toFixed(8),
        sendCurrencyInput: parseFloat(res.currency_value).toFixed(8),
        orderQuantity: parseFloat(res.currency_value).toFixed(8),
        subTotal: parseFloat(res.original_value).toFixed(8),
        totalAmount: parseFloat(res.total_value).toFixed(8),
        subTotalJST: parseFloat(res.original_value).toFixed(8)
      });
    }
    if (this.state.includeFees === 1 && this.state.OrdType === "1") {
      this.setState({
        OriginalQuantity: parseFloat(res.original_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else if (this.state.includeFees === 2 && this.state.OrdType === "1") {
      this.setState({
        OriginalQuantity: parseFloat(res.total_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else if (this.state.includeFees === 2 && this.state.OrdType === "2") {
      this.setState({
        OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else if (this.state.includeFees === 1 && this.state.OrdType === "2") {
      this.setState({
        OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
        buy_currency_amount:
          values.flag == 1
            ? parseFloat(res.total_value).toFixed(8)
            : parseFloat(res.original_value).toFixed(8),
        sell_currency_amount:
          values.flag == 1
            ? parseFloat(res.currency_value).toFixed(8)
            : parseFloat(res.currency_value).toFixed(8)
      });
    } else {
      // console.log("no scenario");
    }
    this.setState({
      loader: false
    });
  }
  getValuesUSDSocket(showLoader = true) {
    if (showLoader) {
      this.setState({
        loader: true
      });
    }
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
        order_pair: this.state.order_pair,
        offer_code: this.state.appliedOfferCode
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
        order_pair: this.state.order_pair,
        offer_code: this.state.appliedOfferCode
      };
    }
    if (
      (values.usd_value === null ||
        values.usd_value === "" ||
        isNaN(this.state.fiatJSTValue) === true) &&
      this.state.includeFees === 1
    ) {
      // this.validator1.showMessages();
      // this.forceUpdate();
      this.setState({
        recieveCurrencyInput: "",
        includeFees: 1,
        sendCurrencyInput: 0,
        crypto: this.state.crypto,
        displayCurrency: null,
        currency: this.state.currency,
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        faldaxFeeActual: 0,
        limitPrice: 0,
        networkFee: 0,
        loader: false
      });
    } else if (
      (values.usd_value === null ||
        values.usd_value === "" ||
        isNaN(this.state.fiatJSTValue) === true) &&
      this.state.includeFees === 2
    ) {
      // this.validator2.showMessages();
      // this.forceUpdate();
      this.setState({
        sendCurrencyInput: "",
        includeFees: 2,
        recieveCurrencyInput: 0,
        crypto: this.state.crypto,
        displayCurrency: null,
        currency: this.state.currency,
        subTotal: 0,
        totalAmount: 0,
        faldaxFee: 0,
        faldaxFeeActual: 0,
        limitPrice: 0,
        networkFee: 0,
        loader: false
      });
    } else {
      if (this.props.io) {
        this.props.io.emit("conversion-data-incoming", {
          // user_id: this.props.profileDetails.id,
          Symbol: values.Symbol,
          Side: values.Side,
          OrderQty: values.OrderQty,
          Currency: values.Currency,
          OrdType: values.OrdType,
          flag: values.flag,
          offer_code: values.offer_code,
          order_pair: values.order_pair,
          original_pair: values.original_pair,
          usd_value: values.usd_value
        });
      }
      this.setState({
        usdvalues: values
      });
      // let URL = `/socket/get-conversionDetail?Currency=${values.Currency}&OrdType=${values.OrdType}&OrderQty=${values.OrderQty}&Side=${values.Side}&Symbol=${values.Symbol}&flag=${values.flag}&offer_code=${values.offer_code}&order_pair=${values.order_pair}&original_pair=${values.original_pair}&usd_value=${values.usd_value}`;
      // io.socket.request(
      //   {
      //     method: "GET",
      //     url: URL,
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + this.props.isLoggedIn
      //     }
      //   },
      //   (body, JWR) => {
      //     if (body.status === 200) {
      //       let res = body.data;
      //       // console.log("getsocketUSdvalues", res);
      //       this.setState({
      //         faldaxFee: parseFloat(res.faldax_fee).toFixed(8),
      //         faldaxFeeActual: parseFloat(res.faldax_fees_actual).toFixed(8),
      //         limitPrice: parseFloat(res.limit_price).toFixed(8),
      //         networkFee: parseFloat(res.network_fee).toFixed(8),
      //         displayCurrency: res.currency,
      //         Quantity: parseFloat(res.total_value).toFixed(8),
      //         flag: values.flag,
      //         disabledButton: false
      //       });
      //       if (this.state.includeFees === 1) {
      //         this.setState({
      //           sendCurrencyInput: parseFloat(res.currency_value).toFixed(8),
      //           recieveCurrencyInput: parseFloat(res.original_value).toFixed(8),
      //           orderQuantity: parseFloat(res.currency_value).toFixed(8),
      //           subTotal: parseFloat(res.original_value).toFixed(8),
      //           totalAmount: parseFloat(res.total_value).toFixed(8),
      //           subTotalJST: parseFloat(res.total_value).toFixed(8)
      //         });
      //       } else {
      //         this.setState({
      //           recieveCurrencyInput: parseFloat(res.total_value).toFixed(8),
      //           sendCurrencyInput: parseFloat(res.currency_value).toFixed(8),
      //           orderQuantity: parseFloat(res.currency_value).toFixed(8),
      //           subTotal: parseFloat(res.original_value).toFixed(8),
      //           totalAmount: parseFloat(res.total_value).toFixed(8),
      //           subTotalJST: parseFloat(res.original_value).toFixed(8)
      //         });
      //       }
      //       if (this.state.includeFees === 1 && this.state.OrdType === "1") {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.original_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else if (
      //         this.state.includeFees === 2 &&
      //         this.state.OrdType === "1"
      //       ) {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.total_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else if (
      //         this.state.includeFees === 2 &&
      //         this.state.OrdType === "2"
      //       ) {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else if (
      //         this.state.includeFees === 1 &&
      //         this.state.OrdType === "2"
      //       ) {
      //         this.setState({
      //           OriginalQuantity: parseFloat(res.currency_value).toFixed(8),
      //           buy_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.total_value).toFixed(8)
      //               : parseFloat(res.original_value).toFixed(8),
      //           sell_currency_amount:
      //             values.flag == 1
      //               ? parseFloat(res.currency_value).toFixed(8)
      //               : parseFloat(res.currency_value).toFixed(8)
      //         });
      //       } else {
      //         // console.log("no scenario");
      //       }
      //     } else if (body.status === 403) {
      //       // console.log(body.err);
      //       this.openNotificationWithIcon("error", "Error", body.err);
      //       let tempValue2 = {};
      //       tempValue2["user_id"] = this.props.profileDetails.id;
      //       tempValue2["jwt_token"] = this.props.isLoggedIn;
      //       this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
      //     } else {
      //       // console.log(body.err);
      //       this.openNotificationWithIcon("error", "Error", body.err);
      //     }
      //     this.setState({
      //       loader: false
      //     });
      //   }
      // );
    }
  }
  sendCurrencyChange(e) {
    if (this.state.loader) {
      return false;
    }
    this.setState({
      disabledButton: true
    });
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    clearInterval(this.interval1);
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
    this.timeout = setTimeout(this.getValuesSocket, 1000);
    if (this.validator2.allValid() && e.target.value != null) {
      this.setState(
        {
          sendCurrencyInput: e.target.value,
          showTFAModal: false
        },
        () => {}
      );
    } else {
      this.setState(
        {
          sendCurrencyInput: e.target.value,
          showTFAModal: false
        },
        () => {}
      );
      this.validator2.showMessages();
      this.forceUpdate();
    }
  }
  recieveCurrencyChange(e) {
    if (this.state.loader) {
      return false;
    }
    this.setState({
      disabledButton: true
    });
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    clearInterval(this.interval1);
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
    this.timeout = setTimeout(this.getValuesSocket, 1000);
    this.interval = setInterval(() => {
      this.getValuesSocket(false);
    }, this.state.socketTime);
    if (this.validator1.allValid()) {
      this.setState(
        {
          recieveCurrencyInput: e.target.value,
          showTFAModal: false
        },
        () => {
          // clearInterval(this.interval);
          // console.log("set", e);
        }
      );
    } else {
      this.setState(
        {
          recieveCurrencyInput: e.target.value,
          showTFAModal: false
        },
        () => {
          // console.log("clear", e);
          // clearInterval(this.interval);
        }
      );
      this.validator1.showMessages();
      this.forceUpdate();
    }
  }
  fiatJSTValueChange(e) {
    if (this.state.loader) {
      return false;
    }
    this.setState({
      disabledButton: true
    });
    clearTimeout(this.timeout);
    // console.log("Fiat Currency Change");
    clearInterval(this.interval);
    clearInterval(this.interval1);
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
    this.timeout = setTimeout(this.getValuesUSDSocket, 1000);
    this.interval = setInterval(() => {
      this.getValuesUSDSocket(false);
    }, this.state.socketTime);
    if (this.state.includeFees === 1) {
      if (this.validator1.allValid() && e.target.value != null) {
        this.setState(
          {
            fiatJSTValue: e.target.value,
            showTFAModal: false
          },
          () => {}
        );
      } else {
        this.setState(
          {
            fiatJSTValue: e.target.value,
            showTFAModal: false
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
            fiatJSTValue: e.target.value,
            showTFAModal: false
          },
          () => {}
        );
      } else {
        this.setState(
          {
            fiatJSTValue: e.target.value,
            showTFAModal: false
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
  // showCalculatedValues() {
  //   // console.log(!isNaN(this.state.recieveCurrencyInput));
  //   this.setState({ loader: true });
  //   if (this.state.includeFees === 1) {
  //     var values = {
  //       Symbol: this.state.original_pair,
  //       // Symbol: `${this.state.crypto}/${this.state.currency}`,
  //       Side: this.state.OrdType,
  //       OrderQty: this.state.recieveCurrencyInput,
  //       Currency: this.state.crypto,
  //       OrdType: "1",
  //       flag: "2",
  //       usd_value: "",
  //       original_pair: this.state.original_pair,
  //       order_pair: this.state.order_pair,
  //       offer_code: this.state.appliedOfferCode
  //     };
  //     // console.log(values);
  //   } else {
  //     var values = {
  //       Symbol: this.state.original_pair,
  //       // Symbol: `${this.state.crypto}/${this.state.currency}`,
  //       Side: this.state.OrdType,
  //       OrderQty: this.state.sendCurrencyInput,
  //       Currency: this.state.currency,
  //       OrdType: "1",
  //       flag: "1",
  //       usd_value: "",
  //       original_pair: this.state.original_pair,
  //       order_pair: this.state.order_pair,
  //       offer_code: this.state.appliedOfferCode
  //     };
  //   }
  //   // console.log("Values-----------", values);
  //   if (
  //     (values.OrderQty === null ||
  //       values.OrderQty === "" ||
  //       isNaN(this.state.recieveCurrencyInput) === true) &&
  //     // isNaN(this.state.recieveCurrencyInput) === true &&
  //     this.state.includeFees === 1
  //   ) {
  //     // console.log(!isNaN(this.state.recieveCurrencyInput));
  //     // this.setState({ loader: false });
  //     this.validator1.showMessages();
  //     this.forceUpdate();
  //     this.setState({
  //       // recieveCurrencyInput: "",
  //       includeFees: 1,
  //       sendCurrencyInput: 0,
  //       fiatJSTValue: "",
  //       crypto: this.state.crypto,
  //       displayCurrency: null,
  //       currency: this.state.currency,
  //       subTotal: 0,
  //       totalAmount: 0,
  //       faldaxFee: 0,
  //       faldaxFeeActual: 0,
  //       limitPrice: 0,
  //       networkFee: 0,
  //       loader: false
  //     });
  //   } else if (
  //     (values.OrderQty === null ||
  //       values.OrderQty === "" ||
  //       isNaN(this.state.sendCurrencyInput) === true) &&
  //     // !isNaN(this.state.sendCurrencyInput) &&
  //     this.state.includeFees === 2
  //   ) {
  //     // this.setState({ loader: false });
  //     this.validator2.showMessages();
  //     this.forceUpdate();
  //     this.setState({
  //       // sendCurrencyInput: 0,
  //       includeFees: 2,
  //       recieveCurrencyInput: 0,
  //       fiatJSTValue: "",
  //       crypto: this.state.crypto,
  //       displayCurrency: null,
  //       currency: this.state.currency,
  //       subTotal: 0,
  //       totalAmount: 0,
  //       faldaxFee: 0,
  //       faldaxFeeActual: 0,
  //       limitPrice: 0,
  //       networkFee: 0,
  //       loader: false
  //     });
  //   } else {
  //     fetch(`${API_URL}/conversion/get-jst-price-value`, {
  //       method: "post",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  // "Accept-Language": localStorage["i18nextLng"],
  //         Authorization: "Bearer " + this.props.isLoggedIn
  //       },
  //       body: JSON.stringify(values)
  //     })
  //       .then(response => response.json())
  //       .then(responseData => {
  //         if (responseData.status === 200) {
  //           // this.setState({ loader: false })
  //           this.setState({
  //             loader: false,
  //             subTotal: parseFloat(responseData.data.original_value).toFixed(8),
  //             faldaxFee: parseFloat(responseData.data.faldax_fee).toFixed(8),
  //             faldaxFeeActual: parseFloat(
  //               responseData.data.faldax_fees_actual
  //             ).toFixed(8),
  //             limitPrice: parseFloat(responseData.data.limit_price).toFixed(8),
  //             networkFee: parseFloat(responseData.data.network_fee).toFixed(8),
  //             totalAmount: parseFloat(responseData.data.total_value).toFixed(8),
  //             fiatJSTValue: parseFloat(responseData.data.price_usd).toFixed(2),
  //             displayCurrency: responseData.data.currency,
  //             Quantity: parseFloat(responseData.data.total_value).toFixed(8)
  //           });
  //           if (this.state.includeFees === 1) {
  //             this.setState({
  //               sendCurrencyInput: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8),
  //               orderQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8)
  //               // loader: false
  //             });
  //           } else {
  //             this.setState({
  //               recieveCurrencyInput: parseFloat(
  //                 responseData.data.total_value
  //               ).toFixed(8),
  //               orderQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8)
  //               // loader: false
  //             });
  //           }
  //           if (this.state.includeFees === 1 && this.state.OrdType === "1") {
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.original_value
  //               ).toFixed(8),
  //               buy_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.total_value).toFixed(8)
  //                   : parseFloat(responseData.data.original_value).toFixed(8),
  //               sell_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.currency_value).toFixed(8)
  //                   : parseFloat(responseData.data.currency_value).toFixed(8)
  //             });
  //           } else if (
  //             this.state.includeFees === 2 &&
  //             this.state.OrdType === "1"
  //           ) {
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.total_value
  //               ).toFixed(8),
  //               buy_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.total_value).toFixed(8)
  //                   : parseFloat(responseData.data.original_value).toFixed(8),
  //               sell_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.currency_value).toFixed(8)
  //                   : parseFloat(responseData.data.currency_value).toFixed(8)
  //             });
  //           } else if (
  //             this.state.includeFees === 2 &&
  //             this.state.OrdType === "2"
  //           ) {
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8),
  //               buy_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.total_value).toFixed(8)
  //                   : parseFloat(responseData.data.original_value).toFixed(8),
  //               sell_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.currency_value).toFixed(8)
  //                   : parseFloat(responseData.data.currency_value).toFixed(8)
  //             });
  //           } else if (
  //             this.state.includeFees === 1 &&
  //             this.state.OrdType === "2"
  //           ) {
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8),
  //               buy_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.total_value).toFixed(8)
  //                   : parseFloat(responseData.data.original_value).toFixed(8),
  //               sell_currency_amount:
  //                 values.flag == 1
  //                   ? parseFloat(responseData.data.currency_value).toFixed(8)
  //                   : parseFloat(responseData.data.currency_value).toFixed(8)
  //             });
  //           } else {
  //             console.log("no scenario");
  //           }
  //           this.setState({ loader: false });
  //         } else if (responseData.status === 500) {
  //           this.setState({ loader: false });
  //           this.openNotificationWithIcon("error", "Error", responseData.err);
  //         } else {
  //           this.setState({ loader: false });
  //           this.openNotificationWithIcon("error", "Error", responseData.err);
  //         }
  //       })
  //       .catch(error => {});
  //   }
  // }
  // showCalculatedValuesUSDTerms() {
  //   this.setState({ loader: true });
  //   // console.log("Order values to display");
  //   if (this.state.includeFees === 1) {
  //     var values = {
  //       Symbol: this.state.original_pair,
  //       Side: this.state.OrdType,
  //       OrderQty: this.state.recieveCurrencyInput,
  //       Currency: this.state.crypto,
  //       OrdType: "1",
  //       flag: "2",
  //       usd_value: this.state.fiatJSTValue,
  //       original_pair: this.state.original_pair,
  //       order_pair: this.state.order_pair,
  //       offer_code: this.state.appliedOfferCode
  //     };
  //   } else {
  //     var values = {
  //       Symbol: this.state.original_pair,
  //       Side: this.state.OrdType,
  //       OrderQty: this.state.sendCurrencyInput,
  //       Currency: this.state.currency,
  //       OrdType: "1",
  //       flag: "1",
  //       usd_value: this.state.fiatJSTValue,
  //       original_pair: this.state.original_pair,
  //       order_pair: this.state.order_pair,
  //       offer_code: this.state.appliedOfferCode
  //     };
  //   }
  //   if (
  //     (values.usd_value === null ||
  //       values.usd_value === "" ||
  //       isNaN(this.state.fiatJSTValue) === true) &&
  //     this.state.includeFees === 1
  //   ) {
  //     // this.setState({ loader: false });
  //     this.validator1.showMessages();
  //     this.forceUpdate();
  //     this.setState({
  //       recieveCurrencyInput: "",
  //       includeFees: 1,
  //       sendCurrencyInput: 0,
  //       // fiatJSTValue: 0,
  //       crypto: this.state.crypto,
  //       displayCurrency: null,
  //       currency: this.state.currency,
  //       subTotal: 0,
  //       totalAmount: 0,
  //       faldaxFee: 0,
  //       faldaxFeeActual: 0,
  //       limitPrice: 0,
  //       networkFee: 0,
  //       loader: false
  //     });
  //   } else if (
  //     (values.usd_value === null ||
  //       values.usd_value === "" ||
  //       isNaN(this.state.fiatJSTValue) === true) &&
  //     this.state.includeFees === 2
  //   ) {
  //     // this.setState({ loader: false });
  //     this.validator2.showMessages();
  //     this.forceUpdate();
  //     this.setState({
  //       sendCurrencyInput: "",
  //       includeFees: 2,
  //       recieveCurrencyInput: 0,
  //       // fiatJSTValue: 0,
  //       crypto: this.state.crypto,
  //       displayCurrency: null,
  //       currency: this.state.currency,
  //       subTotal: 0,
  //       totalAmount: 0,
  //       faldaxFee: 0,
  //       faldaxFeeActual: 0,
  //       limitPrice: 0,
  //       networkFee: 0,
  //       loader: false
  //     });
  //   } else {
  //     fetch(`${API_URL}/conversion/get-jst-price-value`, {
  //       method: "post",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  // "Accept-Language": localStorage["i18nextLng"],
  //         Authorization: "Bearer " + this.props.isLoggedIn
  //       },
  //       body: JSON.stringify(values)
  //     })
  //       .then(response => response.json())
  //       .then(responseData => {
  //         if (responseData.status === 200) {
  //           // console.log("Response Data 200", responseData.data);
  //           this.setState({
  //             // subTotal: parseFloat(responseData.data.original_value).toFixed(8),
  //             faldaxFee: parseFloat(responseData.data.faldax_fee).toFixed(8),
  //             faldaxFeeActual: parseFloat(
  //               responseData.data.faldax_fees_actual
  //             ).toFixed(8),
  //             limitPrice: parseFloat(responseData.data.limit_price).toFixed(8),
  //             networkFee: parseFloat(responseData.data.network_fee).toFixed(8),
  //             // totalAmount: parseFloat(responseData.data.total_value).toFixed(8),
  //             displayCurrency: responseData.data.currency,
  //             Quantity: parseFloat(responseData.data.total_value).toFixed(8),
  //             loader: false
  //             // orderQuantity: responseData.data.orderQuantity
  //           });
  //           if (this.state.includeFees === 1) {
  //             this.setState({
  //               sendCurrencyInput: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8),
  //               recieveCurrencyInput: parseFloat(
  //                 responseData.data.original_value
  //               ).toFixed(8),
  //               orderQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8),
  //               subTotal: parseFloat(responseData.data.original_value).toFixed(
  //                 8
  //               ),
  //               totalAmount: parseFloat(responseData.data.total_value).toFixed(
  //                 8
  //               ),
  //               loader: false
  //             });
  //           } else {
  //             this.setState({
  //               recieveCurrencyInput: parseFloat(
  //                 responseData.data.total_value
  //               ).toFixed(8),
  //               sendCurrencyInput: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8),
  //               orderQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8),
  //               subTotal: parseFloat(responseData.data.original_value).toFixed(
  //                 8
  //               ),
  //               totalAmount: parseFloat(responseData.data.total_value).toFixed(
  //                 8
  //               ),
  //               loader: false
  //             });
  //           }
  //           if (this.state.includeFees === 1 && this.state.OrdType === "1") {
  //             // console.log(
  //             //   this.state.includeFees,
  //             //   this.state.OrdType,
  //             //   responseData.data.original_value
  //             // );
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.original_value
  //               ).toFixed(8)
  //             });
  //           } else if (
  //             this.state.includeFees === 2 &&
  //             this.state.OrdType === "1"
  //           ) {
  //             // console.log(
  //             //   this.state.includeFees,
  //             //   this.state.OrdType,
  //             //   responseData.data.total_value
  //             // );
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.total_value
  //               ).toFixed(8)
  //             });
  //           } else if (
  //             this.state.includeFees === 2 &&
  //             this.state.OrdType === "2"
  //           ) {
  //             // console.log(
  //             //   this.state.includeFees,
  //             //   this.state.OrdType,
  //             //   responseData.data.currency_value
  //             // );
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8)
  //             });
  //           } else if (
  //             this.state.includeFees === 1 &&
  //             this.state.OrdType === "2"
  //           ) {
  //             // console.log(
  //             //   this.state.includeFees,
  //             //   this.state.OrdType,
  //             //   responseData.data.currency_value
  //             // );
  //             this.setState({
  //               OriginalQuantity: parseFloat(
  //                 responseData.data.currency_value
  //               ).toFixed(8)
  //             });
  //           } else {
  //             console.log("no scenario");
  //           }
  //         } else if (responseData.status === 500) {
  //           this.setState({ loader: false });
  //           this.openNotificationWithIcon("error", "Error", responseData.err);
  //         } else {
  //           this.setState({ loader: false });
  //           this.openNotificationWithIcon("error", "Error", responseData.err);
  //         }
  //       })
  //       .catch(error => {});
  //   }
  // }
  calculateOrderVaules(otp = "") {
    clearInterval(this.interval);
    clearInterval(this.interval1);
    // console.log("Order");
    this.setState({ loader: true });
    // console.log(this.state);
    if (this.state.checkOTP) {
      this.setState({
        showTFAModal: true
        // loader: false
      });
      let otp1 = otp;
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
          order_pair: this.state.order_pair,
          faldax_fees: this.state.faldaxFee,
          faldax_fees_actual: this.state.faldaxFeeActual,
          limit_price: this.state.limitPrice,
          network_fees: this.state.networkFee,
          offer_code: this.state.appliedOfferCode,
          buy_currency_amount: this.state.buy_currency_amount,
          sell_currency_amount: this.state.sell_currency_amount,
          otp: otp1,
          flag: this.state.flag,
          subtotal: this.state.subTotalJST
        };
        // console.log(values);
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
          order_pair: this.state.order_pair,
          faldax_fees: this.state.faldaxFee,
          faldax_fees_actual: this.state.faldaxFeeActual,
          limit_price: this.state.limitPrice,
          network_fees: this.state.networkFee,
          offer_code: this.state.appliedOfferCode,
          buy_currency_amount: this.state.buy_currency_amount,
          sell_currency_amount: this.state.sell_currency_amount,
          otp: otp1,
          flag: this.state.flag,
          subtotal: this.state.subTotalJST
        };
        // console.log(values);
      }
      fetch(`${API_URL}/converion/jst-create-order`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
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
              recieveCurrencyInput: "",
              includeFees: 1,
              sendCurrencyInput: "",
              fiatJSTValue: "",
              crypto: this.state.crypto,
              displayCurrency: null,
              currency: this.state.currency,
              subTotal: 0,
              totalAmount: 0,
              faldaxFee: 0,
              faldaxFeeActual: 0,
              networkFee: 0,
              appliedOfferCode: "",
              showTFAModal: false
              // loader: false
            });
            this.clearValidation();
          } else {
            // console.log("--------------------", otp);
            if (values.otp === "") {
              // console.log(otp);
            } else {
              // console.log(otp);
              this.openNotificationWithIcon(
                "error",
                "Error",
                responseData.message
              );
              this.setState({
                showTFAModal: false
              });
            }
          }
          this.setState({ loader: false });
        })
        .catch(error => {});
    } else {
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
          order_pair: this.state.order_pair,
          faldax_fees: this.state.faldaxFee,
          faldax_fees_actual: this.state.faldaxFeeActual,
          limit_price: this.state.limitPrice,
          network_fees: this.state.networkFee,
          offer_code: this.state.appliedOfferCode,
          buy_currency_amount: this.state.buy_currency_amount,
          sell_currency_amount: this.state.sell_currency_amount,
          otp: "",
          flag: this.state.flag,
          subtotal: this.state.subTotalJST
        };
        // console.log(values);
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
          order_pair: this.state.order_pair,
          faldax_fees: this.state.faldaxFee,
          faldax_fees_actual: this.state.faldaxFeeActual,
          limit_price: this.state.limitPrice,
          network_fees: this.state.networkFee,
          offer_code: this.state.appliedOfferCode,
          buy_currency_amount: this.state.buy_currency_amount,
          sell_currency_amount: this.state.sell_currency_amount,
          otp: "",
          flag: this.state.flag,
          subtotal: this.state.subTotalJST
        };
        // console.log(values);
      }
      fetch(`${API_URL}/converion/jst-create-order`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
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
              recieveCurrencyInput: "",
              includeFees: 1,
              sendCurrencyInput: "",
              fiatJSTValue: "",
              crypto: this.state.crypto,
              displayCurrency: null,
              currency: this.state.currency,
              subTotal: 0,
              totalAmount: 0,
              faldaxFee: 0,
              faldaxFeeActual: 0,
              limitPrice: 0,
              networkFee: 0,
              appliedOfferCode: ""
              // loader: false
            });
            this.clearValidation();
          } else {
            this.openNotificationWithIcon(
              "error",
              "Error",
              responseData.message
            );
            this.setState({
              showTFAModal: false
            });
          }
          this.setState({ loader: false });
        })
        .catch(error => {});
    }
  }
  getFiatCurrencyList() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/get-simplex-coin-list`, {
      method: "get",
      headers: {
        "Accept-Language": localStorage["i18nextLng"],
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          this.setState({
            fiatCurrencyList: responseData.object.fiat
          });
        }
        this.setState({
          loader: false
        });
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
        "Accept-Language": localStorage["i18nextLng"],
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
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
            faldax_fee_value: responseData.faldax_fee.value,
            minCrypto: minLimit,
            minCurrency: minCurrLimit
          });
        }
        this.setState({
          loader: false
        });
      })
      .catch(error => {});
  }
  handleCryptoChange(value, option) {
    // console.log(
    //   "option.props.selectedData.min_limit",
    //   option.props.selectedData.jst_min_coin_limit
    // );
    this.setState({
      disabledButton: true
    });
    clearInterval(this.interval);
    clearInterval(this.interval1);
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
        // console.log("^^^^this.state.currencyList XRP", this.state.currencyList);
        if (
          this.state.currencyList[0].coin === "LTC" ||
          this.state.currencyList[0].coin === "ETH"
        ) {
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
        // console.log("^^^^this.state.currencyList LTC", this.state.currencyList);
        if (
          this.state.currencyList[0].coin === "XRP" ||
          this.state.currencyList[0].coin === "ETH"
        ) {
          this.setState({
            currency: this.state.currencyList[1].coin,
            minCurrency: this.state.currencyList[1].jst_min_coin_limit
          });
        }
        // else if (this.state.currencyList[0].coin === "ETH") {
        //   this.setState({
        //     currency: this.state.currencyList[1].coin,
        //     minCurrency: this.state.currencyList[1].jst_min_coin_limit
        //   });
        // }
        else {
          this.setState({
            currency: this.state.currencyList[0].coin,
            minCurrency: this.state.currencyList[0].jst_min_coin_limit
          });
        }
      } else if (value === "ETH") {
        // console.log("^^^^this.state.currencyList ETH", this.state.currencyList);
        if (
          this.state.currencyList[0].coin === "XRP" ||
          this.state.currencyList[0].coin === "LTC"
        ) {
          this.setState({
            currency: this.state.currencyList[1].coin,
            minCurrency: this.state.currencyList[1].jst_min_coin_limit
          });
        }
        // else if (this.state.currencyList[2].coin === "LTC") {
        //   this.setState({
        //     currency: this.state.currencyList[3].coin,
        //     minCurrency: this.state.currencyList[3].jst_min_coin_limit
        //   });
        // }
        else {
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
        minCrypto: option.props.selectedData.jst_min_coin_limit,
        showTFAModal: false
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
                this.timeout = setTimeout(this.getValuesSocket, 1000);
                this.interval = setInterval(() => {
                  this.getValuesSocket(false);
                }, this.state.socketTime);
              }
            }
          );
        } else {
          if (this.state.sendCurrencyInput > 0) {
            // console.log(
            //   "Else original_pair-----------",
            //   this.state.original_pair
            // );
            // // console.log("Else order_pair-----------", this.state.order_pair);
            // console.log("Else crypto-----------", this.state.crypto);
            // console.log("Else currency-----------", this.state.currency);
            this.timeout = setTimeout(this.getValuesSocket, 1000);
            this.interval = setInterval(() => {
              this.getValuesSocket(false);
            }, this.state.socketTime);
          }
        }
      }
    );
  }
  handleFiatChange(value, option) {
    this.setState({
      disabledButton: true
    });
    // console.log(option.props.selectedData.min_limit);
    let prevRoom = this.state.crypto + "-" + this.state.currency;
    this.setState({
      fiat: value
    });
  }
  handleCurrencyChange(value, option) {
    this.setState({
      disabledButton: true
    });
    clearInterval(this.interval);
    clearInterval(this.interval1);
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
        if (
          this.state.cryptoList[0].coin === "LTC" ||
          this.state.cryptoList[0].coin === "ETH"
        ) {
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
        if (
          this.state.cryptoList[0].coin === "XRP" ||
          this.state.cryptoList[0].coin === "ETH"
        ) {
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
      } else if (value === "ETH") {
        if (
          this.state.cryptoList[0].coin === "XRP" ||
          this.state.cryptoList[0].coin === "LTC"
        ) {
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
        minCurrency: option.props.selectedData.jst_min_coin_limit,
        showTFAModal: false
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
            this.timeout = setTimeout(this.getValuesSocket, 1000);
            this.interval = setInterval(() => {
              this.getValuesSocket(false);
            }, this.state.socketTime);
          }
        } else {
          this.setState(
            {
              sendCurrencyInput: option.props.selectedData.jst_min_coin_limit
            },
            () => {
              if (this.state.sendCurrencyInput > 0) {
                this.timeout = setTimeout(this.getValuesSocket, 1000);
                this.interval = setInterval(() => {
                  this.getValuesSocket(false);
                }, this.state.socketTime);
              }
            }
          );
        }
      }
    );
  }
  radioChange(e) {
    this.setState({
      disabledButton: true
    });
    this.setState({ loader: true });
    this.clearValidation();
    clearInterval(this.interval);
    clearInterval(this.interval1);
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
    this.setState(
      {
        includeFees: e.target.value,
        subTotal: 0,
        faldaxFee: 0,
        faldaxFeeActual: 0,
        limitPrice: 0,
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
          this.timeout = setTimeout(this.getValuesSocket, 1000);
          this.interval = setInterval(() => {
            this.getValuesSocket(false);
          }, this.state.socketTime);
          this.setState({
            recieveCurrencyInput: this.state.minCrypto
          });
        } else {
          this.timeout = setTimeout(this.getValuesSocket, 1000);
          this.interval = setInterval(() => {
            this.getValuesSocket(false);
          }, this.state.socketTime);
          this.setState({
            sendCurrencyInput: this.state.minCurrency
          });
        }
      }
    );
  }
  btnClicked(otp = "") {
    if (this.state.includeFees === 1) {
      if (this.validator1.allValid()) {
        // console.log(otp);
        this.calculateOrderVaules(otp);
        // alert("success");
      } else {
        this.validator1.showMessages();
        this.forceUpdate();
      }
    }
    if (this.state.includeFees === 2) {
      if (this.validator2.allValid()) {
        this.calculateOrderVaules(otp);

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
    this.validator3.hideMessages();
    this.forceUpdate();
    // rerender to hide messages for the first time
  }
  promoCode(e) {
    // console.log(e.target.value);
    this.setState({
      promoCode: e.target.value,
      validPromo: false,
      offerMsg: ""
    });
  }
  checkPromo() {
    this.clearValidation();
    if (this.validator3.allValid()) {
      this.setState({ loader: true });
      let values = {};
      values["offer_code"] = this.state.promoCode;
      fetch(`${API_URL}/conversion/apply-offer-code`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.setState({
              offerMsg: responseData.message,
              applyPromoCode: true,
              validPromo: true
            });
          } else if (responseData.status === 500) {
            this.setState({
              offerMsg: responseData.err,
              validPromo: false
            });
          } else {
            // console.log(responseData);
            this.setState({
              validPromo: false
            });
          }
          this.setState({ loader: false });
        })
        .catch(error => {});
    } else {
      this.validator3.showMessages();
      this.forceUpdate();
    }
  }
  applyPromo() {
    this.setState(
      {
        showPromoModal: false,
        appliedOfferCode: this.state.promoCode,
        showAppliedPromoModal: false
      },
      () => {
        this.getValuesSocket();
      }
    );
  }
  closePromoModal() {
    if (this.state.showAppliedPromoModal) {
      this.setState({
        showPromoModal: false,
        showAppliedPromoModal: false
        // offerMsg: ""
      });
    } else {
      this.setState({
        showPromoModal: false,
        showAppliedPromoModal: false,
        offerMsg: ""
      });
    }
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }
  render() {
    const { t } = this.props;
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
                        <RowTitle>{t("you_recieve_text.message")}</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="text"
                            value={this.state.recieveCurrencyInput}
                            disabled
                            placeholder="0"
                          />
                        </Col>
                        <Col className="height-col" xs={12} sm={12} md={10}>
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
                                      element.coin != "LTC" &&
                                      element.coin != "ETH"
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
                                  } else if (this.state.currency === "LTC") {
                                    if (
                                      // element.coin != this.state.currency &&
                                      element.coin != "XRP" &&
                                      element.coin != "ETH"
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
                                  } else if (this.state.currency === "ETH") {
                                    if (
                                      // element.coin != this.state.currency &&
                                      element.coin != "XRP" &&
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
                        <RowTitle>{t("you_recieve_text.message")}</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="text"
                            value={this.state.recieveCurrencyInput}
                            onChange={this.recieveCurrencyChange}
                            placeholder="0"
                            step="0.00000001"
                          />
                          {this.validator1.message(
                            "recieve currency",
                            this.state.recieveCurrencyInput,
                            `required|numeric|gtzero|decimalrestrict8|minCryptoValid`,
                            "text-danger-validation",
                            {
                              required: this.t(
                                "general_1:this_field_required_error.message"
                              ),
                              minCryptoValid: `${this.t(
                                "validations:min_threshold_error.message"
                              )} ${this.state.minCrypto}`,
                              numeric: this.t(
                                "validations:invalid_data_error.message"
                              )
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} className="height-col">
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
                                      element.coin != "LTC" &&
                                      element.coin != "ETH"
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
                                      element.coin != "XRP" &&
                                      element.coin != "ETH"
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
                                  } else if (this.state.currency === "ETH") {
                                    if (
                                      // element.coin != this.state.currency &&
                                      element.coin != "XRP" &&
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
                        <RowTitle>{t("fiat_value_text.message")}</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="text"
                            value={this.state.fiatJSTValue}
                            onChange={this.fiatJSTValueChange}
                            placeholder="0"
                            step="0.01"
                          />
                          {this.validator1.message(
                            "fiat value",
                            this.state.fiatJSTValue,
                            `required|numeric|gtzerofiat|decimalrestrict2`,
                            "text-danger-validation",
                            {
                              required: this.t(
                                "general_1:this_field_required_error.message"
                              ),
                              numeric: this.t(
                                "validations:invalid_data_error.message"
                              )
                            }
                          )}
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={10}
                          className="height-col align-flex"
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
                        <RowTitle>{t("you_send_text.message")}</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="text"
                            value={this.state.sendCurrencyInput}
                            disabled
                            placeholder="0"
                          />
                        </Col>
                        <Col xs={12} sm={12} md={10} className="height-col">
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
                                        element.coin != "LTC" &&
                                        element.coin != "ETH"
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
                                        element.coin != "XRP" &&
                                        element.coin != "ETH"
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
                                    } else if (this.state.crypto === "ETH") {
                                      if (
                                        // element.coin != this.state.crypto &&
                                        element.coin != "XRP" &&
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
                        <RowTitle>{t("you_send_text.message")}</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="text"
                            value={this.state.sendCurrencyInput}
                            onChange={this.sendCurrencyChange}
                            placeholder="0"
                            step="0.00000001"
                          />
                          {this.validator2.message(
                            "send currency",
                            this.state.sendCurrencyInput,
                            `required|numeric|gtzero|decimalrestrict8|minCurrValid`,
                            "text-danger-validation",
                            {
                              required: this.t(
                                "general_1:this_field_required_error.message"
                              ),
                              minCurrValid: `${this.t(
                                "validations:min_threshold_error.message"
                              )} ${this.state.minCurrency}`,
                              numeric: this.t(
                                "validations:invalid_data_error.message"
                              )
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} className="height-col">
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
                                        element.coin != "LTC" &&
                                        element.coin != "ETH"
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
                                        element.coin != "XRP" &&
                                        element.coin != "ETH"
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
                                    } else if (this.state.crypto === "ETH") {
                                      if (
                                        // element.coin != this.state.crypto &&
                                        element.coin != "XRP" &&
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
                        <RowTitle>{t("fiat_value_text.message")}</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="text"
                            value={this.state.fiatJSTValue}
                            onChange={this.fiatJSTValueChange}
                            placeholder="0"
                            step="0.01"
                          />
                          {this.validator2.message(
                            "fiat value",
                            this.state.fiatJSTValue,
                            `required|numeric|gtzerofiat|decimalrestrict2`,
                            "text-danger-validation",
                            {
                              required: this.t(
                                "general_1:this_field_required_error.message"
                              ),
                              numeric: this.t(
                                "validations:invalid_data_error.message"
                              )
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} className="height-col">
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
                <Panel header={t("details_text.message")} key="1">
                  <div>
                    <Row>
                      <Col xs={12} className="left-style">
                        <ConversionRightSpan>
                          {t("subtotal_text.message")}
                        </ConversionRightSpan>
                      </Col>
                      <Col xs={12} className="right-style">
                        {this.state.includeFees === 1 ? (
                          <ConversionLeftSpan>
                            {/* {this.state.totalAmount}{" "} */}
                            <NumberFormat
                              value={parseFloat(this.state.totalAmount).toFixed(
                                8
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                            />{" "}
                            {this.state.displayCurrency}
                          </ConversionLeftSpan>
                        ) : (
                          <ConversionLeftSpan>
                            <NumberFormat
                              value={parseFloat(this.state.subTotal).toFixed(8)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />{" "}
                            {this.state.displayCurrency}
                          </ConversionLeftSpan>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="left-style">
                        <ConversionRightSpan>
                          FALDAX {t("fee_text.message")} (
                          {this.state.faldax_fee_value}%)
                        </ConversionRightSpan>
                      </Col>
                      <Col xs={12} className="right-style">
                        {/* <ConversionRightSpan>{this.state.faldaxFees.toFixed(5)}%</ConversionRightSpan> */}
                        <ConversionLeftSpan>
                          (
                          <NumberFormat
                            value={parseFloat(this.state.faldaxFee).toFixed(8)}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          ){" "}
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
                      <Col xs={12} className="left-style">
                        <ConversionRightSpan>
                          {t("network_text.message")} {t("fee_text.message")}
                        </ConversionRightSpan>
                      </Col>
                      <Col xs={12} className="right-style">
                        {/* <ConversionRightSpan>{this.state.krakenFees.toFixed(5)}%</ConversionRightSpan> */}
                        <ConversionLeftSpan>
                          (
                          <NumberFormat
                            value={parseFloat(this.state.networkFee).toFixed(8)}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          ){" "}
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
                      <Col xs={12} className="left-style">
                        <LeftTotal className="promo-apply">
                          {this.state.appliedOfferCode ? (
                            <span
                              onClick={() => {
                                this.clearValidation();
                                this.setState({
                                  showTFAModal: false,
                                  showAppliedPromoModal: true,
                                  promoCode: this.state.appliedOfferCode
                                });
                              }}
                            >
                              {this.state.appliedOfferCode}
                            </span>
                          ) : (
                            <span
                              onClick={() => {
                                this.clearValidation();
                                this.setState({
                                  showTFAModal: false,
                                  showPromoModal: true,
                                  offerMsg: "",
                                  promoCode: ""
                                });
                              }}
                            >
                              {t("apply_promo_text.message")}
                              <Icon type="right" />
                            </span>
                          )}
                        </LeftTotal>
                      </Col>
                      <Col xs={12} className="right-style">
                        {this.state.appliedOfferCode && (
                          <RightTotal
                            onClick={() => {
                              this.clearValidation();
                              this.setState(
                                {
                                  appliedOfferCode: "",
                                  promoCode: "",
                                  offerMsg: "",
                                  applyPromoCode: false,
                                  validPromo: false
                                },
                                () => {
                                  this.getValuesSocket();
                                }
                              );
                            }}
                          >
                            <Icon type="close-circle" />
                          </RightTotal>
                        )}
                      </Col>
                    </Row>
                    <VerifyModal
                      visible={this.state.showPromoModal}
                      onCancel={this.closePromoModal}
                      title={t("enter_promo_text.message")}
                      footer={null}
                    >
                      <NewP className="add_new_promo">
                        <div className="otp-input-wrap promo_input_wrap">
                          <OTPInput
                            className="otp-input"
                            value={this.state.promoCode}
                            size="medium"
                            placeholder={t("promo_text.message")}
                            onChange={this.promoCode}
                            name="promoCode"
                            style={{ marginBottom: "20px" }}
                          />
                          {this.validator3.message(
                            "Promo Code ",
                            this.state.promoCode,
                            "required",
                            "text-danger-validation",
                            {
                              required: this.t(
                                "general_1:this_field_required_error.message"
                              )
                            }
                          )}
                          {this.state.promoCode && (
                            <span
                              onClick={() => {
                                this.setState({
                                  promoCode: "",
                                  offerMsg: "",
                                  validPromo: false
                                });
                              }}
                              className="promo_cross_wrap"
                            >
                              <Icon type="close-circle" />
                            </span>
                          )}
                        </div>
                        {this.state.offerMsg && (
                          <span className="offer_msg">
                            {this.state.offerMsg}
                          </span>
                        )}
                      </NewP>
                      {this.state.offerMsg === "" ? (
                        <ButtonDiv className="promo_check">
                          <NewButton onClick={this.checkPromo}>
                            {t("check_btn.message")}
                          </NewButton>
                        </ButtonDiv>
                      ) : (
                        <div>
                          {this.state.validPromo ? (
                            <ButtonDiv className="promo_check">
                              <NewButton onClick={this.applyPromo}>
                                {t("apply_btn.message")}
                              </NewButton>
                            </ButtonDiv>
                          ) : (
                            <ButtonDiv className="promo_check">
                              <NewButton onClick={this.closePromoModal}>
                                {t("ok_btn.message")}
                              </NewButton>
                            </ButtonDiv>
                          )}
                        </div>
                      )}
                    </VerifyModal>
                    <VerifyModal
                      visible={this.state.showAppliedPromoModal}
                      onCancel={this.closePromoModal}
                      title={t("enter_promo_text.message")}
                      footer={null}
                    >
                      <NewP className="add_new_promo">
                        <div className="otp-input-wrap promo_input_wrap">
                          <OTPInput
                            className="otp-input"
                            value={this.state.promoCode}
                            size="medium"
                            placeholder={t("promo_text.message")}
                            onChange={this.promoCode}
                            name="promoCode"
                            style={{ marginBottom: "20px" }}
                          />
                          {this.validator3.message(
                            "Promo Code ",
                            this.state.promoCode,
                            "required",
                            "text-danger-validation",
                            {
                              required: this.t(
                                "general_1:this_field_required_error.message"
                              )
                            }
                          )}
                          {this.state.promoCode && (
                            <span
                              onClick={() => {
                                this.setState({
                                  promoCode: "",
                                  appliedOfferCode: "",
                                  offerMsg: "",
                                  validPromo: false
                                });
                              }}
                              className="promo_cross_wrap"
                            >
                              <Icon type="close-circle" />
                            </span>
                          )}
                        </div>
                        {this.state.offerMsg && (
                          <span className="offer_msg">
                            {this.state.offerMsg}
                          </span>
                        )}
                      </NewP>
                      {/* {this.state.validPromo ? (
                        <ButtonDiv className="promo_check">
                          <NewButton onClick={this.applyPromo}>Apply</NewButton>
                        </ButtonDiv>
                      ) : (
                        <ButtonDiv className="promo_check">
                          <NewButton onClick={this.checkPromo}>Check</NewButton>
                        </ButtonDiv>
                      )} */}
                      {this.state.offerMsg === "" ? (
                        <ButtonDiv className="promo_check">
                          <NewButton onClick={this.checkPromo}>Check</NewButton>
                        </ButtonDiv>
                      ) : (
                        <div>
                          {this.state.validPromo ? (
                            <ButtonDiv className="promo_check">
                              <NewButton onClick={this.applyPromo}>
                                {t("apply_btn.message")}
                              </NewButton>
                            </ButtonDiv>
                          ) : (
                            <ButtonDiv className="promo_check">
                              <NewButton onClick={this.closePromoModal}>
                                {t("ok_btn.message")}
                              </NewButton>
                            </ButtonDiv>
                          )}
                        </div>
                      )}
                    </VerifyModal>
                    <Row>
                      <Col xs={12} className="left-style">
                        <RightTotal>{t("total_text.message")}</RightTotal>
                      </Col>
                      <Col xs={12} className="right-style">
                        {this.state.includeFees === 1 ? (
                          <LeftTotal>
                            <NumberFormat
                              value={parseFloat(this.state.subTotal).toFixed(8)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />{" "}
                            {this.state.displayCurrency}
                          </LeftTotal>
                        ) : (
                          <LeftTotal>
                            <NumberFormat
                              value={parseFloat(this.state.totalAmount).toFixed(
                                8
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                            />{" "}
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
                    className={`conversion_btn ${this.state.disabledClass}`}
                    onClick={() => this.btnClicked()}
                    type="primary"
                    size="large"
                    block
                    disabled={this.state.disabledButton}
                  >
                    {t("confirm_btn.message")}
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
        <TFAModal
          visible={this.state.showTFAModal}
          isLoggedIn={this.props.isLoggedIn}
          submit={otp => this.btnClicked(otp)}
        />
        {this.state.loader == true ? <FaldaxLoader /> : ""}
      </ConversionWrap>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});

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

export default translate(["conversion", "validations", "general_1"])(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversionDetail))
);
