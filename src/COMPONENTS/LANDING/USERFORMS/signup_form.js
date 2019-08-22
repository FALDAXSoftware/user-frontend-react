/* In-built Packages*/
import React, { Component } from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Row, Col, Button, notification, Icon, Progress } from "antd";
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-google'
import "react-password-strength/dist/style.css";

/* Components */
import { Signup, clearSignUp } from 'ACTIONS/authActions';
import { _ACTIVEEYE, _EYE } from 'CONSTANTS/images';

/* Global CONSTANTS */
import { globalVariables } from 'Globals';
/* Styled-Components */
import { Username, WelcomeText, EmailLabel, EmailReq, PassReq } from "./login_form";
let { GOOGLE_SITE_KEY } = globalVariables;

export const LoginWrap = styled.div`
background-color:#f0f3f2;
  min-height:100%;
`
const RowWrap = styled(Row)`
  min-height:100%;
  
  @media(max-width:991px)
  {
    min-height:100%;
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
    margin-top:20px;
    margin-bottom:20px;
  }
  @media(max-width:575px)
  {
    width:250px;    
  }
`
export const FormWrap = styled.div`
  padding-left:80px;
  background-color:#f0f3f2;
  min-height: 100vh;
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
  overflow:auto;
  height: 100vh;
  @media(max-width:991px)
  {
    height:auto;
  }
`
const LoginHead = styled.div`
  font-size: 30px;
  font-family: "Open Sans";
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 3px solid #ced9e0;
  display: inline-block;
  margin-top:30px;
  @media(min-width:1024px) and  (max-width:1440px)
  {
    padding-bottom:0px;
  }
`
const Welcome = styled(WelcomeText)`
  margin-top: 25px;
`
const SubHeading = styled.span`
font-size: 16px;
font-family: "Open Sans";
color: #a3a3a3;
`
const FirstIconS = styled(Icon)`
  font-size:19px;
  display:none;
  margin-left:8px;
  margin-bottom: -4px;
`
const FirstIconF = styled(Icon)`
  font-size:19px;
  display:none;
  margin-left:8px;
  margin-bottom: -4px;
`
const LastIconS = styled(FirstIconS)`
`
const LastIconF = styled(FirstIconF)`
`
const EmailIconS = styled(FirstIconS)`
`
const EmailIconF = styled(FirstIconF)`
`
const PassIconS = styled(FirstIconS)`
  margin-left:18px;
  margin-bottom: -4px;
`
const PassIconF = styled(FirstIconF)`
  margin-left:18px;
  margin-bottom: -4px;
`
const ConfirmIconS = styled(FirstIconS)`
  margin-left:18px;
  margin-bottom: -4px;
`
const ConfirmIconF = styled(FirstIconF)`
  margin-left:18px;
  margin-bottom: -4px;
`
const Full = styled(Username)`
  display:inline-block;
`
export const Email = styled(Username)`
  display:inline-block;
`
const FullReq = styled(EmailReq)`
`
const ConfirmPassReq = styled(EmailReq)`
`
const PhLabel = styled(EmailLabel)`
  margin-top:20px;
`
const Password = styled(Username)`
  display:inline-block;
  padding-right:40px;
`
const Referral = styled(Username)``
export const ButtonLogin = styled(Button)`
  width: 110px;
  background-color: rgb(0, 170, 250);
  color: white;
  margin-top: 50px;
  height: 48px;
  letter-spacing:3px;
  color: white;
  font-size: 16px;
  font-size: 13.217px;
  font-family: "Open Sans";
  font-weight: bold;
  border-radius:30px;
  text-transform: uppercase;
  line-height: 2.875;
  &:hover{
    color:black;
    border:1px solid black;
    background-color: rgb(0, 170, 250);
}
@media(max-width:400px)
{
  display:block;
  margin-top: 30px;
}
  &:hover{
    color:#0f477b;
    border-color:#0f477b;
    background-color:white;
  }
`
const SignWrap = styled.div`
margin-bottom: 60px;
`
export const Sign = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-family: "Open Sans";
  @media (min-width:1024px) and (max-width:1440px)
  {
    margin-top: 13px;
  }
`
export const Signa = styled.a`
font-size: 16px;
font-family: "Open Sans";
color:rgb(0, 170, 250);
font-weight:bold;
&:hover
{
  color:#0f477b;
}
`
const ProgressBar = styled(Progress)`
  width:77%;
`
const FAI = styled.img`
  margin-left:-35px;
  cursor:pointer;
