/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import styled from 'styled-components';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home"
import { SpinEx } from 'STYLED-COMPONENTS/HOMEPAGE/style'
import { globalVariables } from "Globals";
import ReactHtmlParser from 'react-html-parser';
let { API_URL } = globalVariables;

/* Styled-Components */
const ProfileWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 25px;
  background-color: ${props => props.theme.mode === "dark" ? "#01090f" : "#f5f6fa"};
`;

const ProfileDiv = styled.div`
  background-color: ${props => props.theme.mode === "dark" ? "#041422" : "#ffffff"};
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

const AboutFaqTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode === "dark" ? "white" : ""};
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
export const FAQcontent = styled.div`
  color:${props => props.theme.mode === "dark" ? "white" : ""} !important;
  &>h2
  {
    color:${props => props.theme.mode === "dark" ? "white" : ""} !important;
  }
`

/* Component Definition Starts Here*/
export default class FaqPage extends Component {
  constructor() {
    super();
    this.state = {
      team: 1,
      aboutContent: "",
      loader: false
    };
  }
  componentDidMount() {
    this.setState({ loader: true })
    fetch(API_URL + "/users/static-page-json/faq", {
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
    const { aboutContent, loader } = this.state;
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
                <AboutFaqTitle> BASIC </AboutFaqTitle>
              </div>
              <FAQcontent style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '16px', fontFamily: 'Open sans' }}>
                  {ReactHtmlParser(aboutContent)}
                </span>
              </FAQcontent>
            </ProfileDiv>
          </ProfileWrapper>
          <CommonFooter />
          {(loader) ? <SpinEx className="Ex_spin">
            <Spin size="large" />
          </SpinEx> : ""}
        </OverlayLoader>
      </div>
    );
  }
}
