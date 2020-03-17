/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
// import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";
/* components */
// import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";
// import { getProfileDataAction } from "ACTIONS/SETTINGS/settingActions";
import { verifyTF } from "ACTIONS/SETTINGS/passwordActions.js";
import {translate} from "react-i18next"
/* STYLED-COMPONENTS */
import {
  VerifyModal,
  Description,
  NewP,
  InputLabel,
  OTPInput,
  ButtonDiv,
  NewButton
} from "COMPONENTS/SETTINGS/changePassword/change_email.js";
import { Popover, Button } from "antd";

let { API_URL } = globalVariables;

class TFAModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fields: {
        otp: ""
      },
      visibleTFA: false,
    };
    this.t=this.props.t;
    this.validator = new SimpleReactValidator({
      validOTP: {
        message: this.t("security_tab:subhead_title_verification_code.message")+" "+this.t("numeric_valdation.message"),
        required:true,
        rule: val => {
          var RE = /.+/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        } 
      },
      customVerificationCodeRequire:{
        message:this.t("security_tab:subhead_title_verification_code.message")+" "+this.t("validation:field_is_required"),
        rule: val => {
          var RE = /^\d+.?\d*$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        } 
      },
      customVerificationCodeNumeric:{
        message:this.t("security_tab:subhead_title_verification_code.message")+" "+this.t("numeric_valdation.message"),
        rule: val => {
          var RE = /^\d+.?\d*$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        } 
      }
    });
  }
  componentWillReceiveProps(props) {
    // console.log("CWRP", props.visible);
    if (props.visible !== undefined) var fields = {};
    fields["otp"] = "";
    this.setState({ visibleTFA: props.visible, fields }, () => {
      this.validator.hideMessages();
      this.forceUpdate();
    });
  }
  componentDidMount() {
    // console.log("DID", this.props.visible);
    var fields = {};
    fields["otp"] = "";
    this.setState({
      fields
    });
  }

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  onChangeField = (field, e) => {
    let fields = this.state.fields;
    // console.log(e.target.value);
    if (e.target.value.trim() === "") {
      fields[field] = "";
    } else {
      fields[field] = e.target.value;
    }
    this.setState({ fields });
  };
  verifyOTP() {
    var self = this;
    // self.validator.hideMessages();
    // self.forceUpdate();
    if (this.validator.allValid()) {
      var otp = this.state.fields.otp;
      // var fields = {};
      // fields["otp"] = "";
      this.setState(
        {
          // fields
        },
        () => {
          self.props.submit(otp);
          this.validator.hideMessages();
          this.forceUpdate();
        }
      );
    } else {
      this.setState({ loader: false });
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  comingCancel = e => {
    this.setState({
      visibleTFA: false
    });
  };
  render() {
    const { fields, visibleTFA } = this.state;
    // console.log(visibleTFA);
    return (
      <VerifyModal
        // closable={false}
        title={this.t("security_tab:head_change_two_factor_status.message")}
        visible={visibleTFA}
        footer={null}
        onCancel={e => this.comingCancel(e)}
        maskClosable={false}
      >
        <Description>
          {" "}
          {this.t("general_3:enter_2fa_code.message")}.
        </Description>
        <NewP>
          <InputLabel>{this.t("security_tab:subhead_title_verification_code.message")}</InputLabel>
          <div>
            <OTPInput
              value={fields.otp}
              size="medium"
              onChange={this.onChangeField.bind(this, "otp")}
              name="Verification Code"
              type="text"
            />
            {this.validator.message(
              "verification code",
              fields["otp"],
              "customVerificationCodeRequire|customVerificationCodeNumeric|validOTP",
              "text-danger-validation"
            )}
          </div>
        </NewP>
        <ButtonDiv>
          <NewButton onClick={this.verifyOTP.bind(this)}>{this.t("security_tab:verify_btn.message")}</NewButton>
          <p>
            <Popover
              placement="topLeft"
              content={
                <b>
                  {this.t("general_3.reset_2fa_code.message")}.
                </b>
              }
              trigger="click"
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            >
              <Button type="link">{this.t("login_page:no_2fa_text.message")}?</Button>
            </Popover>
          </p>
        </ButtonDiv>
      </VerifyModal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  verifyTF: (isLoggedIn, value) => dispatch(verifyTF(isLoggedIn, value))
});

export default translate(["general_1","security_tab","general_3","login_page","validations"])(connect(null, mapDispatchToProps)(TFAModal));
