import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import {Contact_wrap,Grey_wrap,Head_span,Headcontact,Career_wrap,Subhead,Leftmedia,Rightmedia,Textwrap,LeftRow,RightRow,LT_div,Col_wrap_r,Col_wrap_l,LL_div,MediaUL,MediaLI,Mediaspan,MediaP,Blue_tag,Blue_tag_p} from '../../styled-components/landingCategories/contactStyle';
import {globalVariables} from "../../Globals"
let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:white; 
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

class MediaContact extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            contact:null,
        };
    }
    componentDidMount()
    {
        fetch(API_URL + "/get-contact-details",{
            method:"get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            /* console.log("I m in API get",responseData) */
            console.log(responseData)
            this.setState({contact:responseData.data});
        })
        .catch(error => { /* console.log(error) */ })
    }
    render()
    {

        return(
            <Contact_wrap>
                <Navigation />
                    <Grey_wrap>
                        <ContainerContact>
                            <Headcontact>
                                        <Head_span>Media Contact</Head_span>
                                        <hr/>
                            </Headcontact>
                            <Career_wrap>
                                <Subhead>
                                    <Leftmedia>
                                        <img src="/images/LandingCat/MediaContact.png"/>  
                                    </Leftmedia>
                                    <Rightmedia>
                                        <img src="/images/LandingCat/Media_white.png"/>
                                    </Rightmedia>
                                </Subhead>
                                <Textwrap>
                                    <LeftRow>
                                        <LT_div sm={24} md={12}>
                                            <Col_wrap_l>
                                                <Mediaspan>PRESS</Mediaspan>
                                                <MediaP>Please refer to <Blue_tag>blog.faldax.com</Blue_tag> for our latest announcements.</MediaP> 
                                            </Col_wrap_l>
                                        </LT_div>
                                        <LL_div sm={24} md={12}>
                                            <Col_wrap_r>
                                                <Mediaspan>MEDIA CONTACT</Mediaspan>
                                                {this.state.contact!==null?<MediaP>{this.state.contact.media_name} <Blue_tag_p>{this.state.contact.media_email}</Blue_tag_p> </MediaP>:""}
                                            </Col_wrap_r>
                                            
                                        </LL_div>
                                    </LeftRow>
                                    <RightRow>
                                        <LT_div sm={24} md={12}>
                                            <Col_wrap_l>
                                                <Mediaspan>MEDIA CONTACT</Mediaspan>
                                                {this.state.contact!==null?
                                                    <MediaUL>
                                                        <a href={`${this.state.contact.social_facebook}`}><MediaLI><img src="/images/LandingCat/media_fb.png"/></MediaLI></a>
                                                        <a href={`${this.state.contact.social_twitter}`}><MediaLI><img src="/images/LandingCat/media_tweet.png"/></MediaLI></a>
                                                        <a href={`${this.state.contact.social_gplus}`}><MediaLI><img src="/images/LandingCat/media_google.png"/></MediaLI></a>
                                                        <a href={`${this.state.contact.social_linkedin}`}><MediaLI><img src="/images/LandingCat/media_IN.png"/></MediaLI></a>
                                                    </MediaUL>
                                                :""}
                                            </Col_wrap_l>
                                        </LT_div>
                                        <LL_div sm={24} md={12}>
                                            <Col_wrap_r>
                                                <Mediaspan>Support CONTACT</Mediaspan>
                                                <MediaP>Need customer support? For support requests and inquiries please visit <Blue_tag>fanrax.com/support.</Blue_tag></MediaP>
                                            </Col_wrap_r>
                                        </LL_div>
                                    </RightRow>
                                </Textwrap>
                            </Career_wrap>
                        </ContainerContact>
                    </Grey_wrap>
                <CommonFooter/>
            </Contact_wrap>
        );
    }
}

export default MediaContact;