import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Modal, Icon, notification, Row, Col, Button, Tabs } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalAgreeWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import styled from "styled-components";
import { ButtonDiv } from "COMPONENTS/SETTINGS/changePassword/change_email.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { LogoutUser } from "ACTIONS/authActions";

let { API_URL } = globalVariables;
const TabPane = Tabs.TabPane;
/* const API_URL = globalVariables.API_URL; */
const AgreeTabPane = styled(TabPane)`
  @media (max-width: 450px) {
    & .ant-row.row-main {
      > .ant-col {
        width: 100%;
        text-align: center;
      }
      > .ant-col.ant-col-18 {
        display: none;
      }
    }
  }
`;
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
  @media (max-width: 400px) {
    font-size: 10.217px;
    height: 35px;
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
  &:focus {
    background-color: rgb(76, 132, 255);
    color: #fff;
  }
`;

class AgreeTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: this.props.visible ? true : "",
      email_address: "",
      email_msg: "",
      loader: false,
      activeKey: "1",
      visible: false
    };
    this.callback = this.callback.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {}
  showCofirmModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState(
      {
        visible: false
      },
      () => {
        this.logout();
      }
    );
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  handleComing = e => {
    this.setState({ comingSoon: false });
  };

  comingCancel = e => {
    this.setState({ comingSoon: false });
    this.props.comingCancel(e);
  };
  logout() {
    let loggedIn;
    if (this.props.isLoggedIn) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    let formData = {
      user_id: this.props.profileDetails.id,
      jwt_token: loggedIn
    };
    this.props.LogoutUser(this.props.isLoggedIn, formData);
    // this.props.Logout();
  }
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
          this.setState({
            activeKey: "1"
          });
        } else {
        }
        this.setState({
          loader: false
        });
      })
      .catch(error => {});
  };
  dontAgreeTerms = e => {
    if (this.props.showCancelBtn) {
      this.props.dontAgreeTerms(e);
    } else {
      // console.log("this.props.isLoggedIn", this.props.isLoggedIn);
      this.logout();
    }
    this.setState({
      activeKey: "1"
    });
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
  callback(key) {
    // console.log("Key", key);
    // console.log("sdjkfhksjhdfkhlksdfhlkasdhflkjasdhfkjh");
    this.setState({
      activeKey: key
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
        {/* {this.props.visible && ( */}
        <Modal
          title={
            <div>
              <img alt="FALDAX" src={_COMINGIMG} />{" "}
              <img className="faldax_logo" alt="FALDAX" src={_COMINGIMG2} />
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          // onCancel={e => this.comingCancel(e)}
          closable={false}
          maskClosable={false}
          footer={null}
          width="80%"
          //   height="82%"
          className="terms-outer-wrap"
        >
          <ModalAgreeWrap className="terms-wrap">
            <Tabs activeKey={this.state.activeKey} onChange={this.callback}>
              <AgreeTabPane
                className="agree-tabs"
                tab="Terms of Services"
                key="1"
              >
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
                      src={`${globalVariables.Terms_and_services}#zoom=100`}
                      className="content-box"
                      width="100%"
                    ></iframe>
                  </Col>
                </Row>
              </AgreeTabPane>
              <AgreeTabPane tab="Privacy Policy" key="2">
                <Row className="row-main">
                  <Col span={6}>
                    <h4>
                      <a
                        target="_blank"
                        href={`${globalVariables.Privacy_policy}`}
                      >
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
              </AgreeTabPane>
              <AgreeTabPane tab="Anti-Money Laundering Policy" key="3">
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
              </AgreeTabPane>
              <AgreeTabPane tab="Cookies Policy" key="4">
                <Row className="row-main">
                  <Col span={6}>
                    <h4>
                      <a
                        target="_blank"
                        href={`${globalVariables.Cookie_policy}`}
                      >
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
              </AgreeTabPane>
            </Tabs>

            <ButtonDiv className="terms_btn_div">
              <NewButton onClick={e => this.agreeTerms(e)}>I agree</NewButton>
              {/* {this.props.showCancelBtn && ( */}
              {/* <NewButton onClick={e => this.dontAgreeTerms(e)}>
                I don't agree
              </NewButton> */}
              {!this.props.showCancelBtn ? (
                <div>
                  <NewButton onClick={this.showCofirmModal}>
                    I don't agree
                  </NewButton>
                  <Modal
                    title="Are you sure, you want to disagree?"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="No" onClick={this.handleCancel}>
                        No
                      </Button>,
                      <Button key="Yes" type="primary" onClick={this.handleOk}>
                        Yes
                      </Button>
                    ]}
                  >
                    <p>
                      You will not be able to access FALDAX Services by
                      disagreeing to{" "}
                      <a
                        target="_blank"
                        href={`${globalVariables.Terms_and_services}`}
                      >
                        Terms of Services
                      </a>
                      ,{" "}
                      <a
                        target="_blank"
                        href={`${globalVariables.Privacy_policy}`}
                      >
                        Privacy Policy
                      </a>
                      ,{" "}
                      <a
                        target="_blank"
                        href={`${globalVariables.Anti_money_laundering_policy}`}
                      >
                        Anti-Money Laundering Policy
                      </a>{" "}
                      and{" "}
                      <a
                        target="_blank"
                        href={`${globalVariables.Cookie_policy}`}
                      >
                        Cookies Policy
                      </a>
                      .
                    </p>
                  </Modal>
                </div>
              ) : (
                <NewButton onClick={e => this.dontAgreeTerms(e)}>
                  I don't agree
                </NewButton>
              )}
              {/* )} */}
            </ButtonDiv>
            {this.state.loader === true ? <FaldaxLoader /> : ""}
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
      : ""
  };
}

const mapDispatchToProps = dispatch => ({
  //Logout: () => dispatch(Logout()),
  LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});

// export default withRouter(AgreeTerms);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AgreeTerms));
