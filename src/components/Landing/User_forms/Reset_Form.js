/* In-built Packages*/
import React, { Component } from 'react'
import { createForm, formShape } from 'rc-form';
import styled from 'styled-components';
import { Button, notification, Icon } from "antd";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

/* Components */
import { resetAction } from '../../../Actions/Auth'
import {
  Username, Form_wrap, Email_label, Email_req, Pass_req, UserIconF, UserIconS
} from "./Login_Form";

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
const Full_req = styled(Email_req)`
`
const Common_req = styled(Email_req)`
`
const Password = styled(Username)`
margin-top:15px;
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
const FAI = styled(FontAwesomeIcon)`
    cursor:pointer;
    display:inline-block;
    position: absolute;
    margin-left: -25px;
    margin-top: 30px;
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
      confPass:""
    }
  }

  static propTypes = {
    form: formShape,
  };

  onChangeField(value, field) {
    if (field == "password") {
      password=value;
            if(this.state.confPass!==undefined)
            {
                console.log("abcd",this.state.confPass,value)
                if(this.state.confPass === value)
                {
                    this.setState({ confirmIcon: true })
                    document.querySelector("#confirmchange_icon_success").style.display = "none"
                    document.querySelector("#confirmchange_icon_fail").style.display = "none"
                    document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
                }
                else{
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
          this.setState({ pass_msg: "Your password must contains at least one letter, one special character, and one number. Minimum 8 characters and maximum 60 characters." })
        }
      } else {
        this.setState({ newpassIcon: false, percent: 0 })
        document.querySelector("#newchange_icon_success").style.display = "none"
        document.querySelector("#newchange_icon_fail").style.display = "none"
        document.querySelectorAll(".pass_msg")[0].style.display = "none";
      }
    }
    if (field == "confirm_password") {
      var bool = this.state.password == value ? true : false
      if (value !== "") {
        this.setState({confPass:value})
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
          this.setState({ confirmPass_msg: "*Confirm Password does not match." })
        }
      } else {
        this.setState({ confirmIcon: false })
        document.querySelector("#confirmchange_icon_success").style.display = "none"
        document.querySelector("#confirmchange_icon_fail").style.display = "none"
        document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
      }
    }
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      let url = this.props.location.search.split('=')
      /* console.log(error, value); */
      if (error == null) {
        if (value.password.toUpperCase() == value.confirm_password.toUpperCase()) {
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
          this.setState({ pass_msg: null, confirmPass_msg: null });
          /* console.log(value,this.props) */
          this.props.resetAction({ password: value.password, reset_token: url[1] });
          this.props.dispModal("login")
          this.openNotification();
          this.props.history.push("login");
        } else {
          document.querySelectorAll(".comp_pass")[0].style.display = "block";
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
          this.setState({ common_req: "*Both passwords do not match" })
        }
      } else {
        if (error.password !== undefined) {
          if (error.password.errors[0].message !== undefined && error.password.errors[0].message !== null) {
            document.querySelectorAll(".pass_msg")[0].style.display = "block";
            this.setState({ pass_msg: "*Password is required" })
          } else {
            document.querySelectorAll(".pass_msg")[0].style.display = "none";
            this.setState({ pass_msg: null })
          }
        }
        if (error.confirm_password !== undefined) {
          if (error.confirm_password.errors[0].message !== undefined && error.confirm_password.errors[0].message !== null) {
            /* console.log("Password ELse") */
            document.querySelectorAll(".confirmchange_msg")[0].style.display = "block";
            this.setState({ confirmPass_msg: "*Confirm password is required" })
          } else {
            /* console.log("Confirm ELse") */
            document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
            this.setState({ confrimPass_msg: null })
          }
        }
      }
    });
  }

  dispModal() {
    this.props.dispModal("login")
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

  openNotification = () => {
    notification.open({
      message: 'Password Changed Successfully',
      duration: 3,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
  };

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    const { newEye, repeatEye } = this.state;
    var me = this;

    return (
      <div>
        <Form_wrap>
          <Login_head>Reset Password</Login_head>
          <Pass_label>Password</Pass_label>
          <div>
            <Full type={newEye} {...getFieldProps('password', {
              onChange(e) { me.onChangeField(e.target.value, "password") }, // have to write original onChange here if you need
              rules: [{ type: "string", required: true, max: 16 }],
            })} />
            {
              (newEye == "password") ?
                <FAI icon={faEye} color='black' onClick={this.handleEye.bind(this, "new")} />
                : <FAI icon={faEyeSlash} color='black' onClick={this.handleEye.bind(this, "new")} />
            }
            <UserIconS id="newchange_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
            <UserIconF id="newchange_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
            <Full_req className="pass_msg">{this.state.pass_msg}</Full_req>
          </div>



          <Passconfirm_Label>Confirm Password</Passconfirm_Label>
          <div>
            <Password type={repeatEye} {...getFieldProps('confirm_password', {
              onChange(e) { me.onChangeField(e.target.value, "confirm_password") }, // have to write original onChange here if you need
              rules: [{ type: "string", required: true, max: 16 }],
            })}
            />
            {
              (repeatEye == "password") ?
                <FAI icon={faEye} color='black' onClick={this.handleEye.bind(this, "confirm_password")} />
                : <FAI icon={faEyeSlash} color='black' onClick={this.handleEye.bind(this, "confirm_password")} />
            }
            <UserIconS id="confirmchange_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
            <UserIconF id="confirmchange_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
            <Password_req className="confirmchange_msg">{this.state.confirmPass_msg}</Password_req>
          </div>

          <Common_req className="comp_pass">{this.state.common_req}</Common_req>
          {(errors = getFieldError('required')) ? errors.join(',') : null}
          <Button_login onClick={this.submit}>Reset</Button_login>
        </Form_wrap>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    ...state
  })
}

const mapDispatchToProps = dispatch => ({
  resetAction: (values) => dispatch(resetAction(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(ResetPassword))
