import React from "react";
import styled from "styled-components";
import Navigation from "COMPONENTS/NAVIGATIONS/navigation";
import {
  ContactWrap,
  GreyWrap
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";

export const ContainerContact = styled(Container)`
  text-align: center;
  padding: 150px 10px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 70px;
  @media (max-width: 480px) {
    padding-right: 0px;
    padding-left: 0px;
  }
`;
const Span = styled.span`
  font-size: 50px;
  color: #1890ff;
  font-family: "Open sans";
  text-align: center;
  font-weight: 400;
`;
const Paragraph = styled.p`
  font-size: 20px;
  font-family: "Open sans";
  font-weight: 400;
  padding: 15px 0px;
`;

const ThankYou = () => {
  return (
    <ContactWrap>
      <Navigation />
      <GreyWrap>
        <ContainerContact>
          <Span>Thank you!</Span>
          <Paragraph>
            Your information has been submitted and we will contact you within
            24 hours.
          </Paragraph>
        </ContainerContact>
      </GreyWrap>
      <CommonFooter />
    </ContactWrap>
  );
};

export default ThankYou;
