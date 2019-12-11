import React from "react";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import TFAModal from "SHARED-COMPONENTS/TFAModal";
import SimpleReactValidator from "simple-react-validator";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
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
  SimMainRow,
  SimLeftCol,
  CreateWalletRow
} from "../../../STYLED-COMPONENTS/SIMPLEX/simplexStyle";
import styled from "styled-components";

export const FormValueDisplay = styled.form`
  display: none;
`;

const API_URL = globalVariables.API_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

class SimplexExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      // currencyToPay: this.props.location.state.currencyToPay,
      // currencyToGet: this.props.location.state.currencyToGet,
      minCurrency: "50",
      maxCurrency: "20000",
      cryptoList: [],
      // crypto: this.props.location.state.crypto,
      // currency: this.props.location.state.currency,
      // quote_id: this.props.location.state.id,
      // address: this.props.location.state.wallet_address,
      // cryptoCode: this.props.location.state.crypto_code,
      response: "",
      destination_wallet: "",
      // wallet_details: this.props.location.state.wallet_address,
      currencyToPay: null,
      currencyToGet: null,
      crypto: "XRP",
      currency: "USD",
      quote_id: null,
      address: null,
      cryptoCode: null,
      wallet_details: null,
      coin_name: null,
      currencyList: [],
      showTFAModal: false,
      checkOTP: false
    };
    this.validator1 = new SimpleReactValidator({
      minCurrencyValid: {
        message: `Amount must be greater than or equal to 50`,
        rule: (val, params, validator) => {
          if (val >= this.state.minCurrency) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      },
      maxCurrencyValid: {
        message: `Amount must be less than or equal to 20,000`,
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
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  componentWillMount() {
    if (
      this.props.profileDetails.is_allowed === true &&
      this.props.profileDetails.is_kyc_done === 2
    ) {
      if (this.props.location.pathname !== "/simplex-exchange")
        this.props.history.push("/simplex-exchange");
      if (
        this.props.location.state === undefined ||
        this.props.location.state.currencyToPay === "" ||
        this.props.location.state.currencyToPay === null
      ) {
        this.setState({
          currencyToPay: null,
          currencyToGet: null,
          crypto: "XRP",
          currency: "USD",
          quote_id: null,
          address: null,
          cryptoCode: null,
          wallet_details: null,
          coin_name: null
        });
        this.props.history.push("/simplex");
      } else {
        this.setState({
          currencyToPay: this.props.location.state.currencyToPay,
          currencyToGet: this.props.location.state.currencyToGet,
          crypto: this.props.location.state.crypto,
          currency: this.props.location.state.currency,
          quote_id: this.props.location.state.id,
          address: this.props.location.state.wallet_address,
          cryptoCode: this.props.location.state.crypto_code,
          wallet_details: this.props.location.state.wallet_address,
          coin_name: this.props.location.state.coin_name
        });
      }
    } else {
      if (
        this.props.profileDetails.is_allowed === false &&
        this.props.profileDetails.is_kyc_done !== 2
      ) {
        this.props.history.push("/conversion");
        console.log("history", this.props.history);
      } else {
        this.setState({ countryAccess: true });
        this.props.history.push("/conversion");
        console.log("history", this.props.history);
      }
    }
  }

  componentDidMount(e) {
    this.getCrypto();
    this.calculateDigitalCurrency();
    // console.log(
    //   "this.props.profileDetails.is_kyc_done",
    //   this.props.profileDetails.is_twofactor
    // );
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
    if (
      this.state.currencyToPay === "" ||
      this.state.currencyToPay === null ||
      this.state.currencyToPay <= 0
    ) {
      this.setState({
        loader: false,
        currencyToGet: null
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
                // alert("if");
                this.setState({
                  loader: false,
                  currencyToGet: responseData.data.digital_money.amount,
                  quote_id: responseData.data.quote_id,
                  cryptoCode: responseData.coinDetails.coin_code,
                  wallet_details: "",
                  address: "",
                  coin_name: responseData.coinDetails.coin_name
                });
              } else {
                // alert("else", responseData.coinDetails.coin_name);
                this.setState({
                  loader: false,
                  currencyToGet: responseData.data.digital_money.amount,
                  quote_id: responseData.data.quote_id,
                  address: responseData.walletDetails.receive_address,
                  wallet_details: responseData.walletDetails.receive_address,
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
          // this.setState({
          //   loader: false,
          //   currencyToGet: responseData.data.digital_money.amount,
          //   quote_id: responseData.data.quote_id
          // });
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
        currencyToGet: "",
        showTFAModal: false
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
  handleAddressChange(e) {
    this.setState({
      address: e.target.value,
      showTFAModal: false
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
  btnClicked(otp = "") {
    this.setState({
      loader: true
    });
    console.log("---------------------.", otp);
    if (this.validator1.allValid()) {
      if (this.state.checkOTP) {
        this.setState({
          showTFAModal: true
          // loader: false
        });
        let otp1 = otp;
        var values = {
          quote_id: this.state.quote_id,
          address: this.state.address,
          currency: this.state.crypto,
          fiat_amount: this.state.currencyToPay,
          fiat_currency: this.state.currency,
          total_amount: this.state.currencyToGet,
          digital_currency: this.state.crypto,
          otp: otp1
        };
        console.log("values", values);
        fetch(`${API_URL}/get-partner-data-info`, {
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
            // console.log(responseData);
            if (responseData.status === 400) {
              this.setState({
                // loader: false
              });
              if (this.state.wallet_details === "") {
                this.openNotificationWithIcon(
                  "error",
                  "Error",
                  "Please create wallet and then continue."
                );
              } else {
                this.openNotificationWithIcon(
                  "warning",
                  "Transaction Error",
                  "There is some error in the transaction. Please retry."
                );
                this.props.history.push("/simplex");
              }
            } else if (responseData.status === 200) {
              this.setState({
                response: responseData.data,
                showTFAModal: false
                // loader: false
              });
              // console.log(this.state.response);
              document.getElementById("frm_sumbit").click();
              // window.location = this.state.response.action;
            } else {
              // this.setState({
              //   loader: false
              //   // showTFAModal: false
              // });
              if (values.otp === "") {
              } else {
                this.openNotificationWithIcon(
                  "error",
                  "Error",
                  responseData.err
                );
              }
            }
            this.setState({
              loader: false
              // showTFAModal: false
            });
          })
          .catch(error => {});
      } else {
        this.setState({
          loader: true
        });
        var values = {
          quote_id: this.state.quote_id,
          address: this.state.address,
          currency: this.state.crypto,
          fiat_amount: this.state.currencyToPay,
          fiat_currency: this.state.currency,
          total_amount: this.state.currencyToGet,
          digital_currency: this.state.crypto,
          otp: ""
        };
        fetch(`${API_URL}/get-partner-data-info`, {
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
            console.log(responseData);
            if (responseData.status === 400) {
              // this.setState({
              //   loader: false
              // });
              if (this.state.wallet_details === "") {
                this.openNotificationWithIcon(
                  "error",
                  "Error",
                  "Please create wallet and then continue."
                );
              } else {
                this.openNotificationWithIcon(
                  "warning",
                  "Transaction Error",
                  "There is some error in the transaction. Please retry."
                );
                this.props.history.push("/simplex");
              }
            } else if (responseData.status === 200) {
              this.setState({
                response: responseData.data
                // loader: false
              });
              // console.log(this.state.response);
              document.getElementById("frm_sumbit").click();
              // window.location = this.state.response.action;
            } else {
              // this.setState({
              //   loader: false
              //   // showTFAModal: false
              // });
              this.openNotificationWithIcon("error", "Error", responseData.err);
            }
            this.setState({
              loader: false
              // showTFAModal: false
            });
          })
          .catch(error => {});
      }
    } else {
      this.validator1.showMessages();
      this.setState({
        loader: false
      });
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
            <SimLeftCol className="simplex_left_col_exchange" lg={12}>
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
                  {this.validator1.message(
                    "amount pay",
                    this.state.currencyToPay,
                    `required|gtzero|minCurrencyValid|decimalrestrict2|maxCurrencyValid`,
                    "text-danger-validation"
                  )}
                </Col>
                <Col xs={12} sm={12} md={8} className="cuurency-display">
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
                <Col xs={12} sm={12} md={8} className="currency-display">
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
              {/* <BorderRow>
                <Col>
                  <ConversionInput
                    className="address_field"
                    type="text"
                    placeholder="Address"
                    value={this.state.address}
                    onChange={this.handleAddressChange}
                  />
                  {this.validator1.message(
                    "address",
                    this.state.address,
                    `required|alpha_num|min:15|max:120`,
                    "text-danger-validation"
                  )}
                </Col>
              </BorderRow> */}

              {this.state.wallet_details === "" ? (
                <div>
                  <CreateWalletRow className="create-wallet-link">
                    <Col>
                      <span>Don't have {this.state.coin_name} wallet?</span>
                      <Link
                        to={`/walletDetails?coinID0=${this.state.cryptoCode}`}
                      >
                        Generate wallet
                      </Link>
                    </Col>
                  </CreateWalletRow>
                  <Row>
                    <Col>
                      <ConversionSubmitBtn
                        onClick={() => this.btnClicked()}
                        type="primary"
                        size="large"
                        block
                        disabled
                      >
                        Continue
                      </ConversionSubmitBtn>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <BorderRow>
                    <Col>
                      <ConversionInput
                        className="address_field"
                        type="text"
                        placeholder="Address"
                        value={this.state.address}
                        // readOnly
                        onChange={this.handleAddressChange}
                      />
                      {/* {this.validator1.message(
                        "address",
                        this.state.address,
                        `required|alpha_num|min:15|max:120`,
                        "text-danger-validation"
                      )} */}
                    </Col>
                  </BorderRow>
                  <Row>
                    <Col>
                      <ConversionSubmitBtn
                        onClick={() => this.btnClicked()}
                        type="primary"
                        size="large"
                        block
                      >
                        Continue
                      </ConversionSubmitBtn>
                    </Col>
                  </Row>
                </div>
              )}
              {/* {this.state.address === "" ? (
                <CreateWalletRow className="create-wallet-link">
                  <Col>
                    <Link
                      to={`/walletDetails?coinID0=${this.state.cryptoCode}`}
                    >
                      Create {this.state.crypto} wallet
                    </Link>
                  </Col>
                </CreateWalletRow>
              ) : (
                ""
              )} */}
              {/* <Row>
                <Col>
                  <ConversionSubmitBtn
                    onClick={this.btnClicked}
                    type="primary"
                    size="large"
                    block
                  >
                    Continue
                  </ConversionSubmitBtn>
                </Col>
              </Row> */}
            </SimLeftCol>
          </SimMainRow>
          <FormValueDisplay
            id="payment_form"
            action={this.state.response.action}
            method="POST"
            target="_self"
          >
            {/* {console.log(this.state.version)} */}
            <input
              type="text"
              name="version"
              value={this.state.response.version}
            />
            <input
              type="text"
              name="partner"
              value={this.state.response.partner}
            />
            <input
              type="text"
              name="payment_flow_type"
              value={this.state.response.payment_flow_type}
            />
            <input
              type="text"
              name="return_url_success"
              value={this.state.response.return_url_success}
            />
            <input
              type="text"
              name="return_url_fail"
              value={this.state.response.return_url_fail}
            />
            <input
              type="text"
              name="quote_id"
              value={this.state.response.quote_id}
            />
            <input
              type="text"
              name="payment_id"
              value={this.state.response.payment_id}
            />
            <input
              type="text"
              name="user_id"
              value={this.state.response.user_id}
            />
            <input
              type="text"
              name="destination_wallet[address]"
              value={this.state.response["destination_wallet[address]"]}
            />
            <input
              type="text"
              name="destination_wallet[currency]"
              value={this.state.response["destination_wallet[currency]"]}
            />
            <input
              type="text"
              name="fiat_total_amount[amount]"
              value={this.state.response["fiat_total_amount[amount]"]}
            />
            <input
              type="text"
              name="fiat_total_amount[currency]"
              value={this.state.response["fiat_total_amount[currency]"]}
            />
            <input
              type="text"
              name="digital_total_amount[amount]"
              value={this.state.response["digital_total_amount[amount]"]}
            />
            <input
              type="text"
              name="digital_total_amount[currency]"
              value={this.state.response["digital_total_amount[currency]"]}
            />
            <button id="frm_sumbit" type="submit">
              Submit
            </button>
          </FormValueDisplay>
          <TFAModal
            visible={this.state.showTFAModal}
            isLoggedIn={this.props.isLoggedIn}
            submit={otp => this.btnClicked(otp)}
          />
        </ConversionContainer>
        {this.state.loader == true ? <FaldaxLoader /> : ""}
      </ConversionWrap>
    );
  }
}

// export default Conversion;
function mapStateToProps(state) {
  return {
    walletDetails:
      state.walletReducer.walletData !== undefined
        ? state.walletReducer.walletData.balanceData
        : null,
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

export default connect(mapStateToProps)(withRouter(SimplexExchange));
