/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Input } from 'antd';
import styled from 'styled-components';

import {HeaderCol,Save} from "../Personaldetails/PersonalDetails"

const Wrapper = styled.div``
const ChangeRow = styled(Row)`
    &:after 
    {
        content:"";
        left: 8%;
        position: absolute;
        width: 84%;
        bottom: 0px;
        border-bottom: 1px solid #d6d6d6;
    }
`
const ChangeCol = styled.div`
    height:370px;
`
const Old = styled.div`
    width:41%
    margin:auto;
    text-align:left
    margin-top:35px;
`
const NewP = styled(Old)`
    margin-top:30px;
`
const Repeat = styled(Old)`
    margin-top:30px;
`
const OldInput = styled(Input)`
    margin-top:5px;
    height: 40px;
    background-color:#f8f8f8;
`
const NewInput = styled(OldInput)`

`
const RepeatInput = styled(OldInput)`

`
const Button_div = styled.div`
    margin-top:30px;
    margin-bottom:50px;
`
const NewButton = styled(Save)`
    border:none;
    &:hover
    {
        background-color: rgb( 76, 132, 255 );
        color:black;
    }
`
const TwofactorRow = styled(Row)`
    margin-top:40px;
`
const TFCol = styled(Col)`
    
`
const Head_TF = styled.p`
    font-size: 20.01px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const ON_OFF = styled.p`
    font-size: 15.008px;
    font-family: "Open Sans";
    margin-bottom:0px !important;
    color: rgb( 80, 80, 80 );
    margin-top:20px;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const  Head_text = styled.p`

`
const BarRow = styled(Row)`
    width:81%;
    margin:auto;
    min-height:415px;
    background-color:#f8f8f8;
    margin-top:45px;
    border:1px solid #d6d6d6;
    border-radius:10px;
`
const Left_Col = styled(Col)`
    &:after 
    {
        content:"";
        top: 8%;
        position: absolute;
        height: 84%;
        right: 0px;
        border-right: 1px solid #d6d6d6;
    }
`
const Image_Wrap = styled.div`
    margin-top:50px;
`
const Bar_code = styled.img`
    width:190px;
    height:190px;
    border-width:10px solid #ffffff;
`
const Key_wrap = styled.div`
    margin-top:20px;
    margin-bottom: 110px;
`
const Key_text = styled.span`
    font-size: 13.007px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    line-height: 1.846;
    text-align: center;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);

`
const Key = styled.p`
    font-size: 13.007px;
    font-family: "Open Sans";
    color: #4c84ff;
    line-height: 1.846;
    text-align: center;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const Right_Col = styled(Col)`

`
const Order_list = styled.ol`
    margin-top:50px;
    text-align:left;
`
const LI = styled.li`

`
const TF_code = styled.div`
    text-align:left;
    margin-top:10px;
    margin-left:40px;
`
const TF_label = styled.label`

`
const TF_input = styled(Input)`
    width:148px;
    display:block;
    margin-top:10px;
`
const Enable = styled.div`
    text-align:left;
    text-align: left;
    margin-left: 40px;
    margin-top: 30px;
`
const E_button = styled(Save)`
    border:none;
    &:hover
    {
        background-color: rgb( 76, 132, 255 );
        color:black;
    }
`
class Passwordchange extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ON_OFF:"OFF",
            Key:"MRXIDKFHJAS"
        }
    }
    render()
    {
        return(
            <Wrapper>
                <Row>
                    <Col span={6} />
                    <HeaderCol span={12}> 
                        <span>Change Password</span>
                    </HeaderCol>
                </Row>
                <ChangeRow>
                    <ChangeCol>
                        <Old>
                            <label>Old Password</label>
                            <OldInput type="password"/>
                        </Old>
                        <NewP>
                            <label>New Password</label>
                            <NewInput type="password"/>
                        </NewP>
                        <Repeat>
                            <label>Repeat New Password</label>
                            <RepeatInput type="password"/>
                        </Repeat>
                        <Button_div>
                            <NewButton>Save New Password</NewButton>
                        </Button_div>
                    </ChangeCol>
                </ChangeRow>
                <TwofactorRow>
                    <TFCol>
                        <Head_TF>Two-Factor Authentication</Head_TF>
                        <ON_OFF>your two-factor Authenticator is:{this.state.ON_OFF}</ON_OFF>
                        <Head_text>For more security,Enable an authenticator app. </Head_text>
                        <Button_div>
                            <NewButton>ENABLE AUTHENTICATOR</NewButton>
                        </Button_div>
                    </TFCol>
                </TwofactorRow>
                <BarRow>
                    <Left_Col span={12}>
                        <Image_Wrap>
                            <Bar_code/>
                        </Image_Wrap>
                        <Key_wrap>
                            <Key_text>16 Digit Key</Key_text>
                            <Key>{this.state.Key}</Key>
                        </Key_wrap>
                    </Left_Col>
                    <Right_Col span={12}>
                        <Order_list>
                            <LI>Install an authenticator app on your mobile device. We suggest Google Authenticator. </LI>
                            <LI>Scan the QR code with the authenticator.</LI>
                            <LI>In case your phone gets stolen or erased, you will need this code to link Faldax with a new app.</LI>
                            <LI>Do not share the code with anyone. Faldax will never ask you for this code.</LI>
                        </Order_list>
                        <TF_code>
                            <TF_label>Enter your two-factor code here:</TF_label>
                            <TF_input></TF_input>
                        </TF_code>
                        <Enable>
                            <E_button>
                                ENABLE
                            </E_button>
                        </Enable>
                    </Right_Col>
                </BarRow>
            </Wrapper>
        );
    }
}

export default Passwordchange;