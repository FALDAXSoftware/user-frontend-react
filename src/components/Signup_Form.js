/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import {Button} from "antd";
/* Components */

/* Global Constants */


/* Styled-Components */
const Form_wrap = styled.div`
  padding-left:60px;
  padding-top:60px;
  
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
`
const Welcome_text = styled.div`
  font-size: 24px;
  font-family: "Open Sans";
  color: rgb( 0, 0, 0 );
  margin-top:40px;
` 
const Email_label = styled.div`
  font-size: 14px;
  font-family: "Open Sans";
  color: black;
  margin-top: 40px;

`
const Username = styled.input`
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

`
const Sign = styled.div`
  margin-top: 30px;
  margin-bottom: 60px;
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
                  <Username {...getFieldProps('username', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{required: true}],
                  })}/>
                  <Ph_Label>Phone Number</Ph_Label>
                  <Password {...getFieldProps('password', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{required: true}],
                  })}
                  />
                  <Ph_Label>Email Adress</Ph_Label>
                  <Password {...getFieldProps('password', {
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
