/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import {Button} from "antd";
import { connect } from 'react-redux';
import {Login} from '../../../Actions/Auth'
/* Components */

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
  border: 0px;
  width: 76%;
  margin-top:10px;
  height:50px;
  font-size:16px;

  @media(min-width:1024px) and (max-width:1440px)
  {
    height:35px;
  }
`
export const Email_req = styled.div`
  display:none;
  color:red;
  font-size:14px;
`
const Phone = styled(Username)`

`
const Ph_Label = styled(Email_label)`
  margin-top:15px;
`
export const Phone_req = styled.label`
  display:none;
  color:red;
  font-size:14px;
`
const Password = styled(Username)`
  font-size:16px;
`
export const Pass_req = styled.label`
  display:none;
  color:red;
  font-size:14px;
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
const Forgot= styled.a`
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
class Login_Form extends React.Component
{     
      constructor(props)
      {
        super(props);
        this.state = {
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
          if(error!==null && error!==undefined)
          {
            if(error.email!==undefined)
            {
              if(error.email.errors[0].message!==undefined && error.email.errors[0].message!==null)
              {
                document.querySelectorAll(".email_msg")[0].style.display = "block";
                this.setState({email_msg:"*email is not valid"})
              }
              else
              {
                this.setState({email_msg:null})
              }
            }
            if(error.phone_number!==undefined)
            {
              if(error.phone_number.errors[0].message!==undefined && error.phone_number.errors[0].message!==null)
              {
                document.querySelectorAll(".phone_msg")[0].style.display = "block";
                this.setState({phone_msg:`*${error.phone_number.errors[0].message}`})
              }
              else
              {
                
                document.querySelectorAll(".phone_msg")[0].style.display = "none";
                this.setState({phone_msg:null})
              }
            }
            if(error.password!==undefined)
            {
              if(error.password.errors[0].message!==undefined && error.password.errors[0].message!==null)
              {
                document.querySelectorAll(".pass_msg")[0].style.display = "block";
                if(error.password.errors[0].message.includes("8"))
                this.setState({pass_msg:`*${error.password.errors[0].message}`})
              }
              else
              {
                document.querySelectorAll(".pass_msg")[0].style.display = "none";
                this.setState({pass_msg:null})
              }
            }
          } 
          else
          { 
            document.querySelectorAll(".pass_msg")[0].style.display = "none";
            document.querySelectorAll(".phone_msg")[0].style.display = "none";
            document.querySelectorAll(".email_msg")[0].style.display = "none";
            this.setState({pass_msg:null,phone_msg:null,email_msg:null});
            console.log(value,this.props)
            this.props.Login(value);
            console.log(this.props)
            
          }
        });
      }
      dispModal(pressed)
      {
        console.log(this.props,pressed)
        this.props.dispModal(pressed)
      }
      render() {
        if(this.props.isLoggedIn){
          this.props.history.push("/editProfile");
        }
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
              <Form_wrap>

                <Login_head>Login</Login_head>
                <Welcome_text>Welcome to Faldax</Welcome_text>
                  <Email_label>Email Address</Email_label>
                  <Username {...getFieldProps('email', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{type:"email",required: true}],
                  })}/>
                  <Email_req className="email_msg">{this.state.email_msg}</Email_req>
                  <Ph_Label>Phone Number</Ph_Label>
                  <Phone {...getFieldProps('phone_number', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{type:"string",required: true,max:13}],
                  })}
                  />
                  <Phone_req className="phone_msg">{this.state.phone_msg}</Phone_req>
                  <Ph_Label>Password</Ph_Label>
                  <Password  type="password" {...getFieldProps('password', {
                    onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                    rules: [{type:"string",required: true,min:5}],
                  })}
                  />
                  <Pass_req className="pass_msg">{this.state.pass_msg}</Pass_req>
                  <Check_wrap>
                    <Remember>
                    <Check type="checkbox"/> Remember Me</Remember>
                    <Forgot onClick={()=>this.dispModal("forgot")}>Forgot Password?</Forgot>
                  </Check_wrap>
                    
                {(errors = getFieldError('required')) ? errors.join(',') : null}
                <Button_login onClick={this.submit}>LOGIN</Button_login>
                <Sign>
                  Don't have an account ? <Sign_a onClick={()=>this.dispModal("signup")}>Sign Up</Sign_a>
                </Sign>
              </Form_wrap>

        );
      }
}
function mapStateToProps(state){
  return({
    isLoggedIn:state.simpleReducer.isLoggedIn!==undefined ? true : false 
  })
 }
const mapDispatchToProps = dispatch => ({
  Login: (values) => dispatch(Login(values))
 })

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Login_Form));
