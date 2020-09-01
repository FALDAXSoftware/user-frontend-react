/* Built-in PAckage */
import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";

/* Components */
import { globalVariables } from "Globals.js";
import { Spin } from "antd";

/* Styled-components */
import { SpinSingle } from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import { OTwrap } from "./ordertrade";
import {
  BBC2,
  TotalBTC,
  BuyTable,
  HistoryWrap1,
  TableHeader,
  TableContent,
  ScrollTableContent,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import { faThinkPeaks } from "@fortawesome/free-brands-svg-icons";
import { precise } from "../../../precision";

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
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  font-family: "Open Sans";
`;
class SellTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
      currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
      lastsum: 0,
      loader: false,
      result: [],
    };
    this.t = this.props.t;
    this.updateData = this.updateData.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    // var self = this;
    if (this.props.io) {
      this.props.io.on("sell-book-data", (data) => {
        if (data.name == this.props.crypto + "-" + this.props.currency) {
          this.updateData(data);
        }
      });
    }
    // self.sellTableData();
    // this.setState({ crypto: this.props.cryptoPair.crypto, currency: this.props.cryptoPair.currency }, () => {
    // })
  }
  componentWillReceiveProps(props, newProps) {
    var self = this;
    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState({ crypto: props.cryptoPair.crypto }, () => {
          // self.sellTableData();
        });
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState({ currency: props.cryptoPair.currency }, () => {
          // self.sellTableData();
        });
      }
    }
  }

  /* 
        Page: /trade --> Sell Book
        In this method socket is connected for sell book according to room provided.
    */

  sellTableData() {
    // let io = this.props.io;
    // io.sails.url = APP_URL;
    // var URL;
    // this.setState({ loader: true });
    // if (
    //   this.props.cryptoPair.prevRoom !== undefined &&
    //   Object.keys(this.props.cryptoPair.prevRoom).length > 0
    // ) {
    //   URL = `/socket/get-sell-book?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`;
    // } else {
    //   URL = `/socket/get-sell-book?room=${this.state.crypto}-${this.state.currency}`;
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
    //       let res = JSON.parse(JSON.stringify(body.data));
    //       console.log(body.data);
    //       this.updateData(res);
    //     }
    //   }
    // );
    // io.socket.on("sell-book-data", data => {
    //   console.log(data);
    //   this.updateData(data);
    // });
  }
  // updateData(data) {
  //     const rows = [];
  //     let sum = 0;
  //     let lastsum = 0;
  //     for (let i = 0; i < data.length; i++) {
  //         const element = data[i];
  //         sum = sum + element.quantity * element.price;
  //         rows.push({
  //             my_size: 0,
  //             amount: element.quantity,
  //             ask: element.price,
  //             total: sum,
  //         });
  //         lastsum = sum;
  //     }
  //     var preArr = [];
  //     var final_result = [];
  //     for (let i = 0; i < rows.length; i++) {
  //         if (preArr.includes(rows[i].ask)) {
  //         }
  //         else {
  //             var count = 0;
  //             var result = {
  //                 amount: rows[i].amount,
  //                 total: rows[i].total
  //             };
  //             preArr.push(rows[i].ask)
  //             for (let j = 0; j < rows.length; j++) {
  //                 console.log(i !== j)
  //                 if (i !== j) {
  //                     if (rows[i].ask===rows[j].ask) {
  //                         result.amount = result.amount + rows[j].amount;
  //                         result.total = result.total;
  //                     }
  //                 }
  //             }
  //             result.ask = rows[i].ask;
  //             result.my_size = rows[i].my_size;
  //             final_result.push(result);
  //         }
  //     }
  //     this.setState({
  //         loader: false,
  //         data: rows,
  //         lastsum,
  //         result: final_result
  //     });
  // }

  /* 
        Page: /trade --> Sell Book
        SOCKET is connected and new data will be generated again and again and it will be updated in sell book.
    */

  updateData(res) {
    let self = this;
    let data = res.data;
    const row = [];
    let sum = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let isAdded = false;
      let value = [];
      element["my_size"] = 0;
      row.push({
        my_size: element.my_size,
        amount: element.quantity,
        ask: element.price,
        // user_id: element.user_id,
        // total: sum,
      });
      // if (element.user_id === self.props.profileDetails.id) {
      //     element["my_size"] = element.quantity;
      // }
      // for (let internalIndex = 0; internalIndex < row.length; internalIndex++) {
      //   const internalElement = row[internalIndex];
      //   console.log(
      //     index,
      //     internalIndex,
      //     "==========>",
      //     internalElement.ask === element.price,
      //     element.price,
      //     internalElement.ask
      //   );
      //   if (internalElement.ask === element.price) {
      //     row[internalIndex].amount += element.quantity;
      //     console.log(
      //       "I am inside",
      //       data[index],
      //       data[internalIndex],
      //       Number(internalElement.user_id),
      //       self.props.profileDetails.id,
      //       Number(internalElement.user_id) == self.props.profileDetails.id
      //     );

      //     // if (Number(internalElement.user_id) == self.props.profileDetails.id) {
      //     //     console.log("I am inside", data[internalIndex])
      //     //     row[internalIndex]["my_size"] = element.my_size + internalElement.my_size;
      //     // }
      //     isAdded = true;
      //     break;
      //   }
      // }
      // element.my_size = 0;
      // for (let tempIndex = 0; tempIndex < data.length; tempIndex++) {
      //   if (value.includes(element.price)) {
      //     if (element.price == data[tempIndex].price) {
      //       if (data[tempIndex].user_id == self.props.profileDetails.id) {
      //         element.my_size = value.my_size + data[tempIndex].quantity;
      //       }
      //     }
      //     value.my_size = element.my_size;
      //   } else {
      //     value.push(element.price);
      //     if (element.price == data[tempIndex].price) {
      //       if (data[tempIndex].user_id == self.props.profileDetails.id) {
      //         element.my_size = element.my_size + data[tempIndex].quantity;
      //       }
      //     }
      //     value.my_size = element.my_size;
      //   }
      //   // value.push(element.price)
      // }
      // console.log(element);
      // if (!isAdded) {
      //   row.push({
      //     my_size: element.my_size,
      //     amount: element.quantity,
      //     ask: element.price,
      //     user_id: element.user_id,
      //     // total: sum,
      //   });
      // }
    }

    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      sum += element.amount * element.ask;
      row[index]["total"] = sum;
    }
    // this.props.loaderfunc(false);
    this.setState({
      loader: false,
      // data: rows,
      lastsum: res.total || 0,
      result: row,
    });
  }

  render() {
    return (
      <div>
        <BBC2>
          {this.t("selling_text.message")} {this.props.crypto}
        </BBC2>
        <TotalBTC>
          {this.t("conversion:total_text.message")}:{" "}
          {this.state.lastsum &&
            precise(this.state.lastsum, this.props.pricePrecision)}{" "}
          {this.props.crypto}
        </TotalBTC>
        <BuyTable>
          <HistoryWrap1>
            <OTwrap2>
              <div class="tbl-header">
                <TableHeader cellpadding="10px" cellspacing="0" border="0">
                  <thead>
                    <tr>
                      {/* <th>{this.t("my_size_text.message")}</th> */}
                      <th>
                        {this.t("wallet:amount_text.message")} (
                        {this.props.crypto})
                      </th>
                      <th>
                        {this.t("ask_text.message")} ({this.props.currency})
                      </th>
                      <th>
                        {this.t("conversion:total_text.message")} (
                        {this.props.currency})
                      </th>
                    </tr>
                  </thead>
                </TableHeader>
              </div>
            </OTwrap2>
            <OTwrap2>
              <ScrollTableContent>
                <Scrollbars
                  style={{ height: this.props.height }}
                  className="scrollbar"
                  hideTracksWhenNotNeeded={true}
                >
                  <TableContent
                    className="buy_sell_table"
                    cellpadding="10px"
                    cellspacing="0"
                    border="0"
                  >
                    {this.state.result.length ? (
                      <tbody>
                        {this.state.result.map((element) => (
                          <tr>
                            {/* <td>{element.my_size.toFixed(8)}</td> */}
                            <td>
                              {precise(element.amount, this.props.qtyPrecision)}
                            </td>
                            <td>
                              {precise(element.ask, this.props.pricePrecision)}
                            </td>
                            <td>
                              {precise(
                                element.total,
                                this.props.pricePrecision
                              )}
                            </td>
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
        : "",
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default translate(["trade", "conversion", "wallet"])(
  connect(mapStateToProps)(SellTable)
);
