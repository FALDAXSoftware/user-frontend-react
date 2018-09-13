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

const MainRow = styled(Row)`
    background-image: url("./images/Homepage/home_pack.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    max-height: 778px;
    width: 100%;
    text-align:left;

    @media(max-width:1200px)
    {
        height:auto;
    }
    @media(max-width:576px)
    {
        height : auto;
    }
`
const Left_Col = styled(Col)`
    margin-top: 10%;
    padding-left: 12%;
`
const Home_text = styled.span`
    font-size: 36px;
    font-family: "Times New Roman";
    color: rgb( 40, 37, 40 );
    line-height: 1;
    text-align: left;  
    font-weight: bold;
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
const Home_list = styled.ul`
    list-style-image : url("./images/Homepage/arrow-list.png");
    padding-top: 15px;
`
const List = styled.li`
    margin-top:15px
`


export default class Homefirst extends React.Component
{
    render()
    {
        return(
            <MainRow>
                        <Left_Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Home_text>TRADE. INNOVATE. DISCOVER.</Home_text>
                            <Home_list>
                                <List>Full-featured trading platform</List>
                                <List>Leveraged margin trading</List>
                                <List>DIGITAL MONEY WALLET</List>
                            </Home_list>
                        </Left_Col>
                        <Right_Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Laptop src="./images/Homepage/Laptop.png"/>
                        </Right_Col>
            </MainRow>
        );
    }
}