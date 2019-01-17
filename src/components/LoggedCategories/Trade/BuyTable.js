import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Buy_table, BBC, Total_BTC, History_wrap, TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";
import { Scrollbars } from 'react-custom-scrollbars';
import { globalVariables } from "../../../Globals";

const APP_URL = globalVariables.API_URL;

class BuyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            crypto: "XRP",
            currency: "BTC",
            lastsum: 0
        }
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        let io = this.props.io
        io.sails.url = APP_URL;
        io.socket.get("/socket/get-buy-book?room=" + this.state.crypto + "-" + this.state.currency, (body, JWR) => {

            if (body.status == 200) {
                let res = body.data;

                this.updateData(res);
            }
        });
        io.socket.on('buybookUpdate', (data) => {
            this.updateData(data);
        });
    }
    updateData(data) {
        const rows = [];
        let sum = 0;
        let lastsum
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            sum = sum + element.quantity;
            rows.push({
                my_size: 0,
                amount: element.quantity,
                bid: element.price,
                total: sum,
            });
            lastsum = sum
        }
        this.setState({
            data: rows,
            lastsum
        });
    }
    render() {
        return (
            <div>
                <BBC>BUYING BBC</BBC>
                <Total_BTC>Total: {this.state.lastsum} BTC</Total_BTC>
                <Buy_table>
                    <History_wrap>
                        <div class="tbl-header">
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
                        <div class="tbl-content">
                            <Scrollbars
                                style={{ height: 165 }}>
                                <TableContent cellpadding="10px" cellspacing="0" border="0">
                                    <tbody>
                                        {this.state.data.map(element => (
                                            <tr>
                                                <td>{element.my_size}</td>
                                                <td>{element.amount}</td>
                                                <td>{element.bid}</td>
                                                <td>{element.total.toFixed(4)}</td>
                                            </tr>
                                        ))

                                        }

                                    </tbody>
                                </TableContent>
                            </Scrollbars>
                        </div>
                    </History_wrap>
                </Buy_table>
            </div>
        )
    }
}

export default BuyTable;
