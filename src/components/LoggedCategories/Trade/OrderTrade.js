import React, { Component } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Icon } from 'antd';

import { Scrollbars } from 'react-custom-scrollbars';

import { History_wrap, TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";

export const Order_wrap = styled.div`
    margin-left:30px;
    margin-right:30px;
    border:1px solid #d8d8d8;
    overflow-x:scroll;
`
export const HTable = styled(Table)`
>thead
{
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
    color:#174c7e;
    border:none;
}
>thead>tr>th
{
    border:0px;
}
& tbody
{
    color:${props => props.theme.mode == "dark" ? "white" : "black"} ;
    font-size: 14px;
    font-family: "Open Sans";
    font-weight:600;
}
>tbody>tr:nth-of-type(odd)
{
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f9f9f9"};
}`
const SideType = styled.td`
    color:${props => props.type == "Sell" ? "#f13239" : "#4fb153"};
`
export const OTwrap = styled.div`
    min-width:767px;
`

class OrderTrade extends Component {
    constructor(props) {
        super(props);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    cancelOrder(id, side, type) {
        this.props.cancelOrder(id, side, type)
    }

    render() {
        var self = this;
        return (
            <Order_wrap>
                <OTwrap>
                    <div class="tbl-header">
                        <TableHeader cellpadding="10px" cellspacing="0" border="0">
                            {/* <HTable striped responsive> */}
                            <thead>
                                <tr>
                                    <th>SIDE</th>
                                    <th>AMOUNT</th>
                                    {self.props.pending !== 2 ? <th>PRICE</th> : <th>LIMIT PRICE</th>}
                                    {self.props.pending !== 2 ? <th>FILLED</th> : <th>STOP PRICE</th>}
                                    <th>FILL PRICE</th>
                                    <th>TYPE</th>
                                    <th>TIME</th>
                                    <th>Total</th>
                                    {self.props.pending == 2 ? <th>ACTIONS</th> : ""}
                                </tr>
                            </thead>
                        </TableHeader>
                    </div>
                </OTwrap>
                <OTwrap>
                    <div class="tbl-content">
                        <Scrollbars
                            style={{ height: 300 }}>
                            <TableContent cellpadding="10px" cellspacing="0" border="0">
                                <tbody>
                                    {this.props.orderTradeData.length > 0
                                        ?
                                        this.props.orderTradeData.map(function (data) {
                                            var date = moment.utc(data.created_at).local().format("MMM DD,YYYY HH:mm:ss");
                                            var Filled = data.fix_quantity - data.quantity;
                                            return (
                                                <tr>
                                                    <SideType type={data.side}>{data.side}</SideType>
                                                    <td>{data.quantity}</td>
                                                    <td>{self.props.pending !== 2 ? (data.order_type == "Market" ? data.order_type : data.limit_price) : data.limit_price}</td>
                                                    <SideType type={data.side}>{self.props.pending !== 2 ? Filled.toFixed(4) : (data.stop_price !== undefined ? data.stop_price : 0)}</SideType>
                                                    <td>{data.fill_price}</td>
                                                    <td>{data.order_type}</td>
                                                    <td>{date}</td>
                                                    <td>{(data.quantity * data.fill_price).toFixed(4)}</td>
                                                    {self.props.pending == 2 ? <th ><span onClick={() => self.cancelOrder(data.id, data.side, data.order_type)}><Icon style={{ color: "#279CED", fontSize: "18px" }
                                                    } type="close-circle" /></span></th> : ''}
                                                </tr>
                                            );
                                        })
                                        : <p style={{
                                            textAlign: "center", fontWeight: "600", fontSize: "17px",
                                            color: "black", marginTop: "30px", fontFamily: "Open Sans"
                                        }}>No Data Found</p>
                                    }
                                </tbody>
                            </TableContent>
                        </Scrollbars>
                    </div>
                </OTwrap>
            </Order_wrap>
        )
    }
}

export default OrderTrade;
