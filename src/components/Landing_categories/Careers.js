import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';
import { Spin, Button } from 'antd';
import styled from 'styled-components';
import Navigation from '../Navigations/Navigation';
import { Spin_Ex } from '../../styled-components/homepage/style'
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import {
    Contact_wrap, Grey_wrap, Headcontact, Head_span, Job_wrap, Body_details_job, Job_head, Location_p
} from '../../styled-components/landingCategories/contactStyle';
import { globalVariables } from "../../Globals"

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`
const CareerDiv = styled(Headcontact)`
    text-align: center;
`
const Cat_head = styled(Job_head)`
    font-size: 25px;
    font-weight: 650;
    color: #525050;
    text-transform: uppercase;
`
const Position = styled(Job_head)`
    display: inline-block;
`
const BorderDiv = styled.div`
    color: #525050;
    width: 80px;
    height: 1px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
`
const ApplyBtn = styled(Button)`
    min-width: 114px;
    background-color: #4c84ff;
    border: none;
    border-radius: 5px;
    min-height: 40px;
    color: white;
    float: right;
`

class Careers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            careerDesc: [],
            Jobs: [],
            loader: false
        };
    }
    componentDidMount() {
        this.setState({ loader: true })
        fetch(globalVariables.API_URL + `/all-jobs?page=1&limit=50`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({ Jobs: responseData.data, careerDesc: responseData.careerDesc, loader: false })
            })
            .catch(error => { })

    }
    render() {
        console.log(this.props);
        var me = this;
        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <CareerDiv>
                            <Head_span>Careers</Head_span>
                            <hr />
                        </CareerDiv>
                        {/* <Career_desc>
                            <Desc_head>careers</Desc_head>
                            <Desc_body>{(this.state.careerDesc) ? ReactHtmlParser(this.state.careerDesc.content) : ''}</Desc_body>
                        </Career_desc> */}
                        <Job_wrap>
                            {this.state.Jobs.length > 0 ?
                                this.state.Jobs.map(function (jobCat, key) {
                                    let jobs = jobCat.jobs ?
                                        jobCat.jobs.map((job) => {
                                            let _this = this;
                                            return (
                                                <Body_details_job>
                                                    <Link to={decodeURI(`/careerdetails?jobID=${job.id}`)}>
                                                        <Position>{job.position}</Position>
                                                    </Link>
                                                    <ApplyBtn type="primary" onClick={() => { me.props.history.push(`/applyjob?jobid=${job.id}&position=${job.position}`) }} >Apply</ApplyBtn>
                                                    <Location_p>{job.location}</Location_p>
                                                    {/* {job.short_desc ? <Body_p>{job.short_desc}</Body_p> : ''} */}
                                                </Body_details_job>
                                            )
                                        })
                                        : '';
                                    return (
                                        <Body_details_job>
                                            {jobCat.jobs.length > 0 ?
                                                <div><Cat_head>{jobCat.category}</Cat_head>
                                                    <BorderDiv> </BorderDiv>
                                                </div>
                                                : ''}
                                            {jobs}
                                        </Body_details_job>
                                    );
                                })
                                : ''}
                        </Job_wrap>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Contact_wrap>
        );
    }
}

export default withRouter(Careers);
