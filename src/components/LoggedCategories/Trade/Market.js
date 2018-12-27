import React, { Component } from 'react';
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import 'antd/dist/antd.css';
import { Row, Col, Checkbox, Radio, notification } from 'antd';
import { Label, Market_wrap, Buy_wrap, Buy_sell, BuySellRadio, Balance_wrap, Balance, Total, Check_wrap, ETH_wrap, BTC_wrap, AMTinput, Total_wrap, Totinput, Pay, Esti, Button_wrap, ButtonETH } from "../../../styled-components/loggedStyle/tradeStyle";

import { globalVariables } from "../../../Globals";
let { API_URL } = globalVariables;

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: "Buy",
            crypto: "XRP",
            currency: "BTC",
            sellprice: 0.001,
            buyPrice: 0.002,
            amount: 0,
            total: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator({
            gtzero: {  // name the rule
                message: 'value must be greater than zero',
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
    onChange(e) {
        var self = this;
        let obj = {};
        let name = e.target.name;
        let value = e.target.value;
        obj[name] = value;
        if (name == "side") {
            obj["amount"] = 0;
            obj["total"] = 0;
        }
        this.setState({
            ...obj
        }, () => {
            obj = {};
            if (this.state.amount > 0) {
                if (this.state.side == "Buy") {
                    obj["total"] = this.state.amount * this.state.buyPrice
                } else if (this.state.side == "Sell") {
                    obj["total"] = this.state.amount * this.state.sellprice
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
                order_type: "Market",
                orderQuantity: self.state.amount
            }
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
                    if (responseData.status == 200) {
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
                <Balance_wrap>
                    <Row>
                        <Col span={12}>
                            <Balance>Balance 0 B</Balance>
                        </Col>
                        <Col span={12}>
                            <Total>Total 0 B</Total>
                        </Col>
                        <Col span={12}>
                            <Balance>In Orders 0 B</Balance>
                        </Col>
                        <Col span={12}>
                            <Total>Best ask 0 B</Total>
                        </Col>
                    </Row>
                </Balance_wrap>
                <ETH_wrap>
                    <Label>Amount</Label>

                    <Total_wrap style={{ marginBottom: 16 }}>
                        <AMTinput type="number" addonAfter={this.state.crypto} value={this.state.amount} name="amount" onChange={this.onChange} />
                        {this.validator.message('amount', this.state.amount, 'required|numeric|gtzero')}
                    </Total_wrap>
                </ETH_wrap>
                <BTC_wrap>
                    <Label>Total</Label>
                    <Total_wrap style={{ marginBottom: 16 }}>
                        <Totinput readOnly="true" type="number" addonAfter={this.state.currency} value={this.state.total} name="total" />
                    </Total_wrap>
                </BTC_wrap>
                <Pay>
                    <Row>
                        <Col span={12}>
                            you will approximately pay
                        </Col>
                        <Col span={12}>
                            $
                        </Col>
                    </Row>
                    <Esti>
                        <Row>
                            <Col span={12}>
                                Estimated Best Price
                            </Col>
                            <Col span={12}>
                                $
                            </Col>
                            <Col span={12}>
                                Fee 0.1%
                            </Col>
                            <Col span={12}>
                                $
                            </Col>
                        </Row>
                    </Esti>
                </Pay>
                <Button_wrap>
                    <ButtonETH side={this.state.side} onClick={this.onSubmit}>{this.state.side.toUpperCase()} ETH</ButtonETH>
                </Button_wrap>
            </Market_wrap>
        )
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Market);
