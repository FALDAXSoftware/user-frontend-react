import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Table,Input,notification,Steps,Menu, Dropdown,Icon,Checkbox} from 'antd';
import styled from 'styled-components';

import {Label,Market_wrap,Buy_wrap,Buy_sell,Buy,Sell,Balance_wrap,Balance,Total,Check_wrap,ETH_wrap,BTC_wrap,AMTinput,Total_wrap,Totinput,Pay,Esti,Button_wrap,ButtonETH} from "../../../styled-components/loggedStyle/tradeStyle";

class Market extends React.Component
{
    onChange(e) 
    {
        console.log(`checked = ${e.target.checked}`);
    }
    render()
    {
        return(
            <Market_wrap>
                <Buy_wrap>
                    <Buy_sell>
                        <Buy>
                            <span>Buy</span>
                        </Buy>  
                        <Sell>
                            <span>Sell</span>
                        </Sell>
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
                <Check_wrap>
                    <Checkbox onChange={this.onChange}>Stop</Checkbox>
                </Check_wrap>
                <ETH_wrap>
                    <Label>Amount</Label>
                    
                    <Total_wrap style={{ marginBottom: 16 }}>
                        <AMTinput addonAfter={"ETH"} defaultValue="" />
                    </Total_wrap>  
                </ETH_wrap>
                <BTC_wrap>
                    <Label>Total</Label>
                    <Total_wrap style={{ marginBottom: 16 }}>
                        <Totinput addonAfter={"BTC"} defaultValue="" />
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
                    <ButtonETH>BUY ETH</ButtonETH>
                </Button_wrap>
            </Market_wrap>
        )
    }
}

export default Market;