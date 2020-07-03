import styled from "styled-components";
import { Row } from "antd";
import { ProfileDiv } from "COMPONENTS/SETTINGS/edit_profile";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";

export const TicketContainer = styled(Container)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
`;
export const TicketDiv = styled(ProfileDiv)`
  background-color: transparent;
  padding-top: 30px;
`;
export const WholeWrap = styled.div`
  padding-top: 50px;
`;
export const TicketWrap = styled(Row)`
  border-radius: 10px;
  border: ${props => (props.theme.mode == "dark" ? "1px solid white" : "")};
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "rgb( 255, 255, 255 )"};
  box-shadow: 0px 2px 7px 0px rgba(51, 51, 51, 0.16);
  padding: 40px;
  margin-bottom: 20px;
`;
export const Title = styled.div`
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: bold;
`;
export const TicketA = styled.a`
  margin: 10px 0 0 0;
  display: block;
`;
export const Desc = styled.div`
  color: ${props => (props.theme.mode === "dark" ? "white" : "#666666")};
  margin-top: 10px;
  font-size: 16px;
  &.description {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 92px;
  }
`;
export const Status = styled.div`
  color: ${props => props.font_color};
  margin-top: 13px;
  display: flex;
  align-items: center;
  padding: 3px 10px;
  font-size: 14px;
  width: 80px;
  text-align: center;
  display: block;
  border-radius: 5px;
  background-color: ${props => props.color};
`;
export const Date = styled.span`
  padding-right: 8px;
  font-size: 14px;
  line-height: 2.3;
  display: block;
  color: ${props => (props.theme.mode === "dark" ? "#ccbebe69" : "#00000070")};
`;
export const NDF = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  font-family: "Open Sans";
`;
export const TicketTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  &:before {
    content: "";
    width: calc(50% - 180px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: "";
    width: calc(50% - 180px);
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
