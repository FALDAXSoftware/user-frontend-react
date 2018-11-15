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
import CommonFooter from "../Landing/Footers/Footer";
import Passwordchange from "./changePassword/Passwordchange";
import Acc_settings from "./Account_settings/Acc_settings";
import KYC from "./KYC/kyc"
import Paymethods from './Payment/Paymethods'

const TabPane = Tabs.TabPane;

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  padding-bottom:30px;
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
        }
    }

    render() {
        return (
            <div>
                {/* console.log(this.props.loader) */}
                <OverlayLoader
                    color={'red'} // default is white
                    loader="ScaleLoader" // check below for more loaders
                    text="Loading... Please wait!"
                    active={false}
                    backgroundColor={'black'} // default is black
                    opacity=".4" // default is .9  
                >
                    <LoggedNavigation />
                    <ProfileWrapper>
                        <ProfileDiv>
                            <Tabs className="profile-tabs" defaultActiveKey="1" >
                                <TabPane tab="Personal Details" key="1"><PersonalDetails {...this.props} /></TabPane>
                                <TabPane tab="Security" key="2" ><Passwordchange {...this.props} /></TabPane>
                                <TabPane tab="Account Settings" key="3"><Acc_settings {...this.props} /></TabPane>
                                <TabPane tab="Identity Verification" key="4"><KYC /></TabPane>
                                <TabPane tab="Referral" key="5"><Referral /></TabPane>
                                <TabPane tab="Payment Methods" key="6"><Paymethods/></TabPane>
                            </Tabs>
                        </ProfileDiv>
                    </ProfileWrapper>
                    <CommonFooter />
                </OverlayLoader>
            </div>
        );
    }
}

function mapStateToProps(state) {
    /* console.log(state) */
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Editprofile);
