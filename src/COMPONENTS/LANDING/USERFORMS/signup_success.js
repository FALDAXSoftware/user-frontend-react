/* In-built Packages*/
import React, { Component } from 'react'
import styled from 'styled-components';
import { WelcomeText } from "./login_form";
import { Col, Row } from "antd";
import { globalVariables } from 'Globals.js';

/* Components */
/* Global CONSTANTS */
/* Styled-Components */
const RowWrap = styled(Row)`
  min-height:100%;
  
  @media(max-width:991px)
  {
    background-color:#f0f3f2;
    min-height:100vh;
  }
`
const ColLeft = styled(Col)`
min-height:100vh;
@media(max-width:991px)
  {
    min-height:auto;
    height:auto;
  }
`
const ColRight = styled(Col)`
min-height:100%;
@media(max-width:991px)
  {
    height:auto;
  }
`
const LeftWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/images/LoginBanner.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media(max-width:991px)
  {
    height:auto;
  }
`
const VertImg = styled.img`
  @media(max-width:991px)
  {
    display:none;
  }
`
const HorImg = styled.img`
  display:none;
  @media(max-width:991px)
  {
    display:block;
    width:400px;
    margin-top:30px;
    margin-bottom:30px;
  }
  @media(max-width:575px)
  {
    width:250px;    
  }
`
const FormWrap = styled.div`
  padding-left:100px;
  
  background-color:#f0f3f2;
  min-height: 100vh;
  display:flex;
  align-items:center;
  @media(max-width:991px)
  {
    min-height: auto;
    padding-top:30px;
  }
  @media(max-width:767px)
  {
    padding: 30px;
    
  }
`
const RightWrap = styled.div`
  width:100%;
  @media(max-width:991px)
  {
    height:auto;
  }
`
const LoginHead = styled.div`
  font-size: 30px;
  font-family: "Open Sans";
  color: rgb( 15, 71, 123 );
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 2px solid;
  display: inline-block;
  @media(max-width :400px)
  {
      border-bottom:none;
  }
`
const SubText = styled.span`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 163, 163, 163 );
`

class SignupSuccess extends Component {

  render() {
    return (
      <div>
        <RowWrap >
          <ColLeft sm={24} lg={12}>
            <LeftWrap >
              <a href={globalVariables.WordpressSiteURL}>
                <VertImg className="wow fadeInUp" src="/images/LeftSideLogo.png" />
                <HorImg className="wow fadeInUp" src="/images/logoWhite.png" />
              </a>
            </LeftWrap>
          </ColLeft>
          <ColRight sm={24} lg={12}>
            <FormWrap  >
              <RightWrap className="wow fadeInDown" >
                <LoginHead>Thank You</LoginHead>
                <WelcomeText>We have sent a confirmation email.</WelcomeText>
                <SubText>Please check your email.</SubText>
              </RightWrap>
            </FormWrap>
          </ColRight>
        </RowWrap>
      </div>
    );
  }
}

export default SignupSuccess;
