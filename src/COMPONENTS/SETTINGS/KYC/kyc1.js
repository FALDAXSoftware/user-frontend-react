/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Steps, Icon } from "antd";
import styled from "styled-components";
import { createForm } from "rc-form";
import {
  TierMainWrap,
  TierMainInnerWrap,
  TierSubMain,
  TierSubMainInner,
  TierHead,
  TierSubHead,
  TierUl,
  TierWithdrawalHead,
  TierTable,
  TierSubHeadRequire,
  TierRequirements,
  TierUpdate,
  TierVerfied,
  TierVerifiedWrap
} from "../../../STYLED-COMPONENTS/TIER/tierStyle";

/*Import Components*/
import KYCForm from "./kyc_form";
import IDselect from "./id_select";
import SSN from "./ssn";
import DocUpload from "./doc_upload";

const Step = Steps.Step;

/* Styled-Components */
const KYCWrap = styled.div`
  margin-bottom: 140px;
`;
const KYCHead = styled.div`
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
  margin-top: 20px;
`;
const KYCProgress = styled.div`
  width: 26%;
  text-align: left;
  margin-top: 50px;
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
const DoneWrap = styled.div`
  margin-top: 80px;
  > .icon-display {
    fontsize: 50px;
  }
`;
const KycSucc = styled.div`
  width: 80%;
  margin: auto;
  font-size: 20px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
  margin-top: 20px;
