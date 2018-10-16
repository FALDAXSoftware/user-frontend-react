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
  background-color:#faf9f9;
  padding-top:50px;
  padding-bottom:50px;
`

const Heading = styled.h2`
  font-size:42px;
  color:black;
  font-family:"Open sans";
  margin-bottom:0px;
`
const HeadingBrand = styled.span`
  font-weight: bold;
`
const SubHeading = styled.h3`
  font-size:14px;
  color:#282528;
  font-family:"Open sans";
  margin-bottom:40px;
`
const Paragraph = styled.p`
  text-align:center;
  font-size:16px;
  color:black;
  font-family:"Open sans";
  line-height: 1.875;

`



export default class About extends React.Component
{

    render() {

        return (
          <Section>
            <Container style={{textAlign:"center"}}>
            <Row>
              <Col>
              <Heading>
                What is <HeadingBrand>FALDAX ?</HeadingBrand>
              </Heading>
              <SubHeading>
                Built For Traders, By Traders
              </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col>
                <Paragraph>
                Ford & Lowrey Digital Asset Exchange (FALDAX) is a new cryptocurrency exchange platform, built by tech-savvy traders that were frustrated with the trading options available today. Cryptocurrency adoption is hindered by a lack of innovation and accessibility. For new traders, crypto trading is often confusing or seems too risky. New and old exchanges are copies of one another. FALDAX will propel the industry with forward-thinking innovations that enhance the experience for all traders – novice and veteran, alike.
                </Paragraph>
                <Paragraph>
                We don’t want customers, we want raving fans! We know the only way to accomplish this is to offer you an exceptional and personal level of support. We have to listen to your feedback and act on it. We have to offer you more for less. Exceptional customer support is a touchstone of corporate culture. Expect that from us, and get it.
                </Paragraph>
                <Paragraph>
                FALDAX consolidates your entire trading experience into a single platform. Crypto news, robust portfolio management tools, advanced charting and market analysis tools, collaboration via friend's lists, groups, market chat, accounting and more will all be available to our customers at no additional charge. Soon, we will release additional features that are unique to FALDAX at no additional charge as well. We are incredibly excited to share more details with you. Please consider joining our mailing list (hyperlink) to be notified when they are announced.
                </Paragraph>
              </Col>
            </Row>
            </Container>
          </Section>
        );
    }

}
