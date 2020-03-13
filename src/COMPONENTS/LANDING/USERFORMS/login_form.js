/* In-built Packages*/
import React, { Component } from "react";
import { createForm, formShape } from "rc-form";
import styled from "styled-components";
import { Row, Col, Button, notification, Icon } from "antd";
import { connect } from "react-redux";
import { translate } from "react-i18next";
// import { ReCaptcha } from "react-recaptcha-google";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";

/* Components */
import { _EYE, _ACTIVEEYE } from "CONSTANTS/images";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { loginAction, Login, clearLogin } from "ACTIONS/authActions";
import { globalVariables } from "Globals.js";
import { Link } from "react-router-dom";
import { getProfileDataAction } from "../../../ACTIONS/SETTINGS/settingActions";

let { API_URL, GOOGLE_SITE_KEY } = globalVariables;
/* Global CONSTANTS */

/* Styled-Components */
export const LoginWrap = styled.div`
  background-color: #f0f3f2;
  min-height: 100%;
`;
const RowWrap = styled(Row)`
  min-height: 100%;
  @media (max-width: 991px) {
    min-height: 100%;
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
    margin-top: 20px;
    margin-bottom: 20px;
  }
  @media (max-width: 575px) {
    width: 250px;
  }
`;
export const FormWrap = styled.div`
  padding-left: 100px;
  background-color: #f0f3f2;
  min-height: 100vh;
  @media (max-width: 991px) {
    min-height: auto;
    padding-top: 30px;
  }
  @media (max-width: 767px) {
    padding: 30px;
  }
  @media (min-width: 2000px) {
    padding: 0;
  }
`;
const RightWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  > div.fadeInDown {
    width: 100%;
  }
  @media (max-width: 991px) {
    height: auto;
  }
  @media (min-width: 2000px) {
    > div.fadeInDown {
      width: 60%;
      margin: 0 auto;
    }
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
`;
export const WelcomeText = styled.div`
  font-size: 24px;
  font-family: "Open Sans";
  color: #829099;
  font-weight: 600;
  margin-top: 28px;
`;
export const EmailLabel = styled.div`
  font-size: 14px;
  font-family: "Open Sans";
  color: black;
  margin-top: 30px;
`;
export const Username = styled.input`
  display: block;
  background-color: #f8f8f8;
  padding-left: 5px;
  width: 76%;
  border: 1px solid #d4dadf;
  margin-top: 10px;
  transition: 1s;
  border-radius: 5px;
  height: 50px;
  font-size: 16px;
  display: inline-block;
  outline-color: #e0e0e0;
  &:focus,
  &:hover {
    border: 1px solid rgb(0, 170, 250);
    outline: 0;
    box-shadow: none;
  }
  @media (max-width: 767px) {
    width: 85%;
  }
  @media (min-width: 2000px) {
    width: 95%;
  }
`;
export const EmailReq = styled.div`
  display: none;
  color: red;
  font-size: 14px;
  width: 76%;
  @media (min-width: 2000px) {
    width: 95%;
  }
`;
export const UserIconS = styled(Icon)`
  font-size: 19px;
  display: none;
  margin-left: 10px;
`;
export const UserIconF = styled(UserIconS)``;
const PhLabel = styled(EmailLabel)`
  margin-top: 15px;
`;
export const PhoneReq = styled.label`
  display: none;
  color: red;
  font-size: 11px;
  width: 76%;
`;
const Password = styled(Username)`
  font-size: 16px;
  padding-right: 35px;
`;
const PassIconF = styled(UserIconS)`
  &#passlog_icon_fail {
    margin: 0 0 0 20px;
  }
`;
const PassIconS = styled(UserIconF)`
  &#passlog_icon_success {
    margin: 0 0 0 20px;
  }
`;
export const PassReq = styled.label`
  display: none;
  color: red;
  font-size: 14px;
  width: 76%;
  font-weight: normal;
  @media (min-width: 2000px) {
    width: 95%;
  }
`;
const OtpLabel = styled(EmailLabel)`
  width: 76%;
  text-align: justify;
`;
const CheckWrap = styled.div`
  margin-top: 20px;
  width: 76%;
  @media (max-width: 767px) {
    width: 100%;
    text-align: left;
  }
  @media (min-width: 2000px) {
    width: 95%;
  }
