/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'

/* styled-components */
import {
    HeaderText, RefDiv, OpenTicketRow, DivWrap, CardText, CustomCard, PContainer, FaIcon
} from "STYLED-COMPONENTS/SETTINGS/supportStyle"

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
                <HeaderText>Support Hub</HeaderText>
                <RefDiv>
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
                </RefDiv>
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
