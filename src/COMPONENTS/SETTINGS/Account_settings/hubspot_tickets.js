/* Built-in packages */

import React, { Component } from "react";
import "antd/dist/antd.css";
import { /* Row, */ Col } from "antd";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import moment from "moment";
import ShowMore from "react-show-more";

/* components */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
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
  TicketA,
  TicketTitle,
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
      loader: false,
      showDescription: false,
    };
    this.t = this.props.t;
  }
  /* Life-Cycle Methods */
  componentDidMount() {
    this.setState({ loader: true });
    fetch(API_URL + `/get-all-tickets`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ loader: false, ticketData: responseData.tickets });
      })
      .catch((error) => {
        this.setState({ loader: false });
      });
  }
  render() {
    const { ticketData, loader, ticketCount } = this.state;
    const statusArray = {
      0: {
        title: this.t("general_1:ticket_status_new_text.message"),
        color: "#6fa82f",
        font_color: "#FFFFFF",
      },
      1: {
        title: this.t("general_1:ticket_status_waiting_text.message"),
        color: "#ffff00",
        font_color: "#000000",
      },
      2: {
        title: this.t("general_1:ticket_status_waiting_us_text.message"),
        color: "#ffff00",
        font_color: "#000000",
      },
      3: {
        title: this.t("general_1:ticket_status_closed_text.message"),
        color: "#1890ff ",
        font_color: "#FFFFFF",
      },
      420731: {
        title: this.t("general_1:ticket_status_unresolved_closed_text.message"),
        color: "#FF0000",
        font_color: "#ffffff",
      },
    };

    return (
      <div>
        {/* <LoggedNavigation /> */}
        <Navigation />
        <ProfileWrapper>
          <TicketContainer>
            <TicketDiv>
              <TicketWholeWarp>
                <TicketTitle>
                  {this.t("support_text_all_tickets.message")}
                </TicketTitle>
              </TicketWholeWarp>
              <WholeWrap>
                {ticketData && ticketData.length > 0
                  ? ticketData &&
                    ticketData.map((temp, index) => (
                      <TicketWrap>
                        <Col md={4} lg={5}>
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
                              className={
                                statusArray[
                                  parseInt(
                                    temp.properties.hs_pipeline_stage.value
                                  ) - 1
                                ].title
                              }
                              color={
                                statusArray[
                                  parseInt(
                                    temp.properties.hs_pipeline_stage.value
                                  ) - 1
                                ].color
                              }
                              font_color={
                                statusArray[
                                  parseInt(
                                    temp.properties.hs_pipeline_stage.value
                                  ) - 1
                                ].font_color
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
                        <Col md={20} lg={19}>
                          <Title>
                            {temp.properties.subject &&
                              temp.properties.subject.value}
                          </Title>
                          <ShowMore
                            lines={4}
                            more={this.t(
                              "general_1:ticket_read_more_text.message"
                            )}
                            less={this.t(
                              "general_1:ticket_read_less_text.message"
                            )}
                            anchorClass=""
                          >
                            {temp.properties.content &&
                            temp.properties.content.value
                              ? temp.properties.content.value
                              : ""}
                          </ShowMore>
                        </Col>
                      </TicketWrap>
                    ))
                  : !loader && <NDF>{this.t("no_data_found.message")}</NDF>}
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
        : "",
  };
}
export default translate(["support", "general_1"])(
  connect(mapStateToProps, null)(HubSpotTickets)
);
