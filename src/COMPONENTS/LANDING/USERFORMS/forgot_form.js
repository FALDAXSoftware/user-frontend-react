/* In-built Packages*/
import React, { Component } from "react";
import styled from "styled-components";
import { Button, notification, Row, Col } from "antd";
import { connect } from "react-redux";
// import { ReCaptcha } from "react-recaptcha-google";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import SimpleReactValidator from "simple-react-validator";
import FaldaxLoader from "../../../SHARED-COMPONENTS/FaldaxLoader";
/* Components */
import { forgotAction, clearForgot } from "ACTIONS/authActions";
import { globalVariables } from "Globals.js";
import { translate } from "react-i18next";

/* Global CONSTANTS */

/* Styled-Components */
import { Username, FormWrap, WelcomeText, EmailLabel } from "./login_form";
let { GOOGLE_SITE_KEY } = globalVariables;
const RowWrap = styled(Row)`
  min-height: 100%;

  @media (max-width: 991px) {
    min-height: 100vh;
    background-color: #f0f3f2;
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
const LoginHead = styled.div`
  font-size: 30px;
  font-family: "Open Sans";
  color: rgb(35, 38, 45);
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 3px solid #ced9e0;
  display: inline-block;
  // @media (max-width: 400px) {
  //   border-bottom: none;
  // }
`;
const SubText = styled.span`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(163, 163, 163);
`;
const ButtonLogin = styled(Button)`
  width: auto;
  background-color: rgb(0, 170, 250);
  color: white;
  margin-top: 50px;
  height: 48px;
  letter-spacing: 3px;
  color: white;
  font-size: 16px;
  font-size: 13.217px;
  font-family: "Open Sans";
  font-weight: bold;
  border-radius: 30px;
  text-transform: uppercase;
  line-height: 2.875;
  @media (min-width: 1773px) {
    display: block;
  }
  @media (min-width: 1024px) (max-width: 1440px) {
    width: 40%;
    height: 40px;
  }
  @media (max-width: 991px) {
    display: block;
  }
  @media (max-width: 575px) {
    margin-top: 30px;
    margin-bottom: 0px;
  }
  @media (max-width: 400px) {
    width: 100%;
    letter-spacing: 1px;
  }
`;
const LinkWrap = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  > i {
    vertical-align: middle;
    color: rgb(0, 170, 250);
    cursor: pointer;
  }
  > a {
    vertical-align: middle;
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb(0, 170, 250);
    &:hover {
      color: #0f477b;
    }
  }
  &:hover {
    > a,
    i {
      color: #0f477b;
    }
  }
`;
const RightWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  @media (max-width: 991px) {
    height: auto;
  }
`;
export const Icon = styled.i``;
const BackLink = styled.a``;

export const RightLogin = styled.div`
  width: 100%;
  @media (min-width: 2000px) {
    width: 60%;
    margin: 0 auto;
  }
