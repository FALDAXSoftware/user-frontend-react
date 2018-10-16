/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Row, Col , Button , Layout, Menu, Breadcrumb,Card } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'

/* Components */


const { Header, Content, Footer } = Layout;
const { Meta } = Card;


/* Styled-Components */

const Third_Row = styled(Row)`
    padding-top: 50px;
    padding-bottom: 50px;
`
const Third_Wrap = styled.div`
    background-color:#f7f5f5;
    text-align: center;
`
const BlueCol = styled(Col)`

    @media (max-width: 1200px) {
        margin-bottom:50px;
    }

`
const Third_span = styled.span`
    font-size: 55px;
    font-family: "Open sans";
    color: #00a7ff;
    line-height: 0.625;
`
const Third_p = styled.p`
    font-size: 24px;
    font-family: "Open sans";
    color: rgb( 175, 216, 255 );
    line-height: 1.5;
    color:black;
`
const Third_title = styled(Third_p)`
  color:#cbc9ca;
  font-size:20px;
`


export default class Homethird extends React.Component
{
    render()
    {
        return(
                    <Third_Wrap>
                        <Third_Row>
                            <Col span={18} offset={3}>
                                <Row>
                                    <BlueCol xl={8}>
                                        <Third_title>Service Available in</Third_title>
                                        <Third_span>211</Third_span>
                                        <Third_p>Countries</Third_p>
                                    </BlueCol>
                                    <BlueCol xl={8}>
                                        <Third_title>Support For</Third_title>
                                        <Third_span>73+</Third_span>
                                        <Third_p>Coins</Third_p>
                                    </BlueCol>
                                    <BlueCol xl={8}>
                                        <Third_title>Always</Third_title>
                                        <Third_span>0%</Third_span>
                                        <Third_p>Fee</Third_p>
                                    </BlueCol>
                                </Row>
                            </Col>
                        </Third_Row>
                    </Third_Wrap>
        );
    }
}
