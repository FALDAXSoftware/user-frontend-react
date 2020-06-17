import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import {
  Modal,
  Icon,
  notification,
  Row,
  Col,
  Button,
  Tabs,
  Progress,
} from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalAgreeWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import styled from "styled-components";
import { ButtonDiv } from "COMPONENTS/SETTINGS/changePassword/change_email.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { LogoutUser } from "ACTIONS/authActions";
import { translate } from "react-i18next";

class RejectReason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: this.props.visible ? true : "",
      email_address: "",
      email_msg: "",
      loader: false,
      activeKey: "1",
      visible: false,
    };
    this.t = this.props.t;
    // this.callback = this.callback.bind(this);
    // this.logout = this.logout.bind(this);
  }
  componentDidMount() {}
  showCofirmModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.logout();
      }
    );
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  handleComing = (e) => {
    this.setState({ comingSoon: false });
  };

  comingCancel = (e) => {
    this.setState({ comingSoon: false });
    this.props.comingCancel(e);
  };

  render() {
    let { t } = this.props;
    return (
      <div>
        {/* {this.props.visible && ( */}
        <Modal
          title={
            <div>
              {/* <img alt="FALDAX" src={_COMINGIMG} />{" "}
              <img className="faldax_logo" alt="FALDAX" src={_COMINGIMG2} /> */}
              {this.t("rejection_reason_text.message")}
            </div>
          }
          visible={this.props.visible}
          onOk={(e) => this.handleComing()}
          onCancel={(e) => this.comingCancel(e)}
          //   closable={false}
          //   maskClosable={false}
          footer={null}
          //   width="80%"
          //   height="82%"
          //   className="terms-outer-wrap"
        >
          <ModalAgreeWrap className="reject_reason_div">
            <div>{this.props.text}</div>
          </ModalAgreeWrap>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    // isLoggedIn: state.simpleReducer.isLoggedIn ? true : false,
    profileDetails: state.simpleReducer.profileDetails
      ? state.simpleReducer.profileDetails.data[0]
      : "",
  };
}

const mapDispatchToProps = (dispatch) => ({
  //Logout: () => dispatch(Logout()),
  LogoutUser: (isLoggedIn, user_id) =>
    dispatch(LogoutUser(isLoggedIn, user_id)),
});

// export default withRouter(AgreeTerms);

export default translate(["tiers"])(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(RejectReason))
);
