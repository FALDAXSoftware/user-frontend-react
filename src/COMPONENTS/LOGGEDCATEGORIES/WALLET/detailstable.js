import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { Menu, Icon } from "antd";

import { Scrollbars } from "react-custom-scrollbars";
import {
  TableHeader,
  TableContent,
  ScrollTableContent
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import {
  Head,
  SubHead,
  Col1
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

const TableContentRide = styled(TableContent)`
  > tbody > tr:nth-of-type(even) {
    background-color: ${props => (props.theme.mode === "dark" ? "" : "white")};
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
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041624" : ""};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => (props.theme.mode === "dark" ? "#072135" : "")};
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
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};

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
      walletDetails: []
    };
  }

  /* Life Cycle Methods */
  componentWillReceiveProps(props, newProps) {
    if (props.wallet !== undefined && props.wallet !== null) {
      if (props.wallet.length > 0)
        this.setState({
          walletDetails: props.wallet
        });
    }
  }
  componentDidMount() {
    // console.log(this.props.wallet);
    if (this.props.wallet !== null)
      if (this.props.wallet.length > 0)
        this.setState({
          walletDetails: this.props.wallet
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
    // console.log(this.props.coin_code);

    return (
      <OrderWrapRide>
        <OTwrap>
          <div className="tbl-header">
            <TableHeader cellpadding="10px" cellspacing="0" border="0">
              {/* <Table_coin condensed> */}
              <thead>
                <Head wallet>
                  <SubHead>Date</SubHead>
                  <SubHead>SEND/RECEIVE</SubHead>
                  <SubHead>SOURCE ADDRESS</SubHead>
                  <SubHead>DESTINATION ADDRESS</SubHead>
                  <SubHead>BASE AMOUNT</SubHead>
                  <SubHead>FALDAX FEES</SubHead>
                  <SubHead>NETWORK FEES</SubHead>
                  <SubHead>TOTAL AMOUNT</SubHead>
                  <SubHead>TRANSACTION HASH</SubHead>
                  {/* <Sub_head>USD
                                <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link"  verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                            </Dropdown>
                        </Sub_head> */}
                </Head>
              </thead>
            </TableHeader>
          </div>
        </OTwrap>
        <OTwrap>
          <ScrollTableContent>
            <Scrollbars className="scrollbar">
              <TableContentRide cellpadding="10px" cellspacing="0" border="0">
                <tbody>
                  {this.state.walletDetails !== null ? (
                    Object.keys(this.state.walletDetails).length > 0 ? (
                      Object.keys(this.state.walletDetails).map(function(
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
                        // console.log("^^^erc", me.props.isERC);
                        if (me.props.isERC) {
                          url =
                            "https://etherscan.io/token/" +
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
                              {parseFloat(details[index].amount).toFixed(8)}
                            </td>
                            <td>
                              {details[index].faldax_fee === "-"
                                ? details[index].faldax_fee
                                : parseFloat(details[index].faldax_fee).toFixed(
                                    8
                                  )}
                              {/* {parseFloat(details[index].faldax_fee).toFixed(8)} */}
                            </td>
                            <td>
                              {details[index].network_fees === "-"
                                ? details[index].network_fees
                                : parseFloat(
                                    details[index].network_fees
                                  ).toFixed(8)}
                              {/* {parseFloat(details[index].network_fees).toFixed(
                                8
                              )} */}
                            </td>
                            <td>
                              {parseFloat(details[index].total).toFixed(8)}
                            </td>
                            <td>
                              <a target="_blank" href={url}>
                                {details[index].transaction_id}
                              </a>
                            </td>
                            {/* <td>

                                </td> */}
                          </Col1>
                        );
                      })
                    ) : (
                      <TRDisplay>
                        <NDF colspan="5">No Data Found</NDF>
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

const mapStateToProps = state => {
  return {
    ...state,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
};

export default connect(mapStateToProps)(DetailsTable);
