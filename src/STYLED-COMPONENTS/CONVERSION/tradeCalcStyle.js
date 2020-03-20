import styled from "styled-components";
import { Container } from "../HOMEPAGE/style";
import { _CONVERSIONBACKGROUND } from "CONSTANTS/images";
import { Row, Col, Tabs, Select, Button, Radio } from "antd";
const TabPane = Tabs.TabPane;
const Option = Select.Option;
export const ConversionWrap = styled.div`
    background-color:#f5f6fa;
    background-image:url('${_CONVERSIONBACKGROUND}');
    background-size:cover;
    min-height:100vh;
    width:100%;
`;
export const ConversionContainer = styled(Container)`
  border-radius: 5px;
  max-width: 1170px;
  padding-bottom: 30px;
  padding-top: 190px;
  &.trade-view {
    padding-top: 10px;
  }
  &.trade-view-conversion {
    padding: 100px 15px;
  }
  @media (max-width: 991px) {
    & {
      padding-top: 100px;
    }
  }
`;
export const MainRow = styled(Row)`
  background-color: #ffffff
  padding: 40px;
  @media (max-width: 991px) {
    padding: 40px 10px;
  }
`;
export const LeftCol = styled(Col)`
  background-color:#fff
  position: relative;
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-left-color: #ffffff
    border-right: 0;
    margin-top: -15px;
    margin-right: -15px;
  }
  @media (max-width: 991px) {
    &:after {
      display: none;
    }
  }
`;
export const ConversionTab = styled(Tabs)`
  border-bottom: none;
  & .ant-tabs-bar {
    border-bottom: none;
  }
  &
    .ant-tabs-bar
    > .ant-tabs-nav-container
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-scroll
    > .ant-tabs-nav {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: none;
  }
  &
    .ant-tabs-bar
    > .ant-tabs-nav-container
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-scroll
    > .ant-tabs-nav
    > div
    > .ant-tabs-tab {
    margin: 0px !important;
    width: 50%;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    border-bottom:1px solid #e3ebfc
  }
  &
    .ant-tabs-bar
    > .ant-tabs-nav-container
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-scroll
    > .ant-tabs-nav
    > div
    > .ant-tabs-tab.ant-tabs-tab-active {
    background-color: #e3ebfc
    position: relative;
    color: ""
  }

  &
    .ant-tabs-bar
    > .ant-tabs-nav-container
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-scroll
    > .ant-tabs-nav
    > div
    > .ant-tabs-tab.ant-tabs-tab-active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color:#e3ebfc
    border-bottom: 0;
    margin-left: -10px;
    margin-bottom: -10px;
  }
  &
    .ant-tabs-bar
    > .ant-tabs-nav-container
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-scroll
    > .ant-tabs-nav
    > .ant-tabs-ink-bar {
    display: none !important;
  }
`;
export const ConversionTabPane = styled(TabPane)`
  &.buy_tab {
    padding: 69.5px 25px;
  }
  &.sell_tab {
    padding: 49px 25px;
  }
`;
export const ConversionTitle = styled.span`
  font-size: 18px;
  font-family: "Open Sans";
  font-weight: bold;
  color:black
  padding: 0px 20px 20px;
  display: block;
`;
export const ConversionRadioRow = styled(Row)`
  > .ant-radio-group {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const CustomRadioContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  & .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid #b1b1bf;
    border-radius: 50%;
  }
  & ::hover input ~ .checkmark {
    background-color: #fff;
  }
  & input:checked ~ span.radio-label {
    color: #4c84ff;
  }
  & input:checked ~ .checkmark {
    border-color: #4c84ff;
  }
  & .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  & .checkmark:after {
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4c84ff;
  }
`;
export const BorderRow = styled(Row)`
  border: 1px solid #dfe4f7
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 35px;
  > .ant-col.value-display {
    height: 42px;
  }
  > .currency-display {
    height: 42px;
  }
  & .radio-row {
    margin-bottom: 0 !important;
  }
  @media (max-width: 360px) {
    & {
      padding: 20px 10px;
    }
  }
`;
export const RadioBorderRow = styled(Row)`
  border: 1px solid #dfe4f7
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 0;
  width: calc(50% - 30px);
  margin: 0 15px;
  > .ant-col.value-display {
    height: 42px;
  }
  > .ant-col {
    > input[disabled] {
      color: #a8acb3;
    }
  }
  > .height-col {
    height: 42px;
  }
  > .align-flex {
    align-items: center;
    display: flex;
  }
  @media (max-width: 850px) {
    width: calc(100% - 30px);
    margin-bottom: 15px;
  }
  @media (max-width: 480px) {
    padding: 15px 5px;
    margin: 0 0 15px 0;
    width: 100%;
  }
  @media (max-width: 360px) {
    & {
      padding: 20px 10px;
    }
  }
`;
export const RowTitle = styled.span`
  position: absolute;
  top: -11px;
  left: 20px;
  padding: 0px 10px;
  background-color: #ffffff
  font-weight: 600;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65)
`;
export const ConversionInput = styled.input`
  &.conversion_input {
    padding: 6px 15px;
    height: auto;
    width: 100%;
    border: none;
    border-radius: 4px;
    background-color: #f6f8fe
    font-weight: 600;
    font-size: 20px;
    color: black
    &:focus {
      border: none;
      outline: none;
    }
    @media (max-width: 360px) {
      font-size: 16px;
    }
  }
  padding: 6px 15px;
  height: auto;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #f6f8fe
  font-weight: 600;
  font-size: 20px;
  color: black
  &:focus {
    border: none;
    outline: none;
  }
  @media (max-width: 360px) {
    font-size: 16px;
  }
`;
export const ConversionDropDown = styled(Select)`
  width: 100%;
  padding: 4px 0px;
  color: black;
  & .ant-select-selection {
    border: none;
    font-size: 20px;
    font-weight: 600;
    background-color: white;
  }
  &.ant-select-disabled .ant-select-selection {
    cursor: text;
  }
  & .ant-select-selection-selected-value {
    float: none;
    text-align: center;
    color: "";
  }
  & .ant-select-selection:focus {
    box-shadow: none;
    ouline: none;
  }
  & .ant-select-arrow {
    color: black;
    // display: none;
  }
  &.ant-select-disabled .ant-select-arrow {
    display: block;
  }
  @media (max-width: 360px) {
    & .ant-select-selection {
      font-size: 14px;
    }
  }
`;
export const DropIcon = styled.img`
  margin-right: 10px;
`;
export const DropDownOption = styled(Option)``;
export const ConversionSubmitBtn = styled(Button)`
  padding: 12px;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  height: auto;
  font-family: "Open Sans";
  background-color: #4c84ff;
  border-color: #4c84ff;
  border-radius: 55px;
  &.conversion_btn {
    margin-top: 30px;
    margin-left: 40px;
    width: calc(100% - 40px);
  }
  &:hover {
    background-color: white;
    border-color: #4c84ff;
    color: #4c84ff;
  }
  @media (max-width: 480px) {
    &.conversion_btn {
      margin-top: 30px;
      margin-left: 0;
      width: 100%;
    }
  }
`;

