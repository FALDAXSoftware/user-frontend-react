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



export default class Feature extends React.Component
{

    render() {

        return (
          <Section>
            <Container style={{textAlign:"center"}}>
            <Row>
              <Col>
              <Heading>
                Our <HeadingBrand>Features</HeadingBrand>
              </Heading>
              <SubHeading>
                Here are few reasons why you should choose Faldax
              </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col>
                
              </Col>
            </Row>
            </Container>
          </Section>
        );
    }

}
