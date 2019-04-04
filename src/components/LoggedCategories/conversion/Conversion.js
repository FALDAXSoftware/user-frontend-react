import React from "react";
import { connect } from "react-redux"
import { ConversionWarp, ConversionContainer, MainRow, ConversionTab, LeftCol, ConversionTitle, CustomRadioContainer, ConversionTabPane, ConversionRadioRow, BorderRow, RowTitle, ConversionInput, ConversionDropDown, DropDownOption, DropIcon, ConversionSubmitBtn, RightCol, RightColContainer, RightColTitle, RightColAmount, RightColPrice, DashedSeprator, LeftSpan, RightSpan, RightTotal, LeftTotal, PayWith, BankAcountDropdown, FeesRadio } from "../../../styled-components/conversion/style";
import Navigation from "../../Navigations/Navigation";
import { Row, Col, Tabs, Select, Button, Divider, Icon, Radio } from "antd";
import { globalVariables } from "../../../Globals";
const RadioGroup = Radio.Group;
const API_URL = globalVariables.API_URL;
const amazon_Bucket = globalVariables.amazon_Bucket;
const Option = Select.Option
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
            includeFees: true
        }
        io = this.props.io
        this.getCurrencies = this.getCurrencies.bind(this);
        this.getCrypto = this.getCrypto.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.getPairDetails = this.getPairDetails.bind(this);
        this.handleCryptoChange = this.handleCryptoChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.onBuyCryptoChange = this.onBuyCryptoChange.bind(this);
        this.onBuyCurrencyChange = this.onBuyCurrencyChange.bind(this);
    }
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
        if (this.state.prevRoom.trim() != "") {
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


            if (body.status == 200) {
                let res = body.data;
                console.log("----=---=---", res);
                self.setState({
                    askPrice: res.ask_price,
                    bidPrice: res.bid_price
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
                console.log(responseData);

                this.setState({ cryptoList: responseData.data })
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
                console.log(responseData);

                this.setState({ currencyList: responseData.data })
            })
            .catch(error => {
            })
    }
    handleCryptoChange(value) {
        let prevRoom = this.state.crypto + "-" + this.state.currency
        this.setState({
            crypto: value,
            prevRoom: prevRoom
        }, () => {
            this.getCurrencies();
        });
    }
    handleCurrencyChange(value) {
        let prevRoom = this.state.crypto + "-" + this.state.currency
        this.setState({
            currency: value,
            prevRoom: prevRoom
        }, () => {

        });
    }
    handleTabChange(e) {
        this.setState({
            selectedTab: e,
            buyCryptoInput: 0,
            buyCurrencyInput: 0
        })
    }
    radioChange(e) {
        // console.log(e.target.value);
        this.setState({
            includeFees: JSON.parse(e.target.value)
        })

    }
    onBuyCryptoChange(e) {
        var self = this;
        this.setState({
            buyCryptoInput: e.target.value,
            buyCurrencyInput: (isNaN(e.target.value) ? 0 : (e.target.value) * self.state.askPrice)
        })
    }
    onBuyCurrencyChange(e) {
        var self = this;
        this.setState({
            buyCurrencyInput: e.target.value,
            buyCryptoInput: (isNaN(e.target.value) ? 0 : (e.target.value) / self.state.askPrice)

        });
    }
    render() {
        return (
            <ConversionWarp>
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
                                            <ConversionInput type="text" value={this.state.buyCryptoInput} onChange={this.onBuyCryptoChange} />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.cryptoList && this.state.cryptoList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.crypto} onChange={this.handleCryptoChange}>
                                                    {
                                                        this.state.cryptoList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${amazon_Bucket}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
                                                        ))
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
                                            <ConversionInput type="text" value={this.state.buyCurrencyInput} onChange={this.onBuyCurrencyChange} />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.currencyList && this.state.currencyList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.currency} onChange={this.handleCurrencyChange}>
                                                    {
                                                        this.state.currencyList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${amazon_Bucket}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
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
                                            <ConversionSubmitBtn type="primary" size="large" style={{ marginTop: "57px" }} block>Buy xrp</ConversionSubmitBtn>
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
                                            <ConversionInput type="text" />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.cryptoList && this.state.cryptoList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.currency} onChange={this.handleCryptoChange}>
                                                    {
                                                        this.state.cryptoList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${amazon_Bucket}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
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
                                            <ConversionInput type="text" />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.currencyList && this.state.currencyList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.currency}>
                                                    {
                                                        this.state.currencyList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${amazon_Bucket}${element.coin_icon}`} height="20px" />  {element.coin}</DropDownOption>
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
                                            <ConversionSubmitBtn type="primary" size="large" block style={{ marginTop: "57px" }}>SELL xrp</ConversionSubmitBtn>
                                        </Col>
                                    </Row>
                                </ConversionTabPane>
                            </ConversionTab>
                        </LeftCol>
                        <RightCol lg={12}>
                            <RightColContainer>
                                <Row>
                                    <Col>
                                        {this.state.selectedTab == 1 &&
                                            <RightColTitle>You Are Buying</RightColTitle>
                                        }
                                        {this.state.selectedTab == 2 &&
                                            <RightColTitle>You Are Selling</RightColTitle>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.state.selectedTab == 1 &&
                                            <RightColAmount>{isNaN(parseFloat(this.state.buyCryptoInput)) ? 0 : parseFloat(this.state.buyCryptoInput).toFixed(4)} {this.state.crypto}</RightColAmount>
                                        }
                                        {this.state.selectedTab == 2 &&
                                            <RightColAmount>{this.state.buyCryptoInput * this.state.bidPrice} {this.state.crypto}</RightColAmount>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.state.selectedTab == 1 &&
                                            <RightColPrice>@ {parseFloat(this.state.askPrice)} {this.state.currency} per {this.state.crypto}</RightColPrice>
                                        }
                                        {this.state.selectedTab == 2 &&
                                            <RightColPrice>@ {this.state.bidPrice} {this.state.currency} per {this.state.crypto}</RightColPrice>
                                        }
                                        {/* <RightColPrice>@ 3,914.06  per {this.state.crytpo}</RightColPrice> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DashedSeprator></DashedSeprator>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <RightSpan>0.0123 BTC</RightSpan>
                                    </Col>
                                    <Col xs={12} style={{ textAlign: "right" }}>
                                        <LeftSpan>$3,000</LeftSpan>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <RightSpan>FALDAX Fee</RightSpan>
                                    </Col>
                                    <Col xs={12} style={{ textAlign: "right" }}>
                                        <LeftSpan>$5.00</LeftSpan>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <RightTotal>Total</RightTotal>
                                    </Col>
                                    <Col xs={12} style={{ textAlign: "right" }}>
                                        <LeftTotal>$3005</LeftTotal>
                                    </Col>
                                </Row>
                            </RightColContainer>
                        </RightCol>
                    </MainRow>
                </ConversionContainer>
            </ConversionWarp >
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