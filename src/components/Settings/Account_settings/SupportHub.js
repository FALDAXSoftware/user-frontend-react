/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'
/* Styled Components */
const Header_text = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color:${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    margin-top:20px;
    text-align:center;
`
const Ref_div = styled.div`
    margin:auto;
    width:80%;
    height:140px;
    margin-top:40px;
    height:auto;
    margin-bottom:80px;
`
const OpenTicketRow = styled(Row)`
  padding-top: 20px;
  @media(max-width:767px)
  {
    & a
    {
      padding-top: 20px;
    }
  }
`
const DivWrap = styled.div`
  margin-top:20px;
  width:300px;
  margin-left:auto;
  margin-right:auto;
  @media(max-width:575px)
  {
      width:100%;
  }
  @media(min-width:1600px)
  {
    width:60%;
  }
`
const CardText = styled.h4`
  margin-bottom: 0px;
  font-family: "Open Sans";
  color:${props => props.theme.mode == "dark" ? "white" : "inherit"};
`
const CustomCard = styled(Card)`
  width: 100%; 
  border:0px;
  background-color: transparent;
  border-radius: 5px;
  &:hover{
    border-color: #1890ff;
    color:#1890ff !important;
  }
`
const PContainer = styled.p`
    text-align: center;
    justify-content: center;
    // height: 100px;
    display: flex; 
    align-items: center;
    margin-bottom: 0px;
`
const FaIcon = styled(FontAwesomeIcon)`
font-size: 50px;
margin-bottom: 20px;
color:${props => props.theme.mode == "dark" ? "white" : ""}
`
class SupportHub extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { } = this.state;
        return (
            <div>
                <Header_text>Support Hub</Header_text>
                <Ref_div>
                    <OpenTicketRow justify="center" type="flex">
                        <Col sm={{ span: 24 }} xl={{ span: 6 }}>
                            <DivWrap>
                                <Link to='/open-ticket'>
                                    <CustomCard>
                                        <FaIcon icon={faPlus} />
                                        <PContainer>
                                            <CardText>
                                                Open a Ticket
                        </CardText>
                                        </PContainer>
                                    </CustomCard>
                                </Link>
                            </DivWrap>
                        </Col>
                        <Col sm={{ span: 24 }} xl={{ span: 6 }}>
                            <DivWrap>
                                <Link to='/tickets'>
                                    <CustomCard>
                                        <FaIcon icon={faList} />
                                        <PContainer>
                                            <CardText>
                                                View All Tickets
                        </CardText>
                                        </PContainer>
                                    </CustomCard>
                                </Link>
                            </DivWrap>
                        </Col>
                    </OpenTicketRow>
                </Ref_div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : ""
    })
}

export default connect(mapStateToProps)(SupportHub);
