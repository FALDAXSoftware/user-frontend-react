/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col, /* Input, */ Select, notification, Tabs } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import PanicEnabled from "SHARED-COMPONENTS/PanicEnabled";
import { walletBal, getAllCoins } from "ACTIONS/LOGGEDCAT/walletActions";
import { translate } from "react-i18next";
// import { Tabs } from 'antd';

/* import { DropdownButton, ButtonToolbar } from 'react-bootstrap'; */

/* Styled-Components */
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap,
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import {
  RightHead,
  WallTotal,
  Tot,
  Money,
  Currency,
  FIATAmt,
  AMT,
  PendingWrap,
  PendingPara,
  WalletCreateButton,
  HeaderWrap,
  MYWallet,
  WalletCoin,
  CoinTable,
  DetailWrap,
  Address,
  RowWrap,
  LeftBit,
  CryptImg,
  CryptAmt,
  RightBit,
  BTC,
  BTCAmt,
  DepButton,
  WithButton,
  TransTable,
  TransTitle,
  LeftHead,
  PlacedDiv,
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

/* Components */
import LoggedNavigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import WalletPopup from "./walletpopup";
import DetailsTable from "./detailstable";

import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import WithdrawTable from "./withdrawtable";
import { LogoutUser } from "../../../ACTIONS/authActions";

const { TabPane } = Tabs;

function callback(key) {
  // console.log(key);
}
let { API_URL, _AMAZONBUCKET, WordpressSiteURL } = globalVariables;
const Option = Select.Option;

const ContainerContact = styled(Container)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  min-height: 70vh;
`;
const ContainerContact2 = styled(ContainerContact)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
`;
const CoinImage = styled.img`
  width: 60px;
  height: 60px;
  @media (max-width: 475px) {
    width: 30px;
    height: 30px;
  }
`;

export const AddressDisplay = styled.b`
  color: rgb(0, 0, 0) !important;
`;

class WalletDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withdraw: false,
      send: false,
      walletDetails: [],
      total: null,
      loader: false,
      coin_code: "",
      min_limit: "",
      max_limit: "",
      walletUserData: [],
      currencyConv: {},
      defaultCoin: "",
      balanceFlag: false,
      coinFee: [],
      fiatValue: "",
      fiatCurrency: "",
      isERC: false,
      panic_status: false,
      panicEnabled: false,
      withdrawRequests: [],
      is_active_asset: "",
      eth_for_erc_address: "",
      eth_for_erc_status: "",
    };
    this.changeCoins = this.changeCoins.bind(this);
    this._walletCreate = this._walletCreate.bind(this);
    this.walletDetailsApi = this.walletDetailsApi.bind(this);
    this.panicStatus = this.panicStatus.bind(this);
    this.t = this.props.t;
  }

  /* Life Cycle Methods */
  componentWillMount() {
    if (
      !this.props.profileDetails.is_user_updated &&
      (this.props.profileDetails.is_kyc_done !== 2 ||
        this.props.profileDetails.is_allowed !== true)
    ) {
      this.props.history.push("/");
    }
  }
  async componentDidMount() {
    if (
      this.props.profileDetails &&
      this.props.profileDetails.is_terms_agreed == false
    ) {
      this.props.history.push("/editProfile");
    }
    var self = this;
    var total = 0;
    this.setState({ loader: true });
    await this.panicStatus();
    if (this.props.walletDetails !== null) {
      var tableData = this.props.walletDetails.coins;
      if (tableData !== undefined) {
        Object.keys(tableData).map(function (index, key) {
          if (tableData[index].USD !== undefined)
            total =
              total +
              parseFloat(tableData[index].USD) * tableData[index].balance;
          return 0;
        });
        this.setState({ total });
      }
    }
    if (this.props.location !== undefined) {
      if (this.props.location.search.includes("coinID1")) {
        this.setState({ balanceFlag: true });
      } else {
        this.setState({ balanceFlag: false });
      }
    }
    if (this.props.location !== undefined) {
      console.log("Here", this.props.profileDetails);
      if (
        this.props.location.search.includes("coinID") &&
        this.props.profileDetails.is_tier_enabled &&
        this.props.profileDetails.legal_allowed
      ) {
        await this.walletDetailsApi();
      } else if (
        this.props.location.search.includes("coinID") &&
        this.props.profileDetails.is_kyc_done == 2 &&
        this.props.profileDetails.is_allowed == true
      ) {
        await this.walletDetailsApi();
      } else {
        this.props.history.push("/");
      }
    }
    this.setState({ loader: false });
  }

  /*
        Page:/wallet-details
        All wallet user details.
    */
  async walletDetailsApi() {
    var self = this;
    var coin_name = this.props.location.search.split("=");
    this.setState({ loader: true });
    let responseData = await (
      await fetch(API_URL + "/wallet-details", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
        body: JSON.stringify({
          coinReceive: coin_name[1],
        }),
      })
    ).json();
    if (responseData.status == 200) {
      let transDetails = null;
      let walletUserDetails = null;
      let withdrawDetails = null;
      if (Object.keys(responseData.walletTransData).length > 0) {
        transDetails = responseData.walletTransData;
      }

      if (Object.keys(responseData.walletUserData).length > 0) {
        walletUserDetails = responseData.walletUserData;
      }

      if (responseData.withdrawRequestData) {
        if (Object.keys(responseData.withdrawRequestData).length > 0) {
          withdrawDetails = responseData.withdrawRequestData;
        }
      }
      this.props.walletBal(this.props.isLoggedIn);
      this.props.getAllCoins(this.props.isLoggedIn);
      let fiat = 0,
        currency;
      if (this.props.profileDetails && responseData.currencyConversionData) {
        switch (this.props.profileDetails.fiat) {
          case "USD":
            fiat = responseData.currencyConversionData.quote.USD.price;
            currency = "$";
            break;
          case "EUR":
            fiat = responseData.currencyConversionData.quote.EUR
              ? responseData.currencyConversionData.quote.EUR.price
              : 0;
            currency = "€";
            break;
          case "INR":
            fiat = responseData.currencyConversionData.quote.INR
              ? responseData.currencyConversionData.quote.INR.price
              : 0;
            currency = "₹";
            break;
          default:
            fiat = "";
            currency = "";
            break;
        }
      }
      self.setState({
        walletUserData: walletUserDetails,
        currencyConv: responseData.currencyConversionData,
        defaultCoin: walletUserDetails.coin_code,
        min_limit: walletUserDetails.min_limit,
        max_limit: walletUserDetails.max_limit,
        walletDetails: transDetails,
        withdrawRequests: withdrawDetails,
        coin_code: coin_name[1],
        isERC: walletUserDetails.iserc,
        coinFee: responseData.default_send_Coin_fee,
        is_active_asset: responseData.is_active,
        eth_for_erc_status: responseData.eth_for_erc_status,
        eth_for_erc_address: responseData.eth_for_erc_address,
        fiatValue: fiat,
        fiatCurrency: currency,
      });
    } else if (responseData.status == 401) {
      this.props.history.push("/");
    } else if (responseData.status == 403) {
      this.openNotificationWithIcon("error", "Error", responseData.err);
      let tempValue2 = {};
      tempValue2["user_id"] = this.props.profileDetails.id;
      tempValue2["jwt_token"] = this.props.isLoggedIn;
      this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
    } else {
      this.openNotificationWithIcon(
        "error",
        responseData.status,
        responseData.err
      );
    }
    this.setState({ loader: false });
  }

  /* 
        Page: /wallet
        This method is called for custom notifications .
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5,
    });
  }
  /* 
        Page: /wallet
        This method is called when we close the modal.
    */

  comingCancel = (e) => {
    /* console.log(e); */
    this.setState({
      withdraw: false,
      send: false,
      panicEnabled: false,
    });
  };

  async panicStatus() {
    this.setState({
      loader: true,
    });
    let responseData = await (
      await fetch(API_URL + `/check-panic-status`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
      })
    ).json();
    if (responseData.status === 200) {
      this.setState({
        panic_status: JSON.parse(responseData.data),
      });
    } else {
      this.setState({
        panic_status: false,
      });
    }
  }

  /* 
        Page: /wallet
        This method is called when we open the modal.
    */

  showModal = (e) => {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else {
      if (e.target.name === "SEND") this.setState({ send: true });
      else this.setState({ withdraw: true });
    }
  };

  translateCurrency(currency) {
    switch (currency) {
      case "INR":
        return this.t("edit_profile_titles:currency_inr.message");
      case "EUR":
        return this.t("edit_profile_titles:currency_eur.message");
      case "USD":
        return this.t("settings:currency_usd.message");
      default:
        return this.t("settings:currency_usd.message");
    }
  }

  /* 
        Page: /wallet
        This method is called when we choose other coins for details page.
    */

  changeCoins(value) {
    this.setState({ defaultCoin: value }, () => {
      this.props.history.push(
        `/walletDetails?coinID${this.state.balanceFlag ? 1 : 0}=${value}`
      );
    });
  }
  _walletCreate() {
    let code = this.state.walletUserData.coin;
    // console.log(code)
    this.setState({ loader: true });
    fetch(API_URL + `/users/create-wallet/${code}`, {
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
        if (responseData.status == 200) {
          this.props.history.push({
            pathname: "/wallet",
            state: {
              flag: true,
            },
          });
          this.openNotificationWithIcon(
            "success",
            this.t("validations:success_text.message"),
            responseData.message
          );
        } else {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.message
          );
        }
        this.setState({ loader: false });
      })
      .catch((error) => {
        // console.log(error);
        this.openNotificationWithIcon(
          "error",
          this.t("validations:error_text.message"),
          "Something went wrong!!"
        );
        this.setState({ loader: false });
      });
  }
  render() {
    /* var self = this; */
    const {
      walletUserData,
      defaultCoin,
      is_active_asset,
      eth_for_erc_address,
      eth_for_erc_status,
      currencyConv /*,  walletDetails */,
    } = this.state;
    let FIAT = this.props.profileDetails.fiat;
    return (
      <ContactWrap>
        <LoggedNavigation />
        <GreyWrap>
          {Object.keys(walletUserData).length > 0 ? (
            walletUserData.flag == 0 ? (
              <ContainerContact2>
                <HeaderWrap>
                  <Row className="headerDisplay">
                    <Col xxl={12} xl={12} lg={12} sm={24}>
                      <LeftHead>
                        <MYWallet>
                          <span>
                            {Object.keys(walletUserData).length > 0
                              ? walletUserData.coin_name
                              : "COIN"}
                          </span>
                        </MYWallet>
                        {this.state.balanceFlag === false && is_active_asset ? (
                          <WalletCoin>
                            {this.props.walletDetails &&
                            this.props.walletDetails.activated_asset_lists !==
                              null &&
                            this.props.walletDetails.activated_asset_lists !==
                              undefined ? (
                              <Select
                                onChange={this.changeCoins}
                                value={defaultCoin}
                              >
                                {this.props.walletDetails.activated_asset_lists.map(
                                  function (temp) {
                                    return (
                                      <Option value={temp.coin_code}>
                                        {temp.coin}
                                      </Option>
                                    );
                                  }
                                )}
                              </Select>
                            ) : (
                              ""
                            )}
                          </WalletCoin>
                        ) : (
                          ""
                        )}
                        {this.state.balanceFlag === false &&
                        !is_active_asset ? (
                          <WalletCoin>
                            {this.props.walletDetails &&
                            this.props.walletDetails.deactivated_asset_lists !==
                              null &&
                            this.props.walletDetails.deactivated_asset_lists !==
                              undefined ? (
                              <Select
                                onChange={this.changeCoins}
                                value={defaultCoin}
                              >
                                {this.props.walletDetails.deactivated_asset_lists.map(
                                  function (temp) {
                                    return (
                                      <Option value={temp.coin_code}>
                                        {temp.coin}
                                      </Option>
                                    );
                                  }
                                )}
                              </Select>
                            ) : (
                              ""
                            )}
                          </WalletCoin>
                        ) : (
                          ""
                        )}
                      </LeftHead>
                    </Col>
                  </Row>
                </HeaderWrap>
                <DetailWrap>
                  <Address>
                    {Object.keys(walletUserData).length > 0
                      ? walletUserData.coin_name.toUpperCase()
                      : "COIN"}{" "}
                    {this.t("address.message")} :{" "}
                    <AddressDisplay>
                      {Object.keys(walletUserData).length > 0
                        ? walletUserData.receive_address
                        : ""}
                    </AddressDisplay>
                  </Address>
                  <hr />
                  <RowWrap>
                    <Row>
                      <Col xxl={16} xl={12} lg={24} md={24}>
                        <LeftBit>
                          <CryptImg>
                            <CoinImage
                              src={
                                Object.keys(walletUserData).length > 0 &&
                                walletUserData.coin_icon !== null &&
                                walletUserData.coin_icon !== undefined
                                  ? _AMAZONBUCKET + walletUserData.coin_icon
                                  : _AMAZONBUCKET + "coin/defualt_coin.png"
                              }
                            />
                          </CryptImg>
                          <CryptAmt>
                            <BTCAmt>
                              {/* {console.log(walletUserData)} */}
                              {Object.keys(walletUserData).length > 0 ? (
                                <NumberFormat
                                  value={precision(
                                    parseFloat(walletUserData.balance)
                                  )}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              ) : (
                                ""
                              )}{" "}
                              <BTC>
                                {Object.keys(walletUserData).length > 0
                                  ? walletUserData.coin_code
                                  : ""}
                              </BTC>
                            </BTCAmt>
                            {walletUserData.length > 0 ? (
                              <FIATAmt>
                                {FIAT !== "USD"
                                  ? FIAT !== "EUR"
                                    ? FIAT !== "INR"
                                      ? ""
                                      : "\u20B9"
                                    : "\u20AC"
                                  : "$"}{" "}
                                {precision(
                                  currencyConv.quote["USD"].price *
                                    walletUserData.balance
                                )}
                                <AMT>{this.translateCurrency(FIAT)}</AMT>
                              </FIATAmt>
                            ) : (
                              ""
                            )}
                          </CryptAmt>
                        </LeftBit>
                        <PlacedDiv>
                          {this.t("wallet:in_order_text.message")}:{" "}
                          {walletUserData.balance >
                          walletUserData.placed_balance
                            ? precision(
                                walletUserData.balance -
                                  walletUserData.placed_balance
                              )
                            : precision(
                                walletUserData.placed_balance -
                                  walletUserData.balance
                              )}
                        </PlacedDiv>
                      </Col>
                      <Col xxl={8} xl={12} lg={24} md={24}>
                        {this.state.is_active_asset && (
                          <RightBit>
                            <DepButton name="SEND" onClick={this.showModal}>
                              {this.t("wallet:send_btn.message")}
                            </DepButton>
                            <WithButton name="RECEIVE" onClick={this.showModal}>
                              {this.t("wallet:recieve_btn.message")}
                            </WithButton>
                          </RightBit>
                        )}
                        {/* <RightBit>
                          <DepButton name="SEND" onClick={this.showModal}>
                            SEND
                          </DepButton>
                          <WithButton name="RECEIVE" onClick={this.showModal}>
                            RECEIVE
                          </WithButton>
                        </RightBit> */}
                      </Col>
                    </Row>
                  </RowWrap>
                </DetailWrap>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab={this.t("general_2:Date.message")} key="1">
                    <TransTable>
                      {/* <TransTitle>Transaction History</TransTitle> */}
                      <CoinTable>
                        <DetailsTable
                          wallet={this.state.walletDetails}
                          coin_code={this.state.coin_code}
                          isERC={this.state.isERC}
                        />
                      </CoinTable>
                    </TransTable>
                  </TabPane>
                  <TabPane
                    tab={this.t("wallet:withdrawal_requests_text.message")}
                    key="2"
                  >
                    <TransTable>
                      {/* <TransTitle>Transaction History</TransTitle> */}
                      <CoinTable>
                        <WithdrawTable wallet={this.state.withdrawRequests} />
                      </CoinTable>
                    </TransTable>
                  </TabPane>
                </Tabs>
                {/* <TransTable>
                  <TransTitle>Transaction History</TransTitle>
                  <CoinTable>
                    <DetailsTable wallet={this.state.walletDetails} />
                  </CoinTable>
                </TransTable> */}
                {this.state.withdraw === true ? (
                  <WalletPopup
                    coinFee={this.state.coinFee}
                    coin_code={this.state.coin_code}
                    coin_min_limit={this.state.min_limit}
                    coin_max_limit={this.state.max_limit}
                    isLoggedIn={this.props.isLoggedIn}
                    title="RECEIVE"
                    comingCancel={(e) => this.comingCancel(e)}
                    visible={this.state.withdraw}
                  />
                ) : (
                  ""
                )}
                {this.state.send === true ? (
                  <WalletPopup
                    walletDetailsApi={() => this.walletDetailsApi()}
                    coinFee={this.state.coinFee}
                    fiatValue={this.state.fiatValue}
                    fiatCurrency={this.state.fiatCurrency}
                    coin_code={this.state.coin_code}
                    coin_min_limit={this.state.min_limit}
                    coin_max_limit={this.state.max_limit}
                    isLoggedIn={this.props.isLoggedIn}
                    title="SEND"
                    comingCancel={(e) => this.comingCancel(e)}
                    visible={this.state.send}
                  />
                ) : (
                  ""
                )}
              </ContainerContact2>
            ) : walletUserData.flag == 1 ? (
              <ContainerContact2>
                <PendingWrap>
                  {/* {console.log(walletUserData)} */}

                  {Object.keys(walletUserData).length > 0 ? (
                    <div className="wallet_under_process">
                      <img
                        src={`${_AMAZONBUCKET}${walletUserData.coin_icon}`}
                      />
                      <BTC>{walletUserData.coin_name} </BTC>
                    </div>
                  ) : (
                    ""
                  )}

                  <PendingPara>
                    {/* <p>
                      Please wait for some time.As soon as your wallet is
                      created , we'll let you know.
                    </p>
                    <p>
                      If you still have any issue , please feel free to contact
                      us <a href={`${WordpressSiteURL}/contact-us/`}>here</a>.
                    </p> */}
                    <p>
                      {this.t("wallet:wallet_generation_in_process.message")}
                      <a
                        href={`${WordpressSiteURL}${
                          localStorage["i18nextLng"] &&
                          localStorage["i18nextLng"] !== "en"
                            ? "/" + localStorage["i18nextLng"]
                            : ""
                        }/contact-us/`}
                      >
                        {this.t("wallet:here_text.message")}
                      </a>
                      .
                    </p>
                    <p>{this.t("wallet:thanks_note_text.message")}</p>
                  </PendingPara>
                </PendingWrap>
              </ContainerContact2>
            ) : walletUserData.flag == 2 ? (
              <ContainerContact2>
                <PendingWrap>
                  {/* {console.log(walletUserData)} */}
                  <BTC>
                    {Object.keys(walletUserData).length > 0
                      ? walletUserData.coin_name
                      : ""}
                  </BTC>
                  {walletUserData.iserc && !eth_for_erc_address && (
                    <PendingPara>
                      <p>
                        {this.t("wallet_details_eth_not_created.message")}{" "}
                        {walletUserData.coin_name}.
                        {/* </p>
                      <WalletCreateButton onClick={this._walletCreate}>
                        Create {walletUserData.coin_name} Wallet
                    </WalletCreateButton>
                      <p> */}
                        {this.t("wallet_details_contact_us.message")}{" "}
                        <a
                          href={`${WordpressSiteURL}${
                            localStorage["i18nextLng"] &&
                            localStorage["i18nextLng"] !== "en"
                              ? "/" + localStorage["i18nextLng"]
                              : ""
                          }/contact-us/`}
                        >
                          {this.t("wallet:here_text.message")}
                        </a>
                        .
                      </p>
                    </PendingPara>
                  )}
                  {eth_for_erc_address && eth_for_erc_status && (
                    <PendingPara>
                      <p>
                        {this.t("wallet_details_create.message")}{" "}
                        {walletUserData.coin_name}.
                      </p>
                      <WalletCreateButton onClick={this._walletCreate}>
                        {this.t("general_2:wallet_details_create_text.message")}{" "}
                        {walletUserData.coin_name}{" "}
                        {this.t("header:navbar_menu_wallet.message")}
                      </WalletCreateButton>
                      <p>
                        {this.t("wallet_details_contact_us.message")}{" "}
                        <a
                          href={`${WordpressSiteURL}${
                            localStorage["i18nextLng"] &&
                            localStorage["i18nextLng"] !== "en"
                              ? "/" + localStorage["i18nextLng"]
                              : ""
                          }/contact-us/`}
                        >
                          {this.t("wallet:here_text.message")}
                        </a>
                        .
                      </p>
                    </PendingPara>
                  )}
                  {!eth_for_erc_status &&
                    !eth_for_erc_address &&
                    walletUserData.iserc && <Redirect to="/wallet"></Redirect>}
                  {!walletUserData.iserc && (
                    <PendingPara>
                      <p>
                        {this.t("wallet_details_not_created.message")}{" "}
                        {walletUserData.coin_name}.
                      </p>
                      <WalletCreateButton onClick={this._walletCreate}>
                        {this.t("general_2:wallet_details_create_text.message")}{" "}
                        {walletUserData.coin_name}{" "}
                        {this.t("header:navbar_menu_wallet.message")}
                      </WalletCreateButton>
                      <p>
                        {this.t("wallet_details_contact_us.message")}{" "}
                        <a
                          href={`${WordpressSiteURL}${
                            localStorage["i18nextLng"] &&
                            localStorage["i18nextLng"] !== "en"
                              ? "/" + localStorage["i18nextLng"]
                              : ""
                          }/contact-us/`}
                        >
                          {this.t("wallet:here_text.message")}
                        </a>
                        .
                      </p>
                    </PendingPara>
                  )}
                </PendingWrap>
              </ContainerContact2>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </GreyWrap>
        <PanicEnabled
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.panicEnabled}
        />
        <CommonFooter />
        {this.props.loader || this.state.loader ? <FaldaxLoader /> : ""}
      </ContactWrap>
    );
  }
}

function mapStateToProps(state) {
  return {
    walletDetails:
      state.walletReducer.walletData !== undefined
        ? state.walletReducer.walletData.balanceData
        : null,
    nowalletBalance:
      state.walletReducer.walletData !== undefined
        ? state.walletReducer.walletData.nonBalanceData
        : null,
    allCoins:
      state.walletReducer.allCoinsData !== undefined
        ? state.walletReducer.allCoinsData
        : null,
    isLoggedIn: state.simpleReducer.isLoggedIn,
    loader: state.simpleReducer.loader ? state.simpleReducer.loader : false,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
  };
}
const mapDispatchToProps = (dispatch) => ({
  walletBal: (isLoggedIn, currency) =>
    dispatch(walletBal(isLoggedIn, currency)),
  getAllCoins: (isLoggedIn, currency) =>
    dispatch(getAllCoins(isLoggedIn, currency)),
  LogoutUser: (isLoggedIn, user_id) =>
    dispatch(LogoutUser(isLoggedIn, user_id)),
});
export default translate(["general_2", "wallet", "header"])(
  connect(mapStateToProps, mapDispatchToProps)(WalletDetails)
);
function precision(x) {
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
  if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 8) {
    {
      x = parseFloat(x).toFixed(8);
      if (
        x.toString()[x.toString().length - 1] == "0" &&
        (x.toString().split(".")[1][0] != "0" ||
          x.toString().split(".")[1][5] != "0")
      ) {
        return parseFloat(x);
      } else if (x.toString().split(".")[1][7] == "0") {
        if (x.toString().split(".")[1][6] == "0") {
          if (x.toString().split(".")[1][5] == "0") {
            if (x.toString().split(".")[1][4] == "0") {
              if (x.toString().split(".")[1][3] == "0") {
                if (x.toString().split(".")[1][2] == "0") {
                  if (x.toString().split(".")[1][1] == "0") {
                    if (x.toString().split(".")[1][0] == "0") {
                      return parseFloat(x).toFixed(0);
                    } else return parseFloat(x).toFixed(1);
                  } else return parseFloat(x).toFixed(2);
                } else return parseFloat(x).toFixed(3);
              } else return parseFloat(x).toFixed(4);
            } else return parseFloat(x).toFixed(5);
          } else return parseFloat(x).toFixed(6);
        } else return parseFloat(x).toFixed(7);
      } else return parseFloat(x).toFixed(8);
    }
  }
  return x;
}
