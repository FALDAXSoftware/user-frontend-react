/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Layout } from 'antd';
const { Footer } = Layout;

/* Styled-Components */
const Bottom_Footer = styled(Footer)`
    text-align: center;
    background-color: #ffffff;
    font-size : 13pt;
    font-family: "Open sans";
`;

const HR = styled.hr`
    margin-top: 30px;
    margin-bottom: 0px;
`;

class CommonFooter extends Component {
    render() {
        return (
            <div>
                <HR />
                <Bottom_Footer>
                    @2013-2018 FALDAX. All Rights Reserved.
                </Bottom_Footer>
            </div>
        );
    }
}

export default CommonFooter;
