/* In-built Packages*/
import React, { Component } from "react";
import { createForm, formShape } from "rc-form";
import styled from "styled-components";
import { Button, notification, Row, Col, Progress } from "antd";
import { connect } from "react-redux";

/* Components */
import { globalVariables } from "Globals.js";
import { _EYE, _ACTIVEEYE } from "CONSTANTS/images";
import { resetAction, resetData } from "ACTIONS/authActions";

/* Global CONSTANTS */

/* Styled-Components */
import {
  Username,
  EmailLabel,
  EmailReq,
  PassReq,
  UserIconF,
  UserIconS
} from "./login_form";

const LoginHead = styled.div`
  font-size: 30px;
  font-family: "Open Sans";
  color: rgb(35, 38, 45);
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 3px solid #ced9e0;
  display: inline-block;
  @media (max-width: 400px) {
    border-bottom: none;
  }
`;
const PassLabel = styled(EmailLabel)`
  margin-top: 50px;
`;
const PasswordReq = styled(PassReq)`
  display: block;
`;
const PassconfirmLabel = styled(EmailLabel)`
  margin-top: 30px;
`;
const Full = styled(Username)`
  margin-top: 15px;
  padding-right: 40px;
`;
const FullReq = styled(EmailReq)``;
const CommonReq = styled(EmailReq)``;
const Password = styled(Username)`
  margin-top: 15px;
  padding-right: 40px;
`;
const ResetButton = styled(Button)`
  width: 110px;
  background-color: rgb(0, 170, 250);
  color: white;
  margin-top: 50px;
  height: 48px;
  letter-spacing: 3px;
  color: white;
  font-size: 16px;
  font-size: 13.217px;
  font-family: "Open Sans";
  font-weight: bold;
  border-radius: 30px;
  text-transform: uppercase;
  line-height: 2.875;
  @media (min-width: 1024px) and (max-width: 1440px) {
    margin-top: 50px;
  }
  &:hover {
    color: #0f477b;
    border-color: #0f477b;
    background-color: white;
  }
`;
const RowWrap = styled(Row)`
  min-height: 100%;

  @media (max-width: 991px) {
    background-color: #f0f3f2;
    min-height: 100vh;
  }
`;
const ColLeft = styled(Col)`
  min-height: 100vh;
  @media (max-width: 991px) {
    min-height: auto;
    height: auto;
  }
`;
const ColRight = styled(Col)`
  min-height: 100%;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const LeftWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/images/LoginBanner.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const VertImg = styled.img`
  @media (max-width: 991px) {
    display: none;
  }
`;
const HorImg = styled.img`
  display: none;
  @media (max-width: 991px) {
    display: block;
    width: 400px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @media (max-width: 575px) {
    width: 250px;
  }
`;
const FormWrap = styled.div`
  padding-left: 100px;
  background-color: #f0f3f2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  @media (max-width: 991px) {
    min-height: auto;
    padding-top: 30px;
  }
  @media (max-width: 767px) {
    padding: 30px;
  }
