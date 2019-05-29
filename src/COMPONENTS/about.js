/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components'

/* Components */
/* Styled-Components */

const ThirdRow = styled(Row)`
    padding-top: 68px;
    padding-bottom: 50px;
`
const ThirdWrap = styled.div`
    background-color:#0f477b;
    text-align: center;
`
const BlueCol = styled(Col)`
    @media (max-width: 1200px) {
        margin-bottom:50px;
    }
`
const Thirdspan = styled.span`
    font-size: 48px;
    font-family: "Open sans";
    color: rgb( 255, 255, 255 );
    line-height: 0.625;  
`
const Thirdp = styled.p`
    font-size: 24px;
    font-family: "Open sans";
    color: rgb( 175, 216, 255 );
    line-height: 1.5; 
`

export default class About extends Component {
    render() {
        return (
            <ThirdWrap>
                <ThirdRow>
                    <Col span={18} offset={3}>
                        <Row>
                            <BlueCol xl={8}>
                                <Thirdspan>ABOUT US$150B+</Thirdspan>
                                <Thirdp>Digital currency exchanged</Thirdp>
                            </BlueCol>
                            <BlueCol xl={8}>
                                <Thirdspan>34</Thirdspan>
                                <Thirdp>Countries supported</Thirdp>
                            </BlueCol>
                            <BlueCol xl={8}>
                                <Thirdspan>80+</Thirdspan>
                                <Thirdp>Coins Supported</Thirdp>
                            </BlueCol>
                        </Row>
                    </Col>
                </ThirdRow>
            </ThirdWrap>
        );
    }
}