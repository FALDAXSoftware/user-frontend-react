import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { Menu, Icon } from "antd";
import { translate } from "react-i18next";

import { Scrollbars } from "react-custom-scrollbars";
import {
  TableHeader,
  TableContent,
  ScrollTableContent,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import {
  Head,
  SubHead,
  Col1,
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

const TableContentRide = styled(TableContent)`
  > tbody > tr:nth-of-type(even) {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "" : "white"};
  }
  > tbody > tr > td {
    border-top: 1px solid #ddd;
    word-break: break-all;
  }
`;

export const TRDisplay = styled.tr`
  height: 200px;
`;

export const OTwrap = styled.div`
  @media (max-width: 991px) {
    min-width: 1100px;
  }
  & .tbl-header {
    border-radius: 30px;
    border: 2px solid transparent;
  }
`;
export const OrderWrap = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid #d8d8d8;
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
const OrderWrapRide = styled(OrderWrap)`
  margin-left: 0px;
  margin-right: 0px;
  border: none;
  @media (max-width: 991px) {
    min-width: 1200px;
  }
`;
const NDF = styled.td`
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};

  font-family: Open Sans;
`;
const menu = (
  <Menu>
    <Menu.Item key="0">INR</Menu.Item>
    <Menu.Item key="1">USD</Menu.Item>
    <Menu.Item key="3">EUR</Menu.Item>
  </Menu>
);

class DetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletDetails: [],
    };
    this.t = this.props.t;
  }

  /* Life Cycle Methods */
  componentWillReceiveProps(props, newProps) {
    if (props.wallet !== undefined && props.wallet !== null) {
      if (props.wallet.length > 0)
        this.setState({
          walletDetails: props.wallet,
        });
    }
  }
  componentDidMount() {
    if (this.props.wallet !== null)
      if (this.props.wallet.length > 0)
        this.setState({
          walletDetails: this.props.wallet,
        });
  }

  /* 
        Page: /wallet
        This method is called when total USD is to passed to parent through callback function.
    */

  totalUSD(total) {
    this.props.totalUSD(total);
  }

  render() {
    var me = this;
    return (
      <OrderWrapRide>
        <OTwrap>
          <div className="tbl-header">
            <TableHeader cellpadding="10px" cellspacing="0" border="0">
              {/* <Table_coin condensed> */}
              <thead>
                <Head wallet>
                  <SubHead>{this.t("wallet:date_text.message")}</SubHead>
                  <SubHead>
                    {this.t("wallet:send_btn.message")}/
                    {this.t("wallet:recieve_btn.message")}
                  </SubHead>
                  <SubHead>
                    {this.t("wallet:source_text.message")}{" "}
                    {this.t("wallet:address_text.message")}
                  </SubHead>
                  <SubHead>
                    {this.t("wallet:destination_text.message")}{" "}
                    {this.t("wallet:address_text.message")}
                  </SubHead>
                  <SubHead>
                    {this.t("wallet:base_text.message")}{" "}
                    {this.t("wallet:amount_text.message")}
                  </SubHead>
                  <SubHead>
                    {this.t("conversion:faldax_text.message")}{" "}
                    {this.t("footer:subhead_fees.message")}
                  </SubHead>
                  <SubHead>
                    {this.t("conversion:network_text.message")}{" "}
                    {this.t("footer:subhead_fees.message")}
                  </SubHead>
                  <SubHead>
                    {this.t("conversion:total_text.message")}{" "}
                    {this.t("wallet:amount_text.message")}
                  </SubHead>
                  <SubHead>
                    {this.t("wallet:transaction_text.message")}{" "}
                    {this.t("wallet:hash_text.message")}
                  </SubHead>
                </Head>
              </thead>
            </TableHeader>
          </div>
        </OTwrap>
        <OTwrap>
          <ScrollTableContent className="wallet">
            <Scrollbars className="scrollbar scrollbarwallet">
              <TableContentRide cellpadding="10px" cellspacing="0" border="0">
                <tbody>
                  {this.state.walletDetails !== null ? (
                    Object.keys(this.state.walletDetails).length > 0 ? (
                      Object.keys(this.state.walletDetails).map(function (
                        index,
                        key
                      ) {
                        // var date = moment.utc(me.state.walletDetails[index].created_at).local().format(`${me.props.profileDetails.date_format}`);
                        var date = moment
                          .utc(me.state.walletDetails[index].created_at)
                          .local()
                          .format("DD/MM/YYYY, LTS");
                        var details = me.state.walletDetails;
                        let url;
                        if (me.props.coin_code != undefined) {
                          switch (me.props.coin_code) {
                            // For Testnet
                            case "tbtc":
                              url =
                                "https://blockstream.info/testnet/tx/" +
                                details[index].transaction_id;
                              break;
                            case "txrp":
                              url =
                                "https://test.bithomp.com/explorer/" +
                                details[index].transaction_id;
                              break;
                            case "tltc":
                              url =
                                "https://blockexplorer.one/litecoin/testnet/tx/" +
                                details[index].transaction_id;
                              break;
                            case "tbch":
                              url =
                                "https://explorer.bitcoin.com/tbch/tx/" +
                                details[index].transaction_id;
                              break;
                            case "teth":
                              url =
                                "https://kovan.etherscan.io/tx/" +
                                details[index].transaction_id;
                              break;

                            // For Mainnet
                            case "btc":
                              url =
                                "https://blockchair.com/bitcoin/transaction/" +
                                details[index].transaction_id;
                              break;
                            case "xrp":
                              url =
                                "https://blockchair.com/ripple/transaction/" +
                                details[index].transaction_id;
                              break;
                            case "ltc":
                              url =
                                "https://blockchair.com/litecoin/transaction/" +
                                details[index].transaction_id;
                              break;
                            case "bch":
                              url =
                                "https://blockchair.com/bitcoin-cash/transaction/" +
                                details[index].transaction_id;
                              break;
                            case "eth":
                              url =
                                "https://etherscan.io/tx/" +
                                details[index].transaction_id;
                              break;
                            case "SUSU":
                              url =
                                "https://explore.susukino.com/tx/" +
                                details[index].transaction_id;
                              break;
                            default:
                              url = "";
                              break;
                          }
                        }
                        if (me.props.isERC) {
                          url =
                            "https://etherscan.io/tx/" +
                            details[index].transaction_id;
                        }
                        return (
                          <Col1 wallet>
                            <td>
                              <div>{date}</div>
                            </td>
                            <td>
                              {details[index].transaction_type === "receive" ? (
                                <span>
                                  <Icon
                                    className="icon-display"
                                    type="download"
                                  />{" "}
                                  RECEIVED
                                </span>
                              ) : (
                                <span>
                                  <Icon
                                    className="send-display"
                                    type="upload"
                                  />{" "}
                                  SENT
                                </span>
                              )}
                            </td>
                            <td>{details[index].source_address}</td>
                            <td>{details[index].destination_address}</td>
                            <td>
                              {details[index].amount
                                ? precision(details[index].amount)
                                : "0"}
                            </td>
                            <td>
                              {details[index].faldax_fee === "-"
                                ? details[index].faldax_fee
                                : precision(details[index].faldax_fee)}
                            </td>
                            <td>
                              {details[index].network_fees
                                ? details[index].network_fees === "-"
                                  ? details[index].network_fees
                                  : precision(details[index].network_fees)
                                : "-"}
                            </td>
                            <td>
                              {details[index].total
                                ? precision(details[index].total)
                                : "0"}
                            </td>
                            <td>
                              {me.props.coin_code === "xrp" ? (
                                details[index].transaction_id ? (
                                  <a target="_blank" href={url}>
                                    {details[index].transaction_id}
                                  </a>
                                ) : (
                                  "-"
                                )
                              ) : (
                                <a target="_blank" href={url}>
                                  {details[index].transaction_id}
                                </a>
                              )}
                              {/* <a target="_blank" href={url}>
                                {details[index].transaction_id}
                              </a> */}
                            </td>
                            {/* <td>

                                </td> */}
                          </Col1>
                        );
                      })
                    ) : (
                      <TRDisplay>
                        <NDF colspan="5">
                          {this.t("wallet:no_data_found_text.message")}
                        </NDF>
                      </TRDisplay>
                    )
                  ) : (
                    ""
                  )}
                </tbody>
              </TableContentRide>
            </Scrollbars>
          </ScrollTableContent>
        </OTwrap>
      </OrderWrapRide>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
  };
};

export default translate([
  "edit_profile_titles",
  "settings",
  "wallet",
  "conversion",
  "footer",
])(connect(mapStateToProps)(DetailsTable));
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
