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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { globalVariables } from "../../../Globals";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// // am4core.useTheme(am4themes_animated);
let { SOCKET_HOST } = globalVariables;

let chart;
const Chart1wrap = styled.div`
  height: 90%;
`;
let io = null;

class DepthChartAm extends Component {
    constructor(props) {
        super(props);
        io = this.props.io;
        this.state = {
            crypto: this.props.crypto,
            currency: this.props.currency,
            loader: false,
            askData: [],
            bidData: [],
            zoom: 1
        };
        this.t = this.props.t;

    }
    componentDidMount() {
        chart = am4core.create("depthChartContainer", am4charts.XYChart);
        chart.dataSource.url = `${SOCKET_HOST}/api/v1/tradding/depth-chart-details?symbol=${this.props.crypto}-${this.props.currency}`;
        chart.dataSource.reloadFrequency = 10000;
        chart.dataSource.adapter.add("parsedData", function (data) {
            // Function to process (sort and calculate cummulative volume)
            function processData(list, type, desc) {

                // Convert to data points
                for (var i = 0; i < list.length; i++) {
                    list[i] = {
                        value: Number(list[i].price),
                        volume: Number(list[i].quantity),
                    }
                }

                // Sort list just in case
                list.sort(function (a, b) {
                    if (a.value > b.value) {
                        return 1;
                    }
                    else if (a.value < b.value) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                });

                // Calculate cummulative volume
                if (desc) {
                    for (var i = list.length - 1; i >= 0; i--) {
                        if (i < (list.length - 1)) {
                            list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
                        }
                        else {
                            list[i].totalvolume = list[i].volume;
                        }
                        let dp = {};
                        dp["value"] = list[i].value;
                        dp[type + "volume"] = list[i].volume;
                        dp[type + "totalvolume"] = list[i].totalvolume;
                        res.unshift(dp);
                    }
                }
                else {
                    for (var i = 0; i < list.length; i++) {
                        if (i > 0) {
                            list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
                        }
                        else {
                            list[i].totalvolume = list[i].volume;
                        }
                        let dp = {};
                        dp["value"] = list[i].value;
                        dp[type + "volume"] = list[i].volume;
                        dp[type + "totalvolume"] = list[i].totalvolume;
                        res.push(dp);
                    }
                }

            }

            // Init
            let res = [];
            processData(data.data.buyDetails, "bids", true);
            processData(data.data.sellDetails, "asks", false);

            return res;
        });
        // Set up precision for numbers
        chart.numberFormatter.numberFormat = "#,###.########";

        // Create axes
        let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = "value";
        //xAxis.renderer.grid.template.location = 0;
        xAxis.renderer.minGridDistance = 50;
        // xAxis.title.text = "Price (BTC/ETH)";

        let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // yAxis.title.text = "Volume";

        // Create series
        let series = chart.series.push(new am4charts.StepLineSeries());
        series.dataFields.categoryX = "value";
        series.dataFields.valueY = "bidstotalvolume";
        series.strokeWidth = 2;
        series.stroke = am4core.color("rgba(93, 193, 78, 1)");
        series.fill = series.stroke;
        series.fontSize = "5px"
        series.fillOpacity = 0.1;
        series.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{bidsvolume}[/]"

        let series2 = chart.series.push(new am4charts.StepLineSeries());
        series2.dataFields.categoryX = "value";
        series2.dataFields.valueY = "askstotalvolume";
        series2.strokeWidth = 2;
        series2.stroke = am4core.color("rgba(229, 90, 122, 1)");
        series2.fill = series2.stroke;
        series.fontSize = "5px"
        series2.fillOpacity = 0.1;
        series2.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{asksvolume}[/]"

        let series3 = chart.series.push(new am4charts.ColumnSeries());
        series3.dataFields.categoryX = "value";
        series3.dataFields.valueY = "bidsvolume";
        series3.strokeWidth = 0;
        series3.fill = am4core.color("#000");
        series3.fillOpacity = 0.2;

        let series4 = chart.series.push(new am4charts.ColumnSeries());
        series4.dataFields.categoryX = "value";
        series4.dataFields.valueY = "asksvolume";
        series4.strokeWidth = 0;
        series4.fill = am4core.color("#000");
        series4.fillOpacity = 0.2;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
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
                        currency: props.currency
                    },
                    () => {
                        chart.dataSource.url = `${SOCKET_HOST}/api/v1/tradding/depth-chart-details?symbol=${this.props.crypto}-${this.props.currency}`;
                        chart.dataSource.load();
                    }
                );
            }
        }
    }
    /* Life-Cycle Methods */
    render() {

        return (
            <WrapDepth>
                <Instru2 style={{ width: "calc(100% - 20px)" }}>
                    {this.t("market_depth_text.message")} {this.props.crypto}/
          {this.props.currency}
                </Instru2>
                <Row>
                    <Col xl={24} style={{ height: this.props.height }}>
                        <div id="depthChartContainer"></div>
                    </Col>
                </Row>
            </WrapDepth>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.simpleReducer.isLoggedIn
    };
}

export default translate(["trade"])(connect(mapStateToProps)(DepthChartAm));
