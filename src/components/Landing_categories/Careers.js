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
import FaldaxLoader from '../../shared-components/FaldaxLoader'

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`
const NDF = styled.div`
    height:300px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:600;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
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
const CareerTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode == "dark" ? "white" : ""};
  &:before {
    content: '';
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
  @media(max-width:767px)
  {
    &:before {
      display:none;
    }
    &:after {
      display:none;
    }
  }
`;

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
        fetch(globalVariables.API_URL + `/all-jobs`, {
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
        var me = this;
        let flag = false;
        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                            <CareerTitle>Careers </CareerTitle>
                        </div>
                        {/* <Career_desc>
                            <Desc_head>careers</Desc_head>
                            <Desc_body>{(this.state.careerDesc) ? ReactHtmlParser(this.state.careerDesc.content) : ''}</Desc_body>
                        </Career_desc> */}
                        <Job_wrap>
                            {this.state.Jobs.length > 0 ?
                                this.state.Jobs.map(function (jobCat, key) {
                                    if (jobCat.jobs.length > 0) {
                                        flag = true;
                                    }
                                    let jobs = jobCat.jobs ?
                                        jobCat.jobs.map((job, index) => {
                                            let _this = this;
                                            return (
                                                <Body_details_job key={index}>
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
                                                : ""}
                                            {jobs}
                                        </Body_details_job>
                                    );
                                })
                                : ""}
                            {
                                flag == false ?
                                    <NDF>NO DATA FOUND</NDF>
                                    : ""
                            }
                        </Job_wrap>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
                {(this.state.loader) ? <FaldaxLoader /> : ""}
            </Contact_wrap>
        );
    }
}

export default withRouter(Careers);
