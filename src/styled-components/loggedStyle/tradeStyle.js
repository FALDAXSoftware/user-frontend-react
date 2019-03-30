import { Row, Col, Tabs, Button, Table, Input, Switch, Checkbox, notification, Steps, Menu, Dropdown, Icon, Radio, Select } from 'antd';
import styled from 'styled-components';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Search = Input.Search;

export const Row_wrap = styled.div`
`
export const Row_wrap2 = styled.div`
    margin-top:25px;
`
export const Layout = styled.div`
display: flex;
justify-content: center;
margin-bottom: 15px;
margin-top: 40px;
`
export const SaveButton = styled(Button)`
    margin-left:15px;
`
export const EditButton = styled(Button)`
    margin-right:15px;
`
export const MainTV = styled.div`
    background-color: ${props => props.theme.mode == "dark" ? "#2e3141" : "#eceff1"};
    height:calc( 100% - 38px );
`
export const TVBar = styled.div`
    display:flex;
    align-items:center;
    background-color:${props => props.theme.mode == "dark" ? "#131722" : "white"};
    width: calc(100% - 12px);
    margin: 0 auto;
    border-bottom:  ${props => props.theme.mode == "dark" ? "1px solid #2e3141" : "1px solid #eceff1"};
    height: 38px ;
    padding: 0px 6px;
    >div>span
    {
        font-weight: "normal";
        font-size: "17px";
        color: ${props => props.theme.mode == "dark" ? "rgb(217, 217, 217)" : "rgb(85, 85, 85)"};
    }
    >div>i
    {
        cursor:pointer;
        font-size:26px;
        color:${props => props.theme.mode == "dark" ? "#687786;" : ""};
    }
`
export const Left_div = styled.div`
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
    padding-top:25px;
    padding-bottom: 34px;
    box-shadow: ${props => props.theme.mode == "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
    border-radius:5px;
    @media(max-width:991px)
    {
        margin-right:0px;
        padding-top:15px;
    }
`
export const EditDiv = styled(Left_div)`
    display:flex;
    justify-content:center;
    height:auto;
    & .editText
    {
        color: black;
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 600;
    }
`
export const SwitchS = styled(Switch)`
    margin-left:15px;
`
export const Left_div1 = styled(Left_div)`
    padding-top:30px;
    padding-bottom: 8px;
    box-shadow: ${props => props.theme.mode == "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
    border-radius:5px;
    height:100%;
    @media(max-width:575px)
    {
        height:auto;
    }
    @media(max-width:991px)
    {
        margin-right:0px;
    }
`
export const Left_div2 = styled(Left_div)`
    padding-top:30px;
    margin-right:0px;
    padding-bottom: 22px;
    box-shadow: ${props => props.theme.mode == "dark" ? "" : "0px 0px 5px 5px rgb(241, 241, 241)"};
    border-radius:5px;
    height:auto;
`
export const Instru = styled.p`
    display:inline-block;
    font-size: 19px;
    font-weight: bold;
    margin-left:30px;
    color:${props => props.theme.mode == "dark" ? "white" : "#333333"};
    @media(max-width:575px)
    {
        display:block;
    }
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
    @media(max-width:575px)
    {
        margin-left:25px;
        margin-right:0px;
        float:none;
    }
`
export const FIAT_wrap = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top:5px;
    @media(max-width:575px)
    {
        justify-content:flex-start;
        margin-top:20px;
        margin-left:25px;
    }
`
export const FIAT_wrap2 = styled.div`
    display: inline-block;
    float: right;
    & .ant-radio-button-wrapper
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : ""};
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    @media(max-width:535px)
    {
        margin-top:20px;
    }
`
export const FIAT = styled.div`
    display:inline-block;
    margin-right:30px;
`

export const RadioSelect = styled(RadioGroup)`
    font-family: "Open Sans";
    
    & .ant-radio-button-wrapper
    {
        font-weight:600 !important;
        background-color:${props => props.theme.mode == "dark" ? "" : "#f5f6fa"};
        font-size:13px;
    }
    @media(max-width:460px)
    {
        & .ant-radio-button-wrapper
        {
            padding: 0 4px;
        }
    }
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
    height:auto;
    @media(max-width:991px)
    {
        margin-top:0px;
    }
`
export const Right_div1 = styled(Right_div)`
    height:100%;
    @media(max-width:575px)
    {
        height:auto;
    }
    @media(max-width:991px)
    {
        margin-top:0px;
    }
`
export const InstruTable = styled.div`
    margin-top:25px;
