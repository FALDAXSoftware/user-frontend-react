import React from "react";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import TFAModal from "SHARED-COMPONENTS/TFAModal";
import SimpleReactValidator from "simple-react-validator";
import { translate } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
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
import { APIUtility } from "../../../httpHelper";

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
      minCurrency: "50",
      maxCurrency: "20000",
      cryptoList: [],
      response: "",
      destination_wallet: "",
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
      checkOTP: false,
      btnDisabled: true
    };
    this.t = this.props.t;
    this.validator1 = new SimpleReactValidator({
      minCurrencyValid: {
        message: this.t("validations:simplex_min_limit_error.message"),
        rule: (val, params, validator) => {
          if (parseFloat(val) >= parseFloat(this.state.minCurrency)) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      },
      maxCurrencyValid: {
        message: this.t("validations:simplex_max_limit_error.message"),
        rule: (val, params, validator) => {
          if (parseFloat(val) > parseFloat(this.state.maxCurrency)) {
            return false;
          } else {
            return true;
          }
        },
        required: true // optional
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
        required: true // optional
      },
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
  }

  async componentDidMount(e) {
    try {
      await this.getCrypto();
      await this.calculateDigitalCurrency();
    } catch (error) {
    } finally {
    }
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

  async getCrypto() {
    try {
      this.setState({ loader: true });
      let result = await APIUtility.getCrypto(this.props.isLoggedIn);
      if (result.status == 200) {
        this.setState({
          currencyList: result.object.fiat,
          cryptoList: result.object.coinList
        });
      }
    } catch (error) {
      console(error);
    } finally {
      this.setState({ loader: false });
    }
  }

  async calculateDigitalCurrency() {
    try {
      this.setState({ loader: true });
      if (
        this.state.currencyToPay === "" ||
        this.state.currencyToPay === null ||
        this.state.currencyToPay <= 0
      ) {
        this.setState({
          // loader: false,
          currencyToGet: null
        });
      } else {
        var values = {
          digital_currency: this.state.crypto,
          fiat_currency: this.state.currency,
          requested_currency: this.state.currency,
          requested_amount: this.state.currencyToPay
        };
      }
      let result2 = await APIUtility.calculateDigitalCurrency(
        this.props.isLoggedIn,
        values
      );
      if (result2.status == 200) {
        if (result2.data.error) {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            result2.data.errors[0].message
          );
          this.setState({
            // loader: false
          });
        } else {
          if (result2.walletDetails === undefined) {
            // alert("if");
            this.setState({
              // loader: false,
              currencyToGet: result2.data.digital_money.amount,
              quote_id: result2.data.quote_id,
              cryptoCode: result2.coinDetails.coin_code,
              wallet_details: "",
              address: "",
              coin_name: result2.coinDetails.coin_name,
              btnDisabled: false
            });
          } else {
            this.setState({
              currencyToGet: result2.data.digital_money.amount,
              quote_id: result2.data.quote_id,
              address: result2.walletDetails.receive_address,
              wallet_details: result2.walletDetails.receive_address,
              coin_name: result2.coinDetails.coin_name,
              btnDisabled: false
            });
          }
        }
      } else {
        this.openNotificationWithIcon(
          "error",
          this.t("validations:error_text.message"),
          result2.message
        );
      }
    } catch (error) {
      console.log(error);
      this.openNotificationWithIcon(
        "error",
        this.t("validations:error_text.message"),
        error.response.message
      );
    } finally {
      this.setState({ loader: false });
    }
  }

  // getCrypto() {
  //   this.setState({
  //     loader: true
  //   });
  //   fetch(API_URL + `/get-simplex-coin-list`, {
  //     method: "get",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //  "Accept-Language": localStorage["i18nextLng"], 
  //       Authorization: "Bearer " + this.props.isLoggedIn
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       if (responseData.status == 200) {
  //         // console.log("responsedata 200", responseData.object.coinList);
  //         this.setState({
  //           currencyList: responseData.object.fiat,
  //           cryptoList: responseData.object.coinList
  //         });
  //       }
  //       this.setState({
  //         loader: false
  //       });
  //     })
  //     .catch(error => {});
  // }
  // calculateDigitalCurrency() {
  //   this.setState({
  //     loader: true
  //   });
  //   if (
  //     this.state.currencyToPay === "" ||
  //     this.state.currencyToPay === null ||
  //     this.state.currencyToPay <= 0
  //   ) {
  //     this.setState({
  //       // loader: false,
  //       currencyToGet: null
  //     });
  //   } else {
  //     var values = {
  //       digital_currency: this.state.crypto,
  //       fiat_currency: this.state.currency,
  //       requested_currency: this.state.currency,
  //       requested_amount: this.state.currencyToPay
  //     };
  //     fetch(`${API_URL}/get-qoute-details`, {
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
  //           if (responseData.data.error) {
  //             this.openNotificationWithIcon(
  //               "error",
  //               "Error",
  //               responseData.data.errors[0].message
  //             );
  //             this.setState({
  //               // loader: false
  //             });
  //           } else {
  //             if (responseData.walletDetails === undefined) {
  //               // alert("if");
  //               this.setState({
  //                 // loader: false,
  //                 currencyToGet: responseData.data.digital_money.amount,
  //                 quote_id: responseData.data.quote_id,
  //                 cryptoCode: responseData.coinDetails.coin_code,
  //                 wallet_details: "",
  //                 address: "",
  //                 coin_name: responseData.coinDetails.coin_name,
  //                 btnDisabled: false
  //               });
  //             } else {
  //               // alert("else", responseData.coinDetails.coin_name);
  //               this.setState({
  //                 // loader: false,
  //                 currencyToGet: responseData.data.digital_money.amount,
  //                 quote_id: responseData.data.quote_id,
  //                 address: responseData.walletDetails.receive_address,
  //                 wallet_details: responseData.walletDetails.receive_address,
  //                 coin_name: responseData.coinDetails.coin_name,
  //                 btnDisabled: false
  //               });
  //             }
  //           }
  //         } else if (responseData.status === 500) {
  //           this.setState({ loader: false });
  //           this.openNotificationWithIcon(
  //             "error",
  //             "Error",
  //             responseData.message
  //           );
  //         } else {
  //           this.setState({ loader: false });
  //           this.openNotificationWithIcon(
  //             "error",
  //             "Error",
  //             responseData.message
  //           );
  //         }
  //         // this.setState({
  //         //   loader: false
  //         // });
  //         // this.setState({
  //         //   loader: false,
  //         //   currencyToGet: responseData.data.digital_money.amount,
  //         //   quote_id: responseData.data.quote_id
  //         // });
  //       })
  //       .catch(error => {});
  //   }
  // }
  handleCurrencyPayChange(e) {
    clearTimeout(this.timeout);
    if (this.state.loader) {
      return false;
    }
    // console.log("^^^^", e.target.value);
    this.setState(
      {
        currencyToPay: e.target.value
      },
      () => {
        if (this.validator1.allValid()) {
          this.timeout = setTimeout(this.calculateDigitalCurrency, 1500);
        } else {
          this.setState({
            currencyToGet: ""
          });
          this.validator1.showMessages();
          this.forceUpdate();
        }
      }
    );
    // if (this.state.loader) {
    //   return false;
    // }
    // clearTimeout(this.timeout);
    // if (this.validator1.allValid()) {
    //   if (e.target.value === null || e.target.value === "") {
    //     // this.timeout = setTimeout(this.calculateDigitalCurrency, 2000);
    //     this.setState({
    //       currencyToPay: e.target.value,
    //       currencyToGet: "",
    //       showTFAModal: false
    //     });
    //   } else {
    //     this.timeout = setTimeout(this.calculateDigitalCurrency, 1500);
    //     this.setState({
    //       currencyToPay: parseFloat(e.target.value),
    //       showTFAModal: false
    //     });
    //   }
    // } else {
    //   this.setState({
    //     currencyToPay: e.target.value,
    //     currencyToGet: ""
    //   });
    //   this.validator1.showMessages();
    // }
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
        currency: value,
        showTFAModal: false
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
        showTFAModal: false
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
    // console.log("---------------------.", otp);
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
        // console.log("values", values);
        fetch(`${API_URL}/get-partner-data-info`, {
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
            // console.log(responseData);
            if (responseData.status === 400) {
              this.setState({
                // loader: false
              });
              if (this.state.wallet_details === "") {
                this.openNotificationWithIcon(
                  "error",
                  this.t("validations:error_text.message"),
                  this.t("general_3:create_wallet_and_continue.message")
                );
              } else {
                this.openNotificationWithIcon(
                  "warning",
                  this.t("general_3:transition_error.message"),
                  this.t("general_3:transition_error_please_try.message")
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
                  this.t("validations:error_text.message"),
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
            "Accept-Language": localStorage["i18nextLng"], 
            Authorization: "Bearer " + this.props.isLoggedIn
          },
          body: JSON.stringify(values)
        })
          .then(response => response.json())
          .then(responseData => {
            // console.log(responseData);
            if (responseData.status === 400) {
              // this.setState({
              //   loader: false
              // });
              if (this.state.wallet_details === "") {
                this.openNotificationWithIcon(
                  "error",
                  this.t("validations:error_text.message"),
                  this.t("general_3:create_wallet_and_continue.message")
                );
              } else {
                this.openNotificationWithIcon(
                  "warning",
                  this.t("general_3:transition_error.message"),
                  this.t("general_3:transition_error_please_try.message")
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
              this.openNotificationWithIcon(
                "error",
                this.t("validations:error_text.message"),
                responseData.err
              );
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
        loader: false,
        showTFAModal: false
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
      <div>
        <ConversionWrap>
          <Navigation />
          <ConversionContainer>
            <SimMainRow className="simplex_main_row">
              <SimLeftCol className="simplex_left_col_exchange" lg={12}>
                <BorderRow className="simplex_row">
                  <RowTitle>{this.t("you_pay_text.message")}</RowTitle>
                  <Col xs={12} sm={12} md={16}>
                    <ConversionInput
                      type="text"
                      placeholder="0"
                      // step="0.01"
                      value={this.state.currencyToPay}
                      // onChange={this.handleCurrencyPayChange}
                      onChange={e => {
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
                        )
                      }
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
                <BorderRow className="simplex_row">
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
                        <span>
                          {this.t("general_3:dont_have_text.message")}{" "}
                          {this.state.coin_name}{" "}
                          {this.t("header:navbar_menu_wallet.message")}?
                        </span>
                        <Link
                          to={`/walletDetails?coinID0=${this.state.cryptoCode}`}
                        >
                          {this.t("general_3:generate_wallet_text.message")}
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
                          {this.t("continue_btn.message")}
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
                          placeholder={this.t("wallet:address_text.message")}
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
                          disabled={this.state.btnDisabled}
                        >
                          {this.t("continue_btn.message")}
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
        <CommonFooter />
      </div>
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

export default translate([
  "conversion",
  "validations",
  "general_3",
  "wallet",
  "header"
])(connect(mapStateToProps)(withRouter(SimplexExchange)));
