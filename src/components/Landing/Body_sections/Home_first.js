/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components'

/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';
import { globalVariables } from '../../../Globals';
let { amazon_bucket } = globalVariables;
/* Components */

const Section = styled.section`
  width:100%;
  height:calc(100vh - 80px);
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
  @media (max-width: 1199px) {
    font-size:50px;
    padding-left:30px;
  }
  @media (max-width: 991px) {
    text-align:center;
    padding-left:0px;
    
  }
`
const HeadingBrand = styled.span`
  font-weight: bold;
  color:#00a7ff;
  @media (max-width: 991px) {
    color:white;
  }
`
const BannerRow = styled(Row)`
    display: flex;
    align-items: center;
    height: 100%;
`
const SubHeading = styled.h3`
  font-size:26px;
  color:white;
  font-family:"Open sans";
  text-transform: uppercase;
  letter-spacing: 7.3px;
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
const ImageCol = styled(Col)`
  text-align:center;
`
export default class Homefirst extends Component {
  render() {
    return (
      <Section>
        <Container style={{ height: "100%" }}>
          <BannerRow>
            <Col xs={24} lg={14}>
              <Heading>
                Welcome to <HeadingBrand>FALDAX</HeadingBrand>
              </Heading>
              <SubHeading>
                Built For Traders, By Traders
                </SubHeading>
            </Col>
            <ImageCol lg={10}>
              <Img src={"https://s3.ap-south-1.amazonaws.com/varshalteamprivatebucket/faldax/assets/logo-lg.png"} width="80%" className="wow fadeInUp" data-wow-delay="1s" />
            </ImageCol>
          </BannerRow>
        </Container>
      </Section>
    );
  }
}
