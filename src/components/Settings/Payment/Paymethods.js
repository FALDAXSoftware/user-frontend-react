import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Input, Row, Col, Button, Layout, Menu, Breadcrumb, Card, Cardimport, Modal, Table, notification } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components';
import { Payment_wrap, PayHead, PayForm, Bank, Bank_label, Bank_input, Button_payment, Button_sub, Button_cancel, Button_add, PayForm2, Lefty, Righty, Gap, Top, CardName, RemoveCard, Body_card, Body_center } from '../../../styled-components/settings/paymentStyle'


class Paymethods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false
        };
    }
    render() {
        return (
            <Payment_wrap>
                <PayHead>Bank Accounts</PayHead>
                {this.state.flag == true
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
                                <Button_add>Add</Button_add>
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
                                                <img src="/images/Settings/cardAcc.png" />
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
                                                <img src="/images/Settings/cardAcc.png" />
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
                                                <img src="/images/Settings/cardAcc.png" />
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
                                                <img src="/images/Settings/cardAcc.png" />
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