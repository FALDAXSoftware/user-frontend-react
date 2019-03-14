import React, { Component } from 'react';
import { connect } from "react-redux";

import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Instru2, WrapDepth } from '../../../styled-components/loggedStyle/tradeStyle';
import { Line } from 'react-chartjs-2';

const Chart1_wrap = styled.div`
    height:90%;
  `
let io = null;

class DepthChart extends Component {
    constructor(props) {
        super(props);
        io = this.props.io;
        this.state = {
            crypto: "XRP",
            currency: "BTC",
            loader: false,
            askData: [],
            bidData: [],
        };
        this.updateGraph = this.updateGraph.bind(this);
    }

    componentDidMount() {
        console.log("DEPTH DID MOUNT")
        this.props.depthLoaderFunc(true);
        let URL = "/socket/get-depth-chart-data?room=" + this.state.crypto + "-" + this.state.currency
        io.socket.request({
            method: 'GET',
            url: URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }, (body, JWR) => {
            if (body.status == 200) {
                let res = body.data;
                this.updateGraph(res);
            }
        });
    }

    updateGraph(data) {
        var self = this;
        let askData = [];
        let bidData = [];
        for (let index = 0; index < data.buyDetails.length; index++) {
            let element = data.buyDetails[index];
            bidData.push({
                x: element.price,
                y: element.quantity
            });
        }
        for (let sellIndex = 0; sellIndex < data.sellDetails.length; sellIndex++) {
            let element = data.sellDetails[sellIndex];
            askData.push({
                x: element.price,
                y: element.quantity
            });
        }
        let askDepthTotal = 0;
        let bidDepthTotal = 0;
        let askDataArray = [];
        let bidDataArray = [];
        for (let i = 0; i < askData.length; i++) {
            askDepthTotal += askData[i]["y"];
            askDataArray.push({
                x: askData[i]["x"],
                y: askDepthTotal,
            });
        }

        for (let j = 0; j < bidData.length; j++) {
            bidDepthTotal += bidData[j]["y"];
            bidDataArray.push({
                x: bidData[j]["x"],
                y: bidDepthTotal,
            });
        }

        self.setState({
            bidData: bidDataArray,
            askData: askDataArray
        }, () => {
            self.forceUpdate();
            self.refs.chart.chartInstance.update();
        });

        this.props.depthLoaderFunc(false);
    }
    render() {
        var self = this;
        console.log("------------", this.props.height);

        let graphData = {
            type: 'line',
            datasets: [{
                label: "Bid",
                backgroundColor: '#dbeed9',
                borderColor: 'rgba(93, 193, 78, 1)',
                borderJoinStyle: 'miter',
                borderCapStyle: 'butt',
                borderWidth: 1,
                data: [...self.state.bidData]
            }, {
                label: "Ask",
                backgroundColor: '#fcd3de',
                borderColor: 'rgba(229, 90, 122, 1)',
                borderJoinStyle: 'miter',
                borderCapStyle: 'butt',
                borderWidth: 1,
                data: [...this.state.askData]
            }]
        }

        return (
            <WrapDepth>
                <Instru2>Market Depth BBC/BTC</Instru2>
                <Row>
                    <Col xl={24}>
                        <Chart1_wrap id="depth-chart1">
                            <Line height={this.props.height} data={graphData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                legend: {
                                    display: false
                                },
                                scales: {
                                    xAxes: [{
                                        display: true, type: 'linear', position: 'bottom', gridLines: {
                                            display: false,
                                            color: "#FFFFFF",
                                        }
                                    }]
                                }
                            }} ref="chart" />
                        </Chart1_wrap>
                    </Col>
                </Row>
            </WrapDepth>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
    })
}

export default connect(mapStateToProps)(DepthChart);
