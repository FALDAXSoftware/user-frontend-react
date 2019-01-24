import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Menu, Dropdown, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";

import { Head, Sub_head, DropMenu, Col1, Bit_img, Bit_text, Bit, Bit_price, Price, Icon_wrap } from "../../../styled-components/loggedStyle/walletStyle";
import { globalVariables } from '../../../Globals';
let { amazon_Bucket } = globalVariables;

const Table_coin = styled(Table)`
    @media(max-width:1160px)
    {
        min-width:1160px;
    }
`

export default class TableofCoin extends React.Component {
    constructor(props) {
        super(props)
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
        console.log(this.props)
        let { tableData } = this.props;
        const onClick1 = ({ key }) => {
            console.log(key, this.props)
            var curr, sign;
            if (key == 1) { curr = "INR"; sign = "\u20B9"; }
            else if (key == 2) { curr = "USD"; sign = "$"; }
            else if (key == 3) { curr = "EUR"; sign = "\u20AC"; }
            this.setState({ drop1: curr, curr1: sign }, () => { me.props.currChange(`${curr},${me.state.drop2},${me.state.drop3}`) });
        };
        const onClick2 = ({ key }) => {
            var curr, sign;
            if (key == 1) { curr = "INR"; sign = "\u20B9"; }
            else if (key == 2) { curr = "USD"; sign = "$"; }
            else if (key == 3) { curr = "EUR"; sign = "\u20AC"; }
            this.setState({ drop2: curr, curr2: sign }, () => { me.props.currChange(`${me.state.drop1},${curr},${me.state.drop3}`) });
        };
        const onClick3 = ({ key }) => {
            console.log(key == 3, this.state)
            var curr, sign;
            if (key == 1) { curr = "INR"; sign = "\u20B9"; }
            else if (key == 2) { curr = "USD"; sign = "$"; }
            else if (key == 3) { curr = "EUR"; sign = "\u20AC"; }
            this.setState({ drop3: curr, curr3: sign }, () => { me.props.currChange(`${me.state.drop1},${me.state.drop2},${curr}`) });
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
            <Table_coin condensed>
                <div class="tbl-header">
                    <TableHeader cellpadding="10px" cellspacing="0" border="0">
                        <thead>
                            <Head>
                                <Sub_head>Coins</Sub_head>
                                <Sub_head>{this.state.drop1}
                                    <Dropdown overlay={menu1} trigger={['click']}>
                                        <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                                    </Dropdown>
                                </Sub_head>
                                <Sub_head>{this.state.drop2}
                                    <Dropdown overlay={menu2} trigger={['click']}>
                                        <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                                    </Dropdown>
                                </Sub_head>
                                <Sub_head>{this.state.drop3}
                                    <Dropdown overlay={menu3} trigger={['click']}>
                                        <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                                    </Dropdown>
                                </Sub_head>
                                <Sub_head></Sub_head>
                            </Head>
                        </thead>
                    </TableHeader>
                </div >
                <div class="tbl-content">
                    <Scrollbars
                        style={{ height: 600 }}>
                        <TableContent cellpadding="10px" cellspacing="0" border="0">
                            <tbody>
                                {console.log(tableData)}
                                {tableData !== undefined && tableData !== null ? tableData.length > 0 ? Object.keys(tableData).map(function (index, key) {
                                    var img;
                                    if (tableData[index].coin_icon !== null)
                                        img = amazon_Bucket + tableData[index].coin_icon
                                    else
                                        img = amazon_Bucket + "coin/defualt_coin.png"
                                    return (
                                        <Col1>
                                            <td style={{ textAlign: "left" }}>
                                                <Bit_img src={img} />
                                                <Bit_text><Bit_price>0.5433 {tableData[index].coin_code}</Bit_price></Bit_text>
                                            </td>
                                            <td>{tableData[index].USD !== undefined ? <Price>{me.state.curr1} {tableData[index].USD}</Price> : <Price>-</Price>}</td>
                                            <td>{tableData[index].EUR !== undefined ? <Price>{me.state.curr2} {tableData[index].EUR} </Price> : <Price>-</Price>}</td>
                                            <td>{tableData[index].INR !== undefined ? <Price><span>{me.state.curr3}</span> {tableData[index].INR} </Price> : <Price>-</Price>}</td>
                                            <td>
                                                <Icon_wrap>
                                                    <Icon type="right" />
                                                </Icon_wrap>
                                            </td>
                                        </Col1>
                                    );
                                }) : <p style={{
                                    textAlign: "center", fontWeight: "600", fontSize: "17px",
                                    color: "black", marginTop: "30px", fontFamily: "Open Sans"
                                }}>No Data Found</p>

                                    : ""}
                            </tbody>
                        </TableContent>
                    </Scrollbars>

                </div>
            </Table_coin >
        );
    }
}