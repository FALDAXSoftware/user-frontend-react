/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Row, Col, Input, notification, Modal, Button } from "antd";
import styled from "styled-components";
import { createForm, formShape } from "rc-form";
import SimpleReactValidator from "simple-react-validator";
import { translate } from "react-i18next";

/* components */
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";
import { getProfileDataAction } from "ACTIONS/SETTINGS/settingActions";
import { LogoutUser } from "ACTIONS/authActions";

/* STYLED-COMPONENTS */
import { HeaderCol } from "../Personaldetails/personal_details";
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
export const NewP = styled(Old)`
  margin-top: 30px;
`;
export const InputLabel = styled.label`
  font-size: 14.007px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "#617090" : "rgba( 80, 80, 80, 0.502 )"};
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
`;
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
export const NewInput = styled(OldInput)``;
export const OTPInput = styled(NewInput)`
  width: 74%;
`;
export const ButtonDiv = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  > p {
    > button {
      margin: 20px 0 0 0;
    }
  }
  &.terms_btn_div {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    > button {
      margin: 0 20px;
    }
    > div {
      > button {
        margin: 0 20px;
      }
    }
  }
  @media (max-width: 400px) {
    &.terms_btn_div {
      > button {
        margin: 0 15px;
      }
      > div {
        > button {
          margin: 0 15px;
        }
      }
    }
  }
`;
export const Save = styled(Button)`
  font-size: 13.217px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  -moz-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -webkit-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -ms-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  border-radius: 24px;
  background-color: rgb(76, 132, 255);
  box-shadow: 0px 4px 10px 0px rgba(76, 132, 255, 0.33);
  margin-left: 10px;
  width: 15%;
  height: 40px;
  @media (max-width: 600px) {
    width: 100px;
  }
`;
export const NewButton = styled(Save)`
  border: none;
  width: auto;
  &:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;
const EmailDN = styled.p`
  font-weight: 600;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
export const Description = styled.p`
  color: ${props => (props.theme.mode == "dark" ? "white" : "")};
`;
export const VerifyModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${props => (props.theme.mode == "dark" ? "#041222" : "")};
    .ant-modal-header {
      background: ${props => (props.theme.mode == "dark" ? "#041222" : "")};
      .ant-modal-title {
        color: ${props => (props.theme.mode == "dark" ? "white" : "")};
      }
    }
  }
`;

