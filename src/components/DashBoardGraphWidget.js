/* In-build packages */
import React from 'react';
import { Row, Col } from 'antd';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

/* Styled componets */
const GraphWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 12.5px;
  width: 100%;
`;

const ImageWrapper = styled.img`
    width: 25px;
    height: 25px;
`;

const SpanCoinName = styled.span`
    font-size: 16px;
    font-family: "OpenSans";
    color: rgba( 0, 0, 0, 0.231 );
    font-weight: bold;
    line-height: 1.125;
    text-align: left;
`;

const SpanCoinNameWrapper = styled.div`
    margin-bottom: 10px;
    overflow: hidden;
`;

const SpanCoinPrice = styled.span`
    font-size: 20px;
    font-family: "OpenSans";
    color: rgb( 0, 0, 0 );
    font-weight: bold;
    line-height: 1.1;
    text-align: left;
    line-height: 25px;
`;

const SpanCoinPercentage = styled.span`
    font-size: 14px;
    font-family: "OpenSans";
    color: ${props => props.value===0 ? 'black' : props.value<=0 ? 'red' : '#34a539'}
    line-height: 1.286;
    text-align: left;
    line-height: 25px;
`;

/* Component defination start here */
const DashBoardGraphWidget = ({data}) => {
    const { coinName, image, price, percentage } = data;
    return (
        <GraphWrapper>
            <Row>
                <SpanCoinNameWrapper>
                    <Col xs={19} offset={5}>
                        <SpanCoinName> {coinName} </SpanCoinName>
                    </Col>
                </SpanCoinNameWrapper>
            </Row>
            <Row>
                <Col xs={5}>
                    <ImageWrapper src={image}/>
                </Col>
                <Col xs={11} md={12}>
                    <SpanCoinPrice> ${price} </SpanCoinPrice>
                </Col>
                <Col xs={8} md={7}>
                    <SpanCoinPercentage value={percentage}> {percentage===0 ? '' : percentage>=0 ? '+' : ''}{percentage}% </SpanCoinPercentage>
                </Col>
            </Row>
            <Row>
                <Col sm={24}>
                    <Line data={data} options={{ legend: null, scales:{ xAxes: [{ display: false }], yAxes: [{ display: false }] }}} height={108}/>
                </Col>
            </Row>
        </GraphWrapper>
    );
    
}

export default DashBoardGraphWidget;