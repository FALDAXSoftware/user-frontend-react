/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import styled, { consolidateStreamedStyles } from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Spin } from "antd";

/*Components  */
import { globalVariables } from "Globals.js";

/* STYLED-COMPONENTS */
import {
  BuyTable,
  BBC,
  TotalBTC,
  HistoryWrap1,
  TableHeader,
  TableContent,
  ScrollTableContent
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import { SpinSingle } from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import { OTwrap } from "./ordertrade";

const APP_URL = globalVariables.API_URL;

const OTwrap2 = styled(OTwrap)`
  min-width: auto;
  @media (max-width: 991px) {
    min-width: 500px;
  }
`;
const NDF = styled.p`
  margin-top: 30px;
  background: none;
  border-bottom: 0px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
  font-family: "Open Sans";
`;
class BuyTABLE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
      currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
      lastsum: 0,
      loader: false,
      result: []
    };
    this.t = this.props.t;
    this.updateData = this.updateData.bind(this);
  }

  /* Life-Cycle Methods */

  componentWillReceiveProps(props, newProps) {
    // var self = this;
    // if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
    //   if (props.cryptoPair.crypto !== this.state.crypto) {
    //     this.setState({ crypto: props.cryptoPair.crypto }, () => {
    //       self.buyTableData();
    //     });
    //   }
    //   if (props.cryptoPair.currency !== this.state.currency) {
    //     this.setState({ currency: props.cryptoPair.currency }, () => {
    //       self.buyTableData();
    //     });
    //   }
    // }
  }
  componentDidMount() {
    // self.buyTableData();
    // console.log("^^^^ Here", this.props.io);
    if (this.props.io) {
      this.props.loaderfunc(true);
      this.setState({ loader: true });
      this.props.io.on("buy-book-data", data => {
        // console.log("^^^^data", data);
        this.updateData(data);
      });
    }

    // this.setState({ crypto: this.props.cryptoPair.crypto, currency: this.props.cryptoPair.currency }, () => {
    // })
  }

  /*
        Page: /trade --> Buy Book
        SOCKET is called for buybook table data according to room provided.
    */

  // buyTableData() {
  //   let io = this.props.io;
  //   io.sails.url = APP_URL;
  //   this.props.loaderfunc(true);
  //   this.setState({ loader: true });
  //   var URL;
  //   if (
  //     this.props.cryptoPair.prevRoom !== undefined &&
  //     Object.keys(this.props.cryptoPair.prevRoom).length > 0
  //   ) {
  //     URL = `/socket/get-buy-book?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`;
  //   } else {
  //     URL = `/socket/get-buy-book?room=${this.state.crypto}-${this.state.currency}`;
  //   }
  //   io.socket.request(
  //     {
  //       method: "GET",
  //       url: URL,
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + this.props.isLoggedIn
  //       }
  //     },
  //     (body, JWR) => {
  //       if (body.status === 200) {
  //         console.log(body.data, body);
  //         let res = body.data;
  //         this.updateData(res);
  //       }
  //     }
  //   );
  //   io.on("buy-book-data", data => {
  //     this.updateData(data);
  //   });
  // }
  // updateData(data) {
  //     console.log(data)
  //     const rows = [];
  //     let sum = 0;
  //     let lastsum
  //     for (let i = 0; i < data.length; i++) {
  //         const element = data[i];
  //         sum = sum + element.quantity * element.price;
  //         rows.push({
  //             my_size: 0,
  //             amount: element.quantity,
  //             bid: element.price,
  //             total: sum,
  //         });
  //         lastsum = sum
  //     }
  //     var preArr = [];
  //     var final_result = [];
  //     console.log(rows)
  //     for (let i = 0; i < rows.length; i++) {

  //         if (preArr.includes(rows[i].bid)) {

  //         }
  //         else {
  //             var count = 0;
  //             var result = {
  //                 amount: rows[i].amount,
  //                 total: rows[i].total
  //             };
  //             preArr.push(rows[i].bid)
  //             for (let j = 0; j < rows.length; j++) {
  //                 console.log(i !== j)
  //                 if (i !== j) {
  //                     if (rows[i].bid===rows[j].bid) {
  //                         result.amount = result.amount + rows[j].amount;
  //                         result.total = result.total;
  //                     }
  //                 }
  //             }
  //             result.bid = rows[i].bid;
  //             result.my_size = rows[i].my_size;
  //             console.log(result.bid, count)
  //             final_result.push(result);
  //         }
  //     }
  //     console.log(final_result, preArr)
  //     this.props.loaderfunc(false);
  //     this.setState({
  //         loader: false,
  //         data: rows,
  //         lastsum,
  //         result: final_result
  //     });
  // }

  /*
        Page: /trade --> Buy Book
        SOCKET is called to update buybook table data according to room provided.
    */

  updateData(data) {
    let self = this;
    // console.log("buyrow------------", data);
    const row = [];
    var value = [];
    let sum = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let isAdded = false;
      element["my_size"] = 0;
      // if (element.user_id === self.props.profileDetails.id) {
      //     element["my_size"] = element.quantity;
      // }

      for (let internalIndex = 0; internalIndex < row.length; internalIndex++) {
        const internalElement = row[internalIndex];
        if (internalElement.bid === element.price) {
          row[internalIndex].amount += element.quantity;
          // console.log(element, internalElement);

          // if (internalElement.user_id === self.props.profileDetails.id) {
          // row[internalIndex]["my_size"] = element.my_size + internalElement.my_size;
          // }
          isAdded = true;
          break;
        }
      }
      element.my_size = 0;
      for (let tempIndex = 0; tempIndex < data.length; tempIndex++) {
        if (value.includes(element.price)) {
          if (element.price == data[tempIndex].price) {
            if (data[tempIndex].user_id == self.props.profileDetails.id) {
              element.my_size = value.my_size + data[tempIndex].quantity;
            }
          }
          value.my_size = element.my_size;
        } else {
          value.push(element.price);
          if (element.price == data[tempIndex].price) {
            if (data[tempIndex].user_id == self.props.profileDetails.id) {
              element.my_size = element.my_size + data[tempIndex].quantity;
            }
          }
          value.my_size = element.my_size;
        }
        // value.push(element.price)
      }
      console.log(element);
      if (!isAdded) {
        row.push({
          my_size: element.my_size,
          amount: element.quantity,
          bid: element.price,
          user_id: element.user_id
          // total: sum,
        });
      }
    }

    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      sum += element.amount * element.bid;
      row[index]["total"] = sum;
    }
    this.props.loaderfunc(false);
    this.setState({
      loader: false,
      // data: rows,
      lastsum: sum,
      result: row
    });
  }

  render() {
    return (
      <div>
        <BBC>
          {this.t("buying_text.message")} {this.props.crypto}
        </BBC>
        <TotalBTC>
          {this.t("conversion:total_text.message")}:{" "}
          {this.state.lastsum && this.state.lastsum.toFixed(8)}{" "}
          {this.state.currency}
        </TotalBTC>
        <BuyTable>
          <HistoryWrap1>
            <OTwrap2>
              <div className="tbl-header">
                <TableHeader cellpadding="10px" cellspacing="0" border="0">
                  <thead>
                    <tr>
                      <th>{this.t("my_size_text.message")}</th>
                      <th>{this.t("wallet:amount_text.message")}</th>
                      <th>{this.t("bid_text.message")}</th>
                      <th>{this.t("conversion:total_text.message")}</th>
                    </tr>
                  </thead>
                </TableHeader>
              </div>
            </OTwrap2>
            <OTwrap2>
              <ScrollTableContent>
                <Scrollbars
                  style={{ height: this.props.elementHeight }}
                  className="scrollbar"
                  hideTracksWhenNotNeeded={true}
                >
                  <TableContent
                    cellpadding="10px"
                    cellspacing="0"
                    border="0"
                    className="buy_sell_table"
                  >
                    {this.state.result.length ? (
                      <tbody>
                        {this.state.result.map(element => (
                          <tr>
                            <td>{element.my_size}</td>
                            <td>{element.amount.toFixed(3)}</td>
                            <td>{element.bid.toFixed(5)}</td>
                            <td>{element.total.toFixed(8)}</td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <NDF>{this.t("wallet:no_data_found_text.message")}</NDF>
                    )}
                  </TableContent>
                </Scrollbars>
              </ScrollTableContent>
            </OTwrap2>
          </HistoryWrap1>
        </BuyTable>
        {this.state.Loader === true ? (
          <SpinSingle className="Single_spin">
            <Spin size="small" />
          </SpinSingle>
        ) : (
          ""
        )}
      </div>
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

export default translate(["trade", "conversion", "wallet"])(
  connect(mapStateToProps)(BuyTABLE)
);
