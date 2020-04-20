import {
  Tabs,
  Button,
  Table,
  Input,
  Switch,
  Checkbox,
  Dropdown,
  Radio,
  Select
} from "antd";
import styled from "styled-components";
import { DropdownButton, ButtonToolbar } from "react-bootstrap";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Search = Input.Search;

export const Rowwrap = styled.div``;
export const Rowwrap2 = styled.div`
  margin-top: 25px;
`;
export const Layout = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 40px;
`;
export const SaveButton = styled(Button)`
  margin-left: 15px;
`;
export const EditButton = styled(Button)`
  margin-right: 15px;
`;
export const MainTV = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#2e3141" : "white"};
  height: calc(100% - 38px);
`;
export const TVBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  width: calc(100% - 12px);
  margin: 0 auto;
  border-bottom: ${props =>
    props.theme.mode === "dark" ? "1px solid #2e3141" : "1px solid #eceff1"};
  height: 38px;
  padding: 0px 6px;
  > div > span {
    font-weight: "normal";
    font-size: "17px";
    color: ${props =>
    props.theme.mode === "dark" ? "rgb(217, 217, 217)" : "rgb(85, 85, 85)"};
  }
  > div > i {
    cursor: pointer;
    font-size: 26px;
    color: ${props => (props.theme.mode === "dark" ? "#687786;" : "")};
  }
`;
export const LeftDiv = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  padding-top: 25px;
  padding-bottom: 34px;
  box-shadow: ${props =>
    props.theme.mode === "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
  border-radius: 5px;
  @media (max-width: 991px) {
    margin-right: 0px;
    padding-top: 15px;
  }
`;
export const EditDiv = styled(LeftDiv)`
  display: flex;
  justify-content: center;
  height: auto;
  & .editText {
    color: black;
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 600;
  }
`;
export const SwitchS = styled(Switch)`
  margin-left: 15px;
`;
export const LeftDiv1 = styled(LeftDiv)`
  padding-top: 30px;
  padding-bottom: 8px;
  box-shadow: ${props =>
    props.theme.mode === "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
  border-radius: 5px;
  height: 100%;
  @media (max-width: 575px) {
    height: auto;
  }
  @media (max-width: 991px) {
    margin-right: 0px;
  }
`;
export const LeftDiv2 = styled(LeftDiv)`
  padding-top: 30px;
  margin-right: 0px;
  padding-bottom: 22px;
  box-shadow: ${props =>
    props.theme.mode === "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
  border-radius: 5px;
  height: 100%;
`;
export const Instru = styled.p`
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  margin-left: 30px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "#333333")};
  @media (max-width: 575px) {
    display: block;
  }
`;
export const SearchInput = styled(Search)`
    display:inline-block;
    width:270px;
    float:right;
    margin-right:25px;
    &:focus
    {
        border:none;
        outline:none;
    }
    >.ant-input-suffix>i
    {
        color:${props => (props.theme.mode === "dark" ? "white" : "")};
    }
    >.ant-input:focus
    {
        border:none;
        border-bottom: 1px solid #d9d9d9;
        box-shadow:none;
    }
    >input
    {
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-radius:0px;
        background-color:${props =>
    props.theme.mode === "dark" ? "#041b2c" : ""}
        caret-color:${props => (props.theme.mode === "dark" ? "white" : "")}
        color:${props => (props.theme.mode === "dark" ? "white" : "")}
    }
    @media(max-width:575px)
    {
        margin-left:25px;
        margin-right:0px;
        float:none;
    }
`;
export const FIATWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  @media (max-width: 575px) {
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 25px;
  }
`;
export const FIATWrap2 = styled.div`
  display: inline-block;
  float: right;
  & .ant-radio-button-wrapper {
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : ""};
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  @media (max-width: 535px) {
    margin-top: 20px;
  }
`;
export const FIAT = styled.div`
  display: inline-block;
  margin-right: 30px;
`;

export const RadioSelect = styled(RadioGroup)`
  font-family: "Open Sans";
  & .ant-radio-button-wrapper {
    font-weight: 600 !important;
    background-color: ${props =>
    props.theme.mode === "dark" ? "" : "#f5f6fa"};
    font-size: 13px;
    text-transform: uppercase;
  }
  @media (max-width: 460px) {
    & .ant-radio-button-wrapper {
      padding: 0 4px;
    }
  }
`;
export const Sect = styled(Button)`
  display: inline-block;
  padding: 10px 15px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
  color: ${props => (props.theme.mode === "dark" ? "#617090" : "")};
  border: none;
  height: auto;
  border-radius: 0px;
  border-right: 1px solid #cad0e6;
  &:nth-child(1) {
    border-radius: 5px 0px 0px 5px;
  }
  &:last-child {
    border-radius: 0px 5px 5px 0px;
    border-right: 0px;
  }
