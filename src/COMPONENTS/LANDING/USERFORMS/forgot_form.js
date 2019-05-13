/* In-built Packages*/
import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, notification, Row, Col } from "antd";
import { connect } from "react-redux"
import SimpleReactValidator from "simple-react-validator";

/* Components */
import { forgotAction, clearForgot } from "ACTIONS/authActions";
import { globalVariables } from 'Globals';

/* Global CONSTANTS */

/* Styled-Components */
import { Username, FormWrap, WelcomeText, EmailLabel } from "./login_form";
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
const LoginHead = styled.div`
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
const SubText = styled.span`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 163, 163, 163 );  
`
const ButtonLogin = styled(Button)`
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
const LinkWrap = styled.div`
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
const BackLink = styled.a`
    
`
class ForgotForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forgot: false,
      email: ""
    };
    this.validator = new SimpleReactValidator();
    this.fieldChange = this.fieldChange.bind(this);
  }

  /* Life CyCle Methods */

  componentWillReceiveProps(props, newProps) {
    if (props.forgot) {
      if (props.forgot.status === 200) {

        this.openNotificationWithIcon('success', 'Success', props.forgot.message);
        this.setState({ email: "" })


      } else {
        this.openNotificationWithIcon('error', 'Error', props.forgot.err);
      }
      this.props.clearForgot();
    }
  }

  /* 
    Page: /forgot-password
    This method is called when you submit Forgot Password Form.
  */

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

  /* 
    Page: /forgot-password
    This method is called when you change in fields of Forgot Password Form.
  */

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
    this.props.dispModal(pressed)
  }

  /* 
    Page: /forgot-password
    This method is called for notifications.
  */

  openNotification = () => {
    notification.open({
      message: 'Password Reset Link Sent',
      description: 'The link to reset the password is sent to your Email Address',
      duration: 5,
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
    });
  };

  /* 
    Page: /forgot-password
    This method is called for custom notifications.
  */

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
            <FormWrap>
              <RightWrap className="wow fadeInDown" >
                <div style={{ width: "100%" }}>
                  <LoginHead>Forgot Password</LoginHead>
                  <WelcomeText>Forgot Password?</WelcomeText>
                  <SubText>Don't worry, It happen's to the best of us.</SubText>
                  <EmailLabel>Email Address*</EmailLabel>
                  <Username type="email" value={this.state.email} onChange={this.fieldChange} />
                  {this.validator.message('Email_Address', this.state.email, 'required|email')}
                  <ButtonLogin onClick={this.submit}>SEND RESET PASSWORD LINK</ButtonLogin>
                  <LinkWrap>
                    <Icon className="material-icons">keyboard_backspace</Icon>
                    <BackLink onClick={() => this.props.history.push("/login")}> Back To Login </BackLink>
                  </LinkWrap>
                </div>
              </RightWrap>
            </FormWrap>
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
