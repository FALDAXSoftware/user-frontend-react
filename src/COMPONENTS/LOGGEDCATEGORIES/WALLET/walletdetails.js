/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col, /* Input, */ Select, notification } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import PanicEnabled from "SHARED-COMPONENTS/PanicEnabled";
/* import { DropdownButton, ButtonToolbar } from 'react-bootstrap'; */

/* Styled-Components */
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap
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
  PlacedDiv
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

/* Components */
import LoggedNavigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import WalletPopup from "./walletpopup";
import DetailsTable from "./detailstable";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";

let { API_URL, _AMAZONBUCKET, WordpressSiteURL } = globalVariables;
const Option = Select.Option;

const ContainerContact = styled(Container)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  min-height: 70vh;
`;
const ContainerContact2 = styled(ContainerContact)`
  background-color: ${props =>
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
      panic_status: false,
      panicEnabled: false
    };
    this.changeCoins = this.changeCoins.bind(this);
    this._walletCreate = this._walletCreate.bind(this);
    this.walletDetailsApi = this.walletDetailsApi.bind(this);
    this.panicStatus = this.panicStatus.bind(this);
  }

  /* Life Cycle Methods */
  componentDidMount() {
    if (
      this.props.profileDetails &&
      this.props.profileDetails.is_terms_agreed == false
    ) {
      this.props.history.push("/editProfile");
    }
    var self = this;
    var total = 0;
    this.panicStatus();
    if (this.props.walletDetails !== null) {
      var tableData = this.props.walletDetails.coins;
      if (tableData !== undefined) {
        // console.log(tableData);
        Object.keys(tableData).map(function(index, key) {
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
      if (this.props.location.search.includes("coinID")) {
        this.walletDetailsApi();
      }
    }
  }

  /*
        Page:/wallet-details
        All wallet user details.
    */
  walletDetailsApi() {
    var self = this;
    var coin_name = this.props.location.search.split("=");
    this.setState({ loader: true });
    fetch(API_URL + "/wallet-details", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({
        coinReceive: coin_name[1]
      })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          let transDetails = null;
          let walletUserDetails = null;
          // console.log(responseData)
          if (Object.keys(responseData.walletTransData).length > 0) {
            transDetails = responseData.walletTransData;
          }

          if (Object.keys(responseData.walletUserData).length > 0) {
            walletUserDetails = responseData.walletUserData;
          }
          // console.log("wallet details props walletDetails", walletUserDetails);

          self.setState(
            {
              walletUserData: walletUserDetails,
              currencyConv: responseData.currencyConversionData,
              defaultCoin: walletUserDetails.coin_code,
              min_limit: walletUserDetails.min_limit,
              max_limit: walletUserDetails.max_limit,
              walletDetails: transDetails,
              loader: false,
              coin_code: coin_name[1],
              coinFee: responseData.default_send_Coin_fee,
              fiatValue: responseData.currencyConversionData
                ? responseData.currencyConversionData.quote.USD.price
                : ""
            },
            () => {
              // console.log("wallet details props -----", self.state);
              // console.log(
              //   "responseData.currencyConversionData.quote.USD.price===========",
              //   this.state.coinFee
              // );
            }
          );
        } else {
          this.openNotificationWithIcon(
            "error",
            responseData.status,
            responseData.err
          );
        }
      })
      .catch(error => {
        // console.log("wallet details props -----error ", error);
        // this.openNotificationWithIcon(
        //   "error",
        //   "Error",
        //   "Something went wrong!"
        // );
        this.setState({ loader: false });
      });
  }

  /* 
        Page: /wallet
        This method is called for custom notifications .
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  }

  /* 
        Page: /wallet
        This method is called when we close the modal.
    */

  comingCancel = e => {
    /* console.log(e); */
    this.setState({
      withdraw: false,
      send: false,
      panicEnabled: false
    });
  };

  panicStatus() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/check-panic-status`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          // console.log("responsedata 200", responseData.data);
          this.setState({
            panic_status: JSON.parse(responseData.data),
            // panic_status: true,
            loader: false
          });
        } else {
          this.setState({
            panic_status: false,
            loader: false
          });
        }
      })
      .catch(error => {});
  }

  /* 
        Page: /wallet
        This method is called when we open the modal.
    */

  showModal = e => {
    if (this.state.panic_status === true) {
      // alert("Idf");
      this.setState({ panicEnabled: true });
    } else {
      if (e.target.name === "SEND") this.setState({ send: true });
      else this.setState({ withdraw: true });
    }
  };

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
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData)
        if (responseData.status == 200) {
          this.props.history.push("/wallet");
          this.openNotificationWithIcon(
            "success",
            "Success",
            responseData.message
          );
        } else {
          this.openNotificationWithIcon("error", "Error", responseData.message);
        }
        this.setState({ loader: false });
      })
      .catch(error => {
        // console.log(error);
        this.openNotificationWithIcon(
          "error",
          "Error",
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
      currencyConv /*,  walletDetails */
    } = this.state;
    let FIAT = this.props.profileDetails.fiat;
    return (
      <ContactWrap>
        <LoggedNavigation />
        <GreyWrap>
          {/* {console.log("wallet details props", this.props, walletUserData)} */}
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
                        {this.state.balanceFlag === false ? (
                          <WalletCoin>
                            {this.props.walletDetails !== null &&
                            this.props.walletDetails !== undefined ? (
                              <Select
                                onChange={this.changeCoins}
                                value={defaultCoin}
                                // style={{ width: "100%" }}
                                // className = "select-display"
                              >
                                {this.props.walletDetails.map(function(temp) {
                                  return (
                                    <Option value={temp.coin_code}>
                                      {temp.coin}
                                    </Option>
                                  );
                                })}
                              </Select>
                            ) : (
                              ""
                            )}
                          </WalletCoin>
                        ) : (
                          ""
                        )}
                        {this.state.balanceFlag === true ? (
                          <WalletCoin>
                            {this.props.nowalletBalance !== null &&
                            this.props.nowalletBalance !== undefined ? (
                              <Select
                                onChange={this.changeCoins}
                                value={defaultCoin}
                                // style={{ width: "100%" }}
                                // className="select-display"
                              >
                                {this.props.nowalletBalance.map(function(temp) {
                                  return (
                                    <Option value={temp.coin}>
                                      {temp.coin}
                                    </Option>
                                  );
                                })}
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
                    {/* <Col xxl={12} xl={12} lg={12} sm={24}>
                                    <RightHead>
                                        <WallTotal>
                                            <Tot>Total:</Tot>
                                            <Money>${this.state.total !== null ? this.state.total : ""}</Money>
                                            <Currency>USD</Currency>
                                        </WallTotal>

                                        <Select defaultValue="USD" style={{ width: 200, marginLeft: "auto" }}>
                                            <Option value="USD">USD</Option>
                                            <Option value="EUR">EUR</Option>
                                            <Option value="INR">INR</Option>
                                        </Select>

                                    </RightHead>
                                </Col> */}
                  </Row>
                </HeaderWrap>
                <DetailWrap>
                  <Address>
                    {Object.keys(walletUserData).length > 0
                      ? walletUserData.coin_name.toUpperCase()
                      : "COIN"}{" "}
                    Address :{" "}
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
                                  value={walletUserData.balance.toFixed(8)}
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
                                {parseFloat(
                                  currencyConv.quote["USD"].price *
                                    walletUserData.balance
                                ).toFixed(8)}
                                <AMT>{FIAT}</AMT>
                              </FIATAmt>
                            ) : (
                              ""
                            )}
                          </CryptAmt>
                        </LeftBit>
                        <PlacedDiv>
                          In Orders:{" "}
                          {walletUserData.balance >
                          walletUserData.placed_balance
                            ? (
                                walletUserData.balance -
                                walletUserData.placed_balance
                              ).toFixed(8)
                            : (
                                walletUserData.placed_balance -
                                walletUserData.balance
                              ).toFixed(8)}
                        </PlacedDiv>
                      </Col>
                      <Col xxl={8} xl={12} lg={24} md={24}>
                        <RightBit>
                          <DepButton name="SEND" onClick={this.showModal}>
                            SEND
                          </DepButton>
                          <WithButton name="RECEIVE" onClick={this.showModal}>
                            RECEIVE
                          </WithButton>
                        </RightBit>
                      </Col>
                    </Row>
                  </RowWrap>
                </DetailWrap>
                <TransTable>
                  <TransTitle>Transaction History</TransTitle>
                  <CoinTable>
                    <DetailsTable wallet={this.state.walletDetails} />
                  </CoinTable>
                </TransTable>
                {this.state.withdraw === true ? (
                  <WalletPopup
                    coinFee={this.state.coinFee}
                    coin_code={this.state.coin_code}
                    coin_min_limit={this.state.min_limit}
                    coin_max_limit={this.state.max_limit}
                    isLoggedIn={this.props.isLoggedIn}
                    title="RECEIVE"
                    comingCancel={e => this.comingCancel(e)}
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
                    coin_code={this.state.coin_code}
                    coin_min_limit={this.state.min_limit}
                    coin_max_limit={this.state.max_limit}
                    isLoggedIn={this.props.isLoggedIn}
                    title="SEND"
                    comingCancel={e => this.comingCancel(e)}
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
                      Your wallet is being generated and you will recieve a
                      notification when it is ready for use. If you do not
                      recieve a notification within 24 hours, or if you have any
                      other concerns, please feel free to contact us{" "}
                      <a href={`${WordpressSiteURL}/contact-us/`}>here</a>.
                    </p>
                    <p>Thank you for choosing FALDAX!</p>
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
                  {walletUserData.iserc && (
                    <PendingPara>
                      <p>
                        Your wallet is not created yet. Please create your
                        Ethereum wallet to use {walletUserData.coin_name}.
                        {/* </p>
                      <WalletCreateButton onClick={this._walletCreate}>
                        Create {walletUserData.coin_name} Wallet
                    </WalletCreateButton>
                      <p> */}
                        If you still have any issue , please feel free to
                        contact us{" "}
                        <a href={`${WordpressSiteURL}/contact-us/`}>here</a>.
                      </p>
                    </PendingPara>
                  )}
                  {!walletUserData.iserc && (
                    <PendingPara>
                      <p>
                        Your wallet is not created yet. Please click on the
                        button below to create your wallet for{" "}
                        {walletUserData.coin_name}.
                      </p>
                      <WalletCreateButton onClick={this._walletCreate}>
                        Create {walletUserData.coin_name} Wallet
                      </WalletCreateButton>
                      <p>
                        If you still have any issue , please feel free to
                        contact us{" "}
                        <a href={`${WordpressSiteURL}/contact-us/`}>here</a>.
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
          comingCancel={e => this.comingCancel(e)}
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
        : ""
  };
}

export default connect(mapStateToProps)(WalletDetails);
