import React, { Component } from "react";
import styled from "styled-components";
import { Progress, Spin } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { globalVariables } from "Globals.js";

import {
  Topic,
  ActDiv,
  ActTable,
  SpinSingle,
} from "../../../STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
const SideType = styled.td`
  color: ${(props) => (props.type === "Sell" ? "#f13239" : "#4fb153")};
  font-weight: 600;
`;
const activityColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    className: "dash-date",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text) => <SideType type={text}>{text}</SideType>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    className: "amount",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    className: "amount",
  },
  {
    title: "Completed",
    key: "completed",
    dataIndex: "completed",
    className: "progress-bar-container",
    render: (completed) => <Progress percent={completed} />,
  },
];
class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: [],
      activityLoader: false,
    };
  }
  componentDidMount() {
    this.loadActivity();
  }
  loadActivity() {
    var self = this;
    self.setState({ activityLoader: true });

    fetch(`${globalVariables.SOCKET_HOST}/api/v1/tradding/get-activity-data`, {
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
        // console.log(responseData);
        let activityData = [];
        if (responseData.status === 200) {
          responseData.data.map((element) => {
            var date;
            if (this.props.profileDetails.date_format === "MM/DD/YYYY")
              date = moment
                .utc(element.created_at)
                .local()
                .format("MM/DD/YYYY, H:m:s");
            else if (this.props.profileDetails.date_format === "DD/MM/YYYY")
              date = moment
                .utc(element.created_at)
                .local()
                .format("DD/MM/YYYY, H:m:s");
            else
              date = moment
                .utc(element.created_at)
                .local()
                .format("MMM D, YYYY, H:m:s");
            activityData.push({
              date: date,
              action: element.side,
              amount: element.price.toFixed(8),
              symbol: element.symbol,
              completed: parseInt(
                (parseFloat(element.quantity) * 100) /
                  parseFloat(element.fix_quantity)
              ),
            });
          });
          self.setState({
            activityData: activityData,
            activityLoader: false,
          });
        }
      })
      .catch((error) => {
        self.setState({ activityLoader: false });
      });
  }
  render() {
    return (
      <>
        <Topic>
          <span>ACTIVITY</span>
        </Topic>
        <ActDiv>
          <ActTable
            // scroll={{ y: 500 }}
            pagination={false}
            columns={activityColumns}
            dataSource={this.state.activityData}
            className="activity-table"
          />
        </ActDiv>
        {this.state.activityLoader === true ? (
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

export default connect(mapStateToProps)(Activity);