class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      loader: false,
      isShowOTP: false,
      errType: ""
    };
    this.t = this.props.t;
    this.validator = new SimpleReactValidator({
      email: {
        // name the rule
        message: this.t("validations:invalid_email_error.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^[-a-zA-Z0-9~!$%^&*_=+}{\'?]+(\.[-a-zA-Z0-9~!$%^&*_=+}{\'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|AERO|ARPA|BIZ|COM|COOP|EDU|GOV|INFO|INT|MIL|MUSEUM|NAME|NET|ORG|PRO|TRAVEL|MOBI|[a-zA-Z][a-zA-Z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
          var bool = re.test(String(val).toLowerCase());
          return bool;
        }
      }
    });
    this.otpValidator = new SimpleReactValidator();
    this.clearValidation = this.clearValidation.bind(this);
  }

  static propTypes = {
    form: formShape
  };

  /* LifeCycle Methods */
  componentDidMount = () => {
    let fields = this.state.fields;
    fields["oldEmail"] = this.props.profileDetails.email;
    this.setState({ fields });
  };

  componentWillReceiveProps = nextProps => {
    let fields = this.state.fields;
    fields["oldEmail"] = nextProps.profileDetails.email;
    this.setState({ fields });
  };

  /* 
        Page: /editProfile --> Security
        It is called when we click confirm after Update Email click.
        API is called to update Email.
    */

  changeEmail = () => {
    const { fields } = this.state;

    if (this.validator.allValid()) {
      let formData = {
        new_email: fields["newEmail"]
      };

      this.setState({ loader: true });
      fetch(API_URL + `/users/update-email`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            this.setState({ loader: false, isShowOTP: true });
          } else {
            this.setState({
              loader: false,
              errMsg: true,
              errType: "Error",
              errMessage: responseData.err
            });
          }
        })
        .catch(error => {
          this.setState({
            loader: false,
            errMsg: true,
            errType: "Error",
            errMessage: "Something went wrong!!"
          });
        });
    } else {
      this.setState({ loader: false });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  /* 
        Page: /editProfile --> Security
        It is called to confirm new email.
        API is called to verify entered email.
    */

  verifyEmail = () => {
    const { fields } = this.state;

    if (this.otpValidator.allValid()) {
      let formData = {
        new_email_token: fields["otp"]
      };
      let _this = this;

      this.setState({ loader: true });
      fetch(API_URL + `/users/confirm-new-email`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 200) {
            let formData = {
              user_id: this.props.profileDetails.id,
              jwt_token: this.props.isLoggedIn
            };

            let fields = this.state.fields;
            fields["newEmail"] = null;
            fields["otp"] = null;
            this.setState({
              loader: false,
              isShowOTP: false,
              errMsg: true,
              errType: "Success",
              errMessage: responseData.message
            });
            this.props.props.history.push("/verify-email");
            _this.validator = new SimpleReactValidator();
            _this.props.LogoutUser(this.props.isLoggedIn, formData);
          } else {
            this.setState({
              loader: false,
              errMsg: true,
              errType: "Error",
              errMessage: responseData.err
            });
          }
        })
        .catch(error => {
          this.setState({
            loader: false,
            errMsg: true,
            errType: "Error",
            errMessage: "Something went wrong!!"
          });
        });
    } else {
      this.setState({ loader: false });
      this.otpValidator.showMessages();
      this.forceUpdate();
    }
  };

  /* 
        Page: /editProfile --> Security
        It is called to when Input field is changed with parameters with name and value.
    */

  clearValidation() {
    this.validator.hideMessages();
    this.otpValidator.hideMessages();
    this.forceUpdate();
    // rerender to hide messages for the first time
  }

  onChangeField = (field, e) => {
    this.clearValidation();
    let fields = this.state.fields;
    if (e.target.value.trim() === "") {
      fields[field] = "";
    } else {
      fields[field] = e.target.value;
    }
    this.setState({ fields });
  };

  /* 
        Page: /editProfile --> Security
        It is called when for any notification to be shown.
    */

  openNotificationWithIcon(type) {
    notification[type]({
      message: this.state.errType,
      description: this.state.errMessage
    });
    this.setState({ errMsg: false });
  }

  /* 
        Page: /editProfile --> Security
        It is called when we want to close Modal for verify.
    */

  closeVerifyModal = () => {
    let fields = this.state.fields;
    fields["otp"] = null;
    this.setState({
      isShowOTP: false
      //   fields: {
      //     otp: null
      //   }
    });
  };

  render() {
    const { fields, errMsg, loader, isShowOTP, errType } = this.state;
    const { t } = this.props;
    if (errMsg) {
      this.openNotificationWithIcon(errType.toLowerCase());
    }

    return (
      <div>
        <Row>
          <Col span={6} />
          <HeaderCol span={12}>
            <span>{t("security_tab:head_change_email.message")}</span>
          </HeaderCol>
        </Row>
        <ChangeRow>
          <ChangeCol>
            <NewP>
              <InputLabel>
                {t("security_tab:subhead_title_email.message")}:
              </InputLabel>
              <EmailDN>
                {fields.oldEmail !== null
                  ? fields.oldEmail
                  : this.props.profileDetails.email}
              </EmailDN>

              <InputLabel>
                {t("security_tab:subhead_title_new_email.message")}*
              </InputLabel>
              <div>
                <NewInput
                  value={fields.newEmail}
                  disabled={isShowOTP}
                  size="large"
                  placeholder={`${t(
                    "security_tab:subhead_title_email.message"
                  )}`}
                  onChange={this.onChangeField.bind(this, "newEmail")}
                />
                {this.validator.message(
                  "Email",
                  this.state.fields["newEmail"],
                  "required|email",
                  "text-danger-validation",
                  {
                    required: `${t(
                      "security_tab:subhead_title_email.message"
                    )} ${t("validations:field_is_required.message")}.`
                  }
                )}
              </div>
            </NewP>
            <ButtonDiv>
              <NewButton onClick={this.changeEmail.bind(this)}>
                {t("security_tab:update_email_btn.message")}
              </NewButton>
            </ButtonDiv>
            {isShowOTP && (
              <VerifyModal
                closable={true}
                title={`${t("security_tab:verify_email_popup_head.message")}`}
                onCancel={this.closeVerifyModal}
                visible={isShowOTP}
                footer={null}
              >
                <Description>
                  {" "}
                  {t("security_tab:verify_email_popup_text1.message")}
                  <a href={`mailto:${fields["oldEmail"]}`}>
                    {" "}
                    {fields["oldEmail"]}
                  </a>
                  . {t("security_tab:verify_email_popup_text2.message")}{" "}
                  <a href={`mailto:${fields["newEmail"]}`}>
                    {fields["newEmail"]}
                  </a>
                  .
                </Description>
                <NewP>
                  <InputLabel>
                    {t("security_tab:subhead_title_verification_code.message")}
                  </InputLabel>
                  <div>
                    <OTPInput
                      value={fields.otp}
                      size="medium"
                      onChange={this.onChangeField.bind(this, "otp")}
                      name="Verification Code"
                    />
                    {this.otpValidator.message(
                      "verification code",
                      this.state.fields["otp"],
                      "required|numeric",
                      "text-danger-validation",
                      {
                        required: `${t(
                          "security_tab:subhead_title_verification_code.message"
                        )} ${t("validations:field_is_required.message")}.`,
                        numeric: `${t(
                          "security_tab:subhead_title_verification_code.message"
                        )} ${t("general_1:numeric_valdation.message")}.`
                      }
                    )}
                  </div>
                </NewP>
                <ButtonDiv>
                  <NewButton onClick={this.verifyEmail.bind(this)}>
                    {t("security_tab:verify_btn.message")}
                  </NewButton>
                </ButtonDiv>
              </VerifyModal>
            )}
          </ChangeCol>
        </ChangeRow>
        {loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    isLoggedIn: state.simpleReducer.isLoggedIn
  };
}

const mapDispatchToProps = dispatch => ({
  getProfileDataAction: isLoggedIn =>
    dispatch(getProfileDataAction(isLoggedIn)),
  LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});

export default translate(["security_tab", "validations", "general_1"])(
  connect(mapStateToProps, mapDispatchToProps)(createForm()(ChangeEmail))
);
