import { Row, Col, Tabs, Button, Table, Input, notification, Steps, Menu, Dropdown, Icon, Radio } from 'antd';
import styled from 'styled-components';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Search = Input.Search;

export const Row_wrap = styled.div`
`
export const Row_wrap2 = styled.div`
    margin-top:25px;
`

export const Left_div = styled.div`
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
    padding-top:30px;
    margin-right:30px;
    padding-bottom: 30px;
    box-shadow: ${props => props.theme.mode == "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
    border-radius:5px;
    @media(max-width:991px)
    {
        margin-right:0px;
    }
`
export const Left_div1 = styled(Left_div)`
    padding-top:30px;
    margin-right:30px;
    padding-bottom: 30px;
    box-shadow: ${props => props.theme.mode == "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
    border-radius:5px;
    height:618px;
    @media(max-width:991px)
    {
        margin-right:0px;
    }
`
export const Left_div2 = styled(Left_div)`
    padding-top:30px;
    margin-right:0px;
    padding-bottom: 30px;
    box-shadow: ${props => props.theme.mode == "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
    border-radius:5px;
`
export const Instru = styled.p`
    display:inline-block;
    font-size: 19px;
    font-weight: bold;
    margin-left:30px;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
export const SearchInput = styled(Search)`
    display:inline-block;
    width:270px;
    float:right;
    margin-right:25px;
    >.ant-input-suffix>i
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    >input
    {
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-radius:0px;
        background-color:${props => props.theme.mode == "dark" ? "#041b2c" : ""}
        caret-color:${props => props.theme.mode == "dark" ? "white" : ""}
        color:${props => props.theme.mode == "dark" ? "white" : ""}
    }
`
export const FIAT_wrap = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top:5px;
`
export const FIAT = styled.div`
    display:inline-block;
    margin-right:25px;
`
export const Sect = styled(Button)`
    display:inline-block;
    padding:10px 15px;
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
    color:${props => props.theme.mode == "dark" ? "#617090" : ""};
    border:none;
    height:auto;
    border-radius:0px;
    border-right:1px solid #cad0e6;
    &:nth-child(1) {
        border-radius:5px 0px 0px 5px;
    }
    &:last-child {
        border-radius:0px 5px 5px 0px;
        border-right:0px;
    }
`
export const Right_div = styled.div`
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
    box-shadow: ${props => props.theme.mode == "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
    border-radius:5px;
`
export const Right_div1 = styled(Right_div)`
    @media(max-width:991px)
    {
        margin-top:30px;
    }
`
export const InstruTable = styled.div`
    margin-top:25px;
`
export const TableIns = styled(Table)`
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-body>table>.ant-table-thead>tr>th
    {
        color:#174c7e;
        background-color:${props => props.theme.mode == "dark" ? "#041422" : ""};
        font-weight:bold;
        border-bottom:0px;
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-body>table>.ant-table-tbody>tr>td
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""} 
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-body>table>.ant-table-thead>tr>th>span>.ant-table-column-sorter>.off>i
    {   
        color:#606f8e;
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-body>table>.ant-table-thead>tr>th>span>.ant-table-column-sorter>.on>i
    {   
        color:#4c84ff;
    }
`
export const Tabs_right = styled(Tabs)`
    >.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav-animated
    {
        display: flex !important;
        justify-content:center !important;
    }
`

/* Market Style */

export const Label = styled.label`
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
export const Market_wrap = styled.div`
    padding-left:30px;
    padding-right:30px;
`
export const Buy_wrap = styled.div``
export const Buy_sell = styled.div`
    width:100%;
    margin-left:auto;
    margin-right:auto;
    height:auto;
    text-align:center;
`
export const BuySellRadio = styled(RadioButton)`
    padding-left: 40px;
    padding-right: 40px;
`
export const Buy = styled(Button)`
    display:inline-block;
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    width:50%;
    height:40px;
    border-top-right-radius:0px !important;
    border-bottom-right-radius:0px !important;
    border-right:0px;
    &:hover
    {
        border-right:1px solid #40a9ff;
    }
