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
import {Contact_wrap,Grey_wrap,Headcontact,Career_Head,CareerD_body,Btn_div,Job_btn,Body_details,Body_p,Location_p,Details_p} from '../../styled-components/landingCategories/contactStyle';
import { globalVariables } from "../../Globals"

export const ContainerContact = styled(Container)`
    background-color:white; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`

class CareerDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            jobID:null,
            jobDetails:null
        };
    }
    componentDidMount()
    {
        if(this.props.location.search)
        {
            let arr = this.props.location.search.split('=');
            if(arr[0].includes("jobID"))
            {
                fetch(globalVariables.API_URL + `/jobs/get-job-detail?id=${arr[1]}`,{
                    method:"get",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then((responseData) => {
                    this.setState({jobID:arr[1],jobDetails:responseData.data})
                })
                .catch(error => { console.log(error) })
            }
        }
    }
    render()
    {
        console.log(this.props)
        return(
            <Contact_wrap>
                <Navigation />
                    <Grey_wrap>
                        <ContainerContact>
                            <Headcontact>
                                        <Career_Head>Careers</Career_Head>

                                        <hr/>
                            </Headcontact>
                            <CareerD_body>
                                <Btn_div>
                                    <Link to={`/applyjob?jobid=${this.state.jobID}`}><Job_btn>Apply job</Job_btn></Link>
                                </Btn_div>
                                {this.state.jobDetails!==null?
                                    <Body_details>
                                        <Body_p>{this.state.jobDetails.position}</Body_p>
                                        <Location_p>{this.state.jobDetails.location}</Location_p>
                                        <Details_p>{this.state.jobDetails.job_desc}</Details_p>
                                    </Body_details>:''
                                }
                            </CareerD_body>
                        </ContainerContact>
                    </Grey_wrap>
                <CommonFooter/>
            </Contact_wrap>
        );
    }
}

export default withRouter(CareerDetails);