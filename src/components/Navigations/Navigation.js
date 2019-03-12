/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Layout, Menu, Modal, Button } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* Components */
import Login_Form from "../Landing/User_forms/Login_Form"
import Signup_Form from "../Landing/User_forms/Signup_Form"
import Forgot_Form from "../Landing/User_forms/Forgot_Form"
import Thank_You from "../Landing/User_forms/Thank_You"
import Beforelog from "./BeforeLog"
import Afterlog from "./Afterlog"
import { LogoutUser } from '../../Actions/Auth';
import Reset_Form from "../Landing/User_forms/Reset_Form"
import ComingSoon from '../ComingSoon';
import ReactSwipeEvents from 'react-swipe-events'
import { Spin_Ex } from '../../styled-components/homepage/style'
import { Spin } from 'antd';
import {
    FaldaxLogo, FaldaxWhite, WhiteLogo, Faldax, FaldaxLogin, FaldaxLoginText, Wallpaper
} from "../../Constants/images";

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

/* Modal Styled Components */
const Left_col = styled(Col)`
    min-height: 600px
`
const DropMenu = styled(Menu)`
    background: none;
    color: white;
`
const SubMenuNav = styled(SubMenu)`
    background: none;
    color: white;
    >.ant-menu-submenu-title
    {
        padding-left:0px !important;
        font-size: 18px;
        line-height:25px !important;
        height:25px !important;
        margin-top: 0px;
        margin-bottom: 0px;
    }
    & .ant-menu-item
    {
        padding-left:30px !important;
    }
    & .ant-menu-item:after
    {
        border-right:none;
    }
    & .ant-menu-item>a
    {
        color:white;
    }
    & .ant-menu-item>a:hover{
        color:#1890ff !important;
    }
    & .ant-menu-item-selected
    {
        background-color:transparent !important;
        color:white;
        border-right:none;
    }
    & .ant-menu-item-selected>a
    {
        color:white !important;
        font-weight: normal !important;
    }
    >.ant-menu
    {
        background:none;
    }
    >.ant-menu-submenu-title>.ant-menu-submenu-arrow:before 
    {
        color:white;
        background-image: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255));
    }
    >.ant-menu-submenu-title>.ant-menu-submenu-arrow:after 
    {
        background-image: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255));
    }
`
const Right_Col = styled(Col)`
    background-image:url(${Wallpaper});
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
    margin-top:20px;
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
    display:inline-block;
    text-align:left;
    cursor:pointer;
    height: 100%;
    display: inline-flex;
    align-items: center;
`
const Header_main = styled(Header)`
    position:fixed;
    z-index:1000;
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
    margin-left:40px;
    lineHeight: 1px;
    text-align: right;
    border-bottom:0px;
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    @media(max-width:1200px)
    {
        display:none;
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
    background-image: url(${Wallpaper});
    width: 0px;
    color: white;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    >a
    {
        padding: 8px 32px;
        text-decoration: none;
        font-size: 18px;
        display: block;
        transition: 0.5s;
        line-height: 1.5;
        color:white;
    }
    >a:hover{
        color:#1890ff !important;
    }
    & .ant-menu-inline
    {
        border-right:none;
    }
    @media(min-width: 1320px)
    {
        display: none;
    }
    @media(min-width:576px)
    {
        & .DROP
        {
        display:none;
        }
    }
`
const Login_SignUp = styled.a`
    display:none !important;
    div
    {
        list-style-type:none;
        
    }
    @media(max-width:480px)
    {
        display:block !important;        
        height:50px;
    }
`
const LOG = styled.span`
    display:inline-block;
    width:50%;
    color: white;
    &:hover{
        color:#1890ff !important;
        text-decoration:underline;
    }
`
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
`
const Fin_sign = styled.a`
    text-decoration: none;
    font-size: 18px;
    display: inline-flex;
    margin-left:auto;
    transition: 0.5s;
    line-height: 1.5;
    color: white;
`
const Fin_log = styled.a`
text-decoration: none;
font-size: 18px;
transition: 0.5s;
line-height: 1.5;
color: white;
`
const Fin_div = styled.div`
    padding: 0px 32px;
    display:none;
    @media(max-width:480px)
    {
        display:flex;
        align-items:center;
    }
`
const Why = styled.a`
    padding:0px !important;
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
    margin-left:auto;
    height:100%;
`
const NavLink = styled(Link)`
    color: ${props => props.theme.mode == "dark" ? "white" : "black"} !important;
    &:hover{
        color:#1890ff !important;
    }
`
const ProfileLinkContainer = styled.div`
    >a
    {
        padding: 8px 32px;
        text-decoration: none;
        font-size: 18px;
        display: block;
        transition: 0.5s;
        line-height: 1.5;
        color:white;
    }
    >a:hover{
        color:#1890ff !important;
    }
    @media(min-width:361px)
    {
        display: none;
    }
`
const CarLink = styled(Link)`
    @media(min-width:671px)
    {
        display:none !important;
    }
