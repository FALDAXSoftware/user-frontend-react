/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Input,notification,Steps } from 'antd';
import styled from 'styled-components';
import { createForm, formShape } from 'rc-form';


/*  */
import Datepicker from "../Personaldetails/Datepicker"
import CountryPick from "../Personaldetails/Country"
import {Save,Fifth_Row,Postal,City,Fourth_Row,Street_input,Street_Address,Third_Row,Date_birth,Country_input,Country,Second_Row,Last_input,Last_name,First_Msg,First_input,First_name,First_Row,Right_Col} from '../Personaldetails/PersonalDetails'
const Step = Steps.Step;

/* Styled-Components */
const KYC_wrap = styled.div`
    margin-bottom: 140px;
`
const KYC_head = styled.div`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    margin-top:20px;
`
const KYC_progress = styled.div`
    width:26%;
    text-align:left;
    margin-top:50px;
    margin-left:auto;
    margin-right:auto;
`
const KYC_form = styled.div`
    width:50%;
    margin-left:auto;
    margin-right:auto;
    margin-top:55px;
`


const KYC_type_select_row = styled.div`
  width:50%;
  margin 55px auto;
`
const Save_kyc = styled(Save)`
margin-left:0px;
`
const Fifth_Row_kyc = styled(Fifth_Row)`
    text-align:center
`
const Postal_kyc = styled(Postal)`
`
const City_kyc = styled(City)`
`
const Fourth_Row_kyc = styled(Fourth_Row)`

`
const Street_input_kyc = styled(Street_input)`
`
const Street_Address_kyc = styled(Street_Address)`
`
const Third_Row_kyc = styled(Third_Row)`
`
const Date_birth_kyc = styled(Date_birth)`
`
const Country_input_kyc = styled(Country_input)``
const Country_kyc = styled(Country)``
const Second_Row_kyc = styled(Second_Row)``
const Last_input_kyc = styled(Last_input)``
const Last_name_kyc = styled(Last_name)``
const First_Msg_kyc = styled(First_Msg)`
`
const Last_Msg_kyc =styled(First_Msg)``
const Country_Msg_kyc =styled(First_Msg)``
const Dob_Msg_kyc =styled(First_Msg)``
const Street_Msg_kyc =styled(First_Msg)``
const City_Msg_kyc =styled(First_Msg)``
const Postal_Msg_kyc =styled(First_Msg)``
const First_input_kyc = styled(First_input)``
const First_name_kyc = styled(First_name)``
const First_Row_kyc = styled(First_Row)``
const Right_Col_kyc = styled(Right_Col)`
`


