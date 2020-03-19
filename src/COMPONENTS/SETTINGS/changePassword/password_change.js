/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Row, Col, Input, notification, Progress } from "antd";
import styled from "styled-components";
import { createForm, formShape } from "rc-form";
import {
  removeLoader,
  addLoader,
  getProfileDataAction
} from "ACTIONS/SETTINGS/settingActions";

/* components */
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { _EYE, _ACTIVEEYE } from "CONSTANTS/images";
import RegenerateBackupCode from "./regenerate_backup";
import ChangeEmail from "./change_email";
import TFAModal from "./twofactor_modal";
import { translate } from "react-i18next";
import TFAModalOTP from "../../../SHARED-COMPONENTS/TFAModal";

/* STYLED-COMPONENTS */
import { HeaderCol, Save } from "../Personaldetails/personal_details";
import {
  passwordChange,
  passwordChangeData,
  TF_Enable,
  QRData,
  verifyTF,
  verifyQRData,
  TF_Disable,
  disableAction
} from "ACTIONS/SETTINGS/passwordActions.js";
import {
  UserIconF,
  UserIconS,
  EmailReq
} from "COMPONENTS/LANDING/USERFORMS/login_form";
import { globalVariables } from "../../../Globals";
const Wrapper = styled.div``;
let { API_URL } = globalVariables;
const ChangeRow = styled(Row)`
  &:after {
    content: "";
    left: 8%;
    position: absolute;
    width: 84%;
    bottom: 0px;
    border-bottom: 1px solid #d6d6d6;
  }
  &.two_factor_no_border:after {
    border-bottom: 0;
  }
`;
const EmailRow = styled(Row)`
  &:after {
    content: "";
    left: 8%;
    position: absolute;
    width: 84%;
    bottom: 0px;
    border-bottom: 1px solid #d6d6d6;
  }
`;
const Passreq = styled(EmailReq)`
  margin-left: 0px;
  width: 90%;
  @media (max-width: 510px) {
    width: 85%;
  }
`;
const ChangeCol = styled.div`
  width: 42%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 40px;

  @media (max-width: 1530px) {
    width: 46%;
  }
  @media (max-width: 1400px) {
    width: 54%;
  }
  @media (max-width: 1190px) {
    width: 60%;
  }
  @media (max-width: 1070px) {
    width: 65%;
  }
  @media (max-width: 990px) {
    width: 75%;
  }
  @media (max-width: 856px) {
    width: 90%;
  }
`;
const Old = styled.div`
    width: 635px; 
    margin:auto;
    text-align:left
    margin-top:35px;
    @media(max-width:720px)
    {
        width:400px;
    }
    @media(max-width:510px)
    {
        width:260px;
    }
`;
const NewP = styled(Old)`
  margin-top: 30px;
`;
const Repeat = styled(Old)`
  margin-top: 30px;
`;
export const OldLabel = styled.label`
  font-size: 14.007px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "#617090" : "rgba( 80, 80, 80, 0.502 )"};
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
`;
const Newlabel = styled(OldLabel)``;
const Repeatlabel = styled(OldLabel)``;
export const OldInput = styled(Input)`
    margin-top:5px;
    width: 95%;
    background-color:${props =>
      props.theme.mode === "dark" ? "#041422" : "#f8f8f8"};
    color:${props => (props.theme.mode === "dark" ? "white" : "")}
    display:inline-block;
    font-family: "Open Sans";
    font-size:16;
    height:auto;
    font-weight:600;
    padding:10px;
    padding-right:45px;
    &:focus, &:hover{
        border-color: rgb(0, 170, 250);;
        outline:0;
        box-shadow:none;
    }
    @media(max-width:720px)
    {
        width:370px;
    }
    @media(max-width:510px)
    {
        width:220px;
    }
`;
const NewInput = styled(OldInput)``;
const RepeatInput = styled(OldInput)``;
const Buttondiv = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
`;
const NewButton = styled(Save)`
  border: none;
  width: auto;
  &:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;
