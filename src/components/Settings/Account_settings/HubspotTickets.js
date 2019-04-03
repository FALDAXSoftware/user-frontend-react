import styled from 'styled-components';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { connect } from "react-redux"
import moment from 'moment'

import Navigation from '../../Navigations/Navigation';
import Footer_home from "../../Landing/Footers/Footer_home";
import { Spin_Ex } from '../Personaldetails/PersonalDetails'

import { ProfileWrapper, ProfileDiv } from '../EditProfile'
import { globalVariables } from '../../../Globals';
import { faHubspot } from '@fortawesome/free-brands-svg-icons';
import FaldaxLoader from '../../../shared-components/FaldaxLoader';
import { Row, Col } from 'antd';


let { API_URL } = globalVariables;
const Ticket_Div = styled(ProfileDiv)`
    background-color:transparent;
`
const Title = styled.p`
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
    padding-top:45px;
    font-family:"Open Sans";
    font-size:40px;
`
const Whole_wrap = styled.div`

`
const Ticket_wrap = styled(Row)`
border-radius: 10px;
background-color: rgb( 255, 255, 255 );
box-shadow: 0px 2px 7px 0px rgba(51, 51, 51, 0.16);
padding:40px;
margin-bottom:20px;
`
const Ticket_Title = styled.div`
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
    font-family:"Open Sans";
    font-size: 20px;
    font-weight: bold;
`
const Desc = styled.div`
color:${props => props.theme.mode == "dark" ? "white" : "#666666"};
    margin-top:10px;
    font-size: 16px;
`
const Status = styled.div`
color:white;
margin-top:13px;
display: flex;
align-items: center;
padding: 3px 10px;
font-size: 14px;
color: white;
width: 80px;
text-align: center;
display: block;
border-radius: 5px;
  background-color: ${props => props.color};
`
const Date = styled.span`
padding-right: 8px;
font-size: 14px;
line-height: 2.3;
    
color:${props => props.theme.mode == "dark" ? "#ccbebe69" : "#00000070"};
`
const Stat = styled.span`
    text-transform: uppercase;
    padding-left: 8px;
    border-left: 1px solid #00000070;
    color:${props => props.theme.mode == "dark" ? "#ccbebe69" : "#00000070"};
`
const NDF = styled.p`
    color:${props => props.theme.mode == "dark" ? "white" : "#00000069"};
    text-align:center;
    font-size:20px;
    margin-top:100px;
`
class HubSpot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketData: null,
            loader: false
        };
    }
    componentDidMount() {
        this.setState({ loader: true });
        fetch(API_URL + `/get-all-tickets`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {

                this.setState({ loader: false, ticketData: responseData.tickets })
            })
            .catch(error => {
                this.setState({ loader: false });
            })
    }
    render() {
        const statusArray = [
            {
                title: "New",
                color: "#6fa82f"
            },
            {
                title: "Waiting",
                color: "#ffc107"
            },
            {
                title: "Waiting",
                color: "#ffc107"
            },
            {
                title: "Closed",
                color: "#f5222d"
            }
        ]
        return (
            <div>
                {/* <LoggedNavigation /> */}
                <Navigation />
                <ProfileWrapper>
                    <Ticket_Div>
                        <Title>All Tickets</Title>
                        <Whole_wrap>
                            {this.state.ticketData &&

                                this.state.ticketData.map((temp, index) => (
                                    <Ticket_wrap>
                                        <Col md={4} lg={3}>
                                            <Date>{temp.properties.subject && moment.utc(temp.properties.subject.timestamp).local().format(this.props.profileDetails.date_format)}</Date>
                                            {temp.properties.hs_pipeline_stage &&
                                                <Status color={statusArray[parseInt(temp.properties.hs_pipeline_stage.value) - 1].color}>{statusArray[parseInt(temp.properties.hs_pipeline_stage.value) - 1].title}</Status>
                                            }
                                        </Col>
                                        <Col md={20} lg={21}>
                                            <Ticket_Title>{temp.properties.subject && temp.properties.subject.value}</Ticket_Title>
                                            <Desc>{temp.properties.content && temp.properties.content.value}</Desc>
                                        </Col>
                                    </Ticket_wrap>
                                ))
                            }

                        </Whole_wrap>
                    </Ticket_Div>
                </ProfileWrapper >
                <Footer_home />
                {(this.state.loader == true) ?
                    <FaldaxLoader />
                    : ""
                }
            </div >
        );
    }
}
function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : ""
    })
}
export default connect(mapStateToProps, null)(HubSpot);