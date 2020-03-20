import React from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
// import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

/* const API_URL = globalVariables.API_URL; */

class CompleteProfile extends React.Component {
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
          closable={false}
          maskClosable={false}
          footer={null}
          width={605}
          height={490}
          className="simple-maps"
        >
          <ModalWrap className="country-wrap">
            <h3>{this.t("illegal_popup_head.message")}</h3>
            <p className="first-subhead">
              {this.t("general_2:complete_profile_text.message")}
            </p>
            <p className="second-subhead">
              {this.t("general_3:complete_profile_popup_subtext2.message")}
            </p>
            <Link
              className="get_verified_link complete_profile"
              to={{ pathname: "/editProfile", state: { tabNum: "3" } }}
            >
              {this.t("general_2:complete_profile_btn.message")}
            </Link>
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default translate(["popups", "general_2", "general_3"])(
  withRouter(CompleteProfile)
);
