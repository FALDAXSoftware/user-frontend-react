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


let { API_URL } = globalVariables;

const Title = styled.p`
    text-align:center;
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
    padding-top:45px;
    font-family:"Open Sans";
    font-size:40px;
`
const Whole_wrap = styled.div`
    padding:40px;
`
const Ticket_wrap = styled.div`
padding-top:20px;
    padding-bottom:25px;
    border-bottom:${props => props.theme.mode == "dark" ? "2px solid #ffffff54" : "2px solid #0000002b"};
`
const Ticket_Title = styled.div`
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
    font-size:20px;
`
const Desc = styled.div`
color:${props => props.theme.mode == "dark" ? "white" : "black"};
    margin-top:10px;
    font-size:16px;
`
const Status = styled.div`
color:${props => props.theme.mode == "dark" ? "white" : "black"};
margin-top:10px;
display: flex;
    align-items: center;
`
const Date = styled.span`
padding-right: 8px;
    
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
        return (
            <div>
                {/* <LoggedNavigation /> */}
                <Navigation />
                <ProfileWrapper>
                    <ProfileDiv>
                        <Title>Tickets</Title>
                        <Whole_wrap>
                            {this.state.ticketData !== null ?
                                this.state.ticketData.length > 0 ?
                                    this.state.ticketData.map(function (temp, index) {

                                        return (

                                            <Ticket_wrap>
                                                <Ticket_Title>
                                                    <b>{temp.properties.subject && temp.properties.subject.value} - #{temp.objectId && temp.objectId}</b>
                                                </Ticket_Title>
                                                <Desc>
                                                    {temp.properties.content && temp.properties.content.value}
                                                </Desc>
                                                <Status>
                                                    <Date>{temp.properties.subject && moment.utc(temp.properties.subject.timestamp).local().format("MM/DD/YYYY")}</Date>
                                                    {temp.properties.status && <Stat>{temp.properties.status.value}</Stat>}
                                                </Status>
                                            </Ticket_wrap>

                                        );
                                    })
                                    :
                                    <NDF>No Data Found</NDF>
                                : ""
                            }
                        </Whole_wrap>
                    </ProfileDiv>
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

    })
}
export default connect(mapStateToProps, null)(HubSpot);