export const RightCol = styled(Col)`
  padding: 60.5px 40px;
  min-height: 613px;
  display: flex;
  align-items: center;
  @media (max-width: 480px) {
    & {
      padding: 20px;
    }
  }
`;
export const RightColContainer = styled.div`
  background-image: url(/images/top-zigzag-bg.png)
  background-size: cover;
  height: 100%;
  width: 100%;
  min-height: 470px;
  padding: 40px;
  @media (max-width: 480px) {
    & {
      padding: 20px;
    }
  }
`;

export const RightColTitle = styled.span`
  text-transfrom: uppercase;
  font-weight: 600;
  font-size: 14px;
  color: #4c84ff;
  display: block;
  text-align: center;
  padding-top: 15px;
`;

export const RightColAmount = styled.span`
  font-weight: 600;
  font-size: 50px;
  display: block;
  text-align: center;
  padding-top: 75px;
  font-family: "Open Sans";
  color: "";
`;

export const RightColPrice = styled.span`
  font-weight: 600;
  font-size: 12px;
  display: block;
  text-align: center;
  color: #4c84ff;
  padding-top: 8px;
`;
export const DashedSeprator = styled.div`
  height: 1px;
  background-image: url(/images/dahsed-line.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 70px;
  margin-bottom: 23px;
`;

export const RightSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  display: block;
  color: rgba(57, 65, 77, 0.702);
  padding: 10px;
`;
export const LeftSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  display: block;
  color: #39414d";
  padding: 10px;
`;

export const RightTotal = styled.span`
  font-weight: 600;
  font-size: 14px;
  display: block;
  color: #4c84ff;
  padding: 10px 0;
  text-transform: uppercase;
`;
export const LeftTotal = styled.span`
  font-weight: 600;
  font-size: 14px;
  display: block;
  color: #4c84ff;
  padding: 10px 0;
`;

export const PayWith = styled.span`
  line-height: 2;
  font-weight: 600;
`;

export const BankAcountDropdown = styled(Select)`
  & .ant-select-selection {
    border: none;
  }
  & .ant-select-selection:focus {
    box-shadow: none;
    ouline: none;
  }
`;

