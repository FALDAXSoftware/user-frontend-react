/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card, Cardimport, Modal } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

/* Components */
import Login_Form from "../Landing/User_forms/Login_Form"
import Signup_Form from "../Landing/User_forms/Signup_Form"
import Forgot_Form from "../Landing/User_forms/Forgot_Form"
import Beforelog from "./BeforeLog"
import Afterlog from "./Afterlog"
import Reset_Form from "../Landing/User_forms/Reset_Form"

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

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



class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modal: undefined,
            forgotParam:undefined
        }
    }

    /* openNav() {
        console.log('open nav');
        if (document.getElementById("mySidenav") !== undefined && document.getElementById("mySidenav") !== null) {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginRight = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    } */
    /* closeNav() {
        if (document.getElementById("mySidenav") !== undefined && document.getElementById("mySidenav") !== null) {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginRight = "0";
            document.body.style.backgroundColor = "white";
        }
    } */
    dispModal(pressed) {
        /* console.log(pressed) */
        if (pressed == "login")
            this.setState({ modal: 0 })
        else if (pressed == "signup")
            this.setState({ modal: 1 })
        else
            this.setState({ modal: 2 })
        this.showModal();
        this.setState({forgotParam:undefined})
    }
    showModal = () => {
        /* console.log('show modal'); */
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        /* console.log(e); */
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        /* console.log(e); */
        this.setState({
            visible: false,
        });
    }
    componentDidMount()
    {
        let queryParams
        if(this.props.queryParams!==undefined )
        {
            queryParams = this.props.queryParams;
            this.setState({forgotParam:queryParams.split("="),
                visible:true
            })
        }
    }

    render() {
        return (
            <Header_main id="main">
                <Logo onClick = { () => this.props.history.push("/login")}>
                    <FALDAX_LOGO className="" src="./images/Homepage/Faldax_logo.png" />
                    <FALDAX src="./images/Homepage/faldax.png" />
                </Logo>
                <Menu_main
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    {/* <Menu_item key="1">HOME</Menu_item>
                    <Menu_item key="2">FEATURES</Menu_item>
                    <Menu_item key="3">ABOUT</Menu_item>
                    <Menu_item key="4">SECURITY</Menu_item>
                    <Menu_item key="5">NEWS</Menu_item>
                    <Menu_item key="6">CONTACT</Menu_item>
                    <Menu_item key="7">LIST YOUR TOKEN/COIN</Menu_item>
                    <Menu_item key="8">EXCHANGE</Menu_item> */}
                </Menu_main>
                <Right_div>
                    {this.props.isLoggedIn?<Afterlog {...this.props} openNav={() => this.openNav()}/>:
                        <Beforelog {...this.props} dispModal={(pressed)=>this.dispModal(pressed)} openNav={() => this.openNav()}/>
                    }
                </Right_div>
                    {/* <SideNav id="mySidenav">
                    <Close href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</Close>
                    <Login_SignUp>
                        <div>
                            <LOG onClick={this.dispModal.bind(this, "login")}>LOGIN</LOG>
                            <SIGN onClick={this.dispModal.bind(this, "signup")}>SIGNUP</SIGN>
                        </div>
                    </Login_SignUp>
                    <a href="#">Home</a>
                    <a href="#">Features</a>
                    <a href="#">About</a>
                    <a href="#">Security</a>
                    <a href="#">News</a>
                    <a href="#">Contact</a>
                    <a href="#">List Your Token/Coin</a>
                    <a href="#">Exchange</a>
                    <Why> Careers </Why>
                    <Why> Language </Why>
                </SideNav>  */}
                <div>
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        className="Login-Modal"
                        style={{borderRadius:"0px"}}
                        bodyStyle={{ padding:"0px" }}
                        width="100%"
                    >
                        <Row>
                            <Left_col xl={{span:12}} sm={{span:24}}>
                                {/* console.log(this.state.modal) */}
                                {
                                    this.state.modal==0 || (this.state.forgotParam!==undefined && this.props.pathname.includes("login"))?
                                    <Login_Form {...this.props} forgotParam={this.state.forgotParam} dispModal={(pressed)=>this.dispModal(pressed)}/>:""
                                }
                                {
                                    this.state.modal==1?
                                    <Signup_Form {...this.props} dispModal={(pressed)=>this.dispModal(pressed)}/>:""
                                }
                                {
                                    this.state.modal==2?
                                    <Forgot_Form {...this.props} dispModal={(pressed)=>this.dispModal(pressed)}/>:""
                                }
                                {
                                    /* console.log(this.state.forgotParam) */
                                }
                                {
                                    this.state.forgotParam!==undefined && this.props.pathname.includes("reset-password")?
                                    <Reset_Form {...this.props} forgotParam={this.state.forgotParam} dispModal={(pressed)=>this.dispModal(pressed)}/>:""
                                }
                            </Left_col>
                            <Right_Col xl={{span:12}} sm={{span:24}}>
                                <Logo_text_wrap>
                                    <Faldaxlogo src="./images/Homepage/Faldax_Login.png"/>
                                    <Faldaxtext src="./images/Homepage/Faldax_Login_text.png"/>
                                </Logo_text_wrap>
                            </Right_Col>
                        </Row>
                    </Modal>
                    </div>
            </Header_main>
        );
    }
}

function mapStateToProps(state,ownProps){
    /* console.log(state,ownProps) */
    return ({
        isLoggedIn:state.simpleReducer.isLoggedIn?true:false,
        queryParams:ownProps.location.search,
        pathname:ownProps.location.pathname
    });
}
const mapDispatchToProps = dispatch => ({

})
  
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);