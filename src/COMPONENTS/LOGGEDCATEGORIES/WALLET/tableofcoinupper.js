/* Built-in Packages */
import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon } from "antd";
import NumberFormat from "react-number-format";
import { translate } from "react-i18next";

/* Styled Components */
import { HistoryWrap } from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import {
  Head,
  SubHead,
  DropMenu,
  Col1,
  BitImg,
  BitText,
  Bit,
  BitPrice,
  Price,
  IconWrap,
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

/* Components */
import { globalVariables } from "Globals.js";
let { _AMAZONBUCKET } = globalVariables;
const OTwrap = styled.div``;
const BorderedHistoryWrap = styled(HistoryWrap)`
  overflow-x: auto;
  width: 100%;
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
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
  padding-top: 30px;
  font-family: "Open Sans";
  padding-bottom: 30px;
  @media (max-width: 575px) {
    display: block;
  }
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
      curr3: "\u20B9",
    };
    this.t = this.props.t;
  }

  /* Life Cycle Methods */
  componentWillReceiveProps(props, newProps) {
    var sign1, sign2, sign3;
    if (this.props.currencySeq[0] === "USD") {
      sign1 = "$";
    } else if (this.props.currencySeq[0] === "INR") {
      sign1 = "\u20B9";
    } else if (this.props.currencySeq[0] === "EUR") {
      sign1 = "\u20AC";
    }
    if (this.props.currencySeq[1] === "USD") {
      sign2 = "$";
    } else if (this.props.currencySeq[1] === "INR") {
      sign2 = "\u20B9";
    } else if (this.props.currencySeq[1] === "EUR") {
      sign2 = "\u20AC";
    }
    if (this.props.currencySeq[2] === "USD") {
      sign3 = "$";
    } else if (this.props.currencySeq[2] === "INR") {
      sign3 = "\u20B9";
    } else if (this.props.currencySeq[2] === "EUR") {
      sign3 = "\u20AC";
    }
    this.setState({
      drop1: this.props.currencySeq[0],
      drop2: this.props.currencySeq[1],
      drop3: this.props.currencySeq[2],
      curr1: sign1,
      curr2: sign2,
      curr3: sign3,
    });
  }

  /* 
        Page: /wallet
        This method is called when total USD is to passed to parent through callback function.
    */

  totalUSD(total) {
    this.props.totalUSD(total);
  }

  translateCurrency(currency) {
    switch (currency) {
      case "INR":
        return this.t("edit_profile_titles:currency_inr.message");
      case "EUR":
        return this.t("edit_profile_titles:currency_eur.message");
      case "USD":
        return this.t("settings:currency_usd.message");
      default:
        return this.t("settings:currency_usd.message");
    }
  }
  render() {
    let { tableData } = this.props;
    var me = this;
    var bool;
    if (this.props.noBalance === true) {
      bool = 1;
    } else {
      bool = 0;
    }
    const onClick1 = ({ key }) => {
      var curr, sign;
      if (key == 1) {
        curr = "INR";
        sign = "\u20B9";
      } else if (key == 2) {
        curr = "USD";
        sign = "$";
      } else if (key == 3) {
        curr = "EUR";
        sign = "\u20AC";
      }
      // console.log(key, curr)
      this.setState({ drop1: curr, curr1: sign }, () => {
        /* me.props.currChange(`${curr},${me.state.drop2},${me.state.drop3}`) */
      });
    };
    const onClick2 = ({ key }) => {
      var curr, sign;
      if (key == 1) {
        curr = "INR";
        sign = "\u20B9";
      } else if (key == 2) {
        curr = "USD";
        sign = "$";
      } else if (key == 3) {
        curr = "EUR";
        sign = "\u20AC";
      }
      this.setState({ drop2: curr, curr2: sign }, () => {
        /* me.props.currChange(`${me.state.drop1},${curr},${me.state.drop3}`) */
      });
    };
    const onClick3 = ({ key }) => {
      var curr, sign;
      if (key == 1) {
        curr = "INR";
        sign = "\u20B9";
      } else if (key == 2) {
        curr = "USD";
        sign = "$";
      } else if (key == 3) {
        curr = "EUR";
        sign = "\u20AC";
      }
      this.setState({ drop3: curr, curr3: sign }, () => {
        /* me.props.currChange(`${me.state.drop1},${me.state.drop2},${curr}`) */
      });
    };
    const menu1 = (
      <Menu onClick={onClick1}>
        <Menu.Item key="1">
          {this.t("edit_profile_titles:currency_inr.message")}
        </Menu.Item>
        <Menu.Item key="2">{this.t("settings:currency_usd.message")}</Menu.Item>
        <Menu.Item key="3">
          {this.t("edit_profile_titles:currency_eur.message")}
        </Menu.Item>
      </Menu>
    );
    const menu2 = (
      <Menu onClick={onClick2}>
        <Menu.Item key="1">
          {this.t("edit_profile_titles:currency_inr.message")}
        </Menu.Item>
        <Menu.Item key="2">{this.t("settings:currency_usd.message")}</Menu.Item>
        <Menu.Item key="3">
          {this.t("edit_profile_titles:currency_eur.message")}
        </Menu.Item>
      </Menu>
    );
    const menu3 = (
      <Menu onClick={onClick3}>
        <Menu.Item key="1">
          {this.t("edit_profile_titles:currency_inr.message")}
        </Menu.Item>
        <Menu.Item key="2">{this.t("settings:currency_usd.message")}</Menu.Item>
        <Menu.Item key="3">
          {this.t("edit_profile_titles:currency_eur.message")}
        </Menu.Item>
      </Menu>
    );
    return (
      <BorderedHistoryWrap>
        <OTwrap>
          <TableCoin cellpadding="10px" cellspacing="0" border="0">
            <thead>
              <Head>
                <SubHead>{this.t("coins_text_subhead.message")}</SubHead>
                <SubHead>
                  {this.translateCurrency(this.state.drop1)}
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
                  {this.translateCurrency(this.state.drop2)}
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
                  {this.translateCurrency(this.state.drop3)}
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
                  Object.keys(tableData).map(function (index, key) {
                    var img;
                    if (
                      tableData[index].coin_icon != undefined ||
                      tableData[index].coin_icon != null
                    )
                      img = _AMAZONBUCKET + tableData[index].coin_icon;
                    else img = _AMAZONBUCKET + "coin/defualt_coin.png";

                    let tableIndex = tableData[index];

                    // console.log(tableIndex, me.props.type, me.state.drop1);
                    return (
                      <Col1 className="tableofcoinupper">
                        <td>
                          <Link
                            to={`/walletDetails?coinID${bool}=${tableIndex.coin_code}`}
                          >
                            <BitImg src={img} />
                            <BitText>
                              <Bit>{tableIndex.coin_name}</Bit>
                              <BitPrice className="ajfdhksjdfh">
                                {
                                  <NumberFormat
                                    value={
                                      tableIndex.balance
                                        ? precision(
                                            parseFloat(tableIndex.balance)
                                          )
                                        : "0"
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={`${" "}${tableIndex.coin_code}`}
                                  />
                                }
                              </BitPrice>
                            </BitText>
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/walletDetails?coinID${bool}=${tableIndex.coin_code}`}
                          >
                            {tableIndex.quote !== null &&
                            tableIndex.balance !== undefined ? (
                              tableIndex.quote[`${me.state.drop1}`].price !==
                              undefined ? (
                                <Price>
                                  {me.state.curr1}
                                  {/* {console.log("HBDE", tableIndex.quote[`${me.state.drop1}`].price)} */}
                                  {
                                    <NumberFormat
                                      value={precisionTwo(
                                        parseFloat(
                                          tableIndex.quote[`${me.state.drop1}`]
                                            .price
                                        ) * parseFloat(tableIndex.balance)
                                      )}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                  }
                                </Price>
                              ) : (
                                <Price>-</Price>
                              )
                            ) : (
                              <Price>-</Price>
                            )}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/walletDetails?coinID${bool}=${tableIndex.coin_code}`}
                          >
                            {tableIndex.quote !== null &&
                            tableIndex.balance !== undefined ? (
                              tableIndex.quote[`${me.state.drop2}`].price !==
                              undefined ? (
                                <Price>
                                  {me.state.curr2}
                                  {/* {console.log("HBDE", tableIndex.quote[`${me.state.drop2}`].price)} */}
                                  {
                                    <NumberFormat
                                      value={precisionTwo(
                                        parseFloat(
                                          tableIndex.quote[`${me.state.drop2}`]
                                            .price
                                        ) * parseFloat(tableIndex.balance)
                                      )}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                  }
                                </Price>
                              ) : (
                                <Price>-</Price>
                              )
                            ) : (
                              <Price>-</Price>
                            )}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/walletDetails?coinID${bool}=${tableIndex.coin_code}`}
                          >
                            {tableIndex.quote !== null &&
                            tableIndex.balance !== undefined ? (
                              tableIndex.quote[`${me.state.drop3}`].price !==
                              undefined ? (
                                <Price>
                                  {/* {console.log("HBDE", tableIndex.quote[`${me.state.drop3}`].price)} */}
                                  <span>{me.state.curr3}</span>
                                  {
                                    <NumberFormat
                                      value={precisionTwo(
                                        parseFloat(
                                          tableIndex.quote[`${me.state.drop3}`]
                                            .price
                                        ) * parseFloat(tableIndex.balance)
                                      )}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                  }
                                </Price>
                              ) : (
                                <Price>-</Price>
                              )
                            ) : (
                              <Price>-</Price>
                            )}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/walletDetails?coinID${bool}=${tableIndex.coin_code}`}
                          >
                            <IconWrap>
                              <Icon type="right" />
                            </IconWrap>
                          </Link>
                        </td>
                      </Col1>
                    );
                  })
                ) : (
                  <NDF colSpan="5">{this.t("no_data_found_text.message")}</NDF>
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

export default translate(["wallet", "settings", "edit_profile_titles"])(
  connect(mapStateToProps)(TableofCoin)
);
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
function precisionTwo(x) {
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
  if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 2) {
    {
      x = parseFloat(x).toFixed(2);
      if (
        x.toString()[x.toString().length - 1] == "0" &&
        (x.toString().split(".")[1][0] != "0" ||
          x.toString().split(".")[1][5] != "0")
      ) {
        return parseFloat(x);
      } else if (x.toString().split(".")[1][1] == "0") {
        if (x.toString().split(".")[1][0] == "0") {
          return parseFloat(x).toFixed(0);
        } else return parseFloat(x).toFixed(1);
      }
    }
  }
  return x;
}