`;
const RightWrap = styled.div`
  width: 100%;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const FAI = styled.img`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  margin-left: -35px;
  margin-top: 33px;
`;
const ActiveFAI = styled(FAI)`
  margin-top: 28px;
`;
const Progressbar = styled(Progress)`
  margin-top: 20px;
  width: 76%;
  > div > .ant-progress-text {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
let password;
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass_msg: null,
      confirmPass_msg: null,
      common_req: null,
      repeatEye: "password",
      newEye: "password",
      confPass: null,
      password: null,
      percent: "",
      stroke: ""
    };
  }

  static propTypes = {
    form: formShape
  };

  /* 
    Page:/reset-form
    This method is called when any input field is changed.
  */

  onChangeField(value, field) {
    var self = this;
    if (field === "password") {
      password = value;
      this.setState({ password: value }, () => {
        if (self.state.confPass !== null && self.state.password !== null) {
          self.onChangeField(self.state.confPass, "confirm_password");
        }
      });
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_])[A-Za-z\d!@#$%_]{8,60}$/;
      var bool = re.test(value);
      var numb = /^\d+$/,
        letters = /^[A-Za-z]+$/,
        alphanum = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      if (numb.test(value) || letters.test(value)) {
        this.setState({ stroke: "red", percent: 20 });
      }
      if (alphanum.test(value) && value.length < 6) {
        this.setState({ stroke: "orange", percent: 40 });
      }
      if (alphanum.test(value) && value.length === 8) {
        this.setState({ stroke: "yellow", percent: 60 });
      }
      if (re.test(value) && value.length > 8 && value.length < 60) {
        this.setState({ stroke: "#7CFC00", percent: 80 });
      }
      if (re.test(value) && value.length > 10 && value.length < 60) {
        this.setState({ stroke: "#008000", percent: 100 });
      }
      if (value.length > 60) {
        this.setState({ stroke: "red", percent: 0 });
      }
      if (value !== "" && value !== undefined) {
        if (bool === true) {
          this.setState({ newpassIcon: true, password: value });
          document.querySelector("#newchange_icon_success").style.display =
            "inline-block";
          document.querySelector("#newchange_icon_fail").style.display = "none";
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
        } else {
          var regex = /\s/;
          let check = regex.test(value);
          if (check) {
            this.setState({ newpassIcon: false });
            document.querySelector("#newchange_icon_success").style.display =
              "none";
            document.querySelector("#newchange_icon_fail").style.display =
              "inline-block";
            document.querySelectorAll(".pass_msg")[0].style.display = "block";
            this.setState({
              pass_msg: "Your password must not contain space."
            });
          } else {
            this.setState({ newpassIcon: false });
            document.querySelector("#newchange_icon_success").style.display =
              "none";
            document.querySelector("#newchange_icon_fail").style.display =
              "inline-block";
            document.querySelectorAll(".pass_msg")[0].style.display = "block";
            this.setState({
              pass_msg:
                "Your password must contain at least one uppercase letter,one lowercase letter, one special character(!@#$%_), and one number. Minimum 8 characters and maximum 60 characters."
            });
          }
        }
      } else {
        this.setState({ newpassIcon: false, percent: 0 });
        document.querySelector("#newchange_icon_success").style.display =
          "none";
        document.querySelector("#newchange_icon_fail").style.display = "none";
        document.querySelectorAll(".pass_msg")[0].style.display = "none";
      }
    }
    if (field === "confirm_password") {
      var boool = this.state.password === value ? true : false;
      if (value !== "") {
        this.setState({ confPass: value });
        if (boool === true) {
          this.setState({ confirmIcon: true });
          document.querySelector("#confirmchange_icon_success").style.display =
            "inline-block";
          document.querySelector("#confirmchange_icon_fail").style.display =
            "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display =
            "none";
        } else {
          this.setState({ confirmIcon: false });
          document.querySelector("#confirmchange_icon_success").style.display =
            "none";
          document.querySelector("#confirmchange_icon_fail").style.display =
            "inline-block";
          document.querySelectorAll(".confirmchange_msg")[0].style.display =
            "block";
          this.setState({
            confirmPass_msg: "Confirm Password does not match."
          });
        }
      } else {
        this.setState({ confirmIcon: false });
        document.querySelector("#confirmchange_icon_success").style.display =
          "none";
        document.querySelector("#confirmchange_icon_fail").style.display =
          "none";
        document.querySelectorAll(".confirmchange_msg")[0].style.display =
          "none";
      }
    }
  }

  /* 
    Page:/reset-form
    This method is called for notifications with profile.
  */

  openNotificationWithProfile = (type, head, desc) => {
    notification[type]({
      message: head,
      description: desc,
      duration: 3
    });
  };

  /* 
    Page:/reset-form
    This method is called when password reset is submitted.
  */

  _resetPassword = value => {
    let url = this.props.location.search.split("=");

    let form = {};
    form["password"] = value.password;
    form["reset_token"] = url[1];

    fetch(`${globalVariables.API_URL}/users/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          this.openNotificationWithProfile(
            "success",
            "Success",
            "Password changed successfully."
          );
          this.props.history.push("/login");
        } else {
          this.openNotificationWithProfile("error", "Error", responseData.err);
        }
      })
      .catch(error => {});
  };

  /* 
    Page:/reset-form
    This method is called when any input field is changed.
  */

  submit = () => {
    this.props.form.validateFields((error, value) => {
      // console.log(error, value, this.state.confirmIcon, this.state.newpassIcon);
      if (error === null && this.state.confirmIcon && this.state.newpassIcon) {
        if (value.password === value.confirm_password) {
          // console.log(value);
          this._resetPassword(value);
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
          document.querySelectorAll(".comp_pass")[0].style.display = "block";
          document.querySelectorAll(".confirmchange_msg")[0].style.display =
            "none";
          this.setState({ pass_msg: null, confirmPass_msg: null });
        } else {
          document.querySelectorAll(".comp_pass")[0].style.display = "block";
          document.querySelectorAll(".pass_msg")[0].style.display = "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display =
            "none";
          this.openNotificationWithProfile(
            "error",
            "Error",
            "Password do not match."
          );
        }
      } else {
        // console.log("ABCD", error);
        if (error !== null) {
          if (error.password !== undefined) {
            if (
              error.password.errors[0].message !== undefined &&
              error.password.errors[0].message !== null &&
              value.password == undefined
            ) {
              document.querySelectorAll(".pass_msg")[0].style.display = "block";
              this.setState({ pass_msg: "Password is required" });
            } else {
              document.querySelectorAll(".pass_msg")[0].style.display = "none";
              this.setState({ pass_msg: null });
            }
          }
          if (error.confirm_password !== undefined) {
            if (
              error.confirm_password.errors[0].message !== undefined &&
              error.confirm_password.errors[0].message !== null &&
              (value.confirm_password == undefined ||
                value.confirm_password == "")
            ) {
              document.querySelectorAll(".confirmchange_msg")[0].style.display =
                "block";
              this.setState({
                confirmPass_msg: "Confirm password is required"
              });
            } else {
              document.querySelectorAll(".confirmchange_msg")[0].style.display =
                "none";
              this.setState({ confrimPass_msg: null });
            }
          }
        } else {
        }
      }
    });
  };

  /* 
    Page:/reset-form
    This method is called when we click on eye Icon to show/hide password.
  */

  handleEye(type) {
    if (type === "new") {
      if (this.state.newEye === "password") {
        this.setState({ newEye: "text" });
      } else {
        this.setState({ newEye: "password" });
      }
    } else {
      if (this.state.repeatEye === "password") {
        this.setState({ repeatEye: "text" });
      } else {
        this.setState({ repeatEye: "password" });
      }
    }
  }

  /* 
    Page:/reset-form
    This method is called for custom notifications.
  */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    const { newEye, repeatEye, percent } = this.state;
    var me = this;

    return (
      <div>
        <RowWrap>
          <ColLeft sm={24} lg={12}>
            <LeftWrap>
              <a href={globalVariables.WordpressSiteURL}>
                <VertImg
                  className="wow fadeInUp"
                  src="/images/LeftSideLogo.png"
                />
                <HorImg className="wow fadeInUp" src="/images/logoWhite.png" />
              </a>
            </LeftWrap>
          </ColLeft>
          <ColRight sm={24} lg={12}>
            <FormWrap>
              <RightWrap className="wow fadeInDown">
                <LoginHead>Reset Password</LoginHead>
                <PassLabel>Password*</PassLabel>
                <div>
                  <Full
                    type={newEye}
                    {...getFieldProps("password", {
                      onChange(e) {
                        me.onChangeField(e.target.value, "password");
                      }, // have to write original onChange here if you need
                      rules: [{ type: "string", required: true }]
                    })}
                  />
                  {newEye === "password" ? (
                    <FAI
                      src={_EYE}
                      onClick={this.handleEye.bind(this, "new")}
                    />
                  ) : (
                    <ActiveFAI
                      src={_ACTIVEEYE}
                      onClick={this.handleEye.bind(this, "new")}
                    />
                  )}
                  <UserIconS
                    id="newchange_icon_success"
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                  <UserIconF
                    id="newchange_icon_fail"
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                  />
                  <FullReq className="pass_msg">{this.state.pass_msg}</FullReq>
                  <Progressbar
                    type="line"
                    size="small"
                    percent={percent}
                    strokeColor={this.state.stroke}
                  />
                </div>

                <PassconfirmLabel>Confirm Password*</PassconfirmLabel>
                <div>
                  <Password
                    type={repeatEye}
                    {...getFieldProps("confirm_password", {
                      onChange(e) {
                        me.onChangeField(e.target.value, "confirm_password");
                      }, // have to write original onChange here if you need
                      rules: [{ type: "string", required: true }]
                    })}
                  />
                  {repeatEye === "password" ? (
                    <FAI
                      src={_EYE}
                      onClick={this.handleEye.bind(this, "confirm_password")}
                    />
                  ) : (
                    <ActiveFAI
                      src={_ACTIVEEYE}
                      onClick={this.handleEye.bind(this, "confirm_password")}
                    />
                  )}
                  <UserIconS
                    id="confirmchange_icon_success"
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                  <UserIconF
                    id="confirmchange_icon_fail"
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                  />
                  <PasswordReq className="confirmchange_msg">
                    {this.state.confirmPass_msg}
                  </PasswordReq>
                </div>
                <CommonReq className="comp_pass">
                  {this.state.common_req}
                </CommonReq>
                {(errors = getFieldError("required")) ? errors.join(",") : null}
                <ResetButton onClick={this.submit}>Reset</ResetButton>
              </RightWrap>
            </FormWrap>
          </ColRight>
        </RowWrap>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    reset:
      state.simpleReducer.reset !== undefined
        ? state.simpleReducer.reset
        : false
  };
};
const mapDispatchToProps = dispatch => ({
  resetAction: values => dispatch(resetAction(values)),
  resetData: value => dispatch(resetData(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(ResetPassword));
