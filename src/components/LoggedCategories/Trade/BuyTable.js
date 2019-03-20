import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Buy_table, BBC, Total_BTC, History_wrap1, TableHeader, TableContent, ScrollTableContent } from "../../../styled-components/loggedStyle/tradeStyle";
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
    margin-top:30px;
        background: none;
        border-bottom: 0px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: ${props => props.theme.mode == "dark" ? "white" : ""};
        font-family: "Open Sans";
`
class BuyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
            currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
            lastsum: 0,
            loader: false,
            result: []
        }
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        var self = this;
        console.log("buy did mount");

        self.buyTableData();
        // this.setState({ crypto: this.props.cryptoPair.crypto, currency: this.props.cryptoPair.currency }, () => {
        // })
    }

    buyTableData() {
        let io = this.props.io
        io.sails.url = APP_URL;

        this.props.loaderfunc(true);
        this.setState({ loader: true });
        var URL;
        if (this.props.cryptoPair.prevRoom !== undefined && Object.keys(this.props.cryptoPair.prevRoom).length > 0) {
            URL = `/socket/get-buy-book?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`
        }
        else {
            URL = `/socket/get-buy-book?room=${this.state.crypto}-${this.state.currency}`
        }
        console.log(this.state, URL)
        io.socket.request({
            method: 'GET',
            url: URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }, (body, JWR) => {
            console.log("buybook", body);
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
    // updateData(data) {
    //     console.log(data)
    //     const rows = [];
    //     let sum = 0;
    //     let lastsum
    //     for (let i = 0; i < data.length; i++) {
    //         const element = data[i];
    //         sum = sum + element.quantity * element.price;
    //         rows.push({
    //             my_size: 0,
    //             amount: element.quantity,
    //             bid: element.price,
    //             total: sum,
    //         });
    //         lastsum = sum
    //     }
    //     var preArr = [];
    //     var final_result = [];
    //     console.log(rows)
    //     for (let i = 0; i < rows.length; i++) {

    //         if (preArr.includes(rows[i].bid)) {

    //         }
    //         else {
    //             var count = 0;
    //             var result = {
    //                 amount: rows[i].amount,
    //                 total: rows[i].total
    //             };
    //             preArr.push(rows[i].bid)
    //             for (let j = 0; j < rows.length; j++) {
    //                 console.log(i !== j)
    //                 if (i !== j) {
    //                     if (rows[i].bid == rows[j].bid) {
    //                         result.amount = result.amount + rows[j].amount;
    //                         result.total = result.total;
    //                     }
    //                 }
    //             }
    //             result.bid = rows[i].bid;
    //             result.my_size = rows[i].my_size;
    //             console.log(result.bid, count)
    //             final_result.push(result);
    //         }
    //     }
    //     console.log(final_result, preArr)
    //     this.props.loaderfunc(false);
    //     this.setState({
    //         loader: false,
    //         data: rows,
    //         lastsum,
    //         result: final_result
    //     });
    // }
    updateData(data) {
        // console.log("buyrow------------", data);
        const row = [];
        let sum = 0;
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let isAdded = false;
            for (let internalIndex = 0; internalIndex < row.length; internalIndex++) {
                const internalElement = row[internalIndex];
                if (internalElement.bid == element.price) {
                    row[internalIndex].amount += element.quantity;
                    isAdded = true;
                    break;
                }
            }
            if (!isAdded) {
                row.push({
                    my_size: 0,
                    amount: element.quantity,
                    bid: element.price,
                    // total: sum,
                });
            }
        }

        for (let index = row.length - 1; index >= 0; index--) {
            const element = row[index];
            sum += element.amount * element.bid;
            row[index]["total"] = sum;
        }
        this.props.loaderfunc(false);
        this.setState({
            loader: false,
            // data: rows,
            lastsum: sum,
            result: row
        });
        console.log("buyrow------------", row);

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
                <BBC>BUYING {this.props.crypto}</BBC>
                <Total_BTC>Total: {this.state.lastsum} {this.props.cryptoPair.crypto}</Total_BTC>
                <Buy_table>
                    <History_wrap1>
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
                            <ScrollTableContent>
                                <Scrollbars
                                    style={{ height: this.props.height }}
                                    className="scrollbar"
                                    hideTracksWhenNotNeeded={true}>
                                    <TableContent cellpadding="10px" cellspacing="0" border="0">
                                        {console.log(this.state.result)}
                                        {this.state.result.length ?
                                            <tbody>
                                                {this.state.result.map(element => (
                                                    <tr>
                                                        <td>{element.my_size}</td>
                                                        <td>{element.amount.toFixed(4)}</td>
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
                            </ScrollTableContent>
                        </OTwrap2>
                    </History_wrap1>
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
