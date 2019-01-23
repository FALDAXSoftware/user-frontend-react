/* In-built Packages*/
import React, { Component } from 'react'
import styled from 'styled-components';


import { Form_wrap, Welcome_text } from "./Login_Form";

/* Components */
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

class Thank_You extends Component {
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
