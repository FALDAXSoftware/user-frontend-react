import React, { Component } from "react";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap,
  CareerWrap
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { globalVariables } from "Globals.js";

import HubspotForm from "react-hubspot-form";
import { getProfileDataAction } from "../../ACTIONS/SETTINGS/settingActions";

let API_URL = globalVariables.API_URL;

export const ContainerContact = styled(Container)`
  background-color: white;
  border-radius: 5px;
  padding-top: 30px;
  padding-right: 120px;
  padding-left: 120px;
  padding-bottom: 70px;
  @media (max-width: 992px) {
    padding-right: 30px;
    padding-left: 30px;
  }
  @media (max-width: 480px) {
    padding-right: 10px;
    padding-left: 10px;
  }
`;
const TicketTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color: black;
  &:before {
    content: "";
    width: calc(50% - 170px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: "";
    width: calc(50% - 170px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
  @media (max-width: 767px) {
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
`;

export const ContactCarrer = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
`;

class OpenTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (!this.props.profileDetails) {
      this.props.getProfileDataAction(this.props.isLoggedIn);
    }
  }
  render() {
    return (
      <ContactWrap>
        <Navigation />
        <GreyWrap>
          <ContainerContact>
            <ContactCarrer>
              <TicketTitle>Open a Ticket </TicketTitle>
            </ContactCarrer>
            <CareerWrap>
              <HubspotForm
                portalId="4933498"
                formId="4dd2d22b-70ec-4709-babe-aa5aad1d2455"
              />
            </CareerWrap>
          </ContainerContact>
        </GreyWrap>
        <CommonFooter />
      </ContactWrap>
    );
  }
}

// export default OpenTicket;
function mapStateToProps(state) {
  return {
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}
const mapDispatchToProps = dispatch => ({
  getProfileDataAction: isLoggedIn => dispatch(getProfileDataAction(isLoggedIn))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OpenTicket));
