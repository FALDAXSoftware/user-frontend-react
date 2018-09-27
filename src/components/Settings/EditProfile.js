/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs } from 'antd';
import styled from 'styled-components';
import PersonalDetails from './Personaldetails/PersonalDetails';
import Referral from './Referral';
import LoggedNavigation from '../Navigations/LoggedNavigation'
import CommonFooter from "../Landing/Footers/Footer"

const TabPane = Tabs.TabPane;

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  background-color: #f5f6fa;
`
const ProfileDiv = styled.div`
  background-color: #ffffff;
  margin:auto;
  width:95%;
  border-radius: 7px;
`

class Editprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1
        }
    }

    _changeTab(key) {
        console.log(key);
        //this.setState({ currentTab: key });
    }

    render() {
        console.log(this.props)
        const { currentTab } = this.state;

        return (
            <div>
                <LoggedNavigation/>
                <ProfileWrapper>
                    <ProfileDiv>
                        <Tabs className="profile-tabs" defaultActiveKey="1" onChange={this._changeTab}>
                            <TabPane tab="Personal Details" key="1"><PersonalDetails {...this.props}/></TabPane>
                            <TabPane tab="Security" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="KYC" key="3">Content of Tab Pane 3</TabPane>
                            <TabPane tab="Payment Methods" key="4">Content of Tab Pane 3</TabPane>
                            <TabPane tab="Account Settings" key="5">Content of Tab Pane 3</TabPane>
                            <TabPane tab="Referral" key="6"><Referral/></TabPane>
                        </Tabs>
                    </ProfileDiv>
                </ProfileWrapper>
                <CommonFooter/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return({
      isLoggedIn:state.simpleReducer.isLoggedIn
    })
}

export default connect(mapStateToProps)(Editprofile);
