/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; */

/*components*/
import { globalVariables } from "Globals.js";

/* STYLED-COMPONENTS */
import {
  HistoryWrap,
  TableHeader,
  TableContent,
  ScrollTableContent
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import { OTwrap } from "./ordertrade";

const APP_URL = globalVariables.API_URL;
const BorderedHistoryWrap = styled(HistoryWrap)`
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid #d8d8d8;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041624" : ""};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => (props.theme.mode === "dark" ? "#072135" : "")};
  }
`;
const SideType = styled.td`
  color: ${props => (props.type === "Sell" ? "#f13239" : "#4fb153")};
  > &.img-display {
    margin-bottom: 3px;
  }
`;
/* const FontAwesomeIconA = styled(FontAwesomeIcon)`` */
const NDF = styled.p`
    text-align: center; 
    font-weight: 600; 
    font-size: 17px;
    color: ${props => (props.theme.mode === "dark" ? "white" : "black")}; 
    margin-top: 30px; 
    font-family: "Open Sans";
}}
`;
var io = null;
class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
      currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
      loader: false
    };
    this.historyFunc = this.historyFunc.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    // var self = this;
    if (this.props.io) {
      this.props.io.on("trade-history-data", data => {
        // console.log("^^^^data", data);
        this.updateData(data);
      });
    }
    // self.historyData();
    // io.socket.on("tradehistoryUpdate", data => {
    //   self.updateData(data);
    // });
  }
  componentWillReceiveProps(props, newProps) {
    var self = this;
    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState({ crypto: props.cryptoPair.crypto }, () => {
          // self.historyData();
        });
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState({ currency: props.cryptoPair.currency }, () => {
          // self.historyData();
        });
      }
    }
  }

  /* 
        Page: /trade --> history table
        SOCKET is called for buybook table data according to room provided.
    */

  historyData() {
    // io = this.props.io;
    // this.props.hisFunc(true);
    // this.setState({ loader: true });
    // io.sails.url = APP_URL;
    // var URL;
    // if (
    //   this.props.cryptoPair.prevRoom !== undefined &&
    //   Object.keys(this.props.cryptoPair.prevRoom).length > 0
    // ) {
    //   URL = `/socket/get-trade-history?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`;
    // } else {
    //   URL = `/socket/get-trade-history?room=${this.state.crypto}-${this.state.currency}`;
    // }
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
    //     if (body.status === 200) {
    //       let res = body.data;
    //       this.props.hisFunc(false);
    //       this.updateData(res);
    //     }
    //   }
    // );
    // io.socket.on("tradeHistoryUpdate", data => {
    //   this.updateData(data);
    // });
  }

  /* 
        Page: /trade --> history table
        SOCKET is called again and again to update data.
    */

  updateData(data) {
    const rows = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
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
      rows.push({
        side: element.side,
        amount: element.quantity,
        fill_price: element.fill_price,
        time: date,
        total: element.quantity * element.fill_price
      });
    }

    this.setState({
      data: rows,
      loader: false
    });
  }

  /* 
        Page: /trade --> history table.
        this method is called to print the whole table data by returning the html.
    */

  historyFunc() {
    var me = this;
    return this.state.data.map((element, index) => (
      <tr>
        <SideType type={element.side} width="10%">
          {element.side}
        </SideType>
        <td width="20%">
          {element.amount !== undefined ? element.amount.toFixed(3) : ""}
        </td>
        {index + 1 < me.state.data.length ? (
          element.fill_price >= me.state.data[index + 1].fill_price ? (
            <td width="20%">
              {element.fill_price.toFixed(5)}{" "}
              {this.props.theme !== true ? (
                <img
                  alt="UP-Right"
                  className="img-display"
                  src="/images/up-right.png"
                />
              ) : (
                <img
                  alt="UP-Right"
                  className="img-display"
                  src="/images/up_white.png"
                />
              )}
            </td>
          ) : (
            <td width="20%">
              {element.fill_price.toFixed(5)}{" "}
              {this.props.theme !== true ? (
                <img
                  alt="UP-Right"
                  className="img-display"
                  src="/images/down-right.png"
                />
              ) : (
                <img
                  alt="UP-Right"
                  className="img-display"
                  src="/images/down_white.png"
                />
              )}
            </td>
          )
        ) : (
          <td>{element.fill_price} </td>
        )}
        <td width="25%">{element.time}</td>
        <td width="25%">{element.total.toFixed(8)}</td>
      </tr>
    ));
  }
  render() {
    /* 
        var me = this; 
        var prevImg*/
    return (
      <BorderedHistoryWrap>
        <OTwrap>
          <div className="tbl-header">
            <TableHeader
              cellpadding="10px"
              cellspacing="0"
              border="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th width="10%">SIDE</th>
                  <th width="20%">AMOUNT</th>
                  <th width="20%">FILL PRICE</th>
                  <th width="25%">TIME</th>
                  <th width="25%">TOTAL</th>
                </tr>
              </thead>
            </TableHeader>
          </div>
        </OTwrap>
        <OTwrap>
          <ScrollTableContent>
            <Scrollbars
              style={{ height: this.props.height }}
              className="scrollbar"
              hideTracksWhenNotNeeded={true}
            >
              <TableContent
                cellpadding="10px"
                cellspacing="0"
                border="0"
                width="100%"
              >
                <tbody>
                  {this.state.data.length > 0 ? (
                    this.historyFunc()
                  ) : (
                    <NDF>No Data Found</NDF>
                  )}
                </tbody>
              </TableContent>
            </Scrollbars>
          </ScrollTableContent>
        </OTwrap>
      </BorderedHistoryWrap>
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
        : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(HistoryTable);
