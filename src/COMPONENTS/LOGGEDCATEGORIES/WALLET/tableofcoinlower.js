/* Built-in packages*/
import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";

/* styled components */
import { OTwrap } from "../TRADE/ordertrade";
import { HistoryWrap } from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import {
  Head,
  SubHead,
  DropMenu,
  Col1
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

/* components */
import { globalVariables } from "Globals.js";
let { _AMAZONBUCKET } = globalVariables;

const BorderedHistoryWrap = styled(HistoryWrap)`
  overflow-x: auto;
  width: 100%;
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

const TableCoin = styled.table`
  width: 100%;
  & th {
    text-align: center;
  }
  & td:not(first-child) {
    text-align: center;
  }
  & tbody {
    max-height: 500px;
    overflow-y: auto;
  }
  @media (max-width: 767px) {
    min-width: 700px;
  }
  @media (max-width: 575px) {
    & tbody {
      display: block;
    }
    & thead {
      display: block;
    }
  }
`;
export const NDF = styled.td`
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
  padding-top: 30px;
  font-family: "Open Sans";
`;

class TableofCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drop1: "USD",
      drop2: "EUR",
      drop3: "INR",
      curr1: "$",
      curr2: "\u20AC",
      curr3: "\u20B9"
    };
  }

  /* 
        Page: /wallet
        This method is called when total USD is to passed to parent through callback function.
    */

  totalUSD(total) {
    this.props.totalUSD(total);
  }

  render() {
    let { tableData } = this.props;
    var me = this;
    const onClick1 = ({ key }) => {
      var curr, sign;
      if (key === 1) {
        curr = "INR";
        sign = "\u20B9";
      } else if (key === 2) {
        curr = "USD";
        sign = "$";
      } else if (key === 3) {
        curr = "EUR";
        sign = "\u20AC";
      }
      this.setState({ drop1: curr, curr1: sign }, () => {
        me.props.currChange(`${curr},${me.state.drop2},${me.state.drop3}`);
      });
    };
    const onClick2 = ({ key }) => {
      var curr, sign;
      if (key === 1) {
        curr = "INR";
        sign = "\u20B9";
      } else if (key === 2) {
        curr = "USD";
        sign = "$";
      } else if (key === 3) {
        curr = "EUR";
        sign = "\u20AC";
      }
      this.setState({ drop2: curr, curr2: sign }, () => {
        me.props.currChange(`${me.state.drop1},${curr},${me.state.drop3}`);
      });
    };
    const onClick3 = ({ key }) => {
      var curr, sign;
      if (key === 1) {
        curr = "INR";
        sign = "\u20B9";
      } else if (key === 2) {
        curr = "USD";
        sign = "$";
      } else if (key === 3) {
        curr = "EUR";
        sign = "\u20AC";
      }
      this.setState({ drop3: curr, curr3: sign }, () => {
        me.props.currChange(`${me.state.drop1},${me.state.drop2},${curr}`);
      });
    };
    const menu1 = (
      <Menu onClick={onClick1}>
        <Menu.Item key="1">INR</Menu.Item>
        <Menu.Item key="2">USD</Menu.Item>
        <Menu.Item key="3">EUR</Menu.Item>
      </Menu>
    );
    const menu2 = (
      <Menu onClick={onClick2}>
        <Menu.Item key="1">INR</Menu.Item>
        <Menu.Item key="2">USD</Menu.Item>
        <Menu.Item key="3">EUR</Menu.Item>
      </Menu>
    );
    const menu3 = (
      <Menu onClick={onClick3}>
        <Menu.Item key="1">INR</Menu.Item>
        <Menu.Item key="2">USD</Menu.Item>
        <Menu.Item key="3">EUR</Menu.Item>
      </Menu>
    );
    return (
      <BorderedHistoryWrap>
        <OTwrap>
          <TableCoin cellpadding="10px" cellspacing="0" border="0">
            <thead>
              <Head>
                <SubHead>Coins</SubHead>
                <SubHead>
                  {this.state.drop1}
                  <Dropdown overlay={menu1} trigger={["click"]}>
                    <a
                      className="ant-dropdown-link"
                      // style={{ verticalAlign: "middle" }}
                      href="#"
                    >
                      <DropMenu type="down" />
                    </a>
                  </Dropdown>
                </SubHead>
                <SubHead>
                  {this.state.drop2}
                  <Dropdown overlay={menu2} trigger={["click"]}>
                    <a
                      className="ant-dropdown-link"
                      // style={{ verticalAlign: "middle" }}
                      href="#"
                    >
                      <DropMenu type="down" />
                    </a>
                  </Dropdown>
                </SubHead>
                <SubHead>
                  {this.state.drop3}
                  <Dropdown overlay={menu3} trigger={["click"]}>
                    <a
                      className="ant-dropdown-link"
                      // style={{ verticalAlign: "middle" }}
                      href="#"
                    >
                      <DropMenu type="down" />
                    </a>
                  </Dropdown>
                </SubHead>
                <SubHead></SubHead>
              </Head>
            </thead>
            <tbody>
              {tableData !== undefined && tableData !== null ? (
                tableData.length > 0 ? (
                  Object.keys(tableData).map(function(index, key) {
                    var img;
                    if (
                      tableData[index].coin_icon != undefined ||
                      tableData[index].coin_icon != null
                    )
                      img = _AMAZONBUCKET + tableData[index].coin_icon;
                    else img = _AMAZONBUCKET + "coin/defualt_coin.png";

                    return (
                      <Col1>
                        {/* <td style={{ textAlign: "left" }}>
                                            <Link to={`/walletDetails?coinID=${tableData[index].coin}`}>
                                                <Bit_img src={img} />
                                                <Bit_text><Bit>{tableData[index].coin_name}</Bit><Bit_price>{parseFloat(tableData[index].balance).toFixed(4)} {tableData[index].coin_code}</Bit_price></Bit_text>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/walletDetails?coinID=${tableIndex.coin}`}>
                                                {tableIndex[`${me.state.drop1}`] !== undefined ? <Price>{me.state.curr1} {parseFloat(parseFloat(tableIndex[`${me.state.drop1}`]) * parseFloat(tableIndex.balance)).toFixed(4)}</Price> : <Price>-</Price>}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/walletDetails?coinID=${tableIndex.coin}`}>
                                                {tableIndex[`${me.state.drop2}`] !== undefined ? <Price>{me.state.curr2} {parseFloat(parseFloat(tableIndex[`${me.state.drop2}`]) * parseFloat(tableIndex.balance)).toFixed(4)} </Price> : <Price>-</Price>}
                                            </Link>
                                        </td>
                                        <td><Link to={`/walletDetails?coinID=${tableIndex.coin}`}>
                                            {tableIndex[`${me.state.drop3}`] !== undefined ? <Price><span>{me.state.curr3}</span> {parseFloat(parseFloat(tableIndex[`${me.state.drop3}`]) * parseFloat(tableIndex.balance)).toFixed(4)} </Price> : <Price>-</Price>}
                                        </Link>
                                        </td>
                                        <td>
                                            <Link to={`/walletDetails?coinID=${tableData[index].coin}`}>
                                                <Icon_wrap>
                                                    <Icon type="right" />
                                                </Icon_wrap>
                                            </Link>
                                        </td> */}
                      </Col1>
                    );
                  })
                ) : (
                  <NDF colSpan="5">No Data Found</NDF>
                )
              ) : (
                ""
              )}
            </tbody>
          </TableCoin>
        </OTwrap>
      </BorderedHistoryWrap>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(TableofCoin);