`
export const Sell = styled(Button)`
    display:inline-block;
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    width:50%;
    border-top-left-radius:0px !important;
    border-bottom-left-radius:0px !important;
    height:40px;
`
export const Balance_wrap = styled.div`
    margin-top:30px;
`
export const Balance = styled.p`
    color:${props => props.theme.mode == "dark" ? "white" : ""}
`
export const Total = styled.p`
    color:${props => props.theme.mode == "dark" ? "white" : ""}
`
export const Check_wrap = styled.div`
    >.ant-checkbox-wrapper>span
    {
        color:${props => props.theme.mode == "dark" ? "#617090" : ""}
    }
`
export const ETH_wrap = styled.div`
    margin-top:15px;
`

export const AMTinput = styled(Input)`
    display:block;
    height:35px;
    width:100%;
    border-radius:5px;
    border-radius:1px solid #cad0e6;
    caret-color:${props => props.theme.mode == "dark" ? 'white' : ''};
    color:${props => props.theme.mode == "dark" ? 'white' : ''};
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : ""};
`

export const BTC_wrap = styled.div`
    margin-top:10px;
    
`
export const Total_wrap = styled.div`
    >.ant-input-group-wrapper>.ant-input-group>.ant-input
    {
        border-right:0px;
    }
    >.ant-input-group-wrapper>.ant-input-group>.ant-input:hover,>.ant-input-group-wrapper>.ant-input-group>.ant-input:focus
    {
        border:1px solid #cad0e6;
    }
    >.ant-input-group-wrapper>.ant-input-group>.ant-input-group-addon
    {
        background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
        border-left:0px;
        color:#c5c5c5;
    }

`
export const Totinput = styled(Input)`
    display:block;
    height:35px;
    width:100%;
    border-radius:5px;
    border-radius:1px solid #cad0e6;
    caret-color:${props => props.theme.mode == "dark" ? 'white' : ''};
    color:${props => props.theme.mode == "dark" ? 'white' : ''};
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : ""};
`
export const Pay = styled.div`
    margin-top:30px;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
export const Esti = styled.div`
    margin-top:30px;
`
export const ButtonETH = styled(Button)`
    background-color:${props => props.side == "Buy" ? '#64ba71' : '#ba6471'};
    border-color:${props => props.side == "Buy" ? '#64ba71' : '#ba6471'};
    font-size: 15px;
    font-family: "Open Sans";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
    text-transform: uppercase;  
    width:100%;
    height:50px;
    margin-bottom:30px;
    &:hover,&:focus{
        background-color:${props => props.side == "Buy" ? '#64ba71' : '#ba6471'};
        color: rgb( 255, 255, 255 );
        border-color:${props => props.side == "Buy" ? '#64ba71' : '#ba6471'};
    }
`
export const Button_wrap = styled.div`
    margin-top:25px;
`
export const BBC_wrap = styled.div`
    margin-left:30px;
    margin-right:30px;
`
export const BBC = styled.span`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 76, 132, 255 );
    text-transform: uppercase;
    font-weight:600;
`
export const Total_BTC = styled.span`
    float:right;
    display:inline-block;
    font-size: 13px;
    font-family: "Open Sans";
    font-weight:600;
    color: ${props => props.theme.mode == "dark" ? 'white' : 'rgb( 51, 51, 51 )'};      
`
export const Buy_table = styled.div`
    margin-top:15px;
    border:1px solid #d8d8d8;
    >.table-responsive>.table-striped>thead
    {
        background-color: #f5f6fa;
        color:#174c7e;
    }
    >.table-responsive>.table-striped>tbody>tr>td
    {
        color:black;
        font-family: "Open Sans";
        font-weight:600;
    }
`
export const BBC_wrap2 = styled(BBC_wrap)`
    margin-top:20px;
`
export const BBC2 = styled(BBC)`
    color:red;

`


/* Depth Chart */

export const Instru2 = styled(Instru)`
    margin-top:25px;
    margin-left:10px;
`

export const WrapDepth = styled.div`

`