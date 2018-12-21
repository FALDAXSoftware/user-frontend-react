/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Layout } from 'antd';
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { globalVariables } from '../../../Globals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInternetExplorer, faInstagram, faFacebook, faTelegramPlane, faGoogle,
    faYoutube, faTwitter, faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { FooterLogo, FooterWhiteLogo } from '../../../Constants/images';

/* Components */
import ComingSoon from '../../ComingSoon';

/* Styled Components */
import { Container } from '../../../styled-components/homepage/style';
const { Footer } = Layout;

/* Styled-Components */
const Footer_main = styled(Footer)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    text-align: left;
    padding: 25px 0px 0px 0px;
    border-top:2px solid #0f477b;
`
const Footer_headers = styled.li`
    font-size: 14px;
    font-family: "Open sans";
    color:${props => props.theme.mode == "dark" ? "white" : "rgba( 40, 37, 40, 0.8 )"};
    font-weight: bold;
    line-height: 1.714;
    width:100%;
    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
const Footer_ul = styled.ul`
    margin-top:20px;
    list-style-type:none;
    padding: 0px;
    width:100%;
    color:${props => props.theme.mode == "dark" ? "white" : "rgba( 40, 37, 40, 0.8 )"};
    font-size: 13px;
    font-family: "Open sans";

    li:not(:first-child)
    {
        margin-top:20px;
    }
`
const LI = styled.li`
    cursor: pointer;
`
const LI2 = styled.li`
    cursor: pointer;
    @media(max-width:1406)
    {
        margin-top:20px;
    }
`
// display: inline-block;
const Icon_ul_1 = styled.ul`
    display: inline-block;
    list-style-type:none;
    padding: 0px;
    margin-bottom: 0px;
    @media(min-width:1200px)
    {
        margin-top: 20px;
    }
    ${LI}
    {
        display:inline-block
    }
    ${LI2}
    {
        display:inline-block
    }
    ${LI},${LI2}
    {
       margin-right:15px; 
       margin-top:20px;
    }
`

const Icon_ul_1_header = styled(Icon_ul_1)`
    display:block;
`
const Icon_ul_2 = styled.ul`
    display: inline-block;
    list-style-type:none;
    padding: 0px;
    ${LI}
    {
        display:inline-block
    }
    ${LI2}
    {
        display:inline-block
    }
    ${LI},${LI2}
    {
       margin-right:15px; 
       margin-top:20px;
    }
`
const Download = styled.span`
    margin-top: 20px;
    font-size: 14px;
    font-family: "Open sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgba( 40, 37, 40, 0.8 )"};
    font-weight: bold;
    line-height: 1.714;

    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
const Store_Col = styled(Col)`
    margin-top: 20px;
    @media(max-width:1200px)
    {
        margin-top:30px
    }
`
const Store_Wrap = styled.div`
    margin-top:10px;
`
const Appstore = styled.img`
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
`
const Playstore = styled.img`
    display: inline-block;
`
const Bottom_Footer = styled.div`
    height: 71px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Footer_Text = styled.span`
    font-size: 13px;
    font-family: "Open sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgba( 0, 0, 0, 0.8 )"};
    line-height: 1.846;
    float: left;
    verticle-align: middle;
    @media(max-width:375px)
    {
        font-size: 9.5px;
    }
`;
const Footer_logo = styled.img`
    float: right;
    @media(max-width:375px)
    {
        max-width: 120px;
    }
`;
const HR = styled.hr`
    margin-top: 30px;
    margin-bottom: 0px;
`;
const Footer_Link = styled(Link)`
    color:${props => props.theme.mode == "dark" ? "white" : "rgb(0, 0, 0, 0.65)"};
`
const FooterContainer = styled.div`
@media(max-width:991px)
{
    text-align:center
}
`
const FooterLinkCol = styled(Col)`
@media(max-width:767px)
{
    display:none;
}
`
const FontAwesomeIcons = styled(FontAwesomeIcon)`
    display:inline-block;
    font-size:25px;
    color:${props => props.theme.mode == "dark" ? "white" : "#cccccc"};
`

