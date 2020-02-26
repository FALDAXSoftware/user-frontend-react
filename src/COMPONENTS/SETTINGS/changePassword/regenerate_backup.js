/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Row, Col, Input, notification, Modal } from "antd";
import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";
import { translate } from "react-i18next";

/* components */
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";
import { getProfileDataAction } from "ACTIONS/SETTINGS/settingActions";
import { LogoutUser } from "ACTIONS/authActions";

/* STYLED-COMPONENTS */
import { HeaderCol, Save } from "../Personaldetails/personal_details";
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
const NewP = styled(Old)`
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
const OTPInput = styled(NewInput)`
  width: 74%;
`;
const ButtonDiv = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
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
const Description = styled.p`
  color: ${props => (props.theme.mode == "dark" ? "white" : "")};
`;
const VerifyModal = styled(Modal)`
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

class RegenerateBackupCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      loader: false,
      visible: false,
      errType: "",
      backupCode: ""
    };
    this.validator = new SimpleReactValidator();
  }

  /* 
        Page: /editProfile --> Security
        It is called when we click confirm after Update Email click.
        API is called to update Email.
    */

  regenBackup = () => {
    const { fields } = this.state;

    if (this.validator.allValid()) {
      let formData = {
        otp: fields["otp"]
      };

      this.setState({ loader: true });
      fetch(API_URL + `/users/regenerate-backupcode`, {
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
            let fields = {
              otp: ""
            };
            this.setState({
              loader: false,
              visible: true,
              backupCode: responseData.twofactor_backup_code,
              fields
            });
            this.validator.hideMessages();
            this.forceUpdate();
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
        It is called to when Input field is changed with parameters with name and value.
    */

  onChangeField = (field, e) => {
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
    this.setState({ isShowOTP: false });
  };

  TFAModalCancel = () => {
    // console.log(this.props);
    this.setState({ visible: false });
  };
  render() {
    const { t } = this.props;
    const { fields, errMsg, loader, isShowOTP, errType } = this.state;

    if (errMsg) {
      this.openNotificationWithIcon(errType.toLowerCase());
    }

    return (
      <div>
        <Row>
          <Col span={6} />
          <HeaderCol span={12}>
            <span>{t("head_regenerate_backup_code.message")}</span>
          </HeaderCol>
        </Row>
        <ChangeCol>
          <NewP>
            {/* <InputLabel>Two-Factor Authentication Code:</InputLabel>
                            <EmailDN>{fields.oldEmail !== null ? fields.oldEmail : this.props.profileDetails.email}</EmailDN> */}

            <InputLabel>
              {t("subhead_title_regenerate_code.message")}:*
            </InputLabel>
            <div>
              <NewInput
                value={fields.otp}
                disabled={isShowOTP}
                size="large"
                placeholder={t("general_1:code_placeholder.message")}
                onChange={this.onChangeField.bind(this, "otp")}
              />
              {this.validator.message(
                "two_factor_authentication_code",
                this.state.fields["otp"],
                "required|min:6|max:6",
                "text-danger-validation",
                {
                  required: `${t("general_1:code_placeholder.message")} ${t(
                    "validations:field_is_required.message"
                  )}.`,
                  min: `${t("general_1:code_placeholder.message")} ${t(
                    "general_1:min_6_error.message"
                  )}`,
                  max: `${t("general_1:code_placeholder.message")} ${t(
                    "general_1:max_6_error.message"
                  )}`
                }
              )}
            </div>
          </NewP>
          <ButtonDiv>
            <NewButton onClick={this.regenBackup.bind(this)}>
              {t("general_1:re_generate_code_btn.message")}
            </NewButton>
          </ButtonDiv>
          <VerifyModal
            onCancel={e => this.TFAModalCancel(e)}
            onOk={e => this.TFAModalCancel(e)}
            title={t("general_1:two_factor_authentication_head.message")}
            visible={this.state.visible}
            footer={null}
          >
            <Description>
              {t("general_1:two_factor_authentication_subhead.message")}
            </Description>
            <div>
              {t("two_factor_success_title.message")}:{" "}
              <b>{this.state.backupCode}</b>
            </div>
          </VerifyModal>
        </ChangeCol>
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

export default translate(["security_tab", "general_1", "validations"])(
  connect(mapStateToProps, mapDispatchToProps)(RegenerateBackupCode)
);
