import React from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import { ModalWrap } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import { Link } from "react-router-dom";

/* const API_URL = globalVariables.API_URL; */

class CompleteProfile extends React.Component {
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

  render() {
    return (
      <div>
        <Modal
          title={
            <div>
              <img alt="coming" src={_COMINGIMG} />{" "}
              <img
                alt="coming"
                // style={{ marginLeft: "10px" }}
                src={_COMINGIMG2}
              />
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleComing()}
          //   onCancel={e => this.comingCancel(e)}
          // closable={this.props.location.pathname == "/conversion" ? false : true}
          // maskClosable={this.props.location.pathname == "/conversion" ? false : true}
          closable={false}
          maskClosable={false}
          footer={null}
          width={605}
          height={490}
          className="simple-maps"
        >
          <ModalWrap className="country-wrap">
            <h3>Access Denied</h3>
            <p className="first-subhead">
              Before proceeding to identity verification please complete your
              profile.
            </p>
            <p className="second-subhead">
              Thank you for your support and your patience.
            </p>
            <Link
              className="get_verified_link complete_profile"
              to={{ pathname: "/editProfile", state: { tabNum: "3" } }}
              // state={{ testvalue: "hello" }}
              // pathname="/editProfile"
            >
              Complete Profile
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

export default withRouter(CompleteProfile);
