import React, { Component } from "react";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { Button, notification } from "antd";
import styled from "styled-components";
import Navigation from "COMPONENTS/NAVIGATIONS/navigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap,
  JobWrap,
  BodyDetailsJob,
  JobHead,
  LocationP
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
const NDF = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
const CatHead = styled(JobHead)`
  font-size: 25px;
  font-weight: 650;
  color: #525050;
  text-transform: uppercase;
`;
const Position = styled(JobHead)`
  display: inline-block;
`;
const BorderDiv = styled.div`
  color: #525050;
  width: 80px;
  height: 1px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;
const ApplyBtn = styled(Button)`
  min-width: 114px;
  background-color: #4c84ff;
  border: none;
  border-radius: 5px;
  min-height: 40px;
  color: white;
  float: right;
`;
const CareerTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  &:before {
    content: "";
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: "";
    width: calc(50% - 140px);
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

export const ContactStyle = styled.div`
  display: "inline-block";
  width: 100%;
  position: relative;
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

  /* Life Cycle Methods */
  componentDidMount() {
    this.setState({ loader: true });
    fetch(globalVariables.API_URL + `/all-jobs`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          this.setState({
            Jobs: responseData.data,
            careerDesc: responseData.careerDesc,
            loader: false
          });
        } else {
          this.setState({ loader: false });
          this.openNotificationWithIcon("error", "Error", responseData.err);
        }
      })
      .catch(error => {
        this.setState({ loader: false });
      });
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }
  render() {
    var me = this;
    let flag = false;
    return (
      <ContactWrap>
        <Navigation />
        <GreyWrap>
          <ContainerContact>
            <ContactStyle>
              <CareerTitle>Careers </CareerTitle>
            </ContactStyle>
            {/* <Careerdesc>
                            <Deschead>careers</Deschead>
                            <Descbody>{(this.state.careerDesc) ? ReactHtmlParser(this.state.careerDesc.content) : ''}</Descbody>
                        </Careerdesc> */}
            <JobWrap>
              {this.state.Jobs.length > 0
                ? this.state.Jobs.map(function(jobCat, key) {
                    if (jobCat.jobs.length > 0) {
                      flag = true;
                    }
                    let jobs = jobCat.jobs
                      ? jobCat.jobs.map((job, index) => {
                          let _this = this;
                          return (
                            <BodyDetailsJob key={index}>
                              <Link
                                to={decodeURI(
                                  `/career-details?jobID=${job.id}`
                                )}
                              >
                                <Position>{job.position}</Position>
                              </Link>
                              <ApplyBtn
                                type="primary"
                                onClick={() => {
                                  me.props.history.push(
                                    `/applyjob?jobid=${job.id}&position=${job.position}`
                                  );
                                }}
                              >
                                Apply
                              </ApplyBtn>
                              <LocationP>{job.location}</LocationP>
                              {/* {job.short_desc ? <Body_p>{job.short_desc}</Body_p> : ''} */}
                            </BodyDetailsJob>
                          );
                        })
                      : "";
                    return (
                      <BodyDetailsJob>
                        {jobCat.jobs.length > 0 ? (
                          <div>
                            <CatHead>{jobCat.category}</CatHead>
                            <BorderDiv> </BorderDiv>
                          </div>
                        ) : (
                          ""
                        )}
                        {jobs}
                      </BodyDetailsJob>
                    );
                  })
                : ""}
              {flag === false ? <NDF>NO DATA FOUND</NDF> : ""}
            </JobWrap>
          </ContainerContact>
        </GreyWrap>
        <CommonFooter />
        {this.state.loader ? <FaldaxLoader /> : ""}
      </ContactWrap>
    );
  }
}

export default withRouter(Careers);
