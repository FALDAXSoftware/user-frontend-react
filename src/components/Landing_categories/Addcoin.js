import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin,notification } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import SimpleReactValidator from 'simple-react-validator';
import "react-datepicker/dist/react-datepicker.css";

import Navigation from '../Navigations/Navigation';
import {Spin_Ex} from '../../styled-components/homepage/style'
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import {Contact_wrap,Grey_wrap,Head,Head_title,Subtitle,Head_desc,Body,BodyText,Body_form,Form_coin,CoinInput,URLInput,TargetInput,EmailInput,MsgInput,LeftP,RightInput,Left,OneDiv,TwoDiv,ThreeDiv,FourDiv,FiveDiv,AddButton,Msg,Right_input} from '../../styled-components/landingCategories/contactStyle';    
import {globalVariables} from "../../Globals"
let { API_URL } = globalVariables;
export const ContainerContact = styled(Container)`
    background-color:white; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom:70px;
    @media(max-width:480px)
    {
        padding-right:0px;
        padding-left:0px;
    }
`



class MediaContact extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fields:{
                email:'',
                message:'',
                target_date:'',
                url:'',
                coin_name:'',
                loader:false

            },
            startDate: null
        };
        this._onChangeFields = this._onChangeFields.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator({
            validEmail: { // name the rule
                message: 'Please enter valid email address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    console.log(val,options)
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            }
        });
    }
    // handleForm(type,e)
    // {
    //     if(type=="email")
    //     {
    //         this.setState({email:e.target.value})
    //     }
    // }
    _onChangeFields(e) {
        let fields = this.state.fields;
        let field = e.target.name; 
       
        if (e.target.value.trim() == "") {
            fields[field] = "";
        } else {
            fields[field] = e.target.value;
        }
        this.setState({ fields });
    }
    dateChange(date)
    {
        let fields = this.state.fields;
        if(date != null){
            fields["target_date"] = date.format("DD/MM/YYYY");
        }else{
            fields["target_date"] = date
        }
        this.setState({ fields,startDate:date });
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
          message: head,
          description: desc,
        });
      };
    onSubmit(){
        if( this.validator.allValid() ){
            this.setState({loader:true})
            fetch(API_URL + "/users/add-coin-request", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.fields)
            })
                .then(response => response.json())
                .then((responseData) => {
                    this.openNotificationWithIcon('success', 'Success', responseData.message);
                    let fields={};
                    fields["target_date"]='';
                    fields['url']="";
                    fields['coin_name']="";
                    fields['email']="";
                    fields['message']="";
                                        
                    this.setState({ fields:fields , startDate:null,loader:false},()=>{
                        this.validator.hideMessages();
                        this.forceUpdate();
                        
                    })
                })
                .catch(error => {
                   /* console.log(error) */
                })
          } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
          }
    }
    componentDidMount(){
        document.getElementsByClassName("date-input")[0].setAttribute("readOnly", "readOnly")
    }
    render()
    {

        return(
            <Contact_wrap>
                <Navigation />
                    <Grey_wrap>
                        <ContainerContact>
                            <Head>
                                <Head_title>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Head_title>
                                <Subtitle>Here are the requirements to list your coin:</Subtitle>
                                <Head_desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Head_desc>
                            </Head>
                            <Body>
                                <BodyText>Please fill out this form or email at relations@faldax.com to apply:</BodyText>
                                <Body_form>
                                    <Form_coin>
                                        <OneDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Coin/Token Name*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <CoinInput name="coin_name" onChange={this._onChangeFields} value={this.state.fields.coin_name}/>
                                                    {/* console.log("--->>",this.state.coin_name) */}
                                                    {this.validator.message('coin_name', this.state.fields.coin_name, 'required|alpha_num|max:30', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                        </OneDiv>
                                        <TwoDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Website URL*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <URLInput name="url" onChange={this._onChangeFields} value={this.state.fields.url}/>
                                                    {/* console.log("--->>",this.state.url) */}
                                                    {this.validator.message('url', this.state.fields.url, 'required|url', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                        </TwoDiv>
                                        <ThreeDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Target Date of Integration*</p>
                                                </Left>    
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input className="datePicker">
                                                <TargetInput
                                                    name="target_date"
                                                    dateFormat="DD/MM/YYYY" 
                                                    minDate={new Date()}
                                                    selected={this.state.startDate}
                                                    onChange={this.dateChange}
                                                    className="date-input"
                                                />
                                                    {this.validator.message('target_date', this.state.fields.target_date, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                        </ThreeDiv>
                                        <FourDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Email*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <EmailInput name="email" onChange={this._onChangeFields} value={this.state.fields.email}/>
                                                    {/* console.log("--->>",this.state.email) */}
                                                    {this.validator.message('email', this.state.fields.email, 'required|validEmail', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                        </FourDiv>
                                        <FiveDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Msg>
                                                    <p>Message*</p>
                                                </Msg>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <MsgInput name="message" onChange={this._onChangeFields} value={this.state.fields.message}/>
                                                    {/* console.log("Message",this.state.fields) */}
                                                    {this.validator.message('message', this.state.fields.message, 'required', 'text-danger-validation')}
                                                <AddButton onClick={this.onSubmit}>SUBMIT</AddButton>
                                                </Right_input>
                                            </Col>
                                        </Row>
                                        </FiveDiv>
                                    </Form_coin>
                                </Body_form>
                            </Body>
                        </ContainerContact>
                    </Grey_wrap>
                <CommonFooter/>
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Contact_wrap>
        );
    }
}

export default MediaContact;