const TwofactorRow = styled(Row)`
  margin-top: 40px;
`;
const TFCol = styled(Col)``;
const HeadTF = styled.p`
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props =>
    props.theme.mode === "dark" ? "#ffffff" : "rgb( 80, 80, 80 )"};
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
`;
const IsEnabled = styled.p`
  font-size: 15.008px;
  font-family: "Open Sans";
  margin-bottom: 0px !important;
  color: ${props =>
    props.theme.mode === "dark" ? "#617090" : "rgb( 80, 80, 80 )"};
  margin-top: 20px;
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
`;
const Headtext = styled.p`
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
const BarRow = styled(Row)`
    width:81%;
    margin:0 auto;
    height:auto
    background-color:${props =>
      props.theme.mode === "dark" ? "#01090f" : "#f8f8f8"};
    margin-top:45px;
    border:1px solid #d6d6d6;
    border-radius:10px;
    margin-bottom:55px;
`;
const LeftCol = styled(Col)`
  &:after {
    content: "";
    top: 8%;
    position: absolute;
    height: 114%;
    right: 0px;
    border-right: 1px solid #d6d6d6;
  }
  @media (min-width: 1024px) {
    &:after {
      height: 100%;
    }
  }
  @media (max-width: 992px) {
    &:after {
      display: none;
    }
  }
`;
const ImageWrap = styled.div`
  margin-top: 50px;
`;
const Barcode = styled.img`
  width: 190px;
  height: 190px;
  border-width: 10px solid #ffffff;
`;
const Keywrap = styled.div`
  margin-top: 20px;
`;
const Keytext = styled.span`
  font-size: 13.007px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
  line-height: 1.846;
  text-align: center;
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
`;
const Key = styled.p`
  font-size: 13.007px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "rgb(0,170,250)" : "rgb(0,170,250)"};
  line-height: 1.846;
  text-align: center;
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
`;
const RightCol = styled(Col)``;
const Orderlist = styled.ol`
  margin-top: 50px;
  text-align: left;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
const LI = styled.li`
  margin-top: 10px;
`;
const TFcode = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-left: 40px;
`;
const TFlabel = styled.label`
  color: ${props => (props.theme.mode === "dark" ? "rgb(0,170,250)" : "")};
`;
const TFinput = styled(Input)`
  width: 148px;
  margin-top: 10px;
  dipslay: inline-block;
`;
const Enable = styled.div`
  margin-bottom: 40px;
  text-align: left;
  margin-left: 40px;
  margin-top: 30px;
`;
const Ebutton = styled(Save)`
  border: none;
  width: auto;
  &:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;
const FAI = styled.img`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  margin-left: -35px;
  margin-top: 18px;
  color: #8a8a8a;
  font-size: 18px;
`;
const ActiveFAI = styled(FAI)`
  margin-top: 13px;
`;
const Progressbar = styled(Progress)`
  margin-top: 20px;
  width: 100%;
  > div > .ant-progress-text {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;

export const RedSpan = styled.span`
  color: red;
`;

export const GreenSpan = styled.span`
  color: green;
