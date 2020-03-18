/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col, Layout } from "antd";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "react-i18next";
import {
  faFacebook,
  faTwitter,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

/* Components */
import { globalVariables } from "Globals.js";
import {
  _FOOTERLOGO,
  _FOOTERWHITELOGO,
  _APPSTORE,
  _PLAYSTORE
} from "CONSTANTS/images";
import ComingSoon from "COMPONENTS/comingsoon";

/* Styled Components */
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
const { Footer } = Layout;

/* Styled-Components */
const Footermain = styled(Footer)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  text-align: left;
  padding: 25px 0px 0px 0px;
  border-top: 2px solid #0f3b61;
  /* border-top:2px solid #00bcd2; */
`;
const Footerheaders = styled.li`
  font-size: 14px;
  font-family: "Open sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgba( 40, 37, 40, 0.8 )"};
  font-weight: bold;
  line-height: 1.714;
  width: 100%;
  @media (max-width: 1200px) {
    margin-top: 30px;
  }
  @media (min-width: 2000px) {
    font-size: 22px;
  }
`;
const Footerul = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0px;
  width: 100%;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgba( 40, 37, 40, 0.8 )"};
  font-size: 13px;
  font-family: "Open sans";
  // > li {
  //   cursor: pointer;
  // }
  li:not(:first-child) {
    margin-top: 20px;
  }
`;
const LI = styled.li`
  cursor: pointer;
`;
const LI2 = styled.li`
  cursor: pointer;
  @media (max-width: 1406) {
    margin-top: 20px;
  }
`;
const Iconul1 = styled.ul`
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
`;

const Iconul1header = styled(Iconul1)`
  display: block;
`;
/* const Icon_ul_2 = styled.ul`
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
` */
const Download = styled.span`
  margin-top: 20px;
  font-size: 14px;
  font-family: "Open sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgba( 40, 37, 40, 0.8 )"};
  font-weight: bold;
  line-height: 1.714;
  @media (max-width: 1200px) {
    margin-top: 30px;
  }
  @media (min-width: 2000px) {
    font-size: 22px;
  }
`;
const StoreCol = styled(Col)`
  margin-top: 20px;
  @media (max-width: 1200px) {
    margin-top: 30px;
  }
`;
const StoreWrap = styled.div`
  margin-top: 10px;
`;
const Appstore = styled.img`
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;
const Playstore = styled.img`
  display: inline-block;
  cursor: pointer;
  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;
const BottomFooter = styled.div`
  height: 71px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FooterText = styled.span`
  font-size: 13px;
  font-family: "Open sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgba( 0, 0, 0, 0.8 )"};
  line-height: 1.846;
  float: left;
  verticle-align: middle;
  @media (max-width: 375px) {
    font-size: 9.5px;
  }
`;
const Footerlogo = styled.img`
  float: right;
  @media (max-width: 375px) {
    max-width: 120px;
  }
`;
const HR = styled.hr`
  margin-top: 30px;
  margin-bottom: 0px;
`;
const FooterLink = styled.a`
  cursor: pointer;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb(0, 0, 0, 0.65)"};
  @media (min-width: 2000px) {
    font-size: 20px;
  }
`;
const CareerLink = styled(Link)`
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb(0, 0, 0, 0.65)"};
`;
const FooterContainer = styled.div`
  @media (max-width: 991px) {
    text-align: center;
  }
`;
const FooterLinkCol = styled(Col)`
  @media (max-width: 575px) {
    display: none;
  }
`;
const FontAwesomeIcons = styled(FontAwesomeIcon)`
  display: inline-block;
  font-size: 25px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "#cccccc")};
  &.facebook {
    color: #4e64b5;
  }
  &.linkedin {
    color: #0288d1;
  }
  &.twitter {
    color: #00aced;
  }
