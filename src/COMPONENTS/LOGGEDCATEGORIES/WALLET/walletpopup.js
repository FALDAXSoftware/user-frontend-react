/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Modal, Input, notification } from "antd";
/* import { DropdownButton, ButtonToolbar } from 'react-bootstrap'; */
import styled, { consolidateStreamedStyles } from "styled-components";
import SimpleReactValidator from "simple-react-validator";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment";
import { connect } from "react-redux";
import { translate } from "react-i18next";
/* Styled-Components */

/* Components */
import { RefInput } from "COMPONENTS/SETTINGS/referral";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import TFAModal from "SHARED-COMPONENTS/TFAModal";
import { parse } from "@fortawesome/fontawesome-svg-core";
import NumberFormat from "react-number-format";
import { LogoutUser } from "../../../ACTIONS/authActions";
import { UpgradeTable } from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";

let { API_URL } = globalVariables;
const WalletModal = styled(Modal)`
  width: 656px !important;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  > .ant-modal-content > .ant-modal-header {
    padding: 0px;
  }
  > .ant-modal-content > .ant-modal-body {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#061a2b" : ""};
  }
  > .ant-modal-content > .ant-modal-close > .ant-modal-close-x {
    color: white;
  }
  @media (max-width: 767px) {
    top: 24px;
    width: 500px !important;
  }
  @media (max-width: 575px) {
    width: 300px !important;
  }
  & .note_text {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  }
`;
const Label = styled.label`
  font-size: 16px;
  font-family: "Open Sans";
  display: block;
  color: ${(props) =>
    props.theme.mode === "dark" ? "rgb( 255, 255, 255 )" : "black"};
`;
const ModalWrap = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
`;
const TitleDiv = styled.div`
  background-color: #4c84ff;
  color: white;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.span`
  font-size: 20px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
`;
const Rediv = styled.div`
  margin-top: 20px;
`;
const WallInput = styled(Input)`
  height: 48px;
  margin-top: 10px;
  width: 100%;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#061a2b" : "#f8f8f8"};
  display: block;
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  caret-color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
`;

const Fee = styled.span`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  font-family: "Open Sans";
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  > span {
    display: flex;
    width: 100%;
    > span {
      > b {
        min-width: 170px;
        display: inline-block;
      }
    }
  }
  @media (max-width: 767px) {
    float: none;
    display: block;
  }
`;
const TotPay = styled.span`
  display: flex;
  font-size: 16px;
  font-family: "Open Sans";
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  > span {
    > b {
      min-width: 150px;
      display: inline-block;
    }
  }
  @media (max-width: 767px) {
    float: none;
    display: block;
  }
`;
const SendButton = styled(Button)`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
  height: 48px;
  color: white;
  background-color: #4c84ff;
  width: 232px;
  @media (max-width: 767px) {
    width: 125px;
  }
`;
const CopyToClipboardCSS = styled(CopyToClipboard)`
  display: inline;
`;
const SendWrap = styled.div`
  text-align: center;
  margin-top: 50px;
  display: block;
  @media (max-width: 767px) {
    padding-top: 20px;
  }
`;
const TotDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  // width: 462px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.available_balance {
    margin: 10px 0 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    font-family: "Open Sans";
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
    > label {
      display: inherit;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    > span.red {
      color: red;
    }
    > span {
      margin: 0 0 0 10px;
      text-transform: uppercase;
    }
  }
`;
const WithrawMsg = styled.div`
  font-size: 20px;
  font-family: "Open Sans";
  text-align: center;
  padding-top: 50px;
  & button:first-child {
    margin-right: 10px;
  }
  & button:last-child {
    margin-left: 10px;
  }
`;
const ConfirmDiv = styled.div`
  text-align: center;
  padding-top: 50px;
  .confirm {
    width: 100px;
    margin-right: 10px;
  }
  .cancel {
    width: 100px;
    margin-left: 10px;
  }
`;

export const AddressDiv = styled.div`
  text-align: left;
`;

export const ReceiveDiv = styled.div`
  text-align: center;
  margin-top: 40px;
`;

export const CopyAddress = styled.div`
  margin-top: 20px;
