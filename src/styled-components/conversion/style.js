import styled from "styled-components";
import { Container } from "../homepage/style";
import { ConversionBackground } from "../../Constants/images";
import { Row, Col, Tabs } from "antd";
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
    box-shadow: 3px 0px 5px 0px rgb( 109, 109, 109 );
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