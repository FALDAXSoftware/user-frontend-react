/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components';
import Slider from "react-slick";

/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';


/* Components */

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const Section = styled.section`
  width:100%;
  min-height:560px;
  background-image:url('/images/Homepage/service-bg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-top:9%;
  @media (max-width: 991px) {
    min-height:500px;
  }
`
const Img = styled.img`
  display:block;
  @media (max-width: 991px) {
    display:none !important;
  }
`
const Title = styled.span`
  font-size:42px;
  color:white;
  font-weight:bold;
  line-height:1;
  margin-bottom:15px;
  display:block;
  font-family:"Open sans";
  @media (max-width: 991px) {
    text-align:center;
    font-size:36px;
  }

`
const Description = styled.p`
  color:white;
  font-family:"Open sans";
  font-size:22px;
  @media (max-width: 991px) {
    text-align:justify;
    font-size:18px;
  }
`


export default class Services extends React.Component
{

    render() {

      const sliderSettings = {
        dots: false,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade:true,
        autoplay:true
      };
        return (
          <Section>
            <Container>
            <Slider {...sliderSettings}>
            <Row>
              <Col lg={{span:8}}>
                <Img src="/images/Homepage/service-logo/reliability.png"/>
              </Col>
              <Col lg={{span:16}}>
                <Title>
                  Reliability
                </Title>
                <Description>
                  All hardware is housed in some of the most secure and technologically advanced data centers on the planet. All data is replicated, in real-time, across three locations thousands of miles apart. Our proprietary code was created from the ground up by developers that have experience on enterprise projects for companies such as Google, Motorola, Unilever, Pedigree, Dove and many more. It is capable of at least 1,000,000+ transactions per second and built to adopt an N+1 scaling procedure to ensure seamless operations regardless of growth.
                </Description>
              </Col>
            </Row>
            <Row>
              <Col lg={{span:8}}>
                <Img src="/images/Homepage/service-logo/accessabilty.png"/>
              </Col>
              <Col lg={{span:16}}>
                <Title>
                  Accessibility
                </Title>
                <Description>
                FALDAX was built with both novice and professional traders in mind. Building our own exchange allowed us to construct each component to our specific needs and design philosophies. Our personal trading experience assisted with identifying workflow and experience deficiencies with other exchanges. The end result is novice traders have the information necessary to make informed decisions with no surprises while professional traders have a streamlined, feature-rich and data-centric interface with zero compromise.
                </Description>
              </Col>
            </Row>
            <Row>
              <Col lg={{span:8}}>
                <Img src="/images/Homepage/service-logo/security.png"/>
              </Col>
              <Col lg={{span:16}}>
                <Title>
                  Security
                </Title>
                <Description>
                All hardware is housed in some of the most secure data centers on the planet. Our proprietary code has been subjected to multiple 3rd party security and penetration tests. Strict internal data security procedures are documented and disseminated to all employees. All traffic between in and out of the network is fully encrypted. Many of the most popular coins or tokens supported are insured by up to $1 Million, per customer.
                </Description>
              </Col>
            </Row>
            <Row>
              <Col lg={{span:8}}>
                <Img src="/images/Homepage/service-logo/inovation.png"/>
              </Col>
              <Col lg={{span:16}}>
                <Title>
                  Innovation
                </Title>
                <Description>
                The features and functionality at launch are on par with our largest competition. We currently have seven features that will revolutionize your trading experience that have never been done before that are in active development. Our plan is to release these features individually as they are ready within 4-6 months after launch. We are committed to always pushing the envelope and  expanding the services we offer to you at no additional cost.
                </Description>
              </Col>
            </Row>
            </Slider>
            </Container>
          </Section>
        );
    }

}
