/* In-built Packages*/
import React, { Component } from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Button, notification, Row, Col } from "antd";
import { Username, Form_wrap, Welcome_text, Email_label, Email_req } from "./Login_Form";
import { connect } from "react-redux"
import SimpleReactValidator from "simple-react-validator";

/* Components */
import { forgotAction, clearForgot } from "../../../Actions/Auth";
import { globalVariables } from '../../../Globals';
/* Global Constants */
/* Styled-Components */
const RowWrap = styled(Row)`
  min-height:100%;
  
  @media(max-width:991px)
  {
    min-height:100vh;
    background-color:#f0f3f2;
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
    margin-top:30px;
    margin-bottom:30px;
  }
  @media(max-width:575px)
  {
    width:250px;    
  }
`
const Login_head = styled.div`
  font-size: 30px;
  font-family: "Open Sans";
  color: rgb( 35, 38, 45 );
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 3px solid #ced9e0;
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
const Button_login = styled(Button)`
  width: auto;
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
  @media(min-width:1773px)
  {
    display:block;
  }
  @media (min-width:1024px) (max-width:1440px)
  {
    width:40%;
    height:40px;
  }
  @media(max-width:991px)
  {
    display:block;
  }
  @media(max-width:575px)
  {
    margin-top:30px;
    margin-bottom:0px;
  }
  @media(max-width:400px)
  {
    width:285px;
  }
`
const Link_wrap = styled.div`
  margin-top:50px;
  margin-bottom:50px;
  >i
  {
    vertical-align: middle;
    color:rgb(0, 170, 250);
    cursor:pointer;
  }
  >a
  {
    vertical-align: middle;
    font-size: 16px;
    font-family: "Open Sans";
    color:rgb(0, 170, 250);
    &:hover
    {
      color:#0f477b;
    }
  }
  &:hover
  {
    >a,i
    {
    color:#0f477b;
    }
  }
`
const RightWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  @media(max-width:991px)
  {
    height:auto;
  }
`
export const Icon = styled.i`
    
`
const Back_link = styled.a`
    
`
class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgot: false,
      email: ""
    },
      this.validator = new SimpleReactValidator();
    this.fieldChange = this.fieldChange.bind(this);
  }

  submit = () => {
    if (this.validator.allValid()) {
      this.validator.hideMessages()
      var value = {};
      value.email = this.state.email;
      this.props.forgotAction(value);
      this.setState({ email: "" })

    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }
  fieldChange(e) {
    var value = e.target.value;
    this.setState({
      email: value
    });
  }
  dispModal(pressed) {
    this.props.dispModal(pressed)
  }

  componentWillReceiveProps(props, newProps) {
    if (props.forgot) {
      if (props.forgot.status == 200) {

        this.openNotificationWithIcon('success', 'Success', props.forgot.message);
        this.setState({ email: "" })


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
      duration: 5,
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
    });
  };

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  };

  render() {

    return (
      <div>
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
            <Form_wrap>
              <RightWrap className="wow fadeInDown" >
                <div style={{ width: "100%" }}>
                  <Login_head>Forgot Password</Login_head>
                  <Welcome_text>Forgot Password?</Welcome_text>
                  <Sub_text>Don't worry, It happen's to the best of us.</Sub_text>
                  <Email_label>Email Address*</Email_label>
                  <Username type="email" value={this.state.email} onChange={this.fieldChange} />
                  {this.validator.message('Email_Address', this.state.email, 'required|email')}
                  <Button_login onClick={this.submit}>SEND RESET PASSWORD LINK</Button_login>
                  <Link_wrap>
                    <Icon className="material-icons">keyboard_backspace</Icon>
                    <Back_link onClick={() => this.props.history.push("/login")}> Back To Login </Back_link>
                  </Link_wrap>
                </div>
              </RightWrap>
            </Form_wrap>
          </ColRight>
        </RowWrap>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotForm);