`;
class WalletPopup extends Component {
  constructor(props) {
    super(props);
    this.t = this.props.t;
    this.state = {
      value: null,
      copied: false,
      comingSoon: this.props.visible ? true : "",
      email_address: "",
      email_msg: "",
      receive: {},
      receiveAdd: "receive_add",
      show: false,
      fiatValue: 0,
      fiatCurrency: "",
      singlefiatValue: "",
      sendFields: {
        amount: "",
        destination_address: "",
        subtotal: 0,
      },
      disabled: true,
      faldaxFee: 0,
      networkFee: 0,
      loader: false,
      showTFAModal: false,
      withdrawFlag: false,
      availableBalance: "",
      withdrawMsg: this.t("withdraw_request_is_processed.message"),
      limitExceeded: false,
      dailyLimit: "",
      monthlyLimit: "",
      dailyLimitLeft: "",
      monthlyLimitLeft: "",
      dailyLimitAfter: "",
      monthlyLimitAfter: "",
      showDeatils: false,
      limitUnlimited: false,
    };
    this.timeout = null;
    this.validator = new SimpleReactValidator({
      gtzero: {
        // name the rule
        message: this.t("amount_gt_zero_validation.message"),
        rule: (val, params, validator) => {
          if (val > 0) {
            return true;
          } else {
            return false;
          }
        },
        required: true, // optional
      },
      amountNumeric: {
        message: this.t("amount_8_precision_validation.message"),
        rule: (val) => {
          var RE = /^\d+.?\d*$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
      decimalrestrict: {
        message: this.t("validation_amount_numeric.message"),
        rule: (val) => {
          var RE = /^\d*\.?\d{0,8}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
      minAddress: {
        message: `${this.t(
          "validation_destination_address_min_require.message"
        )}.`,
        rule: (val, params, validator) => {
          // console.log("this is val?????", val);
          if (val.length >= params[0]) {
            // console.log("here call");
            return true;
          } else {
            // console.log("else call");
            return false;
          }
        },
        required: true, // optional
      },
      maxAddress: {
        message: `${this.t(
          "validation_destination_address_max_require.message"
        )}`,
        rule: (val, params, validator) => {
          if (val.length <= params[0]) {
            return true;
          } else {
            return false;
          }
        },
        required: true, // optional
      },
      minLimitCheck: {
        message: `${this.t("amount_gte_validation.message")} ${
          this.props.coin_min_limit
        }.`,
        rule: (val, params, validator) => {
          // console.log("this is val?????", val);
          if (val >= this.props.coin_min_limit) {
            // console.log("here call");
            return true;
          } else {
            // console.log("else call");
            return false;
          }
        },
        required: true, // optional
      },
      maxLimitCheck: {
        message: `${this.t("amount_lte_validation.message")} ${
          this.props.coin_max_limit
        }.`,
        rule: (val, params, validator) => {
          // console.log("this is val?????", val);
          if (val <= this.props.coin_max_limit) {
            // console.log("here call");
            return true;
          } else {
            // console.log("else call");
            return false;
          }
        },
        required: true, // optional
      },
      destinationRequire: {
        message: this.t("validation_destination_address_required.message"),
        required: true,
        rule: (val) => {
          var RE = /.+/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
      amountRequired: {
        message: this.t("validation_amount_required.message"),
        rule: (val) => {
          var RE = /.+/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
        required: true,
      },
      allowSpecial: {
        message: this.t("destination_address_validation.message"),
        rule: (val) => {
          var RE = /^[A-Za-z0-9_/?=]*$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
    this.sendChange = this.sendChange.bind(this);
    this.sendSubmit = this.sendSubmit.bind(this);
    this.comingCancel = this.comingCancel.bind(this);
    this.confirmFunc = this.confirmFunc.bind(this);
    this.cancelFunc = this.cancelFunc.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.sendAddressChange = this.sendAddressChange.bind(this);
    this.getFeeValues = this.getFeeValues.bind(this);
    this.getAvailableBalance = this.getAvailableBalance.bind(this);
    this.getTierLimits = this.getTierLimits.bind(this);
  }

  /* Life Cycle Methods */

  componentDidMount() {
    // console.log(this.props);
    this.getAvailableBalance();
    // this.getTierLimits();
    if (this.props.title === "RECEIVE") {
      this.setState({ loader: true });
      // console.log(this.props.coin_code)
      fetch(`${API_URL}/wallet/get-qr-code/${this.props.coin_code}`, {
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
            receive: responseData.receiveCoin,
            loader: false,
            show: true,
          });
        })
        .catch((error) => {
          // console.log(error)
        });
    }
    if (this.props.fiatValue && parseFloat(this.props.fiatValue) != 0) {
      this.setState({
        fiatValue: 0,
        fiatCurrency: this.props.fiatCurrency,
        singlefiatValue: this.props.fiatValue.toFixed(8),
      });
    } else {
      this.setState({
        fiatValue: 0,
        fiatCurrency: this.props.fiatCurrency,
        singlefiatValue: 0,
      });
    }
  }

  // Get Availabel balance API
  getAvailableBalance() {
    return new Promise((resolve, reject) => {
      this.setState({
        loader: true,
      });
      let coin = this.props.coin_code;
      fetch(`${API_URL}/users/get-available-balance?coin=${coin}`, {
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
          if (responseData.status === 200) {
            // console.log("^^^", responseData);
            this.setState({
              availableBalance: parseFloat(responseData.data).toFixed(8),
            });
          } else {
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.error
            );
          }
          this.setState({
            loader: false,
          });
          resolve();
        })
        .catch((error) => {});
    });
  }

  /* 
        Page: /wallet
        This method is called when we have to copy address to clipboard.
    */

  SearchText(e, value) {
    // e.stopPropagation();
    // Copy to clipboard example
    document.querySelectorAll(
      ".ant-input-search-button"
    )[0].onclick = function () {
      // Select the content
      if (document.querySelectorAll(".receive_add > input")[0]) {
        document.querySelectorAll(".receive_add > input")[0].select();
        // Copy to the clipboard
        document.execCommand("copy");
      }
    };
    this.openNotificationWithIcon(
      "success",
      this.t("copy_text.message"),
      this.t("copy_to_clipboard.message")
    );
    this.comingCancel();
  }

  /* 
        Page: /wallet
        This method is called when we have to open the modal.
    */

  handleComing = (e) => {
    this.setState({
      comingSoon: false,
    });
  };

  /* 
        Page: /wallet
        This method is called when we have to close the modal.
    */

  comingCancel = (e) => {
    this.setState({
      comingSoon: false,
    });
    this.props.comingCancel(e);
  };

  /* 
        Page: /wallet
        This method is called for custom notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 6,
    });
  }

  /* 
        Page: /wallet
        This method is called when we want to send the entered coin with right validations.
    */

  sendSubmit(confirmFlag, otp = null) {
    // console.log(confirmFlag, otp, this.state.sendFields);
    if (this.validator.allValid()) {
      var values = this.state.sendFields;
      //   values["amount"] = parseFloat(this.state.sendFields.amount).toFixed(8);
      values["amount"] = this.state.sendFields.amount;
      values["total_fees"] = this.state.sendFields.subtotal;
      values["coin_code"] = this.props.coin_code;
      values["networkFees"] = this.state.networkFee;
      values["faldaxFees"] = this.state.faldaxFee;
      // console.log("values", values);
      if (confirmFlag == true) values["confirm_for_wait"] = confirmFlag;
      if (otp !== null) {
        values["otp"] = otp;
      } else delete values.otp;
      this.setState({ loader: true });
      fetch(API_URL + "/wallet/send", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // console.log("SEND API", responseData)
          if (responseData.status === 200) {
            this.openNotificationWithIcon(
              "success",
              this.t("validations:success_text.message"),
              responseData.message
            );
            this.props.walletDetailsApi();
            this.comingCancel();
          } else if (responseData.status === 201) {
            this.setState({
              showTFAModal: false,
              withdrawFlag: true,
              withdrawMsg: responseData.message,
            });
          } else if (responseData.status === 202) {
            // alert("here");
            this.setState({
              showTFAModal: true,
            });
          } else if (responseData.status === 403) {
            // this.openNotificationWithIcon("error",  this.t("validations:error_text.message"), responseData.err);
            let formData = {
              user_id: this.props.profileDetails.id,
              jwt_token: this.props.isLoggedIn,
            };
            this.props.LogoutUser(this.props.isLoggedIn, formData);
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.err
            );
          } else {
            if (responseData.status !== 402)
              this.setState({
                showTFAModal: false,
              });
            // console.log(responseData);
            if (responseData.status == 203) {
              // console.log(responseData.datetime);
              var gmtDateTime = moment.utc(
                responseData.datetime,
                "YYYY-MM-DD HH:mm:ss"
              );
              var local = gmtDateTime.local().format("YYYY-MMM-DD HH:mm:ss");
              // console.log(local);
              this.openNotificationWithIcon(
                "warning",
                this.t("validations:.warning_text.message"),
                responseData.message ? `${responseData.message}${local}` : ""
              );
              this.comingCancel();
            } else
              this.openNotificationWithIcon(
                "warning",
                this.t("validations:warning_text.message"),
                responseData.message ? responseData.message : responseData.err
              );
          }
          this.setState({ loader: false });
        })
        .catch((error) => {});
    } else {
      this.setState({ loader: false });
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  /* 
        Page: /wallet
        This method is called when fields are change in SEND Form.
    */
  sendAddressChange(e) {
    var fields = this.state.sendFields;
    var name = e.target.name;
    fields[name] = e.target.value;
    // let subtotal = parseFloat(
    //   parseFloat(fields[name]) +
    //     parseFloat(fields[name]) * (this.props.coinFee / 100)
    // ).toFixed(8);
    // fields["subtotal"] = subtotal;
    this.setState({ sendFields: fields, showTFAModal: false }, () => {
      if (this.state.sendFields.amount && this.validator.allValid()) {
        this.timeout = setTimeout(async () => {
          // await this.getAvailableBalance();
          // await this.getTierLimits();
          await this.getFeeValues();
        }, 1500);
        // this.getAvailableBalance();
      } else {
        if (
          this.state.sendFields.amount &&
          this.state.sendFields.destination_address
        ) {
          this.validator.showMessages();
          this.setState({
            disabled: true,
          });
        }
        this.setState({
          showDeatils: false,
        });
      }
    });
  }
  getTierLimits() {
    return new Promise((resolve, reject) => {
      this.setState({
        loader: true,
      });
      var values = {
        coin: this.props.coin_code,
        // amount: this.state.sendFields.amount,
        amount: this.state.sendFields.subtotal,
      };
      fetch(`${API_URL}/users/check-transaction-limit`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === 200) {
            this.setState({
              dailyLimit: responseData.data.daily_limit_actual,
              monthlyLimit: responseData.data.monthly_limit_actual,
              dailyLimitLeft: responseData.data.daily_limit_left,
              monthlyLimitLeft: responseData.data.monthly_limit_left,
              dailyLimitAfter:
                responseData.data.current_limit_left_daily_amount,
              monthlyLimitAfter:
                responseData.data.current_limit_left_montly_amount,
              limitExceeded: false,
              showDeatils: true,
            });
          } else if (responseData.status === 201) {
            // this.openNotificationWithIcon(
            //   "warning",
            //   "Warning",
            //   responseData.message
            // );
            this.setState({
              dailyLimit: responseData.data.daily_limit_actual,
              monthlyLimit: responseData.data.monthly_limit_actual,
              dailyLimitLeft: responseData.data.daily_limit_left,
              monthlyLimitLeft: responseData.data.monthly_limit_left,
              limitExceeded: true,
              showDeatils: true,
            });
          } else if (responseData.status === 202) {
            this.setState({
              dailyLimit: responseData.data.daily_limit_actual,
              monthlyLimit: responseData.data.monthly_limit_actual,
              dailyLimitLeft: responseData.data.daily_limit_left,
              monthlyLimitLeft: responseData.data.monthly_limit_left,
              limitUnlimited: true,
              showDeatils: true,
              limitExceeded: false,
            });
          } else if (responseData.status === 500) {
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.err
            );
          } else {
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.message
            );
          }
          this.setState({
            loader: false,
          });
          resolve();
        })
        .catch((error) => {});
    });
  }
  getFeeValues() {
    // console.log("test");
    return new Promise((resolve, reject) => {
      this.setState({
        loader: true,
      });
      var fields = this.state.sendFields;
      var values = {
        coin: this.props.coin_code,
        amount: this.state.sendFields.amount,
        address: this.state.sendFields.destination_address,
      };
      fetch(`${API_URL}/wallet/get-network-fee`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === 200) {
            // console.log(responseData);
            let subtotal = parseFloat(
              parseFloat(this.state.sendFields.subtotal) +
                parseFloat(responseData.data)
            ).toFixed(8);
            fields["subtotal"] = subtotal;
            this.setState({
              networkFee: responseData.data,
              // disabled: false,
              sendFields: fields,
            });
            if (this.state.limitExceeded) {
              this.setState({
                disabled: true,
              });
            } else {
              this.setState({
                disabled: false,
              });
            }
          } else if (responseData.status === 500) {
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.err
            );
          } else {
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.message
            );
          }
          // code here for getting limits
          this.getTierLimits();
          // this.setState({
          //   loader: false,
          // });
          resolve();
        })
        .catch((error) => {});
    });
  }
  sendChange(e) {
    if (this.state.loader) {
      return false;
    }
    clearTimeout(this.timeout);
    var fields = this.state.sendFields;
    var name = e.target.name;
    fields[name] = e.target.value;
    if (e.target.value === "" || e.target.value === null) {
      let subtotal = parseFloat(
        parseFloat(fields[name]) +
          parseFloat(fields[name]) * (this.props.coinFee / 100)
      ).toFixed(8);
      let fiatValueamount = parseFloat(
        parseFloat(this.state.singlefiatValue) * parseFloat(subtotal)
      ).toFixed(2);
      fields["subtotal"] = 0;
      this.setState({
        sendFields: fields,
        fiatValue: 0,
        faldaxFee: 0,
        showTFAModal: false,
        disabled: true,
        networkFee: 0,
        showDeatils: false,
      });
    } else {
      let subtotal = parseFloat(
        parseFloat(fields[name]) +
          parseFloat(fields[name]) * (this.props.coinFee / 100)
      ).toFixed(8);
      let fiatValueamount;
      if (this.state.singlefiatValue !== 0) {
        fiatValueamount = parseFloat(
          parseFloat(this.state.singlefiatValue) * parseFloat(subtotal)
        ).toFixed(2);
      } else {
        fiatValueamount = 0;
      }
      let faldaxFee = parseFloat(
        e.target.value * (this.props.coinFee / 100)
      ).toFixed(8);
      fields["subtotal"] = subtotal;
      this.setState(
        {
          sendFields: fields,
          fiatValue: fiatValueamount,
          showTFAModal: false,
          faldaxFee,
        },
        () => {
          if (
            this.state.sendFields.destination_address &&
            this.validator.allValid()
          ) {
            this.timeout = setTimeout(async () => {
              // await this.getAvailableBalance();
              // await this.getTierLimits();
              await this.getFeeValues();
            }, 1500);
            // this.getAvailableBalance();
          } else {
            if (
              this.state.sendFields.amount &&
              this.state.sendFields.destination_address
            ) {
              this.validator.showMessages();
              this.setState({
                disabled: true,
              });
            }
            this.setState({
              showDeatils: false,
            });
          }
        }
      );
    }
  }

  /* After confirming Button*/
  confirmFunc() {
    this.sendSubmit(true);
    this.handleComing();
  }
  /* After Cancel Button*/
  cancelFunc() {
    let _this = this;
    _this.openNotificationWithIcon(
      "success",
      this.t("validations:success_text.message"),
      this.t("transaction_cancel.message")
    );
    _this.comingCancel();
  }

  render() {
    let amount = Number(this.state.sendFields.amount);
    let {
      dailyLimit,
      monthlyLimit,
      dailyLimitLeft,
      monthlyLimitLeft,
      dailyLimitAfter,
      monthlyLimitAfter,
      showDeatils,
    } = this.state;
    return (
      <div>
        {(this.props.title === "RECEIVE" &&
          this.props.visible &&
          this.state.show === true) ||
        this.props.title === "SEND" ? (
          <WalletModal
            title={
              <TitleDiv>
                <Title>
                  {this.props.title == "RECEIVE"
                    ? this.t("wallet:recieve_btn.message")
                    : this.t("wallet:send_btn.message")}
                </Title>
              </TitleDiv>
            }
            visible={this.props.visible}
            onOk={(e) => this.handleComing()}
            onCancel={(e) => this.comingCancel(e)}
            footer={null}
            className="wallet-popup"
          >
            {this.props.title === "RECEIVE" ? (
              <ModalWrap>
                {Object.keys(this.state.receive).length > 0 ? (
                  <ReceiveDiv>
                    <div>
                      <img src={this.state.receive.url} alt="no photo" />
                    </div>
                    <CopyAddress>
                      <CopyToClipboardCSS
                        text={this.state.receive.receive_address}
                        onCopy={() => {
                          this.setState({ copied: true }, () =>
                            // this.comingCancel()
                            {}
                          );
                        }}
                      >
                        <AddressDiv>
                          <RefInput
                            value={this.state.receive.receive_address}
                            className={this.state.receiveAdd}
                            placeholder={this.t(
                              "edit_profile_titles:head_referral.message"
                            )}
                            enterButton={this.t("referral:copy_btn.message")}
                            size="large"
                            onSearch={(e, value) => this.SearchText(e, value)}
                          />
                        </AddressDiv>
                      </CopyToClipboardCSS>
                    </CopyAddress>
                  </ReceiveDiv>
                ) : (
                  ""
                )}
              </ModalWrap>
            ) : this.state.withdrawFlag == true ? (
              <ModalWrap>
                <WithrawMsg>{this.state.withdrawMsg}</WithrawMsg>
                <ConfirmDiv>
                  <Button
                    onClick={this.confirmFunc}
                    className="confirm"
                    size="large"
                    type="primary"
                  >
                    {this.t("conversion:confirm_btn.message")}
                  </Button>
                  <Button
                    onClick={this.cancelFunc}
                    className="cancel"
                    size="large"
                    type="primary"
                  >
                    {this.t(
                      "edit_profile_titles:subhead_personal_form_cancel_btn.message"
                    )}
                  </Button>
                </ConfirmDiv>
              </ModalWrap>
            ) : (
              <ModalWrap>
                <Rediv>
                  <Label>{this.t("destination_address.message")}</Label>
                  <WallInput
                    value={this.state.sendFields.destination_address}
                    name="destination_address"
                    onChange={this.sendAddressChange}
                    placeholder="37NFX8KWAQbaodUG6pE1hNUH1dXgkpzbyZ"
                  />
                  {this.validator.message(
                    "destination_address",
                    this.state.sendFields.destination_address,
                    "destinationRequire|minAddress:15|maxAddress:120|allowSpecial",
                    "text-danger-validation"
                  )}
                </Rediv>
                <Rediv>
                  <Label>{this.t("wallet:amount_text.message")}</Label>
                  <WallInput
                    type="text"
                    min="0"
                    placeholder="0"
                    value={this.state.sendFields.amount}
                    name="amount"
                    step="0.00000001"
                    onChange={this.sendChange}
                  />
                  {this.validator.message(
                    "amount",
                    this.state.sendFields.amount,
                    "amountRequired|numeric|gtzero|decimalrestrict|minLimitCheck|maxLimitCheck",
                    "text-danger-validation",
                    {
                      numeric: this.t("validation_amount_numeric.message"),
                    }
                  )}
                  <TotDiv className="available_balance">
                    <label>{this.t("avail_balance_to_send.message")}: </label>
                    <span
                      className={
                        parseFloat(this.state.availableBalance) == 0
                          ? "red"
                          : ""
                      }
                    >
                      <NumberFormat
                        value={this.state.availableBalance}
                        displayType={"text"}
                        thousandSeparator={true}
                      />{" "}
                      {this.props.coin_code}
                    </span>
                  </TotDiv>
                  {showDeatils ? (
                    <TotDiv>
                      <Fee>
                        <span>
                          <span>
                            <b>
                              FALDAX {this.t("conversion:fee_text.message")}{" "}
                              {`(${this.props.coinFee}%)`}:{" "}
                            </b>
                            {this.props.coinFee
                              ? `${this.state.faldaxFee}${" "}${
                                  this.props.coin_code
                                }`
                              : 0}
                          </span>
                        </span>
                        <span>
                          <span>
                            <b>
                              {this.t("conversion:network_text.message")}{" "}
                              {this.t("conversion:fee_text.message")}*:
                            </b>
                            {this.props.coinFee
                              ? `${this.state.networkFee}${" "}${
                                  this.props.coin_code
                                }`
                              : 0}
                          </span>
                        </span>
                        <span>
                          {/* {this.props.fiatValue
                          ? `${this.props.fiatValue.toFixed(2)} USD`
                          : 0} */}
                          {/* <span>
                          <b>Fiat Value: </b>
                          {this.state.fiatValue} USD
                        </span> */}
                          <span>
                            <b>
                              {this.t("wallet_total_payout_text.message")}:{" "}
                            </b>
                            {`${this.state.sendFields.subtotal}
                          ${this.props.coin_code}`}
                          </span>
                        </span>
                      </Fee>
                      <TotPay>
                        <span>
                          <b>
                            {this.t(
                              "settings:deactivate_popup_table_head_fiat_value.message"
                            )}
                            :{" "}
                          </b>
                          <NumberFormat
                            value={
                              this.state.fiatValue
                                ? parseFloat(this.state.fiatValue).toFixed(2)
                                : "0"
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix="$"
                          />
                        </span>
                      </TotPay>
                    </TotDiv>
                  ) : (
                    ""
                  )}
                </Rediv>
                {showDeatils ? (
                  <UpgradeTable className="wallet-popup">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Daily</th>
                        <th>Monthly</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tier Limit:</td>
                        <td>
                          {this.state.limitUnlimited ? (
                            dailyLimit
                          ) : (
                            <NumberFormat
                              value={
                                dailyLimit
                                  ? parseFloat(dailyLimit).toFixed(2)
                                  : "0"
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              // prefix="$"
                              suffix=" USD"
                            />
                          )}
                        </td>
                        <td>
                          {this.state.limitUnlimited ? (
                            monthlyLimit
                          ) : (
                            <NumberFormat
                              value={
                                monthlyLimit
                                  ? parseFloat(monthlyLimit).toFixed(2)
                                  : "0"
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix="$"
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Available Limit:</td>
                        <td>
                          {this.state.limitUnlimited ? (
                            dailyLimitLeft
                          ) : (
                            <NumberFormat
                              value={
                                dailyLimitLeft
                                  ? parseFloat(dailyLimitLeft).toFixed(2)
                                  : "0"
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix="$"
                            />
                          )}
                        </td>
                        <td>
                          {this.state.limitUnlimited ? (
                            monthlyLimitLeft
                          ) : (
                            <NumberFormat
                              value={
                                monthlyLimitLeft
                                  ? parseFloat(monthlyLimitLeft).toFixed(2)
                                  : "0"
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix="$"
                            />
                          )}
                        </td>
                      </tr>
                      {this.state.limitExceeded ? (
                        <tr className="limit_exceed">
                          <td>Limit after transfer:</td>
                          <td className="center" colSpan="2">
                            Limit Exceeded
                          </td>
                        </tr>
                      ) : this.state.limitUnlimited ? (
                        ""
                      ) : (
                        <tr>
                          <td>Limit after transfer:</td>
                          <td>
                            <NumberFormat
                              value={
                                dailyLimitAfter
                                  ? parseFloat(dailyLimitAfter).toFixed(2)
                                  : "0"
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix="$"
                            />
                          </td>
                          <td>
                            <NumberFormat
                              value={
                                monthlyLimitAfter
                                  ? parseFloat(monthlyLimitAfter).toFixed(2)
                                  : "0"
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix="$"
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </UpgradeTable>
                ) : (
                  ""
                )}
                <SendWrap>
                  <SendButton
                    disabled={
                      this.state.disabled
                        ? true
                        : parseFloat(this.state.availableBalance) == 0
                        ? true
                        : ""
                    }
                    onClick={this.sendSubmit}
                  >{`${this.t("wallet:send_btn.message")} ${
                    this.props.coin_code
                  }`}</SendButton>
                </SendWrap>
              </ModalWrap>
            )}
            {this.props.title === "SEND" && (
              <span className="note_text">
                {this.t("note_text.message")}*:{" "}
                {this.t("wallet:send_amount_note_text.message")}
              </span>
            )}
          </WalletModal>
        ) : (
          ""
        )}
        {/* {console.log(this.state.showTFAModal)} */}
        <TFAModal
          visible={this.state.showTFAModal}
          isLoggedIn={this.props.isLoggedIn}
          submit={(otp) => this.sendSubmit(false, otp)}
        />
        {this.state.loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    isLoggedIn: state.simpleReducer.isLoggedIn
      ? state.simpleReducer.isLoggedIn
      : "",
  };
}
const mapDispatchToProps = (dispatch) => ({
  // Logout: () => dispatch(Logout()),
  LogoutUser: (isLoggedIn, user_id) =>
    dispatch(LogoutUser(isLoggedIn, user_id)),
});

export default translate([
  "general_3",
  "validations",
  "wallet",
  "conversion",
  "edit_profile_titles",
  "settings",
  "referral",
])(connect(mapStateToProps, mapDispatchToProps)(WalletPopup));
