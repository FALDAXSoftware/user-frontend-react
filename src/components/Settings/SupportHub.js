/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* Styled Components */
const Header_text = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color:${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    margin-top:10px;
    text-align:center;
`
const Ref_div = styled.div`
    margin:auto;
    width:80%;
    height:140px;
    margin-top:40px;
    height:auto;
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
`
const CardText = styled.h4`
  margin-bottom: 0px;
  font-family: "Open Sans";
  color:inherit;
`
const CustomCard = styled(Card)`
  width: 100%; 
  border-color: #e2e6ea;
  background-color: #f8f8f8;
  border-radius: 5px;
  &:hover{
    border-color: #1890ff;
    color:#1890ff !important;
  }
`
const PContainer = styled.p`
    text-align: center;
    justify-content: center;
    height: 100px;
    display: flex; 
    align-items: center;
    margin-bottom: 0px;
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
                    <OpenTicketRow >
                        <Col md={{ span: 6, offset: 5 }} xl={{ span: 6, offset: 5 }}>
                            <DivWrap>
                                <Link to='/open-ticket'>
                                    <CustomCard>
                                        <PContainer>
                                            <CardText>
                                                Open a Ticket
                        </CardText>
                                        </PContainer>
                                    </CustomCard>
                                </Link>
                            </DivWrap>
                        </Col>
                        <Col md={{ span: 6, offset: 5 }} xl={{ span: 6, offset: 5 }}>
                            <DivWrap>
                                <Link to='/tickets'>
                                    <CustomCard>
                                        <PContainer>
                                            <CardText>
                                                All Tickets
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
