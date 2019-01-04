/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components'
import Slider from 'react-slick';
import {
  FeaturesBG, Image1, Image5, Image10, Image2, Image6, Image7, Image4, Image8, Image9, Image3
} from '../../../Constants/images';
/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';
/* Components */
import ComingSoon from '../../ComingSoon';

const Section = styled.section`
  background-image:url(${FeaturesBG});
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
                        FALDAX offers dozens of coins and tokens, with plans to include hundreds more. We will always do our part to ensure any token added to the platform is legitimate. Check out our <a href="javascript:void(0)" onClick={this.showComing} >Token Knowledgebase</a> for more details.<a href="/addcoin" target="_blank" > Click here</a> if you have created a token and would like to list it on FALDAX.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image1} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Propritetary Code </Head1>
                      <Desc1 >
                        Every line of code is unique, and we retain complete control over all of it. Nothing is shared, open-source, or purchased from anyone else. Many exchanges are operating on pre-built code and have no way to verify code security. Taking the extra time to build everything from the ground up allows us to say that we know what is in our code with confidence.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image10} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Advanced Charting Tools </Head1>
                      <Desc1 >

                        Many traders are familiar with the incredible suite of charting tools by TradingView, and we have partnered with TradvingView to offer them here. You can use these tools by activating the Advanced UI.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image5} />
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
                        <Img src={Image6} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Portfolio Management </Head1>
                      <Desc1 >
                        A good portfolio management system should condense detailed information into a form that gives you a clear picture of your position at a glance. Your FALDAX portfolio will not disappoint. In fact, we have some incredible features that will supercharge your portfolio in development scheduled to release shortly after launch. No exchange offers these features, and they are free for all of our customers. <a href="javascript:void(0)" onClick={this.showComing}> Click here </a> to stay informed about these and other exciting news.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image2} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Accounting </Head1>
                      <Desc1 >
                        Many countries have strict tax reporting requirements regarding crypto. Even if that’s not true in your area, traders often want a copy of their trade history for their records. We make this easy by enabling our customers to export a detailed report of every transaction into an Excel, CSV or PDF format with a few simple clicks.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image7} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Best-In-Class Wallet Security </Head1>
                      <Desc1 >
                        We have partnered with BitGo to ensure the safety of your most popular digital assets.<a href="https://www.bitgo.com/info/resources#multi-currency" target="_blank"> Here is a list</a> of all tokens that BitGo will secure for you on behalf of FALDAX. For any tokens not listed, you can expect that we are going above and beyond to ensure their security as well.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image8} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Customizable Dashboard </Head1>
                      <Desc1 >
                        No one sees your dashboard except for you, so organize it the way that you want. Everything is kept the way that you left it when you return.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image9} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Basic and Advanced UI </Head1>
                      <Desc1 >
                        FALDAX exists because we believe every trader should have an incredible experience. The Basic UI offers just enough detail to buy and sell with confidence while the Advanced UI gives seasoned traders all of the information they want. Crypto is an incredible innovation, and we aim to make it accessible for everyone.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image4} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
                <div>
                  <Row1>
                    <Col_Left xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 16 }}>
                      <Head1> Affiliate System </Head1>
                      <Desc1 >
                        Generate a unique affiliate code within your profile and share it with friends and family. To thank you for helping us grow, you will receive a portion of any transaction fees we collect from their future trades, deposited directly into your wallet.
                        </Desc1>
                    </Col_Left>
                    <Col_Right lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                      <Feature_img>
                        <Img src={Image3} />
                      </Feature_img>
                    </Col_Right>
                  </Row1>
                </div>
              </Slider>
            </Col>
          </Row>
        </Container>
        <ComingSoon comingCancel={(e) => this.comingCancel(e)} visible={this.state.comingSoon} />
      </Section >
    );
  }
}
