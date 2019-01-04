import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Menu, Dropdown, Icon } from 'antd';

import { Head, Sub_head, DropMenu, Col1, Bit_img, Bit_text, Bit, Bit_price, Price, Icon_wrap } from "../../../styled-components/loggedStyle/walletStyle";

const Table_coin = styled(Table)`
    @media(max-width:1160px)
    {
        min-width:1160px;
    }
`

const menu = (
    <Menu>
        <Menu.Item key="0">INR</Menu.Item>
        <Menu.Item key="1">USD</Menu.Item>
        <Menu.Item key="3">EUR</Menu.Item>
    </Menu>
);
export default class TableofCoin extends React.Component {
    render() {
        let { tableData } = this.props;
        return (
            <Table_coin condensed>
                <thead>
                    <Head>
                        <Sub_head>Coins</Sub_head>
                        <Sub_head>USD
                                <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                            </Dropdown>
                        </Sub_head>
                        <Sub_head>EUR
                                <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                            </Dropdown>
                        </Sub_head>
                        <Sub_head>INR
                                <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                            </Dropdown>
                        </Sub_head>
                        <Sub_head></Sub_head>
                    </Head>
                </thead>
                <tbody>
                    {console.log(this.props.tableData)}
                    {this.props.tableData !== undefined ? Object.keys(tableData).map(function (index, key) {
                        console.log(index, key)
                        return (
                            <Col1>
                                <td>
                                    <Bit_img src="/images/LoggedCat/Bit_img.png" />
                                    <Bit_text><Bit_price>0.5433 {tableData[index].coin_code}</Bit_price></Bit_text>
                                </td>
                                <td>{tableData[index].USD !== undefined ? <Price>$ {tableData[index].USD}</Price> : <Price>-</Price>}</td>
                                <td>{tableData[index].EUR !== undefined ? <Price>{"\u20AC"} {tableData[index].EUR} </Price> : <Price>-</Price>}</td>
                                <td>{tableData[index].INR !== undefined ? <Price>&#8377; {tableData[index].INR} </Price> : <Price>-</Price>}</td>
                                <td>
                                    <Icon_wrap>
                                        <Icon type="right" />
                                    </Icon_wrap>
                                </td>
                            </Col1>
                        );
                    })

                        : ""}
                </tbody>
            </Table_coin>
        );
    }
}