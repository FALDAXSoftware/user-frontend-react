/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

/* Constants */
import { _BANKCARD } from "Constants/images";

/* styled-components */
import {
    Payment_wrap, PayHead, PayForm, Bank, Bank_label, Bank_input, Button_payment,
    Button_sub, Button_cancel, Button_add, PayForm2, Lefty, Righty, Gap, Top, CardName,
    RemoveCard, Body_card, Body_center
} from 'styled-components/settings/paymentStyle';

class Paymethods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false
        }
        this.addCard = this.addCard.bind(this);
    }
    addCard() {
        this.setState({ flag: true })
    }
    render() {

        return (
            <Payment_wrap>
                <PayHead>Bank Accounts</PayHead>
                {this.state.flag == false
                    ?
                    <PayForm>
                        <Bank>
                            <Bank_label>Bank Name*</Bank_label>
                            <Bank_input />
                        </Bank>
                        <Bank>
                            <Bank_label>Account Number*</Bank_label>
                            <Bank_input />
                        </Bank>
                        <Bank>
                            <Bank_label>RTN*</Bank_label>
                            <Bank_input />
                        </Bank>
                        <Button_payment>
                            <Button_sub>
                                <Button_cancel>cancel</Button_cancel>
                                <Button_add onClick={this.addCard} >Add</Button_add>
                            </Button_sub>
                        </Button_payment>
                    </PayForm>
                    :
                    <PayForm2>
                        <Gap>
                            <Row>
                                <Col span={12}>
                                    <Lefty>
                                        <Top>
                                            <label className="radio-container">
                                                <input type="radio" name="card" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <CardName>JPMorgan Chase & co.</CardName>
                                            <RemoveCard>Remove Card</RemoveCard>
                                        </Top>
                                        <Body_card>
                                            <Body_center>
                                                <img src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </Body_center>
                                        </Body_card>
                                    </Lefty>
                                </Col>
                                <Col span={12}>
                                    <Righty>
                                        <Top>
                                            <label className="radio-container">
                                                <input type="radio" name="card" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <CardName>Bank of America</CardName>
                                            <RemoveCard>Remove Card</RemoveCard>
                                        </Top>
                                        <Body_card>
                                            <Body_center>
                                                <img src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </Body_center>
                                        </Body_card>
                                    </Righty>
                                </Col>
                            </Row>
                        </Gap>
                        <Gap>
                            <Row>
                                <Col span={12}>
                                    <Lefty>
                                        <Top>
                                            <label className="radio-container">
                                                <input type="radio" name="card" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <CardName>HSBC USA Inc.</CardName>

                                            <RemoveCard>Remove Card</RemoveCard>
                                        </Top>
                                        <Body_card>
                                            <Body_center>
                                                <img src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </Body_center>
                                        </Body_card>
                                    </Lefty>
                                </Col>
                                <Col span={12}>
                                    <Righty>
                                        <Top>
                                            <label className="radio-container">
                                                <input type="radio" name="card" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <CardName>U.S. Bancorp</CardName>

                                            <RemoveCard>Remove Card</RemoveCard>
                                        </Top>
                                        <Body_card>
                                            <Body_center>
                                                <img src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </Body_center>
                                        </Body_card>
                                    </Righty>
                                </Col>
                            </Row>
                        </Gap>
                    </PayForm2>
                }
            </Payment_wrap>
        );
    }
}

export default Paymethods;