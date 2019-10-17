import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import { Link } from "react-router-dom";

/* const API_URL = globalVariables.API_URL; */

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
              <img
                alt="FALDAX"
                style={{ marginLeft: "10px" }}
                src={_COMINGIMG2}
              />
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          onCancel={e => this.comingCancel(e)}
          //   closable={
          //     this.props.location.pathname == "/conversion" ? false : true
          //   }
          //   maskClosable={
          //     this.props.location.pathname == "/conversion" ? false : true
          //   }
          footer={null}
          width={605}
          height={490}
          className="simple-maps"
        >
          <ModalWrap className="kyc-wrap">
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
              ID Verification Incomplete
            </h3>
            <p
              style={{
                fontFamily: "Open Sans",
                fontSize: "23px",
                textAlign: "center",
                color: "black",
                fontWeight: "600",
                marginTop: "24px"
              }}
            >
              Before you can trade, you must complete the ID Verification
              Process. Please click the 'Get Verified' button below to begin.
              {/* {this.props.data} */}
            </p>
            <Link
              className="get_verified_link"
              to={{ pathname: "/editProfile", state: { tabNum: "3" } }}
              // state={{ testvalue: "hello" }}
              // pathname="/editProfile"
            >
              Get Verified
            </Link>
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