export const FeesRadio = styled(Radio)`
  font-family: "Open Sans" !important;
  font-weight: 600;
  font-size: 13px;
  margin-right: 30px;
  align-items: center;
  display: inline-flex;
  color: #5d5d79;
  & .ant-radio-inner {
    width: 25px;
    height: 25px;
    background-color: transparent;
  }
  & .ant-radio-inner:after {
    width: 13px;
    height: 13px;
    left: 5px;
    top: 5px;
  }
  &.ant-radio-wrapper-checked {
    color: #4c84ff;
  }
`;
export const ContainerConversion = styled(Container)`
  background-color: #f5f6fa;
  color: "";
  max-width: 1170px;
  padding: 0 0 30px 0;
  min-height: 70vh;

  @media (max-width: 767px) {
    min-height: 800px;
  }
  @media (max-width: 575px) {
    min-height: 600px;
  }
`;
export const HeadStyle = styled.span`
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 38px;
  color: #333333;
  text-align: center;
  display: block;
  padding: 30px 0;
  @media (max-width: 950px) {
    padding: 30px 20px;
  }
`;
export const SubHeadStyle = styled.span`
  font-family: "Open Sans";
  text-align: center;
  display: block;
  font-size: 18px;
  line-height: 28px;
  padding: 0 70px 50px;
  @media (max-width: 950px) {
    padding: 0 50px 20px;
  }
`;
export const RowConStyle = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 650px) {
    flex-wrap: wrap;
  }
`;
export const ColConStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  width: calc(33.33% - 30px);
  margin: 0 15px;
  padding: 40px 15px;
  align-items: center;
  -webkit-box-shadow: 0px 0px 2px 0px rgba(236, 236, 236, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(236, 236, 236, 1);
  box-shadow: 0px 0px 2px 0px rgba(236, 236, 236, 1);
  @media (max-width: 950px) {
    padding: 30px 20px;
  }
  @media (max-width: 767px) {
    width: calc(33.33% - 10px);
    margin: 0 5px;
    padding: 20px 10px;
  }
  @media (max-width: 650px) {
    width: calc(100% - 40px);
    margin: 0 20px 20px;
    padding: 40px 30px;
  }
  > .tokenlink {
    width: calc(100% - 30px);
  }
  &:hover {
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 7px 0px rgba(236, 236, 236, 1);
    -moz-box-shadow: 0px 0px 7px 0px rgba(236, 236, 236, 1);
    box-shadow: 0px 0px 7px 0px rgba(236, 236, 236, 1);
  }
`;
export const ColConTokStyle = styled.a`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  width: 100%;
  padding: 40px 15px;
  align-items: center;
  text-decoration: none;
  -webkit-box-shadow: 0px 0px 2px 0px rgba(236, 236, 236, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(236, 236, 236, 1);
  box-shadow: 0px 0px 2px 0px rgba(236, 236, 236, 1);
  @media (max-width: 950px) {
    padding: 30px 20px;
  }
  @media (max-width: 767px) {
    width: calc(33.33% - 10px);
    margin: 0 5px;
    padding: 20px 10px;
  }
  @media (max-width: 650px) {
    width: calc(100% - 40px);
    margin: 0 20px 20px;
    padding: 40px 30px;
  }
  &:hover {
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 7px 0px rgba(236, 236, 236, 1);
    -moz-box-shadow: 0px 0px 7px 0px rgba(236, 236, 236, 1);
    box-shadow: 0px 0px 7px 0px rgba(236, 236, 236, 1);
  }
  &:after {
    content: "";
    display: flex;
    position: absolute;
    background: #ffffff;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.7;
  }
`;
export const TokComingSoonWrap = styled.div`
  position: relative;
  display: flex;
  width: calc(33.33% - 30px);
  margin: 0 15px;
  @media (max-width: 767px) {
    width: calc(33.33% - 10px);
    margin: 0 5px;
    padding: 20px 10px;
  }
  @media (max-width: 650px) {
    width: calc(100% - 40px);
    margin: 0 20px 20px;
    padding: 40px 30px;
  }
`;
export const TokComingSoon = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
  text-decoration: none;
  color: #333333;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    color: #333333;
  }
`;
export const ColHeadConStyle = styled.span`
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
  color: #4c84ff;
  font-family: "Open Sans";
  word-break: break-word;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  align-self: flex-start;
