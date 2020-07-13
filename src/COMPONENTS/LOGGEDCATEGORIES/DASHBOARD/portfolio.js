import React, { Component } from "react";
import { globalVariables } from "../../../Globals";
import { connect } from "react-redux";
import {
  Topic,
  HighLow,
  LeftHl,
  RightHl,
  ActDiv,
  PortTable,
  SpinSingle,
} from "../../../STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import { Spin, Icon } from "antd";
import { translate } from "react-i18next";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: [],
      total: 0,
      diffrence: 0,
      userFiat: "USD",
      portfolioLoader: false,
    };
    this.t = this.props.t;
  }
  componentDidMount() {
    this.loadPortfolio();
  }
  loadPortfolio = () => {
    var self = this;
    self.setState({ portfolioLoader: true });
    fetch(`${globalVariables.SOCKET_HOST}/api/v1/tradding/get-portfolio-data`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        let portfolioData = [];
        if (responseData.status === 200) {
          // console.log("^^^^portfolioData", responseData.data);
          let userFiat = responseData.data.fiat;
          responseData.data.portfolioData.map((element) => {
            portfolioData.push({
              coin: element.name,
              amount: precision(element.Amount) + " " + element.symbol,
              value: precision(element.average_price) + " " + userFiat,
              change: element.percentchange
                ? precisionTwo(element.percentchange) + "%"
                : "0 %",
            });
          });
          self.setState({
            total: responseData.data.total,
            diffrence: responseData.data.diffrence,
            userFiat: userFiat,
            portfolioData: portfolioData,
            portfolioLoader: false,
          });
        }
      })
      .catch((error) => {
        /* console.log(error) */
      });
  };
  render() {
    const portfolioColumn = [
      {
        title: this.t("settings:table_head_coin.message"),
        dataIndex: "coin",
        key: "coin",
        className: "coin",
      },
      {
        title: this.t("wallet:amount_text.message"),
        dataIndex: "amount",
        key: "amount",
        className: "amount",
      },
      {
        title: this.t("wallet:value_text.message"),
        dataIndex: "value",
        key: "value",
        className: "value",
      },
      {
        title: this.t("trade:change_text.message"),
        key: "change",
        dataIndex: "change",
        className: "change",
        render: (change) => (
          <>
            {parseFloat(change) <= 0 ? (
              <p className="red">{Math.abs(parseFloat(change))}%</p>
            ) : (
              <p className="green">{Math.abs(parseFloat(change))}%</p>
            )}
          </>
        ),
      },
    ];
    const { userFiat } = this.state;
    return (
      <>
        <Topic>
          <span>{this.t("portfolio_text.message")}</span>
        </Topic>
        <HighLow>
          <LeftHl>
            {/* {precision(parseFloat(this.state.total))} {userFiat} */}
            {this.state.total == "Infinity"
              ? `0 ${userFiat}`
              : `${precision(parseFloat(this.state.total))} ${userFiat}`}
          </LeftHl>
          <RightHl
            className={
              parseFloat(this.state.diffrence) <= 0 ? "red_colour" : ""
            }
          >
            {parseFloat(this.state.diffrence) <= 0 ? (
              <Icon type="arrow-down" />
            ) : (
              <Icon type="arrow-up" />
            )}
            {precision(parseFloat(this.state.diffrence))} {userFiat}
          </RightHl>
        </HighLow>
        <ActDiv>
          <PortTable
            // scroll={{ y: 430 }}
            pagination={false}
            columns={portfolioColumn}
            dataSource={this.state.portfolioData}
            className="portfolio-table"
          />
        </ActDiv>
        {this.state.portfolioLoader === true ? (
          <SpinSingle className="Single_spin">
            <Spin size="small" />
          </SpinSingle>
        ) : (
          ""
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    // isLoggedIn:
    //   state.simpleReducer
    //     .isLoggedIn /*
    // theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "", */,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default translate(["tier_changes", "wallet", "trade", "settings"])(
  connect(mapStateToProps)(Portfolio)
);
function precision(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 8) {
    {
      x = parseFloat(x).toFixed(8);
      if (
        x.toString()[x.toString().length - 1] == "0" &&
        (x.toString().split(".")[1][0] != "0" ||
          x.toString().split(".")[1][5] != "0")
      ) {
        return parseFloat(x);
      } else if (x.toString().split(".")[1][7] == "0") {
        if (x.toString().split(".")[1][6] == "0") {
          if (x.toString().split(".")[1][5] == "0") {
            if (x.toString().split(".")[1][4] == "0") {
              if (x.toString().split(".")[1][3] == "0") {
                if (x.toString().split(".")[1][2] == "0") {
                  if (x.toString().split(".")[1][1] == "0") {
                    if (x.toString().split(".")[1][0] == "0") {
                      return parseFloat(x).toFixed(0);
                    } else return parseFloat(x).toFixed(1);
                  } else return parseFloat(x).toFixed(2);
                } else return parseFloat(x).toFixed(3);
              } else return parseFloat(x).toFixed(4);
            } else return parseFloat(x).toFixed(5);
          } else return parseFloat(x).toFixed(6);
        } else return parseFloat(x).toFixed(7);
      } else return parseFloat(x).toFixed(8);
    }
  }
  return x;
}
function precisionTwo(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 2) {
    {
      x = parseFloat(x).toFixed(2);
      if (
        x.toString()[x.toString().length - 1] == "0" &&
        (x.toString().split(".")[1][0] != "0" ||
          x.toString().split(".")[1][5] != "0")
      ) {
        return parseFloat(x);
      } else if (x.toString().split(".")[1][1] == "0") {
        if (x.toString().split(".")[1][0] == "0") {
          return parseFloat(x).toFixed(0);
        } else return parseFloat(x).toFixed(1);
      }
    }
  }
  return x;
}