`;
export const RightDiv = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  box-shadow: ${props =>
    props.theme.mode === "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
  border-radius: 5px;
  height: auto;
  @media (max-width: 991px) {
    margin-top: 0px;
  }
`;
export const RightDiv1 = styled(RightDiv)`
  height: 100%;
  @media (max-width: 575px) {
    height: auto;
  }
  @media (max-width: 991px) {
    margin-top: 0px;
  }
`;
export const InstruTable = styled.div`
  margin-top: 25px;
`;
export const TableIns = styled(Table)`
  & .ant-table-column-sorter {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-header {
    background: ${props => (props.theme.mode === "dark" ? "#041422" : "")};
    margin-bottom: 0px !important;
    overflow-x: hidden;
  }
  > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-body {
    background: none;
  }
  > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-header
    > table
    > .ant-table-thead
    > tr
    > th {
    color: #174c7e;
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : ""};
    font-weight: bold;
    border-bottom: 0px;
  }
  > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-body
    > table
    > .ant-table-tbody
    > tr
    > td {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    background-color: transparent;
    font-size: 14px;
    font-weight: 600;
    font-family: "Open Sans";
  }
  > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-body
    > table
    > .ant-table-thead
    > tr
    > th
    > span
    > .ant-table-column-sorter
    > .off
    > i {
    color: #606f8e;
  }
  > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-body
    > table
    > .ant-table-thead
    > tr
    > th
    > span
    > .ant-table-column-sorter
    > .on
    > i {
    color: #4c84ff;
  }
  @media (max-width: 375px) {
    > .ant-spin-nested-loading
      > .ant-spin-container
      > .ant-table
      > .ant-table-content
      > .ant-table-scroll
      > .ant-table-body
      > table
      > .ant-table-thead
      > tr
      > th {
      padding: 10px 12px;
    }
    & .ant-table-tbody > tr > td {
      padding: 12px 12px;
    }
  }
  & .ant-table-tbody > tr > td {
    cursor: pointer;
  }
  & .ant-table-tbody > tr:hover > td {
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : ""};
  }
  & .ant-table-placeholder {
    position: relative;
    padding: 60px 16px;
    background: none;
    border-bottom: 0px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    z-index: 1;
    font-family: "Open Sans";
  }
`;
export const TabsRight = styled(Tabs)`
  .ant-tabs-nav-container > .ant-tabs-nav-wrap > .ant-tabs-nav-scroll {
    display: flex !important;
    justify-content: center !important;
  }
  .ant-tabs-nav-container
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-scroll
    > .ant-tabs-nav-animated
    > div
    > .ant-tabs-tab {
    margin: 0 20px !important;
  }
  &.tardeActionCard {
    .ant-tabs-nav-container {
      > .ant-tabs-nav-wrap {
        > .ant-tabs-nav-scroll {
          > .ant-tabs-nav-animated {
            > div {
              > .ant-tabs-tab {
                margin: 0 !important;
              }
            }
          }
        }
      }
    }
    & .ant-tabs-nav-container-scrolling {
      padding: 0;
      & .ant-tabs-tab-arrow-show {
        display: none;
      }
    }
    & .ant-tabs-nav {
      width: 100%;
      & .ant-tabs-ink-bar {
        display: none !important;
      }
      & .ant-tabs-tab {
        display: inline-flex;
        margin: 0 !important;
        justify-content: center;
        width: 33.33%;
      }
      & .ant-tabs-tab-active {
        border-bottom: 4px solid;
      }
    }
  }
  @media (max-width: 475px) {
    > .ant-tabs-nav-container
      > .ant-tabs-nav-wrap
      > .ant-tabs-nav-scroll
      > .ant-tabs-nav-animated
      > div {
      width: 100%;
    }
  }
`;

/* Market Style */

export const Label = styled.label`
  color: ${props => (props.theme.mode === "dark" ? "white" : "#333")};
`;
export const MarketWrap = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const BuyWrap = styled.div``;
export const BuySell = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  text-align: center;
  & .ant-radio-button-wrapper {
    background: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
    border: ${props =>
    props.theme.mode === "dark" ? "1px solid #2c3f51" : "1px solid #cad0e6"};
    color: ${props => (props.theme.mode === "dark" ? "#617090" : "#9e9ea1")};
  }
`;
export const BuySellRadio = styled(RadioButton)`
  padding-left: 40px;
  padding-right: 40px;
  font-size: 14px !important;
  font-weight: bold;
  @media (max-width: 375px) {
    border-radius: 4px 4px 4px 4px !important;
    margin-top: 15px;
    width: 115px;
  }
`;
export const Buy = styled(Button)`
  display: inline-block;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  width: 50%;
  height: 40px;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-right: 0px;
  &:hover {
    border-right: 1px solid #40a9ff;
  }
