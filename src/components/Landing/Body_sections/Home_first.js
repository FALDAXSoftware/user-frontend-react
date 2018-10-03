/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'

/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';


/* Components */

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


/* Styled-Components */

const MainRow = styled(Row)`
    background-image: url("./images/Homepage/home_pack.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    max-height: 778px;
    width: 100%;
    text-align:left;
    font-family: "Open sans";

    @media(min-width:1200px)
    {
        height: 778px;
    }
    @media(max-width:1200px)
    {
        height: 700px;
    }
    @media(max-width:991px)
    {
        height: 560px;
    }
    @media(max-width:576px)
    {
        height : auto;
    }
`
const Left_Col = styled(Col)`
    margin-top: 40px;
    padding-right:20px;
`
const Home_text1 = styled.span`
    font-size: 36px;
    font-family: "Open sans";
    color: rgb( 40, 37, 40 );
    line-height: 1;
    display: block;
    margin-top: 40px;
    text-align: left;  
    font-weight: bold;
`
const Home_text2 = styled(Home_text1)`
    margin-top:80px;
`

const Right_Col = styled(Col)`
    
    @media(max-width:576px)
    {
        text-align:center;
    }

`
const Laptop = styled.img`
    margin-top : 130px;

    @media(max-width:1365px)
    {
        width:100%;
    }
    @media(max-width:576px)
    {
        width:75%;
        margin-top:25px;
    }
`
const Home_list = styled.div`
    list-style-image : url("./images/Homepage/arrow-list.png");
    padding-top: 15px;
    font-size:12px;
`
const List = styled.li`
    margin-top:15px
`


export default class Homefirst extends React.Component 
{

    render() {

        return (
            <MainRow>
                <Container>
                    <Left_Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Home_text1>Welcome TO FALDAX</Home_text1>
                        <Home_list>
                            RELIABILITY.ACCESSIBILITY.SECURITY.INNOVATION
                        </Home_list>
                        <Home_text2>What is FALDAX?</Home_text2>
                        <Home_list>
                        Ford & Lowery Digital Asset Exchange (FALDAX) is an exchange. Built by tech-sawy traders that became frustrated with the trading options available today. We love the cryptocurrency industry and are excited by the potential it has to change the world for the better but the tools and platforms used today limit the potential of traders and industry growth. Treaders want to trade crypto, but are forced to setle with the current means of doing so. Why is it so difficult to find a platform that is intuitive, feature-rich, reliable, innovable, and alternative to your needs? We didn’t have that answer for you – until now.

We don’t want customers, we want customers, we want raving fans ! And we know the only way to accomplish that is to offer you and exceptionsl and personal level of support. We have to listen to your feedback and act on it.We have to offer more for less. Our goal is to offer so much, for so little,
that it would not make sense for you to trade anywhere else.

We know that exceptional customer support is baseline. Expect that from us, and get iot. Aside from that, the first step in enhancing your trading experience is to consolidate everything into single platform crypto news, robust portfolio management tools, advanced charting and market analysis tools, collaboration via friend’s lists, groups, market chat, accounting and more wiil be available to our customers at no addional change. In Q2 2019, we will release additional features in developement that are unique in FALDAX at no additional charge as well. We are incredibly excited to share more details with you. Join our mailling list (hyperlink) to be notified when they announced.

This is the beginning of a crypto trading revolution. The status quo is no longer acceptable.
                        </Home_list>
                    </Left_Col>
                    <Right_Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Laptop src="./images/Homepage/desktop.png" />
                    </Right_Col>
                </Container>
            </MainRow>
        );
    }

}