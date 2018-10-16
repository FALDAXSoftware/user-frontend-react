/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card,Modal } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/* Components */

/* Styled Components */
import { Container } from '../../../styled-components/homepage/style';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


/* Styled-Components */
const Footer_main = styled(Footer)`
    background-color:white;
    text-align: left;
    padding: 25px 0px 0px 0px;
`
const Footer_headers = styled.li`
    font-size: 14px;
    font-family: "Open sans";
    color: rgba( 40, 37, 40, 0.8 );
    font-weight: bold;
    line-height: 1.714;
    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
const Footer_ul = styled.ul`
    margin-top:20px;
    list-style-type:none;
    padding: 0px;
    li:not(:first-child)
    {
        margin-top:20px;
    }
`
const LI = styled.li`

`
const LI2 = styled.li`
    @media(max-width:1406)
    {
        margin-top:20px;
    }
`
// display: inline-block;
const Icon_ul_1 = styled.ul`
    display: inline-block;
    list-style-type:none;
    padding: 0px;
    margin-bottom: 0px;
    @media(min-width:1200px)
    {
        margin-top: 20px;
    }
    ${LI}
    {
        
        display:inline-block
    }
    ${LI2}
    {
        display:inline-block
    }
    ${LI},${LI2}
    {
       margin-right:15px; 
       margin-top:20px;
    }
`
const Icon_ul_2 = styled.ul`
    display: inline-block;
    list-style-type:none;
    padding: 0px;
    ${LI}
    {
        
        display:inline-block
    }
    ${LI2}
    {
        display:inline-block
    }
    ${LI},${LI2}
    {
       margin-right:15px; 
       margin-top:20px;
    }
`
const Download = styled.span`
    margin-top: 20px;
    font-size: 14px;
    font-family: "Open sans";
    color: rgba( 40, 37, 40, 0.8 );
    font-weight: bold;
    line-height: 1.714;

    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`

const Store_Col = styled(Col)`
    margin-top: 20px;
    @media(max-width:1200px)
    {
        margin-top:30px
    }
`
const Store_Wrap = styled.div`
    margin-top:10px;
`
const Appstore = styled.img`
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
`
const Playstore = styled.img`
    display: inline-block;
`

const Bottom_Footer = styled.div`
    height: 71px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Footer_Text = styled.span`
    font-size: 13px;
    font-family: "Open sans";
    color: rgba( 0, 0, 0, 0.8 );
    line-height: 1.846;
    float: left;
    verticle-align: middle;
    @media(max-width:375px)
    {
        font-size: 9.5px;
    }
`;

const Footer_logo = styled.img`
    float: right;
    @media(max-width:375px)
    {
        max-width: 120px;
    }
`;

const HR = styled.hr`
    margin-top: 30px;
    margin-bottom: 0px;
`;


export default class Footer_home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            comingSoon:false
        }
    }
    showComing = () => {
        this.setState({
          comingSoon: true,
        });
      }
    
      handleComing = (e) => {
        /* console.log(e); */
        this.setState({
            comingSoon: false,
        });
      }
    
      comingCancel = (e) => {
        /* console.log(e); */
        this.setState({
            comingSoon: false,
        });
      }
    render() {
        return (
            <Footer_main>
                <Row>
                    <Container>
                        <Col span={24}>
                            <Row>
                                <Col xs={24} sm={12} md={7} lg={7} xl={5}>
                                    <Footer_ul>
                                        <Footer_headers>About Us</Footer_headers>
                                        <li style={{cursor:"pointer"}} >
                                            <Link to="/about-us">About FALDAX</Link>
                                                </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Contact Us
                                                </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Careers
                                                </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Media Contact
                                                </li>
                                    </Footer_ul>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={5}>
                                    <Footer_ul>
                                        <Footer_headers>Features</Footer_headers>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            List your Token
                                                    </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            News
                                                    </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Security
                                                    </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>Language</li><li onClick={this.showComing}>API Documentation</li>
                                    </Footer_ul>
                                </Col>

                                <Col xs={24} sm={12} md={5} lg={3} xl={5}>
                                    <Footer_ul>

                                        <Footer_headers>For Users</Footer_headers>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                        <Link to="/faq">FAQ</Link>
                                                    </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Blog
                                                    </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Support
                                                    </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Supported Countries
                                                    </li>
                                        <li style={{cursor:"pointer"}} onClick={this.showComing}>
                                            Legal & Privacy
                                                    </li>
                                    </Footer_ul>
                                </Col>
                                <Col xs={24} sm={11} md={12} lg={7} xl={5}>
                                    <Icon_ul_1>
                                        <Footer_headers>Social</Footer_headers>
                                        <LI style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/fb_icon.png" />
                                        </LI>
                                        <LI style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/tweet_icon.png" />
                                        </LI>
                                        <LI style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/google_icon.png" />
                                        </LI>
                                        <LI style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/you_icon.png" />
                                        </LI>
                                    </Icon_ul_1>
                                    <Icon_ul_2>
                                        <LI2 style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/insta_icon.png" />
                                        </LI2>
                                        <LI2 style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/telegram_icon.png" />
                                        </LI2>
                                        <LI2 style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/in_icon.png" />
                                        </LI2>
                                        <LI2 style={{cursor:"pointer"}} onClick={this.showComing}>
                                            <img src="./images/Homepage/www_icon.png" />
                                        </LI2>
                                    </Icon_ul_2>
                                </Col>
                                <Store_Col xs={24} sm={24} md={8} lg={2} xl={2}>
                                    <Download>Download</Download>
                                    <Store_Wrap>
                                        <Appstore style={{cursor:"pointer"}} onClick={this.showComing} src="./images/Homepage/appstore_icon.png" />
                                        <Playstore style={{cursor:"pointer"}} onClick={this.showComing} src="./images/Homepage/playstore_icon.png" />
                                    </Store_Wrap>
                                </Store_Col>
                            </Row> 
                            <HR />
                            <Bottom_Footer>
                                <Footer_Text> ©2018 FALDAX. All Rights Reserved. </Footer_Text>
                                <Footer_logo src="./images/Homepage/Footer_logo.png" />
                            </Bottom_Footer>
                        </Col>
                    </Container>
                </Row>
                <div>
                        <Modal
                        visible={this.state.comingSoon}
                        onOk={this.handleComing}
                        className="Coming_soon"
                        onCancel={this.comingCancel}
                        footer={null}
                        >
                        <div style={{textAlign:"center",color: "white"}}><h1 style={{textAlign:"center",color: "white"}}>Coming Soon</h1></div>
                        </Modal>
                    </div>
            </Footer_main>
        );
    }
}