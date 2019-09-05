/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

/* STYLED-COMPONENTS */
import { TableHeader, TableContent, ScrollTableContent } from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

export const OrderWrap = styled.div`
    margin-left:30px;
    margin-right:30px;
    border:1px solid #d8d8d8;
    &::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
       }
     
       &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.mode === 'dark' ? '#041624' : ''};
        border-radius: 3px;
       }
        &::-webkit-scrollbar-track{
            background: ${props => props.theme.mode === 'dark' ? '#072135' : ""};
        }
`
export const HTable = styled(Table)`
>thead
{
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "#f5f6fa"};
    color:#174c7e;
    border:none;
}
>thead>tr>th
{
    border:0px;
}
& tbody
{
    color:${props => props.theme.mode === "dark" ? "white" : "black"} ;
    font-size: 14px;
    font-family: "Open Sans";
    font-weight:600;
}
>tbody>tr:nth-of-type(odd)
{
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "#f9f9f9"};
}`
const SideType = styled.td`
    color:${props => props.type === "Sell" ? "#f13239" : "#4fb153"};
`
const NDF = styled.p`
    text-align: center; 
    font-weight: 600;
    font-size: 17px;
    color: ${props => props.theme.mode === "dark" ? "white" : "black"};
    margin-top: 30px;
    font-family: Open Sans;
`
export const OTwrap = styled.div`
    
`

class OrderTrade extends Component {
    constructor(props) {
        super(props);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    /* 
        Page: /trade --> Orders and Trades
        This method is called when u cancel an order and parent callback method is called.
    */

    cancelOrder(id, side, type) {
        this.props.cancelOrder(id, side, type)
    }

    render() {
        var self = this;
        return (
            <OrderWrap>
                <OTwrap>
                    <div className="tbl-header">
                        <TableHeader cellpadding="10px" cellspacing="0" border="0">
                            {/* <HTable striped responsive> */}
                            <thead>
                                <tr>
                                    <th>SIDE</th>
                                    <th>AMOUNT</th>
                                    {self.props.pending !== 2 ? <th>PRICE</th> : <th>LIMIT PRICE</th>}
                                    {self.props.pending !== 2 ? <th>UNFILLED</th> : <th>STOP PRICE</th>}
                                    <th>FILL PRICE</th>
                                    <th>TYPE</th>
                                    <th>TIME</th>
                                    <th>Total</th>
                                    {self.props.pending === 2 ? <th>ACTIONS</th> : ""}
                                </tr>
                            </thead>
                        </TableHeader>
                    </div>
                </OTwrap>
                <OTwrap>
                    <ScrollTableContent >
                        <Scrollbars
                            style={{ height: this.props.height }}
                            className="scrollbar">
                            <TableContent cellpadding="10px" cellspacing="0" border="0">
                                <tbody>
                                    {this.props.orderTradeData.length > 0
                                        ?
                                        this.props.orderTradeData.map(function (data) {
                                            var date
                                            if (self.props.profileDetails.date_format === "MM/DD/YYYY")
                                                date = moment.utc(data.created_at).local().format("MM/DD/YYYY, H:m:s")
                                            else if (self.props.profileDetails.date_format === "DD/MM/YYYY")
                                                date = moment.utc(data.created_at).local().format("DD/MM/YYYY, H:m:s")
                                            else
                                                date = moment.utc(data.created_at).local().format("MMM D, YYYY, H:m:s")
                                            var Filled = data.fix_quantity - data.quantity;
                                            return (
                                                <tr>
                                                    <SideType type={data.side}>{data.side}</SideType>
                                                    <td>{data.quantity.toFixed(4)} {data.settle_currency}</td>
                                                    <td>{self.props.pending !== 2 ? (data.order_type === "Market" ? data.order_type : data.limit_price) : data.limit_price}</td>
                                                    <SideType type={data.side}>{self.props.pending !== 2 ? Filled.toFixed(4) : (data.stop_price !== undefined ? data.stop_price : 0)}</SideType>
                                                    <td>{data.fill_price} {data.currency}</td>
                                                    <td>{data.order_type}</td>
                                                    <td>{date}</td>
                                                    <td>{self.props.pending === 2 ? (data.quantity * data.limit_price).toFixed(4) : (data.quantity * data.fill_price).toFixed(4)}</td>
                                                    {self.props.pending === 2 ? <th ><span onClick={() => self.cancelOrder(data.id, data.side, data.order_type)}><Icon style={{ color: "#279CED", fontSize: "18px" }
                                                    } type="close-circle" /></span></th> : ''}
                                                </tr>
                                            );
                                        })
                                        : <NDF >No Data Found</NDF>
                                    }
                                </tbody>
                            </TableContent>
                        </Scrollbars>
                    </ScrollTableContent>
                </OTwrap>
            </OrderWrap>
        )
    }
}

export default OrderTrade;