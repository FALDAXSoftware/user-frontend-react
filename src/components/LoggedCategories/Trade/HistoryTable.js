import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { globalVariables } from "../../../Globals";
import moment from "moment";
import { Spin } from 'antd';
import { History_wrap, TableHeader, TableContent } from "../../../styled-components/loggedStyle/tradeStyle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import {
    Spin_single
} from "../../../styled-components/loggedStyle/dashStyle"
import { OTwrap } from "./OrderTrade"
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
var io = null;
class HistoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            crypto: this.props.cryptoPair ? this.props.cryptoPair.crypto : "XRP",
            currency: this.props.cryptoPair ? this.props.cryptoPair.currency : "BTC",
            loader: false
        }
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        var self = this;
        self.historyData();
        io.socket.on('instrumentUpdate', (data) => {
            self.updateData(data)
        });
    }
    componentWillReceiveProps(props, newProps) {
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
        io = this.props.io
        this.setState({ loader: true })
        io.sails.url = APP_URL;
        var URL;
        if (this.props.cryptoPair.prevRoom !== undefined && Object.keys(this.props.cryptoPair.prevRoom).length > 0) {
            URL = `/socket/get-trade-history?prevRoom=${this.props.cryptoPair.prevRoom.crypto}-${this.props.cryptoPair.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`
        }
        else {
            URL = `/socket/get-trade-history?room=${this.state.crypto}-${this.state.currency}`
        }
        io.socket.request({
            method: 'GET',
            url: URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }, (body, JWR) => {

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
            loader: false
        });
    }
    render() {
        var me = this;
        return (
            <BorderedHistoryWrap>
                <OTwrap>
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
                </OTwrap>
                <OTwrap>
                    <div class="tbl-content">
                        <Scrollbars
                            style={{ height: 300 }}
                            className="scrollbar"
                            hideTracksWhenNotNeeded={true}>
                            <TableContent cellpadding="10px" cellspacing="0" border="0">
                                <tbody>
                                    {this.state.data.length > 0 ? this.state.data.map((element, index) => (
                                        <tr>
                                            <SideType type={element.side}>{element.side}</SideType>
                                            <td>{element.amount}</td>
                                            {(index + 1) < me.state.data.length ? (element.fill_price > me.state.data[index + 1].fill_price)
                                                ?
                                                <td>{element.fill_price} {this.props.theme !== true ? <img style={{ marginBottom: "3px" }} src="/images/up-right.png" /> : <img style={{ marginBottom: "3px" }} src="/images/up_white.png" />}</td> :
                                                <td>{element.fill_price} {this.props.theme !== true ? <img style={{ marginBottom: "3px" }} src="/images/down-right.png" /> : <img style={{ marginBottom: "3px" }} src="/images/down_white.png" />}</td>
                                                : <td>{element.fill_price} </td>
                                            }
                                            <td>{element.time}</td>
                                            <td>{element.total.toFixed(4)}</td>
                                        </tr>
                                    ))
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
                {(this.state.loader == true) ?
                    <Spin_single className="Full_spin">
                        <Spin size="small" />
                    </Spin_single>
                    : ""
                }
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
