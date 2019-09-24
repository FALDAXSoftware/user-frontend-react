import React from "react";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
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
  SimLeftCol
} from "../../../STYLED-COMPONENTS/SIMPLEX/simplexStyle";

const API_URL = globalVariables.API_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

class SimplexExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      currencyToPay: this.props.location.state.currencyToPay,
      currencyToGet: this.props.location.state.currencyToGet,
      minCurrency: parseInt(50),
      cryptoList: [],
      crypto: this.props.location.state.crypto,
      currency: this.props.location.state.currency,
      quote_id: this.props.location.state.id,
      address: "",
      response: "",
      destination_wallet: "",
      currencyList: [
        {
          id: 1,
          coin: "USD",
          coin_icon:
            "https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png"
        },
        {
          id: 2,
          coin: "EUR",
          coin_icon:
            "https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png"
        }
      ]
    };
    this.validator1 = new SimpleReactValidator({
      minCurrencyValid: {
        message: `Minimum amount should be greater than or equal to ${this.state.minCurrency}`,
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
    this.handleCurrencyGetChange = this.handleCurrencyGetChange.bind(this);
    this.handleCurrencyPayChange = this.handleCurrencyPayChange.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.getCrypto = this.getCrypto.bind(this);
    this.calculateDigitalCurrency = this.calculateDigitalCurrency.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  componentDidMount(e) {
    this.getCrypto();
  }
  getCrypto() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/coin-list-converison`, {
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
            cryptoList: responseData.data,
            loader: false
          });
        }
      })
      .catch(error => {
        this.openNotificationWithIcon("error", error, "Something went wrong!");
      });
  }
  calculateDigitalCurrency() {
    this.setState({
      loader: true
    });
    if (
      this.state.currencyToPay === 0 ||
      this.state.currencyToPay === "" ||
      this.state.currencyToPay === null
    ) {
      this.setState({
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
          this.setState({
            loader: false,
            currencyToGet: responseData.data.digital_money.amount,
            quote_id: responseData.data.quote_id
          });
        })
        .catch(error => {
          this.openNotificationWithIcon(
            "error",
            error,
            "Something went wrong!"
          );
        });
    }
  }
  handleCurrencyPayChange(e) {
    if (
      e.target.value === 0 ||
      e.target.value === null ||
      e.target.value === ""
    ) {
      this.setState({
        currencyToPay: e.target.value,
        currencyToGet: 0
      });
    } else {
      this.setState(
        {
          currencyToPay: parseFloat(e.target.value)
        },
        () => {
          this.calculateDigitalCurrency();
        }
      );
    }
  }
  handleCurrencyGetChange(e) {
    this.setState({
      currencyToGet: parseFloat(e.target.value)
    });
  }
  handleAddressChange(e) {
    this.setState({
      address: e.target.value
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
    this.setState({
      loader: true
    });
    if (this.validator1.allValid()) {
      var values = {
        quote_id: this.state.quote_id,
        address: this.state.address,
        currency: this.state.crypto,
        fiat_amount: this.state.currencyToPay,
        fiat_currency: this.state.currency,
        total_amount: this.state.currencyToGet,
        digital_currency: this.state.crypto
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
          if (responseData.status === 400) {
            this.setState({
              loader: false
            });
            this.openNotificationWithIcon(
              "error",
              "Error",
              "Please Enter valid Address"
            );
          } else if (responseData.status === 200) {
            this.setState({
              response: responseData.data,
              loader: false
            });
            window.location = this.state.response.action;
          }
        })
        .catch(error => {
          this.openNotificationWithIcon(
            "error",
            error,
            "Something went wrong!"
          );
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
            <SimLeftCol className="simplex_left_col_exchange" lg={12}>
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
              <BorderRow>
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
              </BorderRow>
              <Row>
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
              </Row>
            </SimLeftCol>
          </SimMainRow>
          <form
            id="payment_form"
            action={this.state.response.action}
            method="POST"
            target="_self"
            style={{ display: "none" }}
          >
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
            <button type="submit" onClick={this.btnClicked}>
              Submit
            </button>
          </form>
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

export default connect(mapStateToProps)(withRouter(SimplexExchange));
