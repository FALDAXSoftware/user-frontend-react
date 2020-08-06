/* IN-built */
import React, { Component } from "react";
import { Layout, Menu, Dropdown, Radio } from "antd";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import ReactSwipeEvents from "react-swipe-events";
import { translate, Trans } from "react-i18next";

/* Components */
import Afterlog from "./afterlog";
import { LogoutUser } from "ACTIONS/authActions";
import { globalVariables } from "Globals.js";
import ComingSoon from "COMPONENTS/comingsoon";
import CompleteKYC from "SHARED-COMPONENTS/CompleteKYC";
import CountryAccess from "SHARED-COMPONENTS/CountryAccess";
import PanicEnabled from "SHARED-COMPONENTS/PanicEnabled";
import { langAction } from "../../ACTIONS/authActions";
import CompleteProfile from "../../SHARED-COMPONENTS/completeProfile";
// import { DropMenu, SubMenuNav } from "./navigation";

/* CONSTANTS */
import {
  _FALDAXLOGO,
  _FALDAXWHITE,
  _WHITELOGO,
  _FALDAX,
  _WALLPAPER,
} from "CONSTANTS/images";
import FaldaxLoader from "../../SHARED-COMPONENTS/FaldaxLoader";
const { Header } = Layout;
const API_URL = globalVariables.API_URL;
const SubMenu = Menu.SubMenu;

