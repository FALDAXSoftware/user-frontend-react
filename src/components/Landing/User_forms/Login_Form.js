/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Button, notification, Icon } from "antd";
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
/* Components */
import { Login,clearLogin } from '../../../Actions/Auth';
/* Global Constants */

/* Styled-Components */
export const Form_wrap = styled.div`
  padding-left:60px;
  padding-top:60px;

  @media(min-width:1024px) and  (max-width:1440px)
  {
    padding-left: 30px;
    padding-top: 10px;
  }
`
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
  @media(min-width:1024px) and  (max-width:1440px)
  {
    padding-bottom:0px;
  }
`
export const Welcome_text = styled.div`
  font-size: 24px;
  font-family: "Open Sans";
  color: rgb( 0, 0, 0 );
  font-weight: bold;
  margin-top:60px;
  @media(min-width:1024px) and  (max-width:1440px)
  {
    margin-top: 15px;
  }
`
export const Email_label = styled.div`
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: bold;
  color: black;
  margin-top: 50px;
  @media(min-width:1024px) and  (max-width:1440px)
  {
    margin-top: 25px;
  }
`
export const Username = styled.input`
  display:block;
  background-color: #f8f8f8;
  padding-left:5px;
  border: 0px;
  width: 76%;
  margin-top:10px;
  height:50px;
  font-size:16px;
  display:inline-block;
  @media(min-width:1024px) and (max-width:1440px)
  {
    height:35px;
  }
`
export const Email_req = styled.div`
  display:none;
  color:red;
  font-size:10px;
  width:76%;
`
export const UserIconS = styled(Icon)`
  font-size:19px;
  display:none;
  margin-left:10px;
`
export const UserIconF = styled(UserIconS)`
`
const Ph_Label = styled(Email_label)`
  margin-top:15px;
`
export const Phone_req = styled.label`
  display:none;
  color:red;
  font-size:10px;
  width:76%;
`
const Password = styled(Username)`
  font-size:16px;
`
const PassIconF = styled(UserIconS)`
`
const PassIconS = styled(UserIconF)`
`
export const Pass_req = styled.label`
  display:none;
  color:red;
  font-size:10px;
  width:76%;
`
const OtpLabel = styled(Email_label)`
    width: 76%;
    text-align: justify;
`
const Check_wrap = styled.div`
  margin-top:35px;
  width:76%;
  @media(min-width:1024px) and  (max-width:1440px)
  {
    margin-top: 20px;
  }
`
const Remember = styled.div`
  display: inline-block;
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: bold;
  color: black;

  @media(max-width:400px)
  {
    display:block;
  }
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

  @media(max-width:400px)
  {
    float:left;
    margin-top: 15px;
  }
`
const Button_login = styled(Button)`
  width: 110px;
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
  @media(max-width:400px)
  {
    display:block;
    margin-top: 70px;
  }
  @media (min-width:1024px) and (max-width:1440px)
  {
    margin-top: 40px;
  }
`
const Sign = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
  @media(max-width:400px)
  {
    margin-top: 50px;
  }
  @media (min-width:1024px) and (max-width:1440px)
  {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`
