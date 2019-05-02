import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import {
    Contact_wrap, Grey_wrap, Head_span, Headcontact, Career_wrap, Subhead, Leftmedia,
    Rightmedia, Textwrap, LeftRow, RightRow, LT_div, Col_wrap_r, Col_wrap_l, LL_div, MediaUL,
    MediaLI, Mediaspan, MediaP, Blue_tag, Blue_tag_p
} from 'STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle';
import { globalVariables } from "Globals";
import {
    _MEDIACONTACTICON, _MEDIAWHITE, _MEDIAFB, _MEDIALINKEDIN, _MEDIATWEETER, _MEDIADISCORD
} from "CONSTANTS/images";

let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom:70px;
    @media(max-width:480px)
    {
        padding-right:0px;
        padding-left:0px;
    }
`

const MediaDiv = styled(Headcontact)`
  text-align:center;
`

class MediaContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: null,
        };
    }
    componentDidMount() {
        fetch(API_URL + "/get-contact-details", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({ contact: responseData.data });
            })
            .catch(error => { })
    }

    render() {
        const { contact } = this.state;

        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <MediaDiv>
                            <Head_span>Media Contact</Head_span>
                            <hr />
                        </MediaDiv>
                        <Career_wrap>
                            <Subhead>
                                <Leftmedia>
                                    <img src={_MEDIACONTACTICON} />
                                </Leftmedia>
                                <Rightmedia>
                                    <img src={_MEDIAWHITE} />
                                </Rightmedia>
                            </Subhead>
                            <Textwrap>
                                <LeftRow>
                                    <LT_div sm={24} md={12}>
                                        <Col_wrap_l>
                                            <Mediaspan>PRESS</Mediaspan>
                                            {this.state.contact !== null ?
                                                <MediaP>Please refer to <Link to="/blogs"><Blue_tag>{contact.press}</Blue_tag></Link> for our latest announcements.</MediaP>
                                                : ""}
                                        </Col_wrap_l>
                                    </LT_div>
                                    <LL_div sm={24} md={12}>
                                        <Col_wrap_r>
                                            <Mediaspan>MEDIA CONTACT</Mediaspan>
                                            {contact !== null ? <MediaP>{contact.media_name} <Blue_tag_p>{contact.media_email}</Blue_tag_p> </MediaP> : ""}
                                        </Col_wrap_r>

                                    </LL_div>
                                </LeftRow>
                                <RightRow>
                                    <LT_div sm={24} md={12}>
                                        <Col_wrap_l>
                                            <Mediaspan>MEDIA CONTACT</Mediaspan>
                                            {contact !== null ?
                                                <MediaUL>
                                                    <a target="_blank" href={`${contact.fb_profile}`}><MediaLI><img src={_MEDIAFB} /></MediaLI></a>
                                                    <a target="_blank" href={`${contact.twitter_profile}`}><MediaLI><img src={_MEDIATWEETER} /></MediaLI></a>
                                                    <a target="_blank" href={`${contact.linkedin_profile}`}><MediaLI><img src={_MEDIALINKEDIN} /></MediaLI></a>
                                                    {/* <a target="_blank" href={`${contact.discord_profile}`}><MediaLI><img src={_MEDIADISCORD} /></MediaLI></a> */}
                                                </MediaUL>
                                                : ""}
                                        </Col_wrap_l>
                                    </LT_div>
                                    <LL_div sm={24} md={12}>
                                        <Col_wrap_r>
                                            <Mediaspan>Support CONTACT</Mediaspan>
                                            <MediaP>Need customer support? For support requests and inquiries please visit <Link to="/contactus"><Blue_tag>www.faldax.com/support.</Blue_tag></Link></MediaP>
                                        </Col_wrap_r>
                                    </LL_div>
                                </RightRow>
                            </Textwrap>
                        </Career_wrap>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
            </Contact_wrap>
        );
    }
}

export default MediaContact;
