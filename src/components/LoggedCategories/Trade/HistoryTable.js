import React, { Component } from 'react';
import { connect } from "react-redux";
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
const SideType = styled.td`
    color:${props => props.type == "Sell" ? "#f13239" : "#4fb153"};
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
        var self = this;
        if (this.props.cryptoPair !== undefined && this.props.cryptoPair !== "") {
            this.setState({ crypto: this.props.cryptoPair.crypto, currency: this.props.cryptoPair.currency }, () => {
                self.historyData();
            })
        }
    }
    componentWillReceiveProps(props, newProps) {
        console.log(props)
        var self = this;
        if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
            if (props.cryptoPair.crypto !== this.state.crypto) {
                this.setState({ crypto: props.cryptoPair.crypto }, () => {
                    self.historyData();
                })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                this.setState({ currency: props.cryptoPair.currency }, () => {
                    self.historyData();
                })
            }
        }
    }
    historyData() {
        let io = this.props.io

        io.sails.url = APP_URL;
        var URL;
        if (this.props.cryptoPair.prevRoom !== undefined && Object.keys(this.props.cryptoPair.prevRoom).length > 0) {
            URL = `/socket/get-trade-history?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`
        }
        else {
            URL = `/socket/get-trade-history?room=${this.state.crypto}-${this.state.currency}`
        }
        io.socket.get(URL, (body, JWR) => {

            if (body.status == 200) {
                let res = body.data;

                this.updateData(res);
            }
        });
        io.socket.on('tradeHistoryUpdate', (data) => {
            this.updateData(data);
        });
    }
    updateData(data) {
        console.log(data)
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
                                {this.state.data.map((element, index) => (
                                    <tr>
                                        <SideType type={element.side}>{element.side}</SideType>
                                        <td>{element.amount}</td>
                                        {(index + 1) < me.state.data.length ? (element.fill_price > me.state.data[index + 1].fill_price)
                                            ?
                                            <td>{element.fill_price} <img style={{ marginBottom: "3px" }} src="/images/up-right.png" /></td> :
                                            <td>{element.fill_price} <img style={{ marginBottom: "3px" }} src="/images/down-right.png" /></td>
                                            : <td>{element.fill_price} </td>
                                        }
                                        <td>{element.time}</td>
                                        <td>{element.total.toFixed(4)}</td>
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

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        cryptoPair: state.walletReducer.cryptoPair !== undefined ? state.walletReducer.cryptoPair : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(HistoryTable);
