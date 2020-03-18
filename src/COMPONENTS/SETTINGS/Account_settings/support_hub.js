/* IN-built */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { translate } from "react-i18next";

/* styled-components */
import {
  HeaderText,
  RefDiv,
  OpenTicketRow,
  DivWrap,
  CardText,
  CustomCard,
  PContainer,
  FaIcon
} from "STYLED-COMPONENTS/SETTINGS/supportStyle";

class SupportHub extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const [{}, { t }] = [this.state, this.props];

    return (
      <div>
        <HeaderText>{t("support_head.message")}</HeaderText>
        <RefDiv>
          <OpenTicketRow justify="center" type="flex">
            <Col sm={{ span: 24 }} xl={{ span: 6 }}>
              <DivWrap>
                <Link to="/open-ticket">
                  <CustomCard>
                    <FaIcon icon={faPlus} />
                    <PContainer>
                      <CardText>
                        {t("support_text_open_a_ticket.message")}
                      </CardText>
                    </PContainer>
                  </CustomCard>
                </Link>
              </DivWrap>
            </Col>
            <Col sm={{ span: 24 }} xl={{ span: 6 }}>
              <DivWrap>
                <Link to="/tickets">
                  <CustomCard>
                    <FaIcon icon={faList} />
                    <PContainer>
                      <CardText>
                        {t("support_text_view_all_tickets.message")}
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
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
}

export default translate("support")(connect(mapStateToProps)(SupportHub));
