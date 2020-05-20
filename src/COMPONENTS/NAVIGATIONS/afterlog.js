/* BUilt-in Packages */
import styled from "styled-components";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { Button, Menu, Modal, Dropdown, Icon, Input, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { translate } from "react-i18next";
import { _FOOTERLOGO, _DEFAULTPROFILE } from "CONSTANTS/images";

/* Components */
import * as LogoutUser from "ACTIONS/authActions";
import { DayNightMode, Exchange } from "./beforelog";
import * as darkTheme from "ACTIONS/THEME/themeActions";
import * as walletData from "ACTIONS/LOGGEDCAT/walletActions";
import * as allCoinsData from "ACTIONS/LOGGEDCAT/walletActions";

/* CONSTANTS */
import { globalVariables } from "Globals.js";
import FaldaxLoader from "../../SHARED-COMPONENTS/FaldaxLoader";

/* Styled-Components */
const LoginButton = styled(Button)`
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  color: white;
  height: 40px;
  background-color: #4c84ff;
  margin: 0 22px 0 0;
  @media (max-width: 450px) {
    height: 35px;
  }
`;
const RightDiv = styled.div`
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
`;
const UserName = styled.div`
  display: inline-block;
  font-size: 13px;
  font-family: "Open sans";
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  font-weight: 600;
  @media (max-width: 576px) {
    display: none;
  }
  @media (min-width: 2000px) {
    font-size: 20px;
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
  @media (max-width: 450px) {
    margin-top: 0;
  }
`;
const HeaderAvatar = styled.div`
  margin-right: 10px;
  height: 35px;
  width: 35px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
`;
const DropDownDiv = styled(Dropdown)`
  margin-right: 30px;
  &.lang-main {
    margin-right: 10px;
    margin-top: 0;
    > span {
      display: flex;
      align-items: center;
      font-weight: 600;
      color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
      > img {
        margin: 0 5px 0 0;
      }
    }
    > span:hover {
      cursor: pointer;
    }
  }
  @media (max-width: 450px) {
    &.lang-main {
      > span {
        > span {
          display: none;
        }
      }
    }
  }
  @media (max-width: 480px) {
    margin-top: 10px;
  }
  @media (max-width: 360px) {
    // display: none;
  }
  @media (max-width: 576px) {
    margin-right: 10px;
  }
`;
const DownIcon = styled(Icon)`
  height: 10px;
  margin-bottom: 5px;
  padding-left: 10px;
  color: #b7b7b7;
`;
const AnchorName = styled.a`
  font-size: 13pt;
  font-weight: bold;
  font-family: "Open sans";
  color: #505050;
  text-transform: capitalize;
  @media (max-width: 1200px) {
    margin-top: 0px;
  }
`;
/* const Bell = styled.div`
    display:inline;
    font-size: 13px;
    padding-right: 10px;
    cursor:pointer;
` */
class Afterlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: false,
      selected: false,
      fontColor: "",
      loader: false,
    };
    this.t = this.props.t;
  }

  /* Life-Cycle Methods */

  componentWillReceiveProps(props, newProps) {
    if (props.theme !== undefined) {
      if (props.theme !== this.state.theme) {
        if (props.theme === false)
          this.setState({
            fontColor: "black",
            themeIcon: faMoon,
            iconTitle: this.t("general_4:change_to_night_text.message"),
          });
        else
          this.setState({
            fontColor: "white",
            themeIcon: faSun,
            iconTitle: this.t("general_4:change_to_day_text.message"),
          });
      }
    }
  }
  componentDidMount() {
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({
            fontColor: "black",
            themeIcon: faMoon,
            iconTitle: this.t("general_4:change_to_night_text.message"),
          });
        else
          this.setState({
            fontColor: "white",
            themeIcon: faSun,
            iconTitle: this.t("general_4:change_to_day_text.message"),
          });
      }
    }
    if (this.props.location.pathname === "/careers") {
      this.setState({ selected: true });
    }
  }

  /* 
            Page: on every page after login on top right
            It is modal of Coming Soon.
    */

  handleComing = (e) => {
    this.setState({ comingSoon: false });
  };

  openNav() {
    this.props.openLogNav();
  }
  /* 
            Page: on every page after login on top right
            It is called when we click close button on Modal.
    */

  comingCancel = (e) => {
    this.setState({ comingSoon: false });
  };

  /* 
            Page: on every page after login on top right
            It is called when we click to open Ham-Burger Menu in responsive(small Devices).
    */

  /* 
            Page: on every page after login on top right
            It is called when we click on Logout in user drop-down.
    */

  logout() {
    this.setState({ loader: true });
    let formData = {
      user_id: this.props.profileDetails.id,
      jwt_token: this.props.isLoggedIn,
    };
    this.props.actions.allCoins.allCoinsData();
    this.props.actions.wallet.walletData();
    this.props.actions.auth.LogoutUser(this.props.isLoggedIn, formData);
  }

  /* 
            Page: on every page after login on top right
            It is called when we click Day/Night Icon on top after Login , so it will pass true/false through Redux.
    */

  changetoDark() {
    let flag;
    if (this.props.themeReducer.theme === true) {
      flag = false;
      this.setState({
        themeIcon: faSun,
        iconTitle: this.t("general_4:change_to_night_text.message"),
      });
    } else {
      this.setState({
        themeIcon: faMoon,
        iconTitle: this.t("general_4:change_to_day_text.message"),
      });
      flag = true;
    }
    this.props.actions.theme.darkTheme(flag);
  }

  onChange = (e) => {
    // Pages that redirect from WordPress with lng params
    let lngQueryParamsUrls = [
      "/open-ticket",
      "/simplex",
      "/crypto-conversion",
      "/conversion",
      "/editProfile",
      "/careers",
    ];
    // remove queryParams in case of found from list else reload component.
    if (lngQueryParamsUrls.indexOf(window.location.pathname) != -1) {
      window.location.href = window.location.pathname;
    } else {
      window.location.reload();
    }
    this.props.i18n.changeLanguage(e.key);
  };

  render() {
    const { t } = this.props;
    const DropdownItems = (
      <Menu className="fixed-drop">
        {/* <Menu.Item key="0">User ID: {this.props.profileDetails.id}</Menu.Item> */}
        <Menu.Item key="1">
          <a onClick={() => this.props.history.push("/editProfile")}>
            {" "}
            {t("navbar_sub_menu_profile.message")}{" "}
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={() => this.props.history.push("/tickets")}>
            {t("navbar_sub_menu_ticket.message")}
          </a>
        </Menu.Item>
        <Menu.Item key="2" onClick={this.logout.bind(this)}>
          {t("navbar_sub_menu_history_logout.message")}
        </Menu.Item>
      </Menu>
    );
    let Avatar_img;
    if (this.props.profileDetails !== undefined) {
      if (
        this.props.profileDetails.profile_pic !== null &&
        this.props.profileDetails.profile_pic !== undefined &&
        this.props.profileDetails.profile_pic !== ""
      ) {
        Avatar_img =
          globalVariables._AMAZONBUCKET + this.props.profileDetails.profile_pic;
      } else {
        Avatar_img = _DEFAULTPROFILE;
      }
    }
    const langItems = (
      <Menu
        className="lang-menu"
        // onClick={e => {
        //   alert("change");
        //   console.log("this", e.key);
        // }}
        onClick={this.onChange}
      >
        <Menu.Item key="en">
          <a className="lang-menu-item">
            <img src="/images/en.png" />
            {this.t("general_4:lang_eng_text.message")}
          </a>
        </Menu.Item>
        <Menu.Item key="ja">
          <a className="lang-menu-item">
            <img src="/images/ja.png" />
            {this.t("general_4:lang_ja_text.message")}
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <RightDiv>
        {/*  <Bell>
                    <Icon  style={{fontSize:"15px",color:"black"}} type="bell" theme="filled" />      
                </Bell>*/}
        <DayNightMode onClick={this.changetoDark.bind(this)}>
          <span>
            {" "}
            <Tooltip placement="top" title={this.state.iconTitle}>
              <FontAwesomeIcon
                icon={this.state.themeIcon}
                color={this.state.fontColor}
                // style={{ transform: "rotate(315deg)" }}
              />
            </Tooltip>{" "}
          </span>
        </DayNightMode>
        {/* <Link to="/careers">
          <Exchange color={this.state.selected}>
            <span> {t("navbar_menu_careers.message")} </span>
          </Exchange>
        </Link> */}
        {/* <Link to="/paxos">
          <Exchange color={this.state.selected}>
            <span> Paxos </span>
          </Exchange>
        </Link> */}
        <DropDownDiv
          // className="Drop-main"
          className="lang-main"
          overlay={langItems}
          trigger={["click"]}
          // overlayClassName="custom_dropdown_menu"
        >
          <div className="language_head">
            {/* {t("general_1:language_head.message")} */}
            {localStorage["i18nextLng"] == "en" ? (
              <span>
                <img src="/images/en.png" />
                <span>{this.t("general_4:lang_eng_text.message")}</span>
              </span>
            ) : (
              <span>
                <img src="/images/ja.png" />
                <span>{this.t("general_4:lang_ja_text.message")}</span>
              </span>
            )}
          </div>
        </DropDownDiv>
        {this.props.isLoggedIn ? (
          <DropDownDiv
            className="Drop-main"
            overlay={DropdownItems}
            trigger={["click"]}
          >
            <AnchorName className="ant-dropdown-link" href="#">
              <HeaderAvatar
                style={{ backgroundImage: "url('" + Avatar_img + "')" }}
              />
              <UserName>
                {this.props.prof_name}
                <DownIcon type="caret-down" theme="outlined" />
              </UserName>
            </AnchorName>
          </DropDownDiv>
        ) : (
          <LoginButton
            onClick={() => {
              console.log("ashgd");
              this.props.history.push("/");
            }}
          >
            Login
          </LoginButton>
        )}

        <Open onClick={() => this.openNav()}>&#9776;</Open>
        <div>
          <Modal
            title={<img alt="modal logo" src={_FOOTERLOGO} />}
            visible={this.state.comingSoon}
            onOk={(e) => this.handleComing()}
            onCancel={(e) => this.comingCancel(e)}
            footer={null}
            width={520}
            height={150}
            className="simple-maps"
          >
            <div>
              <h3
              //  style={{ fontSize: "32px", textAlign: "center" }}
              >
                Coming Soon
              </h3>
              <label
              // style={{ color: "#00a7ff" }}
              >
                {" "}
                Please enter your email to get updates of FALDAX:{" "}
              </label>
              <Input
                placeholder="Please enter your email address"
                // style={{ color: "#00a7ff", borderColor: "#00a7ff" }}
                value={this.state.email_address}
                onChange={(e) => {
                  this.setState({ email_address: e.target.value });
                }}
              />
              <div
              // style={{ marginTop: "20px", minHeight: "20px" }}
              >
                <Button
                  // style={{
                  //   float: "right",
                  //   color: "#00a7ff",
                  //   borderColor: "#00a7ff"
                  // }}
                  onClick={() => this.send_email()}
                >
                  {" "}
                  RECEIVE UPDATE{" "}
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        {this.state.loader == true ? <FaldaxLoader /> : ""}
      </RightDiv>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state,
    isLoggedIn: state.simpleReducer.isLoggedIn
      ? state.simpleReducer.isLoggedIn
      : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: bindActionCreators(LogoutUser, dispatch),
      theme: bindActionCreators(darkTheme, dispatch),
      wallet: bindActionCreators(walletData, dispatch),
      allCoins: bindActionCreators(allCoinsData, dispatch),
      //LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
    },
  };
}

export default translate(["header", "general_4"])(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Afterlog))
);
