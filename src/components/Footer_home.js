/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Row, Col , Button , Layout, Menu, Breadcrumb,Card } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'

/* Components */

import Header_main from "./Navigation";
import Home_first from "./Home_first";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


/* Styled-Components */
const Footer_main = styled(Footer)`
    background-color:white;
    text-align: left;
`
const Footer_headers = styled.li`
    font-size: 14px;
    font-family: "OpenSans";
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
const Icon_ul = styled.ul`
    list-style-type:none;
    margin-top: 20px;
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
       margin-top:10px;
    }
`
const Download = styled.span`
    font-size: 14px;
    font-family: "OpenSans";
    color: rgba( 40, 37, 40, 0.8 );
    font-weight: bold;
    line-height: 1.714;

    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
const Store_Col = styled(Col)`
    margin-left: 40px;
    margin-top: 20px;
    @media(max-width:1200px)
    {
        margin-top:30px
    }
    @media(max-width:768px)
    {
        margin-left:58px;
    }
    @media(max-width:575px)
    {
        margin-left:40px;
    }
`
const Store_Wrap = styled.div`
    margin-top:20px;
`
const Appstore = styled.img`

`
const Playstore = styled.img`
    display: block;
    margin-top:20px;
`



export default class Footer_home extends React.Component
{
    render()
    {
        return(
                    <Footer_main>
                        <Row>
                            <Col span={18} offset={2}>
                                <Row>
                                    <Col xs={24} sm={{span:10,offset:1}} md={{span:7,offset:1}} lg={{span:7,offset:1}} xl={{span:3,offest:1}}>
                                        
                                        <Footer_ul>
                                        <Footer_headers>About Us</Footer_headers>
                                            <li>
                                                About Faldax
                                            </li>
                                            <li>
                                                Contact Us
                                            </li>
                                            <li>
                                                Careers
                                            </li>
                                        </Footer_ul>
                                    </Col>
                                    <Col xs={24} sm={{span:10,offset:1}} md={{span:8,offset:1}} lg={{span:8,offset:1}} xl={{span:4,offset:1}}>
                                        
                                        <Footer_ul>
                                        <Footer_headers>Features</Footer_headers>
                                                <li>
                                                    Trading
                                                </li>
                                                <li>
                                                    Deposit
                                                </li>
                                                <li>
                                                    Withdraw
                                                </li>
                                                <li>
                                                    Manage Wallets
                                                </li>
                                        </Footer_ul>       
                                    </Col>
                                
                                    <Col xs={24} sm={{span:11,offset:1}} md={{span:5,offset:1}} lg={{span:3,offset:1}} xl={{span:3,offset:1}}>
                                        <Footer_ul>
                                            
                                        <Footer_headers>For User</Footer_headers>
                                                <li>
                                                    FAQ
                                                </li>
                                                <li>
                                                    Charts
                                                </li>
                                                <li>
                                                    Blog
                                                </li>
                                                <li>
                                                    Fees
                                                </li>
                                                <li>
                                                    Support
                                                </li>
                                        </Footer_ul>
                                    </Col>
                                    <Col xs={24} sm={{span:11,offset:1}} md={{span:12,offset:1}} lg={{span:7,offset:1}} xl={{span:5,offset:2}}>
                                   
                                        <Icon_ul>
                                                <Footer_headers>Social</Footer_headers>
                                                <LI>
                                                    <img src="./images/Homepage/fb_icon.png"/>
                                                </LI>
                                                <LI>
                                                    <img src="./images/Homepage/tweet_icon.png"/>
                                                </LI>
                                                <LI>
                                                    <img src="./images/Homepage/google_icon.png"/>
                                                </LI>
                                                <LI>
                                                    <img src="./images/Homepage/you_icon.png"/>
                                                </LI>
                                        </Icon_ul>
                                        <Icon_ul>
                                                <LI2>
                                                    <img src="./images/Homepage/insta_icon.png"/>
                                                </LI2>
                                                <LI2>
                                                    <img src="./images/Homepage/telegram_icon.png"/>
                                                </LI2>
                                                <LI2>
                                                    <img src="./images/Homepage/in_icon.png"/>
                                                </LI2>
                                                <LI2>
                                                    <img src="./images/Homepage/www_icon.png"/>
                                                </LI2>
                                        </Icon_ul>
                                    </Col>
                                    <Store_Col xs={{span:24}} sm={{span:24,offset:1}} md={{span:8,offset:1}} lg={{span:2,offset:2}} xl={{span:2,offset:2}}>
                                        <Download>Download</Download>
                                        <Store_Wrap>
                                            <Appstore src="./images/Homepage/appstore_icon.png"/>
                                            <Playstore src="./images/Homepage/playstore_icon.png"/>
                                        </Store_Wrap>
                                    </Store_Col>
                                </Row>
                            </Col>
                        </Row>
                </Footer_main>
        );
    }
}