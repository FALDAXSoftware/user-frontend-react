import React from 'react';
import styled from "styled-components";
import Navigation from '../components/Navigations/Navigation';
import { Contact_wrap, Grey_wrap } from '../styled-components/landingCategories/contactStyle';
import { Container } from '../styled-components/homepage/style';
import CommonFooter from "../components/Landing/Footers/Footer_home";

export const ContainerContact = styled(Container)`
    text-align: center;
    padding: 150px 10px;
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom:70px;
    @media(max-width:480px)
    {
        padding-right:0px;
        padding-left:0px;
    }
`
const Span = styled.span`
    font-size: 50px;
    color: #1890ff;
    font-family: "Open sans";
    text-align: center;
    font-weight: 400;
`
const Paragraph = styled.p`
    font-size: 20px;
    font-family: "Open sans";
    font-weight: 400;
    padding: 15px 0px;
`

const ThankYou = () => {
    return (
        <Contact_wrap>
            <Navigation />
            <Grey_wrap>
                <ContainerContact>
                    <Span>
                        Thank you!
            </Span>
                    <Paragraph>
                        Your information has been submitted and we will contact you within 24 hours.
            </Paragraph>
                </ContainerContact>
            </Grey_wrap>
            <CommonFooter />
        </Contact_wrap >
    )
}

export default ThankYou;
