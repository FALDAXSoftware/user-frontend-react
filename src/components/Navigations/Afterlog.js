import styled from 'styled-components';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card, Cardimport, Modal, Dropdown, Icon, Avatar, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

/* Components */
import { Logout } from '../../Actions/Auth';
import { Day_night_mode, Exchange } from "./BeforeLog"
/* Constants */
import { globalVariables } from '../../Globals'

/* Styled-Components */
const Right_div = styled.div`
    float: right;
    display: flex;
    align-items: center;
    height:100%;
`
const UserName = styled.div`
    display: inline-block;
    font-size: 13px;
    font-family: "Open sans";
    color: rgb( 80, 80, 80 );
    font-weight: bold;
    @media(max-width: 576px)
    {
        display: none;
    }
`
const Open = styled.span`
    display:none;
    margin-right: 10px;
    font-size: 30px;
    cursor: pointer;
    margin-top:10px;
    @media(max-width:1200px)
    {
        display:inline-block;
        margin-right:15px;
    }
`
const HeaderAvatar = styled.div`
    margin-right:10px;
    height: 35px;
    width: 35px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
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
  text-transform: capitalize;
  @media(max-width:1200px)
  {
      margin-top:0px;
  }
`
const Bell = styled.div`
display:inline;
    font-size: 13px;
    padding-right: 10px;
    cursor:pointer;
`


class Afterlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comingSoon: false
        };
    }
    handleComing = (e) => {
        this.setState({ comingSoon: false });
    }

    comingCancel = (e) => {
        this.setState({ comingSoon: false });
    }
    openNav() {
        this.props.openNav();
    }
    logout() {
        /* console.log("hello Logout") */
        this.props.Logout();
    }
    render() {
        const DropdownItems = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => this.props.history.push('/editProfile')}> Profile </a>
                </Menu.Item>
                <Menu.Item key="1" onClick={this.logout.bind(this)}>Logout</Menu.Item>
            </Menu>
        )
        let Avatar_img
        if (this.props.profileDetails !== undefined) {
            if (this.props.profileDetails.profile_pic !== null && this.props.profileDetails.profile_pic !== undefined && this.props.profileDetails.profile_pic !== "") {
                /* console.log("aaaaaaaaaa") */
                Avatar_img = globalVariables.amazon_Bucket + this.props.profileDetails.profile_pic;
            }
            else {
                /* console.log("vbbbbbbbbbbbbb") */
                Avatar_img = "./images/Settings/def_profile.png";
            }
        }
        return (
            <Right_div>
                {/*  <Bell>
                    <Icon  style={{fontSize:"15px",color:"black"}} type="bell" theme="filled" />      
                </Bell>
                <Day_night_mode>
                    <span> <FontAwesomeIcon icon={faMoon} color='black' style={{transform: 'rotate(315deg)'}} /> </span>
                </Day_night_mode>
                <Exchange>
                            <span  onClick={this.showComing}> CAREERS </span>
                        </Exchange> */}
                <DropDownDiv overlay={DropdownItems} trigger={['click']}>
                    <AnchorName className="ant-dropdown-link" href="#">
                        
                        <HeaderAvatar style={{ backgroundImage: "url('" + Avatar_img + "')" }} />
                        <UserName>
                            {this.props.prof_name}
                            <DownIcon type="caret-down" theme="outlined" />
                        </UserName>
                    </AnchorName>
                </DropDownDiv>
                <Open onClick={() => this.openNav()}>&#9776;</Open>
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
            </Right_div>
        );
    }
}
function mapStateToProps(state) {
    /*  console.log(state) */
    return ({
        ...state,
    });
}

const mapDispatchToProps = dispatch => ({
    Logout: () => dispatch(Logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Afterlog);