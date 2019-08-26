/* Built-in Packages */
import React, { Component } from 'react';
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import 'antd/dist/antd.css';
import { Row, Col, Radio, notification, Spin } from 'antd';

/* STYLED-COMPONENTS */
import { Label, MarketWrap, BuyWrap, BuySell, BuySellRadio, BalanceWrap, Balance, Balance1, Total, ETHWrap, BTCWrap, Willpay, Willpay2, AMTInput, TotalWrap, TotInput, Pay, Esti, ButtonWrap, ButtonETH } from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

/* Components */
import {
    SpinSingle
} from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle"
import { globalVariables } from "Globals.js";

let { API_URL } = globalVariables;

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: "Buy",
            crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
            currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
            sellprice: 0.001,
            buyPrice: 0.002,
            amount: 0,
            total: 0,
            Loader: false,
            buyPayAmt: 0,
            buyEstPrice: 0,
            sellEstPrice: 0,
            sellPayAmt: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
        this.validator = new SimpleReactValidator({
            gtzero: {  // name the rule
                message: 'Amount should be greater than zero',
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
    }
    /* Life-Cycle Methods */

    componentWillReceiveProps(props, newProps) {
        this.setState({
            userBalFees: props.userBal.fees, amount: 0,
            total: 0, buyPayAmt: 0, sellPayAmt: 0,
            buyEstPrice: 0, sellEstPrice: 0
        })
        if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
            if (props.cryptoPair.crypto !== this.state.crypto) {
                this.setState({ crypto: props.cryptoPair.crypto })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                this.setState({ currency: props.cryptoPair.currency })
            }
        }
    }

    componentDidMount() {
    }

    /* 
        Page: /trade --> market
        this method is called for clearing validation messages.
    */

    clearValidation() {
        this.validator.hideMessages();
        this.forceUpdate();
        // rerender to hide messages for the first time
    }

    /* 
        Page: /trade --> market
        this method is called to change BUY/SELL side.
    */

    onChange(e) {
        var self = this;
        let obj = {};
        let name = e.target.name;
        let value = e.target.value;
        obj[name] = value;
        if (name === "side") {
            obj["amount"] = 0;
            obj["total"] = 0;
        }
        this.setState({
            ...obj
        }, () => {
            obj = {};

            if (this.state.amount >= 0) {
                if (this.state.side === "Buy") {
                    self.setState({
                        buyPayAmt: Number(this.state.amount) * this.props.userBal.buyPay,
                        buyEstPrice: Number(this.state.amount) * this.props.userBal.buyEstimatedPrice
                    })
                    obj["total"] = Number(this.state.amount) * this.props.userBal.buyPay
                } else if (this.state.side === "Sell") {
                    self.setState({
                        sellPayAmt: Number(this.state.amount) * this.props.userBal.sellPay,
                        sellEstPrice: Number(this.state.amount) * this.props.userBal.sellEstimatedPrice
                    })
                    obj["total"] = Number(this.state.amount) * this.props.userBal.sellPay
                }
            } else {
                obj["total"] = 0;
            }
            self.setState({ ...obj });
        });
    }

    /* 
        Page: /trade --> market
        this method is called for cutom notifications.
    */

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };

    /* 
        Page: /trade --> market
        this method is called when u submit form to BUY/SELL.
    */

    onSubmit() {
        var self = this;

        if (this.validator.allValid()) {
            let params = {
                symbol: self.state.crypto.toUpperCase() + "-" + self.state.currency.toUpperCase(),
                side: self.state.side,
                order_type: "Market",
                orderQuantity: self.state.amount
            }
            self.setState({ Loader: true });
            fetch(API_URL + "/market/" + self.state.side.toLowerCase(), {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + self.props.isLoggedIn
                },
                body: JSON.stringify(params)
            }).then(response => response.json())
                .then((responseData) => {
                    this.setState({
                        Loader: false, total: 0, amount: 0, buyPayAmt: 0, sellPayAmt: 0,
                        buyEstPrice: 0, sellEstPrice: 0
                    });
                    if (responseData.status === 200) {
                        self.openNotificationWithIcon('success', 'Success', responseData.message);
                    } else {
                        self.openNotificationWithIcon('error', 'Error', responseData.err);
                    }
                }).catch(error => {
                    self.openNotificationWithIcon('error', 'Error', "Something went wrong!");
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { buyPayAmt, buyEstPrice, sellEstPrice, sellPayAmt, amount } = this.state;
        const RadioGroup = Radio.Group;

        return (
            <MarketWrap>
                <BuyWrap>
                    <BuySell>
                        <RadioGroup value={this.state.side} size="large" buttonStyle="solid" onChange={this.onChange} name="side">
                            <BuySellRadio value="Buy">BUY</BuySellRadio>
                            <BuySellRadio value="Sell">SELL</BuySellRadio>
                        </RadioGroup>
                    </BuySell>
                </BuyWrap>

                {Object.keys(this.props.userBal).length > 0 ?
                    this.state.side === "Buy" ?
                        <BalanceWrap>
                            <Row>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Balance</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Balance>{this.props.userBal.currency[0].placed_balance.toFixed(4)} {this.state.currency}</Balance>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Total</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{(this.props.userBal.currency[0].balance).toFixed(4)} {this.state.currency}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>In orders</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{(Math.abs(this.props.userBal.currency[0].balance - this.props.userBal.currency[0].placed_balance)).toFixed(4)} {this.state.currency}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Best ask</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{this.props.userBal.buyPay.toFixed(4)} {this.state.crypto}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </BalanceWrap> :
                        <BalanceWrap>
                            <Row>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Balance</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Balance>{this.props.userBal.crypto[0].placed_balance.toFixed(4)} {this.state.crypto}</Balance>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Total</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{(this.props.userBal.crypto[0].balance).toFixed(4)} {this.state.crypto}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>In orders</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{(Math.abs(this.props.userBal.crypto[0].balance - this.props.userBal.crypto[0].placed_balance)).toFixed(4)} {this.state.crypto}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Best ask</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{this.props.userBal.sellPay.toFixed(4)} {this.state.currency}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </BalanceWrap>
                    : ""}
                <ETHWrap>
                    <Label>Amount</Label>
                    <TotalWrap style={{ marginBottom: 16 }}>
                        <AMTInput min="0" type="number" addonAfter={this.state.crypto} value={this.state.amount} name="amount" onChange={this.onChange} />
                        {this.validator.message('Amount', this.state.amount, 'required|gtzero|numeric')}
                    </TotalWrap>
                </ETHWrap>
                <BTCWrap>
                    <Label>Total</Label>
                    <TotalWrap style={{ marginBottom: 16 }}>
                        <TotInput min="0" readOnly="true" type="number" addonAfter={this.state.currency} value={this.state.total.toFixed(4)} name="total" />
                    </TotalWrap>
                </BTCWrap>
                {Object.keys(this.props.userBal).length > 0 ?
                    this.state.side === "Buy" ?
                        <Pay>
                            <Row>
                                <Col xs={15} sm={12}>
                                    <div>
                                        <Willpay>You will approximately pay</Willpay>
                                    </div>
                                </Col>
                                <Col xs={9} sm={12}>
                                    <div>
                                        <Willpay2>{buyPayAmt.toFixed(4)} {this.state.currency}</Willpay2>
                                    </div>
                                </Col>
                            </Row>
                            <Esti>
                                <Row>
                                    <Col xs={15} sm={12}>
                                        Estimated Best Price
                                    </Col>
                                    <Col xs={9} sm={12}>
                                        {buyPayAmt.toFixed(4)} {this.state.currency}
                                    </Col>
                                    <Col xs={15} sm={12}>
                                        Fee {this.state.userBalFees} %
                                    </Col>
                                    <Col xs={9} sm={12}>
                                        {(buyPayAmt - buyEstPrice).toFixed(4)} {this.state.currency}
                                    </Col>
                                </Row>
                            </Esti>
                        </Pay>
                        :
                        <Pay>
                            <Row>
                                <Col xs={15} sm={12}>
                                    <div>
                                        <Willpay>You will approximately receive</Willpay>
                                    </div>
                                </Col>
                                <Col xs={9} sm={12}>
                                    <div>
                                        <Willpay2>{sellEstPrice.toFixed(4)} {this.state.currency}</Willpay2>
                                    </div>
                                </Col>
                            </Row>
                            <Esti>
                                <Row>
                                    <Col xs={15} sm={12}>
                                        Estimated Best Price
                            </Col>
                                    <Col xs={9} sm={12}>
                                        {sellPayAmt.toFixed(4)} {this.state.currency}
                                    </Col>
                                    <Col xs={15} sm={12}>
                                        Fee {this.state.userBalFees} %
                            </Col>
                                    <Col xs={9} sm={12}>
                                        {(sellPayAmt - sellEstPrice).toFixed(4)} {this.state.currency}
                                    </Col>
                                </Row>
                            </Esti>
                        </Pay> : ""}
                <ButtonWrap>
                    <ButtonETH side={this.state.side} onClick={this.onSubmit}>{this.state.side.toUpperCase()} {this.state.crypto}</ButtonETH>
                </ButtonWrap>
                {(this.state.Loader === true) ?
                    <SpinSingle className="Single_spin">
                        <Spin size="small" />
                    </SpinSingle>
                    : ""
                }
            </MarketWrap>
        )
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        cryptoPair: state.walletReducer.cryptoPair !== undefined ? state.walletReducer.cryptoPair : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Market);
