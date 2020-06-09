/*Built-in Packages*/
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Row, Col, Button, Icon } from "antd";
import "antd/dist/antd.css";
import { Line } from "react-chartjs-2";
import { translate } from "react-i18next";

/*STYLED-COMPONENTS*/
import { Instru2, WrapDepth } from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

const Chart1wrap = styled.div`
  height: 90%;
`;
let io = null;

class DepthChart extends Component {
  constructor(props) {
    super(props);
    io = this.props.io;
    this.state = {
      crypto: this.props.crypto,
      currency: this.props.currency,
      loader: false,
      askData: [],
      bidData: [],
      zoom: 1,
    };
    this.t = this.props.t;
    this.updateGraph = this.updateGraph.bind(this);
    this.depthFunc = this.depthFunc.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    if (this.props.io) {
      this.props.io.on("depth-chart-data", (data) => {
        this.updateGraph(data);
      });
    }
    // this.depthFunc();
  }

  componentWillReceiveProps(props, neProps) {
    var self = this;
    if (props.crypto !== undefined && props.currency !== undefined) {
      if (
        props.crypto !== this.state.crypto ||
        props.currency !== this.state.currency
      ) {
        this.setState(
          {
            crypto: props.crypto,
            currency: props.currency,
          },
          () => {
            // self.depthFunc();
          }
        );
      }
    }
  }

  /* 
        Page: /trade --> Depth Chart
        SOCKET of depth chart is called in this method .
    */

  depthFunc() {
    let self = this;
    self.props.depthLoaderFunc(true);
    let URL =
      "/socket/get-depth-chart-data?room=" +
      self.state.crypto +
      "-" +
      self.state.currency;
    // io.socket.request({
    //     method: 'GET',
    //     url: URL,
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: "Bearer " + self.props.isLoggedIn
    //     }
    // }, (body, JWR) => {
    //     if (body.status === 200) {
    //         let res = body.data;
    //         self.updateGraph(res);
    //     }
    // });
    // io.socket.on('depthChartUpdate', (data) => {
    //     self.updateGraph(data)
    // });
  }
  updateGraph(data) {
    var self = this;
    let askData = [];
    let bidData = [];
    for (let index = 0; index < data.buyDetails.length; index++) {
      let element = data.buyDetails[index];
      bidData.push({
        x: element.price,
        y: element.quantity,
      });
    }
    for (let sellIndex = 0; sellIndex < data.sellDetails.length; sellIndex++) {
      let element = data.sellDetails[sellIndex];
      askData.push({
        x: element.price,
        y: element.quantity,
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

    self.setState(
      {
        bidData: bidDataArray,
        askData: askDataArray,
      },
      () => {
        self.forceUpdate();
        self.refs.chart.chartInstance.update();
      }
    );

    this.props.depthLoaderFunc(false);
  }
  zoomIn = () => {
    let zoom = this.state.zoom;
    if (zoom <= 4) {
      this.setState({
        zoom: zoom + 1,
      });
    }
  };
  zoomOut = () => {
    let zoom = this.state.zoom;
    if (zoom > 1) {
      this.setState({
        zoom: zoom - 1,
      });
    }
  };
  render() {
    var self = this;
    let bidData = [...self.state.bidData];
    let askData = [...self.state.askData];
    console.log(bidData, askData, self.state.zoom);
    let ask_lenght = Math.ceil(askData.length / self.state.zoom);
    let bid_length = Math.ceil(bidData.length / self.state.zoom);
    if (self.state.zoom > 1) {
      let min_length = Math.min(ask_lenght, bid_length);
      ask_lenght = min_length;
      bid_length = min_length;
    }
    bidData = bidData.slice(0, bid_length);
    askData = askData.slice(0, ask_lenght);
    console.log(bidData, askData);

    let graphData = {
      type: "line",
      datasets: [
        {
          label: `${this.t("bid_text.message")}`,
          backgroundColor: "#dbeed9",
          borderColor: "rgba(93, 193, 78, 1)",
          borderJoinStyle: "miter",
          borderCapStyle: "butt",
          borderWidth: 1,
          lineTension: 0,
          pointHitRadius: 2,
          steppedLine: true,
          pointRadius: 0.2,
          data: [...bidData],
        },
        {
          label: `${this.t("ask_text.message")}`,
          backgroundColor: "#fcd3de",
          borderColor: "rgba(229, 90, 122, 1)",
          borderJoinStyle: "miter",
          borderCapStyle: "butt",
          borderWidth: 1,
          lineTension: 0,
          pointHitRadius: 2,
          pointRadius: 0.2,
          steppedLine: true,
          data: [...askData],
        },
      ],
    };

    return (
      <WrapDepth>
        <Instru2 style={{ width: "calc(100% - 20px)" }}>
          {this.t("market_depth_text.message")} {this.props.crypto}/
          {this.props.currency}
          <div className="controlls">
            <Button size="small" type="primary" onClick={this.zoomIn}>
              <Icon type="plus" />
            </Button>
            <Button size="small" type="primary" onClick={this.zoomOut}>
              <Icon type="minus" />
            </Button>
          </div>
        </Instru2>
        <Row>
          <Col xl={24}>
            <Chart1wrap id="depth-chart1">
              <Line
                height={this.props.height}
                data={graphData}
                options={{
                  animation: false,
                  responsive: true,
                  maintainAspectRatio: false,
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        type: "linear",
                        position: "bottom",
                        gridLines: {
                          display: false,
                          color: "#FFFFFF",
                        },
                      },
                    ],
                  },
                }}
                ref="chart"
              />
            </Chart1wrap>
          </Col>
        </Row>
      </WrapDepth>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
  };
}

export default translate(["trade"])(connect(mapStateToProps)(DepthChart));
