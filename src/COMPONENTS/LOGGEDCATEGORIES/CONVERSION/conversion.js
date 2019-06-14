/* Built-in packages */
import React from "react";
import { Row, Col/* , Select */, Radio, notification } from "antd";
import { connect } from "react-redux"
import SimpleReactValidator from 'simple-react-validator'
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals";
import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader';
/* STYLED-COMPONENTS */
import { ConversionWrap, ConversionContainer, MainRow, ConversionTab, LeftCol, ConversionTitle, ConversionTabPane, ConversionRadioRow, BorderRow, RowTitle, ConversionInput, ConversionDropDown, DropDownOption, DropIcon, ConversionSubmitBtn, RightCol, RightColContainer, RightColTitle, RightColAmount, RightColPrice, DashedSeprator, LeftSpan, RightSpan, RightTotal, LeftTotal, FeesRadio } from "../../../STYLED-COMPONENTS/CONVERSION/style";

const RadioGroup = Radio.Group;
const API_URL = globalVariables.API_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;
let io = null;
class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 1,
            currencyList: [],
            cryptoList: [],
            currency: 'BTC',
            crypto: 'XRP',
            prevRoom: "",
            askPrice: 0,
            bidPrice: 0,
            buyCryptoInput: 0,
            buyCurrencyInput: 0,
            sellCryptoInput: 0,
            sellCurrencyInput: 0,
            includeFees: true,
            krakenFees: 0,
            faldaxFees: 0,
            loader: false,
        }
        io = this.props.io
        this.validator1 = new SimpleReactValidator({
            gtzero: {  // name the rule
                message: 'Amount must be greater than zero',
                rule: (val, params, validator) => {
                    if (val > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                required: true  // optional
            }
        });
        this.validator2 = new SimpleReactValidator({
            gtzero: {  // name the rule
                message: 'Amount must be greater than zero',
                rule: (val, params, validator) => {
                    if (val > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                required: true  // optional
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
    }

    /* Life-Cycle Methods */

    componentDidMount() {
        this.getCrypto();
        this.getCurrencies();
        this.getPairDetails();
    }

    getPairDetails() {
        var self = this;
        io.sails.url = API_URL;
        var URL;
        this.setState({ loader: true })
        if (this.state.prevRoom.trim() !== "") {
            URL = `/socket/get-pair-details?prevRoom=${this.state.prevRoom}&room=${this.state.crypto}-${this.state.currency}`
        }
        else {
            URL = `/socket/get-pair-details?room=${this.state.crypto}-${this.state.currency}`
        }
        io.socket.request({
            method: 'GET',
            url: URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }, (body, JWR) => {


            if (body.status === 200) {
                let res = body.data;
                self.setState({
                    askPrice: res.ask_price,
                    bidPrice: res.bid_price,
                    loader: false
                });

            }
        });
        // io.socket.on('sellbookUpdate', (data) => {
        //     this.updateData(data);
        // });
    }
    getCrypto() {
        fetch(API_URL + `/coin-list-converison`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {

                this.setState({ cryptoList: responseData.data, krakenFees: responseData.kraken_fees, faldaxFees: responseData.faldax_fees })
            })
            .catch(error => {
            })
    }
    getCurrencies() {
        fetch(`${API_URL}/coin-currency-list-conversion?crypto=${this.state.crypto}`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {

                this.setState({ currencyList: responseData.data })
            })
            .catch(error => {
            })
    }
    handleCryptoChange(value) {
        let prevRoom = this.state.crypto + "-" + this.state.currency
        this.setState({
            crypto: value,
            prevRoom: prevRoom,
            buyCryptoInput: 0,
            buyCurrencyInput: 0
        }, () => {
            this.getCurrencies();
        });
    }
    handleCurrencyChange(value) {
        let prevRoom = this.state.crypto + "-" + this.state.currency
        this.setState({
            currency: value,
            prevRoom: prevRoom,
            buyCryptoInput: 0,
            buyCurrencyInput: 0
        }, () => {

        });
    }
    handleTabChange(e) {
        // console.log("tab chnage ", e);
        var self = this;
        this.setState({
            selectedTab: parseInt(e),
            buyCryptoInput: 0,
            buyCurrencyInput: 0,
            sellCryptoInput: 0,
            sellCurrencyInput: 0,
            includeFees: true
        }, () => {
            self.validator1.hideMessages();
            self.validator2.hideMessages();
            self.forceUpdate();
        })

    }
    radioChange(e) {
        var self = this;
        // console.log(e.target.value);
        this.setState({
            includeFees: JSON.parse(e.target.value)
        }, () => {
            if (self.state.selectedTab === 1) {
                self.calculateBuyCurrency();
            }
            else if (self.state.selectedTab === 2) {
                self.calculateSellCurrency();
            }
        })

    }
    onBuyCryptoChange(e) {
        var self = this;
        this.setState({
            buyCryptoInput: parseFloat(e.target.value),
        }, () => {
            self.calculateBuyCurrency();
        })
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
                buyCurrencyInput: parseFloat((isNaN(self.state.buyCryptoInput) ? 0 : (self.state.buyCryptoInput) * self.state.askPrice)).toFixed(6)
            })
        } else {
            let buyCurrencyInput = 0;
            if (!isNaN(self.state.buyCryptoInput)) {
                buyCurrencyInput = (self.state.buyCryptoInput) * self.state.askPrice;
                // Add Kraken Fees

                buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.krakenFees) / 100);

                // Add Faldax Fees
                buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.faldaxFees) / 100);
            }
            self.setState({
                buyCurrencyInput: parseFloat(buyCurrencyInput).toFixed(6)
            })
        }
    }
    getBuyCurrencyWithFees() {
        var self = this;
        let buyCurrencyInput = (self.state.buyCryptoInput) * self.state.askPrice;
        // Add Kraken Fees

        buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.krakenFees) / 100);

        // Add Faldax Fees
        buyCurrencyInput = buyCurrencyInput + ((buyCurrencyInput * self.state.faldaxFees) / 100);
        return parseFloat((isNaN(buyCurrencyInput) ? 0 : buyCurrencyInput)).toFixed(6)
    }
    getSellCurrencyWithFees() {
        var self = this;
        let sellCurrencyInput = (self.state.sellCryptoInput) * self.state.bidPrice;
        // Add Kraken Fees

        sellCurrencyInput = sellCurrencyInput + ((sellCurrencyInput * self.state.krakenFees) / 100);

        // Add Faldax Fees
        sellCurrencyInput = sellCurrencyInput + ((sellCurrencyInput * self.state.faldaxFees) / 100);
        return parseFloat((isNaN(sellCurrencyInput) ? 0 : sellCurrencyInput)).toFixed(6)
    }
    onBuyCurrencyChange(e) {
        var self = this;
        this.setState({
            buyCurrencyInput: e.target.value,
            // buyCryptoInput: (isNaN(e.target.value) ? 0 : (e.target.value) / self.state.askPrice)

        }, () => {
            self.calculateBuyCrypto();
        });
    }
    calculateBuyCrypto() {
        var self = this;
        if (self.state.includeFees) {
            this.setState({
                buyCryptoInput: (isNaN(self.state.buyCurrencyInput) ? 0 : (self.state.buyCurrencyInput) / self.state.askPrice)
            })
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
                buyCryptoInput: buyCryptoInput
            })
        }
    }
    onSellCryptoChange(e) {
        var self = this;
        self.setState({
            sellCryptoInput: e.target.value
        }, () => {
            self.calculateSellCurrency();
        });
    }
    calculateSellCurrency() {
        var self = this;
        if (self.state.includeFees === true) {
            self.setState({
                sellCurrencyInput: parseFloat((isNaN(self.state.sellCryptoInput) ? 0 : (self.state.sellCryptoInput * self.state.bidPrice))).toFixed(6)
            })
        } else {
            let sellCurrencyInput = 0;
            if (!isNaN(self.state.sellCryptoInput)) {
                sellCurrencyInput = (self.state.sellCryptoInput) * self.state.bidPrice;
                // Add Kraken Fees

                sellCurrencyInput = sellCurrencyInput + ((sellCurrencyInput * self.state.krakenFees) / 100);

                // Add Faldax Fees
                sellCurrencyInput = sellCurrencyInput + ((sellCurrencyInput * self.state.faldaxFees) / 100);
            }
            self.setState({
                sellCurrencyInput: parseFloat(sellCurrencyInput).toFixed(6)
            })
        }
    }
    onSellCurrencyChange(e) {
        var self = this;
        self.setState({
            sellCurrencyInput: e.target.value
        }, () => {
            self.calculateSellCrypto();
        });
    }
    calculateSellCrypto() {
        var self = this;
        if (self.state.includeFees) {
            this.setState({
                sellCryptoInput: (isNaN(self.state.sellCurrencyInput) ? 0 : (self.state.sellCurrencyInput) / self.state.bidPrice)
            })
        } else {
            let sellCryptoInput = self.state.sellCurrencyInput;
            if (!isNaN(self.state.sellCurrencyInput)) {
                // Minus Faldax Fees
                sellCryptoInput = (sellCryptoInput * 100) / (100 + self.state.faldaxFees);
                // Minus Kraken Fees
                sellCryptoInput = (sellCryptoInput * 100) / (100 + self.state.krakenFees);

                sellCryptoInput = sellCryptoInput / self.state.bidPrice;
            }
            self.setState({
                sellCryptoInput: sellCryptoInput
            })
        }
    }
    btnClicked() {
        var self = this;
        let { crypto, currency, selectedTab, includeFees, buyCryptoInput } = this.state
        // console.log("I am Clcicked", selectedTab, selectedTab === 1);
        if (selectedTab == 1) {
            if (this.validator1.allValid()) {
                // console.log("I am in Buy Tab");
                let fields = {};
                fields['pair'] = `${crypto}-${currency}`;
                fields['type'] = selectedTab == 1 ? "buy" : "sell";
                fields['volume'] = buyCryptoInput;
                fields['includeFees'] = includeFees;
                this.setState({ loader: true });
                fetch(`${API_URL}/perform-conversion`, {
                    method: "post",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + this.props.isLoggedIn
                    },
                    body: JSON.stringify(fields)
                }).then(response => response.json())
                    .then((responseData) => {
                        // console.log(responseData);
                        if (responseData.status == 200) {

                            this.handleTabChange("1");
                            this.setState({ loader: false });
                            this.openNotificationWithIcon('success', "Success", responseData.message);
                        }
                        else {

                            this.setState({ loader: false });
                            this.openNotificationWithIcon('error', "Error", responseData.message);
                        }
                    })
                    .catch(error => {
                        // console.log(error);
                        this.setState({ loader: false });
                        this.openNotificationWithIcon('error', 'Error', "Something went wrong!");
                    })
            }
            else {
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
                fields['pair'] = `${crypto}-${currency}`;
                fields['type'] = selectedTab == 1 ? "buy" : "sell";
                fields['volume'] = buyCryptoInput;
                fields['includeFees'] = includeFees;
                this.setState({ loader: true });
                fetch(`${API_URL}/perform-conversion`, {
                    method: "post",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + this.props.isLoggedIn
                    },
                    body: JSON.stringify(fields)
                }).then(response => response.json())
                    .then((responseData) => {
                        // console.log(responseData);
                        if (responseData.status == 200) {
                            this.handleTabChange("2");
                            this.openNotificationWithIcon('success', "Success", responseData.message);
                            this.setState({ loader: false });
                        }
                        else {
                            this.setState({ loader: false });
                            this.openNotificationWithIcon('error', "Error", responseData.message);
                        }
                    })
                    .catch(error => {
                        // console.log(error);
                        this.setState({ loader: false });
                        this.openNotificationWithIcon('error', 'Error', "Something went wrong!");
                    })
            }
            else {
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
            description: desc,
        });
    };
    render() {
        return (
            <ConversionWrap>
                <Navigation></Navigation>
                <ConversionContainer>
                    <MainRow>
                        <LeftCol lg={12}>
                            <ConversionTab defaultActiveKey="1" onChange={this.handleTabChange}>
                                <ConversionTabPane tab="BUY" key="1">
                                    <Row>
                                        <Col>
                                            <ConversionTitle>Choose Which Assets to Trade</ConversionTitle>
                                        </Col>
                                    </Row>
                                    <ConversionRadioRow>
                                        <Col md={24}>
                                            <RadioGroup onChange={this.radioChange} value={this.state.includeFees}>
                                                <FeesRadio value={true}>Including Fees</FeesRadio>
                                                <FeesRadio value={false}>Excluding Fees</FeesRadio>
                                            </RadioGroup>
                                        </Col>
                                    </ConversionRadioRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Get
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="number" value={this.state.buyCryptoInput} onChange={this.onBuyCryptoChange} />
                                            {this.validator1.message('crypto', this.state.buyCryptoInput, 'required|numeric|gtzero', 'text-danger-validation')}
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.cryptoList && this.state.cryptoList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.crypto} onChange={this.handleCryptoChange}>
                                                    {
                                                        this.state.cryptoList.map((element, index) => {
                                                            if (element.coin != this.state.currency) {
                                                                return (
                                                                    <DropDownOption key={index} value={element.coin}> <DropIcon src={`${_AMAZONBUCKET}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
                                                                )
                                                            }
                                                        })
                                                    }


                                                </ConversionDropDown>
                                            }
                                        </Col>
                                    </BorderRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Pay
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="number" value={this.state.buyCurrencyInput} onChange={this.onBuyCurrencyChange} />
                                            {this.validator1.message('currency', this.state.buyCurrencyInput, 'required|numeric|gtzero', 'text-danger-validation')}
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.currencyList && this.state.currencyList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.currency} onChange={this.handleCurrencyChange}>
                                                    {
                                                        this.state.currencyList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${_AMAZONBUCKET}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
                                                        ))
                                                    }


                                                </ConversionDropDown>
                                            }
                                        </Col>
                                    </BorderRow>
                                    {/* <Row style={{ marginBottom: "25px" }}>
                                        <Col xs={12}>
                                            <PayWith>
                                                Pay With
                                            </PayWith>
                                        </Col>
                                        <Col xs={12} style={{ textAlign: "right" }}>
                                            <BankAcountDropdown defaultValue="1" >
                                                <Option value="1">Suntest ****789</Option>
                                                <Option value="2">Silvergate ****123</Option>
                                            </BankAcountDropdown>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col>
                                            <ConversionSubmitBtn onClick={this.btnClicked} type="primary" size="large" style={{ marginTop: "57px" }} block>Buy xrp</ConversionSubmitBtn>
                                        </Col>
                                    </Row>
                                </ConversionTabPane>
                                <ConversionTabPane tab="SELL" key="2">
                                    <Row>
                                        <Col>
                                            <ConversionTitle>Choose Which Assets to Trade</ConversionTitle>
                                        </Col>
                                    </Row>
                                    <ConversionRadioRow>
                                        <Col md={24}>
                                            <RadioGroup onChange={this.radioChange} value={this.state.includeFees}>
                                                <FeesRadio value={true}>Including Fees</FeesRadio>
                                                <FeesRadio value={false}>Excluding Fees</FeesRadio>
                                            </RadioGroup>
                                        </Col>
                                    </ConversionRadioRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Pay
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="number" value={this.state.sellCryptoInput} onChange={this.onSellCryptoChange} />
                                            {this.validator2.message('crypto', this.state.sellCryptoInput, 'required|numeric|gtzero', 'text-danger-validation')}
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.cryptoList && this.state.cryptoList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.crypto} onChange={this.handleCryptoChange}>
                                                    {
                                                        this.state.cryptoList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${_AMAZONBUCKET}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
                                                        ))
                                                    }


                                                </ConversionDropDown>
                                            }
                                        </Col>
                                    </BorderRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Get
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="number" value={this.state.sellCurrencyInput} onChange={this.onSellCurrencyChange} />
                                            {this.validator2.message('currency', this.state.sellCurrencyInput, 'required|numeric|gtzero', 'text-danger-validation')}
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.currencyList && this.state.currencyList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.currency}>
                                                    {
                                                        this.state.currencyList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${_AMAZONBUCKET}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
                                                        ))
                                                    }


                                                </ConversionDropDown>
                                            }
                                        </Col>
                                    </BorderRow>
                                    {/* <Row style={{ marginBottom: "25px" }}>
                                        <Col xs={12}>
                                            <PayWith>
                                                Pay With
                                            </PayWith>
                                        </Col>
                                        <Col xs={12} style={{ textAlign: "right" }}>
                                            <BankAcountDropdown defaultValue="1" >
                                                <Option value="1">Suntest ****789</Option>
                                                <Option value="2">Silvergate ****123</Option>
                                            </BankAcountDropdown>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col>
                                            <ConversionSubmitBtn onClick={this.btnClicked} type="primary" size="large" block style={{ marginTop: "57px" }}>SELL xrp</ConversionSubmitBtn>
                                        </Col>
                                    </Row>
                                </ConversionTabPane>
                            </ConversionTab>
                        </LeftCol>
                        <RightCol lg={12}>
                            <RightColContainer>
                                <Row>
                                    <Col>
                                        {this.state.selectedTab === 1 &&
                                            <RightColTitle>You Are Buying</RightColTitle>
                                        }
                                        {this.state.selectedTab === 2 &&
                                            <RightColTitle>You Are Selling</RightColTitle>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.state.selectedTab === 1 &&
                                            <RightColAmount>{isNaN(parseFloat(this.state.buyCryptoInput)) ? 0 : parseFloat(this.state.buyCryptoInput).toFixed(4)} {this.state.crypto}</RightColAmount>
                                        }
                                        {this.state.selectedTab === 2 &&
                                            <RightColAmount>{isNaN(parseFloat(this.state.sellCryptoInput)) ? 0 : parseFloat(this.state.sellCryptoInput).toFixed(4)} {this.state.crypto}</RightColAmount>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.state.selectedTab === 1 &&
                                            <RightColPrice>@ {parseFloat(this.state.askPrice)} {this.state.currency} per {this.state.crypto}</RightColPrice>
                                        }
                                        {this.state.selectedTab === 2 &&
                                            <RightColPrice>@ {this.state.bidPrice} {this.state.currency} per {this.state.crypto}</RightColPrice>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DashedSeprator></DashedSeprator>
                                    </Col>
                                </Row>
                                {this.state.selectedTab === 1 &&
                                    <div>
                                        <Row>
                                            <Col xs={12}>
                                                <RightSpan>{isNaN(this.state.buyCryptoInput) ? 0 : this.state.buyCryptoInput} {this.state.crypto}</RightSpan>
                                            </Col>
                                            <Col xs={12} style={{ textAlign: "right" }}>
                                                <LeftSpan>{parseFloat((isNaN(this.state.buyCryptoInput * this.state.askPrice) ? 0 : (this.state.buyCryptoInput * this.state.askPrice))).toFixed(6)} {this.state.currency}</LeftSpan>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <RightSpan>FALDAX Fee</RightSpan>
                                            </Col>
                                            <Col xs={12} style={{ textAlign: "right" }}>
                                                <LeftSpan>{this.state.krakenFees}% +  {this.state.faldaxFees}%</LeftSpan>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <RightTotal>Total</RightTotal>
                                            </Col>
                                            <Col xs={12} style={{ textAlign: "right" }}>
                                                <LeftTotal>
                                                    {
                                                        this.getBuyCurrencyWithFees()
                                                    } {this.state.currency}
                                                </LeftTotal>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                {this.state.selectedTab === 2 &&
                                    <div>
                                        <Row>
                                            <Col xs={12}>
                                                <RightSpan>{isNaN(this.state.sellCryptoInput) ? 0 : this.state.sellCryptoInput} {this.state.crypto}</RightSpan>
                                            </Col>
                                            <Col xs={12} style={{ textAlign: "right" }}>
                                                <LeftSpan>{parseFloat((isNaN(this.state.sellCryptoInput * this.state.bidPrice) ? 0 : (this.state.sellCryptoInput * this.state.bidPrice))).toFixed(6)} {this.state.currency}</LeftSpan>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <RightSpan>FALDAX Fee</RightSpan>
                                            </Col>
                                            <Col xs={12} style={{ textAlign: "right" }}>
                                                <LeftSpan>{this.state.krakenFees}% +  {this.state.faldaxFees}%</LeftSpan>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <RightTotal>Total</RightTotal>
                                            </Col>
                                            <Col xs={12} style={{ textAlign: "right" }}>
                                                <LeftTotal>
                                                    {
                                                        this.getSellCurrencyWithFees()
                                                    } {this.state.currency}
                                                </LeftTotal>
                                            </Col>
                                        </Row>
                                    </div>
                                }

                            </RightColContainer>
                        </RightCol>
                    </MainRow>
                </ConversionContainer>
                {(this.state.loader == true) ?
                    <FaldaxLoader />
                    : ""
                }
            </ConversionWrap >
        )
    }
}
// export default Conversion;
function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Conversion);