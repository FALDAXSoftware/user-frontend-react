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

/* Styled Components */
const Second_Wrap = styled.div`
    background-color:#ffffff
`
const Second_head = styled.div`
    padding-top: 80px;
`
const Second_head_span = styled.span`
    font-size: 42px;
    font-family: "OpenSans";
    color: rgb( 40, 37, 40 );
    line-height: 0.857;
`
const Second_head_p = styled.p`
    font-size: 14px;
    font-family: "OpenSans";
    color: rgba( 40, 37, 40, 0.702 );
    line-height: 2.571;
`
const Row_Icon = styled(Row)`
    padding-bottom: 80px;
`
const Card_img = styled.img`
    padding-top: 80px;
    width:auto;
    display: inline-block;
`
const Meta_main = styled(Meta)`
    margin-top:60px;
`
const Card_span = styled.span`
    font-size: 16px;
    font-family: "OpenSans";
    color: rgb( 15, 71, 123 );
    line-height: 2.25;
    text-align: left;
`


export default class Homesecond extends React.Component
{
    render()
    {
        return(
            <Second_Wrap>
                        <Second_head>
                            <Second_head_span>Our <b>Features</b></Second_head_span>
                            <Second_head_p>Here are a few reasons why you should choose Faldax</Second_head_p>
                        </Second_head>
                        <Row_Icon>
                            <Col span={18} offset={3}>
                                <Row>
                                    <Col xl={8}>
                                        <Card
                                            hoverable={false}
                                            style={{ width: "100%", border:"none" }}
                                            cover={<Card_img src="./images/Homepage/conversion.png" alt="Card image cap"/>}
                                        >
                                            <Meta_main
                                                title="Exchange"
                                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                            />
                                            <Card_span>Learn More ></Card_span>
                                        </Card>
                                    </Col>
                                    <Col xl={8}>
                                        <Card
                                            hoverable={false}
                                            style={{ width: "100%", border:"none" }}
                                            cover={<Card_img src="./images/Homepage/connect_bitcoin.png" alt="Card image cap"/>}
                                        >
                                            <Meta_main
                                                title="Margin Trading"
                                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                            />
                                            <Card_span>Learn More ></Card_span>
                                        </Card>
                                    </Col>
                                    <Col xl={8}>
                                        <Card
                                            hoverable={false}
                                            style={{ width: "100%", border:"none" }}
                                            cover={<Card_img src="./images/Homepage/security.png" alt="Card image cap"/>}
                                        >
                                            <Meta_main
                                                title="Security"
                                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                            />
                                            <Card_span>Learn More ></Card_span>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row_Icon>
                    </Second_Wrap>
        );
    }   
}