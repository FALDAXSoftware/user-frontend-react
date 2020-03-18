/* IN-built */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Button } from "antd";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ReactSwipeEvents from "react-swipe-events";

/* Components */
import Beforelog from "./beforelog";
import Afterlog from "./afterlog";
import { LogoutUser } from "ACTIONS/authActions";
import ComingSoon from "COMPONENTS/comingsoon";
import { globalVariables } from "Globals.js";

/* STYLED-COMPONENTS */
import {
  _FALDAXLOGO,
  _FALDAXWHITE,
  _WHITELOGO,
  _FALDAX,
  _WALLPAPER
} from "CONSTANTS/images";

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

/* Modal Styled Components */
export const DropMenu = styled(Menu)`
  background: none;
  color: white;
`;
export const SubMenuNav = styled(SubMenu)`
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
/* const Faldaxlogo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    cursor:pointer;
` */
/* Styled Components */
const FALDAX = styled.img`
  margin-left: 15px;
  cursor: pointer;
  @media (max-width: 1320px) {
    margin-top: 3px;
  }
`;
const Logo = styled.div`
  display: inline-block;
  text-align: left;
  cursor: pointer;
  height: 100%;
  display: inline-flex;
  align-items: center;
`;
const Headermain = styled(Header)`
  position: fixed;
  z-index: 1000;
  width: 100%;
  padding: 0;
  text-align: left;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  box-shadow: ${props =>
    props.theme.mode === "dark" ? "" : "0px 3px #f7f7f7"};
  height: 80px;
  display: flex;
  align-items: center;
`;
const Menumain = styled(Menu)`
  display: inline-block;
  margin-left: 40px;
  lineheight: 1px;
  text-align: right;
  border-bottom: 0px;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  @media (max-width: 1200px) {
    display: none;
  }
`;
const Menuitem = styled(Menu.Item)`
  padding: 0px 15px;
  font-size: 13px;
  font-family: "Open sans";
  color: rgb(40, 37, 40);
  font-weight: bold;
  text-transform: uppercase;
  vertical-align: unset;
  float: left;
  border-bottom: 0px !important;

  @media (max-width: 1540px) {
    padding: 0px 8px;
  }
`;
const FALDAXLOGO = styled.img`
  padding-left: 22px;
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
  > a {
    padding: 8px 32px;
    text-decoration: none;
    font-size: 18px;
    display: block;
    transition: 0.5s;
    line-height: 1.5;
    color: white;
  }
  > a:hover {
    color: #1890ff !important;
  }
  > a.DROP {
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
  & .ant-menu-inline {
    border-right: none;
  }
  @media (min-width: 1320px) {
    display: none;
  }
  @media (min-width: 576px) {
    & .DROP {
      display: none;
    }
  }
`;
/* const LOG = styled.span`
    display:inline-block;
    width:50%;
    color: white;
    &:hover{
        color:#1890ff !important;
        text-decoration:underline;
    }
` */
const ButtonLog = styled(Button)`
  background-color: white;
  border-color: #0f477b;
  color: #0f477b;
  border-radius: 20px;
  font-size: 13px;
  font-family: "Open sans";
  font-weight: bold;
  padding: 7px 20px 8px;
  height: auto;
`;
const Finsign = styled.a`
  text-decoration: none;
  font-size: 18px;
  display: inline-flex;
  margin-left: auto;
  transition: 0.5s;
  line-height: 1.5;
  color: white;
`;
const Finlog = styled.a`
  text-decoration: none;
  font-size: 18px;
  transition: 0.5s;
  line-height: 1.5;
  color: white;
`;
const Findiv = styled.div`
  padding: 0px 32px;
  display: none;
  @media (max-width: 480px) {
    display: flex;
    align-items: center;
  }
`;
/* const Why = styled.a`
    padding:0px !important;
    display:none !important;
    @media(max-width:670px)
    {
        display:block !important;
    }
` */
const Close = styled.a`
  text-align: right;
`;
const Rightdiv = styled.div`
  margin-left: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;
const NavLink = styled.a`
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "black"} !important;
  &:hover {
    color: #1890ff !important;
  }
`;
const ProfileLinkContainer = styled.div`
  > a {
    padding: 8px 32px;
    text-decoration: none;
    font-size: 18px;
    display: block;
    transition: 0.5s;
    line-height: 1.5;
    color: white;
  }
  > a:hover {
    color: #1890ff !important;
  }
  @media (min-width: 361px) {
    display: none;
  }
