/* Built-in packages */
import React from "react";
import { Row, Col /* , Select */, Radio, notification, Collapse } from "antd";
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
  ConversionTab,
  LeftCol,
  ConversionTitle,
  ConversionTabPane,
  ConversionRadioRow,
  RadioBorderRow,
  RowTitle,
  ConversionInput,
  ConversionDropDown,
  DropDownOption,
  DropIcon,
  ConversionSubmitBtn,
  RightCol,
  RightColContainer,
  RightColTitle,
  RightColAmount,
  RightColPrice,
  DashedSeprator,
  ConversionRightSpan,
  ConversionLeftSpan,
  RightTotal,
  LeftTotal,
  FeesRadio,
  RadioMainRow,
  RadioGroupMainRow,
  ConversionLeftCol
} from "../../../STYLED-COMPONENTS/CONVERSION/style";

const RadioGroup = Radio.Group;
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
      fiat: "USD",
      fiatCurrencyList: ""
    };
    io = this.props.io;
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
      minCryptoValid: {
        message: `Minimum amount should be greater than ${this.state.minCrypto}`,
        rule: (val, params, validator) => {
          if (val > this.state.minCrypto) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      },
      minCurrValid: {
        message: `Minimum amount should be greater than ${this.state.minCurrency}`,
        rule: (val, params, validator) => {
          if (val > this.state.minCurrency) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
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
      minCryptoValid: {
        message: `Minimum amount should be greater than ${this.state.minCrypto}`,
        rule: (val, params, validator) => {
          if (val > this.state.minCrypto) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      },
      minCurrValid: {
        message: `Minimum amount should be greater than ${this.state.minCurrency}`,
        rule: (val, params, validator) => {
          if (val > this.state.minCurrency) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      }
    });
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getCrypto = this.getCrypto.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.getPairDetails = this.getPairDetails.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.onBuyCryptoChange = this.onBuyCryptoChange.bind(this);
    this.onBuyCurrencyChange = this.onBuyCurrencyChange.bind(this);
    this.calculateBuyCurrency = this.calculateBuyCurrency.bind(this);
    this.calculateBuyCrypto = this.calculateBuyCrypto.bind(this);
    this.onSellCryptoChange = this.onSellCryptoChange.bind(this);
    this.onSellCurrencyChange = this.onSellCurrencyChange.bind(this);
    this.calculateSellCurrency = this.calculateSellCurrency.bind(this);
    this.calculateSellCrypto = this.calculateSellCrypto.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    this.getBuyCurrencyWithFees = this.getBuyCurrencyWithFees.bind(this);
    this.getFiatValue = this.getFiatValue.bind(this);
    this.getFiatCurrencyList = this.getFiatCurrencyList.bind(this);
    this.handleFiatChange = this.handleFiatChange.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    this.getCrypto();
    this.getCurrencies();
    this.getPairDetails();
    this.getFiatValue();
    this.getFiatCurrencyList();
  }
  // componentWillReceiveProps() {
  //     this.getFiatValue();
  // }
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
          console.log("responsedata 200", responseData.object.coinList);
          this.setState({
            fiatCurrencyList: responseData.object.fiat,
            loader: false
          });
        }
      })
      .catch(error => {});
  }
  getPairDetails() {
    var self = this;
    io.sails.url = API_URL;
    var URL;
    this.setState({ loader: true });
    if (this.state.prevRoom.trim() !== "") {
      URL = `/socket/get-pair-details?prevRoom=${this.state.prevRoom}&room=${this.state.crypto}-${this.state.currency}`;
    } else {
      URL = `/socket/get-pair-details?room=${this.state.crypto}-${this.state.currency}`;
    }
    io.socket.request(
      {
        method: "GET",
        url: URL,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        }
      },
      (body, JWR) => {
        if (body.status === 200) {
          let res = body.data;
          self.setState({
            askPrice: res.ask_price,
            bidPrice: res.bid_price,
            loader: false
          });
        }
      }
    );
    // io.socket.on('sellbookUpdate', (data) => {
    //     this.updateData(data);
    // });
  }
  getCrypto() {
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
          var cryptoData = responseData.data,
            minLimit,
            minCurrLimit;
          for (var i = 0; i < cryptoData.length; i++) {
            if (cryptoData[i].coin == this.state.crypto) {
              minLimit = cryptoData[i].min_limit;
            }
            if (cryptoData[i].coin == this.state.currency) {
              minCurrLimit = cryptoData[i].min_limit;
            }
          }
          this.setState({
            cryptoList: responseData.data,
            krakenFees: responseData.kraken_fees,
            faldaxFees: responseData.faldax_fees,
            minCrypto: minLimit,
            minCurrency: minCurrLimit
          });
        }
      })
      .catch(error => {});
  }
  getCurrencies() {
    fetch(
      `${API_URL}/coin-currency-list-conversion?crypto=${this.state.crypto}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({ currencyList: responseData.data });
      })
      .catch(error => {});
  }
  getFiatValue() {
    if (this.state.selectedTab === 1) {
      var values = {
        symbol: `${this.state.crypto}/USD`,
        quantity: this.state.buyCryptoInput,
        side: "Buy"
      };
    } else {
      var values = {
        symbol: `${this.state.crypto}/USD`,
        quantity: this.state.sellCryptoInput,
        side: "Sell"
      };
    }
    this.setState({
      loader: true
    });
    fetch(`${API_URL}/get-jst-price`, {
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
          fiatValue: responseData.data.price,
          networkFee: responseData.data.network_fees,
          faldaxFee: responseData.data.faldax_fees
        });
        console.log("Fiat", responseData.data.price);
        console.log("Network", responseData.data.network_fees);
        console.log("Faldax", responseData.data.faldax_fees);
        if (this.state.selectedTab === 1) {
          this.getBuyCurrencyWithFees();
        } else {
          this.getSellCurrencyWithFees();
        }
        this.setState({
          loader: false
        });
      })
      .catch(error => {});
  }
  handleCryptoChange(value, option: Option) {
    console.log(option.props.selectedData.min_limit);
    let prevRoom = this.state.crypto + "-" + this.state.currency;
    this.setState(
      {
        crypto: value,
        prevRoom: prevRoom,
        buyCryptoInput: 0,
        buyCurrencyInput: 0,
        minCrypto: option.props.selectedData.min_limit
      },
      () => {
        this.getCurrencies();
        this.getPairDetails();
        this.getFiatValue();
      }
    );
  }
  handleFiatChange(value, option: Option) {
    console.log(option.props.selectedData.min_limit);
    let prevRoom = this.state.crypto + "-" + this.state.currency;
    this.setState(
      {
        fiat: value,
        prevRoom: prevRoom,
        buyCryptoInput: 0,
        buyCurrencyInput: 0,
        minCrypto: option.props.selectedData.min_limit
      },
      () => {
        this.getCurrencies();
        this.getPairDetails();
        this.getFiatValue();
      }
    );
  }
  handleCurrencyChange(value) {
    let prevRoom = this.state.crypto + "-" + this.state.currency;
    this.setState(
      {
        currency: value,
        prevRoom: prevRoom,
        buyCryptoInput: 0,
        buyCurrencyInput: 0
      },
      () => {
        this.getFiatValue();
      }
    );
  }
  handleTabChange(e) {
    // console.log("tab chnage ", e);
    var self = this;
    this.setState(
      {
        selectedTab: parseInt(e),
        buyCryptoInput: 0,
        buyCurrencyInput: 0,
        sellCryptoInput: 0,
        sellCurrencyInput: 0,
        includeFees: true
      },
      () => {
        self.validator1.hideMessages();
        self.validator2.hideMessages();
        self.forceUpdate();
        this.getFiatValue();
      }
    );
  }
  radioChange(e) {
    var self = this;
    console.log("radio===========", e.target.value);
    this.setState(
      {
        includeFees: e.target.value
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
  onBuyCryptoChange(e) {
    var self = this;
    this.setState(
      {
        buyCryptoInput: parseFloat(e.target.value)
      },
      () => {
        self.calculateBuyCurrency();
        this.getFiatValue();
      }
    );

    // if (self.state.includeFees) {

    // } else {
    //     let buyCurrencyInput = 0;
    //     if (!isNaN(e.target.value)) {
    //         buyCurrencyInput = (e.target.value) * self.state.askPrice;
    //         // Add Kraken Fees
    //         buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.krakenFees) / 100);
    //         // Add Faldax Fees
    //         buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.faldaxFees) / 100);
    //     }
    //     self.setState({
    //         buyCryptoInput: e.target.value,
    //         buyCurrencyInput: buyCurrencyInput
    //     })
    // }
  }
  calculateBuyCurrency() {
    var self = this;
    if (self.state.includeFees) {
      this.setState({
        buyCurrencyInput: parseFloat(
          isNaN(self.state.buyCryptoInput)
            ? 0
            : self.state.buyCryptoInput * self.state.askPrice
        ).toFixed(8)
      });
    } else {
      let buyCurrencyInput = 0;
      if (!isNaN(self.state.buyCryptoInput)) {
        buyCurrencyInput = self.state.buyCryptoInput * self.state.askPrice;
        // Add Kraken Fees

        buyCurrencyInput =
          buyCurrencyInput + (buyCurrencyInput * self.state.krakenFees) / 100;

        // Add Faldax Fees
        buyCurrencyInput =
          buyCurrencyInput + (buyCurrencyInput * self.state.faldaxFees) / 100;
      }
      self.setState({
        buyCurrencyInput: parseFloat(buyCurrencyInput).toFixed(8)
      });
    }
  }
  getBuyCurrencyWithFees() {
    var self = this;
    // let buyCurrencyInput = (self.state.buyCryptoInput) * self.state.askPrice;
    let buyCurrencyInput = 0;
    // // Add Kraken Fees
    // buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.krakenFees) / 100);

    // // Add Faldax Fees
    // buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.faldaxFees) / 100);

    // Add Fiat fees
    buyCurrencyInput =
      parseFloat(buyCurrencyInput) + parseFloat(self.state.fiatValue);

    // Add network fees
    buyCurrencyInput =
      parseFloat(buyCurrencyInput) + parseFloat(self.state.networkFee);

    // Add faldax fees
    buyCurrencyInput =
      parseFloat(buyCurrencyInput) + parseFloat(self.state.faldaxFee);

    // let buyCurrencyInput = self.state.fiatValue + self.state.faldaxFee + self.state.networkFee;
    // console.log("Total Buy", buyCurrencyInput)
    return parseFloat(isNaN(buyCurrencyInput) ? 0 : buyCurrencyInput).toFixed(
      8
    );
  }
  getSellCurrencyWithFees() {
    var self = this;
    // let sellCurrencyInput = (self.state.sellCryptoInput) * self.state.bidPrice;
    let sellCurrencyInput = 0;
    // // Add Kraken Fees
    // sellCurrencyInput = sellCurrencyInput + ((sellCurrencyInput * self.state.krakenFees) / 100);

    // // Add Faldax Fees
    // sellCurrencyInput = sellCurrencyInput + ((sellCurrencyInput * self.state.faldaxFees) / 100);

    // Add Fiat fees
    sellCurrencyInput =
      parseFloat(sellCurrencyInput) + parseFloat(self.state.fiatValue);

    // Add network fees
    sellCurrencyInput =
      parseFloat(sellCurrencyInput) + parseFloat(self.state.networkFee);

    // Add faldax fees
    sellCurrencyInput =
      parseFloat(sellCurrencyInput) + parseFloat(self.state.faldaxFee);

    // let sellCurrencyInput = self.state.fiatValue + self.state.faldaxFee + self.state.networkFee;
    // console.log("Total Sell", sellCurrencyInput)
    return parseFloat(isNaN(sellCurrencyInput) ? 0 : sellCurrencyInput).toFixed(
      8
    );
  }
  onBuyCurrencyChange(e) {
    var self = this;
    this.setState(
      {
        buyCurrencyInput: e.target.value
        // buyCryptoInput: (isNaN(e.target.value) ? 0 : (e.target.value) / self.state.askPrice)
      },
      () => {
        self.calculateBuyCrypto();
      }
    );
  }
  calculateBuyCrypto() {
    var self = this;
    if (self.state.includeFees) {
      this.setState({
        buyCryptoInput: (isNaN(self.state.buyCurrencyInput)
          ? 0
          : self.state.buyCurrencyInput / self.state.askPrice
        ).toFixed(3)
      });
    } else {
      let buyCryptoInput = self.state.buyCurrencyInput;
      if (!isNaN(self.state.buyCurrencyInput)) {
        // Minus Faldax Fees
        buyCryptoInput = (buyCryptoInput * 100) / (100 + self.state.faldaxFees);
        // Minus Kraken Fees
        buyCryptoInput = (buyCryptoInput * 100) / (100 + self.state.krakenFees);

        buyCryptoInput = buyCryptoInput / self.state.askPrice;
      }
      self.setState({
        buyCryptoInput: buyCryptoInput.toFixed(8)
      });
    }
  }
  onSellCryptoChange(e) {
    var self = this;
    self.setState(
      {
        sellCryptoInput: e.target.value
      },
      () => {
        self.calculateSellCurrency();
        this.getFiatValue();
      }
    );
  }
  calculateSellCurrency() {
    var self = this;
    if (self.state.includeFees === true) {
      self.setState({
        sellCurrencyInput: parseFloat(
          isNaN(self.state.sellCryptoInput)
            ? 0
            : self.state.sellCryptoInput * self.state.bidPrice
        ).toFixed(8)
      });
    } else {
      let sellCurrencyInput = 0;
      if (!isNaN(self.state.sellCryptoInput)) {
        sellCurrencyInput = self.state.sellCryptoInput * self.state.bidPrice;
        // Add Kraken Fees

        sellCurrencyInput =
          sellCurrencyInput + (sellCurrencyInput * self.state.krakenFees) / 100;

        // Add Faldax Fees
        sellCurrencyInput =
          sellCurrencyInput + (sellCurrencyInput * self.state.faldaxFees) / 100;
      }
      self.setState({
        sellCurrencyInput: parseFloat(sellCurrencyInput).toFixed(8)
      });
    }
  }
  onSellCurrencyChange(e) {
    var self = this;
    self.setState(
      {
        sellCurrencyInput: e.target.value
      },
      () => {
        self.calculateSellCrypto();
      }
    );
  }
  calculateSellCrypto() {
    var self = this;
    if (self.state.includeFees) {
      this.setState({
        sellCryptoInput: (isNaN(self.state.sellCurrencyInput)
          ? 0
          : self.state.sellCurrencyInput / self.state.bidPrice
        ).toFixed(3)
      });
    } else {
      let sellCryptoInput = self.state.sellCurrencyInput;
      if (!isNaN(self.state.sellCurrencyInput)) {
        // Minus Faldax Fees
        sellCryptoInput =
          (sellCryptoInput * 100) / (100 + self.state.faldaxFees);
        // Minus Kraken Fees
        sellCryptoInput =
          (sellCryptoInput * 100) / (100 + self.state.krakenFees);

        sellCryptoInput = sellCryptoInput / self.state.bidPrice;
      }
      self.setState({
        sellCryptoInput: sellCryptoInput.toFixed(8)
      });
    }
  }
  btnClicked() {
    var self = this;
    let {
      crypto,
      currency,
      selectedTab,
      includeFees,
      buyCryptoInput
    } = this.state;
    // console.log("I am Clcicked", selectedTab, selectedTab === 1);
    if (selectedTab == 1) {
      if (this.validator1.allValid()) {
        // console.log("I am in Buy Tab");
        let fields = {};
        fields["pair"] = `${crypto}-${currency}`;
        fields["type"] = selectedTab == 1 ? "buy" : "sell";
        fields["volume"] = buyCryptoInput;
        fields["includeFees"] = includeFees;
        this.setState({ loader: true });
        fetch(`${API_URL}/perform-conversion`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.isLoggedIn
          },
          body: JSON.stringify(fields)
        })
          .then(response => response.json())
          .then(responseData => {
            // console.log(responseData);
            if (responseData.status == 200) {
              this.handleTabChange("1");
              this.setState({ loader: false });
              this.openNotificationWithIcon(
                "success",
                "Success",
                responseData.message
              );
            } else {
              this.setState({ loader: false });
              this.openNotificationWithIcon("error", "Error", responseData.err);
            }
          })
          .catch(error => {
            // console.log(error);
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "error",
              "Error",
              "Something went wrong!"
            );
          });
      } else {
        this.validator1.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
      }
    }
    // console.log("out of 2", selectedTab)
    if (selectedTab == 2) {
      // console.log("i m in 2")
      if (this.validator2.allValid()) {
        // console.log("I am in Sell Tab");
        let fields = {};
        fields["pair"] = `${crypto}-${currency}`;
        fields["type"] = selectedTab == 1 ? "buy" : "sell";
        fields["volume"] = buyCryptoInput;
        fields["includeFees"] = includeFees;
        this.setState({ loader: true });
        fetch(`${API_URL}/perform-conversion`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.isLoggedIn
          },
          body: JSON.stringify(fields)
        })
          .then(response => response.json())
          .then(responseData => {
            // console.log(responseData);
            if (responseData.status == 200) {
              this.handleTabChange("2");
              this.openNotificationWithIcon(
                "success",
                "Success",
                responseData.message
              );
              this.setState({ loader: false });
            } else {
              this.setState({ loader: false });
              this.openNotificationWithIcon("error", "Error", responseData.err);
            }
          })
          .catch(error => {
            // console.log(error);
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "error",
              "Error",
              "Something went wrong!"
            );
          });
      } else {
        // console.log("I am in else")
        this.validator2.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
      }
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
        <Navigation conversion={true} />
        <ConversionContainer>
          <MainRow>
            <ConversionRadioRow className="radiogrousdbfkj">
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
                            value={this.state.buyCryptoInput}
                            onChange={this.onBuyCryptoChange}
                            disabled
                            placeholder="0"
                          />
                          {this.validator1.message(
                            "crypto",
                            this.state.buyCryptoInput,
                            `required|numeric|gtzero|minCryptoValid`,
                            "text-danger-validation",
                            {
                              minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.cryptoList &&
                            this.state.cryptoList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.crypto}
                                onChange={this.handleCryptoChange}
                                disabled
                              >
                                {this.state.cryptoList.map((element, index) => {
                                  if (element.coin != this.state.currency) {
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
                            value={this.state.buyCryptoInput}
                            onChange={this.onBuyCryptoChange}
                            placeholder="0"
                          />
                          {this.validator1.message(
                            "crypto",
                            this.state.buyCryptoInput,
                            `required|numeric|gtzero|minCryptoValid`,
                            "text-danger-validation",
                            {
                              minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.cryptoList &&
                            this.state.cryptoList.length > 0 && (
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
                            value={this.state.buyCryptoInput}
                            onChange={this.onBuyCryptoChange}
                            placeholder="0"
                          />
                          {this.validator1.message(
                            "crypto",
                            this.state.buyCryptoInput,
                            `required|numeric|gtzero|minCryptoValid`,
                            "text-danger-validation",
                            {
                              minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.fiatCurrencyList &&
                            this.state.fiatCurrencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.fiat}
                                onChange={this.handleFiatChange}
                              >
                                {this.state.fiatCurrencyList.map(
                                  (element, index) => {
                                    if (element.coin != this.state.currency) {
                                      return (
                                        <DropDownOption
                                          key={index}
                                          value={element.coin}
                                          selectedData={element}
                                        >
                                          {" "}
                                          <DropIcon
                                            src={element.coin_icon}
                                            height="20px"
                                          />{" "}
                                          {element.coin}
                                        </DropDownOption>
                                      );
                                    }
                                  }
                                )}
                              </ConversionDropDown>
                            )}
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
                            value={this.state.buyCurrencyInput}
                            onChange={this.onBuyCurrencyChange}
                            disabled
                            placeholder="0"
                          />
                          {this.validator1.message(
                            "currency",
                            this.state.buyCurrencyInput,
                            `required|numeric|gtzero|minCurrValid`,
                            "text-danger-validation",
                            {
                              minCurrValid: `Minimum Currency limit is ${this.state.minCurrency}`
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.currencyList &&
                            this.state.currencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.currency}
                                onChange={this.handleCurrencyChange}
                                disabled
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
                            )}
                        </Col>
                      </RadioBorderRow>
                    ) : (
                      <RadioBorderRow className="radio-row">
                        <RowTitle>You Send</RowTitle>
                        <Col xs={12} sm={12} md={14}>
                          <ConversionInput
                            type="number"
                            value={this.state.buyCurrencyInput}
                            onChange={this.onBuyCurrencyChange}
                            placeholder="0"
                          />
                          {this.validator1.message(
                            "currency",
                            this.state.buyCurrencyInput,
                            `required|numeric|gtzero|minCurrValid`,
                            "text-danger-validation",
                            {
                              minCurrValid: `Minimum Currency limit is ${this.state.minCurrency}`
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.currencyList &&
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
                            value={this.state.buyCryptoInput}
                            onChange={this.onBuyCryptoChange}
                            placeholder="0"
                          />
                          {this.validator1.message(
                            "crypto",
                            this.state.buyCryptoInput,
                            `required|numeric|gtzero|minCryptoValid`,
                            "text-danger-validation",
                            {
                              minCryptoValid: `Minimum limit is ${this.state.minCrypto}`
                            }
                          )}
                        </Col>
                        <Col xs={12} sm={12} md={10} style={{ height: "42px" }}>
                          {this.state.fiatCurrencyList &&
                            this.state.fiatCurrencyList.length > 0 && (
                              <ConversionDropDown
                                defaultValue={this.state.fiat}
                                onChange={this.handleFiatChange}
                              >
                                {this.state.fiatCurrencyList.map(
                                  (element, index) => {
                                    if (element.coin != this.state.currency) {
                                      return (
                                        <DropDownOption
                                          key={index}
                                          value={element.coin}
                                          selectedData={element}
                                        >
                                          {" "}
                                          <DropIcon
                                            src={element.coin_icon}
                                            height="20px"
                                          />{" "}
                                          {element.coin}
                                        </DropDownOption>
                                      );
                                    }
                                  }
                                )}
                              </ConversionDropDown>
                            )}
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
                        <ConversionLeftSpan>
                          {this.getBuyCurrencyWithFees()}
                        </ConversionLeftSpan>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} style={{ textAlign: "left" }}>
                        <ConversionRightSpan>FALDAX Fee</ConversionRightSpan>
                      </Col>
                      <Col xs={12} style={{ textAlign: "right" }}>
                        {/* <ConversionRightSpan>{this.state.faldaxFees.toFixed(5)}%</ConversionRightSpan> */}
                        <ConversionLeftSpan>
                          {this.state.faldaxFee}
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
                          {this.state.networkFee}
                        </ConversionLeftSpan>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} style={{ textAlign: "left" }}>
                        <RightTotal>Total</RightTotal>
                      </Col>
                      <Col xs={12} style={{ textAlign: "right" }}>
                        <LeftTotal>{this.getBuyCurrencyWithFees()}</LeftTotal>
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
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(withRouter(ConversionDetail));
