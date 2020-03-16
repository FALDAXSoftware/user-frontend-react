import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import { translate } from "react-i18next";
import styled from "styled-components";

export const ImageDisplay = styled.img`
  margin-left: 10px;
`;

export const PanicDisplay = styled.h3`
  font-family: Open Sans;
  font-size: 40px;
  text-align: center;
  color: rgb(3, 170, 249);
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const PanicText = styled.p`
  fontfamily: Open Sans;
  font-size: 14px;
  text-align: center;
  color: black;
`;

/* const API_URL = globalVariables.API_URL; */

class PanicEnabled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: this.props.visible ? true : "",
      email_address: "",
      email_msg: ""
    };
    this.t = this.props.t;
  }

  handleComing = e => {
    this.setState({ comingSoon: false });
  };

  comingCancel = e => {
    this.setState({ comingSoon: false });
    this.props.comingCancel(e);
  };

  openNotification() {
    notification.open({
      message: "Thank You",
      description: "You will receive an email shortly",
      duration: 6,
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
    });
  }
  openNotification1() {
    notification.open({
      message: "Subscribed",
      description: "You have already Subscribed for FALDAX.",
      duration: 6,
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
    });
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }

  send_email() {
    const values = { email: this.state.email_address };
    this.setState({ email_address: "" });
    var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (re.test(this.state.email_address)) {
      this.setState({ email_msg: "" });
      fetch(globalVariables.API_URL + "/users/email-subscription", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 500) {
            this.openNotification1();
          } else {
            this.openNotification();
            this.setState({ visible: false, email_msg: "" });
          }
        })
        .catch(error => {});
    } else {
      this.setState({ email_msg: "*email address not valid" });
      this.openNotificationWithIcon(
        "error",
        "Error",
        "Please enter valid email address."
      );
    }
  }
  render() {
    return (
      <div>
        <Modal
          title={
            <div>
              <img alt="FALDAX" src={_COMINGIMG} />{" "}
              <ImageDisplay alt="FALDAX" src={_COMINGIMG2} />
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          onCancel={e => this.comingCancel(e)}
          footer={null}
          width={605}
          className="simple-maps"
        >
          <ModalWrap className="kyc-wrap">
            <PanicDisplay>{this.t("panic_popup_head.message")}</PanicDisplay>
            <PanicText>{this.t("panic_popup_subtext.message")}</PanicText>
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default translate(["popups"])(withRouter(PanicEnabled));
