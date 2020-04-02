/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Tabs } from "antd";
import styled from "styled-components";
import { globalVariables } from "Globals.js";

/* Components */
import PersonalDetails from "./Personaldetails/personal_details";
import Referral from "./referral";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import Passwordchange from "./changePassword/password_change";
import AccSettings from "./Account_settings/acc_settings";
import TierOne from "./TIERS/tier_one";
// import KYC from "./KYC/kyc";
/* import Paymethods from './Payment/paymethods'; */
import SupportHub from "./Account_settings/support_hub";
import { translate } from "react-i18next";
import CompleteProfile from "../../SHARED-COMPONENTS/completeProfile";
import Tier from "./tier";
// import AgreeTerms from "../../SHARED-COMPONENTS/AgreeTerms";

const TabPane = Tabs.TabPane;
let { API_URL } = globalVariables;
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
      activeKey: "1",
      user2fastatus: "",
      totalUSDOfWallet: "",
      walletCoins: "",
      countryAccess: false
    };
    this.callback = this.callback.bind(this);
    this.getWalletSummary = this.getWalletSummary.bind(this);
  }
  callback(key) {
    this.setState({
      activeKey: key
    });
    if (key == "4") {
      if (
        !this.props.profileDetails.is_user_updated &&
        this.props.profileDetails.is_kyc_done != "2"
      ) {
        this.setState({
          countryAccess: true
        });
      } else {
        this.setState({
          countryAccess: false
        });
      }
    }
  }
  componentDidMount() {
    this.getWalletSummary();
    if (
      !this.props.profileDetails.is_user_updated &&
      this.props.profileDetails.is_kyc_done != "2"
    ) {
      this.setState({
        countryAccess: true
      });
    } else {
      this.setState({
        countryAccess: false
      });
    }
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.profileDetails.is_kyc_done &&
      this.props.profileDetails.is_kyc_done !==
        newProps.profileDetails.is_kyc_done
    ) {
      if (
        !newProps.profileDetails.is_user_updated &&
        newProps.profileDetails.is_kyc_done != "2"
      ) {
        this.setState({
          countryAccess: true
        });
      } else {
        this.setState({
          countryAccess: false
        });
      }
    }
    if (
      newProps.profileDetails.is_user_updated &&
      this.props.profileDetails.is_user_updated !==
        newProps.profileDetails.is_user_updated
    ) {
      if (
        !newProps.profileDetails.is_user_updated &&
        newProps.profileDetails.is_kyc_done != "2"
      ) {
        this.setState({
          countryAccess: true
        });
      } else {
        this.setState({
          countryAccess: false
        });
      }
    }
  }
  getWalletSummary() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/user/deleteAccountCheck`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 201) {
          this.setState({
            totalUSDOfWallet: responseData.usd_price.toFixed(2),
            walletCoins: responseData.data,
            user2fastatus: responseData.user2fastatus,
            loader: false
          });
        } else if (responseData.status == 200) {
          this.setState({
            walletCoins: null,
            user2fastatus: responseData.user2fastatus,
            loader: false
          });
        }
      })
      .catch(error => {});
  }
  comingCancel = e => {
    this.setState(
      {
        countryAccess: false
      },
      () => {
        this.props.history.push("/editProfile");
      }
    );
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <Navigation />
        <ProfileWrapper>
          <ProfileDiv>
            <TabsStyle
              defaultActiveKey={this.state.activeKey}
              onChange={this.callback}
              className="profile-tabs"
            >
              <TabPane tab={t("head_personal_details.message")} key="1">
                <PersonalDetails {...this.props} />
              </TabPane>
              <TabPane tab={t("head_security.message")} key="2">
                <Passwordchange {...this.props} />
              </TabPane>
              <TabPane tab={t("head_settings.message")} key="3">
                {this.state.countryAccess ? (
                  <CompleteProfile
                    comingCancel={e => this.comingCancel(e)}
                    visible={this.state.countryAccess}
                  />
                ) : (
                  <AccSettings
                    {...this.props}
                    user2fastatus={this.state.user2fastatus}
                    walletCoins={this.state.walletCoins}
                    totalUSDOfWallet={this.state.totalUSDOfWallet}
                  />
                )}
                {/* <AccSettings
                  {...this.props}
                  user2fastatus={this.state.user2fastatus}
                  walletCoins={this.state.walletCoins}
                  totalUSDOfWallet={this.state.totalUSDOfWallet}
                /> */}
              </TabPane>
              <TabPane tab={t("head_identity_verification.message")} key="4">
                {this.state.countryAccess ? (
                  <CompleteProfile
                    comingCancel={e => this.comingCancel(e)}
                    visible={this.state.countryAccess}
                  />
                ) : (
                  <Tier />
                )}
              </TabPane>
              <TabPane tab={t("head_referral.message")} key="5">
                <Referral {...this.props} />
              </TabPane>
              <TabPane tab={t("head_support.message")} key="6">
                <SupportHub {...this.props} />
              </TabPane>
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
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default translate("edit_profile_titles")(
  connect(mapStateToProps)(Editprofile)
);
