import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { globalVariables } from "../../../Globals";
import moment from "moment";
import { History_wrap, TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
const APP_URL = globalVariables.API_URL;
const BorderedHistoryWrap = styled(History_wrap)`
    margin-left:30px;
    margin-right:30px;
    border:1px solid #d8d8d8;
`
const SideType= styled.td`
    color:${props => props.type=="Sell"?"#f13239":"#4fb153"};
`
const FontAwesomeIconA = styled(FontAwesomeIcon)``
class HistoryTable extends Component {
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
        console.log("Trade History Mount");

        let io = this.props.io

        io.sails.url = APP_URL;

        io.socket.get("/socket/get-trade-history?room=" + this.state.crypto + "-" + this.state.currency, (body, JWR) => {
            console.log(body);
            console.log(JWR);

            if (body.status == 200) {
                let res = body.data;
                console.log("--tradehistory--------->", res);

                this.updateData(res);
            }
        });
        io.socket.on('tradeHistoryUpdate', (data) => {
            this.updateData(data);
        });
    }
    updateData(data) {
        const rows = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            rows.push({
                side: element.side,
                amount: element.quantity,
                fill_price: element.fill_price,
                time: moment.utc(element.created_at).local().format("MMM D, YYYY, H:m:s"),
                total: element.quantity * element.fill_price,
            });
        }
        this.setState({
            data: rows,
        });
    }
    render() {
        var me = this;
        return (
            <BorderedHistoryWrap>
                <div class="tbl-header">
                    <TableHeader cellpadding="10px" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>SIDE</th>
                                <th>AMOUNT</th>
                                <th>FILL PRICE</th>
                                <th>TIME</th>
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
                                {this.state.data.map((element,index) => (
                                    <tr>
                                        {console.log(element,index)}
                                        <SideType type={element.side}>{element.side}</SideType>
                                        <td>{element.amount}</td>
                                        {(index+1)<me.state.data.length?(element.fill_price>me.state.data[index+1].fill_price)
                                            ?
                                            <td>{element.fill_price} <img style={{marginBottom:"3px"}} src="/images/up-right.png"/></td>:
                                           <td>{element.fill_price} <img style={{marginBottom:"3px"}} src="/images/down-right.png"/></td>
                                           :<td>{element.fill_price} </td>
                                        }
                                        <td>{element.time}</td>
                                        <td>{element.total}</td>
                                    </tr>
                                ))

                                }

                            </tbody>
                        </TableContent>
                    </Scrollbars>
                </div>
            </BorderedHistoryWrap>
        )
    }
}

export default HistoryTable;
