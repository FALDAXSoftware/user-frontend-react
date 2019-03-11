import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Navigation from '../Navigations/Navigation';
import { Spin_Ex } from '../../styled-components/homepage/style'
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import {
    Contact_wrap, Grey_wrap, Headcontact, Career_Head, CareerD_body, Btn_div,
    Job_btn, Body_details, Body_p, Location_p, Details_p
} from '../../styled-components/landingCategories/contactStyle';
import { globalVariables } from "../../Globals"

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`

class CareerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobID: null,
            jobDetails: null,
            loader: false
        };
    }
    componentDidMount() {
        if (this.props.location.search) {
            let arr = this.props.location.search.split('=');
            if (arr[0].includes("jobID")) {
                this.setState({ loader: true })
                fetch(globalVariables.API_URL + `/jobs/get-job-detail?id=${arr[1]}`, {
                    method: "get",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(response => response.json())
                    .then((responseData) => {
                        this.setState({ jobID: arr[1], jobDetails: responseData.data, loader: false })
                    })
                    .catch(error => { })
            }
        }
    }

    render() {
        const { jobDetails, jobID, loader } = this.state;
        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <Headcontact>
                            <Career_Head>Careers</Career_Head>
                            <hr />
                        </Headcontact>
                        <CareerD_body>
                            <Btn_div>
                                {jobDetails !== null ?
                                    <Link to={`/applyjob?jobid=${jobID}&position=${jobDetails.position}`}><Job_btn>Apply job</Job_btn></Link>
                                    : ""}
                            </Btn_div>
                            {jobDetails !== null ?
                                <Body_details>
                                    <Body_p>{jobDetails.position}</Body_p>
                                    <Location_p>{jobDetails.location}</Location_p>
                                    <Details_p>{ReactHtmlParser(jobDetails.job_desc)}</Details_p>
                                </Body_details> : ''
                            }
                        </CareerD_body>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
                {(loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Contact_wrap>
        );
    }
}

export default withRouter(CareerDetails);
