import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import {
    ContactWrap, GreyWrap, HeadSpan, HeadContact, CareerWrap, SubHead, LeftMedia,
    RightMedia, TextWrap, LeftRow, RightRow, LTDiv, ColWrapR, ColWrapL, LLDiv, MediaUL,
    MediaLI, MediaSpan, MediaP, BlueTag, BlueTagP
} from 'STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle';
import { globalVariables } from "Globals";
import {
    _MEDIACONTACTICON, _MEDIAWHITE, _MEDIAFB, _MEDIALINKEDIN, _MEDIATWEETER, _MEDIADISCORD
} from "CONSTANTS/images";

let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "white"};
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

const MediaDiv = styled(HeadContact)`
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
            <ContactWrap>
                <Navigation />
                <GreyWrap>
                    <ContainerContact>
                        <MediaDiv>
                            <HeadSpan>Media Contact</HeadSpan>
                            <hr />
                        </MediaDiv>
                        <CareerWrap>
                            <SubHead>
                                <LeftMedia>
                                    <img alt="media contact" src={_MEDIACONTACTICON} />
                                </LeftMedia>
                                <RightMedia>
                                    <img alt="media contact" src={_MEDIAWHITE} />
                                </RightMedia>
                            </SubHead>
                            <TextWrap>
                                <LeftRow>
                                    <LTDiv sm={24} md={12}>
                                        <ColWrapL>
                                            <MediaSpan>PRESS</MediaSpan>
                                            {this.state.contact !== null ?
                                                <MediaP>Please refer to <Link to="/blogs"><BlueTag>{contact.press}</BlueTag></Link> for our latest announcements.</MediaP>
                                                : ""}
                                        </ColWrapL>
                                    </LTDiv>
                                    <LLDiv sm={24} md={12}>
                                        <ColWrapR>
                                            <MediaSpan>MEDIA CONTACT</MediaSpan>
                                            {contact !== null ? <MediaP>{contact.media_name} <BlueTagP>{contact.media_email}</BlueTagP> </MediaP> : ""}
                                        </ColWrapR>

                                    </LLDiv>
                                </LeftRow>
                                <RightRow>
                                    <LTDiv sm={24} md={12}>
                                        <ColWrapL>
                                            <MediaSpan>MEDIA CONTACT</MediaSpan>
                                            {contact !== null ?
                                                <MediaUL>
                                                    <a target="_blank" href={`${contact.fb_profile}`}><MediaLI><img alt="FB" src={_MEDIAFB} /></MediaLI></a>
                                                    <a target="_blank" href={`${contact.twitter_profile}`}><MediaLI><img alt="Tweeter" src={_MEDIATWEETER} /></MediaLI></a>
                                                    <a target="_blank" href={`${contact.linkedin_profile}`}><MediaLI><img alt="LinkedIn" src={_MEDIALINKEDIN} /></MediaLI></a>
                                                    {/* <a target="_blank" href={`${contact.discord_profile}`}><Media_LI><img alt="DISCORD" src={_MEDIADISCORD} /></Media_LI></a> */}
                                                </MediaUL>
                                                : ""}
                                        </ColWrapL>
                                    </LTDiv>
                                    <LLDiv sm={24} md={12}>
                                        <ColWrapR>
                                            <MediaSpan>Support CONTACT</MediaSpan>
                                            <MediaP>Need customer support? For support requests and inquiries please visit <Link to="/contactus"><BlueTag>www.faldax.com/support.</BlueTag></Link></MediaP>
                                        </ColWrapR>
                                    </LLDiv>
                                </RightRow>
                            </TextWrap>
                        </CareerWrap>
                    </ContainerContact>
                </GreyWrap>
                <CommonFooter />
            </ContactWrap>
        );
    }
}

export default MediaContact;
