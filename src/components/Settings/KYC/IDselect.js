import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Input,notification,Steps } from 'antd';
import styled from 'styled-components';

import {kycFormAction,kycformData} from "../../../Actions/Settings/passwordChange"

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
    font-size: 13.217px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: "Open Sans";
    border-radius: 24px;
    background-color:#4c84ff;
    height:50px;
    width:120px;
`


class IDselect extends React.Component
{
    next_step()
    {
        var abcd = {};
        if(document.getElementById('passport').checked)
        {
            abcd["id_type"]= 1;
            abcd["steps"]=2;
            this.props.kycFormAction(this.props.isLoggedIn,abcd);
            this.props.next_step(3,"ssn")
         
        }
        else if(document.getElementById('license').checked)
        {
            abcd["id_type"]= 2;
            abcd["steps"]=2;
            this.props.kycFormAction(this.props.isLoggedIn,abcd);
            this.props.next_step(3,"ssn")
          
        }
        else if(document.getElementById('identity').checked)
        {
            abcd["id_type"]= 3;
            abcd["steps"]=2;
            this.props.kycFormAction(this.props.isLoggedIn,abcd);
            this.props.next_step(3,"ssn")
            
        }
        else if(document.getElementById('ssn').checked)
        {
            abcd["id_type"]= 4;
            abcd["steps"]=2;
            this.props.kycFormAction(this.props.isLoggedIn,abcd);
            this.props.next_step(2,"ssn_ori")
         
        }
        else
        {
            this.openNotificationWithIcon("error","KYC","Please select any one option.")
        }
        
    }
    back_step()
    {
        this.props.next_step(0)
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
          message: head,
          description: desc,
        });
      };
    render()
    {
        return(
            <div>
            <KYC_type_select_row>
                    <Row>
                        <Select_text md={{span:24}}>
                            Select ID type
                        </Select_text>
                        <Select_Col1 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input id="passport" type="radio" name="kyc_type"/>
                            <span className="background">
                            <img src="/images/passport-logo-active.png" className="active"/>
                            <img src="/images/passport-logo.png" className="normal"/>
                            <span className="text">Passport</span>
                            </span>
                        </label>
                        </Select_Col1>
                        <Select_Col2 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input id="license" type="radio" name="kyc_type"/>
                            <span className="background license">
                            <img src="/images/driving-license-active.png" className="active"/>
                            <img src="/images/driving-license.png" className="normal"/>
                            <span className="text">Driving license</span>
                            </span>
                        </label>
                        </Select_Col2>
                        <Select_Col3 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input id="identity" type="radio" name="kyc_type"/>
                            <span className="background identity">
                            <img src="/images/identity-active.png" className="active"/>
                            <img src="/images/identity.png" className="normal"/>
                            <span className="text">Identity</span>
                            </span>
                        </label>
                        </Select_Col3>
                        <Select_Col4 sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:6}}>
                        <label className="kyc-radio-container">
                            <input id="ssn" type="radio" name="kyc_type"/>
                            <span className="background ssn">
                            <img src="/images/ssn-active.png" className="active"/>
                            <img src="/images/ssn.png" className="normal"/>
                            <span className="text">SSN</span>
                            </span>
                        </label>
                        </Select_Col4>
                    </Row>
                    
                </KYC_type_select_row>
                <Button_wrap>
                    <Sub_wrap>
                        <Back_Button onClick={this.back_step.bind(this)} type="primary">Back</Back_Button>
                        <Next_Button onClick = {this.next_step.bind(this)} type="primary">Next</Next_Button>
                    </Sub_wrap>
                </Button_wrap>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
      ...state,
        isLoggedIn : state.simpleReducer.isLoggedIn !==undefined?state.simpleReducer.isLoggedIn:"",
    }
  }
const mapDispatchToProps = dispatch => ({
    kycFormAction:(is,data)=>dispatch(kycFormAction(is,data)),
    kycformData:(data)=>dispatch(kycformData(data))
})

export default  connect(mapStateToProps,mapDispatchToProps)(IDselect);