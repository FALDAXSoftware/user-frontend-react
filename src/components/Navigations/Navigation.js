/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Card, Modal, Input, notification, Icon } from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { globalVariables } from '../../Globals'

/* Components */
import Login_Form from "../Landing/User_forms/Login_Form"
import Signup_Form from "../Landing/User_forms/Signup_Form"
import Forgot_Form from "../Landing/User_forms/Forgot_Form"
import Thank_You from "../Landing/User_forms/Thank_You"
import Beforelog from "./BeforeLog"
import Afterlog from "./Afterlog"
import Reset_Form from "../Landing/User_forms/Reset_Form"

const { Header } = Layout;

/* Modal Styled Components */
const Left_col = styled(Col)`
    min-height: 600px
`
const Right_Col = styled(Col)`
    background-image:url("./images/Homepage/wallpaper.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    @media(max-width:1200px)
    {
        display:none;
    }
`
const Logo_text_wrap = styled.div`
    display: table-cell;
    vertical-align: middle;
    top: calc(50% - 96px);
    position: absolute;
    width: 100%;
`
const Faldaxlogo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    cursor:pointer;
`
const Faldaxtext = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    cursor:pointer;
`

/* Styled Components */
const FALDAX = styled.img`

    margin-left: 15px;
    cursor:pointer;

    @media(max-width:1320px)
    {
        margin-top:3px;
    }
`
const Logo = styled.div`
    margin-top: 6px;
    display:inline-block;
    text-align:left;
    cursor:pointer;
`
const Header_main = styled(Header)`
    position:fixed;
    z-index:1000;
    width : 100%;
    padding:0;
    text-align:left;
    background-color:white;
    box-shadow: 0px 3px #f7f7f7;
    height :80px;
`
const Menu_main = styled(Menu)`
    display:inline-block;
    margin-left:40px;
    lineHeight: 64px;
    text-align: right;
    border-bottom:0px;
    vertical-align: middle;

    @media(max-width:1320px)
    {
        display:none;
    }
    @media(max-width:1540px)
    {
        margin-left: 15px;
    }
`
const Menu_item = styled(Menu.Item)`
    padding:0px 15px;
    font-size: 13px;
    font-family: "Open sans";
    color: rgb( 40, 37, 40 );
    font-weight: bold;
    text-transform: uppercase;
    vertical-align: unset;
    float: left;
    border-bottom:0px !important;

    @media(max-width:1540px)
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
    @media(min-width: 1320px)
    {
        display: none;
    }
`
const Login_SignUp = styled.a`
    display:none !important;
    div
    {
        list-style-type:none;
        padding-left:8px;
    }
    @media(max-width:480px)
    {
        display:block !important;
        height:50px;
    }
`
const LOG = styled.span`
    display:inline-block;
    float:left;
    color: #818181;
    &:hover{
        color:#1890ff !important;
    }
`
const SIGN = styled.span`
    display:inline-block;
    float:right;
    color: #818181;
`
const Why = styled.a`
    display:none !important;
    @media(max-width:670px)
    {
        display:block !important;
    }
`
const Close = styled.a`
    text-align:right;
`
const Right_div = styled.div`
    float: right;
    margin-top: 6px;

    @media(max-width:1200px)
    {
        margin-top:0px;
    }
`
const NavLink = styled(Link)`
    color: rgb( 40, 37, 40 ) !important;
    &:hover{
        color:#1890ff !important;
    }
`
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modal: undefined,
            forgotParam: undefined,
            comingSoon: false,
            email_address: "",
            email_msg: "",
            selected: []
        }
    }

    openNav() {
        /* console.log('open nav'); */
        if (document.getElementById("mySidenav") !== undefined && document.getElementById("mySidenav") !== null) {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginRight = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    }
    closeNav() {
        if (document.getElementById("mySidenav") !== undefined && document.getElementById("mySidenav") !== null) {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginRight = "0";
            document.body.style.backgroundColor = "white";
        }
    }
    dispModal(pressed) {
        /* console.log(pressed) */
        if (pressed == "login")
            this.setState({ modal: 0 })
        else if (pressed == "signup")
            this.setState({ modal: 1 })
        else if (pressed == "thankyou")
            this.setState({ modal: 4 });
        else
            this.setState({ modal: 2 })
        this.showModal();
        this.setState({ forgotParam: undefined })
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    handleOk = (e) => {
        this.setState({ visible: false });
    }

    handleCancel = (e) => {
        console.log("Hello 123")
        this.setState({ visible: false, modal: 5 });
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
    openNotification() {
        notification.open({
            message: 'Thank You',
            description: 'You will recieve an Email shortly',
            duration: 6,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    };
    openNotification1() {
        notification.open({
            message: 'Subscribed',
            description: 'You have already Subscribed for FALDAX.',
            duration: 6,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    };
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
    componentDidMount() {
        let queryParams
        /* console.log("asdfas",this.props) */
        if (this.props.queryParams !== undefined && this.props.queryParams !== "") {
            queryParams = this.props.queryParams;
            this.setState({
                forgotParam: queryParams.split("="),
                visible: true
            })
        }
        if (this.props.location.pathname == "/about-us") {
            this.setState({ selected: ['2'] })
        }
        else {
            this.setState({ selected: ['1'] })
        }
    }
    render() {
        let prof_name = this.props.profileDetails.first_name !== null && this.props.profileDetails.first_name !== undefined ? (this.props.profileDetails.first_name + " " + this.props.profileDetails.last_name) : "User";
        const { modal } = this.state;

        return (
            <Header_main id="main">
                <Logo onClick={() => this.props.history ? this.props.history.push("/login") : ''}>
                    <FALDAX_LOGO className="" src="./images/Homepage/Faldax_logo.png" />
                    <FALDAX src="./images/Homepage/faldax.png" />
                </Logo>
                <Menu_main
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    selectedKeys={this.state.selected}
                >
                    <Menu_item key="1"><NavLink className="Nav_selected" to="/">HOME</NavLink></Menu_item>
                    {/* <Menu_item key="2" onClick={this.showComing}>FEATURES</Menu_item> */}
                    <Menu_item key="2"><NavLink className="Nav_selected" to="/about-us">ABOUT</NavLink></Menu_item>
                    <Menu_item key="3" onClick={this.showComing}>SECURITY</Menu_item>
                    <Menu_item key="4" onClick={this.showComing}>NEWS</Menu_item>
                    <Menu_item key="5" onClick={this.showComing}>CONTACT</Menu_item>
                    <Menu_item key="6" onClick={this.showComing}>LIST YOUR TOKEN</Menu_item>
                    <Menu_item key="7" onClick={this.showComing}>EXCHANGE</Menu_item>
                </Menu_main>
                {/* console.log(this.props) */}
                <Right_div>
                    {this.props.isLoggedIn ? <Afterlog {...this.props} prof_name={prof_name} openNav={() => this.openNav()} /> :
                        <Beforelog {...this.props} dispModal={(pressed) => this.dispModal(pressed)} openNav={() => this.openNav()} />
                    }
                </Right_div>
                <SideNav id="mySidenav">
                    <Close href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</Close>
                    <Login_SignUp>
                        <div>
                            <LOG onClick={this.dispModal.bind(this, "login")}>LOGIN</LOG>
                            <SIGN onClick={this.dispModal.bind(this, "signup")}>SIGNUP</SIGN>
                        </div>
                    </Login_SignUp>
                    <Link to="/">Home</Link>
                    <a onClick={this.showComing} href="#">Features</a>
                    <Link to="/about-us">About</Link>
                    <a onClick={this.showComing} href="#">Security</a>
                    <a onClick={this.showComing} href="#">News</a>
                    <a onClick={this.showComing} href="#">Contact</a>
                    <a onClick={this.showComing} href="#">List Your Token</a>
                    <a onClick={this.showComing} href="#">Exchange</a>
                    <Why> Careers </Why>
                    <Why> Language </Why>
                </SideNav>
                <div>
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        className="Login-Modal"
                        style={{ borderRadius: "0px" }}
                        bodyStyle={{ padding: "0px" }}
                        width="70%"
                    >
                        <Row>
                            <Left_col xl={{ span: 12 }} sm={{ span: 24 }}>
                                {/* console.log(this.state.modal) */}
                                {/* console.log(this.state.modal) */}
                                {
                                    modal == 0 || (this.state.forgotParam !== undefined && this.props.pathname.includes("login")) ?
                                        <Login_Form {...this.props} init="" forgotParam={this.state.forgotParam} dispModal={(pressed) => this.dispModal(pressed)} /> : ""
                                }
                                {
                                    modal == 1 ?
                                        <Signup_Form {...this.props} init="" dispModal={(pressed) => this.dispModal(pressed)} /> : ""
                                }
                                {
                                    modal == 2 ?
                                        <Forgot_Form {...this.props} init="" dispModal={(pressed) => this.dispModal(pressed)} /> : ""
                                }
                                {
                                    modal == 4 ?
                                        <Thank_You {...this.props} /> : ""
                                }
                                {
                                    this.state.forgotParam !== undefined && this.props.pathname.includes("reset-password") ?
                                        <Reset_Form {...this.props} forgotParam={this.state.forgotParam} dispModal={(pressed) => this.dispModal(pressed)} /> : ""
                                }
                            </Left_col>
                            <Right_Col xl={{ span: 12 }} sm={{ span: 24 }}>
                                <Logo_text_wrap>
                                    <Faldaxlogo src="./images/Homepage/Faldax_Login.png" />
                                    <Faldaxtext src="./images/Homepage/Faldax_Login_text.png" />
                                </Logo_text_wrap>
                            </Right_Col>
                        </Row>
                    </Modal>
                </div>
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
                            <h3 style={{ fontSize: "32px", textAlign: "center" }}>Coming Soon</h3>
                            <label style={{ color: '#00a7ff' }}> Please enter your email to get updates of FALDAX: </label>
                            <Input placeholder="Please enter your email address" style={{ color: '#00a7ff', borderColor: '#00a7ff' }} value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); }} />
                            <div style={{ marginTop: '20px', minHeight: '20px' }}>
                                <Button style={{ float: 'right', color: '#00a7ff', borderColor: '#00a7ff' }} onClick={() => this.send_email()}> RECEIVE UPDATE </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </Header_main>
        );
    }
}

function mapStateToProps(state, ownProps) {
    /* console.log(state,ownProps) */
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn ? true : false,
        queryParams: ownProps && ownProps.location && ownProps.location.search ? ownProps.location.search : '',
        pathname: ownProps && ownProps.location && ownProps.location.pathname ? ownProps.location.pathname : '',
        profileDetails: state.simpleReducer.profileDetails ? state.simpleReducer.profileDetails.data[0] : ""
    });
}
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
