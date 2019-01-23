import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { BBC2, Total_BTC, Buy_table, History_wrap, TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";
import { Spin } from 'antd';
import {
    Spin_single
} from "../../../styled-components/loggedStyle/dashStyle"
import { Scrollbars } from 'react-custom-scrollbars';

import { OTwrap } from './OrderTrade';
import { globalVariables } from "../../../Globals";
const APP_URL = globalVariables.API_URL;

const OTwrap2 = styled(OTwrap)`
    min-width:auto;
    @media(max-width:991px)
    {
        min-width:767px;
    }
`

class SellTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            crypto: "XRP",
            currency: "BTC",
            lastsum: 0,
            loader: false,
            result: []
        }
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        var self = this;
        if (this.props.cryptoPair !== undefined && this.props.cryptoPair !== "") {
            this.setState({ crypto: this.props.cryptoPair.crypto, currency: this.props.cryptoPair.currency }, () => {
                self.sellTableData();
            })
        }
    }
    sellTableData() {
        let io = this.props.io
        io.sails.url = APP_URL;
        var URL;
        this.setState({ loader: true })
        if (this.props.cryptoPair.prevRoom !== undefined && Object.keys(this.props.cryptoPair.prevRoom).length > 0) {
            URL = `/socket/get-sell-book?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`
        }
        else {
            URL = `/socket/get-sell-book?room=${this.state.crypto}-${this.state.currency}`
        }
        console.log(URL)
        io.socket.get(URL, (body, JWR) => {


            if (body.status == 200) {
                let res = body.data;


                this.updateData(res);
            }
        });
        io.socket.on('sellbookUpdate', (data) => {
            this.updateData(data);
        });
    }
    updateData(data) {
        console.log(data)
        const rows = [];
        let sum = 0;
        let lastsum
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            sum = sum + element.quantity;
            rows.push({
                my_size: 0,
                amount: element.quantity,
                ask: element.price,
                total: sum,
            });
            lastsum = sum;
        }
        var preArr = [];
        var final_result = [];
        console.log(rows)
        for (let i = 0; i < rows.length; i++) {

            if (preArr.includes(rows[i].ask)) {

            }
            else {
                var count = 0;
                var result = {
                    amount: rows[i].amount,
                    total: rows[i].total
                };
                preArr.push(rows[i].ask)
                for (let j = 0; j < rows.length; j++) {
                    console.log(i !== j)
                    if (i !== j) {
                        if (rows[i].ask == rows[j].ask) {
                            result.amount = result.amount + rows[j].amount;
                            result.total = result.total + rows[j].total;
                        }
                    }
                }
                result.ask = rows[i].ask;
                result.my_size = rows[i].my_size;
                console.log(result.ask, count)
                final_result.push(result);
            }
        }
        console.log(final_result, preArr)
        this.setState({
            loader: false,
            data: rows,
            lastsum,
            result: final_result
        });
    }
    componentWillReceiveProps(props, newProps) {
        console.log(props)
        var self = this;
        if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
            if (props.cryptoPair.crypto !== this.state.crypto) {
                this.setState({ crypto: props.cryptoPair.crypto }, () => {
                    self.sellTableData();
                })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                this.setState({ currency: props.cryptoPair.currency }, () => {
                    self.sellTableData();
                })
            }
        }
    }
    render() {

        return (
            <div>
                <BBC2>SELLING {this.props.cryptoPair.crypto}</BBC2>
                <Total_BTC>Total:  {this.state.lastsum.toFixed(4)} {this.props.cryptoPair.currency}</Total_BTC>
                <Buy_table>
                    <History_wrap>
                        <OTwrap2>
                            <div class="tbl-header">
                                <TableHeader cellpadding="10px" cellspacing="0" border="0">
                                    <thead>
                                        <tr>
                                            <th>MY SIZE</th>
                                            <th>AMOUNT</th>
                                            <th>ASK</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                </TableHeader>
                            </div>
                        </OTwrap2>
                        <OTwrap2>
                            <div class="tbl-content">
                                <Scrollbars
                                    style={{ height: 165 }}>
                                    <TableContent cellpadding="10px" cellspacing="0" border="0">
                                        <tbody>
                                            {this.state.result.length ? this.state.result.map(function (element, index) {
                                                return (
                                                    < tr >
                                                        <td>{element.my_size}</td>
                                                        <td>{element.amount.toFixed(4)}</td>
                                                        <td>{element.ask}</td>
                                                        <td>{element.total.toFixed(4)}</td>
                                                    </tr>
                                                );
                                            })
                                                : ""
                                            }

                                        </tbody>
                                    </TableContent>
                                </Scrollbars>

                            </div>
                        </OTwrap2>
                    </History_wrap>
                </Buy_table>
                {(this.state.Loader == true) ?
                    <Spin_single className="Single_spin">
                        <Spin size="small" />
                    </Spin_single>
                    : ""
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        cryptoPair: state.walletReducer.cryptoPair !== undefined ? state.walletReducer.cryptoPair : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(SellTable);