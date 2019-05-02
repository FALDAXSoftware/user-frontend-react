/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { globalVariables } from "Globals"
let { API_URL, _AMAZONBUCKET } = globalVariables;

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 25px;
  background-color: ${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
`
const ProfileDiv = styled.div`
  background-color: ${props => props.theme.mode == "dark" ? "#041422" : "#ffffff"};
  margin:auto;
  width: 100%;
  max-width: 1170px;
  border-radius: 7px;
  padding: 35px 30px 30px 30px;
  @media(max-width:768px)
  {
    padding: 15px;
  }
`
const About_Faldax_Title = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode == "dark" ? "white" : ""};
  &:before {
    content: '';
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
  @media(max-width:767px)
  {
    &:before {
      display:none;
    }
    &:after {
      display:none;
    }
  }
`;
const FirstRow = styled(Row)`
  padding-top: 20px;
  @media(max-width:767px)
  {
    & a
    {
      padding-top: 20px;
    }
  }
`
const SecondRow = styled(Row)`
  margin-top: 70px;
  margin-bottom: 50px;
  @media(max-width:767px)
  {
    margin-top: 0px;
    & a
    {
      padding-top: 20px;
    }
  }
`
const CustomCard = styled(Card)`
  width: 100%; 
  border-color: #e2e6ea;
  background-color: #f8f8f8;
  border-radius: 5px;
  &:hover{
    border-color: #1890ff;
    color:#1890ff !important;
  }
`
const PContainer = styled.p`
text-align: center;
justify-content: center;
height: 100px;
display: flex; 
align-items: center;
margin-bottom: 0px;
`
const CardText = styled.h4`
  margin-bottom: 0px;
  font-family: "Open Sans";
  color:inherit;
`
const Content = styled.div`
  color:${props => props.theme.mode == "dark" ? "white" : ""} !important;
`
const DivWrap = styled.div`
  margin-top:20px;
`

/* Styled Components */
/* Component Definition Starts Here*/

export default class Policy extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navigation />
        <OverlayLoader
          color={'red'} // default is white
          loader="ScaleLoader" // check below for more loaders
          text="Loading... Please wait!"
          active={false}
          backgroundColor={'black'} // default is black
          opacity=".4" // default is .9  
        >
          <ProfileWrapper>
            <ProfileDiv>
              <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                <About_Faldax_Title>Policies </About_Faldax_Title>
              </div>
              <Content style={{ marginTop: '20px' }}>
                {/* Blocks start */}
                <FirstRow >
                  <Col md={{ span: 6, offset: 5 }} xl={{ span: 6, offset: 5 }}>
                    <DivWrap>
                      <a href={_AMAZONBUCKET + "assets/pdf/FALDAX+Terms+of+Service.pdf"} target="_blank">
                        <CustomCard>
                          <PContainer>
                            <CardText>
                              Terms of Service
                        </CardText>
                          </PContainer>
                        </CustomCard>
                      </a>
                    </DivWrap>
                  </Col>
                  <Col md={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                    <DivWrap>
                      <a href={_AMAZONBUCKET + "assets/pdf/FALDAX+Privacy+Policy.pdf"} target="_blank">
                        <CustomCard>
                          <PContainer>
                            <CardText>
                              Privacy Policy
                        </CardText>
                          </PContainer>
                        </CustomCard>
                      </a>
                    </DivWrap>
                  </Col>
                </FirstRow>

                <SecondRow>
                  <Col md={{ span: 6, offset: 5 }} xl={{ span: 6, offset: 5 }}>
                    <DivWrap>
                      <a href={_AMAZONBUCKET + "assets/pdf/FALDAX+Anti-Money+Laundering+Policy+v2.pdf"} target="_blank">
                        <CustomCard>
                          <PContainer>
                            <CardText>
                              Anti-Money Laundering Policy
                        </CardText>
                          </PContainer>
                        </CustomCard>
                      </a>
                    </DivWrap>
                  </Col>
                  <Col md={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                    <DivWrap>
                      <a href={_AMAZONBUCKET + "assets/pdf/FALDAX+Cookie+Policy.pdf"} target="_blank">
                        <CustomCard>
                          <PContainer>
                            <CardText>
                              Cookies Policy
                        </CardText>
                          </PContainer>
                        </CustomCard>
                      </a>
                    </DivWrap>
                  </Col>
                </SecondRow>
                {/* Blocks end */}
              </Content>
            </ProfileDiv>
          </ProfileWrapper>
          <CommonFooter />
        </OverlayLoader>
      </div>
    );
  }
}
