import styled from 'styled-components';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card, Cardimport, Modal , Dropdown, Icon, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {queryString} from 'query-string'
import { Logout } from '../../Actions/Auth';
import {globalVariables} from '../../Globals'

/* Styled-Components */
const Right_div = styled.div`
    float: right;
    margin-top: 6px;

    @media(max-width:1200px)
    {
        margin-top:0px;
    }
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
    line-height: 76px;
    vertical-align: middle;
    
    @media(max-width:1200px)
    {
        display:inline-block;
        margin-right:15px;
    }
`
const HeaderAvatar = styled(Avatar)`
    margin-right:5px;
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


class Afterlog extends React.Component
{
    openNav()
    {
        this.props.openNav();
    }
    logout() {
        /* console.log("hello Logout") */
        this.props.Logout();
    }
    render()
    {
        const DropdownItems = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => this.props.history.push('/editProfile')}> Profile </a>
                </Menu.Item>
                <Menu.Item key="1" onClick={this.logout.bind(this)}>Logout</Menu.Item>
            </Menu>
        )
        let Avatar_img
        if(this.props.profileDetails!==undefined)
        {
            if(this.props.profileDetails.profile_pic!==null && this.props.profileDetails.profile_pic!==undefined && this.props.profileDetails.profile_pic!=="")
            {
                /* console.log("aaaaaaaaaa") */
                Avatar_img = globalVariables.amazon_Bucket + this.props.profileDetails.profile_pic;
            }
            else
            {
                /* console.log("vbbbbbbbbbbbbb") */
                Avatar_img =  "./images/Settings/def_profile.png";
            }
        }
        return(
            <Right_div>
                <DropDownDiv overlay={DropdownItems} trigger={['click']}>
                    <AnchorName className="ant-dropdown-link" href="#">
                    {/* console.log(this.props,Avatar_img) */}
                        <HeaderAvatar src={Avatar_img} />
                        <UserName>
                                {this.props.prof_name}
                            <DownIcon type="caret-down" theme="outlined" />
                        </UserName>
                    </AnchorName>
                </DropDownDiv>
                <Open style={{ fontSize:"30px", cursor:"pointer", lineHeight: '76px', verticalAlign: 'middle' }} onClick={() => this.openNav()}>&#9776;</Open>
            </Right_div>
        );
    }
}
function mapStateToProps(state){
   /*  console.log(state) */
    return ({
        ...state,
    });
}
const mapDispatchToProps = dispatch => ({
    Logout: () => dispatch(Logout())
   })
  
export default connect(mapStateToProps, mapDispatchToProps)(Afterlog);