`;
const Forgot = styled.a`
  float: right;
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb(0, 170, 250);
  text-align: left;
  &:hover {
    color: #0f477b;
  }
  @media (max-width: 767px) {
    float: none;
  }
`;
const ButtonLogin = styled(Button)`
  width: 110px;
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
  @media (max-width: 400px) {
    display: block;
    margin-top: 30px;
  }
  &:hover {
    color: black;
    border: 1px solid black;
    background-color: rgb(0, 170, 250);
  }
`;
const Sign = styled.div`
  margin-top: 40px;
  font-size: 16px;
  font-family: "Open Sans";
  color: black;
  @media (max-width: 400px) {
    margin-top: 30px;
  }
`;
const Signa = styled.a`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(0, 170, 250);
  font-weight: bold;
  &:hover {
    color: #0f477b;
  }
`;
export const BackUpOtp = styled.div`
  padding-top: 10px !important;
`;
export const ButtonValue = styled.input`
  display: none;
`;
const FAI = styled.img`
  margin-left: -35px;
  cursor: pointer;
`;
const ActiveFAI = styled(FAI)``;

class Login_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_msg: null,
      pass_msg: null,
      otp_msg: null,
      passIcon: null,
      emailIcon: null,
      otpIcon: null,
      typeEye: "password",
      isOtpRequired: false,
      loader: false,
      verify: false,
      recaptchaToken: null,
      showBackUpInput: false,
      backupIcon: null,
      loadCaptch: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.IpVerify = this.IpVerify.bind(this);
    this.tokenVerify = this.tokenVerify.bind(this);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onClickTFA = this.onClickTFA.bind(this);
    this.forgotBackup = this.forgotBackup.bind(this);
    this.t = this.props.t;
  }

  static propTypes = {
    form: formShape
  };
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
  componentDidMount() {
    console.log("jdf");
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    // console.log(recaptchaToken, "<= your recaptcha token");
    this.setState({
      recaptchaToken
    });
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (
        this.state.isOtpRequired === true &&
        this.state.showBackUpInput === false
      ) {
        if (value.otp === null || value.otp === undefined) {
          this.setState({ otpIcon: false });
          document.querySelector("#otp_icon_success").style.display = "none";
          document.querySelector("#otp_icon_fail").style.display =
            "inline-block";
          document.querySelectorAll(".otp_msg")[0].style.display = "block";
          this.setState({ otp_msg: "Otp is required." });
        }
      } else if (
        this.state.showBackUpInput === true &&
        this.state.isOtpRequired === true
      ) {
        if (
          value.twofactor_backup_code === null ||
          value.twofactor_backup_code === undefined
        ) {
          this.setState({ backupIcon: false });
          document.querySelector("#backup_icon_success").style.display = "none";
          document.querySelector("#backup_icon_fail").style.display =
            "inline-block";
          document.querySelectorAll(".backup_msg")[0].style.display = "block";
          this.setState({ backup_msg: "Back-up code is required." });
        }
      }
      if (
        error === null &&
        this.state.emailIcon === true &&
        this.state.passIcon === true &&
        (this.state.isOtpRequired === true
          ? this.state.showBackUpInput === true
            ? this.state.backupIcon === true
            : this.state.otpIcon === true
          : true)
      ) {
        document.querySelectorAll(".pass_msg")[0].style.display = "none";
        document.querySelectorAll(".user_msg")[0].style.display = "none";
        this.setState({ pass_msg: null, email_msg: null });
        var obj = {};
        obj["email"] = value.email;
        obj["password"] = value.password;
        obj["device_type"] = 0;
        if (
          value.otp &&
          value.otp !== null &&
          value.otp.trim() !== "" &&
          value.otp !== undefined
        ) {
          obj["otp"] = value.otp;
        }
        if (
          this.state.showBackUpInput === true &&
          value.twofactor_backup_code &&
          value.twofactor_backup_code !== null &&
          value.twofactor_backup_code.trim() !== "" &&
          value.twofactor_backup_code !== undefined
        ) {
          obj["twofactor_backup_code"] = value.twofactor_backup_code;
        }
        if (this.state.recaptchaToken != null) {
          obj["g_recaptcha_response"] = this.state.recaptchaToken;
          this.setState({ loader: true });
          this.props.Login(obj);
        } else {
          this.openNotificationWithIcon(
            "error",
            "Error",
            "The automated human verification system encountered an error. Please refresh the page and try again. We apologize for any inconvenience."
          );
        }
      } else {
        if (error !== null) {
          if (
            error["password"] !== undefined &&
            (value.password === "" || value.password === undefined)
          ) {
            this.setState({ passIcon: false });
            document.querySelector("#passlog_icon_success").style.display =
              "none";
            document.querySelector("#passlog_icon_fail").style.display =
              "inline-block";
            document.querySelectorAll(".pass_msg")[0].style.display = "block";
            this.setState({ pass_msg: "Password is required" });
          }
          if (error["email"] !== undefined) {
            this.setState({ emailIcon: false });
            document.querySelector("#userlog_icon_success").style.display =
              "none";
            document.querySelector("#userlog_icon_fail").style.display =
              "inline-block";
            document.querySelectorAll(".user_msg")[0].style.display = "block";
            if (this.state.email_msg === null)
              this.setState({ email_msg: "Email is required" });
          }
        } else {
          if (this.state.backupIcon === true) {
            this.onChangeField(
              value.twofactor_backup_code,
              "twofactor_backup_code"
            );
          } else if (this.state.otpIcon === true) {
            this.onChangeField(value.otp, "otp");
          }
        }
      }
    });
  };

  /* 
    Page: /login
    This method is called for when we submit Login Form.
  */

  dispModal(pressed) {
    this.props.history.push("/signup");
  }

  /* 
    Page: /login
    This method is called for custom notifications.
  */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  }

  /* 
    Page: /login
    This method is called for when we change any field in Login Form.
  */

  onChangeField(value, field) {
    if (field === "username") {
      var re = /^[-a-zA-Z0-9~!$%^&*_=+}{\'?]+(\.[-a-zA-Z0-9~!$%^&*_=+}{\'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|AERO|ARPA|BIZ|COM|COOP|EDU|GOV|INFO|INT|MIL|MUSEUM|NAME|NET|ORG|PRO|TRAVEL|MOBI|[a-zA-Z][a-zA-Z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
      var bool = re.test(String(value).toLowerCase());
      if (value !== "") {
        if (bool === true) {
          this.setState({ emailIcon: true });
          document.querySelector("#userlog_icon_success").style.display =
            "inline-block";
          document.querySelector("#userlog_icon_fail").style.display = "none";
          document.querySelectorAll(".user_msg")[0].style.display = "none";
        } else {
          this.setState({ emailIcon: false });
          document.querySelector("#userlog_icon_fail").style.display =
            "inline-block";
          document.querySelector("#userlog_icon_success").style.display =
            "none";
          document.querySelectorAll(".user_msg")[0].style.display = "block";
          this.setState({ email_msg: "Email address is not valid" });
        }
      } else {
        this.setState({ emailIcon: false });
        document.querySelector("#userlog_icon_fail").style.display =
          "inline-block";
        document.querySelector("#userlog_icon_success").style.display = "none";
        document.querySelectorAll(".user_msg")[0].style.display = "block";
        this.setState({ email_msg: "Email address is required" });
      }
    } else if (field === "password") {
      let val = value.trim();
      if (val !== "") {
        this.setState({ passIcon: true, password: value });
        document.querySelector("#passlog_icon_success").style.display = "none";
        document.querySelector("#passlog_icon_fail").style.display = "none";
        document.querySelectorAll(".pass_msg")[0].style.display = "none";
      } else {
        this.setState({ passIcon: false });
        document.querySelector("#passlog_icon_success").style.display = "none";
        document.querySelector("#passlog_icon_fail").style.display =
          "inline-block";
        document.querySelectorAll(".pass_msg")[0].style.display = "block";
        this.setState({ pass_msg: "Password is required" });
      }
    }
    //password shouldn't have validation except required.

    //  else if (field == "password") {
    //   var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,60}$/;
    //   var bool = re.test(value);
    //   if (value !== "") {
    //     if (bool == true) {
    //       /* console.log("passIcon is true") */
    //       this.setState({ passIcon: true, password: value })
    //       document.querySelector("#passlog_icon_success").style.display = "inline-block"
    //       document.querySelector("#passlog_icon_fail").style.display = "none"
    //       document.querySelectorAll(".pass_msg")[0].style.display = "none";
    //     } else {
    //       this.setState({ passIcon: false })
    //       document.querySelector("#passlog_icon_success").style.display = "none"
    //       document.querySelector("#passlog_icon_fail").style.display = "inline-block"
    //       document.querySelectorAll(".pass_msg")[0].style.display = "block";
    //       this.setState({ pass_msg: "Your password contain at least one letter, one special character, and one number. Minimum 8 characters and maximum 60 characters." })
    //     }
    //   } else {
    //     this.setState({ passIcon: false })
    //     document.querySelector("#passlog_icon_success").style.display = "none"
    //     document.querySelector("#passlog_icon_fail").style.display = "none"
    //     document.querySelectorAll(".pass_msg")[0].style.display = "none";
    //   }
    // }
    else if (field === "otp") {
      // var re = /^\b[a-zA-Z0-9]{6}\b|\b[a-zA-Z0-9]{6}\b/;
      var re = /^[0-9]{1,6}$/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool === true) {
          this.setState({ otpIcon: true, backupIcon: false });
          document.querySelector("#otp_icon_success").style.display =
            "inline-block";
          document.querySelector("#otp_icon_fail").style.display = "none";
          document.querySelectorAll(".otp_msg")[0].style.display = "none";
        } else {
          this.setState({ otpIcon: false });
          document.querySelector("#otp_icon_success").style.display = "none";
          document.querySelector("#otp_icon_fail").style.display =
            "inline-block";
          document.querySelectorAll(".otp_msg")[0].style.display = "block";
          this.setState({
            otp_msg: "Your Two-Factor Authentication code should be six digits."
          });
        }
      } else {
        this.setState({ otpIcon: false });
        document.querySelector("#otp_icon_success").style.display = "none";
        document.querySelector("#otp_icon_fail").style.display = "inline-block";
        document.querySelectorAll(".otp_msg")[0].style.display = "block";
        this.setState({ otp_msg: "Otp is required." });
      }
    } else if (field === "twofactor_backup_code") {
      // var re = /^\b[a-zA-Z0-9]{10}\b|\b[a-zA-Z0-9]{10}\b/;
      var re = /^[a-zA-Z0-9]{10}$/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool === true) {
          this.setState({ backupIcon: true, otpIcon: false });
          document.querySelector("#backup_icon_success").style.display =
            "inline-block";
          document.querySelector("#backup_icon_fail").style.display = "none";
          document.querySelectorAll(".backup_msg")[0].style.display = "none";
        } else {
          this.setState({ backupIcon: false });
          document.querySelector("#backup_icon_success").style.display = "none";
          document.querySelector("#backup_icon_fail").style.display =
            "inline-block";
          document.querySelectorAll(".backup_msg")[0].style.display = "block";
          this.setState({
            backup_msg: "Back-up code should have 10 alphanumeric characters."
          });
        }
      } else {
        this.setState({ backupIcon: false });
        document.querySelector("#backup_icon_success").style.display = "none";
        document.querySelector("#backup_icon_fail").style.display =
          "inline-block";
        document.querySelectorAll(".backup_msg")[0].style.display = "block";
        this.setState({ backup_msg: "Back-up code is required." });
      }
    }
  }

  /* 
    Page: /login
    This method is called when click eye to show hide password.
  */

  handleEye(e) {
    if (document.getElementById("logPass").type !== undefined) {
      if (document.getElementById("logPass").type === "password") {
        this.setState({ typeEye: "text" });
      } else {
        this.setState({ typeEye: "password" });
      }
    }
  }

  componentDidMount() {
    document.cookie = "isLoggedInPreprod=false; domain=faldax.com";

    if (!this.props.isLoggedIn) {
      loadReCaptcha(GOOGLE_SITE_KEY);
      // alert("mount");
      this.onLoadRecaptcha();
    }
    if (this.getUrlParameter("token")) {
      this.tokenVerify();
    }
    if (this.getUrlParameter("emailCode")) {
      this.newEmailVerify();
    }
    if (this.getUrlParameter("IpVerifyToken")) {
      this.IpVerify();
    }
  }
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
  componentWillReceiveProps(props, newProps) {
    if (props.errorStatus) {
      if (props.errorStatus.status == 200) {
        this.openNotificationWithIcon(
          "success",
          "Success",
          props.errorStatus.message
        );
        // console.log("thisd^^^", props.errorStatus.user.is_kyc_done);
        if (this.state.verify == true) {
          this.openNotificationWithIcon(
            "success",
            "Login Successful",
            props.errorStatus.message
          );
          this.setState({ loader: false, verify: true });
        }
      } else if (props.errorStatus.status == 201) {
        this.setState(
          { loader: false, recaptchaToken: null, isOtpRequired: true },
          () => {
            this.onLoadRecaptcha();
          }
        );
        // document.querySelector("#otp-field").focus();
        /* this.openNotificationWithIcon('error', 'Error', props.errorStatus.err); */
      } else if (props.errorStatus.status == 202) {
        this.setState({ loader: false, recaptchaToken: null }, () => {
          this.onLoadRecaptcha();
        });
        this.openNotificationWithIcon(
          "warning",
          "Warning",
          props.errorStatus.err
        );
      } else {
        this.setState({ loader: false, recaptchaToken: null }, () => {
          this.onLoadRecaptcha();
        });
        this.openNotificationWithIcon("error", "Error", props.errorStatus.err);
      }
      this.props.clearLogin();
    }
  }

  IpVerify() {
    var queryObj = {};
    queryObj["token"] = this.getUrlParameter("IpVerifyToken");
    this.setState({ loader: true });

    fetch(API_URL + "/users/verify-new-ip", {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.propsisLoggedIn
      },
      body: JSON.stringify(queryObj)
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ loader: false });
        if (responseData.status === 200) {
          responseData.message = "";
          this.props.loginAction(responseData);
          this.setState({ verify: true });
          this.openNotificationWithIcon(
            "success",
            "Verified",
            responseData.message
          );
        } else if (responseData.status === 201) {
          this.setState({ verify: true });
          this.openNotificationWithIcon(
            "success",
            "Verified",
            responseData.message
          );
          this.props.history.push("/login");
        } else {
          this.openNotificationWithIcon(
            "error",
            "Not Verified",
            responseData.err
          );
        }
      })
      .catch(error => {
        /* console.log(error) */
      });
  }

  /* 
    Page: /login
    This method is called when we want to email verify confirmation.
  */

  tokenVerify() {
    var queryObj = {};
    queryObj["email_verify_token"] = this.getUrlParameter("token");
    this.setState({ loader: true });
    fetch(API_URL + "/users/verify-user", {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.propsisLoggedIn
      },
      body: JSON.stringify(queryObj)
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ loader: false });
        if (responseData.status === 200) {
          this.openNotificationWithIcon(
            "success",
            "Verified",
            responseData.message
          );
        } else
          this.openNotificationWithIcon(
            "error",
            "Not Verified",
            responseData.err
          );
      })
      .catch(error => {
        /* console.log(error) */
      });
  }

  /* 
    Page: /login
    This method is called when we want to new email verify confirmation.
  */

  newEmailVerify() {
    var queryObj = {};
    queryObj["new_email_verify_token"] = this.getUrlParameter("emailCode");
    this.setState({ loader: true });
    fetch(API_URL + "/users/verify-new-email", {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.propsisLoggedIn
      },
      body: JSON.stringify(queryObj)
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ loader: false });
        if (responseData.status === 200) {
          this.setState({ verify: true }, () => {
            this.props.loginAction(responseData);
          });
          //this.openNotificationWithIcon('success', 'Verified', responseData.message);
        } else
          this.openNotificationWithIcon(
            "error",
            "Not Verified",
            responseData.err
          );
      })
      .catch(error => {
        /* console.log(error) */
      });
  }

  /* 
    Page: /login
    This method is called when we submit the Form.
  */

  handleSubmit(event) {
    this.submit();
    event.preventDefault();
  }

  /* 
    Page: /forgot-password
    This method is called when forgot password.
  */

  _goToForgotPwd = () => {
    this.props.history.push("/forgot-password");
  };

  /* 
    Page: /login
    This method is called to get parameter from the URL.
  */

  getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
  }

  onClickTFA() {
    this.setState({
      showBackUpInput: !this.state.showBackUpInput
    });
  }

  forgotBackup() {
    var email = this.props.form.getFieldValue("email");
    this.props.history.push(`/profile-backup/${encodeURIComponent(email)}`);
  }

  render() {
    if (this.props.isLoggedIn) {
      if (
        this.props.location.state &&
        this.props.location.state.from &&
        this.props.location.state.from.pathname == "/open-ticket"
      ) {
        this.props.history.push(this.props.location.state.from.pathname);
      } else if (
        this.props.location.state &&
        this.props.location.state.from &&
        this.props.location.state.from.pathname == "/simplex"
      ) {
        this.props.history.push(this.props.location.state.from.pathname);
      } else if (
        this.props.location.state &&
        this.props.location.state.from &&
        this.props.location.state.from.pathname == "/crypto-conversion"
      ) {
        this.props.history.push(this.props.location.state.from.pathname);
      } else {
        // console.log("^^^^logimn", this.props.isKYCDone);
        if (this.props.isKYCDone == 2) {
          this.props.history.push("/conversion");
        } else {
          this.props.history.push("/editProfile");
        }
      }
    }
    var me = this;
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <LoginWrap>
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
          <ColRight sm={24} lg={12} className="login_main_div">
            <FormWrap>
              <RightWrap>
                <div className="wow fadeInDown">
                  <LoginHead>Login</LoginHead>
                  <WelcomeText>Welcome To FALDAX!</WelcomeText>
                  <EmailLabel>Email Address*</EmailLabel>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <Username
                        type="email"
                        disabled={this.state.isOtpRequired}
                        {...getFieldProps("email", {
                          onChange(e) {
                            me.onChangeField(e.target.value, "username");
                          }, // have to write original onChange here if you need
                          rules: [{ type: "email", required: true }]
                        })}
                      />
                      <UserIconS
                        id="userlog_icon_success"
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                      <UserIconF
                        id="userlog_icon_fail"
                        type="close-circle"
                        theme="twoTone"
                        twoToneColor="red"
                      />
                    </div>
                    <EmailReq className="user_msg">
                      {this.state.email_msg}
                    </EmailReq>
                    <PhLabel>Password*</PhLabel>
                    <div>
                      <Password
                        disabled={this.state.isOtpRequired}
                        id="logPass"
                        type={this.state.typeEye}
                        {...getFieldProps("password", {
                          onChange(e) {
                            me.onChangeField(e.target.value, "password");
                          }, // have to write original onChange here if you need
                          rules: [{ type: "string", required: true }]
                        })}
                      />
                      {this.state.typeEye === "password" ? (
                        <FAI src={_EYE} onClick={this.handleEye.bind(this)} />
                      ) : (
                        <ActiveFAI
                          src={_ACTIVEEYE}
                          onClick={this.handleEye.bind(this)}
                        />
                      )}
                      <PassIconS
                        id="passlog_icon_success"
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                      <PassIconF
                        id="passlog_icon_fail"
                        type="close-circle"
                        theme="twoTone"
                        twoToneColor="red"
                      />
                    </div>
                    <PassReq className="pass_msg">
                      {this.state.pass_msg}
                    </PassReq>

                    {this.state.isOtpRequired && !this.state.showBackUpInput ? (
                      <div>
                        <OtpLabel>
                          Two-Factor Authentication is enabled for this account.
                          Please enter your 2FA code below to proceed.
                        </OtpLabel>
                        <div>
                          <Username
                            id="otp-field"
                            {...getFieldProps("otp", {
                              onChange(e) {
                                me.onChangeField(e.target.value, "otp");
                              }, // have to write original onChange here if you need
                              rules: [{ required: true }]
                            })}
                          />
                          <UserIconS
                            id="otp_icon_success"
                            type="check-circle"
                            theme="twoTone"
                            twoToneColor="#52c41a"
                          />
                          <UserIconF
                            id="otp_icon_fail"
                            type="close-circle"
                            theme="twoTone"
                            twoToneColor="red"
                          />
                        </div>
                        <PassReq className="otp_msg">
                          {this.state.otp_msg}
                        </PassReq>
                      </div>
                    ) : (
                      ""
                    )}
                    <ButtonValue type="submit" value="Submit" />
                  </form>
                  {!this.state.isOtpRequired && (
                    <CheckWrap>
                      <Forgot href="/forgot-password">Forgot Password?</Forgot>
                    </CheckWrap>
                  )}
                  {this.state.isOtpRequired && !this.state.showBackUpInput ? (
                    <CheckWrap>
                      {/* <Remember>
                      <Check type="checkbox" /> Remember Me</Remember> */}
                      <Forgot onClick={this.onClickTFA}>
                        Don't have Two-Factor Authentication?
                      </Forgot>
                    </CheckWrap>
                  ) : (
                    ""
                  )}
                  {this.state.showBackUpInput ? (
                    <CheckWrap>
                      {/* <Remember>
                      <Check type="checkbox" /> Remember Me</Remember> */}
                      <Forgot onClick={this.onClickTFA}>
                        Have Two-Factor Authentication?
                      </Forgot>
                    </CheckWrap>
                  ) : (
                    ""
                  )}
                  {this.state.showBackUpInput && (
                    <BackUpOtp className="backuptext">
                      <OtpLabel>
                        Please enter your Back-up code below to proceed.
                      </OtpLabel>
                      <div>
                        <Username
                          id="backUpCode"
                          {...getFieldProps("twofactor_backup_code", {
                            onChange(e) {
                              me.onChangeField(
                                e.target.value,
                                "twofactor_backup_code"
                              );
                            }, // have to write original onChange here if you need
                            rules: [{ required: false }]
                          })}
                        />
                        <UserIconS
                          id="backup_icon_success"
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                        />
                        <UserIconF
                          id="backup_icon_fail"
                          type="close-circle"
                          theme="twoTone"
                          twoToneColor="red"
                        />
                      </div>
                      <PassReq className="backup_msg">
                        {this.state.backup_msg}
                      </PassReq>
                    </BackUpOtp>
                    /* </div> */
                  )}
                  {this.state.showBackUpInput && (
                    <CheckWrap>
                      <Forgot onClick={this.forgotBackup}>
                        Forgot Backup Code?
                      </Forgot>
                    </CheckWrap>
                  )}
                  {(errors = getFieldError("required"))
                    ? errors.join(",")
                    : null}
                  <ButtonLogin
                    disabled={this.state.loader}
                    onClick={this.submit}
                  >
                    LOGIN
                  </ButtonLogin>
                  <Sign>
                    No account?{" "}
                    <Signa
                      href="/signup"
                      // onClick={() => this.dispModal("signup")}
                    >
                      Sign Up
                    </Signa>
                  </Sign>
                  {this.state.loader === true ? <FaldaxLoader /> : ""}
                </div>
              </RightWrap>
            </FormWrap>
          </ColRight>
        </RowWrap>
        {/* <ReCaptcha
          ref={el => {
            this.captchaDemo = el;
          }}
          size="invisible"
          render="explicit"
          sitekey={GOOGLE_SITE_KEY}
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
          badge="bottomleft"
        /> */}
        {this.state.loadCaptch && (
          <ReCaptcha
            sitekey={GOOGLE_SITE_KEY}
            action="login"
            verifyCallback={this.verifyCallback}
          />
        )}
      </LoginWrap>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    errorStatus:
      state.simpleReducer.errorStatus !== undefined
        ? state.simpleReducer.errorStatus
        : undefined,
    isKYCDone: state.simpleReducer.isKYCDone
    // isOtpRequired:state.simpleReducer.isOtpRequired,
  };
}

const mapDispatchToProps = dispatch => ({
  Login: values => dispatch(Login(values)),
  clearLogin: () => dispatch(clearLogin()),
  getProfileDataAction: isLoggedIn =>
    dispatch(getProfileDataAction(isLoggedIn)),
  loginAction: value => dispatch(loginAction(value))
});

export default translate(["referral"])(
  connect(mapStateToProps, mapDispatchToProps)(createForm()(Login_Form))
);
