import React from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";

/* const API_URL = globalVariables.API_URL; */

class ComingSoon extends React.Component {
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
              <img alt="coming" src={_COMINGIMG} />{" "}
              <img
                alt="coming"
                style={{ marginLeft: "10px" }}
                src={_COMINGIMG2}
              />
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          onCancel={e => this.comingCancel(e)}
          // closable={this.props.location.pathname == "/conversion" ? false : true}
          // maskClosable={this.props.location.pathname == "/conversion" ? false : true}
          footer={null}
          width={605}
          height={490}
          className="simple-maps"
        >
          <ModalWrap>
            <h3
              style={{
                fontFamily: "Open Sans",
                fontSize: "40px",
                textAlign: "center",
                color: "rgb(3, 170, 249)",
                fontWeight: "600",
                marginTop: "40px"
              }}
            >
              Access Denied
            </h3>
            <p
              style={{
                fontFamily: "Open Sans",
                fontSize: "14px",
                textAlign: "center",
                color: "black",
                marginTop: "15px"
              }}
            >
              Unfortunately, FALDAX does not offer trading services in your area
              at this time, but we are actively working to increase
              availability. Visit the world map on our home page to see where
              trading is considered legal in your area, but you are unable to
              trade, that simply means we are working through the licensing
              process with the authoritiesin your area. Check back often, or
              subscribe to our newsletter, to be notifiedwhen services become
              available for you.
            </p>
            <p
              style={{
                fontFamily: "Open Sans",
                fontSize: "15px",
                textAlign: "center",
                color: "black"
              }}
            >
              Thank you for your support and your patience.
            </p>
            {/* <Sub_wrap>
                            <label style={{ color: 'black', fontWeight: "600", marginTop: "20px" }}> Enter your email address to receive updates: </label>
                            <Email_input placeholder="Email Address" value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); }} />
                        </Sub_wrap>
                        <div style={{ marginTop: '20px', minHeight: '20px' }}>
                            <Button style={{ float: 'right', color: 'white', borderColor: '#00a7ff', backgroundColor: "#0f477b", height: "45px" }} onClick={() => this.send_email()}>SUBMIT</Button>
                        </div> */}
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ComingSoon);
