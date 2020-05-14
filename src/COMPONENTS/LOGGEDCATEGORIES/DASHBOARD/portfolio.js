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
              amount: element.Amount.toFixed(3) + " " + element.symbol,
              value: element.average_price.toFixed(5) + " " + userFiat,
              change: element.percentchange.toFixed(5) + "%",
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
            {this.state.total.toFixed(8)} {userFiat}
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
            {this.state.diffrence.toFixed(8)} {userFiat}
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
