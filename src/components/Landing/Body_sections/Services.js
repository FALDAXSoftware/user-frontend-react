/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import Slider from "react-slick";
import {
  _RELIABILITY, _INOVATION, _SECURITY, _ACCESSIBILITY, _SERVICEBG
} from '../../../Constants/images';

/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';
/* Components */

const Section = styled.section`
  width:100%;
  background-image:url(${_SERVICEBG});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding:100px 0px;
  @media (max-width: 1199px) {
    padding:50px 0px;
  }
`
const Img = styled.img`
  display:block;
  margin-left:5px;
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
  font-size:16px;
  text-align:justify;
  @media (max-width: 991px) {
    font-size:18px;
  }
`
const SlideRow = styled(Row)`
  display:flex !important;
  height:100%;
  align-items:center;
  @media (max-width: 991px) {
    padding:0px 5px;
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
  }`

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
        <Container className="wow fadeIn" data-wow-duration="2s" data-wow-delay="500ms">
          <Slider {...sliderSettings}>
            <SlideRow>
              <Col lg={{ span: 8 }}>
                <Img src={_RELIABILITY} />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  _RELIABILITY
                </Title>
                <Description>
                  FALDAX is built upon proven enterprise technology solutions. All data from production systems is replicated, in real-time, across three locations thousands of miles apart. Our proprietary code is written and maintained by our experienced developers who have prior experience working for companies such as Google, Motorola, Unilever, Pedigree, Dove and many more. The order management system is capable of at least 1,000,000+ transactions per second and built with an N+1 scaling philosophy to ensure seamless operations regardless of growth.
                </Description>
              </Col>
            </SlideRow>
            <SlideRow>
              <Col lg={{ span: 8 }}>
                <Img src={_ACCESSIBILITY} />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  _ACCESSIBILITY
                </Title>
                <Description>
                  As traders ourselves, we know that there is room for improvement in this space.We believe that one platform can meet the needs of novice and professional traders without compromising anyone’s experience. Creating our exchange from the ground up allows us to construct each component according to specific needs and design philosophies. At FALDAX, novice traders get the information they need to avoid surprises and make informed decisions while professional traders have a streamlined, feature-rich, data-centric, and zero-compromise interface that doesn’t slow them down.
                </Description>
              </Col>
            </SlideRow>
            <SlideRow>
              <Col lg={{ span: 8 }}>
                <Img src={_SECURITY} />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  _SECURITY
                </Title>
                <Description>
                  Production hardware is located in high-security AWS data centers. Documentation of the security and compliance standards followed by AWS are available <a href="https://docs.aws.amazon.com/aws-technical-content/latest/aws-overview/security-and-compliance.html" target="_blank" >at this link.</a> The prestigious <a href="https://www.herjavecgroup.com/" target="_blank"> Herjavec Group </a> is scheduled to conduct security and penetration tests in addition to our internal testing. The Herjavec Group and other third-party cyber security firms will monitor our systems in real-time for vulnerabilities. Internally, strict data security procedures are documented and disseminated to all employees. While security is never a guarantee, you can rest assured that we are doing our part to make FALDAX as safe as possible.
                </Description>
              </Col>
            </SlideRow>
            <SlideRow>
              <Col lg={{ span: 8 }}>
                <Img src={_INOVATION} />
              </Col>
              <Col lg={{ span: 16 }}>
                <Title>
                  Innovation
                </Title>
                <Description>
                  FALDAX offers the features and functionality you are accustomed to. Our initial focus is to offer a customer-centric exchange on par with other exchanges. But our mission continues to grow, and we currently have seven features in development that will revolutionize your experience. We expect development to conclude between four to six months after initial launch. FALDAX is committed to pushing boundaries and expanding the services we offer. We know you could trade somewhere else so to thank you, we are happy to offer all new features at no additional cost. Sign up for our newsletter to receive updates on these features in the near future!
                </Description>
              </Col>
            </SlideRow>
          </Slider>
        </Container>
      </Section>
    );
  }
}
