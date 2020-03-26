/* In-build packages */
import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { globalVariables } from "../Globals.js";
import NumberFormat from "react-number-format";
const moment = require("moment");
let { _AMAZONBUCKET } = globalVariables;
const SOCKET_HOST = globalVariables.SOCKET_HOST;
/* Styled componets */
const GraphWrapper = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "#fff"};
  padding: 12.5px;
  width: 100%;
`;

const ImageWrapper = styled.img`
  width: 25px;
  height: 25px;
  background-color: ${props => (props.theme.mode === "dark" ? "#041b2c" : "")};
`;

const SpanCoinName = styled.span`
  font-size: 16px;
  font-family: "Open sans";
  color: ${props =>
    props.theme.mode === "dark" ? "#617090" : "rgba( 0, 0, 0, 0.231 )"};
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
  font-family: "Open sans";
  color: ${props => (props.theme.mode === "dark" ? "white" : "rgb( 0, 0, 0 )")};
  font-weight: bold;
  line-height: 1.1;
  text-align: left;
  line-height: 25px;
`;

const SpanCoinPercentage = styled.span`
    font-size: 14px;
    font-family: "Open sans";
    color: ${props =>
      props.value === 0
        ? props => (props.theme.mode === "dark" ? "white" : "black")
        : props.value <= 0
        ? "red"
        : "#34a539"}
    line-height: 1.286;
    text-align: left;
    line-height: 25px;
`;
let io = null;
class Mini_graph extends React.Component {
  constructor(props) {
    super(props);
    io = this.props.io;
    this.timeout = null;
    this.state = {
      crypto: this.props.crypto,
      currency: this.props.currency,
      data: {
        image: "coin/defualt_coin.png",
        coinName: this.props.crypto + "/" + this.props.currency,
        price: 0,
        percentage: 0,
        type: "line",
        timeStamps: [],
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            fill: false,
            bezierCurve: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: this.props.lineColor,
            borderCapStyle: "butt",
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: this.props.lineColor,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: this.props.lineColor,
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
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
    clearTimeout(this.timeout);
    var self = this;
    if (this.props.crypto !== undefined && this.props.currency !== undefined) {
      this.setState(
        { crypto: this.props.crypto, currency: this.props.currency },
        () => {
          // self.timeout = setTimeout(self.miniGraph(), 1000);
          self.miniGraph();
        }
      );
    }
    // self.timeout = setTimeout(self.miniGraph(), 1000);
  }
  miniGraph() {
    fetch(
      SOCKET_HOST +
        `/api/v1/tradding/get-chart-data-graph?symbol=${this.props.crypto}-${this.props.currency}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          // console.log("here", responseData.data);
          this.updateGraph(responseData.data);
        } else {
        }
        // this.setState({ loader: false });
      })
      .catch(error => {
        console.log(error);
      });
    // var self = this;
    // let URL =
    //   "/socket/get-card-data?room=" +
    //   this.state.crypto +
    //   "-" +
    //   this.state.currency;
    // io.socket.request(
    //   {
    //     method: "GET",
    //     url: URL,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + this.props.isLoggedIn
    //     }
    //   },
    //   (body, JWR) => {
    //     // console.log("card body", body);
    //     if (body.status === 200) {
    //       let res = body.data;
    //       this.updateGraph(res);
    //     }
    //   }
    // );
    // io.socket.on("cardDataUpdate", function(data) {
    //   self.updateGraph(data);
    // });
  }
  componentWillReceiveProps(props, newProps) {
    /* var self = this;
        if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
            if (props.cryptoPair.crypto !== this.state.crypto) {
                this.setState({ crypto: props.cryptoPair.crypto }, () => {
                    self.miniGraph();
                })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                this.setState({ currency: props.cryptoPair.currency }, () => {
                    self.miniGraph();
                })
            }
        } */
  }
  updateGraph(data) {
    var self = this;
    let dataArray = [];
    let timeStampArray = [];
    // console.log("^^^", data);
    data = data[0];
    data.tradeChartDetails.map(element => {
      dataArray.push(element.fill_price);
      timeStampArray.push(moment.utc(element.created_at).unix());
    });
    // console.log("^^^dataArray", dataArray);
    let graphOptions = this.state.data;
    // graphOptions.image =
    //   !this.coin_icon || this.coin_icon === "" || this.coin_icon === null
    //     ? "coin/defualt_coin.png"
    //     : data.icon;
    graphOptions.image = data.icon;
    graphOptions.datasets[0].data = dataArray;
    graphOptions.timeStamps = timeStampArray;
    graphOptions.price = Number(data.average_price);
    graphOptions.percentage = data.percentchange;

    this.setState(
      {
        data: graphOptions
      },
      () => {
        // self.refs.chart.chartInstance.data.datasets[0].data = dataArray;
        // self.refs.chart.chartInstance.update();
        self.forceUpdate();
        self.refs.chart.chartInstance.update();
      }
    );
  }
  render() {
    let graphData = {
      type: "line",
      labels: [...this.state.data.timeStamps],
      datasets: [
        {
          fill: false,
          // bezierCurve: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: this.props.lineColor,
          borderCapStyle: "butt",
          borderWidth: 1,
          borderDashOffset: 0.0,
          pointBorderColor: this.props.lineColor,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 1,
          pointHoverBackgroundColor: this.props.lineColor,
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 1,
          data: [...this.state.data.datasets[0].data]
        }
      ]
    };

    const { coinName, image, price, percentage } = this.state.data;
    return (
      <GraphWrapper className="9292">
        <Row>
          <SpanCoinNameWrapper>
            <Col xs={19} offset={5}>
              <SpanCoinName> {coinName} </SpanCoinName>
            </Col>
          </SpanCoinNameWrapper>
        </Row>
        <Row>
          <Col xs={5}>{/* <ImageWrapper src={_AMAZONBUCKET + image} /> */}</Col>
          <Col xs={11} md={12}>
            <SpanCoinPrice>
              {" "}
              {price.toFixed(5)} {this.props.currency}{" "}
            </SpanCoinPrice>
          </Col>
          <Col xs={8} md={7}>
            <SpanCoinPercentage value={percentage}>
              {" "}
              {percentage === 0 ? "" : percentage >= 0 ? "+" : ""}
              {Math.abs(percentage.toFixed(5))}%{" "}
            </SpanCoinPercentage>
          </Col>
        </Row>
        <Row
        // style={{ paddingTop: "10px" }}
        >
          <Col span={24}>
            <Line
              data={graphData}
              options={{
                tooltips: {
                  enabled: false
                },
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [
                    {
                      display: false,
                      scaleLabel: {
                        display: false
                      }
                    }
                  ],
                  yAxes: [
                    {
                      display: false,
                      scaleLabel: {
                        display: false
                      }
                    }
                  ]
                }
              }}
              height={100}
              redraw={true}
              ref="chart"
            />
          </Col>
        </Row>
      </GraphWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    cryptoPair:
      state.walletReducer.cryptoPair !== undefined
        ? state.walletReducer.cryptoPair
        : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(Mini_graph);
