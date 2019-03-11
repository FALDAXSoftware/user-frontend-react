/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Tabs } from 'antd';
import styled from 'styled-components';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

/* Components */
import PersonalDetails from './Personaldetails/PersonalDetails';
import Referral from './Referral';
import LoggedNavigation from '../Navigations/LoggedNavigation';
import Footer_home from "../Landing/Footers/Footer_home";
import Passwordchange from "./changePassword/Passwordchange";
import Acc_settings from "./Account_settings/Acc_settings";
import KYC from "./KYC/kyc"
import Paymethods from './Payment/Paymethods';

const TabPane = Tabs.TabPane;

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  padding-bottom:30px;
  background-color: ${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
`
const ProfileDiv = styled.div`
    background-color: ${props => props.theme.mode == "dark" ? "#041422" : "#ffffff"};
  margin:auto;
  width:95%;
  border-radius: 7px;
  
`
const TabsStyle = styled(Tabs)`
    & .ant-tabs-tab-active
    {
        color:rgb(0, 170, 250);   
    }
    & .ant-tabs-ink-bar
    {
        background-color:rgb(0, 170, 250);   
    }
`

class Editprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                {/* console.log(this.props.loader) */}
                <LoggedNavigation />
                <ProfileWrapper>
                    <ProfileDiv>
                        <TabsStyle className="profile-tabs" defaultActiveKey="1" >
                            <TabPane tab="Personal Details" key="1"><PersonalDetails {...this.props} /></TabPane>
                            <TabPane tab="Security" key="2" ><Passwordchange {...this.props} /></TabPane>
                            <TabPane tab="Account Settings" key="3"><Acc_settings {...this.props} /></TabPane>
                            <TabPane tab="Identity Verification" key="4"><KYC /></TabPane>
                            <TabPane tab="Referral" key="5"><Referral {...this.props} /></TabPane>
                            {/* <TabPane tab="Payment Methods" key="6"><Paymethods/></TabPane> */}
                        </TabsStyle>
                    </ProfileDiv>
                </ProfileWrapper>
                <Footer_home />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Editprofile);
