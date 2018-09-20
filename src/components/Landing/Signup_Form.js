/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import {Button} from "antd";
import {Username,Form_wrap,Welcome_text,Email_label} from "./Login_Form";
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
  @media(min-width:1024px) and  (max-width:1440px)
  {
    padding-bottom:0px;
  }
`
const Full = styled(Username)`

`
const Phone = styled(Username)`

`
const Email = styled(Username)`

`
const Ph_Label = styled(Email_label)`
  margin-top:10px;
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
const Forgot= styled.a`
  float:right;
  font-size: 14px;
  font-family: "OpenSans";
  color: rgb( 15, 71, 123 );
  text-align: left;
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
  @media (min-width:1024px) and (max-width:1440px)
  {
    margin-top: 20px;
  }

`
const Sign = styled.div`
  margin-top: 30px;
  margin-bottom: 60px;
  @media (min-width:1024px) and (max-width:1440px)
  {
    margin-top: 13px;
  }
`
const Sign_a = styled.a`
  font-size: 16px;
  font-family: "Open Sans";
  color:#0f477b;
  font-weight:bold;

`
class Signup_Form extends React.Component
{     static propTypes = {
        form: formShape,
      };
      submit = () => {
        this.props.form.validateFields((error, value) => {
          console.log(error, value);
        });
      }
      dispModal()
      {
        console.log(this.props)
        this.props.dispModal("login")
      }
      render() {
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
              <Form_wrap>

                <Login_head>Sign Up</Login_head>
                <Welcome_text>Lets Get Started</Welcome_text>
                    <span>Enter Your Information Below</span>
                  <Email_label>Full Name</Email_label>
                  <Full {...getFieldProps('fullname', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{required: true}],
                  })}/>
                  <Ph_Label>Phone Number</Ph_Label>
                  <Phone {...getFieldProps('phone', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{required: true}],
                  })}
                  />
                  <Ph_Label>Email Adress</Ph_Label>
                  <Email {...getFieldProps('email', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{required: true}],
                  })}
                  />
                  <Ph_Label>Password</Ph_Label>
                  <Password {...getFieldProps('password', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{required: true}],
                  })}
                  />
                {(errors = getFieldError('required')) ? errors.join(',') : null}
                <Button_login onClick={this.submit}>SIgn Up</Button_login>
                <Sign>
                  Already have an account ? <Sign_a onClick={()=>this.dispModal()}>Login</Sign_a>
                </Sign>
              </Form_wrap>
            </div>
        );
      }
}
export default createForm()(Signup_Form);