`
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
        }
    }

    openNav() {
        /* console.log('open nav'); */
        if (document.getElementById("mySidenav") !== undefined && document.getElementById("mySidenav") !== null) {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginRight = "250px";
            // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
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
        if (pressed == "login")
            this.props.history.push("/login")
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
        this.setState({ visible: false, modal: 5 });
    }
    handleAfterClose = (e) => {
        this.setState({ modal: 5 });
    }
    comingCancel = (e) => {
        this.setState({ comingSoon: false });
    }
    showComing = () => {
        this.setState({ comingSoon: true });
    }
    componentWillReceiveProps(props, newProps) {
        if (props.theme !== undefined) {
            if (props.theme !== this.state.theme) {
                if (props.theme == false)
                    this.setState({ faldaxLogo: FaldaxLogo, faldax: Faldax })
                else
                    this.setState({ faldax: FaldaxWhite, faldaxLogo: WhiteLogo })
            }
        }
        if (props.location.pathname !== undefined)
            if (props.location.pathname == "/login") {
                if (props.location.hash == "#openTicket") {
                    this.setState({ modal: 0, visible: true });
                }
            }
    }
    componentDidMount() {
        if (this.props.location.pathname !== undefined)
            if (this.props.location.pathname == "/login") {
                if (this.props.location.hash == "#openTicket") {
                    this.setState({ modal: 0, visible: true });
                }
            }
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme == false)
                    this.setState({ faldaxLogo: FaldaxLogo, faldax: Faldax })
                else
                    this.setState({ faldax: FaldaxWhite, faldaxLogo: WhiteLogo })
            }
        }

        let queryParams

        if (this.props.location.pathname == "/signup") {
            queryParams = decodeURIComponent(this.props.queryParams)
            let qP = queryParams.split("=")
            this.setState({ modal: 1, visible: true, qP: qP[1] });
        } else {
            if (this.props.queryParams !== undefined && this.props.queryParams !== "") {
                queryParams = this.props.queryParams;
                this.setState({
                    forgotParam: queryParams.split("="),
                    visible: true
                })
            }
        }
        if (this.props.location.pathname == "/about-us") {
            this.setState({ selected: ['2'] })
        } else if (this.props.location.pathname == "/contactus") {
            this.setState({ selected: ['6'] })
        } else if (this.props.location.pathname == "/blogs") {
            this.setState({ selected: ['3'] })
        } else if (this.props.location.pathname == "/addcoin") {
            this.setState({ selected: ['7'] })
        } else if (this.props.location.pathname.includes("news")) {
            this.setState({ selected: ['5'] })
        } else {
            if (this.props.location.pathname == "/")
                this.setState({ selected: ['1'] })
            else
                this.setState({ selected: ['0'] })
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
    render() {
        let prof_name = this.props.profileDetails.first_name !== null && this.props.profileDetails.first_name !== undefined ? (this.props.profileDetails.first_name + " " + this.props.profileDetails.last_name) : "User";
        const { modal } = this.state;
        return (
            <div>
                <Header_main id="main">
                    <Logo>
                        <Link to="/">
                            <FALDAX_LOGO className="" src={this.state.faldaxLogo} />
                            <FALDAX src={this.state.faldax} />
                        </Link>
                    </Logo>
                    <Menu_main
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        selectedKeys={this.state.selected}
                    >
                        <Menu_item key="1"><NavLink className="Nav_selected" to="/">HOME</NavLink></Menu_item>
                        {/* <Menu_item key="2" onClick={this.showComing}>FEATURES</Menu_item> */}
                        <Menu_item key="2"><NavLink className="Nav_selected" to="/about-us">ABOUT</NavLink></Menu_item>
                        <Menu_item key="3"><NavLink className="Nav_selected" to="/blogs">BLOG</NavLink></Menu_item>
                        <Menu_item key="4" onClick={this.showComing}><NavLink className="Nav_selected" to="#">SECURITY</NavLink></Menu_item>
                        <Menu_item key="5" ><NavLink className="Nav_selected" to="/news">NEWS</NavLink></Menu_item>
                        <Menu_item key="6" ><NavLink className="Nav_selected" to="/contactus">CONTACT</NavLink></Menu_item>
                        <Menu_item key="7" ><NavLink className="Nav_selected" to="/addcoin">LIST YOUR TOKEN</NavLink></Menu_item>
                        <Menu_item key="8" onClick={this.showComing}><NavLink className="Nav_selected" to="#">EXCHANGE</NavLink></Menu_item>
                    </Menu_main>
                    {/* console.log(this.props) */}
                    <Right_div>
                        {this.props.isLoggedIn ? <Afterlog {...this.props} prof_name={prof_name} openNav={() => this.openNav()} /> :
                            <Beforelog {...this.props} dispModal={(pressed) => this.dispModal(pressed)} openNav={() => this.openNav()} />
                        }
                    </Right_div>
                    <ReactSwipeEvents
                        onSwipedRight={() => { this.closeNav() }}
                    >
                        <SideNav id="mySidenav">
                            <Close href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</Close>
                            {!this.props.isLoggedIn &&
                                <Fin_div>
                                    <Fin_log onClick={this.dispModal.bind(this, "login")}><ButtonLog type="primary">Login</ButtonLog></Fin_log>
                                    <Fin_sign onClick={this.dispModal.bind(this, "signup")}><ButtonLog type="primary">Signup</ButtonLog></Fin_sign>
                                </Fin_div>
                            }
                            <Link to="/">Home</Link>
                            {/* <a onClick={this.showComing} href="#">Features</a> */}
                            <Link to="/about-us">About</Link>
                            <Link to="/blogs">Blog</Link>
                            <a onClick={this.showComing} href="#">Security</a>
                            <Link to="/news">News</Link>
                            <Link to="/contactus">Contact</Link>
                            <Link to="/addcoin">List Your Token</Link>
                            <a onClick={this.showComing} href="#">Exchange</a>
                            {this.props.isLoggedIn ? <CarLink to="/careers">Careers</CarLink> : ""}
                            {/* <Why> Language </Why> */}
                            <a className="DROP">
                                <DropMenu mode="inline">
                                    <SubMenuNav key="sub1" title={'Information'}>
                                        <Menu.Item key="9"><Link to="/about-us">About Us</Link></Menu.Item>
                                        <Menu.Item key="10"><Link to="/contactus">Contact Us</Link></Menu.Item>
                                        <Menu.Item key="11"><Link to="/mediacontact">Media Contact</Link></Menu.Item>
                                        {/* <Menu.Item key="12"><Link to="/blogs">Blog</Link></Menu.Item> */}
                                        <Menu.Item key="13"><Link to="/fees">Fees</Link></Menu.Item>
                                    </SubMenuNav>
                                </DropMenu>
                            </a>
                            <a className="DROP">
                                <DropMenu mode="inline">
                                    <SubMenuNav key="sub2" title={'Support'}>
                                        <Menu.Item key="9"><a onClick={this.showComing} href="#">Open a Ticket</a></Menu.Item>
                                        <Menu.Item key="10"><a onClick={this.showComing} href="#">FAQ</a></Menu.Item>
                                        <Menu.Item key="11"><a onClick={this.showComing} href="#">API Documentation</a></Menu.Item>
                                        <Menu.Item key="12"><Link to="/addcoin">List Your Token</Link></Menu.Item>
                                        <Menu.Item key="12"><Link to="/news">News</Link></Menu.Item>
                                    </SubMenuNav>
                                </DropMenu>
                            </a>
                            <a className="DROP">
                                <DropMenu mode="inline">
                                    <SubMenuNav key="sub3" title={'Legal & Technical'}>
                                        <Menu.Item key="9"><Link to="/policy">Policies</Link></Menu.Item>
                                        <Menu.Item key="10"><a onClick={this.showComing} href="#">Service Availability</a></Menu.Item>
                                        <Menu.Item key="11"><a onClick={this.showComing} href="#">Security</a></Menu.Item>
                                    </SubMenuNav>
                                </DropMenu>
                            </a>
                            {this.props.isLoggedIn &&
                                <ProfileLinkContainer>
                                    <Link to="/editProfile">Profile</Link>
                                    <a onClick={this.logout.bind(this)}>Logout</a>
                                </ProfileLinkContainer>
                            }
                        </SideNav>
                    </ReactSwipeEvents>
                    <div>
                        <Modal
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            afterClose={this.handleAfterClose}
                            footer={null}
                            className="Login-Modal"
                            style={{ borderRadius: "0px" }}
                            bodyStyle={{ padding: "0px" }}
                            width="70%"
                        >
                            <Row>
                                <Left_col xl={{ span: 12 }} sm={{ span: 24 }}>
                                    {
                                        modal == 0 || (this.state.forgotParam !== undefined && this.props.pathname.includes("login")) ?
                                            <Login_Form {...this.props} init="" forgotParam={this.state.forgotParam} dispModal={(pressed) => this.dispModal(pressed)} /> : ""
                                    }
                                    {
                                        modal == 1 ?
                                            <Signup_Form {...this.props} init="" dispModal={(pressed) => this.dispModal(pressed)} qP={this.state.qP} /> : ""
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
                                        <Faldaxlogo src={FaldaxLogin} />
                                        <Faldaxtext src={FaldaxLoginText} />
                                    </Logo_text_wrap>
                                </Right_Col>
                            </Row>
                        </Modal>
                    </div>
                    <ComingSoon comingCancel={(e) => this.comingCancel(e)} visible={this.state.comingSoon} />
                </Header_main>
                {/* (this.props.loader == true) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : "" */}
            </div >
        );
    }
}

function mapStateToProps(state, ownProps) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn ? true : false,
        queryParams: ownProps && ownProps.location && ownProps.location.search ? ownProps.location.search : '',
        pathname: ownProps && ownProps.location && ownProps.location.pathname ? ownProps.location.pathname : '',
        profileDetails: state.simpleReducer.profileDetails ? state.simpleReducer.profileDetails.data[0] : "",
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        loader: state.simpleReducer.loader ? state.simpleReducer.loader : false
    });
}
const mapDispatchToProps = dispatch => ({
    //Logout: () => dispatch(Logout()),
    LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
