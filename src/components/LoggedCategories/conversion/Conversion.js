import React from "react";
import { connect } from "react-redux"
import { ConversionWarp, ConversionContainer, MainRow, ConversionTab, LeftCol, ConversionTitle, CustomRadioContainer, ConversionTabPane, ConversionRadioRow, BorderRow, RowTitle, ConversionInput, ConversionDropDown, DropDownOption, DropIcon, ConversionSubmitBtn, RightCol, RightColContainer, RightColTitle, RightColAmount, RightColPrice, DashedSeprator, LeftSpan, RightSpan, RightTotal, LeftTotal, PayWith, BankAcountDropdown } from "../../../styled-components/conversion/style";
import Navigation from "../../Navigations/Navigation";
import { Row, Col, Tabs, Select, Button, Divider, Icon } from "antd";
import { globalVariables } from "../../../Globals";
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
            includeFees: true
        }
        io = this.props.io
        this.getCurrencies = this.getCurrencies.bind(this);
        this.getCrypto = this.getCrypto.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    componentDidMount() {
        this.getCrypto();
        this.getCurrencies();
    }
    getPairDetails() {
        io.sails.url = API_URL;
        var URL;
        this.setState({ loader: true })
        if (this.props.cryptoPair.prevRoom !== undefined && Object.keys(this.props.cryptoPair.prevRoom).length > 0) {
            URL = `/socket/get-sell-book?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`
        }
        else {
            URL = `/socket/get-sell-book?room=${this.state.crypto}-${this.state.currency}`
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
                this.updateData(res);
            }
        });
        io.socket.on('sellbookUpdate', (data) => {
            this.updateData(data);
        });
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
    handleCurrencyChange(value) {
        this.setState({
            crypto: value
        }, () => {
            this.getCurrencies();
        });
    }
    handleTabChange(e) {
        this.setState({
            selectedTab: e
        })
    }
    radioChange(e) {
        // console.log(e.target.value);
        this.setState({
            includeFees: JSON.parse(e.target.value)
        })

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
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" value={true} checked={this.state.includeFees} onChange={this.radioChange} />
                                                <span className="radio-label">Including Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
                                        </Col>
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" value={false} checked={!this.state.includeFees} onChange={this.radioChange} />
                                                <span className="radio-label">Excluding Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
                                        </Col>
                                    </ConversionRadioRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Get
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="text" />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            {this.state.cryptoList && this.state.cryptoList.length > 0 &&
                                                < ConversionDropDown defaultValue={this.state.crypto} onChange={this.handleCurrencyChange}>
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
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" checked />
                                                <span className="radio-label">Including Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
                                        </Col>
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" />
                                                <span className="radio-label">Excluding Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
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
                                                < ConversionDropDown defaultValue={this.state.currency} onChange={this.handleCurrencyChange}>
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
                                                < ConversionDropDown defaultValue="">
                                                    {
                                                        this.state.currencyList.map((element, index) => (
                                                            <DropDownOption key={index} value={element.coin}> <DropIcon src={`${amazon_Bucket}${element.coin_icon}`} height="20px" />  {element.coin_name}</DropDownOption>
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
                                        <RightColAmount>0.0123 BTC</RightColAmount>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <RightColPrice>@ $3,914.06  per BTC</RightColPrice>
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