/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Card,Row, Col , Button , Layout, Menu, Breadcrumb,Cardimport , Modal } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components'
import Login_Form from "./Login_Form"

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

/* Styled Components */
const FALDAX = styled.img`
    margin-left: 15px; 
`
const Logo = styled.div`
    margin-top: 6px;
    display:inline-block;
    text-align:left;
`
const Header_main = styled(Header)`
    position:fixed;
    z-index:1;
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
    padding:0px 15px;
    font-size: 13px;
    font-family: "OpenSans";
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
const Open = styled.span`
    display:none;
    @media(max-width:1200px)
    {
        display:inline-block;
        margin-right:15px;
    }
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
    a
    {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 18px;
        color: #818181;
        display: block;
        transition: 0.5s;
        line-height: 1.5;
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
const LOG = styled.li`
    display:inline-block;
    float:left;
`
const SIGN = styled.li`
    display:inline-block;
    float:right;
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
const Exchange = styled.div`
    display:inline;
    margin-right: 30px;
    border-right: 2px solid #f0f0f0;
    font-size: 13px;
    font-family: "OpenSans";
    color: rgb( 40, 37, 40 );
    font-weight: bold;
    text-transform: uppercase;
    padding-right: 24px;

    @media(max-width:1365px)
    {
        margin-right:10px;
        padding-right:10px;
    }
    @media(max-width:670px)
    {
        display:none;
    }
`
const Login_text = styled.span`
    font-size: 13px;
    font-family: "OpenSans";
    color: rgb( 0, 0, 0 );
    font-weight: bold;
    margin-right:15px;

    @media(max-width:480px)
    {
        display:none;
    }
    @media(max-width:1365px)
    {
        margin-right:10px;
    }
`
const Temp_button = styled(Button)`
    background-color:#0f477b;
    border-radius: 20px;
    margin-right:30px;

    @media(max-width:480px)
    {
        display:none;
    }
    @media(max-width:1365px)
    {
        margin-right: 10px;
    }
`
/* Modal Styled Components */
const Left_col = styled(Col)`

`
const Right_Col = styled(Col)`
    background-image:url("./images/Homepage/wallpaper.png");
    height:815px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: table;
`
const Logo_text_wrap = styled.div`
    display: table-cell;
    vertical-align: middle;
`
const Faldaxlogo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
`
const Faldaxtext = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
`
export default class Navigation extends React.Component
{
    state = { visible: false }
    openNav() {
        if(document.getElementById("mySidenav")!==undefined && document.getElementById("mySidenav")!==null)
        {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginRight = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    }
    closeNav() {
        if(document.getElementById("mySidenav")!==undefined && document.getElementById("mySidenav")!==null)
        {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginRight= "0";
            document.body.style.backgroundColor = "white";
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

    render()
    {
        return(
                    <Header_main id="main">
                        <Logo>
                                    <FALDAX_LOGO className="" src="./images/Homepage/Faldax_logo.png"/>
                                    <FALDAX src="./images/Homepage/faldax.png"/>
                        </Logo>
                        <Menu_main
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                        >
                            <Menu_item key="1">HOME</Menu_item>
                            <Menu_item key="2">FEATURES</Menu_item>
                            <Menu_item key="3">ABOUT</Menu_item>
                            <Menu_item key="4">SECURITY</Menu_item>
                            <Menu_item key="5">NEWS</Menu_item>
                            <Menu_item key="6">CONTACT</Menu_item>
                            <Menu_item key="7">LIST YOUR COIN</Menu_item>
                        </Menu_main>
                        <Right_div>
                            <div>
                                <Exchange>
                                    <span>EXCHANGE / WHY FALDAX</span>
                                </Exchange>
                                <Login_text onClick={this.showModal}>LOGIN</Login_text>
                                <Temp_button type="primary" size="large">Sign up</Temp_button>
                                <Open style={{fontSize:"30px", cursor:"pointer"}} onClick={this.openNav.bind(this)}>&#9776;</Open>
                            </div>
                        </Right_div>
                        <SideNav id="mySidenav">
                            <Close href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</Close>
                            <Login_SignUp>
                                <div>
                                <LOG>LOGIN</LOG>
                                <SIGN>SIGNUP</SIGN>
                                </div>
                            </Login_SignUp>
                            <a href="#">Home</a>
                            <a href="#">Features</a>
                            <a href="#">About</a>
                            <a href="#">Security</a>
                            <a href="#">News</a>
                            <a href="#">Contact</a>
                            <a href="#">List Your Coin</a>
                            <Why>Exchange/Why FALDAX</Why>
                        </SideNav> 
                        <div>
                            <Modal
                              visible={this.state.visible}
                              onOk={this.handleOk}
                              onCancel={this.handleCancel}
                              footer={null}
                              className="Login-Modal"
                              style={{borderRadius:"0px"}}
                              bodyStyle={
                                  {
                                      padding:"0px"
                                  }
                              }
                              width={1200}
                            >
                                <Row>
                                    <Left_col span={12}>
                                        <Login_Form/>
                                    </Left_col>
                                    <Right_Col span={12}>
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