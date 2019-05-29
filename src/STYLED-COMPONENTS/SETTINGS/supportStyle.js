import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Card } from 'antd';
import styled from 'styled-components';


/* Styled Components */
export const HeaderText = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color:${props => props.theme.mode==="dark" ? "white" : "rgb( 80, 80, 80 )"};
    margin-top:20px;
    text-align:center;
`
export const RefDiv = styled.div`
    margin:auto;
    width:80%;
    height:140px;
    margin-top:40px;
    height:auto;
    margin-bottom:80px;
`
export const OpenTicketRow = styled(Row)`
  padding-top: 20px;
  @media(max-width:767px)
  {
    & a
    {
      padding-top: 20px;
    }
  }
`
export const DivWrap = styled.div`
  margin-top:20px;
  width:300px;
  margin-left:auto;
  margin-right:auto;
  @media(max-width:575px)
  {
      width:100%;
  }
  @media(min-width:1600px)
  {
    width:60%;
  }
`
export const CardText = styled.h4`
  margin-bottom: 0px;
  font-family: "Open Sans";
  color:${props => props.theme.mode==="dark" ? "white" : "inherit"};

`
export const CustomCard = styled(Card)`
  width: 100%; 
  border:0px;
  background-color: transparent;
  border-radius: 5px;
  color:${props => props.theme.mode==="dark" ? "white" : ""};
  &:hover{
    border-color: #1890ff;
    color:#1890ff !important;
  }
`
export const PContainer = styled.p`
    text-align: center;
    justify-content: center;
    // height: 100px;
    display: flex; 
    align-items: center;
    margin-bottom: 0px;
`
export const FaIcon = styled(FontAwesomeIcon)`
font-size: 50px;
margin-bottom: 20px;

`