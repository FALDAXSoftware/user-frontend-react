import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import {
  Modal,
  Icon,
  notification,
  Row,
  Col,
  Button,
  Tabs,
  Progress,
} from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import {
  ModalAgreeWrap,
  UpgradeTable,
  SpanOr,
  BtnLink,
} from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import styled from "styled-components";
import { ButtonDiv } from "COMPONENTS/SETTINGS/changePassword/change_email.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { LogoutUser } from "ACTIONS/authActions";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

class TierUpgradeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: this.props.visible ? true : "",
      email_address: "",
      email_msg: "",
      loader: false,
      activeKey: "1",
      visible: false,
      response1: "",
      response2: "",
      ageCheck: false,
      tradeCountCheck: false,
      tradeTotalFiatCheck: false,
      tradeWalletCheck: false,
      minimumAccountAge: "",
      minimumNumberOfTrades: "",
      minimumTradeValue: "",
      minimumWalletBalance: "",
      tierId: "",
    };
    this.t = this.props.t;
    // this.callback = this.callback.bind(this);
    // this.logout = this.logout.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props) {
      var requirement_1 = props.userUpgradeData.requirement_1;
      var requirement_2 = props.userUpgradeData.requirement_2;
      let temp1 = [];
      for (var key in requirement_1) {
        temp1[`${key}`] = requirement_1[key];
      }
      this.setState({ response1: temp1 });
      let temp2 = [];
      for (var key1 in requirement_2) {
        temp2[`${key1}`] = requirement_2[key1];
      }
      this.setState({
        response2: temp2,
        ageCheck: props.userUpgradeData.req1_ageCheck,
        tradeCountCheck: props.userUpgradeData.req1_tradeCountCheck,
        tradeTotalFiatCheck: props.userUpgradeData.req1_tradeTotalFiatCheck,
        tradeWalletCheck: props.userUpgradeData.req2_tradeWalletCheck,
        minimumAccountAge: props.minimumAccountAge,
        minimumNumberOfTrades: props.minimumNumberOfTrades
          ? props.minimumNumberOfTrades
          : "0",
        minimumTradeValue: props.minimumTradeValue
          ? props.minimumTradeValue
          : "0",
        minimumWalletBalance: props.minimumWalletBalance
          ? props.minimumWalletBalance
          : "0",
        tierId: props.current_tier_id,
      });
    }
  }
  componentDidMount() {
    var requirement_1 = {
      ageRemaining: 25,
      tradeCountRemaining: 150,
      tradeTotalFiatRemaining: 1000.5654,
    };
    var requirement_2 = {
      userWalletFiatRemaining: 99000.25689,
    };
    let temp1 = [];
    for (var key in requirement_1) {
      temp1[`${key}`] = requirement_1[key];
    }
    this.setState({ response1: temp1 });
    let temp2 = [];
    for (var key1 in requirement_2) {
      temp2[`${key1}`] = requirement_2[key1];
    }
    this.setState({
      response2: temp2,
      ageCheck: this.props.userUpgradeData.req1_ageCheck,
      tradeCountCheck: this.props.userUpgradeData.req1_tradeCountCheck,
      tradeTotalFiatCheck: this.props.userUpgradeData.req1_tradeTotalFiatCheck,
      tradeWalletCheck: this.props.userUpgradeData.req2_tradeWalletCheck,
      minimumAccountAge: this.props.minimumAccountAge,
      minimumNumberOfTrades: this.props.minimumNumberOfTrades
        ? this.props.minimumNumberOfTrades
        : "0",
      minimumTradeValue: this.props.minimumTradeValue
        ? this.props.minimumTradeValue
        : "0",
      minimumWalletBalance: this.props.minimumWalletBalance
        ? this.props.minimumWalletBalance
        : "0",
      tierId: this.props.current_tier_id,
    });
  }
  showCofirmModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.logout();
      }
    );
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  handleComing = (e) => {
    this.setState({ comingSoon: false });
  };

  comingCancel = (e) => {
    this.setState({ comingSoon: false });
    this.props.comingCancel(e);
  };

  render() {
    let {
      response1,
      response2,
      ageCheck,
      tradeCountCheck,
      tradeTotalFiatCheck,
      tradeWalletCheck,
      minimumAccountAge,
      minimumNumberOfTrades,
      minimumTradeValue,
      minimumWalletBalance,
      tierId,
    } = this.state;
    return (
      <div>
        <Modal
          title={<div>{this.t("tier_upgrade_info_text.message")}</div>}
          visible={this.props.visible}
          onOk={(e) => this.handleComing()}
          onCancel={(e) => this.comingCancel(e)}
          footer={null}
          // width="35%"
          className="upgrade_popup"
        >
          <ModalAgreeWrap className="reject_reason_div">
            <p>
              {this.t("tier_popup_subtext1_text.message")} {tierId}{" "}
              {this.t("tier_popup_subtext2_text.message")}
            </p>
            {/* <h5>Requirement set 1</h5> */}
            <UpgradeTable>
              <thead>
                <tr>
                  <th className="title">{this.t("title_text.message")}</th>
                  <th>{this.t("requirement_text.message")}</th>
                  <th>{this.t("your_data_text.message")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="title">
                    {this.t("Minimum_account_age_text.message")}
                  </td>
                  <td>{minimumAccountAge}</td>
                  <td className={ageCheck ? "green" : "red"}>
                    {response1.ageRemaining}
                  </td>
                </tr>
                <tr>
                  <td className="title">
                    {this.t("Minimum_no_of_trades_text.message")}
                  </td>
                  <td>{minimumNumberOfTrades}</td>
                  <td className={tradeCountCheck ? "green" : "red"}>
                    {response1.tradeCountRemaining}
                  </td>
                </tr>
                <tr>
                  <td className="title">
                    {this.t("Minimum_total_value_of_trades_text.message")}
                  </td>
                  <td>
                    <NumberFormat
                      value={`${precisionTwo(minimumTradeValue)}`}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </td>
                  <td className={tradeTotalFiatCheck ? "green" : "red"}>
                    <NumberFormat
                      value={
                        response1.tradeTotalFiatRemaining
                          ? `${precisionTwo(response1.tradeTotalFiatRemaining)}`
                          : "0"
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </td>
                </tr>
              </tbody>
            </UpgradeTable>
            <BtnLink>
              <Link to="/trade">
                <button>{this.t("trade_now_text.message")}</button>
              </Link>
            </BtnLink>
            <SpanOr>{this.t("tier_changes:or_text.message")}</SpanOr>
            <UpgradeTable>
              <thead>
                <tr>
                  <th className="title">{this.t("title_text.message")}</th>
                  <th>{this.t("requirement_text.message")}</th>
                  <th>{this.t("your_data_text.message")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="title">
                    {this.t("total_wallet_balance_text.message")}
                  </td>
                  <td>
                    <NumberFormat
                      value={`${precisionTwo(minimumWalletBalance)}`}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </td>
                  <td className={tradeWalletCheck ? "green" : "red"}>
                    <NumberFormat
                      value={
                        response2.userWalletFiatRemaining
                          ? `${precisionTwo(response2.userWalletFiatRemaining)}`
                          : "0"
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </td>
                </tr>
              </tbody>
            </UpgradeTable>
            <BtnLink>
              {/* <Link to="/wallet"> */}
              <button
                onClick={() => {
                  this.props.history.push({
                    pathname: "/wallet",
                    state: {
                      flag: true,
                    },
                  });
                }}
              >
                {this.t("add_funds_to_wallet_text.message")}
              </button>
              {/* </Link> */}
            </BtnLink>
          </ModalAgreeWrap>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    // isLoggedIn: state.simpleReducer.isLoggedIn ? true : false,
    profileDetails: state.simpleReducer.profileDetails
      ? state.simpleReducer.profileDetails.data[0]
      : "",
  };
}

const mapDispatchToProps = (dispatch) => ({
  //Logout: () => dispatch(Logout()),
  LogoutUser: (isLoggedIn, user_id) =>
    dispatch(LogoutUser(isLoggedIn, user_id)),
});

// export default withRouter(AgreeTerms);

export default translate([
  "tiers",
  "edit_profile_titles",
  "validations",
  "tier_changes",
])(connect(mapStateToProps, mapDispatchToProps)(withRouter(TierUpgradeInfo)));
function precisionTwo(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 2) {
    {
      x = parseFloat(x).toFixed(2);
      if (
        x.toString()[x.toString().length - 1] == "0" &&
        (x.toString().split(".")[1][0] != "0" ||
          x.toString().split(".")[1][5] != "0")
      ) {
        return parseFloat(x);
      } else if (x.toString().split(".")[1][1] == "0") {
        if (x.toString().split(".")[1][0] == "0") {
          return parseFloat(x).toFixed(0);
        } else return parseFloat(x).toFixed(1);
      }
    }
  }
  return x;
}
