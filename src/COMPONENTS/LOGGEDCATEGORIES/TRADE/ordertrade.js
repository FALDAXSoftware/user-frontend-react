/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { Icon, Button } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";

/* STYLED-COMPONENTS */
import {
  TableHeader,
  TableContent,
  ScrollTableContent,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import { precise } from "../../../precision";

export const OrderWrap = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid #d8d8d8;
  @media (max-width: 991px) {
    min-width: 700px;
  }
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041624" : ""};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => (props.theme.mode === "dark" ? "#072135" : "")};
  }
`;
const CancelBTN = styled(Button)`
  border: 0;
  padding: 0;
  background: transparent;
  height: auto;
`;
export const HTable = styled(Table)`
  > thead {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
    color: #174c7e;
    border: none;
  }
  > thead > tr > th {
    border: 0px;
  }
  & tbody {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 600;
  }
  > tbody > tr:nth-of-type(odd) {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#041422" : "#f9f9f9"};
  }
`;
const SideType = styled.td`
  color: ${(props) => (props.type === "Sell" ? "#f13239" : "#4fb153")};
`;
const NDF = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  margin-top: 30px;
  font-family: Open Sans;
`;
export const OTwrap = styled.div`
  @media (max-width: 991px) {
    min-width: 700px;
  }
`;

class OrderTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
    this.t = this.props.t;
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  /* 
        Page: /trade --> Orders and Trades
        This method is called when u cancel an order and parent callback method is called.
    */
  componentWillReceiveProps(props) {
    if (props.butonEnable) {
      this.setState({
        disabled: false,
      });
    }
  }
  cancelOrder(id, side, type) {
    console.log("cancel orde^^^^^", id, side, type);
    this.setState({
      disabled: true,
    });
    this.props.cancelOrder(id, side, type);
  }

  render() {
    var self = this;
    return (
      <OrderWrap>
        <OTwrap>
          <div className="tbl-header">
            <TableHeader cellpadding="10px" cellspacing="0" border="0">
              {/* <HTable striped responsive> */}
              <thead>
                <tr>
                  {/* <th>{this.t("history:side_text.message")}</th> */}
                  <th>
                    {this.t("wallet:amount_text.message")} ({self.props.crypto})
                  </th>
                  {self.props.pending !== 2 ? (
                    <th>
                      {this.t("history:price_text.message")} (
                      {self.props.currency})
                    </th>
                  ) : (
                    <th>
                      {this.t("limit_price_text.message")} (
                      {self.props.currency})
                    </th>
                  )}
                  {self.props.pending !== 2 ? (
                    <th>
                      {this.t("unfilled_text.message")} ({self.props.crypto})
                    </th>
                  ) : (
                    <th>
                      {this.t("stop_price_text.message")} ({self.props.currency}
                      )
                    </th>
                  )}
                  <th>
                    {this.t("fill_price_text.message")} ({self.props.currency})
                  </th>
                  <th>{this.t("type_text.message")}</th>
                  <th>{this.t("time_text.message")}</th>
                  <th>
                    {this.t("conversion:total_text.message")} (
                    {self.props.currency})
                  </th>
                  {self.props.pending === 2 ? (
                    <th>{this.t("actions_text.message")}</th>
                  ) : (
                    ""
                  )}
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
            >
              <TableContent cellpadding="10px" cellspacing="0" border="0">
                <tbody>
                  {this.props.orderTradeData.length > 0 ? (
                    this.props.orderTradeData.map(function (data) {
                      var date;
                      if (
                        self.props.profileDetails.date_format === "MM/DD/YYYY"
                      )
                        date = moment
                          .utc(data.created_at)
                          .local()
                          .format("MM/DD/YYYY, HH:mm:ss");
                      else if (
                        self.props.profileDetails.date_format === "DD/MM/YYYY"
                      )
                        date = moment
                          .utc(data.created_at)
                          .local()
                          .format("DD/MM/YYYY, HH:mm:ss");
                      else
                        date = moment
                          .utc(data.created_at)
                          .local()
                          .format("MMM D, YYYY, HH:mm:ss");

                      if (
                        data.requested_user_id == self.props.profileDetails.id
                      ) {
                        var Filled = 0;
                      } else {
                        var Filled = data.fix_quantity - data.quantity;
                      }

                      // console.log("self.props.profileDetails", self.props.profileDetails)
                      var typeValue = "";
                      var currencyValue = "";
                      var sideValue;
                      if (self.props.pending == 1) {
                        if (data.user_id == self.props.profileDetails.id) {
                          sideValue = data.side;
                        } else if (
                          data.requested_user_id == self.props.profileDetails.id
                        ) {
                          sideValue = data.side == "Buy" ? "Sell" : "Buy";
                        }
                        if (data.side == "Buy") {
                          if (data.user_id == self.props.profileDetails.id) {
                            currencyValue = data.settle_currency;
                          } else if (
                            data.requested_user_id ==
                            self.props.profileDetails.id
                          ) {
                            currencyValue = data.currency;
                          }
                        } else if (data.side == "Sell") {
                          if (data.user_id == self.props.profileDetails.id) {
                            currencyValue = data.settle_currency;
                          } else if (
                            data.requested_user_id ==
                            self.props.profileDetails.id
                          ) {
                            currencyValue = data.currency;
                          }
                        }
                        if (data.user_id == self.props.profileDetails.id) {
                          typeValue = data.order_type;
                        } else if (
                          data.requested_user_id == self.props.profileDetails.id
                        ) {
                          if (data.is_stop_limit == true) {
                            typeValue = "StopLimit";
                          } else {
                            typeValue = "Limit";
                          }
                        }
                      } else {
                        if (data.is_stop_limit == true) {
                          typeValue = "StopLimit";
                        } else {
                          typeValue = data.order_type;
                        }
                        currencyValue = data.settle_currency;
                        sideValue = data.side;
                      }
                      return (
                        <tr>
                          <SideType type={sideValue}>
                            {precise(data.quantity, self.props.qtyPrecision)}
                          </SideType>
                          <td>
                            {self.props.pending !== 2
                              ? data.order_type === "Market"
                                ? data.order_type
                                : `${precise(
                                    data.limit_price,
                                    self.props.pricePrecision
                                  )}`
                              : `${precise(
                                  data.limit_price,
                                  self.props.pricePrecision
                                )}`}
                          </td>
                          {/* <td>
                            {self.props.pending != 2
                              ? "-"
                              : precision(data.limit_price)}
                          </td> */}
                          <SideType type={sideValue}>
                            {self.props.pending !== 2
                              ? `${precise(Filled, self.props.pricePrecision)}`
                              : data.stop_price !== undefined
                              ? `${precise(
                                  data.stop_price,
                                  self.props.pricePrecision
                                )}`
                              : 0}
                          </SideType>
                          <td>
                            {self.props.pending === 2 &&
                            data.order_type === "Market"
                              ? "Market"
                              : precise(
                                  data.fill_price,
                                  self.props.pricePrecision
                                )}

                            {/* {self.props.currency} */}
                          </td>
                          <td>{typeValue}</td>
                          <td>{date}</td>
                          <td>
                            {self.props.pending === 2
                              ? `${precise(
                                  data.quantity * data.limit_price,
                                  self.props.pricePrecision
                                )}`
                              : `${precise(
                                  data.quantity * data.fill_price,
                                  self.props.pricePrecision
                                )}`}
                          </td>
                          {self.props.pending === 2 &&
                          data.order_type !== "Market" ? (
                            <th>
                              <CancelBTN
                                disabled={self.state.disabled}
                                // disabled={true}
                                onClick={() =>
                                  self.cancelOrder(
                                    data.id,
                                    data.side,
                                    data.order_type
                                  )
                                }
                              >
                                <Icon
                                  style={{ color: "#279CED", fontSize: "18px" }}
                                  type="close-circle"
                                />
                              </CancelBTN>
                            </th>
                          ) : (
                            ""
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <NDF>{this.t("support:no_data_found.message")}</NDF>
                  )}
                </tbody>
              </TableContent>
            </Scrollbars>
          </ScrollTableContent>
        </OTwrap>
      </OrderWrap>
    );
  }
}

export default translate(["trade", "conversion", "wallet", "support"])(
  OrderTrade
);
