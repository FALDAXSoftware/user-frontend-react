/* In-built packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Menu, Dropdown, Icon } from "antd";

/* styled components */
import {
  Head,
  Sub_head,
  DropMenu,
  Col1,
  Bit_img,
  Bit_text,
  Bit_price,
  Price,
  Icon_wrap
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

/* components */
import { NDF } from "./tableofcoinupper";
import { globalVariables } from "Globals.js";

let { _AMAZONBUCKET } = globalVariables;

const TableCoin = styled.table`
  width: 100%;
  & th {
    text-align: center;
  }
  & td:not(first-child) {
    text-align: center;
  }
  & tbody {
    max-height: 600px;
    overflow-y: auto;
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

export default class TableofCoin extends Component {
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

  render() {
    var me = this;
    let { tableData } = this.props;
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
      <TableCoin cellpadding="10px" cellspacing="0" border="0">
        <thead>
          <Head>
            <Sub_head>Coins</Sub_head>
            <Sub_head>
              {this.state.drop1}
              <Dropdown overlay={menu1} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  style={{ verticalAlign: "middle" }}
                  href="#"
                >
                  <DropMenu type="down" />
                </a>
              </Dropdown>
            </Sub_head>
            <Sub_head>
              {this.state.drop2}
              <Dropdown overlay={menu2} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  style={{ verticalAlign: "middle" }}
                  href="#"
                >
                  <DropMenu type="down" />
                </a>
              </Dropdown>
            </Sub_head>
            <Sub_head>
              {this.state.drop3}
              <Dropdown overlay={menu3} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  style={{ verticalAlign: "middle" }}
                  href="#"
                >
                  <DropMenu type="down" />
                </a>
              </Dropdown>
            </Sub_head>
          </Head>
        </thead>
        <tbody>
          {tableData !== undefined && tableData !== null ? (
            tableData.length > 0 ? (
              Object.keys(tableData).map(function(index, key) {
                var img;
                if (tableData[index].coin_icon !== null)
                  img = _AMAZONBUCKET + tableData[index].coin_icon;
                else img = _AMAZONBUCKET + "coin/defualt_coin.png";
                return (
                  <Col1 className="lofcoins">
                    <td style={{ textAlign: "left" }}>
                      <Bit_img src={img} />
                      <Bit_text>
                        <Bit_price>
                          0.5433 {tableData[index].coin_code}
                        </Bit_price>
                      </Bit_text>
                    </td>
                    <td>
                      {tableData[index].USD !== undefined ? (
                        <Price>
                          {me.state.curr1} {tableData[index].USD}
                        </Price>
                      ) : (
                        <Price>-</Price>
                      )}
                    </td>
                    <td>
                      {tableData[index].EUR !== undefined ? (
                        <Price>
                          {me.state.curr2} {tableData[index].EUR}{" "}
                        </Price>
                      ) : (
                        <Price>-</Price>
                      )}
                    </td>
                    <td>
                      {tableData[index].INR !== undefined ? (
                        <Price>
                          <span>{me.state.curr3}</span> {tableData[index].INR}{" "}
                        </Price>
                      ) : (
                        <Price>-</Price>
                      )}
                    </td>
                    <td>
                      <Icon_wrap>
                        <Icon type="right" />
                      </Icon_wrap>
                    </td>
                  </Col1>
                );
              })
            ) : (
              <NDF>No Data Found</NDF>
            )
          ) : (
            ""
          )}
        </tbody>
      </TableCoin>
    );
  }
}
