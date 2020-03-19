/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification } from "antd";
import styled from "styled-components";

/* components */
import { globalVariables } from "Globals.js";
import { _COMINGIMG } from "CONSTANTS/images";

const API_URL = globalVariables.API_URL;

export const ModalWrap = styled.div`
  width: 465px;
  margin-left: auto;
  margin-right: auto;
  > iframe {
    border: none;
    height: 300px;
    width: 100%;
  }
  @media (max-width: 576px) {
    width: 350px;
  }
  @media (max-width: 425px) {
    width: 256px;
  }
`;

export const ModalHeaderTag = styled.h3`
  fontfamily: Open Sans;
  fontsize: 40px;
  textalign: center;
  color: rgb(15, 71, 123);
  fontweight: 600;
  margintop: 40px;
`;

export const SubWrap = styled.div`
  margin-top: 40px;
`;
export const EmailInput = styled.input`
  border: 1px solid #e2e6ea;
  background-color: #f8f8f8;
  border-radius: 5px;
  min-height: 45px;
  width: 100%;
  padding-left: 5px;
  margin-top: 5px;
  @media (max-width: 576px) {
  }
`;
class ComingSoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: this.props.visible ? true : "",
      email_address: "",
      email_msg: ""
    };
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
          "Accept-Language": localStorage["i18nextLng"],
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
          title={<img alt="Coming Soon" src={_COMINGIMG} />}
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          onCancel={e => this.comingCancel(e)}
          footer={null}
          width={605}
          height={490}
          className="simple-maps"
        >
          <ModalWrap>
            <ModalHeaderTag>Coming Soon</ModalHeaderTag>
            <iframe
              title="Title"
              src={API_URL + "/get-subscriber-form"}
            ></iframe>
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default ComingSoon;
