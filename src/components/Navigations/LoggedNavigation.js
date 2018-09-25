/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'

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
const Right_div = styled.div`
    float: right;
    margin-top: 6px;

    @media(max-width:1200px)
    {
        margin-top:0px;
    }
`
const DropDownDiv = styled.div`
    margin-right : 30px;
`
const DownIcon = styled(Icon)`
   height: 10px;
   margin-bottom: 5px;
   padding-left: 20px;
   color: #dee2ed;
`
const AnchorName = styled.a`
  font-size: 13pt;
  font-weight: bold;
  font-family: "Open sans";
  color: #505050;
`
const HeaderAvatar = styled(Avatar)`
    padding-right: 10px;
    margin-right: 10px;
`

class LoggedNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const DropdownItems = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => this.props.history.push('/edit-profile')}> Profile </a>
                </Menu.Item>
                <Menu.Item key="1">Logout</Menu.Item>
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
                    <DropDownDiv>
                        <Dropdown overlay={DropdownItems} trigger={['click']}>
                            <AnchorName className="ant-dropdown-link" href="#">
                                <HeaderAvatar size={35} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />
                                Dwayne Johnson
                                <DownIcon type="caret-down" theme="outlined" />
                            </AnchorName>
                        </Dropdown>
                    </DropDownDiv>
                </Right_div>
            </Header_main>
        );
    }
}

export default withRouter(LoggedNavigation);
