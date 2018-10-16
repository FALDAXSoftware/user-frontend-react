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

const Section = styled.section`
  width:100%;
  height:100vh;
  background-image:url('/images/Homepage/banner.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const Heading = styled.h2`
  font-size:63px;
  color:white;
  font-family:"Open sans";
  margin-bottom:0px;
  margin-top:20%;
  @media (max-width: 1199px) {
    font-size:50px;
    padding-left:30px;
  }
  @media (max-width: 991px) {
    text-align:center;
    padding-left:0px;
    margin-top:8%;
  }
`
const HeadingBrand = styled.span`
  font-weight: bold;
  color:#00a7ff;
  @media (max-width: 991px) {
    color:white;
  }
`
const SubHeading = styled.h3`
  font-size:26px;
  color:white;
  font-family:"Open sans";
  text-transform: uppercase;
  letter-spacing: 6.7px;
  @media (max-width: 1199px) {
    font-size:20px;
    letter-spacing: 5.7px;
    padding-left:30px;
  }
  @media (max-width: 991px) {
    text-align:center;
    padding-left:0px;
  }
`
const Img = styled.img`
  @media (max-width: 991px) {
    display:none;
  }
`



export default class Homefirst extends React.Component
{

    render() {

        return (
          <Section>
            <Container>
            <Row style={{paddingTop:"8%"}}>
              <Col lg={{span:14}}>
                <Heading>
                  Welcome to <HeadingBrand>FALDAX</HeadingBrand>
                </Heading>
                <SubHeading>
                  Built For Traders, By Traders
                </SubHeading>
              </Col>
              <Col lg={{span:10}}>
                <Img src="/images/logo-lg.png" width="80%"/>
              </Col>
            </Row>
            </Container>
          </Section>
        );
    }

}
