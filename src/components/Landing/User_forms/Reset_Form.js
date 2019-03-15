/* In-built Packages*/
import React, { Component } from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Button, notification, Icon, Row, Col } from "antd";
import { connect } from 'react-redux';
import { Eye, ActiveEye } from '../../../Constants/images';
import { globalVariables } from '../../../Globals';

/* Components */
import { resetAction, resetData } from '../../../Actions/Auth'
import {
  Username, Email_label, Email_req, Pass_req, UserIconF, UserIconS
} from "./Login_Form";

/* Global Constants */

/* Styled-Components */
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
  padding-right:40px;
`
const Full_req = styled(Email_req)`
`
const Common_req = styled(Email_req)`
`
const Password = styled(Username)`
margin-top:15px;
padding-right:40px;
`
const ResetButton = styled(Button)`
width: 110px;
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
  @media (min-width:1024px) and (max-width:1440px)
  {
    margin-top: 50px;
  }
  &:hover{
    color:#0f477b;
    border-color:#0f477b;
    background-color:white;
  }
`
const RowWrap = styled(Row)`
  min-height:100%;
  
  @media(max-width:991px)
  {
    background-color:#f0f3f2;
    min-height:100vh;
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
const Form_wrap = styled.div`
  padding-left:100px;
  
  background-color:#f0f3f2;
  min-height: 100vh;
  display:flex;
  align-items:center;
  @media(max-width:991px)
  {
    min-height: auto;
    padding-top:30px;
  }
  @media(max-width:767px)
  {
    padding: 30px;
    
  }
`
const RightWrap = styled.div`
  width:100%;
  @media(max-width:991px)
  {
    height:auto;
  }
`
const FAI = styled.img`
    cursor:pointer;
    display:inline-block;
    position: absolute;
    margin-left: -35px;
    margin-top: 33px;
`
const Active_FAI = styled(FAI)`
  margin-top: 28px;  
`
let password;
class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pass_msg: null,
      confirmPass_msg: null,
      common_req: null,
      repeatEye: "password",
      newEye: "password",
      confPass: ""
    }
  }

  static propTypes = {
    form: formShape,
  };

  onChangeField(value, field) {
    if (field == "password") {
      password = value;
      if (this.state.confPass !== undefined) {
        if (this.state.confPass === value) {
          this.setState({ confirmIcon: true })
          document.querySelector("#confirmchange_icon_success").style.display = "none"
          document.querySelector("#confirmchange_icon_fail").style.display = "none"
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
        } else {
          this.setState({ confirmIcon: false })
          document.querySelector("#confirmchange_icon_success").style.display = "none"
          document.querySelector("#confirmchange_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "block";
          this.setState({ confirmPass_msg: "*Confirm Password does not match." })
        }
      }
      var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,60}$/;
      var bool = re.test(value);
      var numb = /^\d+$/, letters = /^[A-Za-z]+$/, alphanum = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      if (numb.test(value) || letters.test(value)) { this.setState({ status: "active", stroke: "red", percent: 20 }) }
      if (alphanum.test(value)) { this.setState({ status: "active", stroke: "orange", percent: 40 }) }
      if (alphanum.test(value) && value.length == 6) { this.setState({ status: "exception", stroke: "yellow", percent: 60 }) }
      if (re.test(value) && value.length == 6) { this.setState({ status: "success", stroke: "#7CFC00", percent: 80 }) }
      if (re.test(value) && value.length >= 10) { this.setState({ status: "success", stroke: "#008000", percent: 100 }) }
      if (value !== "") {
        if (bool == true) {
          this.setState({ newpassIcon: true, password: value })
          document.querySelector("#newchange_icon_success").style.display = "inline-block"
          document.querySelector("#newchange_icon_fail").style.display = "none"
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
        } else {
          this.setState({ newpassIcon: false })
          document.querySelector("#newchange_icon_success").style.display = "none"
          document.querySelector("#newchange_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".pass_msg")[0].style.display = "block";
          this.setState({ pass_msg: "Your password must contain at least one letter, one special character, and one number. Minimum 8 characters and maximum 60 characters." })
        }
      } else {
        this.setState({ newpassIcon: false, percent: 0 })
        document.querySelector("#newchange_icon_success").style.display = "none"
        document.querySelector("#newchange_icon_fail").style.display = "none"
        document.querySelectorAll(".pass_msg")[0].style.display = "none";
      }
    }
    if (field == "confirm_password") {
      var bool = this.state.password === value ? true : false
      if (value !== "") {
        this.setState({ confPass: value })
        if (bool == true) {
          this.setState({ confirmIcon: true })
          document.querySelector("#confirmchange_icon_success").style.display = "inline-block"
          document.querySelector("#confirmchange_icon_fail").style.display = "none"
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
        } else {
          this.setState({ confirmIcon: false })
          document.querySelector("#confirmchange_icon_success").style.display = "none"
          document.querySelector("#confirmchange_icon_fail").style.display = "inline-block"
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "block";
          this.setState({ confirmPass_msg: "Confirm Password does not match." })
        }
      } else {
        this.setState({ confirmIcon: false })
        document.querySelector("#confirmchange_icon_success").style.display = "none"
        document.querySelector("#confirmchange_icon_fail").style.display = "none"
        document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
      }
    }
  }

  openNotificationWithProfile = (type, head, desc) => {
    notification[type]({
      message: head,
      description: desc,
      duration: 3,
    });
  };

  _resetPassword = (value) => {
    let url = this.props.location.search.split('=')

    let form = {}
    form['password'] = value.password;
    form['reset_token'] = url[1];

    fetch(`${globalVariables.API_URL}/users/resetPassword`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    }).then(response => response.json())
      .then((responseData) => {
        console.log('>>>>>responseData', responseData)
        if (responseData.status == 200) {
          console.log('>>>>>responseData', responseData)
          this.openNotificationWithProfile("success", "Success", "Password changed successfully..")
          this.props.history.push("/login")
        } else {
          this.openNotificationWithProfile("error", "Error", responseData.err)
        }
      }).catch(error => {
        console.log('>>>>>error', error)
        this.openNotificationWithProfile("error", "Error", "are re error ai")
      })
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      let url = this.props.location.search.split('=')
      if (error == null) {
        if (value.password == value.confirm_password) {
          this._resetPassword(value)
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
          document.querySelectorAll(".comp_pass")[0].style.display = "block";
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
          this.setState({ pass_msg: null, confirmPass_msg: null });
        } else {
          document.querySelectorAll(".comp_pass")[0].style.display = "block";
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
          this.openNotificationWithProfile("error", "Error", "Password do not match.")
        }
      } else {
        if (error.password !== undefined) {
          if (error.password.errors[0].message !== undefined && error.password.errors[0].message !== null) {
            document.querySelectorAll(".pass_msg")[0].style.display = "block";
            this.setState({ pass_msg: "Password is required" })
          } else {
            document.querySelectorAll(".pass_msg")[0].style.display = "none";
            this.setState({ pass_msg: null })
          }
        }
        if (error.confirm_password !== undefined) {
          if (error.confirm_password.errors[0].message !== undefined && error.confirm_password.errors[0].message !== null) {
            document.querySelectorAll(".confirmchange_msg")[0].style.display = "block";
            this.setState({ confirmPass_msg: "Confirm password is required" })
          } else {
            document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
            this.setState({ confrimPass_msg: null })
          }
        }
      }
    });
  }

  handleEye(type) {
    if (type == "new") {
      if (this.state.newEye == "password") {
        this.setState({ newEye: "text" })
      } else {
        this.setState({ newEye: "password" })
      }
    } else {
      if (this.state.repeatEye == "password") {
        this.setState({ repeatEye: "text" })
      } else {
        this.setState({ repeatEye: "password" })
      }
    }
  }

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  };

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    const { newEye, repeatEye } = this.state;
    var me = this;

    return (
      <div>
        <RowWrap >
          <ColLeft sm={24} lg={12}>
            <LeftWrap >
              <VertImg className="wow fadeInUp" src="/images/LeftSideLogo.png" />
              <HorImg className="wow fadeInUp" src="/images/logoWhite.png" />
            </LeftWrap>
          </ColLeft>
          <ColRight sm={24} lg={12}>
            <Form_wrap  >
              <RightWrap className="wow fadeInDown" >
                <Login_head>Reset Password</Login_head>
                <Pass_label>Password*</Pass_label>
                <div>
                  <Full type={newEye} {...getFieldProps('password', {
                    onChange(e) { me.onChangeField(e.target.value, "password") }, // have to write original onChange here if you need
                    rules: [{ type: "string", required: true, max: 16 }],
                  })} />
                  {
                    (newEye == "password") ?
                      <FAI src={Eye} onClick={this.handleEye.bind(this, "new")} />
                      : <Active_FAI src={ActiveEye} onClick={this.handleEye.bind(this, "new")} />
                  }
                  <UserIconS id="newchange_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                  <UserIconF id="newchange_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  <Full_req className="pass_msg">{this.state.pass_msg}</Full_req>
                </div>

                <Passconfirm_Label>Confirm Password*</Passconfirm_Label>
                <div>
                  <Password type={repeatEye} {...getFieldProps('confirm_password', {
                    onChange(e) { me.onChangeField(e.target.value, "confirm_password") }, // have to write original onChange here if you need
                    rules: [{ type: "string", required: true, max: 16 }],
                  })}
                  />
                  {
                    (repeatEye == "password") ?
                      <FAI src={Eye} onClick={this.handleEye.bind(this, "confirm_password")} />
                      : <Active_FAI src={ActiveEye} onClick={this.handleEye.bind(this, "confirm_password")} />
                  }
                  <UserIconS id="confirmchange_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                  <UserIconF id="confirmchange_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                  <Password_req className="confirmchange_msg">{this.state.confirmPass_msg}</Password_req>
                </div>
                <Common_req className="comp_pass">{this.state.common_req}</Common_req>
                {(errors = getFieldError('required')) ? errors.join(',') : null}
                <ResetButton onClick={this.submit}>Reset</ResetButton>
              </RightWrap>
            </Form_wrap>
          </ColRight>
        </RowWrap>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    reset: state.simpleReducer.reset !== undefined ? state.simpleReducer.reset : false
  }
}
const mapDispatchToProps = dispatch => ({
  resetAction: (values) => dispatch(resetAction(values)),
  resetData: (value) => dispatch(resetData(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(ResetPassword))