`
const ActiveFAI = styled(FAI)`
  width:24px;
`
class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_msg: null,
      last_msg: null,
      email_msg: null,
      pass_msg: null,
      password: null,
      confirm_password: null,
      confirmPass_msg: null,
      emailIcon: false,
      firstIcon: false,
      lastIcon: false,
      passIcon: false,
      confirmIcon: false,
      stroke: "",
      status: "",
      percent: 0,
      init: "",
      PasswordtypeEye: "password",
      repeatEye: "password",
      qP: "",
      isSignDisable: false,
      recaptchaToken: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dispModal = this.dispModal.bind(this);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this._resendVerLink = this._resendVerLink.bind(this);
  }

  static propTypes = {
    form: formShape,
  };


  /* Life Cycle Methods */

  componentWillReceiveProps(props, newProps) {
    if (props.isSignUp) {
      if (props.isSignUp.status === 200) {
        //this.props.dispModal("thankyou");
        console.log(this.props.form.getFieldValue('email'));
        var email = this.props.form.getFieldValue('email');
        this.props.history.push(`/signup-success/${encodeURIComponent(email)}`);
      } else {
        this.setState({
          recaptchaToken: null
        }, () => {
          this.onLoadRecaptcha();
        });
        this.openNotificationWithIcon('error', 'Sign In', props.isSignUp.err);
      }
      this.setState({ isSignDisable: false });
    }
    this.props.clearSignUp();
  }
  componentDidMount() {
    this.onLoadRecaptcha();
    let queryParams
    if (this.props.isLoggedIn)
      this.props.history.push('/editProfile')

    if (this.props.location.pathname == "/signup") {
      if (this.props.location.search !== "") {
        let qP = this.props.location.search.split("=")
        if (qP[0].includes("refID")) {
          this.setState({ qP: qP[1] });
        }
      }
    }
  }

  _resendVerLink() {
    this.props.history.push('/resend-verification');
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
      this.captchaDemo.execute();
    }
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    // console.log(recaptchaToken, "<= your recaptcha token");
    this.setState({
      recaptchaToken
    });
  }
  /* 
    Page:/reset-form
    This method is called when we submit Signup Form.
  */

  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (this.state.emailIcon === true && this.state.firstIcon === true && this.state.lastIcon === true && this.state.passIcon === true && this.state.confirmIcon === true) {
        this.setState({ isSignDisable: true });
        document.querySelectorAll("#email_icon_success")[0].style.display = "none";
        document.querySelectorAll("#first_icon_success")[0].style.display = "none";
        document.querySelectorAll("#last_icon_success")[0].style.display = "none";
        document.querySelectorAll("#pass_icon_success")[0].style.display = "none";
        document.querySelectorAll("#confirm_icon_success")[0].style.display = "none";
        var obj = {};
        obj['first_name'] = value.first_name;
        obj['last_name'] = value.last_name;
        obj['email'] = value.email;
        obj['password'] = value.password;
        obj['confirm_password'] = value.confirm_password;
        obj['referral_code'] = value.referral_code;
        obj['device_type'] = 0;
        if (this.state.recaptchaToken != null) {
          obj["g_recaptcha_response"] = this.state.recaptchaToken;
          this.setState({ loader: true })
          this.props.Signup(obj);
        } else {
          this.openNotificationWithIcon('error', 'Seems like a robot', "Please try again after reloading the page.");
        }
      } else {
        if (error !== undefined && error !== null) {
          if (error['first_name'] !== undefined) {
            this.onChangeField(value.first_name, 'firstname')
          }
          if (error['last_name'] !== undefined) {
            this.onChangeField(value.last_name, 'lastname')
          }
          if (error['email'] !== undefined) {
            this.onChangeField(value.email, 'email')
          }
          if (error['password'] !== undefined) {
            this.onChangeField(value.password, 'password')
          }
          if (error['confirm_password'] !== undefined) {
            this.onChangeField(value.confirm_password, 'confirm_password')
          }
        }
        //this.openNotificationWithIcon('error', "Error", "Please complete all required details to continue")
      }
    });
  }

  /* 
    Page:/signup
    This method is called when any input field is changed.
  */

  onChangeField(value, field) {
    if (field === "email") {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var bool = re.test(String(value).toLowerCase());
      if (value !== "" && value !== undefined) {
        if (bool === true) {
          this.setState({ emailIcon: true })
          document.querySelector("#email_icon_success").style.display = "inline-block"
          document.querySelector("#email_icon_fail").style.display = "none"
          document.querySelectorAll(".email_sign")[0].style.display = "none";
        } else {
          this.setState({ emailIcon: false })
          document.querySelector("#email_icon_fail").style.display = "inline-block"
          document.querySelector("#email_icon_success").style.display = "none"
          document.querySelectorAll(".email_sign")[0].style.display = "block";
          this.setState({ email_msg: "Email address is not valid" })
        }
      } else {
        this.setState({ emailIcon: false })
        document.querySelector("#email_icon_success").style.display = "none"
        document.querySelector("#email_icon_fail").style.display = "inline-block"
        document.querySelectorAll(".email_sign")[0].style.display = "block";
        if (value === "" || value === undefined) {
          this.setState({ email_msg: "Email address is required" })
        }
      }
    } else if (field === "firstname") {
      var re = /^[a-zA-Z0-9]{2,15}$/;
      var bool = re.test(value);
      if (value !== "" && value !== undefined) {
        if (bool === true) {
          var regexnum = /^[0-9]*$/;
          if (regexnum.test(value)) {
            this.setState({ firstIcon: false })
            document.querySelector("#first_icon_success").style.display = "none"
            document.querySelector("#first_icon_fail").style.display = "inline-block"
            document.querySelectorAll(".first_sign")[0].style.display = "block";
            this.setState({ first_msg: "*Only numbers are not allowed" })
          } else {
            this.setState({ firstIcon: true })
            document.querySelector("#first_icon_success").style.display = "inline-block"
            document.querySelector("#first_icon_fail").style.display = "none"
            document.querySelectorAll(".first_sign")[0].style.display = "none";
          }
        } else {
          this.setState({ firstIcon: false })
          document.querySelector("#first_icon_success").style.display = "none"
          document.querySelector("#first_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".first_sign")[0].style.display = "block";
          this.setState({ first_msg: "*First Name must have min 2, max 15 characters and no special characters are allowed." })
        }
      } else {
        this.setState({ firstIcon: false })
        document.querySelector("#first_icon_success").style.display = "none"
        document.querySelector("#first_icon_fail").style.display = "inline-block"
        document.querySelectorAll(".first_sign")[0].style.display = "block";
        if (value === "" || value === undefined) {
          this.setState({ first_msg: "First name is required." })
        }
      }
    } else if (field === "lastname") {
      var re = /^[a-zA-Z0-9]{2,15}$/;
      var bool = re.test(value);
      if (value !== "" && value !== undefined) {
        if (bool === true) {
          var regexnum = /^[0-9]*$/;
          if (regexnum.test(value)) {
            this.setState({ lastIcon: false })
            document.querySelector("#last_icon_success").style.display = "none"
            document.querySelector("#last_icon_fail").style.display = "inline-block"
            document.querySelectorAll(".last_sign")[0].style.display = "block";
            this.setState({ last_msg: "*Only numbers are not allowed" })
          } else {
            this.setState({ lastIcon: true })
            document.querySelector("#last_icon_success").style.display = "inline-block";
            document.querySelector("#last_icon_fail").style.display = "none";
            document.querySelectorAll(".last_sign")[0].style.display = "none";
          }
        } else {
          this.setState({ lastIcon: false })
          document.querySelector("#last_icon_success").style.display = "none";
          document.querySelector("#last_icon_fail").style.display = "inline-block";
          document.querySelectorAll(".last_sign")[0].style.display = "block";
          this.setState({ last_msg: "*Last Name must have min 2, max 15 characters and no special characters are allowed." })
        }
      } else {
        this.setState({ lastIcon: false })
        document.querySelector("#last_icon_success").style.display = "none";
        document.querySelector("#last_icon_fail").style.display = "inline-block";
        document.querySelectorAll(".last_sign")[0].style.display = "block";
        if (value === "" || value === undefined) {
          this.setState({ last_msg: "Last Name is required" })
        }
      }
    } else if (field === "password") {
      var self = this;
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_])[A-Za-z\d!@#$%_]{8,60}$/;
      var bool = re.test(value);
      var numb = /^\d+$/, letters = /^[A-Za-z]+$/, alphanum = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      this.setState({ password: value }, () => {
        if (self.state.confirm_password !== null && self.state.password !== null)
          self.onChangeField(self.state.confirm_password, "confirm_password")
      });

      if (value !== "" && value !== undefined) {
        if (numb.test(value) || letters.test(value)) { this.setState({ stroke: "red", percent: 20 }) }
        if (alphanum.test(value) && value.length < 6) { this.setState({ stroke: "orange", percent: 40 }) }
        if (alphanum.test(value) && value.length === 8) { this.setState({ stroke: "yellow", percent: 60 }) }
        if (re.test(value) && value.length > 8 && value.length < 60) { this.setState({ stroke: "#7CFC00", percent: 80 }) }
        if (re.test(value) && value.length > 10 && value.length < 60) { this.setState({ stroke: "#008000", percent: 100 }) }
        if (value.length > 60) { this.setState({ stroke: "red", percent: 0 }) }
        if (bool === true) {
          this.setState({ passIcon: true })
          document.querySelector("#pass_icon_success").style.display = "inline-block"
          document.querySelector("#pass_icon_fail").style.display = "none"
          document.querySelectorAll(".pass_sign")[0].style.display = "none";
        } else {
          this.setState({ passIcon: false })
          document.querySelector("#pass_icon_success").style.display = "none"
          document.querySelector("#pass_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".pass_sign")[0].style.display = "block";
          this.setState({ pass_msg: "Your password must contain at least one uppercase letter,one lowercase letter, one special character(!@#$%_), and one number. Minimum 8 characters and maximum 60 characters." })
        }
      } else {
        this.setState({ passIcon: false, percent: 0 })
        document.querySelector("#pass_icon_success").style.display = "none"
        document.querySelector("#pass_icon_fail").style.display = "inline-block"
        document.querySelectorAll(".pass_sign")[0].style.display = "block";
        if (value === "" || value === undefined) {
          this.setState({ pass_msg: "Password is required" })
        }
      }
    } else if (field === "confirm_password") {
      var bool = this.state.password === value ? true : false
      this.setState({ confirm_password: value })
      if (value !== "" && value !== undefined) {
        if (bool === true) {
          this.setState({ confirmIcon: true })
          document.querySelector("#confirm_icon_success").style.display = "inline-block"
          document.querySelector("#confirm_icon_fail").style.display = "none"
          document.querySelectorAll(".confirmPass_sign")[0].style.display = "none";
        } else {
          this.setState({ confirmIcon: false })
          document.querySelector("#confirm_icon_success").style.display = "none"
          document.querySelector("#confirm_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".confirmPass_sign")[0].style.display = "block";
          this.setState({ confirmPass_msg: "*Password doesn't match" })
        }
      } else {
        this.setState({ confirmIcon: false })
        document.querySelector("#confirm_icon_success").style.display = "none"
        if (bool === false) {
          document.querySelector("#confirm_icon_fail").style.display = "none"
          document.querySelectorAll(".confirmPass_sign")[0].style.display = "block";
          this.setState({ confirmPass_msg: "*Password doesn't match" })
        } else {
          document.querySelector("#confirm_icon_fail").style.display = "none"
          document.querySelectorAll(".confirmPass_sign")[0].style.display = "none";
        }
      }
    }
  }

  /* 
    Page:/signup
    This method is called to redirect to login page.
  */

  dispModal() {
    this.props.history.push('/login');
  }

  /* 
    Page:/signup
    This method is called for custom notifications.
  */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  };

  /* 
    Page:/signup
    This method is called for custom notifications.
  */

  handleEye(type) {
    if (type === "new") {
      if (this.state.PasswordtypeEye === "password") {
        this.setState({ PasswordtypeEye: "text" })
      } else {
        this.setState({ PasswordtypeEye: "password" })
      }
    } else {
      if (this.state.repeatEye === "password") {
        this.setState({ repeatEye: "text" })
      } else {
        this.setState({ repeatEye: "password" })
      }
    }
  }

  /* 
    Page:/signup
    This method is called when pressed enter while filling form.
  */

  handleSubmit(event) {
    this.submit();
    event.preventDefault();
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    var me = this;

    return (
      <LoginWrap>
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
            <FormWrap>
              <RightWrap className="wow fadeInDown" >
                <LoginHead>Sign Up</LoginHead>
                <Welcome>A Better Trading Experience is Moments Away</Welcome>
                <SubHeading>Let's Get Started</SubHeading>
                <form onSubmit={this.handleSubmit}>
                  <EmailLabel>First Name*</EmailLabel>
                  <div>
                    <Full {...getFieldProps('first_name', {
                      onChange(e) { me.onChangeField(e.target.value, "firstname") }, // have to write original onChange here if you need
                      initialValue: me.props.init,
                      rules: [{ type: "string", required: true }],
                    })} />
                    <FirstIconS id="first_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <FirstIconF id="first_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <FullReq className="first_sign">{this.state.first_msg}</FullReq>

                  <PhLabel>Last Name*</PhLabel>
                  <div>
                    <Full {...getFieldProps('last_name', {
                      onChange(e) { me.onChangeField(e.target.value, "lastname") }, // have to write original onChange here if you need
                      initialValue: me.props.init,
                      rules: [{ type: "string", required: true }],
                    })} />
                    <LastIconS id="last_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <LastIconF id="last_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <FullReq className="last_sign">{this.state.last_msg}</FullReq>

                  <PhLabel>Email Address*</PhLabel>
                  <div>
                    <Email type="email" {...getFieldProps('email', {
                      onChange(e) { me.onChangeField(e.target.value, "email") }, // have to write original onChange here if you need
                      initialValue: me.props.init,
                      rules: [{ type: "email", required: true }],
                    })}
                    />
                    <EmailIconS id="email_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <EmailIconF id="email_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <EmailReq className="email_sign">{this.state.email_msg}</EmailReq>

                  <PhLabel>Password*</PhLabel>
                  <div>
                    <Password type={this.state.PasswordtypeEye} {...getFieldProps('password', {
                      onChange(e) { me.onChangeField(e.target.value, "password") }, // have to write original onChange here if you need
                      initialValue: me.props.init,
                      rules: [{ type: "string", required: true, min: 8 }],
                    })}
                    />
                    {
                      (this.state.PasswordtypeEye === "password") ? <FAI src={_EYE} onClick={this.handleEye.bind(this, "new")} /> : <ActiveFAI src={_ACTIVEEYE} onClick={this.handleEye.bind(this, "new")} />
                    }
                    <PassIconS id="pass_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <PassIconF id="pass_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <ProgressBar type="line" size="small" percent={this.state.percent} strokeColor={this.state.stroke} />
                  <PassReq className="pass_sign">{this.state.pass_msg}</PassReq>
                  <PhLabel>Confirm Password*</PhLabel>
                  <div>
                    <Password type={this.state.repeatEye} {...getFieldProps('confirm_password', {
                      onChange(e) { me.onChangeField(e.target.value, "confirm_password") }, // have to write original onChange here if you need
                      initialValue: me.props.init,
                      rules: [{ type: "string", required: true, min: 8 }],
                    })}
                    />
                    {
                      (this.state.repeatEye === "password") ?
                        <FAI src={_EYE} onClick={this.handleEye.bind(this, "repeatEye")} />
                        : <ActiveFAI src={_ACTIVEEYE} onClick={this.handleEye.bind(this, "repeatEye")} />
                    }
                    <ConfirmIconS id="confirm_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <ConfirmIconF id="confirm_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <ConfirmPassReq className="confirmPass_sign">{this.state.confirmPass_msg}</ConfirmPassReq>
                  <PhLabel>Referral Code</PhLabel>
                  <div>
                    <Referral {...getFieldProps('referral_code', {
                      onChange() {/* console.log("Hello How are You") */ }, // have to write original onChange here if you need
                      initialValue: this.state.qP === "" ? me.props.init : this.state.qP,
                      rules: [{ type: "string", required: false }],
                    })}
                    />
                  </div>
                  <input style={{ display: "none" }} type="submit" value="Submit" />
                </form>
                {(errors = getFieldError('required')) ? errors.join(',') : null}
                <ButtonLogin onClick={this.submit} disabled={this.state.isSignDisable}>Sign Up</ButtonLogin>
                <br />
                <SignWrap>
                  <Sign>Already Signed Up ?  <Signa onClick={this._resendVerLink}>Resend Verification Link</Signa></Sign>
                  <Sign>
                    Already have an account? <Signa onClick={this.dispModal}>Login</Signa>
                  </Sign>
                </SignWrap>
              </RightWrap>
            </FormWrap>
          </ColRight>
        </RowWrap>
        <ReCaptcha
          ref={(el) => { this.captchaDemo = el; }}
          size="invisible"
          render="explicit"
          sitekey={GOOGLE_SITE_KEY}
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
          badge="bottomleft"
        />
      </LoginWrap>
    );
  }
}

function mapStateToProps(state) {
  return ({
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    isSignUp: state.simpleReducer.isSignUp !== undefined ? state.simpleReducer.isSignUp : undefined
  })
}

const mapDispatchToProps = dispatch => ({
  Signup: (values) => dispatch(Signup(values)),
  clearSignUp: () => dispatch(clearSignUp())
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(SignupForm))
