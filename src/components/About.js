/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'

/* Components */

import Header_main from "./Navigation";
import Home_first from "./Home_first";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


/* Styled-Components */

const Third_Row = styled(Row)`
    padding-top: 68px;
    padding-bottom: 50px;
`
const Third_Wrap = styled.div`
    background-color:#0f477b;
    text-align: center;
`
const BlueCol = styled(Col)`

    @media (max-width: 1200px) {
        margin-bottom:50px;
    }

`
const Third_span = styled.span`
    font-size: 48px;
    font-family: "Open sans";
    color: rgb( 255, 255, 255 );
    line-height: 0.625;  
`
const Third_p = styled.p`
    font-size: 24px;
    font-family: "Open sans";
    color: rgb( 175, 216, 255 );
    line-height: 1.5; 
`


export default class About extends React.Component {
    render() {
        return (
            <Third_Wrap>
                <Third_Row>
                    <Col span={18} offset={3}>
                        <Row>
                            <BlueCol xl={8}>
                                <Third_span>ABOUT US$150B+</Third_span>
                                <Third_p>Digital currency exchanged</Third_p>
                            </BlueCol>
                            <BlueCol xl={8}>
                                <Third_span>34</Third_span>
                                <Third_p>Countries supported</Third_p>
                            </BlueCol>
                            <BlueCol xl={8}>
                                <Third_span>80+</Third_span>
                                <Third_p>Coins Supported</Third_p>
                            </BlueCol>
                        </Row>
                    </Col>
                </Third_Row>
            </Third_Wrap>
        );
    }
}