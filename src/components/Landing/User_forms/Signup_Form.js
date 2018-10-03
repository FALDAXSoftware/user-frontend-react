/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import {Button,notification,Icon,Form ,Progress} from "antd";
import { connect } from 'react-redux';
import { relativeTimeThreshold } from 'moment';
import ReactPasswordStrength from 'react-password-strength';
import "react-password-strength/dist/style.css";
/* Components */
import {Signup} from '../../../Actions/Auth'
import {Username,Form_wrap,Welcome_text,Email_label,Email_req,Phone_req,Pass_req} from "./Login_Form";
/* Global Constants */

const FormItem = Form.Item;
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
const Welcome = styled(Welcome_text)`
  margin-top: 25px;
`
const Email_lab = styled(Email_label)`
  margin-top: 35px;
`
const FirstIconS = styled(Icon)`
  font-size:19px;
  display:none;
  margin-left:10px;
`
const FirstIconF = styled(Icon)`
  font-size:19px;
  display:none;
  margin-left:10px;
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
`
const PassIconF = styled(FirstIconF)`
`
const ConfirmIconS = styled(FirstIconS)`
`
const ConfirmIconF = styled(FirstIconF)`
`

const Full = styled(Username)`
  display:inline-block;
`
const Email = styled(Username)`
  display:inline-block;
`
const Full_req = styled(Email_req)`
  
`
const ConfirmPass_req = styled(Email_req)`

`

const Ph_Label = styled(Email_label)`
  margin-top:20px;
`
const Password = styled(Username)`
display:inline-block;
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
const Progress_bar = styled(Progress)`
  width:77%;
