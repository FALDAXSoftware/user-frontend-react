import styled from "styled-components";
import { Container } from "../homepage/style";
import { ConversionBackground } from "../../Constants/images";
import { Row, Col, Tabs, Select, Button } from "antd";
const TabPane = Tabs.TabPane;
const Option = Select.Option
export const ConversionWarp = styled.div`
    background-color:#f5f6fa;
    background-image:url('${ConversionBackground}');
    background-size:cover;
    min-height:100vh;
    width:100%;
`
export const ConversionContainer = styled(Container)`
    border-radius:5px;
    max-width:1170px;
    padding-bottom: 30px;
    padding-top:200px;
`
export const MainRow = styled(Row)`
    background-color:#e1e7ec;
`
export const LeftCol = styled(Col)`
    background-color:#fff;
    box-shadow: 3px 0px 5px 0px rgba(109, 109, 109, 0.19);
    position:relative;
    &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 15px solid transparent;
        border-left-color: #ffffff;
        border-right: 0;
        margin-top: -15px;
        margin-right: -15px;
    }
`
export const ConversionTab = styled(Tabs)`
    border-bottom:none;
    &.ant-tabs-bar>.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav{
        width:100%;
        padding-bottom:10px;
        border-bottom:none;
    }
    &.ant-tabs-bar>.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav>div>.ant-tabs-tab{
        margin:0px !important;
        width:50%;
        text-align:center;
        font-size:18px;
        font-weight:700;
        border-bottom:1px solid #e3ebfc;
    }
    &.ant-tabs-bar>.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav>div>.ant-tabs-tab.ant-tabs-tab-active{
        background-color:#e3ebfc;
        position: relative;
    }
    
    &.ant-tabs-bar>.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav>div>.ant-tabs-tab.ant-tabs-tab-active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top-color: #e3ebfc;
        border-bottom: 0;
        margin-left: -10px;
        margin-bottom: -10px;
    }
    &.ant-tabs-bar>.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav-scroll>.ant-tabs-nav>.ant-tabs-ink-bar{
        display:none !important;
    }
`
export const ConversionTabPane = styled(TabPane)`
    padding:25px;
`
export const ConversionTitle = styled.span`
    font-size:18px;
    font-family: "Open Sans";
    font-weight:bold;
    color:black;
    padding:0px 20px 20px;
    display:block;
`
export const ConversionRadioRow = styled(Row)`
    padding:20px;
`
export const CustomRadioContainer = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 13px;
    font-weight:600;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;


    & input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      & .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border:1px solid #b1b1bf;
        border-radius: 50%;
      }
      & ::hover input ~ .checkmark {
        background-color: #fff;
      }
      & input:checked ~ span.radio-label{
          color:#4c84ff;
      }
      & input:checked ~ .checkmark {
        border-color:#4c84ff;
      }
      & .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      & input:checked ~ .checkmark:after {
        display: block;
      }
      
      & .checkmark:after {
        top: 4px;
        left: 4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #4c84ff;
      }
`
export const BorderRow = styled(Row)`
      border:1px solid #dfe4f7;
      border-radius:5px;
      padding:20px;
      margin-bottom:35px;
`
export const RowTitle = styled.span`
    position: absolute;
    top: -11px;
    left: 20px;
    padding: 0px 10px;
    background-color: white;
    font-weight: 600;
    font-size: 13px;
`
export const ConversionInput = styled.input`
    padding: 6px 15px;
    height:auto;
    width: 100%;
    border: none;
    background-color: #f6f8fe;
    font-weight: 600;
    font-size: 20px;
    color:black;

    &:focus{
        border:none;
        outline:none;
    }
`
export const ConversionDropDown = styled(Select)`
    width:100%;
    padding:4px 0px;
    color: black;
    & .ant-select-selection{
        border:none;
        font-size:20px;
        font-weight:600;
        background-color: white;
    }
    &.ant-select-disabled .ant-select-selection{
        cursor:text;
    }
    & .ant-select-selection-selected-value{
        float:none;
        text-align:center;
    }
    & .ant-select-selection:focus{
        box-shadow: none;
        ouline:none;
    }
    & .ant-select-arrow{
        color:black;
    }
    &.ant-select-disabled .ant-select-arrow{
        display:none;
    }

`
export const DropIcon = styled.img`
    margin-right:10px;
`
export const DropDownOption = styled(Option)`

`
export const ConversionSubmitBtn = styled(Button)`
    padding:12px;
    font-size:22px;
    font-weight:bold;
    text-transform:uppercase;  
    height:auto;  
    font-family: "Open Sans";
    background-color: #4c84ff;
    border-color: #4c84ff;

    &:hover{
        background-color: white;
        border-color: #4c84ff;

        color:#4c84ff;
    }
`

export const RightCol = styled(Col)`
    padding:40px;
    min-height: 613px;
    display: flex;
    align-items: center;
`
export const RightColContainer = styled.div`
    background-image: url(/images/top-zigzag-bg.png);
    background-size: cover;
    height:100%;
    width:100%;
    min-height:470px;
    padding:40px;
`

export const RightColTitle = styled.span`
    text-transfrom:uppercase;
    font-weight:600;
    font-size:14px;
    color:#4c84ff;
    display:block;
    text-align:center;
    padding-top:15px;
`

export const RightColAmount = styled.span`
    font-weight:600;
    font-size:50px;
    display:block;
    text-align:center;
    padding-top:75px;
    font-family: "Open Sans";

`


export const RightColPrice = styled.span`
    font-weight:600;
    font-size:12px;
    display:block;
    text-align:center;
    color:#4c84ff;
    padding-top:8px;
`
export const DashedSeprator = styled.div`
    height:1px;
    background-image: url(/images/dahsed-line.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 70px;
    margin-bottom: 23px;
`

export const RightSpan = styled.span`
    font-weight:600;
    font-size:14px;
    display:block;
    color:rgba( 57, 65, 77, 0.702 );
    padding:10px;
`
export const LeftSpan = styled.span`
    font-weight:600;
    font-size:14px;
    display:block;
    color:#39414d;
    padding:10px;
`

export const RightTotal = styled.span`
    font-weight:600;
    font-size:14px;
    display:block;
    color:#4c84ff;
    padding:10px;
`
export const LeftTotal = styled.span`
    font-weight:600;
    font-size:14px;
    display:block;
    color:#4c84ff;
    padding:10px;
`

export const PayWith = styled.span`
    line-height: 2;
    font-weight: 600;
`


export const BankAcountDropdown = styled(Select)`
    & .ant-select-selection{
        border:none;
    }    
    & .ant-select-selection:focus{
        box-shadow: none;
        ouline:none;
    }
`