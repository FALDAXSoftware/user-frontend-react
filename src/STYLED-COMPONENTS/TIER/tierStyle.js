import styled from "styled-components";

export const TierMainWrap = styled.div`
  font-family: "Open sans";
  padding: 30px 0 50px;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 650px) {
    width: 70%;
  }
  @media (max-width: 450px) {
    width: 85%;
  }
`;
export const TierMainInnerWrap = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;
export const TierSubMain = styled.div`
  width: calc(25% - 30px);
  display: inherit;
  justify-content: center;
  margin: 0 15px;
  border-radius: 8px;
  border: 2px solid;
  border-color: ${props =>
    props.theme.mode === "dark" ? "#20303e" : "#333333"};
  flex-wrap: wrap;
  // min-height: 770px;
  align-items: flex-start;
  position: relative;
  opacity: ${props => (props.theme.mode === "dark" ? "0.5" : "0.4")};
  pointer-events: none;
  background: ${props => (props.theme.mode === "dark" ? "#01090f" : " ")};
  @media (max-width: 1200px) {
    width: calc(50% - 30px);
    margin-bottom: 30px;
  }
  @media (max-width: 650px) {
    width: calc(100% - 30px);
  }
`;
export const TierSubMainInner = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 15px;
  align-items: flex-start;
`;
export const TierHead = styled.span`
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  background: ${props => (props.theme.mode === "dark" ? "#20303e" : "#333333")};
  display: inherit;
  justify-content: center;
  color: #fff;
  line-height: 32px;
  height: 55px;
  align-items: center;
`;
export const TierSubHead = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  font-size: 16px;
  line-height: 18px;
  padding: 20px 0;
`;
export const TierUl = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  width: 100%;
  text-align: left;
  > li {
    padding: 5px 0;
    font-size: 16px;
    display: flex;
    > .icon-wrap {
      font-weight: bold;
      line-height: 16px;
      display: inline-flex;
      color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
      width: 25px;
    }
    > .text-wrap {
      width: calc(100% - 25px);
      line-height: 18px;
      display: inline-flex;
      color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
    }
  }
`;
export const TierWithdrawalHead = styled.div`
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  padding: 20px 0 15px;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
`;
export const TierTable = styled.table`
  width: 100%;
  border: 1px solid;
  border-color: ${props =>
    props.theme.mode === "dark" ? "#eaeaea" : "#e1e1e1"};
  margin-bottom: 30px;
  > thead tr th {
    text-align: inherit;
    width: 50%;
    background: #e1e1e1;
    font-weight: 600;
    font-size: 18px;
    padding: 5px 0;
    color: #333333;
  }
  > tbody tr td {
    width: 50%;
    font-size: 18px;
    padding: 5px 0;
    font-weight: bold;
    color: #333333;
    border: 1px solid;
    border-color: ${props =>
      props.theme.mode === "dark" ? "#eaeaea" : "#e1e1e1"};
    background: ${props => (props.theme.mode === "dark" ? "#ffffff" : "")};
  }
`;
export const TierRequirements = styled.div`
  padding: 0 15px;
  border-top: 1px solid #f5f5f5;
  width: 100%;
  min-height: 269px;
  height: 250px;
  overflow: auto;
  @media (max-width: 1500px) {
    min-height: 320px;
    height: 300px;
  }
  @media (max-width: 1200px) {
    min-height: 286px;
    height: 240px;
  }
  @media (max-width: 750px) {
    min-height: 320px;
    height: 300px;
  }
  @media (max-width: 650px) {
    min-height: 260px;
    height: 240px;
  }
  @media (max-width: 450px) {
    min-height: 310px;
    height: 290px;
  }
  > ul.requirements {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    > li {
      display: flex;
      font-size: 16px;
      line-height: 18px;
      padding: 5px 0;
      align-items: flex-start;
      color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "")};
      > span:last-child {
        width: calc(100% - 18px);
      }
      > a {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
    }
    > li .disc-icon {
      content: "";
      background: ${props =>
        props.theme.mode === "dark" ? "#ffffff" : "#333333"};
      height: 8px;
      display: inline-block;
      width: 8px;
      border-radius: 50%;
      vertical-align: middle;
      margin: 5px 10px 0 0;
    }
  }
`;
export const TierSubHeadRequire = styled(TierSubHead)`
  padding: 20px 0;
`;
export const TierUpdate = styled.button`
  background: ${props =>
    props.theme.mode === "dark" ? "#818d95" : "transparent"};
  height: 48px;
  color: #333333;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0 20px;
  border: 2px solid;
  border-color: ${props =>
    props.theme.mode === "dark" ? "#818d95" : "#333333"};
  border-radius: 30px;
  margin: 0 0 20px;
`;
export const TierVerifiedWrap = styled.span`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: flex-end;
  @media (max-width: 1578px) {
    height: 66px;
  }
  @media (max-width: 1024px) {
    height: 70px;
  }
`;
export const TierVerfied = styled.span`
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #33e321;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  padding: 5px 0;
  > i {
    margin: 0 5px 0 0;
  }
`;
export const TierInnerWrap = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
  color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "")};
`;

