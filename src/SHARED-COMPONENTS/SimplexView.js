import React from "react";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
  ConversionSubmitBtn
} from "../STYLED-COMPONENTS/CONVERSION/style";
import {
  SimRightCol,
  SimMainRow,
  SimLeftCol,
  SimHead,
  SimSubHead,
  SimLastRow,
  SimTopHead
} from "../STYLED-COMPONENTS/SIMPLEX/simplexStyle";

const API_URL = globalVariables.API_URL;
const TRADE_URL = globalVariables.TRADE_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

class SimplexView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      currencyToPay: null,
      currencyToGet: null,
      minCurrency: parseInt(50),
      cryptoList: [],
      crypto: "BTC",
      currency: "USD",
      quote_id: "",
      currencyList: [],
      wallet_address: "",
      crypto_code: "",
      coin_name: ""
    };
    // this.validator1 = new SimpleReactValidator({
    //   minCurrencyValid: {
    //     message: `Amount must be greater than or equal to ${this.state.minCurrency}`,
    //     rule: (val, params, validator) => {
    //       if (val >= this.state.minCurrency) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     },
    //     required: true // optional
    //   },
    //   gtzero: {
    //     // name the rule
    //     message: "Amount must be greater than zero",
    //     rule: (val, params, validator) => {
    //       if (val > 0) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     },
    //     required: true // optional
    //   },
    //   // onlyNumber: {
    //   //   message: "Please enter valid number",
    //   //   rule: val => {
    //   //     var RE = /^\d*\.?\d+/;
    //   //     if (RE.test(val)) {
    //   //       return true;
    //   //     } else {
    //   //       return false;
    //   //     }
    //   //   },
    //   //   required: true // optional
    //   // },
    //   decimalrestrict2: {
    //     message:
    //       "Value must be less than or equal to 2 digits after decimal point.",
    //     rule: val => {
    //       var RE = /^\d*\.?\d{0,2}$/;
    //       if (RE.test(val)) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   }
    // });
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

  //   componentWillMount() {
  //     if (
  //       this.props.profileDetails.is_allowed === true &&
  //       this.props.profileDetails.is_kyc_done === 2
  //     ) {
  //       if (this.props.location.pathname !== "/simplex")
  //         this.props.history.push("/simplex");
  //     } else {
  //       if (
  //         this.props.profileDetails.is_allowed === false &&
  //         this.props.profileDetails.is_kyc_done !== 2
  //       ) {
  //         this.props.history.push("/conversion");
  //       } else {
  //         this.setState({ countryAccess: true });
  //         this.props.history.push("/conversion");
  //       }
  //     }
  //   }

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
          console.log("responsedata 200", responseData.object.coinList);
          this.setState({
            currencyList: responseData.object.fiat,
            cryptoList: responseData.object.coinList,
            loader: false
          });
        } else {
          this.setState({ loader: false });
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
      fetch(`${API_URL}/get-simplex-qoute-details`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.setState({
              loader: false,
              currencyToGet: responseData.data.digital_money.amount
            });
          } else {
            this.setState({ loader: false });
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
        currencyToGet: null
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
    this.setState({
      loader: false
    });
    window.location = TRADE_URL + "/login/";
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
        <ConversionContainer className="trade-view">
          <SimMainRow className="simplex_main_row">
            <SimTopHead>Safe. Simple. Secure.</SimTopHead>
            <SimLeftCol lg={12}>
              <BorderRow>
                <RowTitle>You Pay</RowTitle>
                <Col xs={12} sm={12} md={16}>
                  <ConversionInput
                    type="number"
                    placeholder="0"
                    step="0.01"
                    value={this.state.currencyToPay}
                    onChange={this.handleCurrencyPayChange}
                  />
                  {/* {this.validator1.message(
                    "amount pay",
                    this.state.currencyToPay,
                    `required|gtzero|minCurrencyValid|decimalrestrict2`,
                    "text-danger-validation"
                  )} */}
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
                <RowTitle>You Get</RowTitle>
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
                    Exchange Now
                  </ConversionSubmitBtn>
                </Col>
              </Row>
              <SimLastRow className="bottom-row">
                <Col>
                  <span>We accept </span>
                  <img src="images/visa-card1.png" alt="visa icon" />
                  <img src="images/mastercard1.png" alt="visa icon" />
                </Col>
                <Col className="buy_crypto_btn">Pay With a Bank Card</Col>
              </SimLastRow>
            </SimLeftCol>
            <SimRightCol className="simplex_right_col" lg={12}>
              <SimHead>
                FALDAX, in partnership with Simplex, brings the world's most
                prevalent crypto assets directly to you. Thank you for choosing
                FALDAX!
              </SimHead>
              <SimSubHead>
                <p>Powered by</p>
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

export default connect(mapStateToProps)(withRouter(SimplexView));
