/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components'
import { Container } from '../../../styled-components/homepage/style';

/* Components */
/* Styled-Components */

const Third_Row = styled(Row)`
    padding-top: 50px;
    padding-bottom: 20px;
`
const Third_Wrap = styled.div`
    background-color:#f7f5f5;
`
const BlueCol = styled(Col)`
    text-align:center;
    @media (max-width: 1200px) {
        margin-bottom:30px;
    }

    @media (max-width: 480px) {
        width:100%;
    }

`
const Third_span = styled.span`
    font-size: 55px;
    font-family: "Open sans";
    color: #00a7ff;
    line-height: 0.625;
    @media (max-width: 767px) {
        font-size: 30px;
    }
`
const Third_p = styled.p`
    font-size: 24px;
    font-family: "Open sans";
    color: rgb( 175, 216, 255 );
    line-height: 1.5;
    color:black;
    @media (max-width: 767px) {
        font-size: 16px;
    }
`
const Third_title = styled(Third_p)`
  color:#cbc9ca;
  font-size:20px;
  @media (max-width: 767px) {
    font-size: 13px;
}`

export default class Homethird extends Component {
    render() {
        return (
            <Third_Wrap>
                <Container className="wow fadeIn" data-wow-duration="2s" data-wow-delay="500ms">
                    <Third_Row>
                        <Row>
                            <BlueCol xs={8}>
                                <Third_title>Service Available in</Third_title>
                                <Third_span>211</Third_span>
                                <Third_p>Countries</Third_p>
                            </BlueCol>
                            <BlueCol xs={8}>
                                <Third_title>Support For</Third_title>
                                <Third_span>73+</Third_span>
                                <Third_p>Coins & Tokens</Third_p>
                            </BlueCol>
                            <BlueCol xs={8}>
                                <Third_title>Always</Third_title>
                                <Third_span>0%</Third_span>
                                <Third_p>Maker's Fee</Third_p>
                            </BlueCol>
                        </Row>
                    </Third_Row>
                </Container>
            </Third_Wrap>
        );
    }
}
