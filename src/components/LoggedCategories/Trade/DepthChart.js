import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Instru2, WrapDepth } from '../../../styled-components/loggedStyle/tradeStyle';
import { Line } from 'react-chartjs-2';
var askDepthTotal = 0;
var bidDepthTotal = 0;
var askData = [{
    x: 0.03488199,
    y: 0.01973404
},
{
    x: 0.034882,
    y: 1.29036632
},
{
    x: 0.03491599,
    y: 0.78322948
}];
var bidData = [{
    x: 0.03488111,
    y: 0.2331816
},
{
    x: 0.03484626,
    y: 0.18811583
},
{
    x: 0.03473547,
    y: 1.832
}];
for (var i = 0; i < askData.length; i++) {
    askDepthTotal += askData[i]["y"];
    askData[i]["y"] = askDepthTotal;
}

for (var i = 0; i < bidData.length; i++) {
    bidDepthTotal += bidData[i]["y"];
    bidData[i]["y"] = bidDepthTotal;
}
console.log("askdata", askData);
console.log("bidData", bidData);

const data1 = {
    type: 'scatter',
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            lineTension: 0.1,
            backgroundColor: '#dbeed9',
            borderColor: 'rgba(93, 193, 78, 0.52)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(93, 193, 78, 0.52)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(93, 193, 78, 0.52)',
            pointHoverBorderColor: 'rgba(93, 193, 78, 0.52)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: bidData
        },
        {
            lineTension: 0.1,
            backgroundColor: '#fcd3de',
            borderColor: 'rgba(229, 90, 122, 0.52)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(229, 90, 122, 0.52)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(229, 90, 122, 0.52)',
            pointHoverBorderColor: 'rgba(229, 90, 122, 0.52)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: askData
        }
    ]
};
// const data2 = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//         {
//             lineTension: 0.1,
//             backgroundColor: '#fcd3de',
//             borderColor: '#e55a7a',
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: '#e55a7a',
//             pointBackgroundColor: '#fff',
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: '#e55a7a',
//             pointHoverBorderColor: '#e55a7a',
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: [65, 59, 80, 81, 56, 55, 40]
//         }
//     ]
// };
const Chart2_wrap = styled.div`
    transform : rotateY(180deg);
    height:400px;
    
  `
const Line2 = styled(Line)`
  
  `
const Chart1_wrap = styled.div`
    height:400px
  `
const Line1 = styled(Line)`

  `
class DepthChart extends Component {
    render() {
        return (
            <WrapDepth>
                <Instru2>Market Depth BBC/BTC</Instru2>
                <Row>
                    <Col xl={24}>
                        <Chart1_wrap id="depth-chart1">
                            <Line1 data={data1} options={{
                                elements: {
                                    line: {
                                        tension: 0, // disables bezier curves
                                    }
                                }, legend: null, scales: { xAxes: [{ display: false, type: 'linear', position: 'bottom' }] }
                            }} height={300} />
                        </Chart1_wrap>
                    </Col>
                    {/* <Col xl={12}>
                        <Chart2_wrap id="depth-chart2">
                            <Line2 data={data2} options={{ legend: null, scales: { xAxes: [{ display: false }] } }} height={300} />
                        </Chart2_wrap>
                    </Col> */}
                </Row>
            </WrapDepth>
        )
    }
}

export default DepthChart;
