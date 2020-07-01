import React from "react";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { browserHistory } from "react-router-dom";

import { Col, Row, notification } from "antd";

/* STYLED-COMPONENTS */
import {
  ConversionWrap,
  ConversionContainer,
  BorderRow,
  RowTitle,
  ConversionInput,
  ConversionDropDown,
  DropDownOption,
  DropIcon,
  ConversionSubmitBtn,
} from "../../../STYLED-COMPONENTS/CONVERSION/style";
import {
  SimRightCol,
  SimMainRow,
  SimLeftCol,
  SimHead,
  SimSubHead,
  SimLastRow,
  SimTopHead,
} from "../../../STYLED-COMPONENTS/SIMPLEX/simplexStyle";
import { LogoutUser } from "../../../ACTIONS/authActions";

const API_URL = globalVariables.API_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

class Simplex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      currencyToPay: null,
      currencyToGet: null,
      minCurrency: "",
      maxCurrency: "",
      cryptoList: [],
      crypto: "BTC",
      currency: "USD",
      quote_id: "",
      currencyList: [],
      wallet_address: "",
      crypto_code: "",
      coin_name: "",
      btnDisabled: true,
      is_kyc_done: "",
      is_allowed: "",
    };
    this.t = this.props.t;
    this.validator1 = new SimpleReactValidator({
      minCurrencyValid: {
        // message: this.t("validations:simplex_min_limit_error.message"),
        message: `${this.t("general_3:amount_gte_validation.message")} ${
          this.state.minCurrency
        }`,
        rule: (val, params, validator) => {
          if (parseFloat(val) >= parseFloat(this.state.minCurrency)) {
            return true;
          } else {
            return false;
          }
        },
        required: true, // optional
      },
      maxCurrencyValid: {
        message: `${this.t("general_3:amount_lte_validation.message")} ${
          this.state.maxCurrency
        }`,
        rule: (val, params, validator) => {
          if (parseFloat(val) > parseFloat(this.state.maxCurrency)) {
            return false;
          } else {
            return true;
          }
        },
        required: true, // optional
      },
      gtzero: {
        // name the rule
        message: this.t("validations:simplex_min_limit_error.message"),
        rule: (val, params, validator) => {
          if (val > 0) {
            return true;
          } else {
            return false;
          }
        },
        required: true, // optional
      },
      // onlyNumber: {
      //   message: "Please enter valid number",
      //   rule: val => {
      //     var RE = /^\d*\.?\d+/;
      //     if (RE.test(val)) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   },
      //   required: true // optional
      // },
      decimalrestrict2: {
        message: this.t("2_decimal_error.message"),
        rule: (val) => {
          var RE = /^\d*\.?\d{0,2}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
    this.timeout = null;
    // this.handleCurrencyGetChange = this.handleCurrencyGetChange.bind(this);
    this.handleCurrencyPayChange = this.handleCurrencyPayChange.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.getCrypto = this.getCrypto.bind(this);
    this.calculateDigitalCurrency = this.calculateDigitalCurrency.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
  }

  componentWillMount() {
    if (
      this.props.location.state === undefined ||
      this.props.location.state.flag === "" ||
      this.props.location.state.flag === null
    ) {
      if (!window.flag) {
        this.props.history.push("/conversion");
      }
    }
    console.log("Test", window.flag);
    // if (
    //   this.props.profileDetails.is_allowed === true &&
    //   this.props.profileDetails.is_kyc_done === 2
    // ) {
    //   if (this.props.location.pathname !== "/simplex")
    //     this.props.history.push("/simplex");
    // } else {
    //   if (
    //     this.props.profileDetails.is_allowed === false &&
    //     this.props.profileDetails.is_kyc_done !== 2
    //   ) {
    //     this.props.history.push("/conversion");
    //   } else {
    //     this.setState({ countryAccess: true });
    //     this.props.history.push("/conversion");
    //   }
    // }
  }

  componentDidMount(e) {
    this.getCrypto();
  }

  getCrypto() {
    this.setState({
      loader: true,
    });
    fetch(API_URL + `/get-simplex-coin-list`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status == 200) {
          // console.log("responsedata 200", responseData.object.coinList);
          var cryptoData = responseData.object.fiat,
            minLimit,
            maxLimit;
          for (var i = 0; i < cryptoData.length; i++) {
            if (cryptoData[i].coin == this.state.currency) {
              minLimit = cryptoData[i].min_limit;
              maxLimit = cryptoData[i].max_limit;
            }
          }
          this.setState({
            currencyList: responseData.object.fiat,
            cryptoList: responseData.object.coinList,
            minCurrency: minLimit,
            maxCurrency: maxLimit,
          });
        } else if (responseData.status === 403) {
          let tempValue2 = {};
          tempValue2["user_id"] = this.props.profileDetails.id;
          tempValue2["jwt_token"] = this.props.isLoggedIn;
          this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
        }
        this.setState({ loader: false });
      })
      .catch((error) => {});
  }
  calculateDigitalCurrency() {
    this.setState({
      loader: true,
    });
    if (
      this.state.currencyToPay === "" ||
      this.state.currencyToPay === null ||
      this.state.currencyToPay <= 0
    ) {
      this.setState({
        loader: false,
        currencyToGet: null,
      });
      // this.validator1.showMessages();
    } else {
      var values = {
        digital_currency: this.state.crypto,
        fiat_currency: this.state.currency,
        requested_currency: this.state.currency,
        requested_amount: this.state.currencyToPay,
      };
      fetch(`${API_URL}/get-qoute-details`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === 200) {
            if (responseData.data.error) {
              this.setState({
                loader: false,
              });
            } else {
              if (responseData.walletDetails === undefined) {
                this.setState({
                  loader: false,
                  currencyToGet: responseData.data.digital_money.amount,
                  quote_id: responseData.data.quote_id,
                  crypto_code: responseData.coinDetails.coin_code,
                  wallet_address: "",
                  coin_name: "",
                  btnDisabled: false,
                });
              } else {
                this.setState({
                  loader: false,
                  currencyToGet: responseData.data.digital_money.amount,
                  quote_id: responseData.data.quote_id,
                  wallet_address: responseData.walletDetails.receive_address,
                  coin_name: responseData.coinDetails.coin_name,
                  btnDisabled: false,
                });
              }
            }
          } else if (responseData.status === 500) {
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.message
            );
          } else {
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.message
            );
          }
        })
        .catch((error) => {});
    }
  }
  handleCurrencyPayChange(e) {
    // console.log("^^^", e, e.target.value, this.state.currencyToPay);
    clearTimeout(this.timeout);
    if (this.state.loader) {
      return false;
    }
    this.setState(
      {
        currencyToPay: e.target.value,
      },
      () => {
        if (this.validator1.allValid()) {
          this.timeout = setTimeout(this.calculateDigitalCurrency, 1500);
        } else {
          this.setState({
            currencyToGet: "",
          });
          this.validator1.showMessages();
          this.forceUpdate();
        }
      }
    );

    // clearTimeout(this.timeout);
    // // debugger;
    // if (this.state.loader) {
    //   return false;
    // }
    // this.setState(
    //   {
    //     currencyToPay: e.target.value,
    //     currencyToGet: ""
    //   },
    //   () => {
    //     if (this.validator1.allValid()) {
    //       console.log("^^^", e.target.value);
    //       this.timeout = setTimeout(this.calculateDigitalCurrency, 1500);
    //     } else {
    //       // this.setState({
    //       //   currencyToPay: parseFloat(e.target.value),
    //       //   currencyToGet: ""
    //       // });
    //       this.validator1.showMessages();
    //     }
    //   }
    // );
  }

  handleCurrencyChange(value) {
    var cryptoData = this.state.currencyList,
      minLimit,
      maxLimit;
    for (var i = 0; i < cryptoData.length; i++) {
      if (cryptoData[i].coin == value) {
        minLimit = cryptoData[i].min_limit;
        maxLimit = cryptoData[i].max_limit;
      }
    }
    this.setState(
      {
        currency: value,
        minCurrency: minLimit,
        maxCurrency: maxLimit,
        currencyToPay: minLimit,
      },
      () => {
        this.calculateDigitalCurrency();
      }
    );
  }
  handleCryptoChange(value) {
    this.setState(
      {
        crypto: value,
      },
      () => {
        this.calculateDigitalCurrency();
      }
    );
  }
  btnClicked() {
    if (this.validator1.allValid()) {
      // console.log("response to be sent", this.state.coin_code);
      this.props.history.push({
        pathname: "/simplex-exchange",
        state: {
          id: this.state.quote_id,
          currencyToPay: this.state.currencyToPay,
          currencyToGet: this.state.currencyToGet,
          crypto: this.state.crypto,
          currency: this.state.currency,
          wallet_address: this.state.wallet_address,
          crypto_code: this.state.crypto_code,
          coin_name: this.state.coin_name,
          flag: true,
        },
      });
    } else {
      this.validator1.showMessages();
      this.forceUpdate();
    }
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }
  render() {
    const { t } = this.props;
    return (
      <div>
        <ConversionWrap>
          <Navigation />
          <ConversionContainer>
            <SimMainRow className="simplex_main_row">
              <SimTopHead>
                {this.t("safe_simple_secure_text.message")}
              </SimTopHead>
              <SimLeftCol lg={12}>
                <BorderRow>
                  <RowTitle>{this.t("you_pay_text.message")}</RowTitle>
                  <Col xs={12} sm={12} md={16}>
                    <ConversionInput
                      type="text"
                      placeholder="0"
                      value={this.state.currencyToPay}
                      onChange={(e) => {
                        this.handleCurrencyPayChange(e);
                      }}
                    />
                    {this.validator1.message(
                      "amount pay",
                      this.state.currencyToPay,
                      `required|numeric|gtzero|minCurrencyValid|decimalrestrict2|maxCurrencyValid`,
                      "text-danger-validation",
                      {
                        required: this.t(
                          "general_3:validation_amount_required.message"
                        ),
                        numeric: this.t(
                          "general_3:validation_amount_numeric.message"
                        ),
                        minCurrencyValid: `${this.t(
                          "general_3:amount_gte_validation.message"
                        )} ${this.state.minCurrency}`,
                        maxCurrencyValid: `${this.t(
                          "general_3:amount_lte_validation.message"
                        )} ${this.state.maxCurrency}`,
                      }
                    )}
                  </Col>
                  <Col xs={12} sm={12} md={8} className="value-display">
                    {this.state.currencyList &&
                      this.state.currencyList.length > 0 && (
                        <ConversionDropDown
                          showSearch
                          defaultValue={this.state.currency}
                          onChange={this.handleCurrencyChange}
                        >
                          {this.state.currencyList.map((cur, i) => {
                            // if (cur.coin != this.state.currency) {
                            return (
                              <DropDownOption
                                key={i}
                                value={cur.coin}
                                selecteddata={cur}
                              >
                                {" "}
                                <DropIcon
                                  src={`${_AMAZONBUCKET}${cur.coin_icon}`}
                                  height="20px"
                                />{" "}
                                {cur.coin}
                              </DropDownOption>
                            );
                          })}
                        </ConversionDropDown>
                      )}
                  </Col>
                </BorderRow>
                <BorderRow>
                  <RowTitle>{this.t("you_get_text.message")}</RowTitle>
                  <Col xs={12} sm={12} md={16}>
                    <ConversionInput
                      type="number"
                      placeholder="0"
                      readOnly
                      value={this.state.currencyToGet}
                      // onChange={this.handleCurrencyGetChange}
                    />
                  </Col>
                  <Col xs={12} sm={12} md={8} className="value-display">
                    {this.state.cryptoList && this.state.cryptoList.length > 0 && (
                      <ConversionDropDown
                        showSearch
                        // defaultValue={this.state.crypto}
                        defaultValue={this.state.cryptoList[0].coin}
                        onChange={this.handleCryptoChange}
                      >
                        {this.state.cryptoList.map((element, index) => {
                          if (element.coin != this.state.currency) {
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
                        })}
                      </ConversionDropDown>
                    )}
                  </Col>
                </BorderRow>
                <Row>
                  <Col>
                    <ConversionSubmitBtn
                      onClick={this.btnClicked}
                      type="primary"
                      size="large"
                      block
                      disabled={this.state.btnDisabled}
                    >
                      {this.t("exchange_now_btn.message")}
                    </ConversionSubmitBtn>
                  </Col>
                </Row>
                <SimLastRow className="bottom-row">
                  <Col>
                    <span>{this.t("we_accept_text.message")} </span>
                    <img src="images/visa-card1.png" alt="visa icon" />
                    <img src="images/mastercard1.png" alt="visa icon" />
                  </Col>
                  <Col className="buy_crypto_btn">
                    {this.t("pay_with_card_text.message")}
                  </Col>
                </SimLastRow>
              </SimLeftCol>
              <SimRightCol className="simplex_right_col" lg={12}>
                <SimHead>{this.t("simplex_text.message")}</SimHead>
                <SimSubHead>
                  <p>{this.t("powered_by_text.message")}</p>
                  <img src="/images/simplex-logo.png" />
                </SimSubHead>
              </SimRightCol>
            </SimMainRow>
          </ConversionContainer>

          {this.state.loader == true ? <FaldaxLoader /> : ""}
        </ConversionWrap>
        <CommonFooter />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  LogoutUser: (isLoggedIn, user_id) =>
    dispatch(LogoutUser(isLoggedIn, user_id)),
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
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default translate(["conversion", "validations", "general_3"])(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Simplex))
);
