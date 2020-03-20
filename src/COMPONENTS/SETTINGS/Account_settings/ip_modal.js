import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Input, notification, Row } from "antd";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

// import { globalVariables } from "Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { HeaderCol, Save } from "../Personaldetails/personal_details";
import styled from "styled-components";
import  {translate} from "react-i18next"

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
  width: 100%;
  > .otp-input-wrap {
    margin-bottom: 20px;
    width: 100%;
  }
  > .promo_input_wrap {
    position: relative;
    > span.promo_cross_wrap {
      position: absolute;
      right: 10px;
      top: 20px;
      line-height: 1;
      cursor: pointer;
    }
  }
  &.deactivate {
    margin-bottom: 30px;
  }
  &.deactivate_no_funds {
    margin-top: 0;
  }
  &.add_new_ip {
    width: 100%;
  }
  &.add_new_promo {
    margin-top: 0;
    > span.offer_msg {
      font-weight: bold;
    }
  }
  > .range_picker_wrap {
    > .ant-calendar-picker {
      width: 100%;
      > div {
        > .ant-calendar-picker-input.ant-input {
          height: 43px;
        }
      }
    }
  }
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
  width: 100%;
  // margin-bottom: 20px;
  &.otp-input {
    margin-bottom: 0 !important;
    width: 100%;
  }
  &.otpfor2fa {
    padding-right: 10px;
  }
`;
export const ButtonDiv = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  &.promo_check {
    margin-bottom: 20px;
    text-align: center;
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

export const Description = styled.p`
  color: ${props => (props.theme.mode == "dark" ? "white" : "#000")};
  font-weight: 600;
  &.final_deactivate {
    font-size: 16px;
  }
`;
export const BackupCode = styled.div`
  color: ${props => (props.theme.mode == "dark" ? "white" : "#000")};
  font-weight: 600;
  text-align: center;
`;
export const VerifyModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${props => (props.theme.mode == "dark" ? "#041222" : "")};
    .ant-modal-header {
      background: ${props => (props.theme.mode == "dark" ? "#041222" : "")};
      .ant-modal-title {
        color: ${props => (props.theme.mode == "dark" ? "#03aaf9" : "#03aaf9")};
        font-weight: 600;
      }
    }
    .ant-modal-close {
      .ant-modal-close-x {
        color: ${props => (props.theme.mode == "dark" ? "white" : "#000")};
      }
    }
  }
  &.deactivate_modal {
    width: 600px !important;
  }
`;

class IpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible ? true : "",
      fields: {
        ip: "",
        days: null
      }
    };
    this.t=this.props.t;
    this.validator = new SimpleReactValidator({
      ipvalid: {
        message: this.t("invalid_ip_error.message"),
        rule: val => {
          var RE = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
    this.clearValidation = this.clearValidation.bind(this);
  }
  componentWillReceiveProps(props) {
    // console.log(props);
    if (props.visible !== this.props.visible) {
      this.setState({ visible: props.visible });
    }
  }
  clearValidation() {
    this.validator.hideMessages();
    this.forceUpdate();
    // rerender to hide messages for the first time
  }
  onChangeField = e => {
    // console.log(e.target.value);
    let fields = {
      ip: e.target.value,
      days: null,
      is_permanent: true
    };
    this.setState({ fields });
  };

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }
  ipModalCancel = () => {
    this.clearValidation();
    // console.log(this.props);
    this.props.ipModalCancel();
  };
  permanentIp() {
    // alert("jhasdg");
    if (this.validator.allValid()) {
      this.props.permanentIp(this.state.fields);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  render() {
    return (
      <div>
        {/* {console.log(this.state.visible)} */}
        <VerifyModal
          onCancel={e => this.ipModalCancel(e)}
          title="Permanent IP Address"
          visible={this.state.visible}
          footer={null}
        >
          {this.props.security == false ? (
            <Description>
              {" "}
              {this.t("settings:permanent_ip_popup_text.message")}
            </Description>
          ) : (
            <Description>
              {" "}
              {this.t('general_3:restricted_withdrawal.message')}
            </Description>
          )}
          <NewP>
            <InputLabel>{this.t("settings:permanent_ip_popup_label_ip.message")}*</InputLabel>
            <div>
              <OTPInput
                value={this.state.fields.ip}
                size="medium"
                onChange={this.onChangeField.bind(this)}
                name="ip"
              />
              {/* {this.validator.message("IP", this.state.fields.ip, "required")} */}
              {this.validator.message(
                "ip",
                this.state.fields.ip,
                "required|ipvalid",
                "text-danger-validation",
                { required: this.t("general_1:ip_required_error.message") }
              )}
            </div>
          </NewP>
          <ButtonDiv>
            <NewButton onClick={this.permanentIp.bind(this)}>Submit</NewButton>
          </ButtonDiv>
        </VerifyModal>
      </div>
    );
  }
}

export default translate(["validations","settings","general_3","general_1"])(withRouter(IpModal));
