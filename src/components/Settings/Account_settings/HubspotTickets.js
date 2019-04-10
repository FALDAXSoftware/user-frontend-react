import styled from 'styled-components';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import moment from 'moment'
import Navigation from '../../Navigations/Navigation';
import Footer_home from "../../Landing/Footers/Footer_home";
import { ProfileWrapper, ProfileDiv } from '../EditProfile'
import { globalVariables } from '../../../Globals';
import FaldaxLoader from '../../../shared-components/FaldaxLoader';
import { Row, Col } from 'antd';

let { API_URL } = globalVariables;

const Ticket_Div = styled(ProfileDiv)`
    background-color:transparent;
`
const Whole_wrap = styled.div`
    padding-top: 50px;
`
const Ticket_wrap = styled(Row)`
border-radius: 10px;
background-color: ${props => props.theme.mode == "dark" ? "#041422" : "rgb( 255, 255, 255 )"};
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
const NDF = styled.div`
    display:flex;
    justify-content:center;
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
    font-weight:600;
`
const TicketTitle = styled.span`
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

class HubSpotTickets extends Component {
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
        const { ticketData, loader } = this.state;
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
                        <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                            <TicketTitle>All Tickets </TicketTitle>
                        </div>
                        <Whole_wrap>
                            {ticketData.length > 0 ? ticketData && ticketData.map((temp, index) => (
                                <Ticket_wrap>
                                    <Col md={4} lg={3}>
                                        <Date style={{ display: "block" }}>{temp.properties.subject && moment.utc(temp.properties.subject.timestamp).local().format(this.props.profileDetails.date_format)} </Date>
                                        <Date><span style={{ whiteSpace: "nowrap" }}>{temp.properties.subject && moment.utc(temp.properties.subject.timestamp).local().format("hh:mm A")}</span> </Date>
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
                                : <NDF>No Data Found</NDF>
                            }

                        </Whole_wrap>
                    </Ticket_Div>
                </ProfileWrapper >
                <Footer_home />
                {(loader == true) ? <FaldaxLoader /> : ""}
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

export default connect(mapStateToProps, null)(HubSpotTickets);
