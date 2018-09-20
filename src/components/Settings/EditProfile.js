/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Tabs } from 'antd';
import styled from 'styled-components';
import PersonalDetails from './PersonalDetails';

const TabPane = Tabs.TabPane;

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  background-color: #f5f6fa;
`
const ProfileDiv = styled.div`
  background-color: #ffffff;
  margin: 0px 30px 0px 30px;
  border-radius: 7px;
`

class EditProfile extends Component {
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
        const { currentTab } = this.state;

        return (
            <ProfileWrapper>
                <ProfileDiv>
                    <Tabs className="profile-tabs" defaultActiveKey={currentTab} onChange={this._changeTab}>
                        <TabPane tab="Personal Details" key="1"><PersonalDetails /></TabPane>
                        <TabPane tab="Security" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="KYC" key="3">Content of Tab Pane 3</TabPane>
                        <TabPane tab="Payment Methods" key="4">Content of Tab Pane 3</TabPane>
                        <TabPane tab="Referral" key="5">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </ProfileDiv>
            </ProfileWrapper>
        );
    }
}

export default EditProfile;
