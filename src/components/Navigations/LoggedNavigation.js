/* IN-built */
import React, { Component } from 'react';
import { Layout, Menu, Modal,Input,Button } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

/* Components */
import Afterlog from "./Afterlog"
import { Logout } from '../../Actions/Auth';
import {globalVariables} from "../../Globals"
const { Header } = Layout;

/* Styled Components */
const FALDAX = styled.img`
    cursor:pointer;
    margin-left: 10px;
`
const Logo = styled.div`
    margin-top: 6px;
    display:inline-block;
    text-align:left;
    cursor:pointer;
`
const Header_main = styled(Header)`
    position:fixed;
    z-index: 1000;
    width : 100%;
    padding:0;
    text-align:left;
    background-color:white;
    box-shadow: 0px 3px #f7f7f7;
    height :80px;
`
const Menu_main = styled(Menu)`
    display:inline-block;
    margin-left:74px;
    text-align: right;
    border-bottom:0px;
    vertical-align: middle;

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
    color: rgb( 40, 37, 40 );
    font-weight: bold;
    text-transform: uppercase;      
    vertical-align: unset;
    float: left;
    border-bottom:0px !important;

    @media(max-width:1365px)
    {
        padding:0px 8px;
    }
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
    background-image: url(./images/Homepage/wallpaper.png);
    width: 0px;
    color: white;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    a
    {
        padding: 8px 32px;
        text-decoration: none;
        font-size: 18px;
        display: block;
        transition: 0.5s;
        line-height: 1.5;
        color:white;
    }
    @media(min-width: 1200px)
    {
        display: none;
    }
`

const Close = styled.a`
    text-align:right;
`
const Profile = styled.a`
    @media(min-width: 361px)
    {
        display: none !important;
    }
`
const LogoutStyle = styled.a`
    @media(min-width: 361px)
    {
        display: none !important;
    }
`

class LoggedNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modal: 0,
            comingSoon: false,
        }
    }

    openNav() {
        /* console.log('open nav'); */
        if (document.getElementById("mySidenav2") !== undefined && document.getElementById("mySidenav2") !== null) {
            document.getElementById("mySidenav2").style.width = "250px";
            document.getElementById("main").style.marginRight = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
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

        this.props.Logout();
    }

    showComing = () => {
        this.setState({ comingSoon: true });
    }

    handleComing = (e) => {
        this.setState({ comingSoon: false });
    }

    comingCancel = (e) => {
        this.setState({ comingSoon: false });
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
            this.setState({ email_msg: "*email address not valid" })
        }
    }
    render() {
        let prof_name = this.props.profileDetails.first_name !== null && this.props.profileDetails.first_name !== undefined ? (this.props.profileDetails.first_name + " " + this.props.profileDetails.last_name) : "User";
        return (
            <Header_main id="main">
                <Logo onClick={() => this.props.history ? this.props.history.push("login") : ''}>
                    <FALDAX_LOGO className="" src="./images/Homepage/Faldax_logo.png" />
                    <FALDAX src="./images/Homepage/faldax.png" />
                </Logo>
                <Menu_main
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    <Menu_item onClick={this.showComing} key="1">DASHBOARD</Menu_item>
                    <Menu_item onClick={this.showComing} key="2">TRADE</Menu_item>
                    <Menu_item onClick={this.showComing} key="3">WALLET</Menu_item>
                    <Menu_item onClick={this.showComing} key="4">HISTORY</Menu_item>
                </Menu_main>
                <Afterlog {...this.props} prof_name={prof_name} openNav={() => this.openNav()} />
                <SideNav id="mySidenav2">
                    <Close href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</Close>
                    <Profile> PROFILE </Profile>
                    <a onClick={this.showComing} href="#">DASHBOARD</a>
                    <a onClick={this.showComing} href="#">TRACE</a>
                    <a onClick={this.showComing} href="#">WALLET</a>
                    <a onClick={this.showComing} href="#">HISTORY</a>
                    <LogoutStyle onClick={this.logout.bind(this)}> LOGOUT </LogoutStyle>
                </SideNav>
                <div>
                    <Modal
                            title={<img src="./images/Homepage/Footer_logo.png" />}
                            visible={this.state.comingSoon}
                            onOk={(e) => this.handleComing()}
                            onCancel={(e) => this.comingCancel(e)}
                            footer={null}
                            width={520}
                            height={150}
                            className="simple-maps"
                        >
                        <div>
                            <h3 style={{ fontSize: "32px" }}>Coming Soon</h3>
                            <label style={{ color: 'green' }}> Please enter your email to get updates of FALDAX: </label>
                            <Input placeholder="Please enter your email address" style={{ color: 'green', borderColor: 'green' }} value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); }} />
                            <div style={{ marginTop: '20px', minHeight: '20px' }}>
                                <Button style={{ float: 'right', color: 'green', borderColor: 'green' }} onClick={() => this.send_email()}> RECEIVE UPDATE </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </Header_main>
        );
    }
}
function mapStateToProps(state) {
    /*  console.log(state) */
    return ({
        profileDetails: state.simpleReducer.profileDetails ? state.simpleReducer.profileDetails.data[0] : ""
    });
}
const mapDispatchToProps = dispatch => ({
    Logout: () => dispatch(Logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoggedNavigation));
