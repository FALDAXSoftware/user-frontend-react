import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
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
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Icon } from "antd";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";

let { API_URL } = globalVariables;

class Tier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tier1_upgrade: true,
      tier2_upgrade: false,
      tier3_upgrade: false,
      tier4_upgrade: false,
      is_tier1_active: false,
      is_tier2_active: false,
      is_tier3_active: false,
      is_tier4_active: false,
      go_to_kyc: false,
      loader: true,
      tierData: [],
      is_verified: false
    };
    this.getTierActive = this.getTierActive.bind(this);
  }
  componentDidMount() {
    fetch(`${API_URL}/get-tier-details`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          tierData: responseData.data,
          loader: false
        });
        console.log("tierData", responseData.data);
        this.getTierActive();
        // console.log("tierData", this.state.tierData);
        // this.state.tierData.length > 0 &&
        //   this.state.tierData.map(function(tier, index) {
        //     if (tier.is_active) {
        //       console.log(tier.id + 1);
        //       var activeTierId = tier.id;
        //       var enableTierId = tier.id + 1;
        //       if (enableTierId === 2) {
        //         this.setState({
        //           tier2_upgrade: true
        //         });
        //       } else if (enableTierId === 3) {
        //         this.setState({
        //           tier3_upgrade: true
        //         });
        //       } else if (enableTierId === 4) {
        //         this.setState({
        //           tier4_upgrade: true
        //         });
        //       }
        //     } else {
        //       console.log(undefined);
        //     }
        //     // return console.log(tier.is_active);
        //   });
      })
      .catch(error => {
        console.log(error);
      });

    // if (this.props.profileDetails.is_kyc_done === 2) {
    //   this.setState({
    //     tier1_upgrade: true,
    //     tier2_upgrade: true,
    //     is_tier1_active: true
    //   });
    // } else {
    //   this.setState({
    //     tier1_upgrade: false,
    //     is_tier1_active: false
    //   });
    // }
    // if (this.state.tier2_upgrade) {
    //   this.setState({
    //     is_tier1_active: true
    //   });
    // }
    // if (this.state.tier3_upgrade) {
    //   this.setState({
    //     is_tier2_active: true
    //   });
    // }
    // if (this.state.tier4_upgrade) {
    //   this.setState({
    //     is_tier3_active: true
    //   });
    // }
  }
  getTierActive() {
    this.state.tierData.length > 0 &&
      this.state.tierData.map(function(tier, index) {
        if (tier.is_active) {
          console.log("ActiveId", tier.id);
          if (tier.id === 1) {
            console.log("Upgrade 1");
          } else if (tier.id === 2) {
            console.log("Upgrade 2, Active 1");
            this.setState({
              is_tier1_active: true
            });
          } else if (tier.id === 3) {
            console.log("Upgrade 3, Active 1 and 2");
            this.setState({
              is_tier1_active: true,
              is_tier2_active: true
            });
          } else if (tier.id === 4) {
            console.log("Upgrade 4, Active 1, 2 and 3");
            this.setState({
              is_tier1_active: true,
              is_tier2_active: true,
              is_tier3_active: true
            });
          } else {
            console.log("Out of loop");
          }
        }
        return console.log("getTierActive");
      });
  }
  render() {
    let {
      tierData,
      is_verified,
      is_tier1_active,
      is_tier2_active,
      is_tier3_active,
      is_tier4_active
    } = this.state;
    console.log("Tier:", this.props.history);
    return (
      <div>
        <TierMainWrap>
          <TierMainInnerWrap>
            {tierData.length > 0
              ? tierData.map(function(tier, index) {
                  let path = `"/tier${tier.id}"`;
                  // console.log("path", path);
                  // console.log("history", this.props);
                  // var liClasses = classNames({
                  //   "tier-active": is_verified === true,
                  //   "tier-enabled": is_active === true
                  // });

                  return (
                    <TierSubMain
                      key={tier.id}
                      // className={liClasses}
                      // className={
                      //   `is_tier${tier.id}_active` && tier.is_active
                      //     ? "tier-enabled"
                      //     : "tier-active"
                      // }
                      className={tier.is_active ? "tier-enabled" : tier.id}
                    >
                      <TierHead className="top-head">
                        Tier {tier.tier_step}
                      </TierHead>
                      <TierSubMainInner>
                        <TierSubHead>
                          Minimum Account Activity Thresholds
                        </TierSubHead>
                        <TierUl>
                          <li>
                            <span className="icon-wrap">
                              <Icon type="check" />
                            </span>
                            <span className="text-wrap">
                              {tier.minimum_activity_thresold.Account_Age}
                            </span>
                          </li>
                          <li>
                            <span className="icon-wrap">
                              <Icon type="check" />
                            </span>
                            <span className="text-wrap">
                              {
                                tier.minimum_activity_thresold
                                  .Minimum_Total_Transactions
                              }
                            </span>
                          </li>
                          <li>
                            <span className="icon-wrap">
                              <Icon type="check" />
                            </span>
                            <span className="text-wrap">
                              {
                                tier.minimum_activity_thresold
                                  .Minimum_Total_Value_of_All_Transactions
                              }
                            </span>
                          </li>
                        </TierUl>
                        <TierWithdrawalHead className="withdrawal">
                          Withdrawl Limits Orders
                        </TierWithdrawalHead>
                        <TierTable>
                          <thead>
                            <tr>
                              <th>Daily</th>
                              <th>Monthly</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{tier.daily_withdraw_limit}</td>
                              <td>{tier.monthly_withdraw_limit}</td>
                            </tr>
                          </tbody>
                        </TierTable>
                      </TierSubMainInner>
                      <TierRequirements>
                        <TierSubHeadRequire>Requirements</TierSubHeadRequire>
                        <ul className="requirements">
                          {Object.values(tier.requirements) &&
                            Object.values(tier.requirements).map(
                              requirement => (
                                <li>
                                  <span className="disc-icon" />
                                  <span>{requirement}</span>
                                </li>
                              )
                            )}
                        </ul>
                      </TierRequirements>
                      {/* {is_verified && (
                        <TierVerifiedWrap>
                          <TierVerfied className="verified">
                            <Icon type="check" />
                            Verified
                          </TierVerfied>
                        </TierVerifiedWrap>
                      )} */}
                      {tier.is_active && (
                        <TierUpdate
                          className="upgrade-btn"
                          onClick={() => {
                            this.props.history.push(`"/tier${tier.id}"`);
                          }}
                        >
                          Upgrade
                        </TierUpdate>
                      )}
                      {/* {tier.is_active ? "tier-active" : ""} */}
                      {/* {!is_tier1_active && (
                        <TierVerifiedWrap>
                          <TierVerfied className="verified">
                            <Icon type="check" />
                            Verified
                          </TierVerfied>
                        </TierVerifiedWrap>
                      )}
                      {tier.is_active && (
                        <TierUpdate
                          className="upgrade-btn"
                          onClick={() => {
                            this.props.history.push("/tier1");
                          }}
                        >
                          Upgrade
                        </TierUpdate>
                      )}
                      {is_tier1_active && !tier.is_active && (
                        <TierUpdate
                          className="upgrade-btn"
                          onClick={() => {
                            this.props.history.push(path);
                          }}
                        >
                          Upgrade
                        </TierUpdate>
                      )} */}
                    </TierSubMain>
                  );
                })
              : ""}
            {/* <TierMainInnerWrap>
            <TierSubMain
              className={
                this.state.tier1_upgrade ? "tier-active" : "tier-enabled"
              }
            >
              <TierHead className="top-head">Tier 1</TierHead>
              <TierSubMainInner>
                <TierSubHead>Minimum Account Activity Thresholds</TierSubHead>
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
                  Withdrawl Limits Orders
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
                <TierUpdate
                  className="upgrade-btn"
                  onClick={() => {
                    this.props.history.push("/tier1");
                  }}
                >
                  Upgrade
                </TierUpdate>
              )}
            </TierSubMain>
            <TierSubMain
              className={this.state.is_tier1_active ? "tier-enabled" : ""}
            >
              <TierHead className="top-head">Tier 2</TierHead>
              <TierSubMainInner>
                <TierSubHead>Minimum Account Activity Thresholds</TierSubHead>
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
                  Withdrawl Limits Orders
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
                      Social Security # or Equivalent Govt. Issued ID Number (if
                      applicable)
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
                <TierUpdate
                  className="upgrade-btn"
                  onClick={() => {
                    this.props.history.push("/tier2");
                  }}
                >
                  Upgrade
                </TierUpdate>
              )}
            </TierSubMain>
            <TierSubMain className={this.is_tier2_active ? "tier-enabled" : ""}>
              <TierHead className="top-head">Tier 3</TierHead>
              <TierSubMainInner>
                <TierSubHead>Minimum Account Activity Thresholds</TierSubHead>
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
                  Withdrawl Limits Orders
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
                <TierUpdate
                  className="upgrade-btn"
                  onClick={() => {
                    this.props.history.push("/tier3");
                  }}
                >
                  Upgrade
                </TierUpdate>
              )}
            </TierSubMain>
            <TierSubMain
              className={this.state.is_tier3_active ? "tier-enabled" : ""}
            >
              <TierHead className="top-head">Tier 4</TierHead>
              <TierSubMainInner>
                <TierSubHead>Minimum Account Activity Thresholds</TierSubHead>
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
                  Withdrawl Limits Orders
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
                  <li>
                    <a>+10 more</a>
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
                <TierUpdate
                  className="upgrade-btn"
                  onClick={() => {
                    this.props.history.push("/tier4");
                  }}
                >
                  Upgrade
                </TierUpdate>
              )}
            </TierSubMain>
          </TierMainInnerWrap> */}
          </TierMainInnerWrap>
        </TierMainWrap>
        {this.state.loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
};
export default connect(mapStateToProps)(Tier);
