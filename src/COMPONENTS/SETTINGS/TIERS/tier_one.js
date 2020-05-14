/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Steps, Icon } from "antd";
import styled from "styled-components";
import { createForm } from "rc-form";

/*Import Components*/
import KYCForm from "../KYC/kyc_form";
import IDselect from "../KYC/id_select";
import SSN from "../KYC/ssn";
import DocUpload from "../KYC/doc_upload";
import Tier from "../tier";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { translate } from "react-i18next";
import { withRouter } from "react-router-dom";
// import CountryAccess from "../../../SHARED-COMPONENTS/CountryAccess";
import CompleteProfile from "../../../SHARED-COMPONENTS/completeProfile";

const Step = Steps.Step;

/* Styled-Components */
export const TierWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 30px;
  min-height: calc(100vh - 380px);
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#01090f" : "#f5f6fa"};
  color: ${(props) =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
`;
const KYCWrap = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
  color: ${(props) =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
`;
export const KYCHead = styled.div`
  font-size: 26px;
  font-family: "Open Sans";
  font-weight: 700;
  color: ${(props) =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
  text-align: center;
  padding: 0 0 50px 0;
`;
const KYCProgress = styled.div`
  width: 26%;
  text-align: left;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  & .ant-steps-item-icon {
    background-color: rgb(0, 170, 250);
    border-color: rgb(0, 170, 250);
  }
  & .ant-steps-finish-icon {
    color: white;
  }
  & .ant-steps-item-wait .ant-steps-icon {
    color: black;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;
export const DoneWrap = styled.div`
  text-align: center;
  > .icon-display {
    font-size: 50px;
  }
`;
export const KycSucc = styled.div`
  width: 80%;
  margin: auto;
  font-size: 20px;
  font-family: "Open Sans";
  color: ${(props) =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
  margin-top: 20px;
`;

class TierOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ON_OFF: "OFF",
      Key: null,
      typeEye: "password",
      newEye: "password",
      repeatEye: "password",
      currentpassIcon: false,
      newpassIcon: false,
      confirmIcon: false,
      otpIcon: false,
      is_twofactor: "ENABLE",
      QR_img: null,
      otp_msg: null,
      next: 0,
      nexts: 0,
      is_kyc_done: false,
      countryChange: null,
      kycData: {},
      // countryAccess: false
    };
    this.t = this.props.t;
  }

  /* 
        Page: /editProfile --> KYC
        It is called when next button is clicked and proceed to next step. 
    */
  componentWillMount() {
    if (
      this.props.location.state === undefined ||
      this.props.location.state.flag === "" ||
      this.props.location.state.flag === null
    ) {
      this.props.history.push("/");
    }
    if (
      this.props.profileDetails.account_tier !== 0 &&
      !this.props.profileDetails.is_user_updated
    ) {
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    // console.log(
    //   "^^tier^",
    //   this.props.profileDetails.is_user_updated,
    //   this.props.profileDetails.is_kyc_done
    // );
    // if (
    //   !this.props.profileDetails.is_user_updated &&
    //   this.props.profileDetails.is_kyc_done != "2"
    // ) {
    //   this.setState({
    //     countryAccess: true
    //   });
    // }
  }
  next_step(a, type = null, countryChange = null) {
    // console.log("--------------------->", a, type, countryChange);
    this.setState({ next: a });
    if (
      type === "Passport" ||
      type === "Driving license" ||
      type === "Identity"
    ) {
      var b = a - 1;
      this.setState({ nexts: b, docType: type });
    } else if (type === "ssn") {
      var b = a;
      this.setState({ nexts: b });
    } else this.setState({ nexts: a });
    if (countryChange !== null) {
      this.setState({ countryChange });
    }
  }

  /* 
        Page: /editProfile --> KYC
        It is called when back button is clicked and proceed to back step. 
    */

  back_step(a) {
    this.setState({ next: a, nexts: a });
  }

  render() {
    const { next /* , is_kyc_done  */ } = this.state;
    const { t } = this.props;
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            {this.props.is_kyc_done === 0 && (
              <div>
                {next !== 5 && (
                  <div>
                    <KYCHead>
                      {this.t("tiers:tier_text.message")} 1{" "}
                      {this.t("tiers:upgrade_text.message")}
                    </KYCHead>
                    <KYCProgress>
                      <Steps
                        direction="horizontal"
                        size="small"
                        current={this.state.nexts}
                      >
                        <Step />
                        <Step />
                        <Step />
                      </Steps>
                    </KYCProgress>
                  </div>
                )}
                {next === 0 && (
                  <KYCForm
                    back_step={(a) => this.back_step(a)}
                    next_step={(a, type, ssn) => this.next_step(a, type, ssn)}
                  />
                )}
                {next === 1 && (
                  <IDselect
                    kycData={this.state.kycData}
                    {...this.props}
                    countryFlag={this.state.countryChange}
                    back_step={(a) => this.back_step(a)}
                    next_step={(a, type) => this.next_step(a, type)}
                  />
                )}
                {next === 2 && (
                  <SSN
                    {...this.props}
                    kycData={this.state.kycData}
                    back_step={(a) => this.back_step(a)}
                    next_step={(a, type) => this.next_step(a, type)}
                  />
                )}
                {next === 3 && (
                  <DocUpload
                    kycData={this.state.kycData}
                    docText={this.state.docType}
                    back_step={(a) => this.back_step(a)}
                    next_step={(a) => this.next_step(a)}
                  />
                )}
              </div>
            )}
            {this.props.is_kyc_done === 1 && (
              <DoneWrap>
                <Icon
                  className="icon-display"
                  type="info-circle"
                  theme="twoTone"
                  twoToneColor="#ffc107"
                />
                <KycSucc>
                  <span>
                    <b>{t("thank_you_text.message")}</b>
                    <br />
                    {t("kyc_submit_text.message")}
                  </span>
                </KycSucc>
              </DoneWrap>
            )}
            {this.props.is_kyc_done === 2 && (
              <DoneWrap>
                <Icon
                  className="icon-display"
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
                <KycSucc>
                  <span>
                    <b>{t("kyc_verified_text.message")}</b>
                    <br />
                    <br />
                    {t("kyc_verified_text1.message")}
                  </span>
                </KycSucc>
              </DoneWrap>
            )}
          </KYCWrap>
        </TierWrapper>
        <FooterHome />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    is_kyc_done:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0].is_kyc_done
        : "",
    email:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0].email
        : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : "",
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default translate(
  "identity_verification",
  "edit_profile_titles",
  "tiers"
)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(createForm()(withRouter(TierOne)))
);
