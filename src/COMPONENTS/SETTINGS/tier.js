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
import classNames from "classnames";
import { withRouter, Redirect } from "react-router-dom";

let { API_URL } = globalVariables;

class Tier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      tierData: []
    };
    // this.renderRedirect = this.renderRedirect.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
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
      })
      .catch(error => {
        console.log(error);
      });
  }
  setRedirect = rowId => {
    // if (id === 2) {
    // console.log(`"/tier${id}"`);
    console.log("sdfhkjh");
    // return <Redirect to={`"/tier${id}"`} />;
    // } else {
    //   console.log("no active");
    // }
  };

  render() {
    let { tierData } = this.state;
    console.log("Tier:", this.props.history);

    return (
      <div>
        <TierMainWrap>
          <TierMainInnerWrap>
            {tierData.length > 0
              ? tierData.map(function(tier, index) {
                  // let path = `"/tier${tier.id}"`;
                  // console.log(path);
                  var liClasses = classNames({
                    "tier-active": tier.is_verified === true,
                    "tier-enabled": tier.is_active === true,
                    "tier-main": !tier.is_verified && !tier.is_active
                  });
                  const clickCallback = () => this.setRedirect(tier.id);
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
                                <li key={requirement}>
                                  <span className="disc-icon" />
                                  <span>{requirement}</span>
                                </li>
                              )
                            )}
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
                        <TierUpdate
                          data-id={tier.id}
                          className="upgrade-btn"
                          onClick={clickCallback}
                        >
                          Upgrade
                        </TierUpdate>
                      )}
                      {!tier.is_active && !tier.is_verified && (
                        <TierUpdate className="upgrade-btn">Upgrade</TierUpdate>
                      )}
                    </TierSubMain>
                  );
                })
              : ""}
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
export default connect(mapStateToProps)(withRouter(Tier));
