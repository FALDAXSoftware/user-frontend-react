import styled from "styled-components";
import { /*  Row, Col, */ Table /* , Spin */ } from "antd";

export const ActPortWrap = styled.div`
  margin-top: 30px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#f5f6fa"};
`;
export const Lleft = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  margin-right: 15px;
  height: 500px;
  padding-bottom: 30px;
  overflow-y: auto;
  box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  border-radius: 5px;
  @media (max-width: 991px) {
    margin-right: 0px;
  }
`;
export const Rright = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  margin-left: 15px;
  height: 500px;
  padding-bottom: 30px;
  overflow-y: auto;
  box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  border-radius: 5px;
  @media (max-width: 991px) {
    margin-left: 0px;
    margin-top: 30px;
  }
`;
export const Topic = styled.div`
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb(127, 127, 127);
  font-weight: 700;
  padding-top: 25px;
  padding-left: 25px;
`;
export const ActDiv = styled.div`
  margin-top: 20px;
  margin-left: 25px;
  margin-right: 25px;
`;
export const ActTable = styled(Table)`
    & tr>.dash-date{
        font-weight: 600;
        color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
    }
    & .ant-table-header
    {
        background:none;
    }
    & thead>tr>th
    {
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : "white"};
        border-bottom:${props =>
          props.theme.mode === "dark"
            ? "1px solid #334553"
            : "1px solid #eeeeee"};
        color:${props =>
          props.theme.mode === "dark" ? "#174c7e" : "#7f7f7f"} !important;
    }
    & tbody>tr>td
    {
        color:${props => (props.theme.mode === "dark" ? "white" : "")};
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : "white"};
        border-bottom:${props =>
          props.theme.mode === "dark" ? "1px solid #334553" : ""}
    }
    & .amount{
    width: 120px;
    }
    & tr td.amount{
    font-weight: 600;
    color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
    }
    & .progress-bar-container{
    width: 170px;
    }
    & .ant-table{
    font-family: "Open sans" !important;
    }
    & .ant-table-placeholder
    {
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : ""}
        color:${props => (props.theme.mode === "dark" ? "white" : "")}
    }
    & .ant-table-tbody>tr:hover>td
    {
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : ""};
    }
     & .ant-table-body
    {
    &::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
       }
     
       &::-webkit-scrollbar-thumb {
        background-color: ${props =>
          props.theme.mode === "dark" ? "#041624" : ""};
        border-radius: 3px;
       }
        &::-webkit-scrollbar-track{
            background: ${props =>
              props.theme.mode === "dark" ? "#072135" : ""};
        }
     
        &:hover {
         background: #072135;
        }
       }
    }
   /*  & .ant-table-header
    {
        ::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
       }
     
        ::-webkit-scrollbar-thumb {
        background-color: #041624;
        border-radius: 3px;
     
        :hover {
         background: #072135;
        }
       }
    }  */
`;
export const PortTable = styled(Table)`
& .ant-table-header
  {
      background:none;
  }
    & thead>tr>th
    {
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : "white"};
        border-bottom:${props =>
          props.theme.mode === "dark"
            ? "1px solid #334553"
            : "1px solid #eeeeee"};
        color:${props => (props.theme.mode === "dark" ? "#174c7e" : "#7f7f7f")};
    }
    & tbody>tr>td
    {
        color:${props => (props.theme.mode === "dark" ? "white" : "")};
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : "white"};
        border-bottom:${props =>
          props.theme.mode === "dark" ? "1px solid #334553" : ""}
    }
    & .coin{
        width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    & .amount{
    width: 130px;
    text-align: center;
    }
    & .value{
    text-align: center;
    width: 130px;
    }
    & .change{
    text-align: center;
    }
    & .ant-table-placeholder
    {
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : ""}
        color:${props => (props.theme.mode === "dark" ? "white" : "")}
    } 
    & .ant-table-tbody>tr:hover>td
    {
        background-color:${props =>
          props.theme.mode === "dark" ? "#041b2c" : ""};
    }
    & .ant-table-body
    {
    &::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
       }
     
       &::-webkit-scrollbar-thumb {
        background-color: ${props =>
          props.theme.mode === "dark" ? "#041624" : ""};
        border-radius: 3px;
       }
        &::-webkit-scrollbar-track{
            background: ${props =>
              props.theme.mode === "dark" ? "#072135" : ""};
        }
     
        &:hover {
         background: #072135;
        }
       }
    }
    /*
    & .ant-table-header
    {
        ::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
       }
     
        ::-webkit-scrollbar-thumb {
        background-color: #041624;
        border-radius: 3px;
     
        :hover {
         background: #072135;
        }
       }
    } */
`;
export const HighLow = styled.div`
  display: flex;
  margin-top: 30px;
  margin-right: 25px;
  margin-left: 25px;
`;
export const LeftHl = styled.div`
  font-size: 24px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 68, 68, 68 )"};
  font-weight: 600;
`;
export const RightHl = styled.div`
  margin-left: auto;
  font-size: 24px;
  font-family: "Open Sans";
  color: rgb(73, 174, 89);
  font-weight: 600;
  &.red_colour {
    color: red;
  }
`;
export const RiseFall = styled.div`
  margin-top: 30px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  padding-bottom: 40px;
  box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  border-radius: 5px;
  // height:500px;
  overflow-y: auto;
`;
export const Newsdiv = styled.div`
  margin-top: 30px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  padding-bottom: 40px;
  padding-top: 25px;
  box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  border-radius: 5px;
  height: 500px;
  overflow-y: auto;
`;
export const News = styled.span`
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb(127, 127, 127);
  font-weight: bold;
  margin-left: 30px;
`;
export const NewsList = styled.div`
  margin-top: 25px;
  margin-left: 30px;
  margin-right: 30px;
`;
export const List = styled.div`
  border-bottom: ${props =>
    props.theme.mode === "dark" ? "1px solid #33465e" : "1px solid #eeeeee"};
  margin-top: 20px;
`;
export const ListSpan = styled.span`
  font-size: 12px;
  font-family: "Open Sans";
  color: rgb(127, 127, 127);
`;
export const Listp = styled.a`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(76, 132, 255);
  font-weight: 600;
  margin-top: 8px;
  display: block;
  margin-bottom: 15px;
`;
export const Date = styled.span`
  float: right;
  margin-top: 20px;
  font-size: 12px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "#617090" : "rgb( 97, 112, 144 )"};
  padding-right: 20px;
`;

export const SpinSingle = styled.div`
  text-align: center;
  background: white;
  border-radius: 4px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f580;
  height: 100%;
  z-index: 999;
`;