// Tier Info css start
export const TierInfoWrap = styled.div`
  min-height: calc(100vh - 380px);
  padding-top: 80px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#f5f6fa"};
  display: flex;
  font-family: open sans;
`;
export const TierInfoInnerWrap = styled.div`
  margin: 20px auto 30px;
  width: 95%;
  background: #fff;
  border-radius: 7px;
  min-height: 70vh;
  color: #000000;
  p {
    font-size: 16px;
  }
`;
export const TierInfoContent = styled.div`
  padding: 30px 0 50px;
  width: 50%;
  margin: 0 auto;
`;
export const TierInfoHead = styled.span`
  font-size: 30px;
  color: #000000;
  display: block;
  text-align: center;
  line-height: 1;
  padding: 0 0 40px 0;
  > b {
    color: #4c84ff;
  }
`;
export const TierListingOutside = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  font-size: 14px;
  color: #000000;
  > li {
    padding: 0 0 10px 0;
    > span {
      font-size: 16px;
      padding: 0 0 10px 0;
      display: block;
      color: #000;
    }
    > .content {
      padding: 0 30px;
      > p {
        margin: 0;
        padding: 0 0 10px 0;
      }
    }
  }
`;
export const TierListingInside = styled.ul`
  padding-bottom: 10px;
  > li {
    list-style-type: disc;
  }
`;
export const TierListingInfoHead = styled.span`
  &.instructions {
    padding: 0 0 30px 0;
    display: block;
  }
`;
export const TierQuestion = styled.span`
  font-size: 18px;
  font-weight: 600;
  padding: 10px 0 0 0;
  display: block;
  &.padding-btm {
    padding: 0 0 20px 0;
  }
`;
export const TierAnswerTable = styled.table`
  margin: 10px 0 50px;
  width: 100%;
  > thead {
    > tr {
      > th {
        width: 50%;
        padding: 25px 0;
        border-bottom: 1px solid #eee;
        &:first-child {
          color: green;
        }
        &:last-child {
          color: red;
        }
      }
    }
  }
  > tbody {
    > tr {
      > td {
        width: 50%;
        padding: 25px 0;
        border-bottom: 1px solid #eee;
        font-size: 16px;
        &:first-child {
          color: green;
          font-weight: bold;
        }
        &:last-child {
          color: red;
        }
        > span {
          display: block;
        }
      }
    }
  }
`;
export const TierExamplesHead = styled.span`
  display: block;
  font-weight: 600;
  font-size: 18px;
  margin: 45px 0 30px;
`;
export const TierExamplesSubHead = styled.span`
  display: block;
  padding: 0 0 10px 0;
  &.green {
    color: green;
  }
  &.red {
    color: red;
  }
`;
export const TierImageWrap = styled.div`
  margin: 0 0 30px 0;
  > img {
    max-width: 60%;
  }
  &.photo-block {
    margin: 0 0 30px 0;
    > img {
      max-width: 80%;
    }
  }
`;
export const TierPhotoBlock = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eee;
  margin: 0 0 30px 0;
`;
export const TierPhotoBlockCol = styled.div`
  display: flex;
  width: 50%;
  flex-wrap: wrap;
  &.left-col {
    padding: 0 15px 15px 0;
  }
  &.right-col {
    padding: 0 0 15px 15px;
  }
`;
// Tier Info css end

export const TierCommonHead = styled.div`
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
  text-align: center;
  padding: 0 0 30px 0;
`;
export const TierContainer = styled.div`
  margin: auto;
  width: 60%;
  display: flex;
  align-items: center;
  font-family: "Open sans";
`;
export const TierStepBlock = styled.div`
  width: 30%;
  > .ant-steps-vertical {
    > .ant-steps-item {
      position: relative;
      > .ant-steps-item-tail {
        display: none;
      }
      > .ant-steps-item-content {
        > .ant-steps-item-title {
          line-height: 24px;
          padding: 0;
        }
      }
      > .ant-steps-item-icon {
        width: 24px;
        height: 24px;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        border-radius: 24px;
        background-color: rgb(0, 170, 250);
        border-color: rgb(0, 170, 250);
        &:after {
          background-color: #e8e8e8;
          position: absolute;
          top: 28px;
          left: 12px;
          display: block;
          height: calc(100% - 31px);
          width: 1px;
          background: #e8e8e8;
          content: "";
        }
      }
    }
    & .ant-steps-item:last-child {
      > .ant-steps-item-icon:after {
        display: none !important;
      }
    }
    > .ant-steps-item.ant-steps-item-finish {
      > .ant-steps-item-icon {
        > .ant-steps-icon {
          color: #fff;
        }
      }
    }
    > .ant-steps-item.ant-steps-item-process {
      > .ant-steps-item-content {
        > .ant-steps-item-title {
          font-weight: 600;
        }
      }
      > .ant-steps-item-icon {
      }
    }
    > .ant-steps-item.ant-steps-item-wait {
      > .ant-steps-item-content {
        > .ant-steps-item-title {
          color: #333;
          font-weight: 100;
        }
      }
      > .ant-steps-item-icon {
        color: #000;
        > .ant-steps-icon {
          color: #000;
        }
      }
    }
  }
`;
export const TierStepContent = styled.div`
  width: 70%;
  padding: 0 0 0 30px;
  display: inherit;
  justify-content: center;
`;
