/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";

/* components */
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";
import { getProfileDataAction } from "ACTIONS/SETTINGS/settingActions";
import { verifyTF } from "ACTIONS/SETTINGS/passwordActions.js";

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

let { API_URL } = globalVariables;

class TFAModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        otp: ""
      },
      visibleTFA: false
    };
    this.validator = new SimpleReactValidator();
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
  onChangeField = (field, e) => {
    let fields = this.state.fields;
    if (e.target.value.trim() === "") {
      fields[field] = "";
    } else {
      fields[field] = e.target.value;
    }
    this.setState({ fields });
  };
  verifyOTP() {
    var self = this;
    self.validator.hideMessages();
    self.forceUpdate();
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
        title="Two-Factor Authentication Code"
        visible={visibleTFA}
        footer={null}
        onCancel={e => this.comingCancel(e)}
        maskClosable={false}
      >
        <Description>
          {" "}
          Please enter your Two-Factor Authentication Code to continue.
        </Description>
        <NewP>
          <InputLabel>Verification Code</InputLabel>
          <div>
            <OTPInput
              value={fields.otp}
              size="medium"
              onChange={this.onChangeField.bind(this, "otp")}
              name="Verification Code"
            />
            {this.validator.message(
              "verification code",
              fields["otp"],
              "required|numeric"
            )}
          </div>
        </NewP>
        <ButtonDiv>
          <NewButton onClick={this.verifyOTP.bind(this)}>Verify</NewButton>
        </ButtonDiv>
      </VerifyModal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  verifyTF: (isLoggedIn, value) => dispatch(verifyTF(isLoggedIn, value))
});

export default connect(null, mapDispatchToProps)(TFAModal);
