import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import Contact_Map from "./Contact_Map"
import {Headcontact,Head_span,Contact_wrap,Grey_wrap,Row_wrap,Left_col,Sub_head,First_div,Second_div,Third_div,Fourth_div,First_label,First_input,Second_label,Second_input,Third_label,Third_input,Fourth_label,Fourth_area,Fifth_div,Fifth_button,Map_wrap,Subfoot_wrap,Main_wrap1,Main_wrap2,Main_wrap3,Main,Sub_span,Sub_p,Img1,Img2,Img3} from '../../styled-components/landingCategories/contactStyle'

export const ContainerContact = styled(Container)`
    background-color:white; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`

class ContactUs extends React.Component
{
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
                                                    <First_input/>
                                                </First_div>
                                                <Second_div>
                                                    <Second_label>Last Name</Second_label>
                                                    <Second_input/>
                                                </Second_div>
                                                <Third_div>
                                                    <Third_label>Your Email</Third_label>
                                                    <Third_input/>
                                                </Third_div>
                                                <Fourth_div>
                                                    <Fourth_label>Message</Fourth_label>
                                                    <Fourth_area/>
                                                </Fourth_div>
                                                <Fifth_div>
                                                    <Fifth_button>SUBMIT</Fifth_button>
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
                                                    <Sub_p>Marolem Street, No. 14, 2nd floor</Sub_p>
                                                </Main>
                                            </Main_wrap1>
                                        </Col>
                                        <Col lg={24} xl={8}>
                                            <Main_wrap2>
                                                <Img2 src="/images/LandingCat/email_icon.png"/>
                                                <Main>
                                                    <Sub_span>Email:</Sub_span>
                                                    <Sub_p>request@openxcell.com</Sub_p>
                                               </Main>
                                            </Main_wrap2>   
                                        </Col>
                                        <Col lg={24} xl={8}>
                                            <Main_wrap3>   
                                                <Img3 src="/images/LandingCat/call_icon.png"/>
                                                <Main>
                                                    <Sub_span>Phone:</Sub_span>
                                                    <Sub_p>+91  99982 22929</Sub_p>
                                                </Main>
                                            </Main_wrap3>   
                                        </Col>
                                    </Row>
                                </Subfoot_wrap>
                        </ContainerContact>
                    </Grey_wrap>
                <CommonFooter/>
            </Contact_wrap>
        );
    }
}

export default ContactUs;