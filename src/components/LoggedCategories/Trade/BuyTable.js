import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Buy_table, BBC, Total_BTC, History_wrap, TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";
import { Scrollbars } from 'react-custom-scrollbars';
import { globalVariables } from "../../../Globals";
import { Spin } from 'antd';
import {
    Spin_single
} from "../../../styled-components/loggedStyle/dashStyle"
import { OTwrap } from './OrderTrade';
const APP_URL = globalVariables.API_URL;
const OTwrap2 = styled(OTwrap)`
    min-width:auto;
    @media(max-width:991px)
    {
        min-width:767px;
    }
`
const NDF = styled.p`
    text-align : center;
    font-weight: 600;
    font-size:17px;
    color:black; 
    margin-top:30px;
    font-family:Open Sans;
`
class BuyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
            currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
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
                self.buyTableData();
            })
        }
    }

    buyTableData() {
        let io = this.props.io
        io.sails.url = APP_URL;
        this.setState({ loader: true });
        var URL;
        if (this.props.cryptoPair.prevRoom !== undefined && Object.keys(this.props.cryptoPair.prevRoom).length > 0) {
            URL = `/socket/get-buy-book?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`
        }
        else {
            URL = `/socket/get-buy-book?room=${this.state.crypto}-${this.state.currency}`
        }
        console.log(this.state, URL)
        io.socket.get(URL, (body, JWR) => {

            if (body.status == 200) {
                let res = body.data;
                console.log(res)
                this.updateData(res);
            }
        });
        io.socket.on('buybookUpdate', (data) => {

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
            sum = sum + element.quantity * element.price;
            rows.push({
                my_size: 0,
                amount: element.quantity,
                bid: element.price,
                total: sum,
            });
            lastsum = sum
        }
        var preArr = [];
        var final_result = [];
        console.log(rows)
        for (let i = 0; i < rows.length; i++) {

            if (preArr.includes(rows[i].bid)) {

            }
            else {
                var count = 0;
                var result = {
                    amount: rows[i].amount,
                    total: rows[i].total
                };
                preArr.push(rows[i].bid)
                for (let j = 0; j < rows.length; j++) {
                    console.log(i !== j)
                    if (i !== j) {
                        if (rows[i].bid == rows[j].bid) {
                            result.amount = result.amount + rows[j].amount;
                            result.total = result.total;
                        }
                    }
                }
                result.bid = rows[i].bid;
                result.my_size = rows[i].my_size;
                console.log(result.bid, count)
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
                    self.buyTableData();
                })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                this.setState({ currency: props.cryptoPair.currency }, () => {
                    self.buyTableData();
                })
            }
        }
    }

    render() {
        return (
            <div>
                <BBC>BUYING {this.props.cryptoPair.crypto}</BBC>
                <Total_BTC>Total: {this.state.lastsum} {this.props.cryptoPair.crypto}</Total_BTC>
                <Buy_table>
                    <History_wrap>
                        <OTwrap2>
                            <div className="tbl-header">
                                <TableHeader cellpadding="10px" cellspacing="0" border="0">
                                    <thead>
                                        <tr>
                                            <th>MY SIZE</th>
                                            <th>AMOUNT</th>
                                            <th>BID</th>
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
                                        {console.log(this.state.result)}
                                        {this.state.result.length ?
                                            <tbody>
                                                {this.state.result.map(element => (
                                                    <tr>
                                                        <td>{element.my_size}</td>
                                                        <td>{element.amount}</td>
                                                        <td>{element.bid}</td>
                                                        <td>{element.total.toFixed(4)}</td>
                                                    </tr>
                                                ))
                                                }

                                            </tbody>
                                            : <NDF>No Data Found</NDF>
                                        }
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

export default connect(mapStateToProps)(BuyTable);
