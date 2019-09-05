import React, { Component } from "react";
import "antd/dist/antd.css";
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

class Tier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tier1_upgrade: this.props.tier1_upgrade,
      tier2_upgrade: false,
      tier3_upgrade: false,
      tier4_upgrade: false,
      is_tier1_active: false,
      is_tier2_active: false,
      is_tier3_active: false,
      is_tier4_active: false,
      go_to_kyc: false
    };
  }
  componentDidMount() {
    // if (this.state.tier1_upgrade) {
    //   this.setState({
    //     is_tier1_active: false
    //   });
    // }
    if (this.state.tier2_upgrade) {
      this.setState({
        is_tier1_active: true
      });
    }
    if (this.state.tier3_upgrade) {
      this.setState({
        is_tier2_active: true
      });
    }
    if (this.state.tier4_upgrade) {
      this.setState({
        is_tier3_active: true
      });
    }
  }
  render() {
    let {
      is_tier1_active,
      is_tier2_active,
      is_tier3_active,
      is_tier4_active
    } = this.state;
    return (
      <div>
        <TierMainWrap>
          <TierMainInnerWrap>
            <TierSubMain
              className={
                this.state.tier1_upgrade ? "tier-enabled" : "tier-active"
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
          </TierMainInnerWrap>
        </TierMainWrap>
      </div>
    );
  }
}

export default Tier;
