/* IN-built */
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import ReactSwipeEvents from 'react-swipe-events'

/* Components */
import Afterlog from "./afterlog"
import { LogoutUser } from 'ACTIONS/authActions';
import { globalVariables } from "Globals";
import ComingSoon from 'COMPONENTS/comingsoon';
import CompleteKYC from "SHARED-COMPONENTS/CompleteKYC"
import CountryAccess from 'SHARED-COMPONENTS/CountryAccess';

/* CONSTANTS */
import { _FALDAXLOGO, _FALDAXWHITE, _WHITELOGO, _FALDAX, _WALLPAPER } from "CONSTANTS/images";
const { Header } = Layout;

/* Styled Components */
const FALDAX = styled.img`
    cursor:pointer;
    margin-left: 10px;
`
const Logo = styled.div`
    display:inline-flex;
    height:100%;
    align-items:center;
    text-align:left;
    cursor:pointer;
`
const Header_main = styled(Header)`
position:fixed;
z-index: 1000;
width : 100%;
padding:0;
text-align:left;
background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
box-shadow:${props => props.theme.mode == "dark" ? "" : "0px 3px #f7f7f7"};
height :80px;
display:flex;
align-items:center;
`
const Menu_main = styled(Menu)`
    display:inline-block;
    margin-left:74px;
    text-align: right;
    border-bottom:0px;
    vertical-align: middle;
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    @media(max-width:1200px)
    {
        display:none;
    }
    @media(max-width:1365px)
    {
        margin-left: 15px;
    }
`
const Menu_item = styled(Menu.Item)`
    padding:0px 18px;
    font-size: 13px;
    font-family: "Open sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "black"};
    font-weight: bold;
    text-transform: uppercase;      
    vertical-align: unset;
    float: left;
    border-bottom:0px !important;
    font-weight:600 !important;
    &:hover
    {
        color:#1890ff;
    }
    @media(max-width:1365px)
    {
        padding:0px 8px;
    }
`
const NAV = styled.span`
    color:${props => props.theme.mode = "dark" ? "white" : ""};
`
const FALDAX_LOGO = styled.img`
    padding-left:22px;
`
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
    & span a{
        color: white;
    }
    span
    {
        padding: 8px 32px;
        text-decoration: none;
        font-size: 18px;
        display: block;
        transition: 0.5s;
        line-height: 1.5;
        color:white !important;
        cursor:pointer;
    }
    @media(min-width: 1200px)
    {
        display: none;
    }
`
const Close = styled.span`
    text-align:right;
`
const Profile = styled.a`
    @media(min-width: 361px)
    {
        display: none !important;
    }
`
const LogoutStyle = styled.span`
    @media(min-width: 361px)
    {
        display: none !important;
    }
`
const RightCol = styled.div`
    height:100%
    display:inline-flex;
    align-items:center;
    margin-left:auto;
`
const NavLink = styled(Link)`
    color: ${props => props.theme.mode == "dark" ? "white" : "black"} !important;
    &:hover{
        color:#1890ff !important;
    }
`
const LogNav = styled.span`
    color: ${props => props.theme.mode == "dark" ? "white" : "black"} !important;
    &:hover{
        color:#1890ff !important;
    }
`
const CarLink = styled(Link)`
    color:white !important;
    text-decoration: none;
    font-size: 18px;
    display: block;
    transition: 0.5s;
    line-height: 1.5;
    color:white !important;
    cursor:pointer;
    text-transform:uppercase;
    @media(min-width:671px)
    {
        display:none !important;
    }