`;

class FooterHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingSoon: false,
      contactDetails: [],
      footerLogo: ""
    };
  }

  /* Life Cycle Methods */
  componentWillReceiveProps(props, newProps) {
    if (props.theme !== undefined) {
      if (props.theme !== this.state.theme) {
        if (props.theme === false) this.setState({ footerLogo: _FOOTERLOGO });
        else this.setState({ footerLogo: _FOOTERWHITELOGO });
      }
    }
  }
  componentDidMount() {
    if (this.props.theme !== undefined) {
      if (this.props.theme === false)
        this.setState({ footerLogo: _FOOTERLOGO });
      else this.setState({ footerLogo: _FOOTERWHITELOGO });
    }

    fetch(globalVariables.API_URL + "/get-contact-details", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          this.setState({ contactDetails: responseData.data });
        }
      })
      .catch(error => {});
  }
  /* 
        Page: on all pages.
        This method is called when we close the modal.
    */
  comingCancel = e => {
    this.setState({ comingSoon: false });
  };
  /* 
        Page: on all pages.
        This method is called when we open the modal.
    */

  showComing = () => {
    this.setState({ comingSoon: true });
  };

  /* 
        Page: on all pages.
        This method is called to use scroll in map.
    */

  scrollMap() {
    var elmnt = document.getElementById("map-scroll");
    if (elmnt !== null) elmnt.scrollIntoView();
    else this.props.history.push("/#block-world-map");
  }
  render() {
    const { contactDetails } = this.state;
    const { t } = this.props;

    return (
      <Footermain>
        <Container className="footer_main_div">
          <FooterContainer>
            <Row>
              <FooterLinkCol xs={24} sm={8} md={8} lg={5} xl={5}>
                <Footerul>
                  <Footerheaders>{t("head_information.message")}</Footerheaders>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/about-us`}
                    >
                      {t("subhead_about_us.message")}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/contact-us`}
                    >
                      {t("subhead_contact_us.message")}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/media-contact`}
                    >
                      {t("subhead_media_contact.message")}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/blogs`}
                    >
                      {t("subhead_blog.message")}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}/${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/fee`}
                    >
                      {t("subhead_fees.message")}
                    </FooterLink>
                  </li>
                </Footerul>
              </FooterLinkCol>
              <FooterLinkCol xs={24} sm={8} md={8} lg={5} xl={5}>
                <Footerul>
                  <Footerheaders>{t("head_support.message")}</Footerheaders>
                  <li>
                    {this.props.isLoggedIn ? (
                      <FooterLink href="/open-ticket">
                        {" "}
                        {t("subhead_open_a_ticket.message")}
                      </FooterLink>
                    ) : (
                      <FooterLink href="/login#openTicket">
                        {" "}
                        {t("subhead_open_a_ticket.message")}
                      </FooterLink>
                    )}
                  </li>
                  <li>
                    <FooterLink href="https://knowledge.faldax.com/">
                      {t("subhead_faq.message")}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/list-your-token`}
                    >
                      {t("subhead_List_your_token.message")}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/news`}
                    >
                      {t("subhead_news.message")}
                    </FooterLink>
                  </li>
                  <li>
                    <CareerLink to={"/careers"}>
                      {t("header:navbar_menu_careers.message")}
                    </CareerLink>
                  </li>
                </Footerul>
              </FooterLinkCol>
              <FooterLinkCol xs={24} sm={8} md={8} lg={5} xl={5}>
                <Footerul>
                  <Footerheaders>
                    {t("head_Legal_&_technical.message")}
                  </Footerheaders>
                  <li>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/policies`}
                    >
                      {t("subhead_policies.message")}
                    </FooterLink>
                  </li>
                  <li onClick={this.scrollMap.bind(this)}>
                    <FooterLink
                      href={`${globalVariables.WordpressSiteURL}${
                        localStorage["i18nextLng"] &&
                        localStorage["i18nextLng"] !== "en"
                          ? "/" + localStorage["i18nextLng"]
                          : ""
                      }/service-availability/`}
                    >
                      {t("subhead_service_availability.message")}
                    </FooterLink>
                  </li>
                </Footerul>
              </FooterLinkCol>
              <Col xs={24} lg={5} xl={5}>
                <Iconul1header>
                  <Footerheaders>{t("head_social.message")}</Footerheaders>
                </Iconul1header>
                {this.state.contactDetails !== undefined ? (
                  this.state.contactDetails.length !== 0 ? (
                    <Iconul1>
                      <LI>
                        <a target="_blank" href={contactDetails.fb_profile}>
                          <FontAwesomeIcons
                            className="facebook"
                            icon={faFacebook}
                            color={"true"}
                          />
                        </a>
                      </LI>
                      <LI>
                        <a
                          target="_blank"
                          href={contactDetails.linkedin_profile}
                        >
                          <FontAwesomeIcons
                            className="linkedin"
                            icon={faLinkedinIn}
                            color={"true"}
                          />
                        </a>
                      </LI>
                      <LI>
                        <a
                          target="_blank"
                          href={contactDetails.twitter_profile}
                        >
                          <FontAwesomeIcons
                            className="twitter"
                            icon={faTwitter}
                            color={"true"}
                          />
                        </a>
                      </LI>

                      {/* <LI>
                                            <a target="_blank" href={contactDetails.discord_profile}><FontAwesomeIcons icon={faDiscord} color={true} /></a>
                                        </LI> */}
                    </Iconul1>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {/* <Iconul2>
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
                                </Iconul2> */}
              </Col>
              <StoreCol xs={24} lg={2} xl={2}>
                <Download>{t("head_download.message")}</Download>
                <StoreWrap>
                  <a
                    href={`${globalVariables.WordpressSiteURL}${
                      localStorage["i18nextLng"] &&
                      localStorage["i18nextLng"] !== "en"
                        ? "/" + localStorage["i18nextLng"]
                        : ""
                    }/coming-soon`}
                  >
                    <Appstore src={_APPSTORE} />
                  </a>
                  <a
                    href={`${globalVariables.WordpressSiteURL}${
                      localStorage["i18nextLng"] &&
                      localStorage["i18nextLng"] !== "en"
                        ? "/" + localStorage["i18nextLng"]
                        : ""
                    }/coming-soon`}
                  >
                    <Playstore src={_PLAYSTORE} />
                  </a>
                </StoreWrap>
              </StoreCol>
            </Row>
          </FooterContainer>
          <HR />
          <BottomFooter>
            <FooterText>
              {" "}
              ©{new Date().getFullYear()} FALDAX.{" "}
              {t("subhead_all_rights_reserved.message")}
            </FooterText>
            <a
              href={
                globalVariables.WordpressSiteURL +
                (localStorage["i18nextLng"] &&
                localStorage["i18nextLng"] !== "en"
                  ? "/" + localStorage["i18nextLng"]
                  : "")
              }
            >
              <Footerlogo src={this.state.footerLogo} />
            </a>
          </BottomFooter>
        </Container>
        <ComingSoon
          comingCancel={e => this.comingCancel(e)}
          visible={this.state.comingSoon}
        />
      </Footermain>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn ? true : false,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default translate(
  "footer",
  "header"
)(connect(mapStateToProps)(withRouter(FooterHome)));
