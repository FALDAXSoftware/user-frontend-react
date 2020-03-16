import React from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import { translate } from "react-i18next";
/* const API_URL = globalVariables.API_URL; */

class ComingSoon extends React.Component {
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
      message: this.t("identity_verification:thank_you_text.message"),
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
      this.setState({
        email_msg: "*" + this.t("validations:invalid_email_error.message")
      });
      this.openNotificationWithIcon(
        "error",
        this.t("validations:error_text.message"),
        this.t("validations:invalid_email_error.message")
      );
    }
  }
  render() {
    return (
      <div>
        <Modal
          title={
            <div>
              <img alt="coming" src={_COMINGIMG} />{" "}
              <img alt="coming" src={_COMINGIMG2} />
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          onCancel={e => this.comingCancel(e)}
          footer={null}
          width={605}
          className="simple-maps"
        >
          <ModalWrap className="country-wrap">
            <h3>{this.t("illegal_popup_head.message")}</h3>
            <p className="first-subhead">
              {this.t(
                "general_3:while_we_are_actively_working_to_increase_service_availability.message"
              )}{" "}
              <a href={`${globalVariables.WordpressSiteURL}/`}>
                {this.t("general_3:home_text.message")}
              </a>{" "}
              {this.t(
                "general_3:page_to_view_currently_trading_availability.message"
              )}
            </p>
            <p className="second-subhead">
              {this.t("illegal_popup_subtext2.message")}
            </p>
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default translate([
  "popups",
  "validations",
  "identity_verification",
  "general_3"
])(withRouter(ComingSoon));
