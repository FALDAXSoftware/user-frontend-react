/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { Icon } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";

/* STYLED-COMPONENTS */
import {
  TableHeader,
  TableContent,
  ScrollTableContent,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

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
    this.t = this.props.t;
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  /* 
        Page: /trade --> Orders and Trades
        This method is called when u cancel an order and parent callback method is called.
    */

  cancelOrder(id, side, type) {
    console.log(id, side, type);
    this.props.cancelOrder(id, side, type);
  }

  render() {
    var self = this;
    return (
      <OrderWrap>
        <OTwrap className="jsdghfjks">
          <div className="tbl-header">
            <TableHeader cellpadding="10px" cellspacing="0" border="0">
              {/* <HTable striped responsive> */}
              <thead>
                <tr>
                  <th>{this.t("history:side_text.message")}</th>
                  <th>{this.t("wallet:amount_text.message")}</th>
                  {self.props.pending !== 2 ? (
                    <th>{this.t("history:price_text.message")}</th>
                  ) : (
                      <th>{this.t("limit_price_text.message")}</th>
                    )}
                  {self.props.pending !== 2 ? (
                    <th>{this.t("unfilled_text.message")}</th>
                  ) : (
                      <th>{this.t("stop_price_text.message")}</th>
                    )}
                  <th>{this.t("fill_price_text.message")}</th>
                  <th>{this.t("type_text.message")}</th>
                  <th>{this.t("time_text.message")}</th>
                  <th>{this.t("conversion:total_text.message")}</th>
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
                          .format("MM/DD/YYYY, H:m:s");
                      else if (
                        self.props.profileDetails.date_format === "DD/MM/YYYY"
                      )
                        date = moment
                          .utc(data.created_at)
                          .local()
                          .format("DD/MM/YYYY, H:m:s");
                      else
                        date = moment
                          .utc(data.created_at)
                          .local()
                          .format("MMM D, YYYY, H:m:s");
                      var Filled = data.fix_quantity - data.quantity;
                      // console.log("self.props.profileDetails", self.props.profileDetails)
                      var typeValue = ""
                      var currencyValue = ""
                      var sideValue
                      if (self.props.pending == 1) {
                        if (data.user_id == self.props.profileDetails.id) {
                          sideValue = data.side
                        } else if (data.requested_user_id == self.props.profileDetails.id) {
                          sideValue = (data.side == 'Buy') ? "Sell" : "Buy"
                        }
                        if (data.side == "Buy") {
                          if (data.user_id == self.props.profileDetails.id) {
                            currencyValue = data.settle_currency
                          } else if (data.requested_user_id == self.props.profileDetails.id) {
                            currencyValue = data.currency
                          }
                        } else if (data.side == "Sell") {
                          if (data.user_id == self.props.profileDetails.id) {
                            currencyValue = data.settle_currency
                          } else if (data.requested_user_id == self.props.profileDetails.id) {
                            currencyValue = data.currency
                          }
                        }
                        console.log("currencyValue", currencyValue)
                        console.log("data", data)
                        if (data.user_id == self.props.profileDetails.id) {
                          typeValue = data.order_type
                        } else if (data.requested_user_id == self.props.profileDetails.id) {
                          typeValue = "Limit"
                        }
                      } else {
                        typeValue = data.order_type;
                        currencyValue = data.settle_currency;
                        sideValue = data.side
                      }
                      return (
                        <tr>
                          <SideType type={sideValue}>{sideValue}</SideType>
                          <td>
                            {data.quantity.toFixed(8)} {currencyValue}
                          </td>
                          {/* <td>
                            {self.props.pending !== 2
                              ? data.order_type === "Market"
                                ? data.order_type
                                : data.limit_price.toFixed(8)
                              : data.limit_price.toFixed(8)}
                          </td> */}
                          <td>
                            {self.props.pending != 2
                              ? "-"
                              : data.limit_price.toFixed(8)}
                          </td>
                          <SideType type={data.side}>
                            {self.props.pending !== 2
                              ? Filled.toFixed(8)
                              : data.stop_price !== undefined
                                ? data.stop_price.toFixed(8)
                                : 0}
                          </SideType>
                          <td>
                            {data.fill_price.toFixed(8)} {data.currency}
                          </td>
                          <td>{typeValue}</td>
                          <td>{date}</td>
                          <td>
                            {self.props.pending === 2
                              ? (data.quantity * data.limit_price).toFixed(8)
                              : (data.quantity * data.fill_price).toFixed(8)}
                          </td>
                          {self.props.pending === 2 ? (
                            <th>
                              <span
                                onClick={() =>
                                  self.cancelOrder(
                                    data.encript_id,
                                    data.side,
                                    data.order_type
                                  )
                                }
                              >
                                <Icon
                                  style={{ color: "#279CED", fontSize: "18px" }}
                                  type="close-circle"
                                />
                              </span>
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
