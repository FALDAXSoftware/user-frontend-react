/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Layout } from 'antd';

/* Components */
import { simpleAction } from '../../../Actions/Auth'
const { Footer } = Layout;

/* Styled-Components */
const Bottom_Footer = styled(Footer)`
    text-align: center;
    background-color: #ffffff;
    font-size : 13px;
    font-family: "Open sans";
`
const Footer_wrap = styled.div`
    bottom:0;
    width :100%;
`
const HR = styled.hr`
    margin-top: 30px;
    margin-bottom: 0px;
`

class CommonFooter extends Component {
    render() {
        var date = new Date();
        var Year = date.getFullYear();
        return (
            <Footer_wrap>
                <Bottom_Footer>
                    @{Year} FALDAX. All Rights Reserved.
                </Bottom_Footer>
            </Footer_wrap>
        );
    }
}
export default connect()(CommonFooter);
