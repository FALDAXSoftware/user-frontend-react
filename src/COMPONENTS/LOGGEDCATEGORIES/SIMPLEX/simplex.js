import React from "react";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
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
  ConversionSubmitBtn
} from "../../../STYLED-COMPONENTS/CONVERSION/style";
import {
  SimRightCol,
  SimMainRow,
  SimLeftCol,
  SimHead,
  SimSubHead,
  SimLastRow,
  SimTopHead
} from "../../../STYLED-COMPONENTS/SIMPLEX/simplexStyle";

const API_URL = globalVariables.API_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

class Simplex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      currencyToPay: null,
      currencyToGet: null,
      minCurrency: "50",
      maxCurrency: "20000",
      cryptoList: [],
      crypto: "BTC",
      currency: "USD",
      quote_id: "",
      currencyList: [],
      wallet_address: "",
      crypto_code: "",
      coin_name: ""
    };
    this.t = this.props.t;
    this.validator1 = new SimpleReactValidator({
      minCurrencyValid: {
        message: this.t("simplex_min_limit_error.message"),
        rule: (val, params, validator) => {
          if (val >= parseInt(this.state.minCurrency)) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      },
      maxCurrencyValid: {
        message: this.t("simplex_max_limit_error.message"),
        rule: (val, params, validator) => {
          if (val > parseInt(this.state.maxCurrency)) {
            return false;
          } else {
            return true;
          }
        },
        required: true // optional
      },
      gtzero: {
        // name the rule
        message: this.t("simplex_min_limit_error.message"),
        rule: (val, params, validator) => {
          if (val > 0) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
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
        rule: val => {
          var RE = /^\d*\.?\d{0,2}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      }
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
      this.props.profileDetails.is_allowed === true &&
      this.props.profileDetails.is_kyc_done === 2
    ) {
      if (this.props.location.pathname !== "/simplex")
        this.props.history.push("/simplex");
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

  componentDidMount(e) {
    this.getCrypto();
  }
  // getCrypto() {
  //   this.setState({
  //     loader: true
  //   });
  //   fetch(API_URL + `/coin-list-converison`, {
  //     method: "get",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + this.props.isLoggedIn
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       if (responseData.status == 200) {
  //         console.log("responseData.data", responseData);
  //         this.setState({
  //           cryptoList: responseData.data,
  //           loader: false
  //         });
  //       }
  //     })
  //     .catch(error => {});
  // }
  getCrypto() {
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
          // console.log("responsedata 200", responseData.object.coinList);
          this.setState({
            currencyList: responseData.object.fiat,
            cryptoList: responseData.object.coinList,
            loader: false
          });
        }
      })
      .catch(error => {});
  }
  calculateDigitalCurrency() {
    this.setState({
      loader: true
    });
    if (
      this.state.currencyToPay === "" ||
      this.state.currencyToPay === null ||
      this.state.currencyToPay <= 0
    ) {
      this.setState({
        loader: false,
        currencyToGet: null
      });
      // this.validator1.showMessages();
    } else {
      var values = {
        digital_currency: this.state.crypto,
        fiat_currency: this.state.currency,
        requested_currency: this.state.currency,
        requested_amount: this.state.currencyToPay
      };
      fetch(`${API_URL}/get-qoute-details`, {
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
            if (responseData.data.error) {
              // this.openNotificationWithIcon(
              //   "error",
              //   "Error",
              //   responseData.data.errors[0].message
              // );
              this.setState({
                loader: false
              });
            } else {
              if (responseData.walletDetails === undefined) {
                this.setState({
                  loader: false,
                  currencyToGet: responseData.data.digital_money.amount,
                  quote_id: responseData.data.quote_id,
                  crypto_code: responseData.coinDetails.coin_code,
                  wallet_address: "",
                  coin_name: ""
                });
              } else {
                this.setState({
                  loader: false,
                  currencyToGet: responseData.data.digital_money.amount,
                  quote_id: responseData.data.quote_id,
                  wallet_address: responseData.walletDetails.receive_address,
                  coin_name: responseData.coinDetails.coin_name
                });
              }
            }
          } else if (responseData.status === 500) {
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "error",
              "Error",
              responseData.message
            );
          } else {
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "error",
              "Error",
              responseData.message
            );
          }
        })
        .catch(error => {});
    }
  }
  handleCurrencyPayChange(e) {
    clearTimeout(this.timeout);

    if (e.target.value === null || e.target.value === "") {
      this.setState({
        currencyToPay: e.target.value,
        currencyToGet: ""
      });
    } else {
      this.timeout = setTimeout(this.calculateDigitalCurrency, 1500);
      this.setState({
        currencyToPay: parseFloat(e.target.value)
      });
    }
  }
  // handleCurrencyGetChange(e) {
  //   this.setState({
  //     currencyToGet: parseFloat(e.target.value)
  //   });
  // }
  handleCurrencyChange(value) {
    this.setState(
      {
        currency: value
      },
      () => {
        this.calculateDigitalCurrency();
      }
    );
  }
  handleCryptoChange(value) {
    this.setState(
      {
        crypto: value
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
          coin_name: this.state.coin_name
        }
      });
    } else {
      this.validator1.showMessages();
      this.forceUpdate();
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
        <Navigation />
        <ConversionContainer>
          <SimMainRow className="simplex_main_row">
            <SimTopHead>{t("safe_simple_secure_text.message")}</SimTopHead>
            <SimLeftCol lg={12}>
              <BorderRow>
                <RowTitle>{t("you_pay_text.message")}</RowTitle>
                <Col xs={12} sm={12} md={16}>
                  <ConversionInput
                    type="number"
                    placeholder="0"
                    step="0.01"
                    value={this.state.currencyToPay}
                    onChange={this.handleCurrencyPayChange}
                  />
                  {this.validator1.message(
                    "amount pay",
                    this.state.currencyToPay,
                    `required|gtzero|minCurrencyValid|decimalrestrict2|maxCurrencyValid`,
                    "text-danger-validation"
                  )}
                </Col>
                <Col xs={12} sm={12} md={8} className="value-display">
                  {this.state.currencyList &&
                    this.state.currencyList.length > 0 && (
                      <ConversionDropDown
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
                                src={cur.coin_icon}
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
                <RowTitle>{t("you_get_text.message")}</RowTitle>
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
                      defaultValue={this.state.crypto}
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
                  >
                    {t("exchange_now_btn.message")}
                  </ConversionSubmitBtn>
                </Col>
              </Row>
              <SimLastRow className="bottom-row">
                <Col>
                  <span>{t("we_accept_text.message")}</span>
                  <img src="images/visa-card1.png" alt="visa icon" />
                  <img src="images/mastercard1.png" alt="visa icon" />
                </Col>
                <Col className="buy_crypto_btn">
                  {t("pay_with_card_text.message")}
                </Col>
              </SimLastRow>
            </SimLeftCol>
            <SimRightCol className="simplex_right_col" lg={12}>
              <SimHead>{t("simplex_text.message")}</SimHead>
              <SimSubHead>
                <p>{t("powered_by_text.message")}</p>
                <img src="/images/simplex-logo.png" />
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore. */}
              </SimSubHead>
            </SimRightCol>
          </SimMainRow>
        </ConversionContainer>
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

export default translate("conversion")(
  connect(mapStateToProps)(withRouter(Simplex))
);
