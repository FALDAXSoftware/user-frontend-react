import styled from "styled-components";

export const ModalAgreeWrap = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
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
    }
  }
  &.country-wrap {
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
