import React from "react";
import { Col, Row, Select } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import Technical from "../../tv_widgets/technical";
import { log } from "d3-geo/src/math";

const SpanCoinName = styled.span`
  font-size: 16px;
  font-family: "Open sans";
  color: ${props =>
    props.theme.mode === "dark" ? "#617090" : "rgba( 0, 0, 0, 0.231 )"};
  font-weight: bold;
  line-height: 1.125;
  text-align: left;
`;
const CustomSelect = styled(Select)`
  width: 120px;
  .ant-select-selection {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041b2c" : "white"};
    font-size: 16px;
    font-family: "Open sans";
    color: ${props =>
      props.theme.mode === "dark"
        ? "#617090 !important"
        : "rgba( 0, 0, 0, 0.231 )"};
    font-weight: bold;
    line-height: 1.125;
    text-align: left;
    border: none;
    outline: none !important;
    box-shadow: none;
    .ant-select-arrow {
      color: ${props =>
        props.theme.mode === "dark"
          ? "#617090 !important"
          : "rgba( 0, 0, 0, 0.231 )"};
    }
  }
`;
class TechnicalChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPair: this.props.defaultPair,
      showWidget: true
    };
  }
  onChange = value => {
    this.setState(
      {
        selectedPair: value,
        showWidget: false
      },
      () => {
        this.setState({
          showWidget: true
        });
      }
    );
  };
  render() {
    return (
      <div style={{ width: "100%", padding: "12.5px" }}>
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            {/*<SpanCoinName>XRPBTC</SpanCoinName>*/}
            <CustomSelect
              value={this.state.selectedPair}
              onChange={this.onChange}
            >
              {this.props.pairs.map(el => (
                <Select.Option value={el.name.split("-").join("")}>
                  {el.name}
                </Select.Option>
              ))}
            </CustomSelect>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ height: "401px" }}>
            {this.state.showWidget && (
              <Technical
                options={{
                  interval: "1m",
                  width: "100%",
                  isTransparent: true,
                  height: "100%",
                  symbol: `BINANCE:${this.state.selectedPair}`,
                  showIntervalTabs: true,
                  locale: localStorage["i18nextLng"],
                  colorTheme: this.props.theme ? "dark" : "light",
                  largeChartUrl: "https://faldax.com"
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default connect(mapStateToProps)(TechnicalChart);
