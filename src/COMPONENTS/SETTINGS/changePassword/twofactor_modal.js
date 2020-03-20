import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Input, notification, Row } from "antd";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { translate } from "react-i18next";

import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";

import {
  VerifyModal,
  Description,
  NewP,
  InputLabel,
  OTPInput,
  ButtonDiv,
  BackupCode
} from "../Account_settings/ip_modal";
import styled from "styled-components";

export const FontModal = styled.b`
  color: red;
`;

class TFAModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: this.props.visible ? true : "",
      backupCode: this.props.TFACode ? this.props.TFACode : "",
      fields: {
        ip: "",
        days: null
      }
    };
    // console.log(this.props.visible);
    this.validator = new SimpleReactValidator();
  }
  componentWillReceiveProps(props) {
    // console.log(props);
    if (props !== this.props) {
      this.setState({ visible: props.visible, backupCode: props.TFACode });
    }
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

  TFAModalCancel = () => {
    // console.log(this.props);
    this.props.TFAModalCancel();
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        {/* {console.log(this.state.visible)} */}
        <VerifyModal
          onCancel={e => this.TFAModalCancel(e)}
          onOk={e => this.TFAModalCancel(e)}
          title={t("two_factor_success_popup_head.message")}
          visible={this.state.visible}
          footer={null}
        >
          {/* {console.log(this.state.backupCode)} */}
          <Description>
            {t("two_factor_success_popup_text.message")}
          </Description>

          <BackupCode>
            {t("two_factor_success_title.message")}:{" "}
            <FontModal>{this.state.backupCode}</FontModal>
          </BackupCode>
        </VerifyModal>
      </div>
    );
  }
}

export default translate(["security_tab"])(withRouter(TFAModal));
