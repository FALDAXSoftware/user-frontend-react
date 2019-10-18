/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Tabs } from "antd";
import styled from "styled-components";

/* Components */
import PersonalDetails from "./Personaldetails/personal_details";
import Referral from "./referral";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import Passwordchange from "./changePassword/password_change";
import AccSettings from "./Account_settings/acc_settings";
// import KYC from "./KYC/kyc";
import Tier from "./tier";
import TierOne from "./TIERS/tier_one";
/* import Paymethods from './Payment/paymethods'; */
import SupportHub from "./Account_settings/support_hub";

const TabPane = Tabs.TabPane;

/* Styled-Components */
export const ProfileWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 30px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#f5f6fa"};
`;
export const ProfileDiv = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  min-height: 70vh;
`;
const TabsStyle = styled(Tabs)`
  & .ant-tabs-tab-active {
    color: rgb(0, 170, 250);
  }
  & .ant-tabs-ink-bar {
    background-color: rgb(0, 170, 250);
  }
  & .ant-tabs-tab-prev-icon > i {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-tabs-tab-prev-icon > i {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & .ant-tabs-tab-next-icon > i {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;

class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1"
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    // console.log("Key", key);
    this.setState({
      activeKey: key
    });
  }
  componentDidMount() {
    // console.log("adhssskfjsdfjgsgjh========", this.props.location.state.tabNum);
    // if (this.props.location.state.tabNum === undefined) {
    //   this.setState({
    //     activeKey: "1"
    //   });
    // } else {
    //   this.setState({
    //     activeKey: this.props.location.state.tabNum
    //   });
    // }
  }
  render() {
    // console.log("defaultActiveKey:", this.props.activeKey);
    return (
      <div>
        {/* <LoggedNavigation /> */}
        <Navigation />
        <ProfileWrapper>
          <ProfileDiv>
            <TabsStyle
              defaultActiveKey={this.state.activeKey}
              // onChange={this.handleChange}
              onChange={this.callback}
              className="profile-tabs"
            >
              <TabPane tab="Personal Details" key="1">
                <PersonalDetails {...this.props} />
              </TabPane>
              <TabPane tab="Security" key="2">
                <Passwordchange {...this.props} />
              </TabPane>
              <TabPane tab="Settings" key="3">
                <AccSettings {...this.props} />
              </TabPane>
              <TabPane tab="Identity Verification" key="4">
                {/* <KYC history={this.props.history} tier1_upgrade={true} /> */}
                {/* <Tier {...this.props} /> */}
                <TierOne />
              </TabPane>
              <TabPane tab="Referral" key="5">
                <Referral {...this.props} />
              </TabPane>
              <TabPane tab="Support" key="6">
                <SupportHub {...this.props} />
              </TabPane>
              {/* <TabPane tab="Payment Methods" key="7"><Paymethods /></TabPane> */}
            </TabsStyle>
          </ProfileDiv>
        </ProfileWrapper>
        <FooterHome />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(Editprofile);
