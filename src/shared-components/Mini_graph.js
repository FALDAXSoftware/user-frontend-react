/* In-build packages */
import React from 'react';
import { Row, Col } from 'antd';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

/* Styled componets */
const Graph_wrapper = styled.div`
  background-color: ${props => props.theme.mode=="dark"?"#041b2c":"#fff"};
  padding: 12.5px;
  width: 100%;
`;

const Image_wrapper = styled.img`
    width: 25px;
    height: 25px;
    background-color:${props => props.theme.mode=="dark"?"#041b2c":""};
`;

const Span_coin_name = styled.span`
    font-size: 16px;
    font-family: "Open sans";
    color: ${props=>props.theme.mode=="dark"?"#617090":"rgba( 0, 0, 0, 0.231 )"};
    font-weight: bold;
    line-height: 1.125;
    text-align: left;
`;

const Span_coin_name_wrapper = styled.div`
    margin-bottom: 10px;
    overflow: hidden;
`;

const Span_coin_price = styled.span`
    font-size: 20px;
    font-family: "Open sans";
    color: ${props => props.theme.mode=="dark"?"white":"rgb( 0, 0, 0 )"};
    font-weight: bold;
    line-height: 1.1;
    text-align: left;
    line-height: 25px;
`;

const Span_coin_percentage = styled.span`
    font-size: 14px;
    font-family: "Open sans";
    color: ${props => props.value===0 ? 'black' : props.value<=0 ? 'red' : '#34a539'}
    line-height: 1.286;
    text-align: left;
    line-height: 25px;
`;

/* Component defination start here */
const Mini_graph = ({data}) => {
    const { coinName, image, price, percentage } = data;
    return (
        <Graph_wrapper className="9292">
        {
                                        console.log("ABCDF")}
            <Row>
                <Span_coin_name_wrapper>
                    <Col xs={19} offset={5}>
                        <Span_coin_name> {coinName} </Span_coin_name>
                    </Col>
                </Span_coin_name_wrapper>
            </Row>
            <Row>
                <Col xs={5}>
                    <Image_wrapper src={image}/>
                </Col>
                <Col xs={11} md={12}>
                    <Span_coin_price> ${price} </Span_coin_price>
                </Col>
                <Col xs={8} md={7}>
                    <Span_coin_percentage value={percentage}> {percentage===0 ? '' : percentage>=0 ? '+' : ''}{percentage}% </Span_coin_percentage>
                </Col>
            </Row>
            <Row>
                <Col sm={24}>
                    <Line data={data} options={{ legend: null, scales:{ xAxes: [{ display: false }], yAxes: [{ display: false }] }}} height={108}/>
                </Col>
            </Row>
        </Graph_wrapper>
    );
    
}

export default Mini_graph;