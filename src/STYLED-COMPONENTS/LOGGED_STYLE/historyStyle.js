import { Button, DatePicker } from "antd";
import { DropdownButton, ButtonToolbar } from "react-bootstrap";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { Container } from "../HOMEPAGE/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { RangePicker } = DatePicker;

export const ContainerContact = styled(Container)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  max-width: 1170px;
  padding-bottom: 30px;
  min-height: 70vh;

  @media (max-width: 767px) {
    min-height: 800px;
  }
  @media (max-width: 575px) {
    min-height: 600px;
  }
`;
export const HisTitle = styled.span`
  font-size: 20px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 51, 51, 51 )"};
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 25px;
`;
export const HisWrap = styled.div`
  padding-top: 25px;
  padding-left: 15px;
  padding-right: 15px;
  & .tabpane_crypto {
    position: relative;
    > a {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-size: 24px;
      line-height: 30px;
      font-weight: 600;
      -webkit-text-decoration: none;
      text-decoration: none;
      color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
    }
  }
`;
export const Tablediv = styled.div`
  border: 1px solid #d8d8d8;
  // margin-top: 25px;
  & .table-responsive {
    border: none !important;
    margin-bottom: 0px !important;
  }
  &.tablediv_crypto:after {
    content: "";
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    background: ${props =>
      props.theme.mode === "dark" ? "#4d5861" : "#ffffff"};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.7;
  }
`;
export const HisTable = styled(Table)`
  margin-bottom: 0px;
  width: 100%;
  > thead {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#01090f" : "#f5f6fa"};
    color: #174c7e;
    border: none;
    display: table;
    width: 100%;
  }
  > thead > tr > th {
    border: 0px;
    padding: 8px !important;
    height: 40px;
    width: 200px;
  }
  > tbody {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    display: block;
    max-height: 1000px;
    overflow-y: scroll;
    > tr {
      display: table;
      width: 100%;
    }
  }
  > tbody > tr > td {
    width: 200px;
    word-break: break-all;
    height: 50px;
    padding-top: 12px;
    padding-left: 8px;
    font-size: 14px;
    font-weight: 600;
    font-family: "Open Sans";
    color: ${props =>
      props.theme.mode === "dark" ? "white" : "rgb( 33, 33, 33 )"};
    text-transform: uppercase;
  }
  > tbody > tr > td {
    border-top: 0px;
  }
  > tbody > tr:first-child > td {
    border-top: 1px solid #ddd;
  }
  > tbody > tr:nth-of-type(odd) {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041422" : "#f9f9f9"};
  }

  @media (max-width: 991px) {
    > thead {
      min-width: 1400px;
    }
  }
`;
export const HeadHis = styled.div`
  padding-top: 30px;
`;
export const Filter = styled.div`
  padding-left: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;
export const EXPButton = styled(Button)`
  float: right;
  font-size: 14px;
  font-family: "Open Sans";
  color: white;
  text-transform: uppercase;
  background-color: #40a9ff;
  margin-left: auto;
  @media (max-width: 991px) {
    display: flex;
    margin-left: 0px;
    margin-top: 20px;
  }
  &.reset_btn {
    margin-left: 15px;
  }
`;
export const Dropwrap = styled.div`
  display: inline-block;
  width: 165px;
  @media (max-width: 456px) {
    width: 80px;
  }
`;
export const Dropwrap2 = styled(Dropwrap)``;
export const ButtonToolbarOne = styled(ButtonToolbar)`
  > .btn-group {
    width: 100%;
  }
`;

export const DropdownButtonOne = styled(DropdownButton)`
  background-color: ${props => (props.theme.mode === "dark" ? "#01090f" : "")};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  width: 100%;
  text-align: left;
  > .caret {
    float: right;
    margin-top: 8px;
  }
`;
export const Datediv = styled.div`
  display: inline-block;
  margin-left: 70px;
  @media (max-width: 991px) {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px !important;
  }
  @media (max-width: 845px) {
    display: flex;
    margin-left: 15px;
  }
  @media (max-width: 790px) {
    display: flex;
    margin-top: 20px;
    margin-left: 0px;
  }
`;
export const RangePickerS = styled(RangePicker)`
  > .ant-calendar-picker-input {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#01090f" : ""};
  }
  > .ant-calendar-picker-input > .ant-calendar-range-picker-input {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  > .ant-calendar-picker-input > .ant-calendar-range-picker-separator {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  > .ant-calendar-picker-input > .ant-calendar-picker-icon {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
export const FontAwesomeIconS = styled(FontAwesomeIcon)`
  margin: 0px 20px;
  @media (max-width: 375px) {
    margin: 0px 10px;
  }
`;
