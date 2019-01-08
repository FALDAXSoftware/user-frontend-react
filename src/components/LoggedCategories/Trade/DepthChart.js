import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Instru2, WrapDepth } from '../../../styled-components/loggedStyle/tradeStyle';
import {Line} from 'react-chartjs-2';
const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        lineTension: 0.1,
        backgroundColor: '#dbeed9',
        borderColor: '#5fc14f',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#5fc14f',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#5fc14f',
        pointHoverBorderColor: '#5fc14f',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        lineTension: 0.1,
        backgroundColor: '#fcd3de',
        borderColor: '#e55a7a',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#e55a7a',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#e55a7a',
        pointHoverBorderColor: '#e55a7a',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  const Chart2_wrap = styled.div`
    transform : rotateY(180deg);
    height:400px;
    
  `
  const Line2= styled(Line)`
  
  `
  const Chart1_wrap = styled.div`
    height:400px
  `
  const Line1= styled(Line)`

  `
class DepthChart extends Component {
    render() {
        return (
            <WrapDepth>
                <Instru2>Market Depth BBC/BTC</Instru2>
                <Row>
                    <Col xl={12}>
                        <Chart1_wrap id="depth-chart1">
                            <Line1 data={data1} options={{ legend: null,scales: { xAxes: [{ display: false }] } }} height={300}/>
                        </Chart1_wrap>
                    </Col>
                    <Col xl={12}>
                        <Chart2_wrap id="depth-chart2">
                            <Line2 data={data2} options={{ legend: null,scales: { xAxes: [{ display: false }] } }} height={300}/>
                        </Chart2_wrap>
                    </Col>
                </Row>
            </WrapDepth>
        )
    }
}

export default DepthChart;
