import React, { Component } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import Navigation from "COMPONENTS/NAVIGATIONS/navigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap,
  CareerWrap
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { globalVariables } from "Globals.js";

import HubspotForm from "react-hubspot-form";

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
const TokComHead = styled.span`
  font-size: 80px;
  line-height: 100px;
  color: #24262e;
  display: block;
  text-align: center;
  font-weight: 100;
  margin: 0 0 17px 0;
  font-family: "Open sans";
`;
const TokComSubHead = styled.span`
  color: #5f727f;
  font-weight: 200;
  font-size: 21px;
  line-height: 35px;
  text-align: center;
  display: block;
  font-family: "Open sans";
`;

class TokenComingSoon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ContactWrap>
        <Navigation />
        <GreyWrap>
          <ContainerContact>
            <TokComHead>We’re coming soon…</TokComHead>
            <TokComSubHead>
              We are working very hard to give you the best experience possible!
            </TokComSubHead>
            <CareerWrap>
              {/* <iframe style={{ border: 'none' }} height="1100px" width="100%" src={APIURL + "/get-open-ticket-form"}></iframe> */}
              {/* <HubspotForm
                portalId="4933498"
                formId="7d75a7de-29f9-4966-bda2-dd5bdc4e7c92"
              /> */}
              <iframe
                title="title"
                style={{ border: "none" }}
                height="250px"
                width="100%"
                src={API_URL + "/get-token-coming-soon-form"}
              ></iframe>
            </CareerWrap>
          </ContainerContact>
        </GreyWrap>
        <CommonFooter />
      </ContactWrap>
    );
  }
}

export default TokenComingSoon;
