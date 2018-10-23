import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Input,notification,Steps ,Spin} from 'antd';
import styled from 'styled-components';
import { createForm, formShape } from 'rc-form';


import {Spin_Ex,Save,Fifth_Row,Postal,City,Fourth_Row,Street_input,Street_Address,Third_Row,Date_birth,Country_input,Country,Second_Row,Last_input,Last_name,First_Msg,First_input,First_name,First_Row,Right_Col} from '../Personaldetails/PersonalDetails'

import Datepicker from "../Personaldetails/Datepicker"
import CountryPick from "../Personaldetails/Country"
import {kycFormAction,kycformData} from "../../../Actions/Settings/passwordChange"

const KYC_form = styled.div`
    width:50%;
    margin-left:auto;
    margin-right:auto;
    margin-top:55px;
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


class KYCForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            Datedata:undefined,
            firstmsg:null,
            lastmsg:null,
            countrymsg:null,
            dobmsg:null,
            streetmsg:null,
            street2msg:null,
            citymsg:null,
            postalmsg:null,
            countrySelected:this.props.profileDetails.country,
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
           /* console.log("-----<<<...",error,value) */
           let dataDate = "";
            const profileData = {};
           /*  console.log(this.state,this.props) */
         
             if(error==null && (this.state.Datedata!==undefined || this.props.profileDetails.dob!==undefined) && (this.state.countrySelected!==undefined || this.props.profileDetails.country!==undefined))
            {
                document.querySelectorAll(".first_kyc_msg")[0].style.display = "none";
                document.querySelectorAll(".last_kyc_msg")[0].style.display = "none";
                document.querySelectorAll(".country_kyc_msg")[0].style.display = "none";
                document.querySelectorAll(".dob_kyc_msg")[0].style.display = "none";
                document.querySelectorAll(".street_kyc_msg")[0].style.display = "none";
                document.querySelectorAll(".street2_kyc_msg")[0].style.display = "none";
                document.querySelectorAll(".city_kyc_msg")[0].style.display = "none";
                document.querySelectorAll(".postal_kyc_msg")[0].style.display = "none";
                this.setState({first_msg:null,last_msg:null,country_msg:null,dob_msg:null,street_msg:null,street2_msg:null,city_msg:null,postal_msg:null,spin_show:true});
                
                let number = Number(value.postal_code);
                let country = this.state.countrySelected;
                if(this.state.Datedata!==undefined && this.state.Datedata!==null)
                {  
                    dataDate = this.state.Datedata.year + "/" + this.state.Datedata.month + "/" + this.state.Datedata.day
                }
                else
                {    
                    dataDate = this.props.profileDetails.dob 
                }
                if(country==undefined && country==null)
                {
                    country=this.props.country
                }
                /* console.log("BEFORE FORM",value,this.state.countrySelected,this.state.profileImage,dataDate) */
                profileData['first_name']=value.first_name
                profileData['last_name']=value.last_name
                profileData['country']=country
                profileData['address']=value.street_address
                profileData['address_2']=value.street_address_2
                profileData['city']=value.city_town
                profileData['zip']=number
                profileData['dob']=dataDate
                profileData['steps']=1
                /* 
                console.log(value,country,number,dataDate) */

                this.props.kycFormAction(this.props.isLoggedIn,profileData);
            }
            else
            {
                if(error.first_name!==null && error.first_name!==undefined)
                {
                    if(error.first_name.errors[0].message!==undefined && error.first_name.errors[0].message!==null)
                    {
                        document.querySelectorAll(".first_kyc_msg")[0].style.display = "block";
                        this.setState({firstmsg:"*First name is incorrect"})
                    }
                    else
                    {
                        document.querySelectorAll(".first_kyc_msg")[0].style.display = "none";
                        this.setState({firstmsg:null})
                    }
                }
                if(error.last_name!==null && error.last_name!==undefined)
                {
                    if(error.last_name.errors[0].message!==undefined && error.last_name.errors[0].message!==null)
                    {
                        document.querySelectorAll(".last_kyc_msg")[0].style.display = "block";
                        this.setState({lastmsg:"*Last name is incorrect"})
                    }
                    else
                    {
                        document.querySelectorAll(".last_kyc_msg")[0].style.display = "none";
                        this.setState({lastmsg:null})
                    }
                }
                if(error.country!==null && error.country!==undefined)
                {
                    if(error.country.errors[0].message!==undefined && error.country.errors[0].message!==null)
                    {
                        document.querySelectorAll(".country_kyc_msg")[0].style.display = "block";
                        this.setState({countrymsg:"*Phone Number is Incorrecct"})
                    }
                    else
                    {
                        
                        document.querySelectorAll(".country_kyc_msg")[0].style.display = "none";
                        this.setState({countrymsg:null})
                    }
                }
                if(error.street_address!==null && error.street_address!==undefined)
                {
                    if(error.street_address.errors[0].message!==undefined && error.street_address.errors[0].message!==null)
                    {
                        document.querySelectorAll(".street_kyc_msg")[0].style.display = "block";
                        this.setState({streetmsg:"*Street Address is Incorrecct"})
                    }
                    else
                    {
                        document.querySelectorAll(".street_kyc_msg")[0].style.display = "none";
                        this.setState({streetmsg:null})
                    }
                }
                if(error.street_address_2!==null && error.street_address_2!==undefined)
                {
                    if(error.street_address_2.errors[0].message!==undefined && error.street_address_2.errors[0].message!==null)
                    {
                        document.querySelectorAll(".street2_kyc_msg")[0].style.display = "block";
                        this.setState({street2msg:"*Street Address is Incorrecct"})
                    }
                    else
                    {
                        document.querySelectorAll(".street2_kyc_msg")[0].style.display = "none";
                        this.setState({street2msg:null})
                    }
                }
                if(error.city_town!==null && error.city_town!==undefined)
                {
                    if(error.city_town.errors[0].message!==undefined && error.city_town.errors[0].message!==null)
                    {
                        document.querySelectorAll(".city_kyc_msg")[0].style.display = "block";
                        this.setState({citymsg:"*City is Incorrecct"})
                    }
                    else
                    {
                        document.querySelectorAll(".city_kyc_msg")[0].style.display = "none";
                        this.setState({citymsg:null})
                    }
                }
                if(error.postal_code!==null && error.postal_code!==undefined)
                {
                    if(error.postal_code.errors[0].message!==undefined && error.postal_code.errors[0].message!==null)
                    {
                        document.querySelectorAll(".postal_kyc_msg")[0].style.display = "block";
                        this.setState({postalmsg:"*Postal is Incorrecct"})
                    }
                    else
                    {
                        document.querySelectorAll(".postal_kyc_msg")[0].style.display = "none";
                        this.setState({postalmsg:null})
                    }
                }
                if(this.state.Datedata==undefined && this.props.profileDetails.dob==undefined )
                {
                    document.querySelectorAll(".dob_kyc_msg")[0].style.display = "block";
                    this.setState({dobmsg:"*Date of Birth is Incorrecct"})
                }
                else
                {
                    document.querySelectorAll(".dob_kyc_msg")[0].style.display = "none";
                    this.setState({dobmsg:null})
                }
            }
        });
    }
    onDateChange(Datedata)
      { 
        this.setState({Datedata})
      }
      onCountryChange(country)
      {
          this.setState({countrySelected:country})
      }
      openNotificationWithIcon(type, head, desc) {
        notification[type]({
          message: head,
          description: desc,
        });
      };
      componentWillReceiveProps(props,newProps)
      {
          if(props.kycData!==undefined && props.kycData!=="")
          { 
            if(props.kycData.status==200)
            {
              /*   console.log("KYC obcvwevuyh") */
                
                //this.openNotificationWithIcon("success","KYC",props.kycData.message)
                this.props.kycformData();
                this.props.next_step(1);
            }
            else
            {
                this.openNotificationWithIcon("error","KYC",props.kycData.err)
                this.props.kycformData();
            }
            
          }
      }
    render()
    {
        const { getFieldProps, getFieldError } = this.props.form;
        return(
            <KYC_form>
                            <Right_Col_kyc>
                                <First_Row_kyc>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <First_name_kyc>First Name</First_name_kyc>
                                        {/*      {console.log(this.props.profileDetails.first_name)} */}
                                        <First_input_kyc placeholder="First Name" {...getFieldProps('first_name', {
                                                    onChange(){/* console.log("Hello How are You") */},
                                                    initialValue:this.props.profileDetails.first_name, // have to write original onChange here if you need
                                                    rules: [{required: true,whitespace:true}],
                                        })}/>
                                        <First_Msg_kyc className="first_kyc_msg">{this.state.firstmsg}</First_Msg_kyc>
                                    </Col>
                                            <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                                <Last_name_kyc>Last Name</Last_name_kyc>
                                                <Last_input_kyc placeholder="Last Name" {...getFieldProps('last_name', {
                                                    onChange(){/* console.log("Hello How are You") */},
                                                    initialValue:this.props.profileDetails.last_name,// have to write original onChange here if you need
                                                    rules: [{required: true,whitespace:true}],
                                                })}/>
                                                <Last_Msg_kyc className="last_kyc_msg">{this.state.lastmsg}</Last_Msg_kyc>
                                            </Col>
                                        </First_Row_kyc>
                                        <Second_Row_kyc>
                                            <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                                <Country_kyc>Country</Country_kyc>
                                                {/* console.log(this.props) */}
                                                <CountryPick {...this.props} isLoggedIn={this.props.simpleReducer.isLoggedIn} onCountryChange={ (value) => this.onCountryChange(value) }/>
                                                <Country_Msg_kyc className="country_kyc_msg">{this.state.countrymsg}</Country_Msg_kyc>
                                            </Col>
                                            <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                                <Date_birth_kyc>Date of Birth</Date_birth_kyc>
                                                <Datepicker {...this.props} onDateChange={(Data) => this.onDateChange(Data)}/>
                                                <Dob_Msg_kyc className="dob_kyc_msg">{this.state.dobmsg}</Dob_Msg_kyc>
                                            </Col>
                                        </Second_Row_kyc>
                                        <Third_Row_kyc>
                                            <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                                <Street_Address_kyc>Street Address</Street_Address_kyc>
                                                <Street_input_kyc placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} {...getFieldProps('street_address', {
                                                    onChange(){/* console.log("Hello How are You") */},
                                                    initialValue:this.props.profileDetails.street_address, // have to write original onChange here if you need
                                                    rules: [{required: true,whitespace:true}],
                                                })}/>
                                                <Street_Msg_kyc className="street_kyc_msg">{this.state.streetmsg}</Street_Msg_kyc>
                                            </Col>
                                            <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                                <Street_Address_kyc>Street Address</Street_Address_kyc>
                                                <Street_input_kyc placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} {...getFieldProps('street_address_2', {
                                                    onChange(){/* console.log("Hello How are You") */},
                                                    initialValue:this.props.profileDetails.street_address_2, // have to write original onChange here if you need
                                                    rules: [{required: true,whitespace:true}],
                                                })}/>
                                                <Street_Msg_kyc className="street2_kyc_msg">{this.state.street2msg}</Street_Msg_kyc>
                                            </Col>
                                        </Third_Row_kyc>
                                        <Fourth_Row_kyc>
                                            <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                                <City_kyc>City/Town</City_kyc>
                                                <First_input_kyc placeholder="City"{...getFieldProps('city_town', {
                                                    onChange(){/* console.log("Hello How are You") */},
                                                    initialValue:this.props.profileDetails.city_town, // have to write original onChange here if you need
                                                    rules: [{required: true,whitespace:true}],
                                                })}/>
                                                <City_Msg_kyc className="city_kyc_msg">{this.state.citymsg}</City_Msg_kyc>
                                            </Col>
                                            <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xl={{span:12}}>
                                                <Postal_kyc>Postal Code</Postal_kyc>
                                                <Last_input_kyc placeholder="Postal Code"{...getFieldProps('postal_code', {
                                                    onChange(){/* console.log("Hello How are You") */},
                                                    initialValue:this.props.profileDetails.postal_code,// have to write original onChange here if you need
                                                    rules: [{required: true,whitespace:true}],
                                                })}/>
                                                <Postal_Msg_kyc className="postal_kyc_msg">{this.state.postalmsg}</Postal_Msg_kyc>
                                            </Col>
                                        </Fourth_Row_kyc>
                                        <Fifth_Row_kyc>
                                            <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                                <Save_kyc type="primary"  onClick={this.submit}>Next</Save_kyc>
                                            </Col>
                                        </Fifth_Row_kyc>
                            </Right_Col_kyc>
                            {(this.props.loader==true)?
                                <Spin_Ex className="Ex_spin">
                                    <Spin size="large"/>
                                </Spin_Ex>
                            :""
                            }
                        </KYC_form>
        );
    }
}


const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
      ...state,
        email:state.simpleReducer.profileDetails!==undefined?state.simpleReducer.profileDetails.data[0].email:"",
        profileDetails:state.simpleReducer.profileDetails!==undefined?state.simpleReducer.profileDetails.data[0]:"",
        isLoggedIn : state.simpleReducer.isLoggedIn !==undefined?state.simpleReducer.isLoggedIn:"",
        kycData: state.passwordReducer.kycData !== undefined ? state.passwordReducer.kycData : "",
        loader:state.simpleReducer.loader
    }
  }
const mapDispatchToProps = dispatch => ({
    kycFormAction:(is,data)=>dispatch(kycFormAction(is,data)),
    kycformData:(data)=>dispatch(kycformData(data))
})

export default  connect(mapStateToProps,mapDispatchToProps)(createForm()(KYCForm));