`
class Signup_Form extends React.Component
{     
      constructor(props)
      {
        super(props)
        this.state = {
          first_msg:null,
          last_msg:null,
          email_msg:null,
          pass_msg:null,
          password:null,
          confirmPass_msg:null,
            emailIcon:false,
            firstIcon:false,
            lastIcon:false,
            passIcon:false,
            confirmIcon:false,
          stroke:"",
          status:"",
          percent:0
        }
      }
      static propTypes = {
        form: formShape,
      };
      onFieldsChange = (props, changed, all) =>
      {
        console.log(props, changed, all)
      }
      submit = () => {

          this.props.form.validateFields((error, value) => {
          console.log(error,value,this.state);
          if(this.state.emailIcon==true && this.state.firstIcon==true && this.state.lastIcon==true && this.state.passIcon==true && this.state.confirmIcon==true)
          {
              document.querySelectorAll("#email_icon_success")[0].style.display = "none";
              document.querySelectorAll("#first_icon_success")[0].style.display = "none";
              document.querySelectorAll("#last_icon_success")[0].style.display = "none";
              document.querySelectorAll("#pass_icon_success")[0].style.display = "none";
              document.querySelectorAll("#confirm_icon_success")[0].style.display = "none";
              this.setState({emailIcon:false,firstIcon:false,lastIcon:false,passIcon:false,confirmIcon:false});
              /* console.log(value,this.props) */
              this.openNotificationWithIcon('success','Verification mail sent','We have sent you Account activation link');
              this.props.Signup(value);
              this.props.dispModal("login")
              this.props.history.push("login");
              
          }
          else
          {
            this.openNotificationWithIcon('error',"Required Fields","Please enter all required fields")
          }
        });
      }
      onChangeField(value,field)
      {
        console.log("onChangeField",value)
        if(field=="email")
        {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          var bool = re.test(String(value).toLowerCase());
          if(value!=="")
          {
            if(bool==true)
            {
              this.setState({emailIcon:true})
              document.querySelector("#email_icon_success").style.display = "inline-block"
              document.querySelector("#email_icon_fail").style.display = "none"
              document.querySelectorAll(".email_sign")[0].style.display = "none";
            }
            else
            {
              this.setState({emailIcon:false})
              console.log("on changeELSE")
              document.querySelector("#email_icon_fail").style.display = "inline-block"
              document.querySelector("#email_icon_success").style.display = "none"
              document.querySelectorAll(".email_sign")[0].style.display = "block";
              this.setState({email_msg:"*email address is not valid"})
            }
          }
          else
          {
            this.setState({emailIcon:false})
            document.querySelector("#email_icon_success").style.display = "none"
            document.querySelector("#email_icon_fail").style.display = "none"
            document.querySelectorAll(".email_sign")[0].style.display = "none";
          }
        }
        else if(field=="firstname")
        {
          var re = /^[a-zA-Z ]{2,15}$/;
          var bool = re.test(value);
          if(value!=="")
          {
            if(bool==true)
            {
              this.setState({firstIcon:true})
              document.querySelector("#first_icon_success").style.display = "inline-block"
              document.querySelector("#first_icon_fail").style.display = "none"
              document.querySelectorAll(".first_sign")[0].style.display = "none";
            }
            else
            {
              this.setState({firstIcon:false})
              console.log("on changeELSE")
              document.querySelector("#first_icon_success").style.display = "none"
              document.querySelector("#first_icon_fail").style.display = "inline-block"
              document.querySelectorAll(".first_sign")[0].style.display = "block";
              this.setState({first_msg:"*First Name should have min. 2 and max. 15 characters"})
            }
          }
          else
          {
            this.setState({firstIcon:false})
            document.querySelector("#first_icon_success").style.display = "none"
            document.querySelector("#first_icon_fail").style.display = "none"
            document.querySelectorAll(".first_sign")[0].style.display = "none";
          }
        }
        else if(field=="lastname")
        {
          var re = /^[a-zA-Z ]{2,15}$/;
          var bool = re.test(value);
          if(value!=="")
          {
            if(bool==true)
            {
              this.setState({lastIcon:true})
              document.querySelector("#last_icon_success").style.display = "inline-block";
              document.querySelector("#last_icon_fail").style.display = "none";
              document.querySelectorAll(".last_sign")[0].style.display = "none";
            }
            else
            {
              this.setState({lastIcon:false})
              console.log("on changeELSE")
              document.querySelector("#last_icon_success").style.display = "none";
              document.querySelector("#last_icon_fail").style.display = "inline-block";
              document.querySelectorAll(".last_sign")[0].style.display = "block";
              this.setState({last_msg:"*Last Name should have min. 2 and max. 15 characters"})
            }
          }
          else
          {
              this.setState({lastIcon:false})
              document.querySelector("#last_icon_success").style.display = "none";
              document.querySelector("#last_icon_fail").style.display = "none";
              document.querySelectorAll(".last_sign")[0].style.display = "none";
          }
        }
        else if(field=="password")
        {
          var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
          var bool = re.test(value);
          var numb = /^\d+$/, letters = /^[A-Za-z]+$/ , alphanum =/^(?=.*[a-zA-Z])(?=.*[0-9])/ ;
          if( numb.test(value) || letters.test(value) ) { this.setState({status:"active",stroke:"red",percent:20})}
          if( alphanum.test(value) ){ this.setState({status:"active",stroke:"orange",percent:40}) }
          if( alphanum.test(value) && value.length==6){ this.setState({status:"exception",stroke:"yellow",percent:60})}
          if( re.test(value) && value.length==6){ this.setState({status:"success",stroke:"#7CFC00",percent:80})}
          if( re.test(value) && value.length==10){ this.setState({status:"success",stroke:"#008000",percent:100})}

          if(value!=="")
          {
            if(bool==true)
            {
              this.setState({passIcon:true,password:value})
              document.querySelector("#pass_icon_success").style.display = "inline-block"
              document.querySelector("#pass_icon_fail").style.display = "none"
              document.querySelectorAll(".pass_sign")[0].style.display = "none";
            }
            else
            {
              this.setState({passIcon:false})
              console.log("on changeELSE")
              document.querySelector("#pass_icon_success").style.display = "none"
              document.querySelector("#pass_icon_fail").style.display = "inline-block"
              document.querySelectorAll(".pass_sign")[0].style.display = "block";
              this.setState({pass_msg:"*Password should contain atleast one alphabet,special character and number and should have min. 6 chartacters and max. 16 characters"})
            }
          }
          else
          {
            this.setState({passIcon:false,percent:0})
            document.querySelector("#pass_icon_success").style.display = "none"
            document.querySelector("#pass_icon_fail").style.display = "none"
            document.querySelectorAll(".pass_sign")[0].style.display = "none";
          }
        }
        else if(field=="confirm_password")
        {
          var bool = this.state.password==value ? true : false
          console.log(value)
          if(value!=="")
          {
            if(bool==true)
            {
              this.setState({confirmIcon:true})
              document.querySelector("#confirm_icon_success").style.display = "inline-block"
              document.querySelector("#confirm_icon_fail").style.display = "none"
              document.querySelectorAll(".confirmPass_sign")[0].style.display = "none";
            }
            else
            {
              this.setState({confirmIcon:false})
              console.log("on changeELSE")
              document.querySelector("#confirm_icon_success").style.display = "none"
              document.querySelector("#confirm_icon_fail").style.display = "inline-block"
              document.querySelectorAll(".confirmPass_sign")[0].style.display = "block";
              this.setState({confirmPass_msg:"*password doesn't match"})
            }
          }
          else
          {
            this.setState({confirmIcon:false})
            document.querySelector("#confirm_icon_success").style.display = "none"
            document.querySelector("#confirm_icon_fail").style.display = "none"
            document.querySelectorAll(".confirmPass_sign")[0].style.display = "none";
          }
        }

        
      }
      dispModal()
      {
       /*  console.log(this.props) */
        this.props.dispModal("login")
      }

      openNotificationWithIcon(type,head,desc){
        notification[type]({
          message: head,
          description: desc,
        });
      };
      render() {
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        var me=this;
        return (
            <div>
              <Form_wrap>

                <Login_head>Sign Up</Login_head>
                <Welcome>A Better Trading Experience is Moments Away</Welcome>
                    <span>Lets Get Started</span>

                  <Email_label>First Name</Email_label>
                  <div>
                    <Full {...getFieldProps('firstName', {
                      onChange(e){me.onChangeField(e.target.value,"firstname")}, // have to write original onChange here if you need
                      rules: [{type:"string" ,required: true}],
                    })}/>
                    <FirstIconS id="first_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <FirstIconF id="first_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <Full_req className="first_sign">{this.state.first_msg}</Full_req>

                  <Ph_Label>Last Name</Ph_Label>
                  <div>
                    <Full {...getFieldProps('lastname', {
                      onChange(e){me.onChangeField(e.target.value,"lastname")}, // have to write original onChange here if you need
                      rules: [{type:"string" ,required: true}],
                    })}/>
                    <LastIconS id="last_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <LastIconF id="last_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <Full_req className="last_sign">{this.state.last_msg}</Full_req>

                  <Ph_Label>Email Adress</Ph_Label>
                  <div>
                    <Email {...getFieldProps('email', {
                        onChange(e){me.onChangeField(e.target.value,"email")}, // have to write original onChange here if you need
                        rules: [{type:"email",required: true}],
                    })}
                    />
                    <EmailIconS id="email_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <EmailIconF id="email_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <Email_req  className="email_sign">{this.state.email_msg}</Email_req>

                  <Ph_Label>Password</Ph_Label>
                  <div>
                    <Password type="password" {...getFieldProps('password', {
                      onChange(e){me.onChangeField(e.target.value,"password")}, // have to write original onChange here if you need
                      rules: [{type:"string",required: true,min:8}],
                    })}
                    />
                    <PassIconS id="pass_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <PassIconF id="pass_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  {console.log(this.state.status,this.state.percent,this.state.stroke)}
                  <Progress_bar type="line" size="small" percent={this.state.percent}  strokeColor={this.state.stroke}/>
                  <Pass_req className="pass_sign">{this.state.pass_msg}</Pass_req>
                  <Ph_Label>Confirm Password</Ph_Label>
                  <div>
                      <Password type="password" {...getFieldProps('confirm_password', {
                        onChange(e){me.onChangeField(e.target.value,"confirm_password")}, // have to write original onChange here if you need
                        rules: [{type:"string",required: true,min:8}],
                      })}
                      />
                      <ConfirmIconS id="confirm_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                      <ConfirmIconF id="confirm_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  </div>
                  <ConfirmPass_req className="confirmPass_sign">{this.state.confirmPass_msg}</ConfirmPass_req>
                  
                  <Ph_Label>Referral Code</Ph_Label>
                  <div>
                    <Referral {...getFieldProps('referral_code', {
                      onChange(){/* console.log("Hello How are You") */}, // have to write original onChange here if you need
                      rules: [{type:"string",required:false}],
                    })}
                    />
                  </div>

                  {(errors = getFieldError('required')) ? errors.join(',') : null}
                  <Button_login onClick={this.submit}>SIgn Up</Button_login>
                  <Sign>
                    Already have an account? <Sign_a onClick={ () => this.dispModal() }>Login</Sign_a>
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
