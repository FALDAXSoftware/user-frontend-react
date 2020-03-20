/* In-built Packages*/
import React, { Component } from "react";
import { translate } from "react-i18next";
import styled from "styled-components";

/* Components */
/* Global CONSTANTS */
/* Styled-Components */
import { Form_wrap, Welcome_Text } from "./login_form";

const Login_Head = styled.div`
  font-size: 30px;
  font-family: "Open Sans";
  color: rgb(15, 71, 123);
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 2px solid;
  display: inline-block;
  @media (max-width: 400px) {
    border-bottom: none;
  }
`;
const Sub_Text = styled.span`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(163, 163, 163);
`;

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.t = this.props.t;
  }

  render() {
    return (
      <div>
        <Form_Wrap>
          <Login_Head>{this.t("thank_you_text.message")}</Login_Head>
          <Welcome_Text>{this.t("confirmation_text.message")}</Welcome_Text>
          <Sub_Text>{this.t("confirmation_email_text.message")}</Sub_Text>
        </Form_Wrap>
      </div>
    );
  }
}

export default translate(["login_page", "validations"])(ThankYou);
