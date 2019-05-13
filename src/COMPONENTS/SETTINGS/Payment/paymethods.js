/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

/* CONSTANTS */
import { _BANKCARD } from "CONSTANTS/images";

/* styled-COMPONENTS */
import {
    PaymentWrap, PayHead, PayForm, Bank, BankLabel, BankInput, ButtonPayment,
    ButtonSub, ButtonCancel, ButtonAdd, PayForm2, Lefty, Righty, Gap, Top, CardName,
    RemoveCard, BodyCard, BodyCenter
} from 'STYLED-COMPONENTS/SETTINGS/paymentStyle';

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
            <PaymentWrap>
                <PayHead>Bank Accounts</PayHead>
                {this.state.flag === false
                    ?
                    <PayForm>
                        <Bank>
                            <BankLabel>Bank Name*</BankLabel>
                            <BankInput />
                        </Bank>
                        <Bank>
                            <BankLabel>Account Number*</BankLabel>
                            <BankInput />
                        </Bank>
                        <Bank>
                            <BankLabel>RTN*</BankLabel>
                            <BankInput />
                        </Bank>
                        <ButtonPayment>
                            <ButtonSub>
                                <ButtonCancel>cancel</ButtonCancel>
                                <ButtonAdd onClick={this.addCard} >Add</ButtonAdd>
                            </ButtonSub>
                        </ButtonPayment>
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
                                        <BodyCard>
                                            <BodyCenter>
                                                <img alt="Bank Card" src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </BodyCenter>
                                        </BodyCard>
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
                                        <BodyCard>
                                            <BodyCenter>
                                                <img alt="Bank Card" src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </BodyCenter>
                                        </BodyCard>
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
                                        <BodyCard>
                                            <BodyCenter>
                                                <img alt="Bank Card" src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </BodyCenter>
                                        </BodyCard>
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
                                        <BodyCard>
                                            <BodyCenter>
                                                <img alt="Bank Card" src={_BANKCARD} />
                                                <span>BG75FINV91501056322589</span>
                                            </BodyCenter>
                                        </BodyCard>
                                    </Righty>
                                </Col>
                            </Row>
                        </Gap>
                    </PayForm2>
                }
            </PaymentWrap>
        );
    }
}

export default Paymethods;