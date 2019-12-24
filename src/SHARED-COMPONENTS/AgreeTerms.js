import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification, Row, Col, Button } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalAgreeWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import styled from "styled-components";
import { ButtonDiv } from "COMPONENTS/SETTINGS/changePassword/change_email.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";

let { API_URL } = globalVariables;
/* const API_URL = globalVariables.API_URL; */
const Save = styled(Button)`
  font-size: 13.217px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  -moz-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -webkit-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -ms-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  border-radius: 24px;
  background-color: rgb(76, 132, 255);
  box-shadow: 0px 4px 10px 0px rgba(76, 132, 255, 0.33);
  margin-left: 10px;
  width: 15%;
  height: 40px;
  @media (max-width: 600px) {
    width: 100px;
  }
`;
const NewButton = styled(Save)`
  border: none;
  width: auto;
  &:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;
class AgreeTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: this.props.visible ? true : "",
      email_address: "",
      email_msg: "",
      loader: false
    };
  }

  handleComing = e => {
    this.setState({ comingSoon: false });
  };

  comingCancel = e => {
    this.setState({ comingSoon: false });
    this.props.comingCancel(e);
  };
  agreeTerms = e => {
    this.setState({
      loader: true
    });
    fetch(API_URL + "/users/terms-status-update", {
      method: "put",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({ status: true })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          this.props.agreeTerms(e, this.props.showCancelBtn);
        } else {
        }
        this.setState({
          loader: false
        });
      })
      .catch(error => {});
  };
  dontAgreeTerms = e => {
    this.props.dontAgreeTerms(e);
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
              <img className="faldax_logo" alt="FALDAX" src={_COMINGIMG2} />
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          onCancel={e => this.comingCancel(e)}
          closable={false}
          maskClosable={false}
          footer={null}
          width="80%"
          //   height="82%"
          className="terms-outer-wrap"
        >
          <ModalAgreeWrap className="terms-wrap">
            <Row className="row-main">
              <Col span={6}>
                <h4>
                  <a
                    target="_blank"
                    href={`${globalVariables.Terms_and_services}`}
                  >
                    Terms of Services <Icon type="download" />
                  </a>
                </h4>
              </Col>
              <Col span={18}>
                <iframe
                  src={globalVariables.Terms_and_services}
                  className="content-box"
                  width="100%"
                ></iframe>
              </Col>
            </Row>
            <Row className="row-main">
              <Col span={6}>
                <h4>
                  <a target="_blank" href={`${globalVariables.Privacy_policy}`}>
                    Privacy Policy <Icon type="download" />
                  </a>
                </h4>
              </Col>
              <Col span={18}>
                <iframe
                  src={globalVariables.Privacy_policy}
                  className="content-box"
                  width="100%"
                ></iframe>
              </Col>
            </Row>
            <Row className="row-main">
              <Col span={6}>
                <h4>
                  <a
                    target="_blank"
                    href={`${globalVariables.Anti_money_laundering_policy}`}
                  >
                    Anti-Money Laundering Policy <Icon type="download" />
                  </a>
                </h4>
              </Col>
              <Col span={18}>
                <iframe
                  src={globalVariables.Anti_money_laundering_policy}
                  className="content-box"
                  width="100%"
                ></iframe>
              </Col>
            </Row>
            <Row className="row-main">
              <Col span={6}>
                <h4>
                  <a target="_blank" href={`${globalVariables.Cookie_policy}`}>
                    Cookies Policy <Icon type="download" />
                  </a>
                </h4>
              </Col>
              <Col span={18}>
                <iframe
                  src={globalVariables.Cookie_policy}
                  className="content-box"
                  width="100%"
                ></iframe>
              </Col>
            </Row>
            <ButtonDiv className="terms_btn_div">
              <NewButton onClick={e => this.agreeTerms(e)}>I agree</NewButton>
              {this.props.showCancelBtn && (
                <NewButton onClick={e => this.dontAgreeTerms(e)}>
                  I don't agree
                </NewButton>
              )}
            </ButtonDiv>
            {this.state.loader === true ? <FaldaxLoader /> : ""}
          </ModalAgreeWrap>
        </Modal>
      </div>
    );
  }
}

export default withRouter(AgreeTerms);
