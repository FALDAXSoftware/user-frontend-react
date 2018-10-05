/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Button, notification } from "antd";
import { Username, Form_wrap, Welcome_text, Email_label, Email_req } from "./Login_Form";
import { connect } from "react-redux"

/* Components */
import { forgotAction } from "../../../Actions/Auth"

/* Global Constants */

/* Styled-Components */

const Login_head = styled.div`
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
const Sub_text = styled.span`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 163, 163, 163 );
`

const Full = styled.input`
  display:block;
  background-color: #f8f8f8;
  border: 0px;
  width: 76%;
  margin-top:10px;
  height:50px;
`
const Ph_Label = styled(Email_label)`
  margin-top:20px;
`
const Password = styled(Username)`

`
const Check_wrap = styled.div`
  margin-top:35px;
  width:76%;
`
const Remember = styled.div`
  display: inline-block;
`
const Check = styled.input`
  vertical-align:middle;
`
const Forgot = styled.a`
  float:right;
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb( 15, 71, 123 );
  text-align: left;
`
const Button_login = styled(Button)`
  width: 190px;;
  background-color: #0f477b;
  color: white;
  margin-top: 50px;
  height: 45px;
  letter-spacing:3px;
  color: white;
  font-size: 16px;
  font-size: 13.217px;
  font-family: "Open Sans";
  font-weight: bold;
  text-transform: uppercase;
  line-height: 2.875;
  @media (min-width:1024px) (max-width:1440px)
  {
    width:40%;
    height:40px;
  }
`
const Sign = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
`
const Sign_a = styled.a`
  font-size: 16px;
  font-family: "Open Sans";
  color:#0f477b;
  font-weight:bold;
`
const Link_wrap = styled.div`
    margin-top:50px;
`
const Icon = styled.i`
    vertical-align: middle;
    color: rgb( 15, 71, 123 );
`
const Back_link = styled.a`
    vertical-align: middle;
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
`
class Thank_You extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {

    return (
      <div>
        <Form_wrap>
          <Login_head>Thank You</Login_head>
          <Welcome_text>We have sent a confirmation email.</Welcome_text>
          <Sub_text>Please check your email.</Sub_text>
        </Form_wrap>
      </div>
    );

  }
}


export default Thank_You;