`;
const CarLink = styled(Link)`
  @media (min-width: 671px) {
    display: none !important;
  }
`;
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modal: undefined,
      forgotParam: undefined,
      comingSoon: false,
      email_address: "",
      email_msg: "",
      selected: [],
      faldaxLogo: "",
      faldax: "",
      qP: ""
    };
  }
  /* Life-Cycle Methods */
  componentWillReceiveProps(props, newProps) {
    if (props.theme !== undefined) {
      if (props.theme !== this.state.theme) {
        if (props.theme === false)
          this.setState({ faldaxLogo: _FALDAXLOGO, faldax: _FALDAX });
        else this.setState({ faldax: _FALDAXWHITE, faldaxLogo: _WHITELOGO });
      }
    }
    if (props.location.pathname !== undefined)
      if (props.location.pathname === "/login") {
        if (props.location.hash === "#openTicket") {
          this.setState({ modal: 0, visible: true });
        }
      }
  }
  componentDidMount() {
    if (this.props.location.pathname !== undefined)
      if (this.props.location.pathname === "/login") {
        if (this.props.location.hash === "#openTicket") {
          this.setState({ modal: 0, visible: true });
        }
      }
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({ faldaxLogo: _FALDAXLOGO, faldax: _FALDAX });
        else this.setState({ faldax: _FALDAXWHITE, faldaxLogo: _WHITELOGO });
      }
    }

    /*         let queryParams */

    /* if (this.props.location.pathname == "/signup") {
            queryParams = decodeURIComponent(this.props.queryParams)
            let qP = queryParams.split("=")
            this.setState({ modal: 1, visible: true, qP: qP[1] });
        } else {
            if (this.props.queryParams !== undefined && this.props.queryParams !== "") {
                queryParams = this.props.queryParams;
                this.setState({ forgotParam: queryParams.split("="), visible: true })
            }
        } */
    if (this.props.location.pathname === "/about-us") {
      this.setState({ selected: ["2"] });
    } else if (this.props.location.pathname === "/contact-us") {
      this.setState({ selected: ["6"] });
    } else if (this.props.location.pathname === "/blogs") {
      this.setState({ selected: ["3"] });
    } else if (this.props.location.pathname === "/list-your-token") {
      this.setState({ selected: ["7"] });
    } else if (this.props.location.pathname.includes("news")) {
      this.setState({ selected: ["5"] });
    } else {
      if (this.props.location.pathname === "/")
        this.setState({ selected: ["1"] });
      else this.setState({ selected: ["0"] });
    }
  }

  /* 
            Page: on every page after login on top right
            It is called to open side menu in responsiveness(Small Devices).
    */

  openNav() {
    if (
      document.getElementById("mySidenav") !== undefined &&
      document.getElementById("mySidenav") !== null
    ) {
      document.getElementById("mySidenav").style.width = "250px";
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
      document.getElementById("mySidenav") !== undefined &&
      document.getElementById("mySidenav") !== null
    ) {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginRight = "0";
      document.body.style.backgroundColor = "white";
    }
  }

  /* 
            Page: on every page after login on top right
            It is called to check if user has requested signup/login page.
    */

  dispModal(pressed) {
    if (pressed === "login") this.props.history.push("/login");
    else if (pressed === "signup") this.props.history.push("/signup");
    // else if (pressed == "thankyou")
    //     this.setState({ modal: 4 });
    else this.setState({ modal: 2 });
    //this.showModal();
    this.setState({ forgotParam: undefined });
  }

  /* 
            Page: on every page after login on top right
            It is called to show modal.
    */

  /* showModal = () => {
        this.setState({ visible: true });
    } */

  /* 
            Page: on every page after login on top right
            It is called to handle modal.
    */

  /* handleOk = (e) => {
        this.setState({ visible: false });
    } */

  /* 
            Page: on every page after login on top right
            It is called to handle modal.
    */

  /* handleCancel = (e) => {
        this.setState({ visible: false, modal: 5 });
    }

    handleAfterClose = (e) => {
        this.setState({ modal: 5 });
    } */
  comingCancel = e => {
    this.setState({ comingSoon: false });
  };

  showComing = () => {
    this.setState({ comingSoon: true });
  };

  /* 
        Page: on every page after login on top right
        It is called to logout.
    */

  logout() {
    let formData = {
      user_id: this.props.profileDetails.id,
      jwt_token: this.props.isLoggedIn
    };
    this.props.LogoutUser(this.props.isLoggedIn, formData);
    //this.props.Logout();
  }
  render() {
    let prof_name =
      this.props.profileDetails.first_name !== null &&
      this.props.profileDetails.first_name !== undefined
        ? this.props.profileDetails.first_name +
          " " +
          this.props.profileDetails.last_name
        : "User";
    /*         const { modal } = this.state; */
    return (
      <div>
        <Headermain id="main">
          <Logo>
            <a
              href={
                globalVariables.WordpressSiteURL +
                (localStorage["i18nextLng"] &&
                localStorage["i18nextLng"] !== "en"
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
              <NavLink
                className="Nav_selected"
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/`}
              >
                HOME
              </NavLink>
            </Menuitem>
            {/* <Menu_item key="2" onClick={this.showComing}>FEATURES</Menu_item> */}
            <Menuitem key="2">
              <NavLink
                className="Nav_selected"
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/about-us`}
              >
                ABOUT
              </NavLink>
            </Menuitem>
            <Menuitem key="3">
              <NavLink
                className="Nav_selected"
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/blogs`}
              >
                BLOG
              </NavLink>
            </Menuitem>
            {/* <Menu_item key="4" onClick={this.showComing}><NavLink className="Nav_selected" href="#">SECURITY</NavLink></Menu_item> */}
            <Menuitem key="5">
              <NavLink
                className="Nav_selected"
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/news`}
              >
                NEWS
              </NavLink>
            </Menuitem>
            <Menuitem key="6">
              <NavLink
                className="Nav_selected"
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/contact-us`}
              >
                CONTACT
              </NavLink>
            </Menuitem>
            <Menuitem key="7">
              <NavLink
                className="Nav_selected"
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/list-your-token`}
              >
                LIST YOUR TOKEN
              </NavLink>
            </Menuitem>
            <Menuitem key="8">
              <NavLink
                className="Nav_selected"
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/exchange`}
              >
                EXCHANGE
              </NavLink>
            </Menuitem>
          </Menumain>
          <Rightdiv>
            {this.props.isLoggedIn ? (
              <Afterlog
                {...this.props}
                prof_name={prof_name}
                openLogNav={() => this.openNav()}
              />
            ) : (
              <Beforelog
                {...this.props}
                dispModal={pressed => this.dispModal(pressed)}
                openNav={() => this.openNav()}
              />
            )}
          </Rightdiv>
          <ReactSwipeEvents
            onSwipedRight={() => {
              this.closeNav();
            }}
          >
            <SideNav id="mySidenav">
              <Close
                href="javascript:void(0)"
                className="closebtn"
                onClick={this.closeNav.bind(this)}
              >
                &times;
              </Close>
              {!this.props.isLoggedIn && (
                <Findiv>
                  <Finlog
                    onClick={() =>
                      this.props.history.push(
                        `${globalVariables.WordpressSiteURL}${
                          localStorage["i18nextLng"] &&
                          localStorage["i18nextLng"] !== "en"
                            ? "/" + localStorage["i18nextLng"]
                            : ""
                        }/login`
                      )
                    }
                  >
                    <ButtonLog type="primary">Login</ButtonLog>
                  </Finlog>
                  <Finsign
                    onClick={() =>
                      this.props.history.push(
                        `${globalVariables.WordpressSiteURL}${
                          localStorage["i18nextLng"] &&
                          localStorage["i18nextLng"] !== "en"
                            ? "/" + localStorage["i18nextLng"]
                            : ""
                        }/signup`
                      )
                    }
                  >
                    <ButtonLog type="primary">Signup</ButtonLog>
                  </Finsign>
                </Findiv>
              )}
              <a
                href={
                  globalVariables.WordpressSiteURL +
                  (localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : "")
                }
              >
                Home
              </a>
              {/* <a onClick={this.showComing} href="#">Features</a> */}
              <a
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/about-us`}
              >
                About
              </a>
              <a
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/blogs`}
              >
                Blogs
              </a>
              {/* <a onClick={this.showComing} href="#">Security</a> */}
              <a
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/news`}
              >
                News
              </a>
              <a
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/contact-us`}
              >
                Contact
              </a>
              <a
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/list-your-token`}
              >
                List Your Token
              </a>
              <a
                href={`${globalVariables.WordpressSiteURL}${
                  localStorage["i18nextLng"] &&
                  localStorage["i18nextLng"] !== "en"
                    ? "/" + localStorage["i18nextLng"]
                    : ""
                }/coming-soon`}
              >
                Exchange
              </a>
              {/* <a onClick={this.showComing} href="#">Exchange</a> */}
              {this.props.isLoggedIn ? (
                <CarLink to="/careers">Careers</CarLink>
              ) : (
                ""
              )}
              {/* <Why> Language </Why> */}
              <a className="DROP">
                <DropMenu mode="inline">
                  <SubMenuNav key="sub1" title={"Information"}>
                    {/* <Menu.Item key="9">
                      <a href={`${globalVariables.WordpressSiteURL}/about-us`}>
                        About Us
                      </a>
                    </Menu.Item>
                    <Menu.Item key="10">
                      <a
                        href={`${globalVariables.WordpressSiteURL}/contact-us`}
                      >
                        Contact Us
                      </a>
                    </Menu.Item> */}
                    <Menu.Item key="11">
                      <a
                        href={`${globalVariables.WordpressSiteURL}${
                          localStorage["i18nextLng"] &&
                          localStorage["i18nextLng"] !== "en"
                            ? "/" + localStorage["i18nextLng"]
                            : ""
                        }/media-contact`}
                      >
                        Media Contact
                      </a>
                    </Menu.Item>
                    {/* <Menu.Item key="12"><a href="/blogs">Blog</a></Menu.Item> */}
                    <Menu.Item key="13">
                      <a
                        href={`${globalVariables.WordpressSiteURL}${
                          localStorage["i18nextLng"] &&
                          localStorage["i18nextLng"] !== "en"
                            ? "/" + localStorage["i18nextLng"]
                            : ""
                        }/fee`}
                      >
                        Fees
                      </a>
                    </Menu.Item>
                  </SubMenuNav>
                </DropMenu>
              </a>
              <a className="DROP">
                <DropMenu mode="inline">
                  <SubMenuNav key="sub2" title={"Support"}>
                    <Menu.Item key="9">
                      <Link to="/open-ticket">Open a Ticket</Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                      <a href="https://knowledge.faldax.com/">FAQ</a>
                    </Menu.Item>
                    {/* <Menu.Item key="11"><a href="#">API Documentation</a></Menu.Item> */}
                    {/* <Menu.Item key="12">
                      <a
                        href={`${globalVariables.WordpressSiteURL}/list-your-token`}
                      >
                        List Your Token
                      </a>
                    </Menu.Item> */}
                    {/* <Menu.Item key="12">
                      <a href={`${globalVariables.WordpressSiteURL}/news`}>
                        News
                      </a>
                    </Menu.Item> */}
                  </SubMenuNav>
                </DropMenu>
              </a>
              <a className="DROP">
                <DropMenu mode="inline">
                  <SubMenuNav key="sub3" title={"Legal & Technical"}>
                    <Menu.Item key="9">
                      <a
                        href={`${globalVariables.WordpressSiteURL}${
                          localStorage["i18nextLng"] &&
                          localStorage["i18nextLng"] !== "en"
                            ? "/" + localStorage["i18nextLng"]
                            : ""
                        }/policies`}
                      >
                        Policies
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
                        Service Availability
                      </a>
                    </Menu.Item>
                    {/* <Menu.Item key="11"><a onClick={this.showComing} href="#">Security</a></Menu.Item> */}
                  </SubMenuNav>
                </DropMenu>
              </a>
              {this.props.isLoggedIn && (
                <ProfileLinkContainer>
                  <Link to="/editProfile">Profile</Link>
                  <a onClick={this.logout.bind(this)}>Logout</a>
                </ProfileLinkContainer>
              )}
            </SideNav>
          </ReactSwipeEvents>
          <ComingSoon
            comingCancel={e => this.comingCancel(e)}
            visible={this.state.comingSoon}
          />
        </Headermain>
        {/* (this.props.loader == true) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : "" */}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn ? true : false,
    queryParams:
      ownProps && ownProps.location && ownProps.location.search
        ? ownProps.location.search
        : "",
    pathname:
      ownProps && ownProps.location && ownProps.location.pathname
        ? ownProps.location.pathname
        : "",
    profileDetails: state.simpleReducer.profileDetails
      ? state.simpleReducer.profileDetails.data[0]
      : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    loader: state.simpleReducer.loader ? state.simpleReducer.loader : false
  };
}
const mapDispatchToProps = dispatch => ({
  //Logout: () => dispatch(Logout()),
  LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navigation));
