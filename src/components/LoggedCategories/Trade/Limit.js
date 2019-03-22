import React, { Component } from 'react';
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import 'antd/dist/antd.css';
import { Row, Col, Radio, notification } from 'antd';
import { Label, Market_wrap, Buy_wrap, Buy_sell, BuySellRadio, Balance_wrap, Balance, Balance1, Total, Check_wrap, ETH_wrap, BTC_wrap, Willpay, Willpay2, AMTinput, Total_wrap, Totinput, Pay, Esti, Best, Button_wrap, ButtonETH, StopCheck } from "../../../styled-components/loggedStyle/tradeStyle";

import { globalVariables } from "../../../Globals";
let { API_URL } = globalVariables;

class Limit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: "Buy",
            crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
            currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
            sellprice: 0.001,
            buyPrice: 0.002,
            amount: 0,
            limit_price: 0,
            total: 0,
            buyPayAmt: 0,
            buyEstPrice: 0,
            sellEstPrice: 0,
            sellPayAmt: 0,
            userBalFees: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator({
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
    }
    componentDidMount() {
        console.log("Will Mount", this.state);
        this.setState({
            amount: 0,
            total: 0,
            limit_price: 0,
            userBalFees: this.props.userBal.fees,
            buyEstPrice: 0,
            sellEstPrice: 0,
            buyPayAmt: 0,
            sellPayAmt: 0
        });
    }
    componentWillReceiveProps(props, newProps) {
        console.log("CWRP limit", this.state, props)
        this.setState({
            amount: 0,
            total: 0,
            limit_price: 0,
            userBalFees: props.userBal.fees
        });
        if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
            if (props.cryptoPair.crypto !== this.state.crypto) {
                this.setState({ crypto: props.cryptoPair.crypto })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                this.setState({ currency: props.cryptoPair.currency })
            }
        }
    }
    onChange(e) {
        var self = this;
        let obj = {};
        let name = e.target.name;
        let value = e.target.value;
        obj[name] = value;
        if (name == "side") {
            obj["amount"] = 0;
            obj["total"] = 0;
            obj['limit_price'] = 0;
        }
        this.setState({
            ...obj
        }, () => {
            obj = {};
            if (this.state.amount > 0 && this.state.limit_price > 0) {
                if (this.state.side == "Buy") {
                    obj["total"] = Number(this.state.amount) * this.props.userBal.buyPay;
                    self.setState({
                        buyPayAmt: Number(this.state.amount) * this.props.userBal.buyPay,
                        buyEstPrice: Number(this.state.amount) * this.props.userBal.buyEstimatedPrice
                    })
                } else if (this.state.side == "Sell") {
                    self.setState({
                        sellPayAmt: Number(this.state.amount) * this.props.userBal.sellPay,
                        sellEstPrice: Number(this.state.amount) * this.props.userBal.sellEstimatedPrice
                    })
                    obj["total"] = Number(this.state.amount) * this.props.userBal.sellPay;
                }
            } else {
                obj["total"] = 0;
            }
            self.setState({ ...obj });
        });
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
    onSubmit() {
        var self = this;
        if (this.validator.allValid()) {
            let params = {
                symbol: self.state.crypto.toUpperCase() + "-" + self.state.currency.toUpperCase(),
                side: self.state.side,
                order_type: "Limit",
                orderQuantity: self.state.amount,
                limit_price: self.state.limit_price
            }
            fetch(API_URL + "/limit/" + self.state.side.toLowerCase(), {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + self.props.isLoggedIn
                },
                body: JSON.stringify(params)
            }).then(response => response.json())
                .then((responseData) => {
                    if (responseData.status == 200) {
                        this.setState({ limit_price: 0, total: 0, amount: 0 });
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
    onChangeCheck(e) {
    }
    render() {
        const { userBalFees, buyEstPrice, buyPayAmt, sellEstPrice, sellPayAmt } = this.state;
        const RadioGroup = Radio.Group;

        return (
            <Market_wrap>
                <Buy_wrap>
                    <Buy_sell>
                        <RadioGroup value={this.state.side} size="large" buttonStyle="solid" onChange={this.onChange} name="side">
                            <BuySellRadio value="Buy">BUY</BuySellRadio>
                            <BuySellRadio value="Sell">SELL</BuySellRadio>
                        </RadioGroup>
                    </Buy_sell>
                </Buy_wrap>

                {Object.keys(this.props.userBal).length > 0 ?
                    this.state.side == "Buy" ?
                        <Balance_wrap>
                            <Row>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Balance</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Balance>{this.props.userBal.currency[0].placed_balance.toFixed(2)} {this.state.currency}</Balance>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Total</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{this.props.userBal.currency[0].balance.toFixed(2)} {this.state.currency}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>In orders</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{(this.props.userBal.currency[0].balance - this.props.userBal.currency[0].placed_balance).toFixed(2)} {this.state.currency}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Best ask</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{this.props.userBal.buyPay.toFixed(2)} {this.state.currency}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Balance_wrap> :
                        <Balance_wrap>
                            <Row>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Balance</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Balance>{this.props.userBal.crypto[0].placed_balance.toFixed(2)} {this.state.crypto}</Balance>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Total</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{this.props.userBal.crypto[0].balance.toFixed(2)} {this.state.crypto}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>In orders</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{(this.props.userBal.crypto[0].balance - this.props.userBal.crypto[0].placed_balance).toFixed(2)} {this.state.crypto}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Balance1>Best ask</Balance1>
                                        </Col>
                                        <Col span={12}>
                                            <Total>{this.props.userBal.sellPay.toFixed(2)} {this.state.crypto}</Total>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Balance_wrap>
                    : ""}
                <ETH_wrap>
                    <Label>Amount</Label>
                    <Total_wrap style={{ marginBottom: 16 }}>
                        <AMTinput type="number" addonAfter={this.state.crypto} value={this.state.amount} name="amount" onChange={this.onChange} />
                        {this.validator.message('Amount', this.state.amount, 'required|numeric|gtzero')}
                    </Total_wrap>
                </ETH_wrap>
                <BTC_wrap>
                    <Label>Limit Price</Label>
                    <Total_wrap style={{ marginBottom: 16 }}>
                        <Totinput type="number" addonAfter={this.state.currency} value={this.state.limit_price} name="limit_price" onChange={this.onChange} />
                        {this.validator.message('Limit_price', this.state.limit_price, 'required|numeric|gtzero')}
                    </Total_wrap>
                </BTC_wrap>
                <BTC_wrap>
                    <Label>Total</Label>
                    <Total_wrap style={{ marginBottom: 16 }}>
                        <Totinput type="number" addonAfter={this.state.currency} value={this.state.toFixed(4)} name="total" readOnly="true" />
                    </Total_wrap>
                </BTC_wrap>
                {Object.keys(this.props.userBal).length > 0 ?
                    this.state.side == "Buy" ?
                        <Pay>
                            <Row>
                                <Col xs={15} sm={12}>
                                    <div>
                                        <Willpay>You will approximately pay</Willpay>
                                    </div>
                                </Col>
                                <Col xs={9} sm={12}>
                                    <div>
                                        <Willpay2>{buyPayAmt.toFixed(4)} {this.props.cryptoPair !== "" ? this.props.cryptoPair.currency : ""}</Willpay2>
                                    </div>
                                </Col>
                            </Row>
                            <Esti>
                                <Row>
                                    <Col xs={15} sm={12}>
                                        Estimated Best Price
                                    </Col>
                                    <Col xs={9} sm={12}>
                                        {buyPayAmt.toFixed(4)} {this.props.cryptoPair !== "" ? this.props.cryptoPair.currency : ""}
                                    </Col>
                                    {console.log(userBalFees)}
                                    <Col xs={15} sm={12}>
                                        Fee {userBalFees} %
                                    </Col>
                                    <Col xs={9} sm={12}>
                                        {buyEstPrice.toFixed(4)} {this.props.cryptoPair !== "" ? this.props.cryptoPair.currency : ""}
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
                                        <Willpay2>{sellPayAmt.toFixed(4)} {this.props.cryptoPair !== "" ? this.props.cryptoPair.currency : ""}</Willpay2>
                                    </div>
                                </Col>
                            </Row>
                            <Esti>
                                <Row>
                                    <Col xs={15} sm={12}>
                                        Estimated Best Price
                            </Col>
                                    <Col xs={9} sm={12}>
                                        {sellPayAmt.toFixed(4)} {this.props.cryptoPair !== "" ? this.props.cryptoPair.currency : ""}
                                    </Col>
                                    {console.log(userBalFees)}
                                    <Col xs={15} sm={12}>
                                        Fee {userBalFees} %
                            </Col>
                                    <Col xs={9} sm={12}>
                                        {sellEstPrice.toFixed(4)} {this.props.cryptoPair !== "" ? this.props.cryptoPair.currency : ""}
                                    </Col>
                                </Row>
                            </Esti>
                        </Pay> : ""}
                <Button_wrap>
                    <ButtonETH side={this.state.side} onClick={this.onSubmit}>{this.state.side.toUpperCase()} {this.state.crypto}</ButtonETH>
                </Button_wrap>
            </Market_wrap>
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

export default connect(mapStateToProps)(Limit);
