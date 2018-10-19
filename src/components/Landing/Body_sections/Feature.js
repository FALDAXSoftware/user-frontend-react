/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card,Icon} from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'
import Slider from 'react-slick'
/* Import Styled Components */
import { Container } from '../../../styled-components/homepage/style';


/* Components */

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const Section = styled.section`
  background-image:url('/images/Homepage/features_BG.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width:100%;
  background-color:#faf9f9;
  padding-top:50px;
  padding-bottom:50px;
`

const Heading = styled.h2`
  font-size:42px;
  color:white;
  font-family:"Open sans";
  margin-bottom:0px;
`
const HeadingBrand = styled.span`
  font-weight: bold;
`
const SubHeading = styled.h3`
  font-size:14px;
  color:white;
  font-family:"Open sans";
  margin-bottom:40px;
`
const Paragraph = styled.p`
  text-align:center;
  font-size:16px;
  color:white;
  font-family:"Open sans";
  line-height: 1.875;

`
const Row1 = styled(Row)`
  text-align : left;
`
const Col_Left = styled(Col)`
  margin-top:90px
  @media(max-width:992px)
  {
    text-align:center;
  }
`

const Head1 = styled.span`
  font-size: 41.97px;
  font-family: "Open Sans";
  color: rgb( 255, 255, 255 );
  font-weight: bold;
  line-height: 0.429;
  text-align:left;
  @media(max-width:992px)
  {
    text-align:center;
  }
`
const Desc1 = styled.p`
  font-size: 22px;
  font-family: "Open Sans";
  color: rgb( 255, 255, 255 );
  margin-top:30px;
  text-align:left;
  @media(max-width:992px)
  {
    text-align:center;
  }
`

const Col_Right = styled(Col)`
  @media(max-width:992px)
  {
    display:none;
    text-align:center;
  }
`
const Feature_img = styled.div`
  float:right;
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
    <NextIcon type="right" theme="outlined" onClick={onClick}/>
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

export default class Feature extends React.Component
{

    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade:true,
        nextArrow:<SampleNextArrow/>,
        prevArrow:<SamplePrevArrow/>,
        autoplay:true
      };
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
                <Slider {...settings}>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Coin & Token Selection
                        </Head1>
                        <Desc1 >
                          You shouldn't have to have accounts on multiple exchanges to trade the crypto you're interested. We have 73 coins/tokens launch with plans to add hundreds more.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_1.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Propritetary Code
                        </Head1>
                        <Desc1 >
                          Everything about FALDAX was build from scratch by a team of developers that have worked on projects for companies like Google, Motorola, Unilever, Dove and many more.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_10.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Advanced Charting Tools
                        </Head1>
                        <Desc1 >
                          By leveraging Trading Views charting libraries,we are able to provide you with some of the most robust charting tools available today.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_5.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Collaboration
                        </Head1>
                        <Desc1 >
                          Friends list,private messaging,group chats,live chart viewing/makeup,chart sharing,chart saving, and so much more! learn and share knowledge with other trades easily.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_6.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Portfolio Management
                        </Head1>
                        <Desc1 >
                          Stop paying for portfolio management software and enjoy our robust,free of charge portfolio instand.We also have some exciting upcomming additions not offerred anywhere else.Click this link and provide your e-mail.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_2.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Accounting
                        </Head1>
                        <Desc1 >
                          Download your transaction history for your record or taxes in a Excel,CSV, or PDF format in just a few clicks.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_7.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Bank-Level Wallet Security
                        </Head1>
                        <Desc1 >
                          We have partnered with BitGo to ensure the safety of your digital assets.Some tokens offered tokens are not covered BitGo at this time. CHeck our Coin/Token list for more info.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_8.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Customizable Dashboard
                        </Head1>
                        <Desc1 >
                          We all consume information differently which is why we want to make sure that what you want to see,in the order you want to see it, is entirely up to you.
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_9.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Basic and Advanced UI
                        </Head1>
                        <Desc1 >
                          You should feel comfortable with our invite UI reagardless of your trading experience.Toggle between 'Basic' and 'Advanced' and use what works best for you!
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_4.png"/>
                        </Feature_img>
                      </Col_Right>
                    </Row1>
                  </div>
                  <div>
                    <Row1>
                      <Col_Left xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:16}} xl={{span:16}} xxl={{span:16}}>
                        <Head1>
                          Affiliate System
                        </Head1>
                        <Desc1 >
                          You love trading crypto so much that you tell friends and family about it. When you do convince them to try it,why not make 
                        </Desc1>
                      </Col_Left>
                      <Col_Right lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
                        <Feature_img>
                          <img src="./images/Homepage/img_3.png"/>
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
