import React, { Component } from "react";
import "antd/dist/antd.css";
import { withRouter, Link } from "react-router-dom";
/* import { Spin } from 'antd'; */
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import Navigation from "COMPONENTS/NAVIGATIONS/navigation";
/* import { SpinEx } from 'STYLED-COMPONENTS/HOMEPAGE/style' */
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap,
  HeadContact,
  CareerHead,
  CareerDBody,
  BtnDiv,
  JobBtn,
  BodyDetails,
  BodyP,
  LocationP,
  DetailsP
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";

export const ContainerContact = styled(Container)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
`;

class CareerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: null,
      jobDetails: null,
      loader: false
    };
  }

  /* Life Cycle Methods */

  componentDidMount() {
    if (this.props.location.search) {
      let arr = this.props.location.search.split("=");
      if (arr[0].includes("jobID")) {
        this.setState({ loader: true });
        fetch(globalVariables.API_URL + `/jobs/get-job-detail?id=${arr[1]}`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              jobID: arr[1],
              jobDetails: responseData.data,
              loader: false
            });
          })
          .catch(error => {});
      }
    }
  }

  render() {
    const { jobDetails, jobID, loader } = this.state;
    return (
      <ContactWrap>
        <Navigation />
        <GreyWrap>
          <ContainerContact>
            <HeadContact>
              <CareerHead>Careers</CareerHead>
              <hr />
            </HeadContact>
            <CareerDBody>
              <BtnDiv>
                {jobDetails !== null ? (
                  <Link
                    to={`/applyjob?jobid=${jobID}&position=${jobDetails.position}`}
                  >
                    <JobBtn>Apply job</JobBtn>
                  </Link>
                ) : (
                  ""
                )}
              </BtnDiv>
              {jobDetails !== null ? (
                <BodyDetails>
                  <BodyP>{jobDetails.position}</BodyP>
                  <LocationP>{jobDetails.location}</LocationP>
                  <DetailsP>{ReactHtmlParser(jobDetails.short_desc)}</DetailsP>
                  <DetailsP>{ReactHtmlParser(jobDetails.job_desc)}</DetailsP>
                </BodyDetails>
              ) : (
                ""
              )}
            </CareerDBody>
          </ContainerContact>
        </GreyWrap>
        <CommonFooter />
        {loader ? <FaldaxLoader /> : ""}
      </ContactWrap>
    );
  }
}

export default withRouter(CareerDetails);
