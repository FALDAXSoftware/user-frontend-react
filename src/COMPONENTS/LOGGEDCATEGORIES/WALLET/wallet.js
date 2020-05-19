/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { translate } from "react-i18next";
/* components  */
import TableofCoinUpper from "./tableofcoinupper";
import LoggedNavigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap,
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import {
  HeaderWrap,
  SearchCoin,
  MYWallet,
  Total,
  Tot,
  Money,
  Currency,
  CoinTable,
  SearchCoin2,
  HeaderWrap2,
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";
/* import { globalVariables } from 'Globals.js'; */

/* Actions */
import { walletBal, getAllCoins } from "ACTIONS/LOGGEDCAT/walletActions";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
/* import TableofCoinLower from './tableofcoinlower'; */

/* let { API_URL } = globalVariables; */
const Search = Input.Search;

const ContainerContact = styled(Container)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  @media (max-width: 1160px) {
    padding-right: 0px;
    padding-left: 0px;
  }
  & .collapsible {
    // background-color: #777;
    // color: white;
    cursor: pointer;
    // padding: 18px;
    // width: 100%;
    // border: none;
    // text-align: left;
    // outline: none;
    // font-size: 15px;
  }

  & .active,
  & .collapsible:hover {
    // background-color: #555;
  }

  & .content {
    // padding: 0 18px;
    display: none;
    // overflow: hidden;
    // background-color: #f1f1f1;
  }
`;
const ContainerContact2 = styled(ContainerContact)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  margin-top: 50px;
  @media (max-width: 1160px) {
    padding-right: 0px;
    padding-left: 0px;
  }
`;
const Inputsearch = styled(Search)`
    width: 100%;
    height: 40px;
    >input
    {
        background-color:${(props) =>
          props.theme.mode === "dark" ? "#020e18" : ""};
        color:${(props) => (props.theme.mode === "dark" ? "white" : "")}
        caret-color:${(props) => (props.theme.mode === "dark" ? "white" : "")}
    }
    >span>i
    {
        color:${(props) => (props.theme.mode === "dark" ? "white" : "")};
    }
`;
const TableWrap = styled.div`
  margin-left: -30px;
  margin-right: -30px;
  @media (max-width: 1160px) {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mywallet: {},
      myCoins: {},
      total: null,
      searchedCoins: null,
      searchedERCTokens: null,
      searchedDeactivatedWallet: null,
      searchedWallet: null,
      currencySeq: ["USD", "EUR", "INR"],
    };
    this.t = this.props.t;
    this.searchChangeCoins = this.searchChangeCoins.bind(this);
    this.searchChangeWallet = this.searchChangeWallet.bind(this);
  }

  /* Life Cycle Methods */
  componentWillMount() {
    if (!this.props.profileDetails.is_user_updated) {
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    // var total = 0;
    // var tableData = this.props.walletDetails.activated_asset_lists;
    // var FIAT = this.props.profileDetails.fiat;
    // if (tableData !== undefined) {
    //   tableData.map(function(index, key) {
    //     // console.log(index.quote);
    //     if (index.quote !== null)
    //       if (
    //         index.quote[`${FIAT}`].price !== undefined &&
    //         index.quote[`${FIAT}`].price !== null
    //       ) {
    //         var fiat = this.props.profileDetails.fiat;

    //         total = total + index.quote[`${fiat}`].price * index.balance;
    //       }
    //   });
    //   console.log("Total^^^", total);
    //   this.setState({ total });
    // }
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
    if (
      this.props.profileDetails &&
      this.props.profileDetails.is_terms_agreed == false
    ) {
      this.props.history.push("/editProfile");
    }
    this.props.walletBal(this.props.isLoggedIn);
    this.props.getAllCoins(this.props.isLoggedIn);
    // var total = 0,
    //   me = this;
    // if (this.props.walletDetails !== null) {
    //   console.log("props", this.props.walletDetails);
    //   var tableData = this.props.walletDetails;
    //   var FIAT = this.props.profileDetails.fiat;
    //   if (tableData !== undefined) {
    //     tableData.map(function(index, key) {
    //       // console.log(index.quote);
    //       if (index.quote !== null)
    //         if (
    //           index.quote[`${FIAT}`].price !== undefined &&
    //           index.quote[`${FIAT}`].price !== null
    //         ) {
    //           var fiat = me.props.profileDetails.fiat;

    //           total = total + index.quote[`${fiat}`].price * index.balance;
    //           console.log(
    //             "fiat",
    //             fiat,
    //             index.quote[`${fiat}`].price,
    //             index.balance,
    //             total
    //           );
    //         }
    //     });
    //     // console.log(total)
    //   }
    // } else {
    //   console.log("mount", this.props);
    // }
    // this.setState({ total });
    // console.log("mount", this.props.walletDetails);
  }
  componentWillReceiveProps(newProps) {
    var total = 0;
    if (
      this.props.walletDetails != newProps.walletDetails &&
      newProps.walletDetails
    ) {
      if (
        newProps.walletDetails.activated_asset_lists !== null &&
        newProps.walletDetails.activated_asset_lists
      ) {
        // console.log("props", newProps.walletDetails);
        var tableData = newProps.walletDetails.activated_asset_lists;
        var FIAT = newProps.profileDetails.fiat;
        if (tableData !== undefined) {
          tableData.map(function (index, key) {
            // console.log(index.quote);
            if (index.quote !== null)
              if (
                index.quote[`${FIAT}`].price !== undefined &&
                index.quote[`${FIAT}`].price !== null
              ) {
                var fiat = newProps.profileDetails.fiat;

                total = total + index.quote[`${fiat}`].price * index.balance;
              }
          });
          // console.log(total)
        }
      }
      this.setState({ total });
    }
  }

  /* 
        Page: /wallet
        This method is called when u want to search from my wallet table.
    */

  searchChangeWallet(e, field) {
    var search = e.target.value;
    if (search !== "") {
      if (search.trim() !== "" && field == "active_wallet") {
        var searchedWallet = this.props.walletDetails.activated_asset_lists.filter(
          function (temp) {
            if (
              temp.coin.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_name.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_code.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          }
        );
        this.setState({ searchedWallet });
      } else if (search.trim() !== "" && field == "deactive_wallet") {
        var searchedDeactivatedWallet = this.props.walletDetails.deactivated_asset_lists.filter(
          function (temp) {
            if (
              temp.coin.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_name.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_code.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          }
        );
        this.setState({ searchedDeactivatedWallet });
      } else {
        this.setState({ searchedWallet: [], searchedDeactivatedWallet: [] });
      }
    } else {
      this.setState({ searchedWallet: null, searchedDeactivatedWallet: null });
    }
  }

  /* 
        Page: /wallet
        This method is called when u want to search from all coins table.
    */

  searchChangeCoins(e, field) {
    var search = e.target.value;
    if (search !== "") {
      if (search.trim() !== "" && field == "all_assets") {
        var searchedCoins = this.props.nowalletBalance.all_assets_lists.filter(
          function (temp) {
            if (
              temp.coin.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_name.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_code.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          }
        );
        this.setState({ searchedCoins });
      } else if (search.trim() !== "" && field == "all_erc_tokens") {
        var searchedERCTokens = this.props.nowalletBalance.all_erctoken_lists.filter(
          function (temp) {
            if (
              temp.coin.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_name.toLowerCase().includes(search.toLowerCase()) ||
              temp.coin_code.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          }
        );
        this.setState({ searchedERCTokens });
      } else {
        this.setState({ searchedCoins: [], searchedERCTokens: [] });
      }
    } else {
      this.setState({ searchedCoins: null, searchedERCTokens: null });
    }
  }
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

  render() {
    let { profileDetails } = this.props;
    let FIAT = this.props.profileDetails.fiat;
    return (
      <ContactWrap>
        <LoggedNavigation />
        <GreyWrap>
          {/* walletDetails > activated_asset_lists start */}
          {this.props.walletDetails &&
            this.props.walletDetails["activated_asset_lists"].length > 0 && (
              <ContainerContact>
                <HeaderWrap className="head_of_wallet">
                  <MYWallet>
                    <span>
                      {profileDetails !== ""
                        ? profileDetails.first_name + "'s"
                        : ""}{" "}
                      {this.t("header:navbar_menu_wallet.message")}
                    </span>
                  </MYWallet>
                  <SearchCoin>
                    <Inputsearch
                      placeholder={
                        this.t("search_text.message") +
                        " " +
                        this.t("coins_text_subhead.message")
                      }
                      onChange={(value) =>
                        this.searchChangeWallet(value, "active_wallet")
                      }
                      className=""
                    />
                  </SearchCoin>
                  <Total>
                    <Tot>{this.t("conversion:total_text.message")}:</Tot>
                    {/* {console.log(this.state.total)} */}
                    <Money>
                      {FIAT !== "USD"
                        ? FIAT !== "EUR"
                          ? FIAT !== "INR"
                            ? ""
                            : "\u20B9"
                          : "\u20AC"
                        : "$"}
                      {this.state.total !== null ? (
                        <NumberFormat
                          value={precisionTwo(this.state.total)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      ) : (
                        ""
                      )}
                    </Money>
                    <Currency>{this.translateCurrency(FIAT)}</Currency>
                  </Total>
                </HeaderWrap>
                <CoinTable className="">
                  <TableWrap>
                    {this.props.walletDetails.activated_asset_lists.length >
                      0 &&
                    this.props.walletDetails.activated_asset_lists !== null ? (
                      this.state.searchedWallet !== null ? (
                        <TableofCoinUpper
                          noBalance={false}
                          currencySeq={this.state.currencySeq}
                          tableData={this.state.searchedWallet}
                        />
                      ) : (
                        <TableofCoinUpper
                          type="wallet data"
                          noBalance={false}
                          currencySeq={this.state.currencySeq}
                          tableData={
                            this.props.walletDetails.activated_asset_lists
                          }
                        />
                      )
                    ) : (
                      ""
                    )}
                  </TableWrap>
                </CoinTable>
              </ContainerContact>
            )}

          {/* walletDetails > activated_asset_lists start */}
          {/* nowalletBalance > all_assets_lists start */}
          {this.props.nowalletBalance &&
            this.props.nowalletBalance["all_assets_lists"].length > 0 && (
              <ContainerContact2>
                <HeaderWrap2 className="head_of_wallet">
                  <MYWallet>
                    <span>
                      {this.t("general_2:wallet_available_coin.message")}
                    </span>
                  </MYWallet>
                  <SearchCoin2>
                    <Inputsearch
                      placeholder={this.t(
                        "general_2:wallet_search_tokens.message"
                      )}
                      onChange={(value) =>
                        this.searchChangeCoins(value, "all_assets")
                      }
                      className=""
                    />
                  </SearchCoin2>
                </HeaderWrap2>
                <CoinTable className="">
                  <TableWrap>
                    {this.props.nowalletBalance.all_assets_lists.length > 0 &&
                    this.props.nowalletBalance.all_assets_lists !== null ? (
                      this.state.searchedCoins !== null ? (
                        <TableofCoinUpper
                          currencySeq={this.state.currencySeq}
                          noBalance={true}
                          tableData={this.state.searchedCoins}
                        />
                      ) : (
                        <TableofCoinUpper
                          type="no wallet data"
                          currencySeq={this.state.currencySeq}
                          noBalance={true}
                          tableData={
                            this.props.nowalletBalance.all_assets_lists
                          }
                        />
                      )
                    ) : (
                      ""
                    )}
                  </TableWrap>
                </CoinTable>
              </ContainerContact2>
            )}

          {/* nowalletBalance > all_assets_lists end */}
          {/* nowalletBalance > all_erctoken_lists start */}
          {this.props.nowalletBalance &&
            this.props.nowalletBalance["all_erctoken_lists"].length > 0 && (
              <ContainerContact2>
                <HeaderWrap2 className="head_of_wallet">
                  <MYWallet>
                    <span>
                      {this.t("general_2:wallet_available_erc20_token.message")}
                      )
                    </span>
                  </MYWallet>
                  <SearchCoin2>
                    <Inputsearch
                      placeholder={this.t(
                        "general_2:wallet_search_tokens.message"
                      )}
                      onChange={(value) =>
                        this.searchChangeCoins(value, "all_erc_tokens")
                      }
                      className=""
                    />
                  </SearchCoin2>
                </HeaderWrap2>
                <CoinTable className="">
                  <TableWrap>
                    {this.props.nowalletBalance.all_erctoken_lists !== null ? (
                      this.state.searchedERCTokens !== null ? (
                        <TableofCoinUpper
                          currencySeq={this.state.currencySeq}
                          noBalance={true}
                          tableData={this.state.searchedERCTokens}
                        />
                      ) : (
                        <TableofCoinUpper
                          type="no wallet data"
                          currencySeq={this.state.currencySeq}
                          noBalance={true}
                          tableData={
                            this.props.nowalletBalance.all_erctoken_lists
                          }
                        />
                      )
                    ) : (
                      ""
                    )}
                  </TableWrap>
                </CoinTable>
              </ContainerContact2>
            )}
          {/* nowalletBalance > all_erctoken_lists end */}
          {/* walletDetails > deactivated_asset_lists start */}
          {this.props.walletDetails &&
            this.props.walletDetails["deactivated_asset_lists"].length > 0 && (
              <ContainerContact2>
                <HeaderWrap2 className="head_of_wallet">
                  <MYWallet>
                    <span>
                      {this.t("general_2:wallet_deactive_coin.message")}
                    </span>
                  </MYWallet>
                  <SearchCoin2>
                    <Inputsearch
                      placeholder={this.t(
                        "general_2:wallet_search_coin.message"
                      )}
                      onChange={(value) =>
                        this.searchChangeWallet(value, "deactive_wallet")
                      }
                      className=""
                    />
                  </SearchCoin2>
                </HeaderWrap2>
                <CoinTable className="">
                  <TableWrap>
                    {this.props.walletDetails.deactivated_asset_lists !==
                    null ? (
                      this.state.searchedDeactivatedWallet !== null ? (
                        <TableofCoinUpper
                          currencySeq={this.state.currencySeq}
                          noBalance={false}
                          tableData={this.state.searchedDeactivatedWallet}
                        />
                      ) : (
                        <TableofCoinUpper
                          type="no wallet data"
                          currencySeq={this.state.currencySeq}
                          noBalance={false}
                          tableData={
                            this.props.walletDetails.deactivated_asset_lists
                          }
                        />
                      )
                    ) : (
                      ""
                    )}
                  </TableWrap>
                </CoinTable>
              </ContainerContact2>
            )}
          {/* walletDetails > deactivated_asset_lists end */}
        </GreyWrap>
        <CommonFooter />
        {this.props.loader === true ? <FaldaxLoader /> : ""}
      </ContactWrap>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state)
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
});
export default translate([
  "wallet",
  "header",
  "conversion",
  "general_2",
  "setting",
  "edit_profile_titles",
])(connect(mapStateToProps, mapDispatchToProps)(Wallet));
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