class Footer_home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comingSoon: false,
            contactDetails: [],
            footerLogo: ""
        };
    }
    componentWillReceiveProps(props, newProps) {
        if (props.theme !== undefined) {
            if (props.theme !== this.state.theme) {
                if (props.theme == false)
                    this.setState({ footerLogo: FooterLogo })
                else
                    this.setState({ footerLogo: FooterWhiteLogo })
            }
        }
    }
    componentDidMount() {
        if (this.props.theme !== undefined) {
            if (this.props.theme == false)
                this.setState({ footerLogo: FooterLogo })
            else
                this.setState({ footerLogo: FooterWhiteLogo })

        }
        fetch(globalVariables.API_URL + '/get-contact-details', {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({ contactDetails: responseData.data });
            })
            .catch(error => {
            })
    }
    comingCancel = (e) => {
        this.setState({
            comingSoon: false,
        });
    }
    showComing = () => {
        this.setState({
            comingSoon: true,
        });
    }
    render() {
        const { contactDetails } = this.state;

        return (
            <Footer_main>
                <Container>
                    <FooterContainer>
                        <Row>
                            <FooterLinkCol xs={24} sm={8} md={8} lg={5} xl={5}>
                                <Footer_ul>
                                    <Footer_headers>About Us</Footer_headers>
                                    <li style={{ cursor: "pointer" }} >
                                        <Footer_Link to="/about-us">About FALDAX</Footer_Link>
                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <Footer_Link to="/contactus">Contact Us</Footer_Link>
                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <Footer_Link to="/careers">Careers</Footer_Link>
                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <Footer_Link to="/mediacontact">Media Contact</Footer_Link>
                                    </li>
                                </Footer_ul>
                            </FooterLinkCol>
                            <FooterLinkCol xs={24} sm={8} md={8} lg={5} xl={5}>
                                <Footer_ul>
                                    <Footer_headers>Lorem</Footer_headers>
                                    <li style={{ cursor: "pointer" }} onClick={this.showComing}>
                                        <Footer_Link to="/addcoin">List your Token</Footer_Link>
                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <Footer_Link to="/news">News</Footer_Link>
                                    </li>
                                    <li style={{ cursor: "pointer" }} onClick={this.showComing}>
                                        Security
                                                    </li>
                                    {/* <li style={{cursor:"pointer"}} onClick={this.showComing}>Language</li> */}
                                    <li style={{ cursor: "pointer" }} onClick={this.showComing}>API Documentation</li>
                                </Footer_ul>
                            </FooterLinkCol>

                            <FooterLinkCol xs={24} sm={8} md={8} lg={5} xl={5}>
                                <Footer_ul>
                                    <Footer_headers>For Users</Footer_headers>
                                    <li style={{ cursor: "pointer" }} onClick={this.showComing}>
                                        <Footer_Link to="/faq">FAQ</Footer_Link>
                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <Footer_Link to="/blogs">Blog</Footer_Link>
                                    </li>
                                    <li style={{ cursor: "pointer" }} onClick={this.showComing}>
                                        Support
                                                    </li>
                                    <li style={{ cursor: "pointer" }} onClick={this.showComing}>
                                        Supported Countries
                                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <Footer_Link to="/privacy">Legal & Privacy</Footer_Link>
                                    </li>
                                </Footer_ul>
                            </FooterLinkCol>

                            <Col xs={24} lg={5} xl={5}>
                                <Icon_ul_1_header>
                                    <Footer_headers>Social</Footer_headers>
                                </Icon_ul_1_header>
                                {this.state.contactDetails.length !== 0 ?
                                    <Icon_ul_1>
                                        <LI>
                                            <a href={contactDetails.fb_profile}><FontAwesomeIcons icon={faFacebook} color={true} /></a>
                                        </LI>
                                        <LI>
                                            <a href={contactDetails.twitter_profile}><FontAwesomeIcons icon={faTwitter} color={true} /></a>
                                        </LI>
                                        <LI>
                                            <a href={contactDetails.google_profile}><FontAwesomeIcons icon={faGoogle} color={true} /></a>
                                        </LI>
                                        <LI>
                                            <a href={contactDetails.youtube_profile}><FontAwesomeIcons icon={faYoutube} color={true} /></a>
                                        </LI>
                                    </Icon_ul_1>
                                    : ""}
                                <Icon_ul_2>
                                    <LI2 onClick={this.showComing}>
                                        <a href={contactDetails.insta_profile}> <FontAwesomeIcons icon={faInstagram} color={true} /></a>
                                    </LI2>
                                    <LI2>
                                        <a href={contactDetails.telegram_profile}><FontAwesomeIcons icon={faTelegramPlane} color={true} /></a>
                                    </LI2>
                                    <LI2>
                                        <a href={contactDetails.linkedin_profile}><FontAwesomeIcons icon={faLinkedinIn} color={true} /></a>
                                    </LI2>
                                    <LI2 onClick={this.showComing}>
                                        <a href={contactDetails.faldax_url}><FontAwesomeIcons icon={faInternetExplorer} color={true} /></a>
                                    </LI2>
                                </Icon_ul_2>
                            </Col>
                            <Store_Col xs={24} lg={2} xl={2}>
                                <Download>Download</Download>
                                <Store_Wrap>
                                    <Appstore style={{ cursor: "pointer" }} onClick={this.showComing} src="/images/Homepage/appstore_icon.png" />
                                    <Playstore style={{ cursor: "pointer" }} onClick={this.showComing} src="/images/Homepage/playstore_icon.png" />
                                </Store_Wrap>
                            </Store_Col>
                        </Row>
                    </FooterContainer>
                    <HR />
                    <Bottom_Footer>
                        <Footer_Text> ©2018 FALDAX. All Rights Reserved. </Footer_Text>
                        <Footer_logo src={this.state.footerLogo} />
                    </Bottom_Footer>
                </Container>
                <ComingSoon comingCancel={(e) => this.comingCancel(e)} visible={this.state.comingSoon} />
            </Footer_main>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return ({
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    });
}

export default connect(mapStateToProps)(withRouter(Footer_home));
