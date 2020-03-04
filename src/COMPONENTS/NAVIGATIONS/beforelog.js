/* BUilt-in Packages */
import styled from "styled-components";
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";

/* Styled-Components */
export const DayNightMode = styled.div`
  display: inline;
  font-size: 13px;
  padding-right: 10px;
  cursor: pointer;
`;
export const Exchange = styled.div`
  display: inline;
  font-size: 13px;
  font-family: "Open sans";
  color: ${props =>
    props.color ? "#1890ff" : props.theme.mode === "dark" ? "white" : "black"};
  font-weight: 600;
  text-transform: uppercase;
  padding-right: 22px;
  cursor: pointer;
  @media (max-width: 1540px) {
    margin-right: 8px;
    padding-right: 8px;
  }
  @media (max-width: 670px) {
    display: none;
  }
  @media (min-width: 2000px) {
    font-size: 18px;
  }
`;
const LoginText = styled.span`
  //border-left: 1px solid #f0f0f0;
  font-size: 13px;
  font-family: "Open sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 40, 37, 40 )"};
  font-weight: bold;
  margin-right: 15px;
  padding-left: 30px;
  cursor: pointer;
  @media (max-width: 480px) {
    display: none;
  }
  @media (max-width: 1540px) {
    margin-right: 10px;
    padding-left: 18px;
  }
  &:hover {
    color: #1890ff !important;
  }
`;
const SignupButton = styled(Button)`
  background-color: #0f477b;
  border: 2px solid #0f477b;
  border-radius: 20px;
  margin-right: 30px;
  font-size: 13px;
  font-family: "Open sans";
  font-weight: bold;
  padding: 7px 20px 8px;
  height: auto;
  @media (max-width: 480px) {
    display: none;
  }
  @media (max-width: 1440px) {
    margin-right: 10px;
  }
  &:hover {
    background-color: white;
    border-color: #0f477b;
    color: #0f477b;
  }
  &:focus {
    background-color: #0f477b;
    border-color: #0f477b;
    color: white;
  }
`;
const Open = styled.span`
  display: none;
  @media (max-width: 1200px) {
    display: inline-block;
    margin-right: 15px;
  }
`;

export default class Beforelog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: false
    };
  }

  /* 
        Page: on every page after login on top right
        It is called when we have to login/signup page is to be opened.
    */

  dispModal(pressed) {
    this.props.dispModal(pressed);
  }

  /* 
        Page: on every page after login on top right
        It is called when we click to open Ham-Burger Menu in responsive(small Devices).
    */

  openNav() {
    this.props.openNav();
  }

  /* 
        Page: on every page after login on top right
        It is called when we open Coming Soon Modal.
    */

  showComing = () => {
    this.setState({ comingSoon: true });
  };

  handleComing = e => {
    this.setState({ comingSoon: false });
  };

  /* 
        Page: on every page after login on top right
        It is called when we close Coming Soon Modal.
    */

  comingCancel = e => {
    this.setState({ comingSoon: false });
  };

  render() {
    return (
      <div>
        {/*  <Day_night_mode>
                            <span> <FontAwesomeIcon icon={faMoon} color='black' style={{transform: 'rotate(315deg)'}} /> </span>
                        </Day_night_mode>
                        <Exchange>
                            <span  onClick={this.showComing}> CAREERS </span>
                        </Exchange> */}
        {/*   <Exchange onClick={this.showComing}>
                            <span  onClick={this.showComing}> LANGUAGE </span>
                        </Exchange> */}
        <LoginText onClick={() => this.dispModal("login")}>Log in</LoginText>
        <SignupButton
          onClick={() => this.dispModal("signup")}
          type="primary"
          size="large"
        >
          Sign up
        </SignupButton>
        <Open
          //   style={{
          //     fontSize: "30px",
          //     cursor: "pointer",
          //     lineHeight: "76px",
          //     verticalAlign: "middle"
          //   }}
          onClick={() => this.openNav()}
        >
          &#9776;
        </Open>
        <div>
          <Modal
            visible={this.state.comingSoon}
            onOk={this.handleComing}
            className="Coming_soon"
            onCancel={this.comingCancel}
            footer={null}
          >
            <div
            // style={{ textAlign: "center", color: "white" }}
            >
              <h1
              //   style={{ textAlign: "center", color: "white" }}
              >
                Coming Soon
              </h1>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
