import styled from "styled-components";
import { Tabs } from "antd";
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
  margin: 30px 0;
  > .ant-tabs-bar {
    > .ant-tabs-nav-container {
      > .ant-tabs-nav-wrap {
        > .ant-tabs-nav-scroll {
          > .ant-tabs-nav {
            & .ant-tabs-tab {
              line-height: 1;
              height: auto;
              margin: 0 10px 0 0 !important;
              padding: 10px !important;
              vertical-align: top;
            }
          }
        }
      }
    }
  }
`;
export const TemplateTabPane = styled(TabPane)``;
