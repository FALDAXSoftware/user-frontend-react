import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Instru2, WrapDepth } from '../../../styled-components/loggedStyle/tradeStyle';
import { Line } from 'react-chartjs-2';
import { privateEncrypt } from 'crypto';

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
let io = null;
class DepthChart extends Component {
    constructor(props) {
        super(props);
        io = this.props.io;
        this.state = {
            crypto: "XRP",
            currency: "BTC",
            data: {
                type: 'scatter',
                datasets: [
                    {
                        lineTension: 0.1,
                        backgroundColor: '#dbeed9',
                        borderColor: 'rgba(93, 193, 78, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(93, 193, 78, 0.52)',
                        pointBackgroundColor: '#fff',
                        borderWidth: 1,
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(93, 193, 78, 0.52)',
                        pointHoverBorderColor: 'rgba(93, 193, 78, 0.52)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        lineTension: 0.1,
                        backgroundColor: '#fcd3de',
                        borderColor: 'rgba(229, 90, 122, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(229, 90, 122, 0.52)',
                        pointBackgroundColor: '#fff',
                        borderWidth: 1,
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(229, 90, 122, 0.52)',
                        pointHoverBorderColor: 'rgba(229, 90, 122, 0.52)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    }
                ]
            }
        };
        this.updateGraph = this.updateGraph.bind(this);
    }
    componentDidMount() {
        io.socket.get("/socket/get-depth-chart-data?room=" + this.state.crypto + "-" + this.state.currency, (body, JWR) => {


            if (body.status == 200) {
                let res = body.data;
                this.updateGraph(res);
            }
        });
    }
    updateGraph(data) {
        console.log(data);
        var self = this;
        var askData = [];
        var bidData = [];
        for (let index = 0; index < data.buyDetails.length; index++) {
            const element = data.buyDetails[index];
            bidData.push({
                x: element.price,
                y: element.quantity
            });

        }
        for (let index = 0; index < data.sellDetails.length; index++) {
            const element = data.sellDetails[index];
            askData.push({
                x: element.price,
                y: element.quantity
            });
        }
        var askDepthTotal = 0;
        var bidDepthTotal = 0;
        for (var i = 0; i < askData.length; i++) {
            askDepthTotal += askData[i]["y"];
            askData[i]["y"] = askDepthTotal;
            askData[i]["label"] = self.state.crypto + "/" + self.state.currency;
        }

        for (var i = 0; i < bidData.length; i++) {
            bidDepthTotal += bidData[i]["y"];
            bidData[i]["y"] = bidDepthTotal;
            bidData[i]["label"] = self.state.crypto + "/" + self.state.currency;
        }

        let graphData = this.state.data
        graphData.datasets[0][data] = bidData;
        graphData.datasets[1][data] = askData;
        console.log("-=-=-=-=-=-", askData);

        this.setState({
            data: graphData
        }, () => {
            console.log(self.refs.chart.chartInstance);
            self.refs.chart.chartInstance.data.datasets[0].data = bidData;
            self.refs.chart.chartInstance.data.datasets[1].data = askData;
            self.refs.chart.chartInstance.update();
        });
    }
    render() {
        var self = this;
        return (
            <WrapDepth>
                <Instru2>Market Depth BBC/BTC</Instru2>
                <Row>
                    <Col xl={24}>
                        <Chart1_wrap id="depth-chart1">
                            <Line data={this.state.data} options={{
                                elements: {
                                    line: {
                                        tension: 0, // disables bezier curves
                                    }
                                }, tooltips: {
                                    backgroundColor: "#fff",
                                    borderColor: "#1C2331",
                                    borderWidth: 1,
                                    titleFontColor: "#1C2331",
                                    displayColors: false,
                                    callbacks: {
                                        title: function (tooltipItem) {
                                            // console.log();

                                            return self.state.data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].label;
                                        },
                                        // afterBody: function (tooltipItem) {
                                        //     var multistringText = ["Price - " + Number(tooltipItem.xLabel)];
                                        //     // do some stuff
                                        //     multistringText.push("Volume - " + Number(tooltipItem.yLabel));

                                        //     return multistringText;
                                        // },
                                        label: function (tooltipItem) {
                                            return ["Price - " + Number(tooltipItem.xLabel), "Volume - " + Number(tooltipItem.yLabel)];
                                        },
                                        labelTextColor: function (tooltipItem, chart) {
                                            return 'gray';
                                        }
                                    }
                                }, legend: null, scales: {
                                    xAxes: [{
                                        display: true, type: 'linear', position: 'bottom', gridLines: {
                                            display: false,
                                            color: "#FFFFFF",
                                        }
                                    }]
                                }
                            }} height={300} ref="chart" />
                        </Chart1_wrap>
                    </Col>
                </Row>
            </WrapDepth>
        )
    }
}

export default DepthChart;
