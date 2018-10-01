/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs } from 'antd';
import styled from 'styled-components';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

/* Components */
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

class Editprofile extends Component 
{

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1
        }
    }

    _changeTab(key) {
        /* console.log(key); */
        //this.setState({ currentTab: key });
    }

    render() {
        /* console.log(this.props) */
        const { currentTab } = this.state;

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
                    <LoggedNavigation/>
                    <ProfileWrapper>
                        <ProfileDiv>
                            <Tabs className="profile-tabs" defaultActiveKey="1" onChange={this._changeTab}>
                                <TabPane tab="Personal Details" key="1"><PersonalDetails {...this.props}/></TabPane>
                                <TabPane tab="Referral" key="2"><Referral/></TabPane>
                            </Tabs>
                        </ProfileDiv>
                    </ProfileWrapper>
                <CommonFooter/>
                </OverlayLoader>
            </div>
        );
    }
}

function mapStateToProps(state){
    /* console.log(state) */
    return({
      isLoggedIn:state.simpleReducer.isLoggedIn,
      /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Editprofile);
