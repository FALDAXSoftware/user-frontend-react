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
import {Contact_wrap,Grey_wrap,Head,Head_title,Subtitle,Head_desc,Body,BodyText,Body_form,Form_coin,CoinInput,URLInput,TargetInput,EmailInput,MsgInput,LeftP,RightInput,Left,OneDiv,TwoDiv,ThreeDiv,FourDiv,FiveDiv,AddButton,Msg} from '../../styled-components/landingCategories/contactStyle';    


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
                            <Head>
                                <Head_title>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Head_title>
                                <Subtitle>Here are the requirements to list your coin:</Subtitle>
                                <Head_desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Head_desc>
                            </Head>
                            <Body>
                                <BodyText>Please fill out this form or email at relations@fandax.com to apply:</BodyText>
                                <Body_form>
                                    <Form_coin>
                                        <OneDiv>
                                        <Row>
                                            <Col span={10}>
                                                <Left>
                                                    <p>Coin/Token Name*</p>
                                                    </Left>
                                            </Col>
                                            <Col span={14}>
                                                <CoinInput/>
                                            </Col>
                                        </Row>
                                        </OneDiv>
                                        <TwoDiv>
                                        <Row>
                                            <Col span={10}>
                                                <Left>
                                                    <p>Website URL*</p>
                                                </Left>
                                            </Col>
                                            <Col span={14}>
                                                <URLInput/>
                                            </Col>
                                        </Row>
                                        </TwoDiv>
                                        <ThreeDiv>
                                        <Row>
                                            <Col span={10}>
                                                <Left>
                                                    <p>Target Date of Integration*</p>
                                                </Left>    
                                            </Col>
                                            <Col span={14}>
                                                <TargetInput/>
                                            </Col>
                                        </Row>
                                        </ThreeDiv>
                                        <FourDiv>
                                        <Row>
                                            <Col span={10}>
                                                <Left>
                                                    <p>Email*</p>
                                                </Left>
                                            </Col>
                                            <Col span={14}>
                                                <EmailInput/>
                                            </Col>
                                        </Row>
                                        </FourDiv>
                                        <FiveDiv>
                                        <Row>
                                            <Col span={10}>
                                                <Msg>
                                                    <p>Message*</p>
                                                </Msg>
                                            </Col>
                                            <Col span={14}>
                                                <MsgInput/>
                                                <AddButton>SUBMIT</AddButton>
                                            </Col>
                                        </Row>
                                        </FiveDiv>
                                    </Form_coin>
                                </Body_form>
                            </Body>
                        </ContainerContact>
                    </Grey_wrap>
                <CommonFooter/>
            </Contact_wrap>
        );
    }
}

export default MediaContact;