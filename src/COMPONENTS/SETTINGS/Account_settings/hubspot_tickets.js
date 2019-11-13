/* Built-in packages */

import React, { Component } from "react";
import "antd/dist/antd.css";
import { /* Row, */ Col } from "antd";
import { connect } from "react-redux";
import moment from "moment";

/* components */
import Navigation from "COMPONENTS/NAVIGATIONS/navigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";

/* STYLED-COMPONENTS */
import { ProfileWrapper } from "../edit_profile";
import {
  TicketContainer,
  TicketDiv,
  WholeWrap,
  TicketWrap,
  Title,
  Desc,
  Status,
  Date,
  NDF,
  TicketTitle
} from "STYLED-COMPONENTS/SETTINGS/hubspotStyle";
import styled from "styled-components";

export const TicketWholeWarp = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
`;

export const DateSpan = styled.span`
  white-space: nowrap;
`;

let { API_URL } = globalVariables;

class HubSpotTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketData: null,
      loader: false
    };
  }
  /* Life-Cycle Methods */
  componentDidMount() {
    this.setState({ loader: true });
    fetch(API_URL + `/get-all-tickets`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ loader: false, ticketData: responseData.tickets });
      })
      .catch(error => {
        this.setState({ loader: false });
      });
  }
  render() {
    const { ticketData, loader, ticketCount } = this.state;
    const statusArray = [
      {
        title: "New",
        color: "#6fa82f"
      },
      {
        title: "Waiting On Contact",
        color: "#ffc107"
      },
      {
        title: "Waiting On Us",
        color: "#ffc107"
      },
      {
        title: "Closed",
        color: "#f5222d"
      }
    ];

    return (
      <div>
        {/* <LoggedNavigation /> */}
        <Navigation />
        <ProfileWrapper>
          <TicketContainer>
            <TicketDiv>
              <TicketWholeWarp>
                <TicketTitle>All Tickets </TicketTitle>
              </TicketWholeWarp>
              <WholeWrap>
                {ticketData && ticketData.length > 0
                  ? ticketData &&
                    ticketData.map((temp, index) => (
                      <TicketWrap>
                        <Col md={4} lg={3}>
                          <Date>
                            {temp.properties.subject &&
                              moment
                                .utc(temp.properties.subject.timestamp)
                                .local()
                                .format(
                                  this.props.profileDetails.date_format
                                )}{" "}
                          </Date>
                          <Date>
                            <DateSpan>
                              {temp.properties.subject &&
                                moment
                                  .utc(temp.properties.subject.timestamp)
                                  .local()
                                  .format("hh:mm A")}
                            </DateSpan>{" "}
                          </Date>
                          {temp.properties.hs_pipeline_stage && (
                            <Status
                              color={
                                statusArray[
                                  parseInt(
                                    temp.properties.hs_pipeline_stage.value
                                  ) - 1
                                ].color
                              }
                            >
                              {
                                statusArray[
                                  parseInt(
                                    temp.properties.hs_pipeline_stage.value
                                  ) - 1
                                ].title
                              }
                            </Status>
                          )}
                        </Col>
                        <Col md={20} lg={21}>
                          <Title>
                            {temp.properties.subject &&
                              temp.properties.subject.value}
                          </Title>
                          <Desc>
                            {temp.properties.content &&
                              temp.properties.content.value}
                          </Desc>
                        </Col>
                      </TicketWrap>
                    ))
                  : !loader && <NDF>NO DATA FOUND</NDF>}
              </WholeWrap>
            </TicketDiv>
          </TicketContainer>
        </ProfileWrapper>
        <FooterHome />
        {loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
}

export default connect(mapStateToProps, null)(HubSpotTickets);
