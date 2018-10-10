import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Input,notification,Steps } from 'antd';
import styled from 'styled-components';


const KYC_type_select_row = styled.div`
  width:50%;
  margin 55px auto;
`
const Select_text= styled(Col)`
    margin-top:20px;
    margin-bottom:30px;
`
const Select_Col1 = styled(Col)`
    @media(max-width:575px)
    {
        margin-top:30px;
    }
`
const Select_Col2 = styled(Col)`
    @media(max-width:575px)
    {
        margin-top:30px;
    }
`
const Select_Col3 = styled(Col)`
    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
const Select_Col4 = styled(Col)`
    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
export const Button_wrap = styled.div`
    margin-top:230px;
`
export const Sub_wrap = styled.div`

`
export const Back_Button = styled(Button)`
    font-size: 13.217px;
    font-family: "Open Sans";
    height:50px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 2.875;
  


    width:120px;
    border-radius: 24px;
    color:#2d69eb;
    background-color: rgb( 255, 255, 255 );
    box-shadow: 0px 3px 10px 0px rgb( 164, 164, 164 );  
    margin-right:10px;
`
export const Next_Button = styled(Button)`
    margin-left:10px;
    border-radius: 24px;
    background-color:#4c84ff;
    height:50px;
    width:120px;
`


export default class IDselect extends React.Component
{
    next_step()
    {
        this.props.next_step(2)
    }
    render()
    {
        return(
            <KYC_type_select_row>
                    <Row>
                        <Select_text md={{span:24}}>
                            Select ID type
                        </Select_text>
                        <Select_Col1 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input type="radio" name="kyc_type"/>
                            <span className="background">
                            <img src="/images/passport-logo-active.png" className="active"/>
                            <img src="/images/passport-logo.png" className="normal"/>
                            <span className="text">Passport</span>
                            </span>
                        </label>
                        </Select_Col1>
                        <Select_Col2 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input type="radio" name="kyc_type"/>
                            <span className="background license">
                            <img src="/images/driving-license-active.png" className="active"/>
                            <img src="/images/driving-license.png" className="normal"/>
                            <span className="text">Driving license</span>
                            </span>
                        </label>
                        </Select_Col2>
                        <Select_Col3 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input type="radio" name="kyc_type"/>
                            <span className="background identity">
                            <img src="/images/identity-active.png" className="active"/>
                            <img src="/images/identity.png" className="normal"/>
                            <span className="text">Identity</span>
                            </span>
                        </label>
                        </Select_Col3>
                        <Select_Col4 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input type="radio" name="kyc_type"/>
                            <span className="background ssn">
                            <img src="/images/ssn-active.png" className="active"/>
                            <img src="/images/ssn.png" className="normal"/>
                            <span className="text">SSN</span>
                            </span>
                        </label>
                        </Select_Col4>
                    </Row>
                    <Button_wrap>
                        <Sub_wrap>
                            <Back_Button type="primary">Back</Back_Button>
                            <Next_Button onClick = {this.next_step.bind(this)} type="primary">Next</Next_Button>
                        </Sub_wrap>
                    </Button_wrap>
                </KYC_type_select_row>
        );
    }
}