`;
let password;

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: "DISABLED",
      Key: null,
      typeEye: "password",
      newEye: "password",
      repeatEye: "password",
      currentpassIcon: false,
      newpassIcon: false,
      confirmIcon: false,
      otpIcon: false,
      is_twofactor: "ENABLE",
      QR_img: null,
      otp_msg: null,
      percent: "",
      stroke: "",
      confPass: "",
      verify_otp: "",
      showModalTFA: false,
      backupCodeTFA: "",
      showTFAModalOtp: false
    };
    this.t = this.props.t;
  }
  static propTypes = {
    form: formShape
  };

  /* Life-Cycle Methods */
  componentDidMount() {
    if (this.props.profileDetails) {
      if (this.props.profileDetails.is_twofactor === false) {
        this.setState({ is_twofactor: "ENABLE", isEnabled: "DISABLED" });
      } else {
        this.setState({ is_twofactor: "DISABLE", isEnabled: "ENABLED" });
      }
    }
  }
  componentWillReceiveProps(props, newProps) {
    if (props.passChange !== false) {
      if (props.passChange.status === 200) {
        this.props.form.resetFields();
        this.setState({ percent: 0 });
        this.openNotificationWithIcon(
          "success",
          this.t("change_password_text.message"),
          props.passChange.message
        );
      } else {
        this.openNotificationWithIcon(
          "error",
          this.t("change_password_text.message"),
          props.passChange.err
        );
      }
      this.props.passwordChangeData();
    }
    if (props.verifyOTP) {
      if (props.verifyOTP.status === 200) {
        // console.log(props.verifyOTP);
        this.openNotificationWithIcon(
          "success",
          this.t("head_change_two_factor_status.message"),
          props.verifyOTP.message
        );
        this.setState({
          is_twofactor: "DISABLE",
          show_QR: false,
          isEnabled: "ENABLED",
          showModalTFA: true,
          backupCodeTFA: props.verifyOTP.twofactor_backup_code
        });
      } else {
        this.openNotificationWithIcon(
          "error",
          this.t("head_change_two_factor_status.message"),
          props.verifyOTP.err
        );
      }
      this.props.verifyQRData();
    }
    if (props.DisableTF) {
      if (props.DisableTF.status === 200) {
        this.openNotificationWithIcon(
          "success",
          this.t("head_change_two_factor_status.message"),
          props.DisableTF.message
        );
        this.setState({
          is_twofactor: "ENABLE",
          isEnabled: "DISABLED",
          show_QR: false
        });
      } else {
        this.openNotificationWithIcon(
          "error",
          this.t("head_change_two_factor_status.message"),
          props.DisableTF.err
        );
      }
      this.props.disableAction();
    }

    if (props.QR_code) {
      this.setState({ show_QR: true });
      if (
        props.QR_code.dataURL !== undefined &&
        props.QR_code.tempSecret !== undefined
      ) {
        this.setState({
          QR_img: props.QR_code.dataURL,
          Key: props.QR_code.tempSecret
        });
      }
      this.props.QRData();
    }
  }

  /* 
        Page: /editProfile --> Security
        It is called when eye is clicked in Password Input to show hide text.
    */

  handleEye(type) {
    if (type === "old") {
      if (this.state.typeEye === "password") {
        this.setState({ typeEye: "text" });
      } else {
        this.setState({ typeEye: "password" });
      }
    } else if (type === "new") {
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
        Page: /editProfile --> Security
        It is called save new password button is clicked for password change.
    */

  submit = () => {
    const { t } = this.props;
    this.props.form.validateFields((error, value) => {
      if (
        error === null &&
        this.state.newpassIcon === true &&
        this.state.confirmIcon === true
      ) {
        document.querySelectorAll(".oldchange_msg")[0].style.display = "none";
        document.querySelectorAll(".newchange_msg")[0].style.display = "none";
        document.querySelectorAll(".confirmchange_msg")[0].style.display =
          "none";
        this.props.passwordChange(this.props.isLoggedIn, value);
        document.querySelector("#newchange_icon_success").style.display =
          "none";
        document.querySelector("#confirmchange_icon_success").style.display =
          "none";
      } else {
        if (
          value.current_password === "" ||
          value.current_password === null ||
          value.current_password === undefined
        ) {
          this.setState(
            {
              current_msg: `${t("subhead_title_old_password.message")} ${t(
                "validations:field_is_required.message"
              )}.`
            },
            () => {
              document.querySelectorAll(".oldchange_msg")[0].style.display =
                "block";
            }
          );
        }
        if (
          value.new_password === "" ||
          value.new_password === null ||
          value.new_password === undefined
        ) {
          this.setState(
            {
              new_msg: `${t("subhead_title_new_password.message")} ${t(
                "validations:field_is_required.message"
              )}.`
            },
            () => {
              document.querySelectorAll(".newchange_msg")[0].style.display =
                "block";
            }
          );
        }
        if (
          value.confirm_password === "" ||
          value.confirm_password === null ||
          value.confirm_password === undefined
        ) {
          this.setState(
            {
              confirmPass_msg: `${t(
                "general_1:subhead_title_confirm_password.message"
              )} ${t("validations:field_is_required.message")}.`
            },
            () => {
              document.querySelectorAll(".confirmchange_msg")[0].style.display =
                "block";
            }
          );
        }
      }
    });
  };

  /* 
        Page: /editProfile --> Security
        It is called when any input is changed and handle it and also validate it.
    */
  onChangeField(value, field) {
    const { t } = this.props;
    if (field === "current_password") {
      var regexp = /^[a-zA-Z0-9]*$/;
      if (value !== "") {
        document.querySelector("#passchange_icon_success").style.display =
          "none";
        document.querySelector("#passchange_icon_fail").style.display = "none";
        document.querySelectorAll(".oldchange_msg")[0].style.display = "none";
      } else {
        document.querySelectorAll(".oldchange_msg")[0].style.display = "block";
        this.setState({
          current_msg: `${t("subhead_title_old_password.message")} ${t(
            "validations:field_is_required.message"
          )}.`
        });
      }
    } else if (field === "new_password") {
      password = value;
      if (this.state.confPass !== undefined) {
        // alert("1");
        if (this.state.confPass === value) {
          //   alert("2");
          this.setState({ confirmIcon: true });
          document.querySelector("#confirmchange_icon_success").style.display =
            "inline-block";
          document.querySelector("#confirmchange_icon_fail").style.display =
            "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display =
            "none";
        } else if (this.state.confPass) {
          this.setState({ confirmIcon: true });
          document.querySelector("#confirmchange_icon_success").style.display =
            "none";
          document.querySelector("#confirmchange_icon_fail").style.display =
            "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display =
            "block";
          this.setState({
            confirmPass_msg: this.t(
              "validations:password_mismatch_error.message"
            )
          });
        } else {
          this.setState({ confirmIcon: true });
          document.querySelector("#confirmchange_icon_success").style.display =
            "none";
          document.querySelector("#confirmchange_icon_fail").style.display =
            "none";
          document.querySelectorAll(".confirmchange_msg")[0].style.display =
            "none";
        }
      }
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,60}$/;
      var bool = re.test(value);
      var numb = /^\d+$/,
        letters = /^[A-Za-z]+$/,
        alphanum = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      if (numb.test(value) || letters.test(value)) {
        this.setState({ stroke: "red", percent: 20 });
      }
      if (value.length >= 8 && value.length <= 60) {
        this.setState({ stroke: "red", percent: 20 });
      }
      if (value.length >= 8 && value.length <= 60 && alphanum.test(value)) {
        this.setState({ stroke: "orange", percent: 40 });
      }
      if (
        value.length >= 8 &&
        value.length <= 60 &&
        alphanum.test(value) &&
        re.test(value)
      ) {
        this.setState({ stroke: "#7CFC00", percent: 80 });
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
      if (value.trim() !== "" && value !== undefined) {
        if (bool === true) {
          this.setState({ newpassIcon: true, password: value });
          document.querySelector("#newchange_icon_success").style.display =
            "inline-block";
          document.querySelector("#newchange_icon_fail").style.display = "none";
          document.querySelectorAll(".newchange_msg")[0].style.display = "none";
        } else {
          var regex = /\s/;
          let check = regex.test(value);
          if (check) {
            this.setState({ newpassIcon: false });
            document.querySelector("#newchange_icon_success").style.display =
              "none";
            document.querySelector("#newchange_icon_fail").style.display =
              "inline-block";
            document.querySelectorAll(".newchange_msg")[0].style.display =
              "block";
            this.setState({
              new_msg: `${t("general_1:password_no_space_error.message")}`
            });
          } else {
            this.setState({ newpassIcon: false });
            document.querySelector("#newchange_icon_success").style.display =
              "none";
            document.querySelector("#newchange_icon_fail").style.display =
              "inline-block";
            document.querySelectorAll(".newchange_msg")[0].style.display =
              "block";
            this.setState({
              new_msg: `${t("general_1:password_regex_error.message")}`
            });
          }
        }
      } else {
        this.setState({ newpassIcon: false, percent: 0 });
        document.querySelector("#newchange_icon_success").style.display =
          "none";
        document.querySelector("#newchange_icon_fail").style.display =
          "inline-block";
        document.querySelectorAll(".newchange_msg")[0].style.display = "block";
        this.setState({
          new_msg: `${t("subhead_title_new_password.message")} ${t(
            "validations:field_is_required.message"
          )}.`
        });
      }
    } else if (field === "confirm_password") {
      //   alert("repeat");
      var boool = password === value ? true : false;
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
            confirmPass_msg: `${t(
              "general_1:password_not_match_error.message"
            )}`
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
    } else {
    }
  }

  /* 
        Page: /editProfile --> Security
        It is called when Enable/Disable TFAUTH is clicked so to check if TF is enabled or not.
    */

  disable2FA = async otp => {
    try {
      this.props.showLoader();
      let response = await (
        await fetch(API_URL + "/users/disable-two-factor", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": localStorage["i18nextLng"], 
            Authorization: "Bearer " + this.props.isLoggedIn
          },
          body: JSON.stringify({ otp: otp })
        })
      ).json();
      if (response.status == 200) {
        this.openNotificationWithIcon("success", "Success", response.message);
        this.setState({
          showTFAModalOtp: false,
          is_twofactor: "ENABLE",
          isEnabled: "DISABLED",
          show_QR: false
        });
        this.props.getProfileData(this.props.isLoggedIn);
      } else {
        this.openNotificationWithIcon(
          "error",
          "Error",
          response.message ? response.message : response.error
        );
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      this.props.hideLoader();
    }
  };

  TF_AUTH(otp = undefined) {
    if (this.props.profileDetails.is_twofactor === true) {
      if (!otp) {
        this.setState({ showTFAModalOtp: true });
      } else {
        this.disable2FA(otp);
      }
    } else this.props.TF_Enable(this.props.isLoggedIn);
  }

  /* 
        Page: /editProfile --> Security
        It is called when input field is changed and we can validate it. 
    */
  changeOTP(value, field) {
    const { t } = this.props;
    if (field === "otp") {
      var re = /^[0-9]{6}$/;
      var bool = re.test(value);
      if (value.trim() !== "") {
        if (bool === true) {
          this.setState({ otpIcon: true });
          document.querySelector("#otp_success").style.display = "inline-block";
          document.querySelector("#otp_fail").style.display = "none";
          document.querySelectorAll(".MSG_OTP")[0].style.display = "none";
        } else {
          this.setState({ otpIcon: false });
          document.querySelector("#otp_success").style.display = "none";
          document.querySelector("#otp_fail").style.display = "inline-block";
          document.querySelectorAll(".MSG_OTP")[0].style.display = "block";
          this.setState({
            otp_msg: `*${t("validations:otp_error.message")}`
          });
        }
      } else {
        this.setState({ otpIcon: false });
        document.querySelector("#otp_success").style.display = "none";
        document.querySelector("#otp_fail").style.display = "none";
        document.querySelectorAll(".MSG_OTP")[0].style.display = "block";
        this.setState({
          otp_msg: `*${t("general_1:otp_required_error.message")}`
        });
      }
    }
  }

  /* 
        Page: /editProfile --> Security
        It is called when input field is changed and we can validate it. 
    */
  OTPfield(e) {
    this.setState({ verify_otp: e.target.value });
    this.changeOTP(e.target.value, "otp");
  }

  /* 
        Page: /editProfile --> Security
        It is called when after entering OTP,we click on ENABLE and API is called to Enable the Two-Factor. 
    */
  finalEnable() {
    let value = {};
    value["otp"] = this.state.verify_otp;
    if (this.state.otpIcon == true)
      this.props.verifyTF(this.props.isLoggedIn, value);
    else this.changeOTP(this.state.verify_otp, "otp");
  }

  /* 
        Page: /editProfile --> Security
        It is called for cutom notifications.
    */
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }

  TFAModalCancel = () => {
    this.setState({
      showModalTFA: false
    });
  };
  render() {
    var me = this;
    const { getFieldProps } = this.props.form;
    const { t } = this.props;
    const {
      isEnabled,
      typeEye,
      newEye,
      current_msg,
      percent,
      repeatEye,
      showTFAModalOtp
    } = this.state;

    return (
      <Wrapper>
        <Row>
          <Col span={6} />
          <HeaderCol span={12}>
            <span>{t("head_change_password.message")}</span>
          </HeaderCol>
        </Row>
        <ChangeRow>
          <ChangeCol>
            <Old>
              <OldLabel>{t("subhead_title_old_password.message")}*</OldLabel>
              <div>
                <OldInput
                  type={typeEye}
                  {...getFieldProps("current_password", {
                    onChange(e) {
                      me.onChangeField(e.target.value, "current_password");
                    }, // have to write original onChange here if you need
                    rules: [
                      { type: "string", required: true, whitespace: true }
                    ]
                  })}
                />
                {typeEye === "password" ? (
                  <FAI src={_EYE} onClick={this.handleEye.bind(this, "old")} />
                ) : (
                  <ActiveFAI
                    src={_ACTIVEEYE}
                    onClick={this.handleEye.bind(this, "old")}
                  />
                )}
                <UserIconS
                  id="passchange_icon_success"
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
                <UserIconF
                  id="passchange_icon_fail"
                  type="close-circle"
                  theme="twoTone"
                  twoToneColor="red"
                />
              </div>
              <Passreq className="oldchange_msg">{current_msg}</Passreq>
            </Old>
            <NewP>
              <Newlabel>{t("subhead_title_new_password.message")}*</Newlabel>
              <div>
                <NewInput
                  type={newEye}
                  {...getFieldProps("new_password", {
                    onChange(e) {
                      me.onChangeField(e.target.value, "new_password");
                    }, // have to write original onChange here if you need
                    rules: [
                      { type: "string", required: true, whitespace: false }
                    ]
                  })}
                />
                {newEye === "password" ? (
                  <FAI src={_EYE} onClick={this.handleEye.bind(this, "new")} />
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
              </div>
              <Passreq className="newchange_msg">{this.state.new_msg}</Passreq>
              <Progressbar
                type="line"
                size="small"
                percent={percent}
                strokeColor={this.state.stroke}
              />
            </NewP>
            <Repeat>
              <Repeatlabel>
                {t("subhead_title_re_enter_new_password.message")}*
              </Repeatlabel>
              <div>
                <RepeatInput
                  type={repeatEye}
                  {...getFieldProps("confirm_password", {
                    onChange(e) {
                      me.onChangeField(e.target.value, "confirm_password");
                    }, // have to write original onChange here if you need
                    rules: [
                      { type: "string", required: true, whitespace: true }
                    ]
                  })}
                />
                {repeatEye === "password" ? (
                  <FAI
                    src={_EYE}
                    onClick={this.handleEye.bind(this, "repeat")}
                  />
                ) : (
                  <ActiveFAI
                    src={_ACTIVEEYE}
                    onClick={this.handleEye.bind(this, "repeat")}
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
              </div>
              <Passreq className="confirmchange_msg">
                {this.state.confirmPass_msg}
              </Passreq>
            </Repeat>
            <Buttondiv>
              <NewButton onClick={this.submit}>
                {t("save_new_password_btn.message")}
              </NewButton>
            </Buttondiv>
          </ChangeCol>
        </ChangeRow>
        <EmailRow>
          <ChangeEmail props={this.props} />
        </EmailRow>

        <ChangeRow className="two_factor_no_border">
          <TwofactorRow>
            <TFCol>
              <HeadTF>{t("head_change_two_factor_status.message")}</HeadTF>
              <IsEnabled>
                {" "}
                {t("title_status.message")}:
                {isEnabled === "DISABLED" ? (
                  <RedSpan> {t("general_1:disabled_text.message")}</RedSpan>
                ) : (
                  <GreenSpan> {t("general_1:enabled_text.message")}</GreenSpan>
                )}
              </IsEnabled>
              <Headtext>
                {isEnabled === "DISABLED" ? (
                  <span>{t("two_factor_text1.message")} </span>
                ) : (
                  <span>{t("two_factor_text2.message")}</span>
                )}
              </Headtext>
              <Buttondiv>
                <NewButton onClick={() => this.TF_AUTH()}>
                  {(this.state.is_twofactor === "DISABLE"
                    ? t("general_1:disable_text.message")
                    : t("general_1:enable_text.message")) +
                    " " +
                    t("general_1:authenticator_text.message")}
                  {/* <NewButton onClick={()=>this.TF_AUTH()}>
                  {" "}
                  {`${this.state.is_twofactor} AUTHENTICATOR`} */}
                </NewButton>
              </Buttondiv>
              <TFAModal
                visible={this.state.showModalTFA}
                TFAModalCancel={() => this.TFAModalCancel()}
                TFACode={this.state.backupCodeTFA}
              />
            </TFCol>
          </TwofactorRow>
          {this.state.show_QR === true ? (
            <BarRow>
              <LeftCol sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                <ImageWrap>
                  <Barcode src={this.state.QR_img} />
                </ImageWrap>
                <Keywrap>
                  <Keytext>{t("two_factor_text3.message")}</Keytext>
                  <Key>{this.state.Key}</Key>
                </Keywrap>
              </LeftCol>
              <RightCol sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                <Orderlist>
                  <LI>{t("two_factor_text_point1.message")} </LI>
                  <LI>{t("two_factor_text_point2.message")}</LI>
                  <LI>{t("two_factor_text_point3.message")}</LI>
                  <LI>{t("two_factor_text_point4.message")}</LI>
                </Orderlist>
                <TFcode>
                  <TFlabel>{t("subhead_title_enter_code.message")}:</TFlabel>
                  <div>
                    <TFinput onChange={this.OTPfield.bind(this)} />
                    <UserIconS
                      id="otp_success"
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                    <UserIconF
                      id="otp_fail"
                      type="close-circle"
                      theme="twoTone"
                      twoToneColor="red"
                    />
                  </div>
                  <Passreq className="MSG_OTP">{this.state.otp_msg}</Passreq>
                </TFcode>
                <Enable>
                  <Ebutton onClick={this.finalEnable.bind(this)}>
                    {t("enable_btn.message")}
                  </Ebutton>
                </Enable>
              </RightCol>
            </BarRow>
          ) : (
            ""
          )}
        </ChangeRow>
        {/* {console.log(isEnabled)} */}
        {isEnabled === "ENABLED" && <RegenerateBackupCode />}
        {this.props.loader === true ? <FaldaxLoader /> : ""}
        <TFAModalOTP
          visible={showTFAModalOtp}
          isLoggedIn={this.props.isLoggedIn}
          submit={otp => this.TF_AUTH(otp)}
        />
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    passChange:
      state.simpleReducer.changePass !== undefined
        ? state.simpleReducer.changePass
        : false,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    QR_code:
      state.passwordReducer.QR_code !== undefined
        ? state.passwordReducer.QR_code
        : null,
    verifyOTP:
      state.passwordReducer.verifyOTP !== undefined
        ? state.passwordReducer.verifyOTP
        : null,
    DisableTF:
      state.passwordReducer.DisableTF !== undefined
        ? state.passwordReducer.DisableTF
        : null,
    loader: state.simpleReducer.loader
  };
}

const mapDispatchToProps = dispatch => ({
  passwordChange: (isLoggedIn, value) =>
    dispatch(passwordChange(isLoggedIn, value)),
  passwordChangeData: () => dispatch(passwordChangeData()),
  TF_Enable: isLoggedIn => dispatch(TF_Enable(isLoggedIn)),
  QRData: () => dispatch(QRData()),
  verifyTF: (isLoggedIn, value) => dispatch(verifyTF(isLoggedIn, value)),
  verifyQRData: () => dispatch(verifyQRData()),
  TF_Disable: isLoggedIn => dispatch(TF_Disable(isLoggedIn)),
  disableAction: () => dispatch(disableAction()),
  showLoader: () => dispatch(addLoader()),
  hideLoader: () => dispatch(removeLoader()),
  getProfileData: isLoggedIn => dispatch(getProfileDataAction(isLoggedIn))
});

export default translate(["security_tab", "general_1", "validations"])(
  connect(mapStateToProps, mapDispatchToProps)(createForm()(PasswordChange))
);
