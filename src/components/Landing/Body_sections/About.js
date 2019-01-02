/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import ComingSoon from '../../ComingSoon';

/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';

/* Components */
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
  margin-bottom:20px;
`
const HeadingBrand = styled.span`
  font-weight: bold;
  white-space: nowrap;
`
const SubHeading = styled.h3`
  font-size:14px;
  color:#282528;
  font-family:"Open sans";
  margin-bottom:40px;
`
const Paragraph = styled.p`
  text-align:justify;
  font-size:16px;
  color:black;
  font-family:"Open sans";
  line-height: 1.875;
`
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: false,
    };
  }

  comingCancel = (e) => {
    this.setState({
      comingSoon: false,
    });
  }

  showComing = () => {
    this.setState({
      comingSoon: true,
    });
  }

  render() {
    return (
      <Section>
        <Container style={{ textAlign: "center" }} >
          <Row className="wow fadeIn" data-wow-duration="2s" data-wow-delay="700ms">
            <Col>
              <Heading>
                What is <HeadingBrand>FALDAX ?</HeadingBrand>
              </Heading>
              {/* <SubHeading>
                Built For Traders, By Traders
              </SubHeading> */}
            </Col>
          </Row>
          <Row className="wow fadeIn" data-wow-duration="2s" data-wow-delay="700ms">
            <Col>
              <Paragraph>
                Ford & Lowrey Digital Asset Exchange (FALDAX) is a new cryptocurrency exchange platform, built by tech-savvy traders that were frustrated with the trading options available today. Limited innovation hinders cryptocurrency adoption, and the process is often confusing or seems too risky for new traders. New and old exchanges are copycats with few details separating one from the other. FALDAX will propel the industry with forward-thinking innovations that enhance every trader’s experience – novice and veteran, alike.
                </Paragraph>
              <Paragraph>
                FALDAX consolidates your entire trading experience into a single platform. Crypto news, robust portfolio management tools, advanced charting and market analysis tools, collaboration via friend's lists, groups, market chat, accounting and more will all be available to our customers at no additional charge. Soon, we will release new features that are unique to FALDAX at no additional cost to you. We are incredibly excited to share the details of these exciting features so please consider <a href="javascript:void(0)" onClick={this.showComing}> subscribing to our mailing list</a> to receive updates as they are made available.
                </Paragraph>
              <Paragraph>
                We don’t want customers; we want raving fans! We know the only way to accomplish this is to offer you an exceptional and personal level of support. We have to listen to, not merely hear, your feedback and act on it. We have to offer you more for less. Exceptional customer support is the touchstone of our corporate culture. Expect that from us, and get it.
                </Paragraph>
            </Col>
          </Row>
        </Container>
        <ComingSoon comingCancel={(e) => this.comingCancel(e)} visible={this.state.comingSoon} />
      </Section>
    );
  }
}
