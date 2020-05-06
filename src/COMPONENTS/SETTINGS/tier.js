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
  TierVerifiedWrap,
  OrSpan,
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Icon, notification } from "antd";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";
import classNames from "classnames";
import { withRouter, Redirect, Link } from "react-router-dom";
import TierUpgradeInfo from "../../SHARED-COMPONENTS/tierUpgradeInfo";
import NumberFormat from "react-number-format";

let { API_URL } = globalVariables;
let self;
class Tier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      tierData: [],
      tierUpgradePopup: false,
      userUpgradeData: "",
      minimumAccountAge: "",
      minimumNumberOfTrades: "",
      minimumTradeValue: "",
      minimumWalletBalance: "",
    };
    self = this;
  }

  componentDidMount() {
    fetch(`${API_URL}/get-tier-details`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          tierData: responseData.data,
          loader: false,
        });
        // console.log("tierData", responseData.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  comingCancel = (e) => {
    this.setState({
      tierUpgradePopup: false,
    });
  };
  checkTierRequirements = (id) => {
    this.setState({ loader: true });
    console.log("Tier check^^^", id);
    let values = {
      tier_requested: id,
    };
    fetch(API_URL + "/users/check-tier-upgrate", {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn,
        "Accept-Language": localStorage["i18nextLng"],
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === 200) {
          // this.props.history.push(`tier${id}`);
          this.props.history.push({
            pathname: `tier${id}`,
            state: {
              flag: true,
            },
          });
        } else if (responseData.status === 202) {
          console.log(
            "responseData^^^",
            responseData,
            this.state.tierData[id].minimum_activity_thresold.Account_Age
          );
          this.setState({
            userUpgradeData: responseData.data,
            tierUpgradePopup: true,
            minimumAccountAge: this.state.tierData[id].minimum_activity_thresold
              .Account_Age,
            minimumNumberOfTrades: this.state.tierData[id]
              .minimum_activity_thresold.Minimum_Total_Transactions,
            minimumTradeValue: this.state.tierData[id].minimum_activity_thresold
              .Minimum_Total_Value_of_All_Transactions,
            minimumWalletBalance: this.state.tierData[id].requirements_two
              .Total_Wallet_Balance,
          });
        } else {
          this.openNotificationWithIcon("error", "Error", responseData.err);
        }
        this.setState({ loader: false });
      })
      .catch((error) => {
        /* console.log(error) */
      });
  };
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }
  render() {
    let { tierData } = this.state;
    // console.log("Tier:", this.props.history);

    return (
      <div>
        <TierMainWrap>
          <TierMainInnerWrap>
            {tierData.length > 0
              ? tierData.map(function (tier, index) {
                  // let path = `"/tier${tier.id}"`;
                  // console.log(path);
                  var liClasses = classNames({
                    "tier-active": tier.is_verified === true,
                    "tier-enabled": tier.is_active === true,
                    "tier-main": !tier.is_verified && !tier.is_active,
                  });
                  return (
                    <TierSubMain key={tier.id} className={liClasses}>
                      <TierHead className="top-head">
                        Tier {tier.tier_step}
                      </TierHead>
                      <TierSubMainInner>
                        <TierSubHead>
                          Minimum Account Activity Thresholds
                        </TierSubHead>
                        <TierUl>
                          <li>
                            {/* <span className="icon-wrap">
                              {tier.minimum_activity_thresold ? (
                                <Icon type="check" />
                              ) : (
                                ""
                              )}
                            </span> */}
                            {tier.minimum_activity_thresold ? (
                              <span className="text-wrap">
                                <span>Minimum Account Age (Days):</span>
                                <span>
                                  {tier.minimum_activity_thresold.Account_Age}
                                </span>
                              </span>
                            ) : (
                              ""
                            )}
                          </li>
                          <li>
                            {/* <span className="icon-wrap">
                              {tier.minimum_activity_thresold ? (
                                <Icon type="check" />
                              ) : (
                                ""
                              )}
                            </span> */}
                            {tier.minimum_activity_thresold ? (
                              <span className="text-wrap">
                                <span>Minimum Number of Trades:</span>
                                <span>
                                  {
                                    tier.minimum_activity_thresold
                                      .Minimum_Total_Transactions
                                  }
                                </span>
                              </span>
                            ) : (
                              ""
                            )}
                          </li>
                          <li>
                            {/* <span className="icon-wrap">
                              {tier.minimum_activity_thresold ? (
                                <Icon type="check" />
                              ) : (
                                ""
                              )}
                            </span> */}
                            {tier.minimum_activity_thresold ? (
                              <span className="text-wrap">
                                <span>Minimum Total USD Value of Trades: </span>
                                <NumberFormat
                                  value={`${parseFloat(
                                    tier.minimum_activity_thresold
                                      .Minimum_Total_Value_of_All_Transactions
                                  ).toFixed(2)}`}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix="$"
                                />
                              </span>
                            ) : (
                              ""
                            )}
                          </li>
                        </TierUl>
                        <OrSpan>OR</OrSpan>
                        <TierUl>
                          <li>
                            {/* <span className="icon-wrap">
                              {tier.requirements_two ? (
                                <Icon type="check" />
                              ) : (
                                ""
                              )}
                            </span> */}
                            {tier.requirements_two ? (
                              <span className="text-wrap">
                                <span>Total Wallet Balance: </span>
                                <NumberFormat
                                  value={`${parseFloat(
                                    tier.requirements_two.Total_Wallet_Balance
                                  ).toFixed(2)}`}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix="$"
                                />
                              </span>
                            ) : (
                              ""
                            )}
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
                              <td>
                                {tier.daily_withdraw_limit == "Unlimited" ? (
                                  tier.daily_withdraw_limit
                                ) : (
                                  <NumberFormat
                                    value={`${parseFloat(
                                      tier.daily_withdraw_limit
                                    ).toFixed(2)}`}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix="$"
                                  />
                                )}
                              </td>
                              <td>
                                {tier.monthly_withdraw_limit == "Unlimited" ? (
                                  tier.monthly_withdraw_limit
                                ) : (
                                  <NumberFormat
                                    value={`${parseFloat(
                                      tier.monthly_withdraw_limit
                                    ).toFixed(2)}`}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix="$"
                                  />
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </TierTable>
                      </TierSubMainInner>
                      <TierRequirements>
                        <TierSubHeadRequire>Requirements</TierSubHeadRequire>
                        <ul className="requirements">
                          {tier.requirements
                            ? Object.values(tier.requirements) &&
                              Object.values(tier.requirements).map(
                                (requirement) => (
                                  <li key={requirement}>
                                    <span className="disc-icon" />
                                    <span>{requirement}</span>
                                  </li>
                                )
                              )
                            : ""}
                        </ul>
                      </TierRequirements>
                      {tier.is_verified && (
                        <TierVerifiedWrap>
                          <TierVerfied className="verified">
                            <Icon type="check" />
                            Verified
                          </TierVerfied>
                        </TierVerifiedWrap>
                      )}
                      {tier.is_active && (
                        <a
                        // to={{
                        //   pathname: `/tier${tier.id}`,
                        //   state: {
                        //     // tier_id: tier.id,
                        //     // account_details: `${tier.account_details}`
                        //     //   ? `${tier.account_details.request_id}`
                        //     //   : ""
                        //     // underApproval: `${tier.under_approval}`
                        //     //   ? `${tier.under_approval}`
                        //     //   : ""
                        //   }
                        // }}
                        >
                          <TierUpdate
                            onClick={() => {
                              self.checkTierRequirements(tier.id);
                            }}
                            key={tier.id}
                            id={tier.id}
                            data-id={tier.id}
                            className="upgrade-btn"
                          >
                            Upgrade
                          </TierUpdate>
                        </a>
                      )}
                      {!tier.is_active && !tier.is_verified && (
                        <TierUpdate className="upgrade-btn">Upgrade</TierUpdate>
                      )}
                    </TierSubMain>
                  );
                })
              : ""}
          </TierMainInnerWrap>
          <TierUpgradeInfo
            visible={this.state.tierUpgradePopup}
            userUpgradeData={this.state.userUpgradeData}
            minimumAccountAge={this.state.minimumAccountAge}
            minimumNumberOfTrades={this.state.minimumNumberOfTrades}
            minimumTradeValue={this.state.minimumTradeValue}
            minimumWalletBalance={this.state.minimumWalletBalance}
            comingCancel={(e) => this.comingCancel(e)}
          />
        </TierMainWrap>
        {this.state.loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
  };
};
export default connect(mapStateToProps)(withRouter(Tier));
