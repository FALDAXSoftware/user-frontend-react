import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import {Contact_wrap,Grey_wrap,Headcontact,Head_span,Career_desc,Desc_head,Desc_body,Job_wrap,Body_details_job,Job_head,Body_p,Location_p} from '../../styled-components/landingCategories/contactStyle';
import { globalVariables } from "../../Globals"

export const ContainerContact = styled(Container)`
    background-color:white; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`

class Careers extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            careerDesc : [],
            Jobs : []
        };
    }
    componentDidMount()
    {
        fetch(globalVariables.API_URL + `/all-jobs?page=1&limit=50`,{
            method:"get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            this.setState({Jobs:responseData.data,careerDesc:responseData.careerDesc})
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
                                        <Head_span>Careers</Head_span>
                                        <hr/>
                            </Headcontact>
                            <Career_desc>
                                <Desc_head>careers</Desc_head>
                                {console.log(this.state)}
                                <Desc_body>{(this.state.careerDesc)?ReactHtmlParser(this.state.careerDesc.content):''}</Desc_body>
                            </Career_desc>
                            <Job_wrap>
                                {this.state.Jobs.length>0?
                                    this.state.Jobs.map(function(job,key){
                                        console.log(job,key)
                                        return (
                                            <Body_details_job>
                                                <Link to={`/careerdetails?jobID=${job.id}`}><Job_head>{job.position}</Job_head></Link>
                                                <Body_p>{job.short_desc}</Body_p>
                                                <Location_p>{job.location}</Location_p>
                                            </Body_details_job>
                                        );
                                    })
                                :''}
                            </Job_wrap>
                        </ContainerContact>
                    </Grey_wrap>
                <CommonFooter/>
            </Contact_wrap>
        );
    }
}

export default Careers;