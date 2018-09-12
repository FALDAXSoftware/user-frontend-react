/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Row, Col , Button , Layout, Menu, Breadcrumb,Card } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'

/* Components */
import Header_main from "./Navigation";
import Home_first from "./Home_first";
import Home_second from "./Home_second";
import Home_third from "./Home_third";
import Footer_main from "./Footer_home";
import Home_fourth from "./Home_fourth";

/* Global Components */
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


/* Styled Components */
const Content_style = styled(Content)`
    margin-top:80px;
`

/* Component Defination Starts Here*/

export default class NavigationBar extends React.Component
{
    render()
    {
        return(
        <div>
            <Layout>
                <Header_main/>
                <Content_style>
                    <Home_first/>
                    <Home_second/>
                    <Home_third/>
                    <Home_fourth/>
                </Content_style>
                <Footer_main/>
            </Layout>
        </div>
        );
    }
}