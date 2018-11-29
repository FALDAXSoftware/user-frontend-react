/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Layout } from 'antd';

/* Components */
const { Footer } = Layout;

/* Styled-Components */
const Bottom_Footer = styled(Footer)`
    text-align: center;
    background-color:${props => props.theme.mode=="dark" ? "#041422" :"#ffffff"};
    color:${props => props.theme.mode=="dark" ? "white" : "" };
    font-size : 13px;
    font-family: "Open sans";
`
const Footer_wrap = styled.div`
    bottom:0;
    width :100%;
`
class CommonFooter extends Component {
    render() {
        return (
            <Footer_wrap>
                <Bottom_Footer>
                    @{new Date().getFullYear()} FALDAX. All Rights Reserved.
                </Bottom_Footer>
            </Footer_wrap>
        );
    }
}

export default connect()(CommonFooter);