const Sign_a = styled.a`
  font-size: 16px;
  font-family: "Open Sans";
  color:#0f477b;
  font-weight:bold;
`
const FAI = styled(FontAwesomeIcon)`
  margin-left:10px;
  cursor:pointer;
`
class Login_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email_msg: null,
      pass_msg: null,
      otp_msg:null,
      passIcon: null,
      emailIcon: null,
      otpIcon:null,
      typeEye:"password",
      isOtpRequired:false,
    }
  }

  static propTypes = {
    form: formShape,
  };

  componentDidMount = () => {
    /* console.log('LOGIN') */
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      /* console.log("validate Fields",error,value,this.state) */
      if (error == null && this.state.passIcon==true && this.state.emailIcon==true ) {
        document.querySelectorAll(".pass_msg")[0].style.display = "none";
        document.querySelectorAll(".user_msg")[0].style.display = "none";
        this.setState({ pass_msg: null, email_msg: null });

        if (this.props.forgotParam !== undefined)
        {value['email_verify_token'] = this.props.forgotParam[1];}
        /* console.log("I am in") */
          this.props.Login(value);
      }
      else
      {
        this.openNotificationWithIcon("error","Login","Please Enter all Required fields")
      }
    });
  }

  dispModal(pressed) {
    this.props.dispModal(pressed)
  }

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  };

  onChangeField(value, field) {
    if (field == "username") {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var bool = re.test(String(value).toLowerCase());
      if (value !== "") {
        if (bool == true) {
          /* console.log("EmailICON is true") */
          this.setState({ emailIcon: true })
          document.querySelector("#userlog_icon_success").style.display = "inline-block"
          document.querySelector("#userlog_icon_fail").style.display = "none"
          document.querySelectorAll(".user_msg")[0].style.display = "none";
        } else {
          this.setState({ emailIcon: false })
          document.querySelector("#userlog_icon_fail").style.display = "inline-block"
          document.querySelector("#userlog_icon_success").style.display = "none"
          document.querySelectorAll(".user_msg")[0].style.display = "block";
          this.setState({ email_msg: "*email address is not valid" })
        }
      } else {
        this.setState({ emailIcon: false })
        document.querySelector("#userlog_icon_success").style.display = "none"
        document.querySelector("#userlog_icon_fail").style.display = "none"
        document.querySelectorAll(".user_msg")[0].style.display = "none";
      }
    } else if (field == "password") {
      var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool == true) {
          /* console.log("passIcon is true") */
          this.setState({ passIcon: true, password: value })
          document.querySelector("#passlog_icon_success").style.display = "inline-block"
          document.querySelector("#passlog_icon_fail").style.display = "none"
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
        } else {
          this.setState({ passIcon: false })
          document.querySelector("#passlog_icon_success").style.display = "none"
          document.querySelector("#passlog_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".pass_msg")[0].style.display = "block";
          this.setState({ pass_msg: "*Password should contain atleast one alphabet,special character and number and should have min. 6 chartacters and max. 16 characters" })
        }
      } else {
        this.setState({ passIcon: false })
        document.querySelector("#passlog_icon_success").style.display = "none"
        document.querySelector("#passlog_icon_fail").style.display = "none"
        document.querySelectorAll(".pass_msg")[0].style.display = "none";
      }
    }else if (field == "otp") {
      var re = /^\b[a-zA-Z0-9]{6}\b|\b[a-zA-Z0-9]{6}\b/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool == true) {
          this.setState({ otpIcon: true })
          document.querySelector("#otp_icon_success").style.display = "inline-block"
          document.querySelector("#otp_icon_fail").style.display = "none"
          document.querySelectorAll(".otp_msg")[0].style.display = "none";
        } else {
          this.setState({ otpIcon: false })
          document.querySelector("#otp_icon_success").style.display = "none"
          document.querySelector("#otp_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".otp_msg")[0].style.display = "block";
          this.setState({ otp_msg: "Otp should have 6 characters." })
        }
      } else {
        this.setState({ otpIcon: false })
        document.querySelector("#otp_icon_success").style.display = "none"
        document.querySelector("#otp_icon_fail").style.display = "none"
        document.querySelectorAll(".otp_msg")[0].style.display = "none";
      }
    }
  }
  handleEye(e)
      {
        /* console.log("Hello i  am here",document.getElementById("logPass"),document.getElementById("logPass").type) */
        if(document.getElementById("logPass").type!==undefined)
        {
          /* console.log("I am in") */
          if(document.getElementById("logPass").type=="password")
          {
            this.setState({typeEye:"text"})
          }
          else
          {
            this.setState({typeEye:"password"})
          }
        }
      }
      componentWillReceiveProps(props, newProps) {
        if (props.errorStatus) {
          if (props.errorStatus.status == 200) {
            this.openNotificationWithIcon('success', 'Sign In', props.errorStatus.message);
            /* this.props.dispModal("login"); */
          }else if (props.errorStatus.status == 201) {
            this.setState({
              isOtpRequired:true
            });
            // document.querySelector("#otp-field").focus();
            this.openNotificationWithIcon('error', 'Sign In', props.errorStatus.err);
          }
          else {
            this.openNotificationWithIcon('error', 'Sign In', props.errorStatus.err);
          }
          this.props.clearLogin();
        }


      }
  render() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/editProfile");
    }
    var me = this;
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <Form_wrap>
        <Login_head>Login</Login_head>
        <Welcome_text>Welcome Back!</Welcome_text>
        <Email_label>Email Address</Email_label>
        <div>
          <Username {...getFieldProps('email', {
            onChange(e) { me.onChangeField(e.target.value, "username") }, // have to write original onChange here if you need
            rules: [{ type: "email", required: true }],
          })} />
          <UserIconS id="userlog_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          <UserIconF id="userlog_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
        </div>
        <Email_req className="user_msg">{this.state.email_msg}</Email_req>
        <Ph_Label>Password</Ph_Label>
        <div>
          <Password id="logPass"  type={this.state.typeEye} {...getFieldProps('password', {
            onChange(e) { me.onChangeField(e.target.value, "password") }, // have to write original onChange here if you need
            rules: [{ type: "string", required: true, min: 5 }],
          })}
          />
          {
            (this.state.typeEye=="password")?<FAI icon={faEye} color='black' onClick={this.handleEye.bind(this)}/>:<FAI icon={faEyeSlash} color='black' onClick={this.handleEye.bind(this)}/>
          }
          <PassIconS id="passlog_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          <PassIconF id="passlog_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
        </div>
        <Pass_req className="pass_msg">{this.state.pass_msg}</Pass_req>

        {this.state.isOtpRequired &&
          <div>
            <OtpLabel>Your Two Factor Authentiaction is ON. So Please Check Google Authenticator App in Your Device and add OTP here</OtpLabel>
            <div>
              <Username id="otp-field" {...getFieldProps('otp', {
                onChange(e) { me.onChangeField(e.target.value, "otp") }, // have to write original onChange here if you need
                rules: [{ required: false }],
              })} />
              <UserIconS id="otp_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
              <UserIconF id="otp_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
            </div>
            <Email_req className="otp_msg">{this.state.otp_msg}</Email_req>
          </div>
        }
        <Check_wrap>
          {/* <Remember>
            <Check type="checkbox" /> Remember Me</Remember> */}
          <Forgot onClick={() => this.dispModal("forgot")}>Forgot Password?</Forgot>
        </Check_wrap>

        {(errors = getFieldError('required')) ? errors.join(',') : null}
        <Button_login onClick={this.submit}>LOGIN</Button_login>
        <Sign>
          No account? <Sign_a onClick={() => this.dispModal("signup")}>Sign Up</Sign_a>
        </Sign>
      </Form_wrap>
    );
  }
}

function mapStateToProps(state) {
/*   console.log(state) */
  return ({
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    errorStatus: state.simpleReducer.errorStatus !==undefined ? state.simpleReducer.errorStatus :undefined,
    // isOtpRequired:state.simpleReducer.isOtpRequired,
  })
}

const mapDispatchToProps = dispatch => ({
  Login: (values) => dispatch(Login(values)),
  clearLogin: () =>  dispatch(clearLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Login_Form));
