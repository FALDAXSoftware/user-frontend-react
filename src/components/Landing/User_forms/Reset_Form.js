/* In-built Packages*/
import React from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import {Button,notification,Icon} from "antd";
import { connect } from 'react-redux';
import { relativeTimeThreshold } from 'moment';

/* Components */
import {resetAction} from '../../../Actions/Auth'
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
const Pass_label = styled(Email_label)`
  margin-top:50px;
`
const Password_req = styled(Pass_req)`
display:block;
`
const Passconfirm_Label = styled(Email_label)`
  margin-top:30px;
`
const Full = styled(Username)`
  margin-top:15px;
`
const Phone = styled(Username)`

`
const Email = styled(Username)`

`
const Full_req = styled(Email_req)`

`
const Common_req = styled(Email_req)`

`

const Password = styled(Username)`
margin-top:15px;
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
  margin-top:50px;
  @media (min-width:1024px) and (max-width:1440px)
  {
    margin-top: 50px;
  }

`


class Signup_Form extends React.Component
{     
      constructor(props)
      {
        super(props)
        this.state = {
          pass_msg:null,
          confirmPass_msg:null,
          common_req:null
        }
      }
      static propTypes = {
        form: formShape,
      };
      submit = () => {
        this.props.form.validateFields((error, value) => {
          /* console.log(error, value); */
          if(error==null)
          {
              if(value.password.toUpperCase()==value.confirm_password.toUpperCase())
              {
                document.querySelectorAll(".pass_msg")[0].style.display = "none";
                document.querySelectorAll(".confirmPass_msg")[0].style.display = "none";
                this.setState({pass_msg:null,confirmPass_msg:null});
                /* console.log(value,this.props) */
                this.props.resetAction({password:value.password});
            
                this.props.dispModal("login")
                this.openNotification();
                this.props.history.push("login");
              }
              else
              {
                document.querySelectorAll(".comp_pass")[0].style.display = "block";
                document.querySelectorAll(".pass_msg")[0].style.display = "none";
                document.querySelectorAll(".confirmPass_msg")[0].style.display = "none";
                this.setState({common_req:"*Both password's do not match"})
              } 
          }
          else
          {
            if(error.password!==undefined)
            {
              if(error.password.errors[0].message!==undefined && error.password.errors[0].message!==null)
              {
                document.querySelectorAll(".pass_msg")[0].style.display = "block";
                this.setState({pass_msg:"*Password is not valid"})
              }
              else
              {
                document.querySelectorAll(".pass_msg")[0].style.display = "none";
                this.setState({pass_msg:null})
              }
            }
            if(error.confirm_password!==undefined)
            {
              if(error.confirm_password.errors[0].message!==undefined && error.confirm_password.errors[0].message!==null)
              {
                /* console.log("Password ELse") */
                document.querySelectorAll(".confirmPass_msg")[0].style.display = "block";
                this.setState({confirmPass_msg:"*Password is not valid"})
              }
              else
              {
                  /* console.log("Confirm ELse") */
                document.querySelectorAll(".confirmPass_msg")[0].style.display = "none";
                this.setState({confrimPass_msg:null})
              }
            }
          }

        });
      }
      dispModal()
      {
        /* console.log(this.props) */
        this.props.dispModal("login")
      }
      openNotification = () => {
        notification.open({
          message: 'Password Changed Successfully',
          duration:3,
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
      };
      render() {
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
              <Form_wrap>

                <Login_head>Reset Password</Login_head>
                  <Pass_label>Password</Pass_label>
                  <Full type="password" {...getFieldProps('password', {
                    onChange(){/* console.log("Hello How are You") */}, // have to write original onChange here if you need
                    rules: [{type:"string" ,required: true ,max:16}],
                  })}/>
                  <Full_req className="pass_msg">{this.state.pass_msg}</Full_req>

                  <Passconfirm_Label>Confirm Password</Passconfirm_Label>
                  <Password type="password" {...getFieldProps('confirm_password', {
                    onChange(){/* console.log("Hello How are You") */}, // have to write original onChange here if you need
                    rules: [{type:"string",required: true,max:16}],
                  })}
                  />
                  <Password_req className="confirmPass_msg">{this.state.confirmPass_msg}</Password_req>
                  <Common_req className="comp_pass">{this.state.common_req}</Common_req>
                  {(errors = getFieldError('required')) ? errors.join(',') : null}
                  <Button_login onClick={this.submit}>Reset</Button_login>

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

  resetAction: (values) => dispatch(resetAction(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Signup_Form))
