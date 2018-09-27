/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import {Button} from "antd";
import { connect } from 'react-redux';
import { relativeTimeThreshold } from 'moment';
/* Components */
import {Signup} from '../../../Actions/Auth'
import {Username,Form_wrap,Welcome_text,Email_label,Email_req,Phone_req,Pass_req} from "./Login_Form";
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
const Full_req = styled(Email_req)`

`
const Ph_Label = styled(Email_label)`
  margin-top:10px;
`
const Password = styled(Username)`
  
`
const Referral = styled(Username)``
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
{     
      constructor(props)
      {
        super(props)
        this.state = {
          full_msg:null,
          email_msg:null,
          pass_msg:null,
          phone_msg:null
        }
      }
      static propTypes = {
        form: formShape,
      };
      submit = () => {
        this.props.form.validateFields((error, value) => {
          console.log(error, value);
          if(error==null)
          {
            document.querySelectorAll(".full_sign")[0].style.display = "none";
            document.querySelectorAll(".pass_sign")[0].style.display = "none";
            document.querySelectorAll(".phone_sign")[0].style.display = "none";
            document.querySelectorAll(".email_sign")[0].style.display = "none";
            this.setState({pass_msg:null,phone_msg:null,email_msg:null});
            console.log(value,this.props)
            this.props.Signup(value);
            this.props.history.push("login");
            this.props.dispModal("login")
          }
          else
          {
            if(error.fullname!==undefined)
            {
              if(error.fullname.errors[0].message!==undefined && error.fullname.errors[0].message!==null)
              {
                document.querySelectorAll(".full_sign")[0].style.display = "block";
                this.setState({full_msg:"*Email is incorrect"})
              }
              else
              {
                document.querySelectorAll(".full_sign")[0].style.display = "none";
                this.setState({full_msg:null})
              }
            }
            if(error.email!==undefined)
            {
              if(error.email.errors[0].message!==undefined && error.email.errors[0].message!==null)
              {
                document.querySelectorAll(".email_sign")[0].style.display = "block";
                this.setState({email_msg:"*Email is incorrect"})
              }
              else
              {
                document.querySelectorAll(".email_sign")[0].style.display = "none";
                this.setState({email_msg:null})
              }
            }
            if(error.phone_number!==undefined)
            {
              if(error.phone_number.errors[0].message!==undefined && error.phone_number.errors[0].message!==null)
              {
                document.querySelectorAll(".phone_sign")[0].style.display = "block";
                this.setState({phone_msg:"*Phone Number is Incorrecct"})
              }
              else
              {
                
                document.querySelectorAll(".phone_sign")[0].style.display = "none";
                this.setState({phone_msg:null})
              }
            }
            if(error.password!==undefined)
            {
              if(error.password.errors[0].message!==undefined && error.password.errors[0].message!==null)
              {
                document.querySelectorAll(".pass_sign")[0].style.display = "block";
                this.setState({pass_msg:"*Password is Incorrecct"})
              }
              else
              {
                document.querySelectorAll(".pass_sign")[0].style.display = "none";
                this.setState({pass_msg:null})
              }
            }
          }

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
                    rules: [{type:"string" ,required: true ,max:25}],
                  })}/>
                  <Full_req className="full_sign">{this.state.full_msg}</Full_req>
                  <Ph_Label>Phone Number</Ph_Label>
                  <Phone {...getFieldProps('phone_number', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{type:"string",required: true}],
                  })}
                  />
                  <Phone_req className="phone_sign">{this.state.phone_msg}</Phone_req>
                  <Ph_Label>Email Adress</Ph_Label>
                  <Email {...getFieldProps('email', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{type:"email",required: true}],
                  })}
                  />
                  <Email_req  className="email_sign">{this.state.email_msg}</Email_req>
                  <Ph_Label>Password</Ph_Label>
                  <Password type="password" {...getFieldProps('password', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{type:"string",required: true,min:8}],
                  })}
                  />
                  <Pass_req className="pass_sign">{this.state.pass_msg}</Pass_req>
                  <Ph_Label>Referral Code</Ph_Label>
                  <Referral {...getFieldProps('referral_code', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{type:"string",required:false}],
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

function mapStateToProps(state){
  return({
    ...state
  })
 }
const mapDispatchToProps = dispatch => ({
  Signup: (values) => dispatch(Signup(values))
 })

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Signup_Form))
