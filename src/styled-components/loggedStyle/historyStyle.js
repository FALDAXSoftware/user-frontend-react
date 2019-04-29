import { Row, Col, Tabs, Button, Input, notification, Steps, Menu, Dropdown, Icon, Checkbox, DatePicker } from 'antd';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Container } from '../homepage/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { RangePicker } = DatePicker;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"} ;
    border-radius:5px;
    max-width:1170px;
    padding-bottom: 30px;
    min-height:70vh;

    @media(max-width:767px)
    {
        min-height:800px;
    }
    @media(max-width:575px)
    {
        min-height:600px;
    }
`
export const His_title = styled.span`
    font-size: 20px;
    font-family: "Open Sans";
    color:${ props => props.theme.mode == "dark" ? "white" : "rgb( 51, 51, 51 )"};
    font-weight: bold;
    text-transform: uppercase; 
    margin-top:25px;
`
export const His_wrap = styled.div`
    padding-top:25px;
    padding-left:15px;
    padding-right:15px;
`
export const Tablediv = styled.div`
    border:1px solid #d8d8d8;
    margin-top:25px;
    & .table-responsive
    {
        border:none !important;
        margin-bottom:0px !important;
    }
`
export const HisTable = styled(Table)`
    margin-bottom:0px;
    width:100%;
    >thead
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
        color:#174c7e;
        border:none;
        display: table;
        width: 100%;
    }
    >thead>tr>th
    {
        border:0px;
        padding:8px !important;
        height:40px;
        width:200px;
    }
    >tbody
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""} ;
        display: block;
        max-height: 1000px;
        overflow-y: scroll;
    }
    >tbody>tr>td
    {
        width:200px;
        word-break: break-all;
        height:50px;
        padding-top: 12px;
        padding-left: 8px;
        font-size: 14px;
        font-weight:600;
        font-family: "Open Sans";
        color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 33, 33, 33 )"};
        text-transform: uppercase;
    }
    >tbody>tr>td
    {
        border-top:0px;
    }
    >tbody>tr:first-child>td
    {
        border-top: 1px solid #ddd;
    }
    >tbody>tr:nth-of-type(odd)
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f9f9f9"};
    }

    @media(max-width:991px)
    {
        >thead
        {
            min-width: 1400px;
        }
    }
`
export const HeadHis = styled.div`
    padding-top:30px;
`
export const Filter = styled.div`
    padding-left:15px;
    display: flex;
    flex-wrap:wrap;
    align-items: center;
`
export const EXPButton = styled(Button)`
    float:right;
    font-size: 14px;
    font-family: "Open Sans";
    color: white;
    text-transform: uppercase;      
    background-color:#40a9ff;
    margin-left: auto;
    @media(max-width:991px)
    {
        display:flex;
        margin-left: 0px;
        margin-top:20px;    
    }
`
export const Dropwrap = styled.div`
    display:inline-block;
    width: 165px;
    @media(max-width:456px)
    {
        width: 80px;
    }

`
export const Dropwrap2 = styled(Dropwrap)`

`
export const ButtonToolbarOne = styled(ButtonToolbar)`
    >.btn-group
    {
        width:100%;
    }

`

export const DropdownButtonOne = styled(DropdownButton)`
    background-color: ${props => props.theme.mode == "dark" ? "#01090f" : ""};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    width:100%;
    text-align:left;
    >.caret
    {
        float:right;
        margin-top: 8px;
    }

`
export const Datediv = styled.div`
    display:inline-block;
    margin-left:70px;
    @media(max-width:991px)
    {
        width: 100%;
        margin-top: 20px;
        margin-left: 0px !important;
    }
    @media(max-width:845px)
    {
        display:flex;
        margin-left:15px;
    }
    @media(max-width:790px)
    {
        display:flex;
        margin-top:20px;
        margin-left:0px;
    }
`
export const RangePickerS = styled(RangePicker)`
    >.ant-calendar-picker-input
    {
        background-color:${props => props.theme.mode == "dark" ? "#01090f" : ""};
    }
    >.ant-calendar-picker-input>.ant-calendar-range-picker-input
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    >.ant-calendar-picker-input>.ant-calendar-range-picker-separator
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    >.ant-calendar-picker-input>.ant-calendar-picker-icon
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
export const FontAwesomeIconS = styled(FontAwesomeIcon)`
    margin:0px 20px;
    @media(max-width:375px)
    {
        margin:0px 10px;
    }
`