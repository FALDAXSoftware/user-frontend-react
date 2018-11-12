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
import {Contact_wrap,Grey_wrap,Head_span,Headcontact,Career_wrap,Subhead,Leftmedia,Rightmedia,Textwrap,LeftText,RightText,LT_div,LL_div,MediaUL,MediaLI,Mediaspan,MediaP} from '../../styled-components/landingCategories/contactStyle';

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
                                    <LeftText>
                                        <LT_div>
                                            <Mediaspan>PRESS</Mediaspan>
                                            <MediaP>Please refer to blog.faldax.com for our latest announcements.</MediaP>
                                        </LT_div>
                                        <LL_div>
                                            <Mediaspan>MEDIA CONTACT</Mediaspan>
                                            <MediaUL>
                                                <MediaLI><img src="/images/LandingCat/media_fb.png"/></MediaLI>
                                                <MediaLI><img src="/images/LandingCat/media_tweet.png"/></MediaLI>
                                                <MediaLI><img src="/images/LandingCat/media_google.png"/></MediaLI>
                                                <MediaLI><img src="/images/LandingCat/media_IN.png"/></MediaLI>
                                            </MediaUL>
                                        </LL_div>
                                    </LeftText>
                                    <RightText>
                                        <LT_div>
                                            <Mediaspan>MEDIA CONTACT</Mediaspan>
                                            <MediaP>Thomas Davies aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa faldax@thomasdavies.com </MediaP>
                                        </LT_div>
                                        <LL_div>
                                            <Mediaspan>Support CONTACT</Mediaspan>
                                            <MediaP>Need customer support? For support requests and inquiries please visit fanrax.com/support.</MediaP>
                                        </LL_div>
                                    </RightText>
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