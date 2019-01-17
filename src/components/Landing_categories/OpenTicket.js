import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import {
    Contact_wrap, Grey_wrap, Career_wrap
} from '../../styled-components/landingCategories/contactStyle';
import { globalVariables } from "../../Globals";

let API_URL = globalVariables.API_URL;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    border-radius:5px;
    padding-right:120px;
    padding-left:120px;
    padding-bottom:70px;
    @media(max-width:992px)
    {
        padding-right:30px;
        padding-left:30px;
    }
    @media(max-width:480px)
    {
        padding-right:10px;
        padding-left:10px;
    }
`
const TicketTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode == "dark" ? "white" : ""};
  &:before {
    content: '';
    width: calc(50% - 170px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 170px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
  @media(max-width:767px)
  {
    &:before {
      display:none;
    }
    &:after {
      display:none;
    }
  }
`;

class OpenTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                            <TicketTitle>Open a Ticket </TicketTitle>
                        </div>
                        <Career_wrap>
                            <iframe style={{ border: 'none' }} height="1100px" width="100%" src={API_URL + "/get-open-ticket-form"}></iframe>
                        </Career_wrap>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
            </Contact_wrap >
        );
    }
}

export default OpenTicket;
