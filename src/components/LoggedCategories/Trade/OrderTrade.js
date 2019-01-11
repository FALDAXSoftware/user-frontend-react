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


class OrderTrade extends Component {
    constructor(props) {
        super(props);
        this.cancelOrder = this.cancelOrder.bind(this);
    }
    cancelOrder(id, side, type) {
        console.log(id, side, type)
        this.props.cancelOrder(id, side, type)
    }
    render() {
        var self = this;
        return (
            <Order_wrap>
                <div class="tbl-header">

                    <TableHeader cellpadding="10px" cellspacing="0" border="0">
                        {/* <HTable striped responsive> */}
                        <thead>
                            <tr>
                                <th>SIDE</th>
                                <th>AMOUNT</th>
                                <th>PRICE</th>
                                <th>FILLED</th>
                                <th>FILL PRICE</th>
                                <th>TYPE</th>
                                <th>TIME</th>
                                <th>Total</th>
                                {self.props.pending == 2 ? <th>ACTIONS</th> : ""}
                            </tr>
                        </thead>
                    </TableHeader>
                </div>
                <div class="tbl-content">
                    <Scrollbars
                        style={{ height: 300 }}>
                        <TableContent cellpadding="10px" cellspacing="0" border="0">
                            <tbody>
                                {console.log(this.props.orderTradeData)}
                                {this.props.orderTradeData.length > 0
                                    ?
                                    this.props.orderTradeData.map(function (data) {
                                        console.log(data)
                                        var date = moment.utc(data.created_at).local().format("MMM DD,YYYY HH:mm:ss");
                                        return (
                                            <tr>
                                                <td>{data.side}</td>
                                                <td>{data.quantity}</td>
                                                <td>{data.order_type == "Market" ? data.order_type : data.limit_price}</td>
                                                <td>{data.fix_quantity - data.quantity}</td>
                                                <td>{data.fill_price}</td>
                                                <td>{data.order_type}</td>
                                                <td>{date}</td>
                                                <td>{data.quantity * data.fill_price}</td>
                                                {self.props.pending == 2 ? <th ><span onClick={() => self.cancelOrder(data.id, data.side, data.order_type)}><Icon style={{ color: "#279CED", fontSize: "18px" }
                                                } type="close-circle" /></span></th> : ''}
                                            </tr>
                                        );
                                    })
                                    : ""
                                }
                            </tbody>
                        </TableContent>
                    </Scrollbars>
                </div>
            </Order_wrap>
        )
    }
}

export default OrderTrade;
