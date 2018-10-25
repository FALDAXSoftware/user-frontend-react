/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Button, notification } from "antd";
import { Username, Form_wrap, Welcome_text, Email_label, Email_req } from "./Login_Form";
import { connect } from "react-redux"

/* Components */
import { forgotAction, clearForgot } from "../../../Actions/Auth"

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
class Forgot_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forgot: false
    }
  }

  static propTypes = {
    form: formShape,
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      /*  console.log(error, value); */
      if (error !== null && error !== undefined) {
        if (error.email !== undefined) {
          if (error.email.errors[0].message !== undefined && error.email.errors[0].message !== null) {
            document.querySelectorAll(".email_msg")[0].style.display = "block";
            if (value.email == "" || value.email == undefined)
              this.setState({ email_msg: `*${error.email.errors[0].message}` })
            else
              this.setState({ email_msg: "*Email address is not valid" })
          } else {
            document.querySelectorAll(".email_msg")[0].style.display = "none";
            this.setState({ email_msg: null })
          }
        }
      } else {
        document.querySelectorAll(".email_msg")[0].style.display = "none";
        /*  console.log(this.props,value) */
        this.setState({ email_msg: null });
        // this.openNotification();
        this.props.forgotAction(value);
      }
    });
  }

  dispModal(pressed) {
    this.props.dispModal(pressed)
  }

  componentWillReceiveProps(props, newProps) {
    if (props.forgot) {
      if (props.forgot.status == 200) {
        this.openNotificationWithIcon('success', 'Login Successful', props.forgot.message);
        /* this.props.dispModal("login"); */
      } else {
        this.openNotificationWithIcon('error', 'Error', props.forgot.err);
      }
      this.props.clearForgot();
    }

  }

  openNotification = () => {
    notification.open({
      message: 'Password Reset Link Sent',
      description: 'The link to reset the password is sent to your Email Address',
      duration: 6,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
  };

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  };

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <Form_wrap>
          <Login_head>Forgot Password</Login_head>
          <Welcome_text>Forgot Password?</Welcome_text>
          <Sub_text>Don't worry, It happen's to the best of us</Sub_text>
          <Email_label>Email Address</Email_label>
          <Username {...getFieldProps('email', {
            onChange() { /* console.log("Hello How are You") */ }, // have to write original onChange here if you need
            rules: [{ type: "email", required: true }],
          })} />
          <Email_req className="email_msg">{this.state.email_msg}</Email_req>
          {(errors = getFieldError('required')) ? errors.join(',') : null}
          <Button_login onClick={this.submit}>Send Reset Link</Button_login>
          <Link_wrap>
            <Icon className="material-icons">
              keyboard_backspace
                    </Icon>
            <Back_link onClick={() => this.dispModal("login")}> Back To Login </Back_link>
          </Link_wrap>
        </Form_wrap>
      </div>
    );

  }
}

function mapStateToProps(state, ownProps) {
  return ({
    forgot: state.simpleReducer.forgot ? state.simpleReducer.forgot : false
  })
}

const mapDispatchToProps = dispatch => ({
  forgotAction: (isLoggedIn) => dispatch(forgotAction(isLoggedIn)),
  clearForgot: () => dispatch(clearForgot())

})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Forgot_Form));
