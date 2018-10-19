/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Layout, Card, Icon } from 'antd';
import styled from 'styled-components';
import Slider from "react-slick";

/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';
/* Components */

const Section = styled.section`
  width:100%;
  min-height:560px;
  background-image:url('/images/Homepage/service-bg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-top:5%;
  @media (max-width: 991px) {
    padding-top:10%
    min-height:auto;
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

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const NextIcon = styled(Icon)`
  color: white;
  font-size: 36px;
  position: absolute;
  right: -110px;
  top: calc(50% - 17px);
  cursor:pointer; 
  @media(max-width:1370px)
  {
    right:-60px;
  }
  @media(max-width:1265px)
  {
    display:none;
  }
`
  return (
    <NextIcon type="right" theme="outlined" onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  const PrevIcon = styled(Icon)`
  color: white;
  font-size: 36px;
  position: absolute;
  left: -110px;
  top: calc(50% - 17px);
  cursor:pointer;
  @media(max-width:1370px)
  {
    left:-60px;
  }
  @media(max-width:1265px)
  {
    display:none;
  }
`
  return (
    <PrevIcon type="left" theme="outlined" onClick={onClick} />
  );
}

export default class Services extends Component {

  render() {
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      autoplaySpeed: 30000
    };

    return (
      <Section>
        <Container>
          <Slider {...sliderSettings}>
            <Row>
              <Col lg={{ span: 8 }}>
                <Img src="/images/Homepage/service-logo/reliability.png" />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  Reliability
                </Title>
                <Description>
                  All hardware is housed in some of the most secure and technologically advanced data centers on the planet. All data is replicated, in real-time, across three locations thousands of miles apart. Our proprietary code was created from the ground up by developers that have experience on enterprise-grade projects for companies such as Google, Motorola, Unilever, Pedigree, Dove and many more. The order management system is capable of at least 1,000,000+ transactions per second and built with an N+1 scaling philosophy to ensure seamless operations regardless of growth.
                </Description>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 8 }}>
                <Img src="/images/Homepage/service-logo/accessabilty.png" />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  Accessibility
                </Title>
                <Description>
                  FALDAX was built with both novice and professional traders in mind. Building our own exchange allowed us to construct each component to our specific needs and design philosophies. Our personal trading experience assisted with identifying workflow and experience deficiencies with other exchanges. The end result is novice traders have the information necessary to make informed decisions without surprises while professional traders have a streamlined, feature-rich, data-centric, zero compromise interface.
                </Description>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 8 }}>
                <Img src="/images/Homepage/service-logo/security.png" />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  Security
                </Title>
                <Description>
                  All hardware is housed in some of the most secure data centers on the planet. A complete description of the security and compliance standards followed can be found <a style={{ textDecoration: 'underline' }} href="https://docs.aws.amazon.com/aws-technical-content/latest/aws-overview/security-and-compliance.html" target="_blank">here</a>. Our proprietary code has been subjected to multiple 3rd party security and penetration tests. Strict internal data security procedures are documented and disseminated to all employees. All traffic between in and out of the network is encrypted.
                </Description>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 8 }}>
                <Img src="/images/Homepage/service-logo/inovation.png" />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  Innovation
                </Title>
                <Description>
                  At launch, the features and functionality you are accustomed to from our competition will be available at FALDAX. However, we currently have seen features in development, never provided by an exchange before, that will be revolutionize your trading experience. Each feature will be released individually as they are completed, four to six months post launch - for free. We are committed to always pushing boundaries and expanding the services we offer to you, always at no additional cost.
                </Description>
              </Col>
            </Row>
          </Slider>
        </Container>
      </Section>
    );
  }
}
