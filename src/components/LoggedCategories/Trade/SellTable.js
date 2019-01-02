import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { History_wrap, TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";

import { Scrollbars } from 'react-custom-scrollbars';
import { globalVariables } from "../../../Globals";
const APP_URL = globalVariables.API_URL;


class SellTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            crypto: "XRP",
            currency: "BTC",
        }
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        let io = this.props.io
        io.sails.url = APP_URL;

        io.socket.get("/socket/get-sell-book?room=" + this.state.crypto + "-" + this.state.currency, (body, JWR) => {
            console.log(body, JWR);

            if (body.status == 200) {
                let res = body.data;
                console.log("sellBoobk----------->", res);

                this.updateData(res);
            }
        });
        io.socket.on('sellbookUpdate', (data) => {
            this.updateData(data);
        });
    }
    updateData(data) {
        const rows = [];
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            sum = sum + element.quantity;
            rows.push({
                my_size: 0,
                amount: element.quantity,
                ask: element.price,
                total: sum,
            });
        }
        this.setState({
            data: rows
        });
    }
    render() {
        return (
            <History_wrap>
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
                <div class="tbl-content">
                    <Scrollbars
                        style={{ height: 300 }}>
                        <TableContent cellpadding="10px" cellspacing="0" border="0">
                            <tbody>
                                {this.state.data.map(element => (
                                    <tr>
                                        <td>{element.my_size}</td>
                                        <td>{element.amount}</td>
                                        <td>{element.ask}</td>
                                        <td>{element.total}</td>
                                    </tr>
                                ))

                                }

                            </tbody>
                        </TableContent>
                    </Scrollbars>

                </div>
            </History_wrap>
        )
    }
}

export default SellTable;