/* In-built Packages */
import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import styled from 'styled-components';
import Navigation from '../Navigations/Navigation';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import CommonFooter from "../Landing/Footers/Footer";

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 25px;
  background-color: #f5f6fa;
`;

const ProfileDiv = styled.div`
  background-color: #ffffff;
  margin:auto;
  width: 100%;
  max-width: 1170px;
  border-radius: 7px;
  padding: 35px 30px 30px 30px;
  @media(max-width:768px)
  {
    padding: 15px;
  }
`;

const About_Faq_Title = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  &:before {
    content: '';
    width: calc(50% - 85px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 80px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
`;

/* Component Defination Starts Here*/

export default class FaqPage extends React.Component {
  constructor() {
    super();
    this.state = {
      team: 1
    };
  }

  teamClick(value) {
    this.setState({ team: value });
  }

  render() {
    return (
      <div>
        <Navigation />
        <OverlayLoader
          color={'red'} // default is white
          loader="ScaleLoader" // check below for more loaders
          text="Loading... Please wait!"
          active={false}
          backgroundColor={'black'} // default is black
          opacity=".4" // default is .9  
        >
          <ProfileWrapper>
            <ProfileDiv>
              <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                <About_Faq_Title> BASIC </About_Faq_Title>
              </div>
              <div style={{ marginTop: '24px' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'Open sans', fontSize: '30px' }}>What is FALDAX?</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '14px', fontFamily: 'Open sans' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </span>
              </div>
              <div style={{ marginTop: '34px' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'Open sans', fontSize: '30px' }}>What is Bitcoin?</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '14px', fontFamily: 'Open sans' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </span>
              </div>
              <div style={{ marginTop: '34px' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'Open sans', fontSize: '30px' }}>How to Buy Bitcoin?</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '14px', fontFamily: 'Open sans' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </span>
              </div>
              <div style={{ marginTop: '34px' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'Open sans', fontSize: '30px' }}>What currencies i can deposit and withdraw?</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '14px', fontFamily: 'Open sans' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </span>
              </div>
              <div style={{ marginTop: '34px' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'Open sans', fontSize: '30px' }}>Can i trade currencies other than Bitcoin?</span>
              </div>
              <div style={{ marginTop: '10px', marginBottom: '65px' }}>
                <span style={{ fontSize: '14px', fontFamily: 'Open sans' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </span>
              </div>
            </ProfileDiv>
          </ProfileWrapper>
          <CommonFooter />
        </OverlayLoader>
      </div>
    );
  }
}
