import React from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import styled from 'styled-components';
import moment from 'moment';
import { Menu, Icon } from 'antd';

import { Scrollbars } from 'react-custom-scrollbars';
import { TableHeader, TableContent, ScrollTableContent } from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import { Head, Sub_head, Col1 } from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

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
const NDF = styled.td`
    text-align: center;
    font-weight: 600;
    font-size: 17px;
    color: ${props => props.theme.mode == "dark" ? "white" : "black"};
    padding-top: 80px !important;
    font-family: Open Sans;
`
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
    componentWillReceiveProps(props, newProps) {
        if (props.wallet !== undefined && props.wallet !== null) {
            if (props.wallet.length > 0)
                this.setState({
                    walletDetails: props.wallet
                });
        }
    }
    componentDidMount() {
        if (this.props.wallet.length > 0)
            this.setState({
                walletDetails: this.props.wallet
            });
    }
    totalUSD(total) {
        this.props.totalUSD(total)
    }
    render() {
        var me = this;
        return (<Order_wrapRide>
            <OTwrap>
                <div className="tbl-header">
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
                                                {details[index].transaction_type == "receive" ? <span><Icon style={{ color: "green", fontSize: "20px" }} type="download" /> RECEIVED</span> : <span><Icon style={{ color: "red", fontSize: "20px" }} type="upload" /> SENT</span>}
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
                                    : <tr><NDF colspan="5" >No Data Found</NDF></tr> : ""}
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