`
class LoggedNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modal: 0,
            comingSoon: false,
            faldaxLogo: "",
            faldax: "",
            selected: '',
            countryAccess: false,
            completeKYC: false
        },
            this.tradeAccess = this.tradeAccess.bind(this);
    }
    componentWillReceiveProps(props, newProps) {
        if (props.theme !== undefined) {
            if (props.theme !== this.state.theme) {
                if (props.theme == false)
                    this.setState({ faldaxLogo: _FALDAXLOGO, faldax: _FALDAX })
                else
                    this.setState({ faldax: _FALDAXWHITE, faldaxLogo: _WHITELOGO })
            }
        }
    }
    componentDidMount() {
        if (this.props.location) {
            if (this.props.location.pathname.includes("trade")) {
                this.setState({ selected: "2" })
            } else if (this.props.location.pathname.includes("wallet")) {
                this.setState({ selected: "3" })
            } else if (this.props.location.pathname.includes("dashboard")) {
                this.setState({ selected: "1" })
            } else if (this.props.location.pathname.includes("history")) {
                this.setState({ selected: "4" })
            }
        }
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme == false)
                    this.setState({ faldaxLogo: _FALDAXLOGO, faldax: _FALDAX })
                else
                    this.setState({ faldax: _FALDAXWHITE, faldaxLogo: _WHITELOGO })
            }
        }
    }
    openNav() {
        /* console.log('open nav'); */
        if (document.getElementById("mySidenav2") !== undefined && document.getElementById("mySidenav2") !== null) {
            document.getElementById("mySidenav2").style.width = "250px";
            document.getElementById("main").style.marginRight = "250px";
            // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    }
    closeNav() {
        if (document.getElementById("mySidenav2") !== undefined && document.getElementById("mySidenav2") !== null) {
            document.getElementById("mySidenav2").style.width = "0";
            document.getElementById("main").style.marginRight = "0";
            document.body.style.backgroundColor = "white";
        }
    }

    logout() {
        let formData = {
            user_id: this.props.profileDetails.id,
            jwt_token: this.props.isLoggedIn
        }
        this.props.LogoutUser(this.props.isLoggedIn, formData)
        //this.props.Logout();
    }

    showComing = () => {
        this.setState({ comingSoon: true });
    }
    handleComing = (e) => {
        this.setState({ comingSoon: false });
    }

    comingCancel = (e) => {
        this.setState({ comingSoon: false, countryAccess: false, completeKYC: false });
    }
    send_email() {
        const values = { email: this.state.email_address };
        this.setState({ email_address: '' });
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        if (re.test(this.state.email_address)) {

            this.setState({ email_msg: "" })
            fetch(globalVariables.API_URL + "/users/email-subscription", {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
                .then(response => response.json())
                .then((responseData) => {
                    if (responseData.status == 500) {
                        this.openNotification1();
                    } else {
                        this.openNotification();
                        this.setState({ visible: false, email_msg: "" })
                    }
                })
                .catch(error => { /* console.log(error) */ })
        } else {

        }
    }
    tradeAccess() {
        if (this.props.profileDetails.is_allowed == true && this.props.profileDetails.is_kyc_done == true) {
            this.props.history.push('/trade');
        }
        else {
            if (this.props.profileDetails.is_allowed == false && this.props.profileDetails.is_kyc_done == false)
                this.setState({ completeKYC: true });
            else
                this.setState({ countryAccess: true });
        }
    }
    render() {
        let prof_name = this.props.profileDetails.first_name !== null && this.props.profileDetails.first_name !== undefined ? (this.props.profileDetails.first_name + " " + this.props.profileDetails.last_name) : "User";
        return (
            <Header_main id="main">
                <Logo>
                    <a href={globalVariables.WordpressSiteURL}>
                        <FALDAX_LOGO className="" src={this.state.faldaxLogo} />
                        <FALDAX src={this.state.faldax} />
                    </a>
                </Logo>
                <Menu_main
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    selectedKeys={this.state.selected}
                >
                    <Menu_item key="1" onClick={this.showComing}><NavLink className="Nav_selected" to="/dashboard">DASHBOARD</NavLink></Menu_item>
                    <Menu_item key="2" onClick={this.tradeAccess}>TRADE</Menu_item>
                    <Menu_item key="3" onClick={this.showComing}><NavLink className="Nav_selected" to="/wallet">Wallet</NavLink></Menu_item>
                    <Menu_item key="4" onClick={this.showComing}><NavLink className="Nav_selected" to="/history">HISTORY</NavLink></Menu_item>
                    {/* <Menu_item key="1" onClick={this.showComing}><LogNav>DASHBOARD</LogNav></Menu_item>
                    <Menu_item key="2" onClick={this.showComing}><LogNav>TRADE</LogNav></Menu_item>
                    <Menu_item key="3" onClick={this.showComing}><LogNav>Wallet</LogNav></Menu_item>
                    <Menu_item key="4" onClick={this.showComing}><LogNav>HISTORY</LogNav></Menu_item> */}
                </Menu_main>
                <RightCol>
                    <Afterlog {...this.props} prof_name={prof_name} openNav={() => this.openNav()} />
                </RightCol>
                <ReactSwipeEvents
                    onSwipedRight={() => { this.closeNav() }}
                >
                    <SideNav id="mySidenav2">
                        <Close href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</Close>
                        <LogoutStyle><Link to="/editProfile">PROFILE</Link></LogoutStyle>
                        <span> <Link to="/dashboard">DASHBOARD</Link></span>
                        <span onClick={this.tradeAccess}>TRADE</span>
                        <span> <Link to="/wallet">WALLET</Link></span>
                        <span> <Link to="/history">HISTORY</Link></span>
                        <span><CarLink to="/careers">Careers</CarLink></span>
                        <LogoutStyle onClick={this.logout.bind(this)}> LOGOUT </LogoutStyle>
                    </SideNav>
                </ReactSwipeEvents>
                <ComingSoon comingCancel={(e) => this.comingCancel(e)} visible={this.state.comingSoon} />
                <CountryAccess comingCancel={(e) => this.comingCancel(e)} visible={this.state.countryAccess} />
                <CompleteKYC comingCancel={(e) => this.comingCancel(e)} visible={this.state.completeKYC} />
            </Header_main>
        );
    }
}

function mapStateToProps(state) {
    return ({
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    });
}
const mapDispatchToProps = dispatch => ({
    // Logout: () => dispatch(Logout()),
    LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoggedNavigation));