class KYC extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ON_OFF:"OFF",
            Key:null,
            typeEye:"password",
            newEye:"password",
            repeatEye:"password",
            currentpassIcon:false,
            newpassIcon:false,
            confirmIcon:false,
            otpIcon:false,
            is_twofactor:"ENABLE",
            QR_img:null,
            otp_msg:null,

        }
    }

    static propTypes = {
        form: formShape,
    };

    onDateChange(Datedata)
    {
      this.setState({Datedata})
    }
    onCountryChange(country)
    {
        this.setState({countrySelected:country})
    }

    submit = () => {
        this.props.form.validateFields((error, value) => {
           console.log("-----<<<...",error,value)
            console.log(this.state,this.props)
             /* if(error==null && this.state.currentpassIcon==true && this.state.newpassIcon==true && this.state.confirmIcon==true)
            {
                console.log("HELLO !@#")
                document.querySelectorAll(".oldchange_msg")[0].style.display = "none";
                document.querySelectorAll(".newchange_msg")[0].style.display = "none";
                document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
                this.props.passwordChange(this.props.isLoggedIn,value);
            } */
        });
    }

    render()
    {

        const { getFieldProps, getFieldError } = this.props.form;
        return(
            <KYC_wrap>
                <KYC_head>
                    Identity Verification
                </KYC_head>
                <KYC_progress>
                    <Steps size="small" current={0}>
                        <Step />
                        <Step />
                        <Step />
                        <Step />
                    </Steps>
                </KYC_progress>
                <KYC_form>
                    <Right_Col_kyc>
                        <First_Row_kyc>
                            <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                <First_name_kyc>First Name</First_name_kyc>
                                   {/*      {console.log(this.props.profileDetails.first_name)} */}
                                <First_input_kyc placeholder="First Name" {...getFieldProps('first_name', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.first_name, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                })}/>
                                <First_Msg_kyc className="first_msg">{this.state.firstmsg}</First_Msg_kyc>
                            </Col>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Last_name_kyc>Last Name</Last_name_kyc>
                                        <Last_input_kyc placeholder="Last Name" {...getFieldProps('last_name', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.last_name,// have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <Last_Msg_kyc className="last_msg">{this.state.lastmsg}</Last_Msg_kyc>
                                    </Col>
                                </First_Row_kyc>
                                <Second_Row_kyc>
                                    <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Country_kyc>Country</Country_kyc>
                                        {console.log(this.props)}
                                        <CountryPick {...this.props} isLoggedIn={this.props.simpleReducer.isLoggedIn} onCountryChange={ (value) => this.onCountryChange(value) }/>
                                        <Country_Msg_kyc className="country_msg">{this.state.countrymsg}</Country_Msg_kyc>
                                    </Col>
                                    <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Date_birth_kyc>Date of Birth</Date_birth_kyc>
                                        <Datepicker {...this.props} onDateChange={(Data) => this.onDateChange(Data)}/>
                                        <Dob_Msg_kyc className="dob_msg">{this.state.dobmsg}</Dob_Msg_kyc>
                                    </Col>
                                </Second_Row_kyc>
                                <Third_Row_kyc>
                                    <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                        <Street_Address_kyc>Street Address</Street_Address_kyc>
                                        <Street_input_kyc placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} {...getFieldProps('street_address', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.street_address, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <Street_Msg_kyc className="street_msg">{this.state.streetmsg}</Street_Msg_kyc>
                                    </Col>
                                </Third_Row_kyc>
                                <Fourth_Row_kyc>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <City_kyc>City/Town</City_kyc>
                                        <First_input_kyc placeholder="City"{...getFieldProps('city_town', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.city_town, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <City_Msg_kyc className="city_msg">{this.state.citymsg}</City_Msg_kyc>
                                    </Col>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xl={{span:12}}>
                                        <Postal_kyc>Postal Code</Postal_kyc>
                                        <Last_input_kyc placeholder="Postal Code"{...getFieldProps('postal_code', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.postal_code,// have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <Postal_Msg_kyc className="postal_msg">{this.state.postalmsg}</Postal_Msg_kyc>
                                    </Col>
                                </Fourth_Row_kyc>
                                <Fifth_Row_kyc>
                                    <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                        <Save_kyc type="primary"  onClick={this.submit}>Next</Save_kyc>
                                    </Col>
                                </Fifth_Row_kyc>
                    </Right_Col_kyc>
                </KYC_form>
                <KYC_type_select_row>
                  <Col md={{span:24}}>
                    Select ID type
                  </Col>
                  <Col md={{span:6}}>
                  <label className="kyc-radio-container">
                    <input type="radio" name="kyc_type"/>
                    <span className="background">
                      <img src="/images/passport-logo-active.png" className="active"/>
                      <img src="/images/passport-logo.png" className="normal"/>
                      <span className="text">Passport</span>
                    </span>
                  </label>
                  </Col>
                  <Col md={{span:6}}>
                  <label className="kyc-radio-container">
                    <input type="radio" name="kyc_type"/>
                    <span className="background license">
                      <img src="/images/driving-license-active.png" className="active"/>
                      <img src="/images/driving-license.png" className="normal"/>
                      <span className="text">Driving license</span>
                    </span>
                  </label>
                  </Col>
                  <Col md={{span:6}}>
                  <label className="kyc-radio-container">
                    <input type="radio" name="kyc_type"/>
                    <span className="background identity">
                      <img src="/images/identity-active.png" className="active"/>
                      <img src="/images/identity.png" className="normal"/>
                      <span className="text">Identity</span>
                    </span>
                  </label>
                  </Col>
                  <Col md={{span:6}}>
                  <label className="kyc-radio-container">
                    <input type="radio" name="kyc_type"/>
                    <span className="background ssn">
                      <img src="/images/ssn-active.png" className="active"/>
                      <img src="/images/ssn.png" className="normal"/>
                      <span className="text">SSN</span>
                    </span>
                  </label>
                  </Col>
                </KYC_type_select_row>

            </KYC_wrap>
        );
    }
}

const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
      ...state,
        email:state.simpleReducer.profileDetails!==undefined?state.simpleReducer.profileDetails.data[0].email:"",
        profileDetails:state.simpleReducer.profileDetails!==undefined?state.simpleReducer.profileDetails.data[0]:""
    }
  }
const mapDispatchToProps = dispatch => ({
})

export default  connect(mapStateToProps,mapDispatchToProps)(createForm()(KYC));
