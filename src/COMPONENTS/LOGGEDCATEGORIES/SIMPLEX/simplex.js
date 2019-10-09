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
} from "../../../STYLED-COMPONENTS/CONVERSION/style";
import {
  SimRightCol,
  SimMainRow,
  SimLeftCol,
  SimHead,
  SimSubHead,
  SimLastRow
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
      minCurrency: parseInt(50),
      cryptoList: [],
      crypto: "BTC",
      currency: "USD",
      quote_id: "",
      currencyList: [],
      wallet_address: "",
      crypto_code: ""
    };
    this.validator1 = new SimpleReactValidator({
      minCurrencyValid: {
        message: `Amount must be greater than or equal to ${this.state.minCurrency}`,
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
    this.timeout = null;
    this.handleCurrencyGetChange = this.handleCurrencyGetChange.bind(this);
    this.handleCurrencyPayChange = this.handleCurrencyPayChange.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.getCrypto = this.getCrypto.bind(this);
    this.calculateDigitalCurrency = this.calculateDigitalCurrency.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
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
          console.log("responsedata 200", responseData.object.coinList);
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
    if (this.state.currencyToPay == "" || this.state.currencyToPay == null) {
      this.setState({
        currencyToPay: 0,
        currencyToGet: 0,
        loader: false
      });
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
              this.openNotificationWithIcon(
                "error",
                "Error",
                responseData.data.errors[0].message
              );
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
                  wallet_address: ""
                });
              } else {
                this.setState({
                  loader: false,
                  currencyToGet: responseData.data.digital_money.amount,
                  quote_id: responseData.data.quote_id,
                  wallet_address: responseData.walletDetails.receive_address
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
      // this.timeout = setTimeout(this.calculateDigitalCurrency, 2000);
      this.setState({
        currencyToPay: e.target.value,
        currencyToGet: 0
      });
    } else {
      this.timeout = setTimeout(this.calculateDigitalCurrency, 1500);
      this.setState({
        currencyToPay: parseFloat(e.target.value)
      });
    }
  }
  handleCurrencyGetChange(e) {
    this.setState({
      currencyToGet: parseFloat(e.target.value)
    });
  }
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
      console.log("response to be sent", this.state.coin_code);
      this.props.history.push({
        pathname: "/simplex-exchange",
        state: {
          id: this.state.quote_id,
          currencyToPay: this.state.currencyToPay,
          currencyToGet: this.state.currencyToGet,
          crypto: this.state.crypto,
          currency: this.state.currency,
          wallet_address: this.state.wallet_address,
          crypto_code: this.state.crypto_code
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
    return (
      <ConversionWrap>
        <Navigation />
        <ConversionContainer>
          <SimMainRow className="simplex_main_row">
            <SimLeftCol lg={12}>
              <BorderRow>
                <RowTitle>You Pay</RowTitle>
                <Col xs={12} sm={12} md={16}>
                  <ConversionInput
                    type="number"
                    placeholder="0"
                    value={this.state.currencyToPay}
                    onChange={this.handleCurrencyPayChange}
                  />
                  {this.validator1.message(
                    "amount pay",
                    this.state.currencyToPay,
                    `required|minCurrencyValid`,
                    "text-danger-validation"
                  )}
                </Col>
                <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
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
                    onChange={this.handleCurrencyGetChange}
                  />
                </Col>
                <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
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
                  <img src="images/visa-card.png" alt="visa icon" />
                </Col>
                <Col className="buy_crypto_btn">Buy crypto with bank card</Col>
              </SimLastRow>
            </SimLeftCol>
            <SimRightCol className="simplex_right_col" lg={12}>
              <SimHead>Your simple access to Simplex</SimHead>
              <SimSubHead>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore.
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
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(withRouter(Simplex));
