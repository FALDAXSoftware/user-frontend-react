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
import {Contact_wrap,Grey_wrap,Headcontact,Head_span} from '../../styled-components/landingCategories/contactStyle';

export const ContainerContact = styled(Container)`
    background-color:white; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`

class CareerDetails extends React.Component
{
    render()
    {

        return(
            <Contact_wrap>
                <Navigation />
                    <Grey_wrap>
                        <ContainerContact>
                            <Headcontact>
                                        <Head_span>Careers</Head_span>
                                        <hr/>
                            </Headcontact>
                        </ContainerContact>
                    </Grey_wrap>
                <CommonFooter/>
            </Contact_wrap>
        );
    }
}

export default CareerDetails;