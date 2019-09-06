import styled from "styled-components";
import { Row } from "antd";
import { EmailReq } from "COMPONENTS/LANDING/USERFORMS/login_form";

export const TokenWrap = styled.div`
  padding-top: 80px;
  padding-bottom: 0;
  background: ${props => (props.theme.mode === "dark" ? "#01090f" : "#f8f8f8")};
  width: 100%;
  font-family: "Open sans";
`;
export const TokenMainRow = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;
export const TokenLeftCol = styled.div`
  display: inherit;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
  padding: 0 80px;
  @media (max-width: 1366px) {
    padding: 0 50px;
  }
  @media (max-width: 955px) {
    padding: 0 15px;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin: 15px 0;
  }
`;
export const TokenRightCol = styled.div`
  display: inherit;
  width: 50%;
  justify-content: flex-start;
  padding: 0 80px;
  background: ${props => (props.theme.mode === "dark" ? "#021b2b" : "#4c84ff")};
  color: #ffffff;
  min-height: 750px;
  align-items: center;
  @media (max-width: 1366px) {
    padding: 0 50px;
  }
  @media (max-width: 955px) {
    padding: 0 15px;
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 15px;
    min-height: auto;
  }
`;
export const TokenEllipse = styled.span`
  background: ${props => (props.theme.mode === "dark" ? "#354955" : "#709dff")};
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: flex;
`;
export const TokenLogHead = styled.span`
  display: flex;
  width: 100%;
  padding: 40px 0;
  font-size: 42px;
  font-weight: 600;
  line-height: 46px;
  @media (max-width: 955px) {
    font-size: 28px;
    line-height: 36px;
  }
`;
export const TokenLogSubHead = styled.span`
  display: flex;
  width: 100%;
  font-size: 20px;
  line-height: 32px;
  font-weight: 600;
  @media (max-width: 955px) {
    font-size: 16px;
    line-height: 26px;
  }
`;
export const TokenLogForgotBtn = styled.button`
  font-size: 20px;
  border: 1px solid;
  border-color: ${props =>
    props.theme.mode === "dark" ? "#4c84ff" : "#b3d5ff"};
  background: ${props =>
    props.theme.mode === "dark" ? "#4c84ff" : "transparent"};
  border-radius: 45px;
  font-weight: bold;
  margin: 40px 0 0 0;
  height: 48px;
  padding: 0 40px;
  @media (max-width: 955px) {
    padding: 0 20px;
  }
`;
export const TokenLeftHead = styled.span`
  display: inherit;
  justify-content: flex-start;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: ${props => (props.theme.mode === "dark" ? "#f8f8f8" : "#333333")};
  margin: 0 0 40px 0;
  line-height: 1;
`;
export const TokenLeftHeadBlue = styled(TokenLeftHead)`
  color: #4c84ff;
`;
export const TokenLeftColWrap = styled.div`
  width: 80%;
  display: inherit;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px 0;
  @media (max-width: 1366px) {
    width: 100%;
  }
`;
export const TokenForm = styled.div`
  background: ${props => (props.theme.mode === "dark" ? "#021b2b" : "#ffffff")};
  color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
  width: 100%;
  -webkit-box-shadow: ${props =>
    props.theme.mode === "dark"
      ? "0px 0px 5px 0px rgb(1, 9, 15)"
      : "0px 0px 5px 0px rgba(236, 236, 236, 1)"};
  -moz-box-shadow: ${props =>
    props.theme.mode === "dark"
      ? "0px 0px 5px 0px rgb(1, 9, 15)"
      : "0px 0px 5px 0px rgba(236, 236, 236, 1)"};
  box-shadow: ${props =>
    props.theme.mode === "dark"
      ? "0px 0px 5px 0px rgb(1, 9, 15)"
      : "0px 0px 5px 0px rgba(236, 236, 236, 1)"};
`;
export const TokenFormHead = styled.span`
  display: inherit;
  font-weight: 600;
  color: #4c84ff;
  font-size: 36px;
  padding: 0 0 40px 0;
  &.has-title-country {
    padding: 0 0 30px 0;
  }
`;
export const TokenFormSubHead = styled.span`
  font-size: 18px;
  margin: 0;
  padding: 0 0 80px 0;
  display: inherit;
  &.has-title-country {
    padding: 0 0 20px 0;
  }
`;
export const TokenFormGroup = styled.div`
  width: 90%;
  margin-bottom: 25px;
  @media (max-width: 1366px) {
    width: 100%;
  }
`;
export const TokenFormLabel = styled.label`
  width: 100%;
  font-size: 16px;
  line-height: 1;
  font-weight: normal;
  margin: 0 0 15px 0;
`;
export const TokenFormInput = styled.input`
  width: 100%;
  border: 1px solid;
  border-color: ${props =>
    props.theme.mode === "dark" ? "#20303e" : "#f8f8f8"};
  background: ${props => (props.theme.mode === "dark" ? "#020f18" : "#f8f8f8")};
  border-radius: 6px;
  height: 48px;
  font-size: 16px;
  padding: 0 10px;
  &:focus {
    outline: 0;
    border: 1px solid #4c84ff;
  }
`;
export const TokenFormTop = styled.div`
  padding: 40px;
  border-bottom: 1px solid;
  border-color: ${props =>
    props.theme.mode === "dark" ? "#092c43" : "#d4dadf"};
  @media (max-width: 955px) {
    padding: 15px;
  }
`;
export const TokenFormBottom = styled.div`
  padding: 40px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 955px) {
    padding: 40px 15px;
    flex-wrap: wrap;
  }
`;
export const TokenBlueBtn = styled(TokenLogForgotBtn)`
  background: #4c84ff;
  color: #fff;
  border-color: #4c84ff;
  margin: 0;
  width: 100%;
`;
export const TokenDivHalf = styled.div`
  width: 50%;
`;
export const TokenDivFull = styled.div`
  width: 100%;
`;
export const TokenDivHalfLeft = styled.div`
  width: auto;
  margin-bottom: 15px;
`;
export const TokenCustomCheckbox = styled.label`
  display: block;
  position: relative;
  padding-left: 28px;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000")};
  line-height: 20px;
  font-weight: normal;
  > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ span.checkmark:after {
      display: block;
    }
  }
  > span.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 2px solid #d4d4d4;
    border-radius: 2px;
    &:after {
      content: "";
      left: 4px;
      position: absolute;
      top: 0px;
      width: 7px;
      height: 12px;
      border: solid #4c84ff;
      border-width: 0px 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      display: none;
    }
  }
`;
export const TokenIconWrap = styled.span`
  font-size: 30px;
  margin: 0 15px 0 0;
`;
// export const TokenInput = styled.div`
//   position: absolute;
//   opacity: 0;
//   cursor: pointer;
//   height: 0;
//   width: 0;
//   &:checked ~ {
//   }
// `;
// export const TokenSpan = styled.span`
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 20px;
//   width: 20px;
//   border: 2px solid #a6a9b5;
//   border-radius: 2px;
//   &:after {
//     content: "";
//     left: 4px;
//     position: absolute;
//     top: 0px;
//     width: 7px;
//     height: 12px;
//     border: solid #5087c7;
//     border-width: 0px 3px 3px 0;
//     -webkit-transform: rotate(45deg);
//     -webkit-transform: rotate(45deg);
//     -ms-transform: rotate(45deg);
//     transform: rotate(45deg);
//     display: block;
//   }
// `;
export const SecondRow = styled(Row)`
  text-align: left;
  margin-top: 25px;
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`;
export const FourthRow = styled(SecondRow)`
  text-align: left;
  margin-top: 25px;
`;
export const FirstMsg = styled(EmailReq)`
  display: block;
`;
export const CountryMsg = styled(FirstMsg)``;
export const CustomFileInputWrap = styled.div`
  > .noteforupload {
    margin: 0;
    text-align: center;
    padding: 30px 0 0 0;
    font-size: 20px;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  }
  > .errorimg {
    margin: 0;
    color: red;
    text-align: center;
  }
  > .imgPreview {
    width: 100%;
    min-height: 250px;
    position: relative;
    margin: 30px 0 0 0;
    > img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  > .custom-file-input {
    display: inline-block;
    overflow: hidden;
    position: relative;
    height: 310px;
    width: 100%;
    > input {
      width: 100%;
      height: 100%;
      opacity: 0;
      filter: alpha(opacity=0);
      zoom: 1; /* Fix for IE7 */
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
    > .drop-image {
      width: 100%;
      height: 80%;
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
    }
    > .choose-span {
      display: flex;
      position: absolute;
      bottom: 0;
      justify-content: center;
      left: 0;
      right: 0;
      flex-wrap: wrap;
      width: 100%;
      > .drop-span {
        display: flex;
        width: 100%;
        justify-content: center;
        color: ${props =>
          props.theme.mode === "dark" ? "#ffffff" : "#333333"};
        font-size: 26px;
        font-weight: bold;
        padding-bottom: 5px;
      }
      > .orspan {
        color: #989898;
        font-weight: 600;
        font-size: 20px;
        margin-right: 5px;
      }
      > .file-span {
        font-weight: 600;
        font-size: 20px;
        color: #4c84ff;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

// Token Dashboard css start
export const TokDashboardWrap = styled.div`
  min-height: calc(100vh - 380px);
  padding-top: 80px;
  background-color: #f5f6fa;
  display: flex;
  font-family: open sans;
`;
export const TokSideBar = styled.div`
  width: 300px;
  background: #ffffff;
  -webkit-box-shadow: 3px 0px 3px 0px rgba(247, 247, 247, 1);
  -moz-box-shadow: 3px 0px 3px 0px rgba(247, 247, 247, 1);
  box-shadow: 3px 0px 3px 0px rgba(247, 247, 247, 1);
  > ul {
    padding: 0 0;
    margin: 0;
    > li {
      list-style-type: none;
      padding: 15px 50px;
      color: #707070;
      font-weight: 600;
      font-size: 18px;
      border-bottom: 1px solid;
      border-color: #f5f6fa;
      > span i.fas {
        margin: 0 15px 0 0;
      }
      > span.dash-item:hover {
        cursor: pointer;
        color: #333333;
        > i.fas {
          color: #3789ef;
        }
      }
    }
  }
`;
export const TokRightContentWrap = styled.div`
  width: calc(100% - 300px);
`;