`;
export const ColSubRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
`;
export const ConIconWrap = styled.span`
  &.mastercard {
    display: block;
    margin-bottom: 15px;
  }
  > img {
    max-width: 100%;
  }
`;
export const ConArrowWrap = styled.span`
  font-size: 20px;
  color: #afbed4;
  padding: 0 5px;
`;
export const ColSubHeadConStyle = styled.span`
  color: #000000;
  font-size: 16px;
  line-height: 26px;
  font-family: "Open Sans";
  padding: 35px 0;
`;
export const ColBtnConStyle = styled.button`
  width: 100%;
  margin: 0 15px;
  font-family: "Open Sans";
  border: 1px solid;
  border-color: #c6dfff;
  height: 48px;
  font-size: 22px;
  font-weight: bold;
  background: #ffffff;
  color: #434f66;
  border-radius: 30px;
  &:hover {
    background: #4c84ff;
    border-color: #4c84ff;
    color: #ffffff;
  }
`;
export const RadioMainRow = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 850px) {
    flex-wrap: wrap;
  }
`;
export const RadioGroupMainRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 30px 0;
  width: 100%;
  > .ant-radio-wrapper {
    margin-right: 0;
    width: 25px;
    > .ant-radio {
      margin-right: 15px;
      > .ant-radio-inner {
        width: 20px !important;
        height: 20px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      > .ant-radio-inner:after {
        top: auto !important;
        left: auto !important;
        width: 10px !important;
        height: 10px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
export const ConversionLeftCol = styled(Col)`
  background-color: #fff;
  position: relative;
  > .ant-collapse {
    border: 0;
    background: transparent;
    text-align: right;
    margin: 0 0 0 40px;
    > .ant-collapse-item {
      border-bottom: 0;
      > .ant-collapse-header {
        color: #5d5d79;
        font-size: 16px;
        font-family: "Open Sans";
        font-weight: 600;
        border-bottom: 1px dashed #d9d9d9 !important;
        padding: 15px 20px 15px 15px;
        > .ant-collapse-arrow {
          top: 0;
          left: auto;
          right: 0;
          transform: rotate(90deg) translateY(0%);
          color: #4c84ff;
        }
      }
    }
    > .ant-collapse-item-active {
      > .ant-collapse-header {
        > .ant-collapse-arrow {
          svg {
            transform: rotate(180deg) !important;
          }
        }
      }
      > .ant-collapse-content {
        border-top: 0;
        background: transparent;
        > .ant-collapse-content-box {
          padding: 5px 0;
          > div {
            > .ant-row.network_fee {
              border-bottom: 1px dashed black;
              border-top: 1px dashed #d9d9d9;
              padding: 5px 0;
              margin: 10px 0 10px 0;
            }
            > .ant-row {
              > .ant-col.left-style {
                text-align: left;
                > .promo-apply {
                  > span {
                    font-weight: bold;
                    > .anticon {
                      margin: 0 0 0px 5px;
                    }
                  }
                  > span:hover {
                    cursor: pointer;
                  }
                }
              }
              > .ant-col.right-style {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-left-color: #ffffff;
    border-right: 0;
    margin-top: -15px;
    margin-right: -15px;
  }
  @media (max-width: 850px) {
    width: 100%;
    > .ant-collapse {
      margin: 0 15px 0 40px;
    }
  }
  @media (max-width: 991px) {
    &:after {
      display: none;
    }
  }
  @media (max-width: 480px) {
    > .ant-collapse {
      margin: 0;
    }
  }
`;
export const ConversionRightSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  display: block;
  color: rgba(57, 65, 77, 0.702);
  padding: 10px 0;
  text-transform: uppercase;
  font-weight: 600;
`;
export const ConversionLeftSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  display: block;
  color: #39414d;
  padding: 10px 0;
`;
export const CryptoFiatRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: center;
  width: 100%;
`;
export const CryptoFiatCol = styled.span`
  width: 20px;
  height: auto;
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
`;
export const CryptoFiatText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
`;
export const SimRightCol = styled(Col)`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  padding: 20px 60px;
  color: #fff;
  @media (max-width: 991px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    padding: 20px 30px;
  }
`;

export const SimMainRow = styled(Row)`
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  font-family: "Open sans";
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;
export const SimLeftCol = styled(Col)`
  background-color: #fff;
  box-shadow: 3px 0px 5px 0px rgba(109, 109, 109, 0.19);
  border-radius: 4px;
  padding: 60px 20px;
  &.simplex_left_col_exchange {
    margin: 0 auto;
    & .simplex_row {
      display: flex;
      > .ant-col {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  @media (max-width: 991px) {
    width: 100%;
  }
`;
export const SimLastRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 15px 0;
  color: rgba(0, 0, 0, 0.65);
  align-items: center;
  > .ant-col {
    > img {
      padding: 0 0 0 20px;
    }
  }
  > .buy_crypto_btn {
    padding: 10px 20px;
    border: 1px solid;
    border-color: #4c84ff;
    border-radius: 6px;
  }
  @media (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: center;
    > .ant-col {
      width: 100%;
      margin-bottom: 20px;
      text-align: center;
    }
    > .ant-col.buy_crypto_btn {
      margin-bottom: 0;
    }
  }
`;