`;
export const Sell = styled(Button)`
  display: inline-block;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  width: 50%;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  height: 40px;
`;
export const BalanceWrap = styled.div`
  margin-top: 15px;
  > .ant-row {
    > .ant-col {
      padding: 0 10px;
      width: 50%;
      float: none;
      display: inline-block;
      vertical-align: top;
      margin: 0 0 0 -2px;
    }
  }
`;
export const Balance = styled.p`
  color: ${props => (props.theme.mode === "dark" ? "white" : "#174c7e")};
  font-weight: bold;
  word-break: break-word;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 1;
  margin: 0 0 20px 0;
`;
export const Balance1 = styled.p`
  color: ${props => (props.theme.mode === "dark" ? "#617090" : "#7f7f7f")};
  font-weight: normal;
  font-size: 12px;
  margin: 0 0 5px 0;
  line-height: 1;
`;
export const Total = styled.p`
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  word-break: break-word;
  font-size: 13px;
`;
export const CheckWrap = styled.div`
  > .ant-checkbox-wrapper > span {
    color: ${props => (props.theme.mode === "dark" ? "#617090" : "")};
  }
`;
export const ETHWrap = styled.div`
  // margin-top: 15px;
  padding: 0 10px;
`;

export const AMTInput = styled(Input)`
  input {
    display: block;
    height: 35px;
    width: 100%;
    border-radius: 5px;
    border-radius: 1px solid #cad0e6;
    caret-color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : ""};
  }
`;

export const BTCWrap = styled.div`
  margin-top: 15px;
  padding: 0 10px;
  &.width_class {
    width: 50%;
  }
`;
export const Willpay = styled.span`
  font-size: 12px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props => (props.theme.mode === "dark" ? "white" : "#333")};
`;
export const Willpay2 = styled.span`
  font-size: 20px;
  // font-family: "NotoSansThai";
  color: ${props => (props.theme.mode === "dark" ? "white" : "#174c7e")};
  font-weight: bold;
  letter-spacing: 1px;
  max-width: 50%;
  word-break: break-word;
`;
export const TotalWrap = styled.div`
  > .ant-input-group-wrapper > .ant-input-group > .ant-input {
    border-right: 0px;
  }
  > .ant-input-group-wrapper > .ant-input-group > .ant-input:hover,
  > .ant-input-group-wrapper > .ant-input-group > .ant-input:focus {
    border: 1px solid #cad0e6;
  }
  > .ant-input-group-wrapper > .ant-input-group > .ant-input-group-addon {
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
    border-left: 0px;
    color: #c5c5c5;
    letter-spacing: 1px;
  }
  &.readonly-input input {
    -moz-appearance: textfield;
  }
`;
export const TotInput = styled(Input)`
  input {
    display: block;
    height: 35px;
    width: 100%;
    border-radius: 5px;
    border-radius: 1px solid #cad0e6;
    caret-color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : ""} !important;
  }
`;
export const Pay = styled.div`
  margin-top: 20px;
  padding: 0 10px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
export const Approx = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Esti = styled.div`
  margin-top: 20px;
  > .ant-row {
    font-size: 13px;
  }
`;
export const ApproxBelow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px 0;
`;
export const WillpayBelow = styled.div`
  line-height: 1;
  font-weight: 600;
  font-size: 12px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "#333")};
`;
export const WillpayBelow2 = styled.div`
  line-height: 1;
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "#333")};
  letter-spacing: 1px;
`;
export const Best = styled.span`
  font-size: 12px;
  font-family: "Open Sans";
  color: rgba(51, 51, 51, 0.8);
`;
export const ButtonETH = styled(Button)`
  background-color: ${props => (props.side === "Buy" ? "#64ba71" : "#ba6471")};
  border-color: ${props => (props.side === "Buy" ? "#64ba71" : "#ba6471")};
  font-size: 15px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
  height: 50px;
  // margin-bottom: 30px;
  &:hover,
  &:focus {
    background-color: ${props =>
    props.side === "Buy" ? "#64ba71" : "#ba6471"};
    color: rgb(255, 255, 255);
    border-color: ${props => (props.side === "Buy" ? "#64ba71" : "#ba6471")};
  }
`;
export const StopCheck = styled(Checkbox)`
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 127, 127, 127 )"};
`;
export const FlexWrapDiv = styled.div`
  display: flex;
`;
export const ButtonWrap = styled.div`
  margin-top: 20px;
  position: absolute;
  width: calc(100% - 60px);
  bottom: 30px;
  position: relative;
  width: 100%;
  bottom: auto;
  margin-top: auto;
  margin-bottom: 10px;
`;
export const BBCWrap = styled.div`
  margin-left: 30px;
  margin-right: 30px;
