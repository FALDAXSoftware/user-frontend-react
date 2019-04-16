import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { Menu, Dropdown, Icon } from 'antd';

import { Scrollbars } from 'react-custom-scrollbars';
import { TableHeader, TableContent, ScrollTableContent } from "../../../styled-components/loggedStyle/tradeStyle";
import { Head, Sub_head, DropMenu, Col1, Bit_img, Bit_text, Bit, Bit_price, Price, Icon_wrap } from "../../../styled-components/loggedStyle/walletStyle";

const Table_coin = styled(Table)`
    @media(max-width:1160px)
    {
        min-width:1160px;
    }
`

const TableContentRide = styled(TableContent)`
>tbody>tr:nth-of-type(even)
{
    background-color:${props => props.theme.mode == "dark" ? "" : "white"};
}
>tbody>tr>td
{
    border-top: 1px solid #ddd;
    word-break:break-all;
}
`
export const OTwrap = styled.div`
    @media(max-width:991px)
    {
       min-width:1100px;
    }
`
export const Order_wrap = styled.div`
    margin-left:30px;
    margin-right:30px;
    border:1px solid #d8d8d8;
    &::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
       }
     
       &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.mode == 'dark' ? '#041624' : ''};
        border-radius: 3px;
       }
        &::-webkit-scrollbar-track{
            background: ${props => props.theme.mode == 'dark' ? '#072135' : ""};
        }
`
const Order_wrapRide = styled(Order_wrap)`
    margin-left:0px;
    margin-right:0px;
    border:none;
    @media(max-width:991px)
    {
        min-width:1200px;
    }
`
const menu = (
    <Menu>
        <Menu.Item key="0">INR</Menu.Item>
        <Menu.Item key="1">USD</Menu.Item>
        <Menu.Item key="3">EUR</Menu.Item>
    </Menu>
);
let total = 0;


class DetailsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            walletDetails: {

            }
        };

    }
    componentWillReceiveProps(props, newProps) {

    }
    componentDidMount() {
        if (Object.keys(this.props.wallet).length > 0)
            this.setState({
                walletDetails: this.props.wallet
            });
    }
    totalUSD(total) {
        this.props.totalUSD(total)
    }
    render() {
        let { tableData } = this.props;
        var me = this;
        return (<Order_wrapRide>
            <OTwrap>
                <div class="tbl-header">
                    <TableHeader cellpadding="10px" cellspacing="0" border="0">
                        {/* <Table_coin condensed> */}
                        <thead>
                            <Head wallet>
                                <Sub_head>Date</Sub_head>
                                <Sub_head>
                                    SEND/RECEIVE
                            </Sub_head>
                                <Sub_head>
                                    SOURCE ADDRESS
                            </Sub_head>
                                <Sub_head>
                                    DESTINATION ADDRESS
                            </Sub_head>
                                <Sub_head>
                                    AMOUNT
                            </Sub_head>
                                {/* <Sub_head>USD
                                <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                            </Dropdown>
                        </Sub_head> */}
                            </Head>
                        </thead>
                    </TableHeader>
                </div>
            </OTwrap>
            <OTwrap>
                <ScrollTableContent >
                    <Scrollbars
                        style={{ height: "500px" }}
                        className="scrollbar">
                        <TableContentRide cellpadding="10px" cellspacing="0" border="0">
                            <tbody>

                                {this.state.walletDetails !== null ? Object.keys(this.state.walletDetails).length > 0 ? Object.keys(this.state.walletDetails).map(function (index, key) {
                                    var date = moment.utc(me.state.walletDetails[index].created_at).local().format(`${me.props.profileDetails.date_format}`);
                                    var details = me.state.walletDetails;

                                    return (
                                        <Col1 wallet>
                                            <td>
                                                <div>{date}</div>
                                            </td>
                                            <td>
                                                {details[index].transaction_type == "buy" ? <span><Icon style={{ color: "green", fontSize: "20px" }} type="download" /> RECEIVED</span> : <span><Icon style={{ color: "red", fontSize: "20px" }} type="upload" /> SENT</span>}
                                            </td>
                                            <td>
                                                {details[index].source_address}
                                            </td>
                                            <td>
                                                {details[index].destination_address}
                                            </td>
                                            <td>
                                                {details[index].amount}
                                            </td>
                                            {/* <td>

                                </td> */}
                                        </Col1>
                                    );
                                })
                                    : <tr><td colspan="5" style={{
                                        textAlign: "center", fontWeight: "600", fontSize: "17px",
                                        color: "black", paddingTop: "30px", fontFamily: "Open Sans"
                                    }}>No Data Found</td></tr> : ""}
                            </tbody>
                        </TableContentRide>
                    </Scrollbars>
                </ScrollTableContent>
            </OTwrap>
        </Order_wrapRide >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
    }
}

export default connect(mapStateToProps)(DetailsTable);