/* Styled Components */
const DropMenu = styled(Menu)`
  background: none;
  color: white;
`;
const SubMenuNav = styled(SubMenu)`
  background: none;
  color: white;
  > .ant-menu-submenu-title {
    padding-left: 0px !important;
    font-size: 18px;
    line-height: 25px !important;
    height: 25px !important;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  & .ant-menu-item {
    padding-left: 30px !important;
  }
  & .ant-menu-item:after {
    border-right: none;
  }
  & .ant-menu-item > a {
    color: white;
  }
  & .ant-menu-item > a:hover {
    color: #1890ff !important;
  }
  & .ant-menu-item-selected {
    background-color: transparent !important;
    color: white;
    border-right: none;
  }
  & .ant-menu-item-selected > a {
    color: white !important;
    font-weight: normal !important;
  }
  > .ant-menu {
    background: none;
  }
  > .ant-menu-submenu-title > .ant-menu-submenu-arrow:before {
    color: white;
    background-image: linear-gradient(
      to right,
      rgb(255, 255, 255),
      rgba(255, 255, 255)
    );
  }
  > .ant-menu-submenu-title > .ant-menu-submenu-arrow:after {
    background-image: linear-gradient(
      to right,
      rgb(255, 255, 255),
      rgba(255, 255, 255)
    );
  }
`;
const FALDAX = styled.img`
  cursor: pointer;
  margin-left: 10px;
  @media (max-width: 450px) {
    max-width: 50%;
  }
`;
const Logo = styled.div`
  display: inline-flex;
  height: 100%;
  align-items: center;
  text-align: left;
  cursor: pointer;
`;
const Headermain = styled(Header)`
  position: fixed;
  z-index: 1000;
  width: 100%;
  padding: 0;
  text-align: left;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  box-shadow: ${(props) =>
    props.theme.mode === "dark" ? "" : "0px 3px #f7f7f7"};
  height: 80px;
  display: flex;
  align-items: center;
  & .color_important {
    color: ${(props) =>
      props.theme.mode === "dark" ? "#fff !important" : "black !important"};
    @media (min-width: 2000px) {
      font-size: 20px;
    }
  }
  & .color_important:hover {
    color: #1890ff !important;
  }
  & ul {
    > li.ant-menu-item-selected {
      // border: 1px solid #1890ff !important;
      border-radius: 38px;
      & .color_important {
        color: #1890ff !important;
      }
    }
  }
`;
const Menumain = styled(Menu)`
  display: inline-block;
  margin-left: 74px;
  text-align: right;
  border-bottom: 0px;
  vertical-align: middle;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  @media (max-width: 1200px) {
    display: none;
  }
  @media (max-width: 1365px) {
    margin-left: 15px;
  }
`;
const Menuitem = styled(Menu.Item)`
  padding: 0px 18px;
  font-size: 13px;
  font-family: "Open sans";
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  font-weight: bold;
  text-transform: uppercase;
  vertical-align: unset;
  float: left;
  border-bottom: 0px !important;
  font-weight: 600 !important;
  &:hover {
    color: #1890ff;
  }
  @media (max-width: 1365px) {
    padding: 0px 8px;
  }
`;
/* const NAV = styled.span`
    color:${props => props.theme.mode === "dark" ? "white" : ""};
` */
const FALDAXLOGO = styled.img`
  padding-left: 22px;
  @media (max-width: 450px) {
    max-width: 25%;
  }
`;
const SideNav = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 0px;
  background-image: url(${_WALLPAPER});
  width: 0px;
  color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  & span a {
    color: white;
  }
  span {
    padding: 8px 32px;
    text-decoration: none;
    font-size: 18px;
    display: block;
    transition: 0.5s;
    line-height: 1.5;
    color: white !important;
    cursor: pointer;
  }
  a.DROP {
    padding: 8px 32px;
    text-decoration: none;
    font-size: 18px;
    display: block;
    transition: 0.5s;
    line-height: 1.5;
    color: white !important;
    cursor: pointer;
    > ul {
      border-right: 0;
      > li {
        > ul {
          > li:first-child {
            margin-top: 15px;
          }
          > li {
            height: 24px !important;
            line-height: 1 !important;
            > a {
              height: 24px;
              line-height: 1;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
  a.DROPSUB {
    padding: 8px 32px;
    text-decoration: none;
    font-size: 18px;
    display: block;
    transition: 0.5s;
    line-height: 1.5;
    color: white !important;
    cursor: pointer;
    > ul {
      border-right: 0;
      > li {
        > ul {
          > li:first-child {
            margin-top: 15px;
          }
          > li {
            height: 24px !important;
            line-height: 1 !important;
            > a {
              height: 24px;
              line-height: 1;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
  @media (min-width: 1200px) {
    display: none;
  }
  @media (min-width: 576px) {
    & .DROP {
      display: none !important;
    }
  }
  @media (min-width: 1200px) {
    & .DROPSUB {
      display: none !important;
    }
  }
`;
const Close = styled.span`
  text-align: right;
`;
/* const Profile = styled.a`
    @media(min-width: 361px)
    {
        display: none !important;
    }
` */
const LogoutStyle = styled.span`
  @media (min-width: 361px) {
    display: none !important;
  }
`;
const RightCol = styled.div`
    height:100%
    display:inline-flex;
    align-items:center;
    margin-left:auto;
`;
const NavLink = styled(Link)`
  color: ${(props) =>
    props.theme.mode === "dark" ? "white" : "black"} !important;
  &:hover {
    color: #1890ff !important;
  }
  @media (min-width: 2000px) {
    font-size: 20px;
  }
`;
/* const LogNav = styled.span`
    color: ${props => props.theme.mode === "dark" ? "white" : "black"} !important;
    &:hover{
        color:#1890ff !important;
    }
` */
const CarLink = styled(Link)`
  color: white !important;
  text-decoration: none;
  font-size: 18px;
  display: block;
  transition: 0.5s;
  line-height: 1.5;
  color: white !important;
  cursor: pointer;
  @media (min-width: 671px) {
    display: none !important;
  }
`;
const DropDownDiv = styled(Dropdown)`
  &.language_head {
    @media (min-width: 2000px) {
      font-size: 20px;
    }
  }
  &.Drop-main {
    > a {
    }
  }
  @media (max-width: 480px) {
    margin-top: 10px;
  }
  @media (max-width: 360px) {
    display: none;
  }
  @media (max-width: 576px) {
    margin-right: 10px;
  }
`;
const Open = styled.span`
  display: none;
  margin-right: 10px;
  font-size: 30px;
  cursor: pointer;
  margin-top: 10px;
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  @media (max-width: 1200px) {
    display: inline-block;
    margin-right: 15px;
  }
  @media (max-width: 576px) {
    margin-top: 12px;
  }
`;

class LoggedNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modal: 0,
      comingSoon: false,
      faldaxLogo: "",
      faldax: "",
      selected: "",
      countryAccess: false,
      completeKYC: false,
      completeProfile: false,
      panicEnabled: false,
      panic_status: false,
      loader: false,
      walletIsAllowed: "",
      // langValue: this.props.language
    };
    // this.tradeAccess = this.tradeAccess.bind(this);
    this.t = this.props.t;
    this.cryptoAccess = this.cryptoAccess.bind(this);
    this.simplexAccess = this.simplexAccess.bind(this);
    this.walletAccess = this.walletAccess.bind(this);
    this.historyAccess = this.historyAccess.bind(this);
    this.tokenAccess = this.tokenAccess.bind(this);
    this.panicStatus = this.panicStatus.bind(this);
  }

  /* Life-Cycle Methods */
  async componentWillReceiveProps(props, newProps) {
    if (props.theme !== undefined) {
      if (props.theme !== this.state.theme) {
        if (props.theme === false)
          this.setState({ faldaxLogo: _FALDAXLOGO, faldax: _FALDAX });
        else this.setState({ faldax: _FALDAXWHITE, faldaxLogo: _WHITELOGO });
      }
    }
  }
  async componentDidMount() {
    if (this.props.location) {
      if (this.props.location.pathname.includes("market")) {
        this.setState({ selected: "1" });
      } else if (this.props.location.pathname.includes("dashboard")) {
        this.setState({ selected: "2" });
      } else if (this.props.location.pathname.includes("trade")) {
        this.setState({ selected: "3" });
      } else if (
        this.props.location.pathname.includes("conversion") ||
        this.props.location.pathname.includes("simplex")
      ) {
        this.setState({ selected: "4" });
      } else if (this.props.location.pathname.includes("wallet")) {
        this.setState({ selected: "5" });
      } else if (this.props.location.pathname.includes("history")) {
        this.setState({ selected: "6" });
      }
      // else if (this.props.location.pathname.includes("history")) {
      //   this.setState({ selected: "5" });
      // } else {
      //   this.setState({ selected: "6" });
      // }
    }
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({ faldaxLogo: _FALDAXLOGO, faldax: _FALDAX });
        else this.setState({ faldax: _FALDAXWHITE, faldaxLogo: _WHITELOGO });
      }
    }
    // if (this.props.conversion) {
    //   this.tradeAccess();
    // }
    this.panicStatus();
  }

  /* 
        Page: on every page after login on top right
        It is called to open side menu in responsiveness(Small Devices).
    */

  openNav() {
    // console.log("open nav Logged");
    if (
      document.getElementById("mySidenav2") !== undefined &&
      document.getElementById("mySidenav2") !== null
    ) {
      document.getElementById("mySidenav2").style.width = "250px";
      document.getElementById("main").style.marginRight = "250px";
      // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
  }

  /* 
        Page: on every page after login on top right
        It is called to close side menu in responsiveness(Small Devices).
    */

  closeNav() {
    if (
      document.getElementById("mySidenav2") !== undefined &&
      document.getElementById("mySidenav2") !== null
    ) {
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("main").style.marginRight = "0";
      document.body.style.backgroundColor = "white";
    }
  }

  /* 
        Page: on every page after login on top right
        It is called when we click logout in user Drop-down.
    */

  logout() {
    this.setState({ loader: true });
    let formData = {
      user_id: this.props.profileDetails.id,
      jwt_token: this.props.isLoggedIn,
    };
    this.props.LogoutUser(this.props.isLoggedIn, formData);
    //this.props.Logout();
  }

  /* 
        Page: on every page after login on top right
        It is called to open modal of Coming Soon.
    */

  showComing = () => {
    this.setState({ comingSoon: true });
  };

  /*
        Page: on every page after login on top right
        It is called to open modal of Coming Soon.
    */

  handleComing = (e) => {
    this.setState({ comingSoon: false });
  };

  /* 
        Page: on every page after login on top right
        It is called to open modal of Coming Soon.
    */

  comingCancel = (e) => {
    this.setState({
      comingSoon: false,
      countryAccess: false,
      completeKYC: false,
      panicEnabled: false,
      completeProfile: false,
    });
  };

  /* 
        Page: on every page after login on top right
        It is called to send email from modal.
    */

  send_email() {
    const values = { email: this.state.email_address };
    this.setState({ email_address: "" });
    var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (re.test(this.state.email_address)) {
      this.setState({ email_msg: "" });
      fetch(globalVariables.API_URL + "/users/email-subscription", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === 500) {
            this.openNotification1();
          } else {
            this.openNotification();
            this.setState({ visible: false, email_msg: "" });
          }
        })
        .catch((error) => {
          /* console.log(error) */
        });
    } else {
    }
  }
  // openNav() {
  //   this.props.openNav();
  // }

  /* 
        Page: on every page after login on top right
        It is called to check if trade can be accessed for KYC and eligible user.
    */

  panicStatus() {
    this.setState({
      loader: true,
    });
    fetch(API_URL + `/check-panic-status`, {
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
          this.setState({
            panic_status: JSON.parse(responseData.data),
            loader: false,
          });
        } else {
          this.setState({
            panic_status: false,
            loader: false,
          });
        }
      })
      .catch((error) => {});
  }
  cryptoAccess() {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        if (this.props.location.pathname !== "/crypto-conversion")
          this.props.history.push("/crypto-conversion");
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else if (
          this.props.profileDetails.is_allowed === true &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  walletAccess() {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else if (this.props.profileDetails.is_tier_enabled) {
      if (this.props.profileDetails.is_user_updated) {
        if (this.props.profileDetails.legal_allowed) {
          if (this.props.location.pathname !== "/wallet")
            this.props.history.push({
              pathname: "/wallet",
              state: {
                flag: true,
              },
            });
        } else {
          this.setState({ countryAccess: true });
        }
      } else {
        this.setState({
          completeProfile: true,
        });
      }
    } else if (
      !this.props.profileDetails.is_tier_enabled &&
      !this.props.profileDetails.is_user_updated &&
      this.props.profileDetails.is_kyc_done != "2"
    ) {
      this.setState({
        completeProfile: true,
      });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        if (this.props.location.pathname !== "/wallet")
          this.props.history.push({
            pathname: "/wallet",
            state: {
              flag: true,
            },
          });
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else if (
          this.props.profileDetails.is_allowed === true &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  historyAccess(key) {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else if (
      !this.props.profileDetails.is_user_updated &&
      this.props.profileDetails.is_kyc_done != "2"
    ) {
      this.setState({
        completeProfile: true,
      });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        // if (this.props.location.pathname !== "/history")
        this.props.history.push({
          pathname: "/history",
          tradeType: key,
          state: {
            flag: true,
          },
        });
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else if (
          this.props.profileDetails.is_allowed === true &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  simplexAccess() {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else if (
      !this.props.profileDetails.is_user_updated &&
      this.props.profileDetails.is_kyc_done != "2"
    ) {
      this.setState({
        completeProfile: true,
      });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        if (this.props.location.pathname !== "/simplex")
          this.props.history.push({
            pathname: "/simplex",
            state: {
              flag: true,
            },
          });
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else if (
          this.props.profileDetails.is_allowed === true &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  // tradeAccess() {
  //   if (this.state.panic_status === true) {
  //     this.setState({ panicEnabled: true });
  //   } else {
  //     if (
  //       this.props.profileDetails.is_allowed === true &&
  //       this.props.profileDetails.is_kyc_done === 2
  //     ) {
  //       if (this.props.location.pathname !== "/trade")
  //         this.props.history.push("/trade");
  //     } else {
  //       if (
  //         this.props.profileDetails.is_allowed === false &&
  //         this.props.profileDetails.is_kyc_done !== 2
  //       ) {
  //         this.setState({ completeKYC: true });
  //       } else {
  //         this.setState({ countryAccess: true });
  //       }
  //     }
  //   }
  // }
  tokenAccess() {
    this.props.history.push("/token-coming-soon");
    // if (JSON.parse(this.props.profileDetails.is_panic_enabled) === true) {
    //   alert("Idf");
    //   this.setState({ panicEnabled: true });
    // } else {
    //   if (
    //     this.props.profileDetails.is_allowed === true &&
    //     this.props.profileDetails.is_kyc_done === 2
    //   ) {
    //     // alert("IF");
    //     console.log("I am here", this.props.location.pathname);
    //     // this.props.history.push('/trade');
    //     if (this.props.location.pathname !== "/token")
    //       this.props.history.push("/token");
    //   } else {
    //     if (
    //       this.props.profileDetails.is_allowed === false &&
    //       this.props.profileDetails.is_kyc_done !== 2
    //     ) {
    //       // alert("ELSE IF");
    //       this.setState({ completeKYC: true });
    //     } else {
    //       // alert("ELSE ELSE");
    //       this.setState({ countryAccess: true });
    //     }
    //   }
    // }
  }
  // onChange = e => {
  //   // Pages that redirect from WordPress with lng params
  //   let lngQueryParamsUrls = [
  //     "/open-ticket",
  //     "/simplex",
  //     "/crypto-conversion",
  //     "/conversion",
  //     "/editProfile",
  //     "/careers"
  //   ];
  //   // remove queryParams in case of found from list else reload component.
  //   if (lngQueryParamsUrls.indexOf(window.location.pathname) != -1) {
  //     window.location.href = window.location.pathname;
  //   } else {
  //     window.location.reload();
  //   }
  //   this.props.i18n.changeLanguage(e.key);
  // };
  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    const { t } = this.props;
    let prof_name =
      this.props.profileDetails.first_name !== null &&
      this.props.profileDetails.first_name !== undefined
        ? this.props.profileDetails.first_name +
          " " +
          this.props.profileDetails.last_name
        : "User";
    const DropdownItems = (
      <Menu className="fixed-drop">
        <Menu.Item key="0">
          <a
            className="tokenlink"
            href={`${globalVariables.WordpressSiteURL}${
              localStorage["i18nextLng"] && localStorage["i18nextLng"] !== "en"
                ? "/" + localStorage["i18nextLng"]
                : ""
            }/crypto-only-coming-soon`}
          >
            {t("navbar_sub_menu_conversation_crypto_only.message")}
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={this.simplexAccess}>
            {t("navbar_sub_menu_conversation_credit_card.message")}
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a
            className="tokenlink"
            href={`${globalVariables.WordpressSiteURL}${
              localStorage["i18nextLng"] && localStorage["i18nextLng"] !== "en"
                ? "/" + localStorage["i18nextLng"]
                : ""
            }/token-coming-soon`}
          >
            {t("navbar_sub_menu_conversation_bank_transfer.message")}
          </a>
        </Menu.Item>
      </Menu>
    );

    const DropdownHistoryItems = (
      <Menu className="fixed-drop">
        <Menu.Item key="1">
          <a
            onClick={() => {
              this.historyAccess("1");
            }}
          >
            {this.t("trade:trade_head.message")}
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a
            onClick={() => {
              this.historyAccess("2");
            }}
          >
            {t("navbar_sub_menu_conversation_credit_card.message")}
          </a>
        </Menu.Item>
      </Menu>
    );

    const langItems = (
      <Menu onClick={this.onChange}>
        <Menu.Item key="en">
          <a>{this.t("general_4:lang_eng_text.message")}</a>
        </Menu.Item>
        <Menu.Item key="ja">
          <a>{this.t("general_4:lang_ja_text.message")}</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Headermain id="main">
        <Logo>
          <a
            href={
              globalVariables.WordpressSiteURL +
              (localStorage["i18nextLng"] && localStorage["i18nextLng"] !== "en"
                ? "/" + localStorage["i18nextLng"]
                : "")
            }
          >
            <FALDAXLOGO className="" src={this.state.faldaxLogo} />
            <FALDAX src={this.state.faldax} />
          </a>
        </Logo>
        <Menumain
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          selectedKeys={this.state.selected}
        >
          <Menuitem key="1">
            <NavLink className="" to="/market">
              {this.t("trade:market_head.message")}
            </NavLink>
          </Menuitem>
          <Menuitem key="2">
            <NavLink className="" to="/dashboard">
              {this.t("trade:dashboard_head.message")}
            </NavLink>
          </Menuitem>
          <Menuitem key="3" onClick={this.tradeAccess}>
            <NavLink className="" to="/trade">
              {this.t("trade:trade_head.message")}
            </NavLink>
          </Menuitem>
          <Menuitem key="4">
            <DropDownDiv
              className="Drop-main "
              overlay={DropdownItems}
              overlayClassName="custom_dropdown_menu"
            >
              <NavLink className="ant-dropdown-link" to="/conversion">
                {t("navbar_menu_conversion.message")}
              </NavLink>
            </DropDownDiv>
          </Menuitem>
          <Menuitem key="5">
            <a
              className="color_important"
              onClick={() => {
                this.walletAccess();
              }}
            >
              {t("navbar_menu_wallet.message")}
            </a>
          </Menuitem>
          <Menuitem key="6">
            <DropDownDiv
              className="Drop-main"
              overlay={DropdownHistoryItems}
              overlayClassName="custom_dropdown_menu"
            >
              <a
                className="ant-dropdown-link color_important"
                onClick={() => {
                  this.historyAccess("1");
                }}
              >
                {t("navbar_menu_history.message")}
              </a>
            </DropDownDiv>
          </Menuitem>
        </Menumain>
        <RightCol>
          <Afterlog
            {...this.props}
            prof_name={prof_name}
            openLogNav={() => this.openNav()}
          />
        </RightCol>
        <ReactSwipeEvents
          onSwipedRight={() => {
            this.closeNav();
          }}
        >
          <SideNav id="mySidenav2">
            <Close
              href="javascript:void(0)"
              className="closebtn"
              onClick={this.closeNav.bind(this)}
            >
              &times;
            </Close>
            <LogoutStyle>
              <Link to="/editProfile">
                {t("navbar_sub_menu_profile.message")}
              </Link>
            </LogoutStyle>
            {/* <span> <Link to="/conversion">CONVERSION</Link></span> */}
            {/* <span onClick={this.tradeAccess}>CONVERSION</span> */}
            {/* <span>
              {" "}
              <Link to="/conversion">Conversion</Link>
            </span> */}
            {/* <a className="DROPSUB">
              <DropMenu mode="inline">
                <SubMenuNav
                  key="mobsub0"
                  title={t("general_1:language_head.message")}
                  onClick={this.onChange}
                >
                  <Menu.Item key="en">
                    <a>{this.t("general_4:lang_eng_text.message")}</a>
                  </Menu.Item>
                  <Menu.Item key="ja">
                    <a>{this.t("general_4:lang_ja_text.message")}</a>
                  </Menu.Item>
                </SubMenuNav>
              </DropMenu>
            </a> */}
            <span>
              <Link to="/market">{this.t("trade:market_head.message")}</Link>
            </span>
            <span>
              <Link to="/dashboard">
                {this.t("trade:dashboard_head.message")}
              </Link>
            </span>
            <span onClick={this.tradeAccess}>
              <Link to="/trade">{this.t("trade:trade_head.message")}</Link>
            </span>
            <a className="DROPSUB">
              <DropMenu mode="inline">
                <SubMenuNav
                  key="mobsub1"
                  title={t("navbar_menu_conversion.message")}
                >
                  <Menu.Item key="0">
                    <a
                      className="tokenlink"
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/crypto-only-coming-soon`}
                    >
                      {t("navbar_sub_menu_conversation_crypto_only.message")}
                    </a>
                    {/* <a onClick={this.cryptoAccess}>
                      {t("navbar_sub_menu_conversation_crypto_only.message")}
                    </a> */}
                  </Menu.Item>
                  <Menu.Item key="1">
                    <a onClick={this.simplexAccess}>
                      {t("navbar_sub_menu_conversation_credit_card.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <a
                      className="tokenlink"
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/token-coming-soon`}
                    >
                      {t("navbar_sub_menu_conversation_bank_transfer.message")}
                    </a>
                  </Menu.Item>
                </SubMenuNav>
              </DropMenu>
            </a>
            <span>
              {/* <Link to="/wallet">{t("navbar_menu_wallet.message")}</Link> */}
              <a onClick={this.walletAccess}>
                {t("navbar_menu_wallet.message")}
              </a>
            </span>
            <a className="DROPSUB">
              <DropMenu mode="inline">
                <SubMenuNav
                  key="mobsub2"
                  title={t("navbar_menu_history.message")}
                >
                  {/* <Menu.Item key="0">
                    <a
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/history",
                          tradeType: "1"
                        })
                      }
                    >
                      Trade History
                    </a>
                  </Menu.Item> */}
                  {/* <Menu.Item key="0">
                    <a
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/history",
                          tradeType: "1"
                        })
                      }
                    >
                      {t("navbar_sub_menu_conversation_crypto_only.message")}
                    </a>
                  </Menu.Item> */}
                  <Menu.Item key="1">
                    <a
                      onClick={() => {
                        this.historyAccess("1");
                      }}
                    >
                      {this.t("trade:trade_head.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <a
                      onClick={() => {
                        this.historyAccess("2");
                      }}
                    >
                      {t("navbar_sub_menu_conversation_credit_card.message")}
                    </a>
                  </Menu.Item>
                  {/* <Menu.Item key="2">
                    <a
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/history",
                          tradeType: "3"
                        })
                      }
                    >
                      Trade
                    </a>
                  </Menu.Item> */}
                </SubMenuNav>
              </DropMenu>
            </a>
            {/* <span>
              <CarLink to="/careers">Careers</CarLink>
            </span> */}
            <a className="DROP">
              <DropMenu mode="inline">
                <SubMenuNav
                  key="sub1"
                  title={t("footer:head_information.message")}
                >
                  <Menu.Item key="9">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/about-us`}
                    >
                      {t("footer:subhead_about_us.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/contact-us`}
                    >
                      {t("footer:subhead_contact_us.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/media-contact`}
                    >
                      {t("footer:subhead_media_contact.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/blogs`}
                    >
                      {t("footer:subhead_blog.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="13">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/fee`}
                    >
                      {t("footer:subhead_fees.message")}
                    </a>
                  </Menu.Item>
                </SubMenuNav>
              </DropMenu>
            </a>
            <a className="DROP">
              <DropMenu mode="inline">
                <SubMenuNav key="sub2" title={t("footer:head_support.message")}>
                  <Menu.Item key="9">
                    <Link to="/open-ticket">
                      {t("footer:subhead_open_a_ticket.message")}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <a href="https://knowledge.faldax.com/">
                      {t("footer:subhead_faq.message")}
                    </a>
                  </Menu.Item>
                  {/* <Menu.Item key="11"><a href="#">API Documentation</a></Menu.Item> */}
                  <Menu.Item key="12">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/list-your-token`}
                    >
                      {t("footer:subhead_List_your_token.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/news`}
                    >
                      {t("footer:subhead_news.message")}
                    </a>
                  </Menu.Item>
                </SubMenuNav>
              </DropMenu>
            </a>
            <a className="DROP">
              <DropMenu mode="inline">
                <SubMenuNav
                  key="sub3"
                  title={t("footer:head_Legal_&_technical.message")}
                >
                  <Menu.Item key="9">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/policies`}
                    >
                      {t("footer:subhead_policies.message")}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <a
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/service-availability`}
                    >
                      {t("footer:subhead_service_availability.message")}
                    </a>
                  </Menu.Item>
                  {/* <Menu.Item key="11"><a onClick={this.showComing} href="#">Security</a></Menu.Item> */}
                </SubMenuNav>
              </DropMenu>
            </a>
            <LogoutStyle onClick={this.logout.bind(this)}>
              {t("navbar_sub_menu_history_logout.message")}{" "}
            </LogoutStyle>
          </SideNav>
        </ReactSwipeEvents>
        {this.state.loader == true ? <FaldaxLoader /> : ""}
        <ComingSoon
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.comingSoon}
        />
        <CountryAccess
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.countryAccess}
        />
        <CompleteKYC
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.completeKYC}
        />
        <PanicEnabled
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.panicEnabled}
        />
        <CompleteProfile
          comingCancel={(e) => this.comingCancel(e)}
          visible={this.state.completeProfile}
        />
      </Headermain>
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
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    language: state.themeReducer.lang,
  };
}
const mapDispatchToProps = (dispatch) => ({
  // Logout: () => dispatch(Logout()),
  LogoutUser: (isLoggedIn, user_id) =>
    dispatch(LogoutUser(isLoggedIn, user_id)),
  langAction: (lang) => dispatch(langAction(lang)),
});

export default translate([
  "header",
  "footer",
  "general_1",
  "general_4",
  "trade",
])(connect(mapStateToProps, mapDispatchToProps)(withRouter(LoggedNavigation)));
