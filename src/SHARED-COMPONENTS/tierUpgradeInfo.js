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
    // this.callback = this.callback.bind(this);
    // this.logout = this.logout.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props) {
      console.log("test props^^", props.userUpgradeData);
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
      console.log("sdafsdf", props.current_tier_id);
    }
  }
  componentDidMount() {
    console.log("test^^", this.props.userUpgradeData);
    // var requirement_1 = this.props.userUpgradeData.requirement_1;
    // var requirement_2 = this.props.userUpgradeData.requirement_2;
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
    this.setState({ response1: temp1 }, () => {
      console.log("requireq1^^^", this.state.response1);
    });
    let temp2 = [];
    for (var key1 in requirement_2) {
      temp2[`${key1}`] = requirement_2[key1];
    }
    this.setState(
      {
        response2: temp2,
        ageCheck: this.props.userUpgradeData.req1_ageCheck,
        tradeCountCheck: this.props.userUpgradeData.req1_tradeCountCheck,
        tradeTotalFiatCheck: this.props.userUpgradeData
          .req1_tradeTotalFiatCheck,
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
      },
      () => {
        console.log("requireq1^^^", this.props.current_tier_id);
      }
    );
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
    console.log("sfhdjkf", this.state.tierId);
    let { t } = this.props;
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
        {/* {this.props.visible && ( */}
        <Modal
          title={
            <div>
              {/* <img alt="FALDAX" src={_COMINGIMG} />{" "}
              <img className="faldax_logo" alt="FALDAX" src={_COMINGIMG2} /> */}
              Tier Upgrade Info
            </div>
          }
          visible={this.props.visible}
          onOk={(e) => this.handleComing()}
          onCancel={(e) => this.comingCancel(e)}
          //   closable={false}
          //   maskClosable={false}
          footer={null}
          width="35%"
          //   height="82%"
          //   className="terms-outer-wrap"
        >
          <ModalAgreeWrap className="reject_reason_div">
            <p>
              Before upgrading to Tier {tierId} account, Please fulfill any of
              the below requirement set.
            </p>
            {/* <h5>Requirement set 1</h5> */}
            <UpgradeTable>
              <thead>
                <tr>
                  <th className="title">Title</th>
                  <th>Requirement</th>
                  <th>Your Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="title">Minimum Account Age (Days)</td>
                  <td>{minimumAccountAge}</td>
                  <td className={ageCheck ? "green" : "red"}>
                    {response1.ageRemaining}
                  </td>
                </tr>
                <tr>
                  <td className="title">Minimum Number of Trades</td>
                  <td>{minimumNumberOfTrades}</td>
                  <td className={tradeCountCheck ? "green" : "red"}>
                    {response1.tradeCountRemaining}
                  </td>
                </tr>
                <tr>
                  <td className="title">Minimum Total USD Value of Trades</td>
                  <td>
                    <NumberFormat
                      value={`${parseFloat(minimumTradeValue).toFixed(2)}`}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </td>
                  <td className={tradeTotalFiatCheck ? "green" : "red"}>
                    <NumberFormat
                      value={
                        response1.tradeTotalFiatRemaining
                          ? `${parseFloat(
                              response1.tradeTotalFiatRemaining
                            ).toFixed(2)}`
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
                <button>Trade Now</button>
              </Link>
            </BtnLink>
            <SpanOr>Or</SpanOr>
            <UpgradeTable>
              <thead>
                <tr>
                  <th className="title">Title</th>
                  <th>Requirement</th>
                  <th>Your Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="title">Total Wallet USD value</td>
                  <td>
                    <NumberFormat
                      value={`${parseFloat(minimumWalletBalance).toFixed(2)}`}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </td>
                  <td className={tradeWalletCheck ? "green" : "red"}>
                    <NumberFormat
                      value={
                        response2.userWalletFiatRemaining
                          ? `${parseFloat(
                              response2.userWalletFiatRemaining
                            ).toFixed(2)}`
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
              <Link to="/wallet">
                <button>Add Funds to Wallet</button>
              </Link>
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

export default translate(["edit_profile_titles", "validations"])(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(TierUpgradeInfo))
);
