/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faLinkedinIn, faDiscord } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

import Navigation from '../Navigations/Navigation';
import { Spin_Ex } from '../../styled-components/homepage/style'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import CommonFooter from "../Landing/Footers/Footer_home";
import { globalVariables } from "../../Globals";
import { AboutPeople1, AboutPeople2, AboutPeople3 } from '../../Constants/images';
let { API_URL } = globalVariables;

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 25px;
  background-color: ${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
`
const ProfileDiv = styled.div`
  background-color: ${props => props.theme.mode == "dark" ? "#041422" : "#ffffff"};
  margin:auto;
  width: 100%;
  max-width: 1170px;
  border-radius: 7px;
  padding: 35px 30px 30px 30px;
  @media(max-width:768px)
  {
    padding: 15px;
  }
`
const About_Faldax_Title = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode == "dark" ? "#ffffff" : "#333333"};
  &:before {
    content: '';
    width: calc(50% - 235px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 235px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
`;
const AboutContent = styled.div`
  color:${props => props.theme.mode == "dark" ? "#ffffff" : "#333333"};
  text-align:justify;
`
const Our_Mission = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode == "dark" ? "#ffffff" : "#333333"};
  &:before {
    content: '';
    width: calc(50% - 170px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 170px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
`
const MissionContent = styled.div`
  color:${props => props.theme.mode == "dark" ? "#ffffff" : "#333333"};
`
const Our_Team = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode == "dark" ? "#ffffff" : "#333333"};
  &:before {
    content: '';
    width: calc(50% - 125px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 125px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
`;

const About_Us_Image = styled.img`
  float: left;
  width: '40%';
  margin: 10px 30px 5px 0px;
`
const Missiondesc = styled.span`
  color:${props => props.theme.mode == "dark" ? "#ffffff" : "#333333"}
`
/* Styled Components */
const FontAwesomeIcons = styled(FontAwesomeIcon)`
  font-size: 16px;
  margin-top: 5px;
  color: ${props => props.color ? '#4c84ff' : '#878787'};
`;
const Hexagon = styled.div`
  overflow: hidden;
  visibility: hidden;
  -webkit-transform: rotate(120deg);
    -moz-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
      -o-transform: rotate(120deg);
  cursor: pointer;

  width: 160px;
  height: 185px;
  margin: 0px 0 0 20px;
  margin-top: -92px;
  margin-left: 49px;
`;

const Hexagon_In1 = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
    -moz-transform: rotate(-60deg);
      -ms-transform: rotate(-60deg);
      -o-transform: rotate(-60deg);
          transform: rotate(-60deg);
`;
const Hexagon_In2 = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: ${props => props.src};
  visibility: visible;
  -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
      -ms-transform: rotate(-60deg);
      -o-transform: rotate(-60deg);
          transform: rotate(-60deg);
`;
const Team = styled.div`
  width: 255px;
  min-height: 310px;
  
  display: inline-block;
  margin: 15px;
  margin-left: 0px;
  margin-bottom: 0px;
  margin-top: 115px;
  box-shadow: ${props => props.theme.mode == "dark" ? "none" : "-1px 2px 10px 4px #f1f1f1"};
  cursor: pointer;
  background-color:${props => props.theme.mode == "dark" ? "#01090f" : "#ffffff"};
`;
const TeamIn1 = styled.div`
  color:${props => props.theme.mode == "dark" ? "white" : "#333333"};
  margin-top: 10px;
`;
const TeamIn2 = styled.div`
  color:${props => props.theme.mode == "dark" ? "white" : "#333333"};
`;
const TeamIn3 = styled.div`
  color:${props => props.theme.mode == "dark" ? "white" : "#5c5c5c"};
  padding: 13px 20px;
`;
const FontAwesomeDiv = styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  background-color: white;
  margin: 12px 7.5px
`;
const TeamIn4 = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${props => props.color ? '#4c84ff' : '#878787'};
  color: 'white';
`;

/* Component Defination Starts Here*/

export default class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      team: 1,
      aboutContent: '',
      loader: false
    };
  }
  componentDidMount() {
    this.setState({ loader: true })
    fetch(API_URL + "/users/static-page-json/about", {
      method: "get",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((responseData) => {
        this.setState({ aboutContent: responseData.data.content, loader: false })
      })
      .catch(error => { })

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
                <About_Faldax_Title> ABOUT FALDAX STORY </About_Faldax_Title>
              </div>
              <AboutContent style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '16px', fontFamily: 'Open sans' }}>
                  {ReactHtmlParser(this.state.aboutContent)}
                </span>
              </AboutContent>
              <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                <Our_Mission> OUR MISSION </Our_Mission>
              </div>
              <MissionContent style={{ marginTop: '25px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '17px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </MissionContent>
              <div style={{ marginTop: '20px', minHeight: '270px' }}>
                <About_Us_Image src="/images/about-us-image-2.jpg" />

                <Missiondesc style={{ fontFamily: "Open sans", fontSize: '16px', lineHeight: '24px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Missiondesc>
              </div>
              <div style={{ marginTop: '10px', marginBottom: '35px' }}>
                <Missiondesc style={{ fontSize: '16px', fontFamily: "Open Sans", lineHeight: '24px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </Missiondesc>
              </div>
              <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                <Our_Team> OUR TEAM </Our_Team>
              </div>
              <div style={{ marginTop: '25px', textAlign: 'center' }}>
                <Team onClick={() => this.teamClick('1')}>
                  <Hexagon>
                    <Hexagon_In1>
                      <Hexagon_In2 src={`url(${AboutPeople1})`}>
                      </Hexagon_In2>
                    </Hexagon_In1>
                  </Hexagon>
                  <TeamIn1>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: "Open sans" }}> MICHAEL GOLTSMAN </span>
                  </TeamIn1>
                  <TeamIn2>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: "Open sans" }}> co-founder </span>
                  </TeamIn2>
                  <TeamIn3>
                    <p style={{ fontSize: '14px' }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  </TeamIn3>
                  <TeamIn4 color={true}>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faLinkedinIn} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faTwitter} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faYoutube} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faDiscord} color={true} />
                    </FontAwesomeDiv>
                  </TeamIn4>
                </Team>
                <Team onClick={() => this.teamClick('2')}>
                  <Hexagon>
                    <Hexagon_In1>
                      <Hexagon_In2 src={`url(${AboutPeople2})`}>
                      </Hexagon_In2>
                    </Hexagon_In1>
                  </Hexagon>
                  <TeamIn1>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: "Open sans" }}> MICHAEL GOLTSMAN </span>
                  </TeamIn1>
                  <TeamIn2>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: "Open sans" }}> co-founder </span>
                  </TeamIn2>
                  <TeamIn3>
                    <p style={{ fontSize: '14px' }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  </TeamIn3>
                  <TeamIn4 color={true}>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faLinkedinIn} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faTwitter} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faYoutube} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faDiscord} color={true} />
                    </FontAwesomeDiv>
                  </TeamIn4>
                </Team>
                <Team onClick={() => this.teamClick('3')}>
                  <Hexagon>
                    <Hexagon_In1>
                      <Hexagon_In2 src={`url(${AboutPeople3})`}>
                      </Hexagon_In2>
                    </Hexagon_In1>
                  </Hexagon>
                  <TeamIn1>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: "Open sans" }}> MICHAEL GOLTSMAN </span>
                  </TeamIn1>
                  <TeamIn2>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: "Open sans" }}> co-founder </span>
                  </TeamIn2>
                  <TeamIn3>
                    <p style={{ fontSize: '14px' }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  </TeamIn3>
                  <TeamIn4 color={true}>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faLinkedinIn} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faTwitter} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faYoutube} color={true} />
                    </FontAwesomeDiv>
                    <FontAwesomeDiv>
                      <FontAwesomeIcons icon={faDiscord} color={true} />
                    </FontAwesomeDiv>
                  </TeamIn4>
                </Team>
              </div>
            </ProfileDiv>
          </ProfileWrapper>
          <CommonFooter />
          {(this.state.loader) ? <Spin_Ex className="Ex_spin">
            <Spin size="large" />
          </Spin_Ex> : ""}
        </OverlayLoader>
      </div>
    );
  }
}
