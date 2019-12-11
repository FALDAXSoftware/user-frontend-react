/* In-built Packages*/
import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row, notification } from "antd";
import SimpleReactValidator from "simple-react-validator";

import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { Email, ButtonLogin, Sign, Signa } from "./signup_form";
import { EmailLabel } from "./login_form";

let { API_URL } = globalVariables;
/* Components */
/* Global CONSTANTS */
/* Styled-Components */
const RowWrap = styled(Row)`
  min-height: 100%;

  @media (max-width: 991px) {
    background-color: #f0f3f2;
    min-height: 100vh;
  }
`;
const ColLeft = styled(Col)`
  min-height: 100vh;
  @media (max-width: 991px) {
    min-height: auto;
    height: auto;
  }
`;
const ColRight = styled(Col)`
  min-height: 100%;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const LeftWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/images/LoginBanner.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const VertImg = styled.img`
  @media (max-width: 991px) {
    display: none;
  }
`;
const HorImg = styled.img`
  display: none;
  @media (max-width: 991px) {
    display: block;
    width: 400px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @media (max-width: 575px) {
    width: 250px;
  }
`;
const FormWrap = styled.div`
  padding-left: 100px;

  background-color: #f0f3f2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  @media (max-width: 991px) {
    min-height: auto;
    padding-top: 30px;
  }
  @media (max-width: 767px) {
    padding: 30px;
  }
`;
const RightWrap = styled.div`
  width: 100%;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const LoginHead = styled.div`
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
const SubText = styled.span`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(163, 163, 163);
`;
const VerifyEmail = styled(Email)`
  margin-top: 10px;
  display: block;
`;
const ButtonResend = styled(ButtonLogin)`
  margin-top: 10px;
`;
class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: ""
      }
    };
    this.validator = new SimpleReactValidator();
  }

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  }
  dispModal = () => {
    this.props.history.push("/login");
  };
  _resendVerification = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ loader: true });
      fetch(API_URL + "/users/resend-email", {
        method: "post",
        body: JSON.stringify(this.state.fields)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status == 200) {
            this.setState({ loader: false });
            var email = this.state.fields.email;
            this.props.history.push(
              `/signup-success/${encodeURIComponent(email)}`
            );
          } else {
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "warning",
              responseData.err,
              "Please check it by logging in."
            );
          }
        })
        .catch(error => {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Something went wrong!"
          );
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };
  _handleChange = e => {
    let fields = {};
    if (e.target.value.trim() !== "") fields["email"] = e.target.value;
    else fields["email"] = "";

    this.setState({
      fields
    });
  };
  render() {
    return (
      <div>
        <RowWrap>
          <ColLeft sm={24} lg={12}>
            <LeftWrap>
              <a href={globalVariables.WordpressSiteURL}>
                <VertImg
                  className="wow fadeInUp"
                  src="/images/LeftSideLogo.png"
                />
                <HorImg className="wow fadeInUp" src="/images/logoWhite.png" />
              </a>
            </LeftWrap>
          </ColLeft>
          <ColRight sm={24} lg={12}>
            <FormWrap>
              <RightWrap className="wow fadeInDown">
                <LoginHead>Resend Verification Link</LoginHead>
                <EmailLabel>Enter Email:</EmailLabel>
                <form onSubmit={this._resendVerification}>
                  <VerifyEmail
                    name="email"
                    value={this.state.fields.email}
                    onChange={this._handleChange}
                  />
                  {this.validator.message(
                    "email",
                    this.state.fields.email,
                    "required|email",
                    "text-danger-validation"
                  )}
                  <br />
                  <ButtonResend type="submit">RE-SEND</ButtonResend>
                </form>
                <Sign>
                  Already have an account?{" "}
                  <Signa onClick={this.dispModal}>Login</Signa>
                </Sign>
              </RightWrap>
            </FormWrap>
          </ColRight>
        </RowWrap>
        {this.state.loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false
  };
}

export default withRouter(connect(mapStateToProps, null)(EmailVerification));
