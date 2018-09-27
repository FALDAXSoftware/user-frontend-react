/* IN-built */
import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logout } from '../../Actions/Auth';
import 'antd/dist/antd.css';

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
const Open = styled.span`
    display:none;
    margin-right: 10px;
    font-size: 30px;
    cursor: pointer;
    line-height: 76px;
    vertical-align: middle;
    
    @media(max-width:1200px)
    {
        display:inline-block;
        margin-right:15px;
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
const Right_div = styled.div`
    float: right;
    margin-top: 6px;

    @media(max-width:1200px)
    {
        margin-top:0px;
    }
`
const DropDownDiv = styled(Dropdown)`
    margin-right : 30px;

    @media(max-width:480px)
    {
        margin-top:10px;
    }
    @media(max-width:360px)
    {
        display: none;
    }
    
    @media(max-width:576px)
    {
        margin-right : 10px;
    }
`
const DownIcon = styled(Icon)`
   height: 10px;
   margin-bottom: 5px;
   padding-left: 10px;
   color: #dee2ed;
`
const AnchorName = styled.a`
  font-size: 13pt;
  font-weight: bold;
  font-family: "Open sans";
  color: #505050;

  @media(max-width:1200px)
  {
      margin-top:0px;
  }
`
const HeaderAvatar = styled(Avatar)`
    padding-right: 10px;
    margin-right: 10px;
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
const UserName = styled.div`
    display: inline-block;
    @media(max-width: 576px)
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
            modal: 0
        }
    }

    openNav() {
        console.log('open nav');
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

    render() {
        const DropdownItems = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => this.props.history.push('/edit-profile')}> Profile </a>
                </Menu.Item>
                <Menu.Item key="1" onClick={this.logout.bind(this)}>Logout</Menu.Item>
            </Menu>
        )

        return (
            <Header_main id="main">
                <Logo>
                    <FALDAX_LOGO className="" src="./images/Homepage/Faldax_logo.png" />
                    <FALDAX src="./images/Homepage/faldax.png" />
                </Logo>
                <Menu_main
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    <Menu_item key="1">DASHBOARD</Menu_item>
                    <Menu_item key="2">TRACE</Menu_item>
                    <Menu_item key="3">WALLET</Menu_item>
                    <Menu_item key="4">HISTORY</Menu_item>
                </Menu_main>
                <Right_div>
                        <DropDownDiv overlay={DropdownItems} trigger={['click']}>
                            <AnchorName className="ant-dropdown-link" href="#">
                                <HeaderAvatar size={35} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />
                                <UserName>
                                    Dwayne Johnson
                                    <DownIcon type="caret-down" theme="outlined" />
                                </UserName>
                            </AnchorName>
                        </DropDownDiv>
                        <Open style={{ fontSize:"30px", cursor:"pointer", lineHeight: '76px', verticalAlign: 'middle' }} onClick={this.openNav.bind(this)}>&#9776;</Open>
                </Right_div>
                <SideNav id="mySidenav2">
                    <Close href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</Close>
                    <Profile> PROFILE </Profile>
                    <a href="#">DASHBOARD</a>
                    <a href="#">TRACE</a>
                    <a href="#">WALLET</a>
                    <a href="#">HISTORY</a>
                    <LogoutStyle onClick={this.logout.bind(this)}> LOGOUT </LogoutStyle>
                </SideNav> 
            </Header_main>
        );
    }
}
function mapStateToProps(state){
    return state;
}
  const mapDispatchToProps = dispatch => ({
    Logout: () => dispatch(Logout())
   })
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoggedNavigation));
