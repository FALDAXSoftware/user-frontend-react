import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Button, Pagination, Table } from 'antd';
/* Styled- Components */

export const AccWrap = styled.div`
  margin-bottom:50px;
`
export const NotiWrap = styled.div`
    margin-top:50px;
`
export const NotiHead = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color:${props => props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
`
export const NotiDesc = styled.div`
    font-size: 16.008px;
    margin-top:30px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
export const CheckWrap = styled(Row)`
    max-width:730px;
    width:100%;
    margin:auto;
    margin-top:35px;
`
export const CheckRow = styled(Row)`
    text-align:left;
    @media(max-width:992px)
    {
        margin-left:160px;
    }
    @media(max-width:728px)
    {
        margin-left:135px;

    }
    @media(max-width:630px)
    {
        margin-left:114px;
        
    }
    @media(max-width:330px)
    {
        margin-left:100px;
    }
`
export const CheckRow2 = styled(CheckRow)`
    margin-top:20px;
    @media(max-width:992px)
    {
        margin-top:0px;
    }
`
export const CheckCol = styled(Col)`

`
export const CheckCol2 = styled(CheckCol)`

`
export const CheckCol3 = styled(CheckCol)`

`
export const CheckCol4 = styled(CheckCol)`

`
export const HR = styled.hr`
    margin-top:50px;
    width:95%;
    border-top: 1px solid #ededed;
`
export const LoginHistory = styled.div`

`
export const HistoryHead = styled.div`
    margin-top:10px;
`
export const Heading = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: ${props => props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
    line-height: 2.4;
    -moz-transform: matrix( 1,0,0,0.99859542519785,0,0);
    -webkit-transform: matrix( 1,0,0,0.99859542519785,0,0);
    -ms-transform: matrix( 1,0,0,0.99859542519785,0,0);
`
export const Desc = styled.div`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: rgb( 102, 102, 102 );
    -moz-transform: matrix( 0.99956308705261,0,0,0.99832082554207,0,0);
    -webkit-transform: matrix( 0.99956308705261,0,0,0.99832082554207,0,0);
    -ms-transform: matrix( 0.99956308705261,0,0,0.99832082554207,0,0);
`
export const FontAwesomeIconS = styled(FontAwesomeIcon)`
    color:${props => props.theme.mode === "dark" ? 'white' : 'black'};
`
export const TableWrap = styled.div`
    margin-top:30px;
    width:36%;    
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    & .ant-table-placeholder
    {
        background-color:${props => props.theme.mode === "dark" ? "#041421" : ""};
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
    @media(max-width:992px)
    {
        width:60%;
    }
    @media(max-width:992px)
    {
        width:80%;
    }
    @media(max-width:400px)
    {
        width:90%;
    }
`
export const HR2 = styled(HR)`
`
export const DeleteWrap = styled.div`
`
export const DeleteHead = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: ${props => props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
    -moz-transform: matrix( 1,0,0,0.99882784793165,0,0);
    -webkit-transform: matrix( 1,0,0,0.99882784793165,0,0);
    -ms-transform: matrix( 1,0,0,0.99882784793165,0,0);  
    margin-top:55px;
`
export const DeleteDesc = styled.div`
    margin-top:30px;
    color:${props => props.theme.mode === "dark" ? "#3c4b64" : ""};
`
export const DeleteBtn = styled.div`
  margin-top:35px;
`
export const ButtonDel = styled(Button)`
  background-color:${props => props.theme.mode === "dark" ? "#a21d1d" : "#fce8e8"};
  color:${props => props.theme.mode === "dark" ? "white" : "#fe1f1f"};
  border:none;
  width:240px;
  border-radius:40px;
  height:50px;
`
export const PaginationS = styled(Pagination)`
    margin-top:30px !important;
    & .ant-pagination-item-link
    {
        background-color: ${props => props.theme.mode === "dark" ? "#041421" : ""};
    }
    & .ant-pagination-item-link>i
    {
        color: ${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & .ant-pagination-item
    {
        background-color: ${props => props.theme.mode === "dark" ? "#041421" : ""};
    }
    & .ant-pagination-item>a
    {
        color: ${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & .ant-pagination-item-link .ant-pagination-item-ellipsis
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
`


/* Threshold Notification */

export const NotificationTable = styled(Table)`
    width:800px;
    margin-left:auto;
    margin-right:auto;

    th{
        background-color: #e4ecff !important;
    }
`
export const WrapTable = styled.div`
    margin-top:40px;
`