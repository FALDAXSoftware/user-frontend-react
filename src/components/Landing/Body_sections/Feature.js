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
                        FALDAX offers dozens of coins and tokens, with plans to include hundreds more. We will always do our part to ensure any token added to the platform is legitimate. Visit our Token Knowledgebase for more details. <a href="/addcoin" target="_blank" >Click here </a> if you have created a token and are interested in listing it on FALDAX.
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
                      <Head1> Proprietary Code </Head1>
                      <Desc1 >
                        FALDAX is built from scratch and we retain 100% ownership and control of all source code. Many exchanges operate using licensed code with no way to guarantee its integrity or add innovative features to enhance a trader’s experience. Without control of the code, it can be modified or even revoked by the company or individual it is licensed from. The extra time, effort, and money spent creating FALDAX translates to better security, more features, company stability, and the freedom to adapt quickly to the needs of our customers, regulatory, and market changes. We know what is in our code and stand by it with confidence.
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
                        Traders are familiar with the incredible TradingView charting tools, and FALDAX is partnered with TradvingView to offer them as well. Access to these tools are available by selecting the 'Advanced UI' option.
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
                        FALDAX offers a portfolio manager much like other serious exchanges. However, multiple unique features that will supercharge your portfolio are actively in development and are expected  to release shortly after launch. No exchange offers what our advanced portfolio manager will and of course, these features are available to everyone at no additional cost. <a href="https://newsletteremailaddresscapturepopup.faldax.com/" target="_blank"> Click here </a> to receive updates about these and other exciting innovations by FALDAX.
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
                        Many countries impose strict tax reporting requirements for crypto transactions. Regardless, traders often want a copy of their trade history for their records anyway. FALDAX makes this easy by enabling customers to export a detailed report of every transaction into an Excel, CSV or PDF format.
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
                      <Head1> Best-in-Class Wallet Security </Head1>
                      <Desc1 >
                        FALDAX is partnered with BitGo to ensure the security of most digital assets available on the exchange. <a href="https://www.bitgo.com/info/resources#multi-currency" target="_blank" > Click </a>here for a list of all tokens that BitGo secures on behalf of FALDAX. Tokens not listed there are secured by FALDAX on custom nodes per asset. You can rest assured that we are leveraging every technique, resource, and partner to ensure their security as well.
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
                        FALDAX allows traders to arrange their dashboard according to their unique preferences. The changes are stored server-side so the Dashboard will look the same no matter which computer a trader logs in from.
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
                        A core component of the FALDAX mission is to grow the crypto industry. Accomplishing is this task is possible, in part, by removing artificial barriers to entry such as UI complexity. The FALDAX Basic UI is a non-intimidating view offering just enough information to buy and sell with confidence while the Advanced UI provides seasoned traders with every detail.  The incredible innovation of crypto is something to be celebrated, and FALDAX  aims to make it accessible for everyone.
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
                        FALDAX enables customers to generate unique affiliate links directly within their personal profile. When the link is shared and used to create a new account, a portion of any fees collected from transactions made on that account are automatically deposited into the wallet of the link’s owner. FALDAX does not impose limits on the amount income earned through the affiliate system. Start sharing your personal affiliate link today!
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
