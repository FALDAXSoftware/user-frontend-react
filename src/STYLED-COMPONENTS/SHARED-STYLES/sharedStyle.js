import styled from "styled-components";
import { Tabs, Select } from "antd";

const { TabPane } = Tabs;

export const ModalAgreeWrap = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  &.terms-wrap {
    height: calc(100% - 60px);
    & .ant-tabs.ant-tabs-top.ant-tabs-line {
      height:100%;
    }
  }
  & .ant-tabs-nav-scroll {
    text-align: center;
  }
  & .ant-tabs-content {
    & .row-main {
      display: flex;
      align-items: center;
      margin: 15px 0;
      > .ant-col {
        > .content-box {
          height: 550px;
          overflow: auto;
          border: 1px solid #dadfe3;
          padding: 5px;
          border-radius: 4px;
          height: calc(100vh - 370px);
        }
      }
  }
`;

export const ModalWrap = styled.div`
  width: 465px;
  margin-left: auto;
  margin-right: auto;
  &.template_modal_wrap {
    width: 90%;
  }
  &.kyc-wrap {
    width: 90%;
    padding: 0 0 30px 0;
    > h3 {
      font-family: "Open Sans";
      font-size: 40px;
      text-align: center;
      color: rgb(3, 170, 249);
      font-weight: 600;
      margin-top: 40px;
    }
    > p {
      font-family: "Open Sans";
      font-size: 16px;
      text-align: center;
      color: black;
      margin-top: 34px;
      margin-bottom: 0;
      // padding: 0 0 30px 0;
    }
  }
  &.country-wrap {
    padding: 0 0 30px 0;
    > h3 {
      font-family: "Open Sans";
      font-size: 40px;
      text-align: center;
      color: rgb(3, 170, 249);
      font-weight: 600;
      margin-top: 40px;
    }
    > p.first-subhead {
      font-family: Open Sans;
      font-size: 14px;
      text-align: center;
      color: black;
      margin-top: 15px;
    }
    > p.second-subhead {
      font-family: Open Sans;
      font-size: 15px;
      text-align: center;
      color: black;
    }
  }
  @media (max-width: 576px) {
    width: 350px;
  }
  @media (max-width: 425px) {
    width: 256px;
  }
  .get_verified_link {
    display: flex;
    padding: 10px;
    width: 40%;
    margin: 65px auto 0;
    font-family: "Open Sans";
    border: 1px solid;
    border-color: #c6dfff;
    height: 48px;
    font-size: 22px;
    font-weight: bold;
    background: #ffffff;
    color: #434f66;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #4c84ff;
      border-color: #4c84ff;
      color: #ffffff;
    }
    @media (max-width: 450px) {
      width: 60%;
    }
  }
  .complete_profile {
    width: 50%;
  }
  @media (max-width: 580px) {
    .complete_profile {
      width: 60%;
    }
  }
  @media (max-width: 430px) {
    .complete_profile {
      width: 82%;
    }
  }
`;
export const SubWrap = styled.div`
  margin-top: 40px;
`;
export const EmailInput = styled.input`
  border: 1px solid #e2e6ea;
  background-color: #f8f8f8;
  border-radius: 5px;
  min-height: 45px;
  width: 100%;
  padding-left: 5px;
  margin-top: 5px;
  @media (max-width: 576px) {
  }
`;
export const TemplateTab = styled(Tabs)`
  padding: 30px 0;
  & .ant-checkbox-group-item {
    display: block;
  }
  > .ant-tabs-bar {
    > .ant-tabs-nav-container {
      > .ant-tabs-nav-wrap {
        > .ant-tabs-nav-scroll {
          > .ant-tabs-nav {
            & .ant-tabs-tab {
              line-height: 1;
              height: auto;
              margin: 0 10px 0 0 !important;
              padding: 12px 10px !important;
              vertical-align: top;
            }
          }
        }
      }
    }
  }
`;
export const TemplateTabPane = styled(TabPane)`
  & .ant-checkbox-wrapper {
    display: block;
    margin: 0 !important;
  }
`;
export const TemplatePairSelect = styled(Select)`
  margin: 10px 0 0 0;
  padding: 0 0 0 55px;
`;
export const SaveBtn = styled.button`
  font-size: 13px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  -moz-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -webkit-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -ms-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  border-radius: 24px;
  background-color: rgb(76, 132, 255);
  box-shadow: 0px 4px 10px 0px rgba(76, 132, 255, 0.33);
  height: 40px;
  border: 0;
  padding: 0 20px;
  margin: 30px 0 0px 9px;
  &:focus {
    outline: none;
  }
`;
export const WidgetName = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin: 0 0 0 10px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
  }
`;
export const TempRow = styled.div`
  margin: 0 0 10px 0;
  & .ant-select.ant-select-enabled {
    margin: 10px 0 10px 0;
    padding: 0 0 0 55px;
  }
`;
export const TempName = styled.div`
  margin: 0 0 15px 0;
  > input {
    width: 100%;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 5px 10px;
  }
  > input:focus {
    outline: none;
  }
`;
export const UpgradeTable = styled.table`
  width: 100%;
  font-family: "Open sans";
  border: 1px solid #c6dfff;
  &.wallet-popup {
    margin: 25px 0 0 0;
    > thead {
      > tr {
        > th {
          padding: 5px;
        }
      }
    }
    > tbody {
      > tr {
        > td {
          padding: 5px;
        }
      }
    }
  }
  > thead {
    > tr {
      > th {
        font-size: 14px;
        font-weight: normal;
        color: ${(props) =>
          props.theme.mode == "dark" ? "#617090" : "#a3a3a3"};
        padding: 10px;
        border: 1px solid #c6dfff;
        border-left: 0;
        border-right: 0;
        width: 25%;
      }
      > th.title {
        width: 50%;
      }
    }
  }
  > tbody {
    > tr.limit_exceed {
      > td.center {
        text-align: center;
      }
    }
    > tr {
      > td {
        font-size: 14px;
        font-weight: 600;
        color: ${(props) =>
          props.theme.mode == "dark" ? "#ffffff" : "#000000"};
        padding: 10px;
        border: 1px solid #c6dfff;
        border-left: 0;
        border-right: 0;
      }
      > td.red {
        color: red;
      }
      > td.green {
        color: green;
      }
    }
  }
`;
export const SpanOr = styled.div`
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
`;
export const BtnLink = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0 0 0;
  & button {
    background: transparent;
    height: 48px;
    color: #333333;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 0 20px;
    border: 2px solid;
    border-color: #333333;
    border-radius: 30px;
    border-color: #3b88f2;
    background: #4c84ff;
    color: #fff;
  }
  & button:focus {
    outline: none;
  }
`;
