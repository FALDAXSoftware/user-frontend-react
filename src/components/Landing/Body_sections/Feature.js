/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components'
import Slider from 'react-slick'
/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';
/* Components */

const Section = styled.section`
  background-image:url('/images/Homepage/features_BG.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width:100%;
  background-color:#faf9f9;
  padding:80px 0px 100px;
  @media (max-width: 1199px) {
    padding:40px 0px 50px;
  }
`
const Heading = styled.h2`
  font-size:42px;
  color:white;
  font-family:"Open sans";
  margin-bottom:20px;
`
const HeadingBrand = styled.span`
  font-weight: bold;
`
const Row1 = styled(Row)`
  text-align : left;
  display:flex !important;
  height:100%;
  align-items:center;
  @media (max-width: 991px) {
    padding:0px 5px;
  }
`
const Col_Left = styled(Col)`
  padding:5px;
  margin-top:5%;
  @media(max-width:992px)
  {
    margin-top:0;
    padding:20px;
    text-align:center;
  }
`
const Head1 = styled.span`
  font-size: 42px;
  font-family: "Open Sans";
  color: rgb( 255, 255, 255 );
  font-weight: bold;
  line-height: 0.429;
  text-align:left;
  @media(max-width:991px)
  {
    text-align:center;
    font-size:26px;
  }
`
const Desc1 = styled.p`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb( 255, 255, 255 );
  margin-top:30px;
  text-align:justify;
  @media(max-width:991px)
  {
    text-align:justify;
  }
`
const Col_Right = styled(Col)`
  @media(max-width:991px)
  {
    display:none;
    text-align:center;
  }
`
const Feature_img = styled.div`
  text-align:right;
  padding-right:5px;
  width:100%;
`
const Img = styled.img`
  display:inline-block !important;
`

function SampleNextArrow(props) {
  const { onClick } = props;
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
  const { onClick } = props;
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

export default class Feature extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      autoplay: true,
      autoplaySpeed: 30000
    };

    return (
      <Section>
        <Container style={{ textAlign: "center" }} className="wow fadeIn" data-wow-duration="2s" data-wow-delay="500ms">
          <Row>
            <Col>
              <Heading> <HeadingBrand>Features</HeadingBrand> </Heading>
            </Col>
          </Row>
          <Row>
            <Col>
              <Slider {...settings}>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Coin & Token Selection </Head1>
                      <Desc1 >
                        FALDAX has 73 coins and tokens with plans to add hundreds more. We will always perform our due diligence in regards to any token added to the platform. Check out our <a href="" style={{ textDecoration: 'underline' }}>Token Knowledgebase</a> to learn about the coins that have been approved on FALDAX. <a href="" style={{ textDecoration: 'underline' }}>Click here</a> if you have created a token and would like to list it on FALDAX.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_1.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Propritetary Code </Head1>
                      <Desc1 >
                        Every line of code was written from scratch and have complete control over the source code. The development team has experience with projects for Google, Motorola, Unilever, Dove, The University of Florida, and hundreds of other companies.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_10.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Advanced Charting Tools </Head1>
                      <Desc1 >
                        We have integrated TradingView’s charting libraries which enable us to offer some of the most robust and feature-rich live charts available today. <a href="" style={{ textDecoration: 'underline' }}>Click here</a> to see a live demo of TradingView’s incredible charting tools.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_5.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Collaboration </Head1>
                      <Desc1 >
                        Chat publicly, privately, add friends, create chat groups, view and markup live charts with friends, and so much more.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_6.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Portfolio Management </Head1>
                      <Desc1 >
                        Your portfolio should organize a lot of information and condense it into bit-sized chunks leaving you with a clear picture of your financial position. Your FALDAX portfolio does just that, but that is just the beginning. We have some incredible new features that will supercharge your portfolio coming in a few months. No other exchange has these features and as always with FALDAX, they are completely free for all users. <a href="" style={{ textDecoration: 'underline' }}>Click here</a> to enter your e-mail address to be notified when these features and other exciting news are released.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_2.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Accounting </Head1>
                      <Desc1 >
                        Export a specific transaction record or a record of every transaction you have ever made into a convenience Excel, CSV or PDF format with a few clicks. Hand it to your tax professional and enjoy the peace of mind knowing you have done your part.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_7.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Bank-Level Wallet Security* </Head1>
                      <Desc1 >
                        We have partnered with BitGo to ensure the safety of your digital assets. *Some tokens available at FALDAX are not supported by BitGo at this time. Check our <a href="" style={{ textDecoration: 'underline' }}>Token Knowledgebase</a> for more info.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_8.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Customizable Dashboard </Head1>
                      <Desc1 >
                        All info blocks on your personal Dashboard can be shifted to any location on your screen.  The new positions are saved so everything is just the way you want it when you login.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_9.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Basic and Advanced UI </Head1>
                      <Desc1 >
                        We started FALDAX to make the crypto trading experience better for everyone, experienced or not. The Basic UI makes buying and selling crypto simple and clear. The Advanced UI will provide even the most seasoned traders with all of the information they want and need.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_4.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Affiliate System </Head1>
                      <Desc1 >
                        Every user can generate an affiliate link within their personal profile. Share your link with friends and family. As a ‘Thank You’ for helping FALDAX grow, Bitcoin will automatically be added to your Bitcoin wallet every time they make a trade! Just make sure they use your link to create their account.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src="./images/Homepage/img_3.png" />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
              </Slider>
            </Col>
          </Row>
        </Container>
      </Section>
    );
  }
}
