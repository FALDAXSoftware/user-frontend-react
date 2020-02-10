/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Modal, Input, notification } from "antd";
/* import { DropdownButton, ButtonToolbar } from 'react-bootstrap'; */
import styled, { consolidateStreamedStyles } from "styled-components";
import SimpleReactValidator from "simple-react-validator";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment";
/* Styled-Components */

/* Components */
import { RefInput } from "COMPONENTS/SETTINGS/referral";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import TFAModal from "SHARED-COMPONENTS/TFAModal";
import { parse } from "@fortawesome/fontawesome-svg-core";

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
    background-color: ${props =>
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
`;
const Label = styled.label`
  font-size: 16px;
  font-family: "Open Sans";
  display: block;
  color: ${props =>
    props.theme.mode === "dark" ? "rgb( 255, 255, 255 )" : "black"};
`;
const ModalWrap = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 60px;
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
  margin-top: 35px;
`;
const WallInput = styled(Input)`
  height: 48px;
  margin-top: 10px;
  width: 100%;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#061a2b" : "#f8f8f8"};
  display: block;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  caret-color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;

const Fee = styled.span`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  font-family: "Open Sans";
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
  > span {
    display: flex;
    width: 100%;
    > span {
      text-transform: uppercase;
      > b {
        min-width: 150px;
        display: inline-block;
        text-transform: none;
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
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
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
  margin-top: 60px;
  display: block;
  @media (max-width: 767px) {
    padding-top: 20px;
  }
`;
const TotDiv = styled.div`
  margin-top: 45px;
  width: 100%;
  // width: 462px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      singlefiatValue: "",
      sendFields: {
        amount: "",
        destination_address: "",
        subtotal: 0
      },
      disabled: true,
      faldaxFee: 0,
      networkFee: 0,
      loader: false,
      showTFAModal: false,
      withdrawFlag: false,
      withdrawMsg:
        "Your Withdrawal request may take 24-28 hours to process due to its size. Do you wish to proceed?"
    };
    this.timeout = null;
    this.validator = new SimpleReactValidator({
      gtzero: {
        // name the rule
        message: "Amount must be greater than 0.",
        rule: (val, params, validator) => {
          if (val > 0) {
            return true;
          } else {
            return false;
          }
        },
        required: true // optional
      },
      decimalrestrict: {
        message:
          "Amount must be less than or equal to 8 digits after decimal point.",
        rule: val => {
          var RE = /^\d*\.?\d{0,8}$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      minLimitCheck: {
        message: `Amount must be greater than ${this.props.coin_min_limit}.`,
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
        required: true // optional
      },
      maxLimitCheck: {
        message: `Amount must be less than ${this.props.coin_max_limit}.`,
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
        required: true // optional
      },
      allowSpecial: {
        message: "Please enter valid destination address.",
        rule: val => {
          var RE = /^[A-Za-z0-9_/?=]*$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
    this.sendChange = this.sendChange.bind(this);
    this.sendSubmit = this.sendSubmit.bind(this);
    this.comingCancel = this.comingCancel.bind(this);
    this.confirmFunc = this.confirmFunc.bind(this);
    this.cancelFunc = this.cancelFunc.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.sendAddressChange = this.sendAddressChange.bind(this);
    this.getFeeValues = this.getFeeValues.bind(this);
  }

  /* Life Cycle Methods */

  componentDidMount() {
    // console.log(this.props);
    if (this.props.title === "RECEIVE") {
      this.setState({ loader: true });
      // console.log(this.props.coin_code)
      fetch(`${API_URL}/wallet/get-qr-code/${this.props.coin_code}`, {
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
            receive: responseData.receiveCoin,
            loader: false,
            show: true
          });
        })
        .catch(error => {
          // console.log(error)
        });
    }
    if (this.props.fiatValue) {
      this.setState({
        fiatValue: 0,
        singlefiatValue: this.props.fiatValue.toFixed(8)
      });
    }
  }

  /* 
        Page: /wallet
        This method is called when we have to copy address to clipboard.
    */

  SearchText() {
    // Copy to clipboard example
    document.querySelectorAll(
      ".ant-input-search-button"
    )[0].onclick = function() {
      // Select the content
      if (document.querySelectorAll(".receive_add > input")[0]) {
        document.querySelectorAll(".receive_add > input")[0].select();
        // Copy to the clipboard
        document.execCommand("copy");
      }
    };
    this.openNotificationWithIcon(
      "success",
      "Copied",
      "Address Copied to Clipboard"
    );
  }

  /* 
        Page: /wallet
        This method is called when we have to open the modal.
    */

  handleComing = e => {
    this.setState({
      comingSoon: false
    });
  };

  /* 
        Page: /wallet
        This method is called when we have to close the modal.
    */

  comingCancel = e => {
    this.setState({
      comingSoon: false
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
      duration: 6
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
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(responseData => {
          // console.log("SEND API", responseData)
          if (responseData.status === 200) {
            this.openNotificationWithIcon(
              "success",
              "Successfully Sent",
              responseData.message
            );
            // setTimeout(
            //   function() {
            //     this.props.walletDetailsApi();
            //   }.bind(this),
            //   10000
            // );
            this.props.walletDetailsApi();
            this.comingCancel();
          } else if (responseData.status === 201) {
            this.setState({
              showTFAModal: false,
              withdrawFlag: true,
              withdrawMsg: responseData.message
            });
          } else if (responseData.status === 202) {
            // alert("here");
            this.setState({
              showTFAModal: true
            });
          } else {
            if (responseData.status !== 402)
              this.setState({
                showTFAModal: false
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
                "Warning",
                responseData.message ? `${responseData.message}${local}` : ""
              );
              this.comingCancel();
            } else
              this.openNotificationWithIcon(
                "warning",
                "Warning",
                responseData.message ? responseData.message : responseData.err
              );
          }
          this.setState({ loader: false });
        })
        .catch(error => {});
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
        this.timeout = setTimeout(this.getFeeValues, 1500);
      } else {
        this.validator.showMessages();
        this.setState({
          disabled: true
        });
      }
    });
  }
  getFeeValues() {
    // console.log("test");
    this.setState({
      loader: true
    });
    var fields = this.state.sendFields;
    var values = {
      coin: this.props.coin_code,
      amount: parseFloat(this.state.sendFields.amount),
      address: this.state.sendFields.destination_address
    };
    fetch(`${API_URL}/wallet/get-network-fee`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          // console.log(responseData);
          let subtotal = parseFloat(
            parseFloat(this.state.sendFields.subtotal) +
              parseFloat(responseData.data)
          ).toFixed(8);
          fields["subtotal"] = subtotal;
          this.setState({
            networkFee: responseData.data,
            disabled: false,
            sendFields: fields
          });
        } else if (responseData.status === 500) {
          this.openNotificationWithIcon("error", "Error", responseData.err);
        } else {
          this.openNotificationWithIcon("error", "Error", responseData.message);
        }
        this.setState({
          loader: false
        });
      })
      .catch(error => {});
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
        networkFee: 0
      });
    } else {
      let subtotal = parseFloat(
        parseFloat(fields[name]) +
          parseFloat(fields[name]) * (this.props.coinFee / 100)
      ).toFixed(8);
      let fiatValueamount = parseFloat(
        parseFloat(this.state.singlefiatValue) * parseFloat(subtotal)
      ).toFixed(2);
      let faldaxFee = parseFloat(
        e.target.value * (this.props.coinFee / 100)
      ).toFixed(8);
      fields["subtotal"] = subtotal;
      this.setState(
        {
          sendFields: fields,
          fiatValue: fiatValueamount,
          showTFAModal: false,
          faldaxFee
        },
        () => {
          if (
            this.state.sendFields.destination_address &&
            this.validator.allValid()
          ) {
            this.timeout = setTimeout(this.getFeeValues, 1500);
          } else {
            this.validator.showMessages();
            this.setState({
              disabled: true
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
      "Success",
      "Your transaction has been cancelled."
    );
    _this.comingCancel();
  }

  render() {
    let amount = Number(this.state.sendFields.amount);
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
                  {this.props.title} {this.props.coin_code}
                </Title>
              </TitleDiv>
            }
            visible={this.props.visible}
            onOk={e => this.handleComing()}
            onCancel={e => this.comingCancel(e)}
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
                        onCopy={() =>
                          this.setState({ copied: true }, () =>
                            this.comingCancel()
                          )
                        }
                      >
                        <AddressDiv>
                          <RefInput
                            value={this.state.receive.receive_address}
                            className={this.state.receiveAdd}
                            placeholder="Referral"
                            enterButton="Copy"
                            size="large"
                            onSearch={value => this.SearchText()}
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
                    Confirm
                  </Button>
                  <Button
                    onClick={this.cancelFunc}
                    className="cancel"
                    size="large"
                    type="primary"
                  >
                    Cancel
                  </Button>
                </ConfirmDiv>
              </ModalWrap>
            ) : (
              <ModalWrap>
                <Rediv>
                  <Label>Destination Address</Label>
                  <WallInput
                    value={this.state.sendFields.destination_address}
                    name="destination_address"
                    onChange={this.sendAddressChange}
                    placeholder="Enter destination address"
                  />
                  {/* <Scan>Scan QR</Scan> */}
                  {this.validator.message(
                    "destination_address",
                    this.state.sendFields.destination_address,
                    "required|min:15|max:120|allowSpecial",
                    "text-danger-validation"
                  )}
                </Rediv>
                <Rediv>
                  <Label>Amount</Label>
                  {/* <Sec_wrap> */}
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
                    "required|numeric|gtzero|decimalrestrict|minLimitCheck|maxLimitCheck",
                    "text-danger-validation"
                  )}
                  {/*  <RightInput />
                                    <ButtonToolbarS>
                                        <DropdownButtonS title="USD" id="dropdown-size-medium">
                                            <MenuItem eventKey="1">Action</MenuItem>
                                            <MenuItem eventKey="2">Another action</MenuItem>
                                            <MenuItem eventKey="3">Something else here</MenuItem>
                                            <MenuItem eventKey="4">Separated link</MenuItem>
                                        </DropdownButtonS>
                                    </ButtonToolbarS> */}
                  {/* </Sec_wrap> */}
                  {/* {console.log("^^^", this.state.faldaxFee)} */}
                  <TotDiv>
                    <Fee>
                      <span>
                        <span>
                          <b>FALDAX Fee {`(${this.props.coinFee}%)`}: </b>
                          {/* {this.props.coinFee ? `${this.props.coinFee} %` : 0} */}
                          {this.props.coinFee
                            ? `${this.state.faldaxFee}${" "}${
                                this.props.coin_code
                              }`
                            : 0}
                        </span>
                      </span>
                      <span>
                        <span>
                          <b>Network Fee*:</b>
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
                          <b>Total Payout: </b>
                          {`${this.state.sendFields.subtotal}
                          ${this.props.coin_code}`}
                        </span>
                      </span>
                    </Fee>
                    <TotPay>
                      {/* <b>Total Payout:</b> {subtotal.toFixed(8)}{" "} */}
                      {/* <span>
                        <b>Total Payout: </b> {this.state.sendFields.subtotal}{" "}
                        {this.props.coin_code}
                      </span> */}
                      <span>
                        <b>Fiat Value: </b>$ {this.state.fiatValue}
                      </span>
                    </TotPay>
                  </TotDiv>
                </Rediv>
                <SendWrap>
                  <SendButton
                    disabled={this.state.disabled}
                    onClick={this.sendSubmit}
                  >{`SEND ${this.props.coin_code}`}</SendButton>
                </SendWrap>
              </ModalWrap>
            )}
            {this.props.title === "SEND" && (
              <span>
                Note*: Network Fee amount could change during actual transaction
                depending on the market conditions.
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
          submit={otp => this.sendSubmit(false, otp)}
        />
        {this.state.loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

export default WalletPopup;