`
export const TableIns = styled(Table)`
    & .ant-table-column-sorter
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""} ;
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-scroll>.ant-table-header
    {
        background:${props => props.theme.mode == "dark" ? "#041422" : ""};
        margin-bottom: 0px !important;
        overflow-x: hidden;
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-scroll>.ant-table-body
    {
        background:none;
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-scroll>.ant-table-header>table>.ant-table-thead>tr>th
    {
        color:#174c7e;
        background-color:${props => props.theme.mode == "dark" ? "#041422" : ""};
        font-weight:bold;
        border-bottom:0px;
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-scroll>.ant-table-body>table>.ant-table-tbody>tr>td
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""} ;
        background-color:transparent;
        font-size: 14px;
        font-weight:600;
        font-family: "Open Sans";
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-scroll>.ant-table-body>table>.ant-table-thead>tr>th>span>.ant-table-column-sorter>.off>i
    {   
        color:#606f8e;
    }
    >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-scroll>.ant-table-body>table>.ant-table-thead>tr>th>span>.ant-table-column-sorter>.on>i
    {   
        color:#4c84ff;
    }
    @media(max-width:375px)
    {

        >.ant-spin-nested-loading>.ant-spin-container>.ant-table>.ant-table-content>.ant-table-scroll>.ant-table-body>table>.ant-table-thead>tr>th
        {
            padding: 10px 12px;
        }
        & .ant-table-tbody>tr>td
        {
            padding: 12px 12px ;
        }
    }
    & .ant-table-tbody>tr>td
    {
        cursor:pointer;
    }
    & .ant-table-tbody>tr:hover>td
    {
        background-color:${props => props.theme.mode == "dark" ? "#041b2c" : ""};
    }
    & .ant-table-placeholder
    {
        position: relative;
        padding: 60px 16px;
        background: none;
        border-bottom: 0px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: ${props => props.theme.mode == "dark" ? "white" : ""};
        z-index: 1;
        font-family: "Open Sans";
    }
`
export const Tabs_right = styled(Tabs)`

    >.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav-animated
    {
        display: flex !important;
        justify-content:center !important;
    }
    @media(max-width:475px)
    {
        >.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav-animated>div
        {
            width:100%;
        }
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
    @media(max-width:375px)
    {
        border-radius: 4px 4px 4px 4px !important; 
        margin-top: 15px;
        width: 115px;
    }
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
export const Balance1 = styled(Balance)`
    font-weight:600;
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
export const Willpay = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    font-weight:600;
    color: ${props => props.theme.mode == "dark" ? 'white' : 'rgb( 51, 51, 51 )'};
`
export const Willpay2 = styled.span`
    font-size: 20px;
    font-family: "NotoSansThai";
    color: ${props => props.theme.mode == "dark" ? 'white' : 'rgb( 51, 51, 51 )'};
    font-weight:600;
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
export const Best = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgba( 51, 51, 51, 0.8 );  
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
export const StopCheck = styled(Checkbox)`
    font-size: 14px;
    font-family: "Open Sans";
    font-weight:600;
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 127, 127, 127 )"}    ;
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


export const History_wrap = styled.div`

`
export const History_wrap1 = styled.div`
    overflow-x:auto;
    &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
    }

    &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.mode == 'dark' ? '#041624' : ''};
    border-radius: 3px;
    }
    &::-webkit-scrollbar-track{
        background: ${props => props.theme.mode == 'dark' ? '#072135' : ""};
    }
`
export const CustomTable = styled.table`
    width:100%;
    table-layout: fixed;
    & td{
        padding:8px;
        text-align:center;
    }
    & th{
        padding:9px;
        text-align:center;
    }
    font-family:"Open Sans";
`
export const TableHeader = styled(CustomTable)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
    >thead
    {
        color:#174c7e;
        height:35px;
    }
`
export const TableContent = styled(CustomTable)`
    >tbody
    {
        color:${props => props.theme.mode == "dark" ? "white" : "black"} ;
        font-size: 14px;
        font-family: "Open Sans";
        font-weight:600;
    }
    >tbody>tr:nth-of-type(even)
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
    }

`


/* My orders and Trade */
export const Selectmonth = styled(Select)`
font-family: "Open Sans";
        font-weight:700;
& .ant-select-selection--single
{
    height:40px !important;
}
& .ant-select-selection__rendered
{
    line-height:40px !important;
}
    & .ant-select-selection
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : ""};
        color:${props => props.theme.mode == "dark" ? "white" : "rgba(0, 0, 0, 0.65)"};
    }
    & .anticon
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
export const InstruOrder = styled(Instru)`
    margin-bottom: 0px!important;
`
export const Orderwrap = styled.div`
display: flex;
flex-wrap:wrap;
align-items: center;
margin-bottom: 20px;
`
export const Dropwrap = styled.div`
display: inline - block;
width: 165px;
margin-right:20px;
@media(max-width: 456px)
{
    width: 80px;
}

`
export const ButtonToolbarOne = styled(ButtonToolbar)`
    >.btn-group{
    width: 100 %;
    }

`
export const DropdownButtonOne = styled(DropdownButton)`
background-color: ${ props => props.theme.mode == "dark" ? "#01090f" : ""};
color: ${ props => props.theme.mode == "dark" ? "white" : ""};
width: 100 %;
text-align: left;
    >.caret
{
    float: right;
    margin-top: 8px;
}

`
export const ScrollTableContent = styled.div`
    overflow-x:auto;
    & .scrollbar>div:first-child{
        overflow: auto !important;
    }
    & .scrollbar>div:nth-child(3){
        width: 8px !important;
        right: 0px !important;
        bottom: 0px !important;
        top: 0px !important;
        border-radius:0px !important;
        border-right: none;
        border-bottom: none;
        padding: 2px;
        background-color: transparent; 
    }
    & .scrollbar.news>div:nth-child(3){
        border: none !important;
    }
    & .scrollbar>div:nth-child(3)>div{
        border-radius: 2px !important;
        background-color: rgb(136, 136, 136)!important; 
    }
`
export const SettingDropdown = styled(Dropdown)`
    position: fixed;
    top: 90px;
    right: 0px;
    background: white;
    color: #1890ff;
    cursor: pointer;
    padding: 7px 7px;
    font-size: 20px;
    border: 1px solid lightgray;
    z-index: 9999;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`