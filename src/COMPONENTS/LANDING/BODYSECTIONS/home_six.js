/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';

/* Components */
/* Styled-Components */
const ThirdRow = styled(Row)`
    padding-top: 50px;
    padding-bottom: 20px;
`
const ThirdWrap = styled.div`
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
const ThirdSpan = styled.span`
    font-size: 55px;
    font-family: "Open sans";
    color: #00a7ff;
    line-height: 0.625;
    @media (max-width: 767px) {
        font-size: 30px;
    }
`
const ThirdPTag = styled.p`
    font-size: 24px;
    font-family: "Open sans";
    color: rgb( 175, 216, 255 );
    line-height: 1.5;
    color:black;
    @media (max-width: 767px) {
        font-size: 16px;
    }
`
const ThirdTitle = styled(ThirdPTag)`
  color:#cbc9ca;
  font-size:20px;
  @media (max-width: 767px) {
    font-size: 13px;
}`

export default class HomeSix extends Component {
    render() {
        return (
            <ThirdWrap>
                <Container className="wow fadeIn" data-wow-duration="2s" data-wow-delay="500ms">
                    <ThirdRow>
                        <Row>
                            <BlueCol xs={8}>
                                <ThirdTitle>Accessible in</ThirdTitle>
                                <ThirdSpan>211</ThirdSpan>
                                <ThirdPTag>Countries</ThirdPTag>
                            </BlueCol>
                            <BlueCol xs={8}>
                                <ThirdTitle>Offering</ThirdTitle>
                                <ThirdSpan>73+</ThirdSpan>
                                <ThirdPTag>Coins & Tokens</ThirdPTag>
                            </BlueCol>
                            <BlueCol xs={8}>
                                <ThirdTitle>Always</ThirdTitle>
                                <ThirdSpan>0%</ThirdSpan>
                                <ThirdPTag>Maker Fees</ThirdPTag>
                            </BlueCol>
                        </Row>
                    </ThirdRow>
                </Container>
            </ThirdWrap>
        );
    }
}
