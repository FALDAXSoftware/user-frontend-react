import styled from "styled-components";

export const TokenWrap = styled.div`
  padding-top: 80px;
  padding-bottom: 0;
  background: #f8f8f8;
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
  background: #4c84ff;
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
  background: #709dff;
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
  border: 1px solid #b3d5ff;
  background: transparent;
  border-radius: 4px;
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
  color: #333333;
  margin: 0 0 40px 0;
  line-height: 1;
`;
export const TokenLeftColWrap = styled.div`
  width: 80%;
  display: inherit;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: 1366px) {
    width: 100%;
  }
`;
export const TokenForm = styled.div`
  background: #fff;
  color: #000;
  width: 100%;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(236, 236, 236, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(236, 236, 236, 1);
  box-shadow: 0px 0px 5px 0px rgba(236, 236, 236, 1);
`;
export const TokenFormHead = styled.span`
  display: inherit;
  font-weight: 600;
  color: #4c84ff;
  font-size: 36px;
  padding: 0 0 40px 0;
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
  border: 0;
  background: #f8f8f8;
  border-radius: 6px;
  height: 48px;
  font-size: 16px;
  padding: 0 10px;
`;
export const TokenFormTop = styled.div`
  padding: 40px;
  border-bottom: 1px solid #d4dadf;
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
  color: #000;
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
