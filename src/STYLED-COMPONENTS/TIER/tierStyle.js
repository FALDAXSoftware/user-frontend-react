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
  > tr th {
    text-align: inherit;
    width: 50%;
    background: #e1e1e1;
    font-weight: 600;
    font-size: 18px;
    padding: 5px 0;
    color: #333333;
  }
  > tr td {
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
