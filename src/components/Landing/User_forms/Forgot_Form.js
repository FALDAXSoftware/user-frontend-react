/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Button } from "antd";
import { Username, Form_wrap, Welcome_text, Email_label } from "./Login_Form";

/* Components */

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
class Login_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static propTypes = {
    form: formShape,
  };
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
  dispModal(pressed) {
    console.log(this.props, pressed)
    this.props.dispModal(pressed)
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <Form_wrap>

          <Login_head>Forgot Password</Login_head>
          <Welcome_text>Forgot Password?</Welcome_text>
          <Sub_text>Don't worry,it happen's to the best of us</Sub_text>
          <Email_label>Email Address</Email_label>
          <Username {...getFieldProps('username', {
            onChange() { console.log("Hello How are You") }, // have to write original onChange here if you need
            rules: [{ required: true }],
          })} />

          {(errors = getFieldError('required')) ? errors.join(',') : null}
          <Button_login onClick={this.submit}>Send Reset Link</Button_login>
          <Link_wrap>
            <Icon className="material-icons">
              keyboard_backspace
                    </Icon>
            <Back_link onClick={() => this.dispModal("login")}> Back To Link </Back_link>
          </Link_wrap>
        </Form_wrap>
      </div>
    );
  }
}
export default createForm()(Login_Form);
