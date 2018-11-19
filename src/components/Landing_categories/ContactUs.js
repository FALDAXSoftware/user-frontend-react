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
import Contact_Map from "./Contact_Map"
import {Headcontact,Head_span,Contact_wrap,Grey_wrap,Row_wrap,Left_col,Sub_head,First_div,Second_div,Third_div,Fourth_div,First_label,First_input,Second_label,Second_input,Third_label,Third_input,Fourth_label,Fourth_area,Fifth_div,Fifth_button,Map_wrap,Subfoot_wrap,Main_wrap1,Main_wrap2,Main_wrap3,Main,Sub_span,Sub_p,Img1,Img2,Img3} from '../../styled-components/landingCategories/contactStyle'
import {globalVariables} from "../../Globals"
let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:white; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`

class ContactUs extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            contact : {},
            fields : {
                first_name:'',
                last_name:'',
                message:'',
                email:'',
                loader:false
            },
            startDate: null
        };
        this._onChangeFields = this._onChangeFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator();
    }
    componentDidMount()
    {
        this.setState({loader:true})
        fetch(API_URL + "/get-contact-details",{
            method:"get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            /* console.log("I m in API get",responseData) */
            this.setState({contact:responseData.data,loader:false});
        })
        .catch(error => { /* console.log(error) */ })
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
          message: head,
          description: desc,
        });
      };
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
    onSubmit(){
        if( this.validator.allValid() ){

            fetch(API_URL + "/send-inquiry", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.fields)
            })
                .then(response => response.json())
                .then((responseData) => {
                    this.openNotificationWithIcon('success', 'Login Successful', responseData.message);
                    let fields={};
                    fields["last_name"]='';
                    fields['first_name']="";
                    fields['email']="";
                    fields['message']="";
                                        
                    this.setState({ fields:fields},()=>{
                        this.validator.hideMessages();
                        this.forceUpdate();
                        
                    })
                    

                })
                .catch(error => {
                })
          } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
          }
    }
    render()
    {

        return(
            <Contact_wrap>
                <Navigation />
                    <Grey_wrap>
                        <ContainerContact>
                                <Headcontact>
                                    <Head_span>Contact Us</Head_span>
                                    <hr/>
                                </Headcontact>
                                <Row_wrap>
                                    <Row>
                                        <Col sm={24} xl={12}>
                                            <Left_col>
                                                <Sub_head>Reach out to us for any inquiry.</Sub_head>
                                                <First_div>
                                                    <First_label>First Name</First_label>
                                                    <First_input name="first_name" onChange={this._onChangeFields} value={this.state.fields.first_name}/>
                                                    {this.validator.message('first_name', this.state.fields.first_name, 'required|alpha_num', 'text-danger-validation')}
                                                </First_div>
                                                <Second_div>
                                                    <Second_label>Last Name</Second_label>
                                                    <Second_input name="last_name" onChange={this._onChangeFields} value={this.state.fields.last_name}/>
                                                    {this.validator.message('last_name', this.state.fields.last_name, 'required|alpha_num', 'text-danger-validation')}
                                                </Second_div>
                                                <Third_div>
                                                    <Third_label>Your Email</Third_label>
                                                    <Third_input name="email" onChange={this._onChangeFields} value={this.state.fields.email}/>
                                                    {this.validator.message('email', this.state.fields.email, 'required|email', 'text-danger-validation')}
                                                </Third_div>
                                                <Fourth_div>
                                                    <Fourth_label>Message</Fourth_label>
                                                    <Fourth_area name="message" onChange={this._onChangeFields} value={this.state.fields.message}/>
                                                    {this.validator.message('message', this.state.fields.message, 'required', 'text-danger-validation')}
                                                </Fourth_div>
                                                <Fifth_div>
                                                    <Fifth_button onClick={this.onSubmit}>SUBMIT</Fifth_button>
                                                </Fifth_div>
                                            </Left_col>
                                        </Col>
                                        <Col sm={24} xl={12}>
                                            <Map_wrap>
                                            <Contact_Map/>
                                            </Map_wrap>
                                        </Col>
                                    </Row>
                                </Row_wrap>
                                <hr/>
                                <Subfoot_wrap>
                                    <Row>
                                        <Col lg={24} xl={8}>
                                            <Main_wrap1>
                                                <Img1 src="/images/LandingCat/map_icon.png"/>
                                                <Main>
                                                    <Sub_span>Location:</Sub_span>
                                                    <Sub_p>{this.state.contact.address}</Sub_p>
                                                </Main>
                                            </Main_wrap1>
                                        </Col>
                                        <Col lg={24} xl={8}>
                                            <Main_wrap2>
                                                <Img2 src="/images/LandingCat/email_icon.png"/>
                                                <Main>
                                                    <Sub_span>Email:</Sub_span>
                                                    <Sub_p>{this.state.contact.email}</Sub_p>
                                               </Main>
                                            </Main_wrap2>   
                                        </Col>
                                        <Col lg={24} xl={8}>
                                            <Main_wrap3>   
                                                <Img3 src="/images/LandingCat/call_icon.png"/>
                                                <Main>
                                                    <Sub_span>Phone:</Sub_span>
                                                    <Sub_p>{this.state.contact.phone}</Sub_p>
                                                </Main>
                                            </Main_wrap3>   
                                        </Col>
                                    </Row>
                                </Subfoot_wrap>
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

export default ContactUs;