`;

class KYC extends Component {
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
      is_tier1_active: false,
      is_tier2_active: false,
      is_tier3_active: false,
      is_tier4_active: false
    };
  }
  /* 
        Page: /editProfile --> KYC
        It is called when next button is clicked and proceed to next step. 
    */

  next_step(a, type = null, countryChange = null) {
    // console.log("KYC CHECK", countryChange)
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
  componentDidMount() {
    if (!this.props.is_kyc_done === 0) {
      this.setState({
        is_tier1_active: true
      });
    }
  }
  render() {
    const { next /* , is_kyc_done  */ } = this.state;
    let {
      is_tier1_active,
      is_tier2_active,
      is_tier3_active,
      is_tier4_active
    } = this.state;
    // console.log("is_kyc_done" + this.props.is_kyc_done);
    return (
      // <KYC_wrap>
      //     {(this.props.is_kyc_done !== true && next !== 5) ?
      //         <div>
      //             <KYC_head>
      //                 Identity Verification
      //             </KYC_head>
      //             <KYC_progress>
      //                 <Steps direction="horizontal" size="small" current={this.state.nexts}>
      //                     <Step />
      //                     <Step />
      //                     <Step />
      //                 </Steps>
      //             </KYC_progress>
      //         </div>
      //         : <Done_wrap><Icon style={{ fontSize: "50px" }} type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> <Kyc_succ><span><b>Thank you.</b> <br />All of your information has been received and will be reviewed by our Identity Verification team. You will receive a notification and an email within 24 hours informing you of our decision. If you don't hear anything after 24 hours, please visit the support page to let us know.</span></Kyc_succ></Done_wrap>}
      //     {(this.state.next===0 && this.props.is_kyc_done !== true) ?
      //         <KYCForm back_step={(a) => this.back_step(a)} next_step={(a, type, ssn) => this.next_step(a, type, ssn)} /> : ""
      //     }
      //     {(next===1 && is_kyc_done !== true) ? <IDselect kycData={this.state.kycData} {...this.props} countryFlag={this.state.countryChange} back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} /> : ""}
      //     {(next===2 && is_kyc_done !== true) ? <SSN kycData={this.state.kycData} back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} /> : ""}
      //     {(next===3 && is_kyc_done !== true) ? <DocUpload kycData={this.state.kycData} docText={this.state.docType} back_step={(a) => this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""}
      // </KYC_wrap>
      <KYCWrap>
        {this.props.is_kyc_done === 0 && (
          <div>
            <TierMainWrap>
              <TierMainInnerWrap>
                <TierSubMain
                  className={
                    this.props.is_kyc_done === 0
                      ? "tier-enabled"
                      : "tier-active"
                  }
                >
                  <TierHead className="top-head">Tier 1</TierHead>
                  <TierSubMainInner>
                    <TierSubHead>
                      Minimum Account Activity Thresholds
                    </TierSubHead>
                    <TierUl>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">Account Age: 30 Days</span>
                      </li>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">
                          Minimum Total Transactions: 100 Transactions
                        </span>
                      </li>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">
                          Minimum Total Value of All Transactions: $5,000
                        </span>
                      </li>
                    </TierUl>
                    <TierWithdrawalHead className="withdrawal">
                      Withdrawal Limits Orders
                    </TierWithdrawalHead>
                    <TierTable>
                      <tr>
                        <th>Daily</th>
                        <th>Monthly</th>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>100</td>
                      </tr>
                    </TierTable>
                  </TierSubMainInner>
                  <TierRequirements>
                    <TierSubHeadRequire>Requirements</TierSubHeadRequire>
                    <ul className="requirements">
                      <li>
                        <span className="disc-icon" />
                        <span>Login</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Email</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Full Name</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Date of Birth</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Phone Number</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Physical Address</span>
                      </li>
                    </ul>
                  </TierRequirements>
                  {is_tier1_active && (
                    <TierVerifiedWrap>
                      <TierVerfied className="verified">
                        <Icon type="check" />
                        Verified
                      </TierVerfied>
                    </TierVerifiedWrap>
                  )}
                  {!is_tier1_active && (
                    <TierUpdate className="upgrade-btn">Upgrade</TierUpdate>
                  )}
                </TierSubMain>
                <TierSubMain>
                  <TierHead className="top-head">Tier 2</TierHead>
                  <TierSubMainInner>
                    <TierSubHead>
                      Minimum Account Activity Thresholds
                    </TierSubHead>
                    <TierUl>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">Account Age: 30 Days</span>
                      </li>
                      <li>
                        <span className="icon-wrap"></span>
                        <span className="text-wrap">
                          Minimum Total Transactions: 100 Transactions
                        </span>
                      </li>
                      <li>
                        <span className="icon-wrap"></span>
                        <span className="text-wrap">
                          Minimum Total Value of All Transactions: $5,000
                        </span>
                      </li>
                    </TierUl>
                    <TierWithdrawalHead className="withdrawal">
                      Withdrawal Limits Orders
                    </TierWithdrawalHead>
                    <TierTable>
                      <tr>
                        <th>Daily</th>
                        <th>Monthly</th>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>100</td>
                      </tr>
                    </TierTable>
                  </TierSubMainInner>
                  <TierRequirements>
                    <TierSubHeadRequire>Requirements</TierSubHeadRequire>
                    <ul className="requirements">
                      <li>
                        <span className="disc-icon" />
                        <span>2FA</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Valid ID</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Proof of Residence</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>
                          Social Security # or Equivalent Govt. Issued ID Number
                          (if applicable)
                        </span>
                      </li>
                    </ul>
                  </TierRequirements>
                  {is_tier2_active && (
                    <TierVerifiedWrap>
                      <TierVerfied className="verified">
                        <Icon type="check" />
                        Verified
                      </TierVerfied>
                    </TierVerifiedWrap>
                  )}
                  {!is_tier2_active && (
                    <TierUpdate className="upgrade-btn">Upgrade</TierUpdate>
                  )}
                </TierSubMain>
                <TierSubMain>
                  <TierHead className="top-head">Tier 3</TierHead>
                  <TierSubMainInner>
                    <TierSubHead>
                      Minimum Account Activity Thresholds
                    </TierSubHead>
                    <TierUl>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">Account Age: 30 Days</span>
                      </li>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">
                          Minimum Total Transactions: 100 Transactions
                        </span>
                      </li>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">
                          Minimum Total Value of All Transactions: $5,000
                        </span>
                      </li>
                    </TierUl>
                    <TierWithdrawalHead className="withdrawal">
                      Withdrawal Limits Orders
                    </TierWithdrawalHead>
                    <TierTable>
                      <tr>
                        <th>Daily</th>
                        <th>Monthly</th>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>100</td>
                      </tr>
                    </TierTable>
                  </TierSubMainInner>
                  <TierRequirements>
                    <TierSubHeadRequire>Requirements</TierSubHeadRequire>
                    <ul className="requirements">
                      <li>
                        <span className="disc-icon" />
                        <span>IDCP (ID Confirmation Photo)</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Proof of Assets Form</span>
                      </li>
                    </ul>
                  </TierRequirements>
                  {is_tier3_active && (
                    <TierVerifiedWrap>
                      <TierVerfied className="verified">
                        <Icon type="check" />
                        Verified
                      </TierVerfied>
                    </TierVerifiedWrap>
                  )}
                  {!is_tier3_active && (
                    <TierUpdate className="upgrade-btn">Upgrade</TierUpdate>
                  )}
                </TierSubMain>
                <TierSubMain>
                  <TierHead className="top-head">Tier 4</TierHead>
                  <TierSubMainInner>
                    <TierSubHead>
                      Minimum Account Activity Thresholds
                    </TierSubHead>
                    <TierUl>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">Account Age: 30 Days</span>
                      </li>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">
                          Minimum Total Transactions: 100 Transactions
                        </span>
                      </li>
                      <li>
                        <span className="icon-wrap">
                          <Icon type="check" />
                        </span>
                        <span className="text-wrap">
                          Minimum Total Value of All Transactions: $5,000
                        </span>
                      </li>
                    </TierUl>
                    <TierWithdrawalHead className="withdrawal">
                      Withdrawal Limits Orders
                    </TierWithdrawalHead>
                    <TierTable>
                      <tr>
                        <th>Daily</th>
                        <th>Monthly</th>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>100</td>
                      </tr>
                    </TierTable>
                  </TierSubMainInner>
                  <TierRequirements>
                    <TierSubHeadRequire>Requirements</TierSubHeadRequire>
                    <ul className="requirements">
                      <li>
                        <span className="disc-icon" />
                        <span>AML Questionnaire</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Comfort Letter</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>2 Months Bank Satements</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Corporate Filing Information</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Beneficial Ownership Form</span>
                      </li>
                      <li>
                        <span className="disc-icon" />
                        <span>Physical Address</span>
                      </li>
                    </ul>
                  </TierRequirements>
                  {is_tier4_active && (
                    <TierVerifiedWrap>
                      <TierVerfied className="verified">
                        <Icon type="check" />
                        Verified
                      </TierVerfied>
                    </TierVerifiedWrap>
                  )}
                  {!is_tier4_active && (
                    <TierUpdate className="upgrade-btn">Upgrade</TierUpdate>
                  )}
                </TierSubMain>
              </TierMainInnerWrap>
            </TierMainWrap>
          </div>
        )}
        {/* {this.props.is_kyc_done === 0 &&
                    <div>
                        {next !== 5 &&
                            <div>
                                <KYCHead>
                                    Identity Verification
                                </KYCHead>
                                <KYCProgress>
                                    <Steps direction="horizontal" size="small" current={this.state.nexts}>
                                        <Step />
                                        <Step />
                                        <Step />
                                    </Steps>
                                </KYCProgress>
                            </div>
                        }
                        {next === 0 &&
                            <KYCForm back_step={(a) => this.back_step(a)} next_step={(a, type, ssn) => this.next_step(a, type, ssn)} />
                        }
                        {next === 1 &&
                            <IDselect kycData={this.state.kycData} {...this.props} countryFlag={this.state.countryChange} back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} />
                        }
                        {next === 2 &&
                            <SSN kycData={this.state.kycData} back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} />
                        }
                        {next === 3 &&
                            <DocUpload kycData={this.state.kycData} docText={this.state.docType} back_step={(a) => this.back_step(a)} next_step={(a) => this.next_step(a)} />
                        }
                    </div>
                } */}
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
                <b>Thank you.</b>
                <br />
                All of your information has been received and will be reviewed
                by our Identity Verification team. You will receive a
                notification and an email within 24 hours informing you of our
                decision. If you don't hear anything after 24 hours, please
                visit the support page to let us know.
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
                <b>Verification Completed.</b>
                <br />
                <br />
                Your Account is Verified successfully.
              </span>
            </KycSucc>
          </DoneWrap>
        )}
      </KYCWrap>
    );
  }
}

const mapStateToProps = state => {
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
        : ""
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(KYC));