`;
export const BBC = styled.span`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(76, 132, 255);
  text-transform: uppercase;
  font-weight: 600;
`;
export const TotalBTC = styled.span`
  float: right;
  display: inline-block;
  font-size: 13px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 51, 51, 51 )"};
`;
export const BuyTable = styled.div`
  margin-top: 15px;
  border: 1px solid #d8d8d8;
  > .table-responsive > .table-striped > thead {
    background-color: #f5f6fa;
    color: #174c7e;
  }
  > .table-responsive > .table-striped > tbody > tr > td {
    color: black;
    font-family: "Open Sans";
    font-weight: 600;
  }
`;
export const BBCWrap2 = styled(BBCWrap)`
  margin-top: 20px;
`;
export const BBC2 = styled(BBC)`
  color: red;
`;

/* Depth Chart */

export const Instru2 = styled(Instru)`
  margin-top: 25px;
  margin-left: 10px;
`;

export const WrapDepth = styled.div``;

export const HistoryWrap = styled.div``;
export const HistoryWrap1 = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041624" : ""};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => (props.theme.mode === "dark" ? "#072135" : "")};
  }
`;
export const CustomTable = styled.table`
  width: 100%;
  table-layout: fixed;
  & td {
    padding: 8px;
    text-align: center;
  }
  & th {
    padding: 9px;
    text-align: center;
    > span:hover {
      cursor: pointer;
    }
  }
  font-family: "Open Sans";
`;
export const TableHeader = styled(CustomTable)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
  > thead {
    color: #174c7e;
    height: 35px;
    tr {
      th {
        text-transform: uppercase;
      }
    }
  }
`;
export const TableContent = styled(CustomTable)`
  > tbody {
    color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 600;
  }
  > tbody > tr:nth-of-type(even) {
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
  }
  &.buy_sell_table {
    > tbody {
      > tr {
        > td {
          word-break: break-all;
        }
      }
    }
  }
`;

/* My orders and Trade */
export const SelectMonth = styled(Select)`
  font-family: "Open Sans";
  font-weight: 700;
  & .ant-select-selection--single {
    height: 40px !important;
    display: flex;
    align-items: center;
  }
  & .ant-select-selectionrendered {
    line-height: 40px !important;
  }
  & .ant-select-selection {
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : ""};
    color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgba(0, 0, 0, 0.65)"};
    > .ant-select-selection__rendered {
      line-height: 38px;
    }
  }
  & .anticon {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
export const InstruOrder = styled(Instru)`
  margin-bottom: 0px !important;
`;
export const OrderWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
`;
export const DropWrap = styled.div`
  display: inline - block;
  width: 165px;
  margin-right: 20px;
  @media (max-width: 456px) {
    width: 80px;
  }
`;
export const ButtonToolbarOne = styled(ButtonToolbar)`
  > .btn-group {
    width: 100 %;
  }
`;
export const DropdownButtonOne = styled(DropdownButton)`
  background-color: ${props => (props.theme.mode === "dark" ? "#01090f" : "")};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  width: 100 %;
  text-align: left;
  > .caret {
    float: right;
    margin-top: 8px;
  }
`;
export const ScrollTableContent = styled.div`
  &.wallet {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  overflow-x: auto;
  > .scrollbar {
    // height: 500px !important;
  }
  > .scrollbarwallet {
    height: 500px !important;
  }
  & .scrollbar > div:first-child {
    overflow: auto !important;
  }
  & .scrollbar > div:nth-child(3) {
    width: 8px !important;
    right: 0px !important;
    bottom: 0px !important;
    top: 0px !important;
    border-radius: 0px !important;
    border-right: none;
    border-bottom: none;
    padding: 2px;
    background-color: transparent;
  }
  & .scrollbar.news > div:nth-child(3) {
    border: none !important;
  }
  & .scrollbar > div:nth-child(3) > div {
    border-radius: 2px !important;
    background-color: rgb(136, 136, 136) !important;
  }
`;
export const SettingDropdown = styled(Dropdown)`
  position: fixed;
  top: 90px;
  right: 0px;
  background: ${props => (props.theme.mode == "dark" ? "#01090f" : "white")};
  color: #1890ff;
  cursor: pointer;
  padding: 7px 7px;
  font-size: 20px;
  border: ${props =>
    props.theme.mode == "dark" ? "1px solid #198fff;" : "1px solid lightgray"};
  z-index: 9999;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;



export const SettingButton = styled(Button)`
    position: fixed;
    top: 90px;
    left: 0px;
    background: white;
    color: #1890ff;
    cursor: pointer;
    padding: 0px;
    font-size: 20px !important;
    /* display: flex; */
    border: 1px solid lightgray;
    z-index: 9999;
    height: 35px;
    width: 40px;
    border-radius: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;