`;

class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgot: false,
      email: "",
      recaptchaToken: null,
      loadCaptch: false
    };
    this.validator = new SimpleReactValidator();
    this.fieldChange = this.fieldChange.bind(this);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.t = this.props.t;
  }
  onLoadRecaptcha() {
    loadReCaptcha(GOOGLE_SITE_KEY);
    this.setState(
      {
        loadCaptch: false
      },
      () => {
        this.setState({
          loadCaptch: true
        });
      }
    );
  }
  verifyCallback(recaptchaToken) {
    this.setState({
      recaptchaToken
    });
  }
  submit = () => {
    if (this.validator.allValid()) {
      this.validator.hideMessages();
      var value = {};
      value.email = this.state.email;

      if (this.state.recaptchaToken != null) {
        value["g_recaptcha_response"] = this.state.recaptchaToken;
        this.setState({ loader: true });
        this.props.forgotAction(value);
        // this.setState({ email: "" });
      } else {
        this.openNotificationWithIcon(
          "error",
          this.t("validations:error_text.message"),
          this.t("general:captcha_not_loaded_error_head.message")
        );
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  /* 
    Page: /forgot-password
    This method is called when you change in fields of Forgot Password Form.
  */
  unload = () => {
    const nodeBadges = document.querySelectorAll(".grecaptcha-badge");
    nodeBadges.forEach((e, index) => {
      if (e.getAttribute("data-style") != "none") {
        document.body.removeChild(e.parentNode);
      }
    });
  };
  componentWillUnmount() {
    this.unload();
  }
  fieldChange(e) {
    var value = e.target.value;
    this.setState({
      email: value
    });
  }

  /* 
    Page: /forgot-password
    This method is called when you want to change to another page and it goes according to user.
  */

  dispModal(pressed) {
    this.props.dispModal(pressed);
  }
  componentDidMount() {
    loadReCaptcha(GOOGLE_SITE_KEY);

    this.onLoadRecaptcha();
  }
  componentWillReceiveProps(props, newProps) {
    if (props.forgot) {
      if (props.forgot.status == 200) {
        this.setState({ email: "", recaptchaToken: null, loader: false });
        this.openNotificationWithIcon(
          "success",
          this.t("validations:success_text.message"),
          props.forgot.message
        );
      } else {
        this.setState({ recaptchaToken: null, loader: false });
        this.openNotificationWithIcon(
          "error",
          this.t("validations:error_text.message"),
          props.forgot.err
        );
      }
      this.onLoadRecaptcha();
      this.props.clearForgot();
    }
  }

  openNotification = () => {
    notification.open({
      message: "Password Reset Link Sent",
      description:
        "The link to reset the password is sent to your Email Address",
      duration: 5,
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
    });
  };

  /* 
    Page: /forgot-password
    This method is called for custom notifications.
  */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }

  render() {
    return (
      <div>
        <RowWrap>
          <ColLeft sm={24} lg={12}>
            <LeftWrap>
              <a
                href={
                  globalVariables.WordpressSiteURL +
                  (localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : "")
                }
              >
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
                <RightLogin>
                  <LoginHead>
                    {this.t("forgot_password_text.message")}
                  </LoginHead>
                  <WelcomeText>
                    {this.t("forgot_password_text.message")}?
                  </WelcomeText>
                  <SubText>{this.t("forgot_message_text.message")}</SubText>
                  <EmailLabel>
                    {this.t("sign_up:email_address_text.message")}*
                  </EmailLabel>
                  <Username
                    type="email"
                    value={this.state.email}
                    onChange={this.fieldChange}
                  />
                  {this.validator.message(
                    "Email_Address",
                    this.state.email,
                    "required|email",
                    "text-danger-validation",
                    {
                      required:
                        this.t("sign_up:email_address_text.message") +
                        " " +
                        this.t("validations:field_is_required.message"),
                      email: this.t("validations:invalid_email_error.message")
                    }
                  )}
                  <ButtonLogin onClick={this.submit}>
                    {this.t("send_reset_link_text.message")}
                  </ButtonLogin>
                  <LinkWrap>
                    <Icon className="material-icons">keyboard_backspace</Icon>
                    <BackLink
                      href="/login"
                      // onClick={() => this.props.history.push("/login")}
                    >
                      {" "}
                      {this.t("back_to_login_text.message")}{" "}
                    </BackLink>
                  </LinkWrap>
                </RightLogin>
              </RightWrap>
            </FormWrap>
          </ColRight>
        </RowWrap>
        {this.state.loader == true ? <FaldaxLoader /> : ""}
        {this.state.loadCaptch && (
          <ReCaptcha
            sitekey={GOOGLE_SITE_KEY}
            verifyCallback={this.verifyCallback}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    forgot: state.simpleReducer.forgot ? state.simpleReducer.forgot : false
  };
}

const mapDispatchToProps = dispatch => ({
  forgotAction: isLoggedIn => dispatch(forgotAction(isLoggedIn)),
  clearForgot: () => dispatch(clearForgot())
});

export default translate(["login_page", "validations", "sign_up", "general"])(
  connect(mapStateToProps, mapDispatchToProps)(ForgotForm)
);
