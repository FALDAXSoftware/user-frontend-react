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
  ButtonWrapDiv,
  OrSpan,
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Icon, notification } from "antd";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";
import classNames from "classnames";
import { withRouter, Redirect, Link } from "react-router-dom";
import TierUpgradeInfo from "../../SHARED-COMPONENTS/tierUpgradeInfo";
import NumberFormat from "react-number-format";
import { translate } from "react-i18next";
import { SecondLabel } from "../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";

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
      current_tier_id: "",
    };
    self = this;
    self.t = self.props.t;
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
      })
      .catch((error) => {});
  }
  comingCancel = (e) => {
    this.setState({
      tierUpgradePopup: false,
    });
  };
  checkTierRequirements = (id) => {
    this.setState({ loader: true });
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
          this.props.history.push({
            pathname: `tier${id}`,
            state: {
              flag: true,
            },
          });
        } else if (responseData.status === 202) {
          let id_value = parseInt(id) - 1;
          this.setState({
            userUpgradeData: responseData.data,
            tierUpgradePopup: true,
            minimumAccountAge: this.state.tierData[id_value]
              .minimum_activity_thresold.Account_Age,
            minimumNumberOfTrades: this.state.tierData[id_value]
              .minimum_activity_thresold.Minimum_Total_Transactions,
            minimumTradeValue: this.state.tierData[id_value]
              .minimum_activity_thresold
              .Minimum_Total_Value_of_All_Transactions,
            minimumWalletBalance: this.state.tierData[id_value].requirements_two
              .Total_Wallet_Balance,
            current_tier_id:
              id == 4
                ? `${this.t("tier_changes:institutional_account_text.message")}`
                : id,
          });
        } else {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.err
          );
        }
        this.setState({ loader: false });
      })
      .catch((error) => {});
  };
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }
  render() {
    let { tierData } = this.state;

    return (
      <div>
        <TierMainWrap>
          <TierMainInnerWrap>
            {tierData.length > 0
              ? tierData.map(function (tier, index) {
                  var liClasses = classNames({
                    "tier-active": tier.is_verified === true,
                    "tier-enabled": tier.is_active === true,
                    "tier-main": !tier.is_verified && !tier.is_active,
                  });
                  return (
                    <TierSubMain key={tier.id} className={liClasses}>
                      <TierHead className="top-head">
                        {tier.tier_step == 4
                          ? `${self.t(
                              "tier_changes:institutional_account_text.message"
                            )}`
                          : `${self.t("tier_text.message")}${" "}${
                              tier.tier_step
                            }`}
                      </TierHead>
                      <TierSubMainInner>
                        {tier.tier_step != 4 && (
                          <TierSubHead>
                            {self.t(
                              "Minimum_account_activity_thresholds_text.message"
                            )}
                          </TierSubHead>
                        )}
                        {tier.tier_step != 4 && (
                          <TierUl>
                            <li>
                              {tier.minimum_activity_thresold ? (
                                <span className="text-wrap">
                                  <span>
                                    {self.t("Minimum_account_age_text.message")}
                                    :
                                  </span>
                                  <span>
                                    {tier.minimum_activity_thresold.Account_Age}
                                  </span>
                                </span>
                              ) : (
                                ""
                              )}
                            </li>
                            <li>
                              {tier.minimum_activity_thresold ? (
                                <span className="text-wrap">
                                  <span>
                                    {self.t(
                                      "Minimum_no_of_trades_text.message"
                                    )}
                                    :
                                  </span>
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
                              {tier.minimum_activity_thresold ? (
                                <span className="text-wrap">
                                  <span>
                                    {self.t(
                                      "Minimum_total_value_of_trades_text.message"
                                    )}
                                    :
                                  </span>
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
                            <li>
                              <span class="text-wrap">
                                <span>
                                  {self.t(
                                    "deposit_cryptocurrencies_text.message"
                                  )}
                                  :
                                </span>
                                <span>{self.t("unlimited_text.message")}</span>
                              </span>
                            </li>
                            <li>
                              <span class="text-wrap">
                                <span>
                                  {self.t("trade:trade_head.message")}:
                                </span>
                                <span>{self.t("unlimited_text.message")}</span>
                              </span>
                            </li>
                          </TierUl>
                        )}
                        {tier.tier_step != 4 && <OrSpan>OR</OrSpan>}
                        {tier.tier_step != 4 && (
                          <TierUl>
                            <li>
                              {tier.requirements_two ? (
                                <span className="text-wrap">
                                  <span>
                                    {self.t(
                                      "total_wallet_balance_text.message"
                                    )}
                                    :{" "}
                                  </span>
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
                        )}
                        <TierWithdrawalHead className="withdrawal">
                          {self.t("withdrawal_limits_orders_text.message")}
                        </TierWithdrawalHead>
                        <TierTable>
                          <thead>
                            <tr>
                              <th>{self.t("daily_text.message")}</th>
                              <th>{self.t("monthly_text.message")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {tier.daily_withdraw_limit == "Unlimited" ? (
                                  self.t("unlimited_text.message")
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
                                  self.t("unlimited_text.message")
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
                        <TierSubHeadRequire>
                          {self.t("requirements_text.message")}
                        </TierSubHeadRequire>
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
                      <ButtonWrapDiv>
                        {tier.is_verified && (
                          <Link
                            to={{
                              pathname: `/tier${tier.id}`,
                              state: {
                                flag: true,
                              },
                            }}
                          >
                            <TierUpdate className="upgrade-btn verified">
                              {self.t("login_page:verified_text.message")}
                            </TierUpdate>
                          </Link>
                        )}
                        {tier.is_active && (
                          <TierUpdate
                            onClick={() => {
                              self.checkTierRequirements(tier.id);
                            }}
                            key={tier.id}
                            id={tier.id}
                            data-id={tier.id}
                            className="upgrade-btn"
                          >
                            {tier.account_details
                              ? tier.account_details.approved == null
                                ? self.t(
                                    "tier_changes:under_review_text.message"
                                  )
                                : tier.account_details.approved == false
                                ? self.t("rejected_text.message")
                                : self.t("upgrade_text.message")
                              : self.t("upgrade_text.message")}
                          </TierUpdate>
                        )}
                        {!tier.is_active && !tier.is_verified && (
                          <TierUpdate className="upgrade-btn">
                            {self.t("upgrade_text.message")}
                          </TierUpdate>
                        )}
                      </ButtonWrapDiv>
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
            current_tier_id={this.state.current_tier_id}
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
export default translate([
  "tiers",
  "validations",
  "trade",
  "history",
  "login_page",
  "tier_changes",
])(connect(mapStateToProps)(withRouter(Tier)));
