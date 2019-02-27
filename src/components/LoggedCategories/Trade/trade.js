import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import { Row, Col, Tabs, Input, Radio, Select, Spin, notification, Switch, Icon } from 'antd';
import styled from 'styled-components';
import { widget } from '../../../charting_library/charting_library.min';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
/* import Tableofcoin from './TableofCoin'
import WalletDetails from './WalletDetails' */
import Loader from '../../../shared-components/Loader'
import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import Market from "./Market";
import Limit from "./Limit";
import StopLimit from "./StopLimit";
import BuyTable from './BuyTable';
import SellTable from './SellTable';
import HistoryTable from './HistoryTable';
import DepthChart from './DepthChart';
import OrderTrade from './OrderTrade';
import { Container } from '../../../styled-components/homepage/style';
import { Contact_wrap, Grey_wrap } from "../../../styled-components/landingCategories/contactStyle"
import { cryptoCurrency } from '../../../Actions/LoggedCat/tradeActions'
import {
    Row_wrap, Left_div, EditDiv, SwitchS, Left_div1, Left_div2, Instru, SearchInput, Right_div1, Right_div, Buy_table,
    FIAT_wrap, FIAT_wrap2, FIAT, Sect, InstruTable, TableIns, Tabs_right, Row_wrap2, BBC_wrap, BBC_wrap2, BBC2, RadioSelect, Orderwrap, InstruOrder, Selectmonth
} from "../../../styled-components/loggedStyle/tradeStyle";
import {
    Spin_single
} from "../../../styled-components/loggedStyle/dashStyle"
import { globalVariables } from '../../../Globals';
import TraddingViewChart from "../../TraddingViewChart";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

let { API_URL } = globalVariables;
/* var socketIOClient = require('socket.io-client');
io.sails.url = API_URL;
var sailsIOClient = require('sails.io.js');
let io = sailsIOClient(socketIOClient); */
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
    border-radius:5px;
    max-width:1170px;
    padding-bottom: 30px;
`
const OrderTradeWrap = styled.div`
    display:inline-flex;
    margin-left:auto;
    align-items:center;
    @media(max-width:856px)
    {
        display:flex;
        width:100%;
        margin-left:30px;
        margin-top:10px;
        flex-wrap:wrap;
    }
`
const Grey_wrap_trade = styled(Grey_wrap)`
    padding-top:80px;
`

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b, sortOrder) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    },
}, {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
}, {
    title: 'Volume',
    dataIndex: 'volume',
    defaultSortOrder: 'ascend',
    render: text => text.toFixed(4),
    sorter: (a, b) => a.volume - b.volume,
    sortDirections: ['descend', 'ascend'],
},
{
    title: 'Change',
    dataIndex: 'change',
    defaultSortOrder: 'ascend',
    render: (text) => {
        if (text < 0)
            return (<span style={{ color: "red" }}>{Math.abs(text) + "%"}</span>);
        else
            return (<span style={{ color: "green" }}>{Math.abs(text) + "%"}</span>)
    },
    sorter: (a, b) => a.change - b.change
}];

const TabPane = Tabs.TabPane;
let io = null;
class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePeriod: "1",
            status: "1",
            crypto: "XRP",
            currency: "BTC",
            prevRoom: {},
            orderTradeData: {},
            InsCurrency: "BTC",
            InsData: [],
            searchedInstu: [],
            userBal: {},
            insLoader: false,
            userBalLoader: false
        };
        io = this.props.io;
        // io.sails.url = API_URL;
        this.handleChange = this.handleChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.getUserBal = this.getUserBal.bind(this);
        this.onInsChange = this.onInsChange.bind(this);
        this.getInstrumentData = this.getInstrumentData.bind(this);
        this.updateInstrumentsData = this.updateInstrumentsData.bind(this);
    }
    componentWillReceiveProps(props, newProps) {
        var self = this;
        if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
            if (props.cryptoPair.crypto !== this.state.crypto) {
                console.log("CWRP CRYPTO");
                this.setState({ crypto: props.cryptoPair.crypto, prevRoom: props.cryptoPair.prevRoom }, () => {
                    self.orderSocket(self.state.timePeriod, self.state.status);
                    self.getUserBal();
                })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                console.log("CWRP CURRENCY");
                this.setState({ currency: props.cryptoPair.currency, prevRoom: props.cryptoPair.prevRoom }, () => {
                    self.orderSocket(self.state.timePeriod, self.state.status)
                    self.getUserBal();
                })
            }
        }
    }
    componentDidMount() {
        var self = this;
        console.log("DID TRADE")
        io.sails.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.props.isLoggedIn
        }
        this.orderSocket(this.state.timePeriod, this.state.status);
        this.getInstrumentData();
        this.getUserBal();
        io.socket.on('orderUpdated', (data) => {
            self.orderSocket(self.state.timePeriod, self.state.status);
            self.getUserBal();

        });
        console.log(window);

    }
    onInsChange(e) {
        console.log(this.props)
        var self = this;
        // console.log(e.target.value);
        let cryptoPair = {
            crypto: self.state.crypto,
            currency: e.target.value,
            prevRoom: {
                crypto: self.state.crypto,
                currency: self.state.InsCurrency
            }
        };
        this.setState({
            InsCurrency: e.target.value,
            InsData: [],

        }, () => {
            self.props.cryptoCurrency(cryptoPair);
            self.getInstrumentData();
        });
    } io
    getInstrumentData() {
        var self = this;
        console.log("get instrument data");
        self.setState({ insLoader: true });
        io.socket.request({
            method: 'GET',
            url: `/socket/get-instrument-data?coin=${self.state.InsCurrency}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }, (body, JWR) => {
            console.log("get instrument data", body);

            if (body.status == 200) {
                self.updateInstrumentsData(body.data)
            }
        });
        io.socket.on('instrumentUpdate', (data) => {
            self.updateInstrumentsData(data)
        });

    }
    updateInstrumentsData(data) {
        console.log(data);
        let res = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            res.push({
                name: element.name.split('-')[0],
                price: element.last_price,
                volume: element.volume,
                change: parseFloat(element.percentChange).toFixed(2),
            });
        }
        this.setState({
            InsData: res,
            insLoader: false
        });
    }
    searchChange(value) {

    }
    submitSearch(e) {

    }
    onChange(pagination, filters, sorter) {
    }

    callback(key) {
    }
    handleChange(value) {
        console.log(value); // { key: "lucy", label: "Lucy (101)" }
        this.setState({ timePeriod: value.key });
        this.orderSocket(value.key, this.state.status);
    }
    statusChange(e) {
        console.log(e);
        var status;
        if (e.target.value == "a") {
            status = 1;
        }
        else if (e.target.value == "b") {
            status = 2;
        }
        else if (e.target.value == "c") {
            status = 3;
        }
        this.setState({ status });
        this.orderSocket(this.state.timePeriod, status);
    }
    orderSocket(month, filter_type) {

        var URL;
        this.setState({ orderTradeLoader: true })
        if (Object.keys(this.state.prevRoom).length > 0)
            URL = `/socket/get-user-trade-data?prevRoom=${this.state.prevRoom.crypto}-${this.state.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}&month=${month}&filter_type=${filter_type}`
        else
            URL = `/socket/get-user-trade-data?room=${this.state.crypto}-${this.state.currency}&month=${month}&filter_type=${filter_type}`
        console.log("orderSocket", URL, month, filter_type)
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


                this.updateMyOrder(res);
            }
            this.setState({ orderTradeLoader: false })
        });
    }
    updateMyOrder(response) {
        console.log(response)
        this.setState({ orderTradeData: response })
    }
    cancelOrder(id, side, type) {
        console.log(id, side, type)
        fetch(API_URL + `/cancel-pending-order`, {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            },
            body: JSON.stringify({
                id: id,
                side: side,
                order_type: type
            })

        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    this.orderSocket(this.state.timePeriod, this.state.status)
                    this.openNotificationWithIcon("success", "Successfull", "Your order has been successfully cancelled")
                }
                else
                    this.openNotificationWithIcon("error", "Error", responseData.err)
            })
            .catch(error => {
            })
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
    currencyPair(crypto) {
        let cryptoPair = {
            crypto: crypto,
            currency: this.state.InsCurrency,
            prevRoom: {
                crypto: this.state.crypto,
                currency: this.state.InsCurrency
            }
        };
        console.log(this.props)
        this.props.cryptoCurrency(cryptoPair)
    }
    getUserBal() {
        var URL;
        this.setState({ userBalLoader: true });
        console.log("getUserBal")
        if (Object.keys(this.state.prevRoom).length > 0)
            URL = `/socket/get-user-balance?prevRoom=${this.state.prevRoom.crypto}-${this.state.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}`
        else
            URL = `/socket/get-user-balance?room=${this.state.crypto}-${this.state.currency}`
        console.log(this.state, this.state.prevRoom)
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
                console.log(res);
                this.setState({ userBal: res, userBalLoader: false })
            }
        });
        io.socket.on('orderUpdate', (data) => {

            this.setState({ userBal: data, userBalLoader: false })
        });
    }
    searchInstu(e) {
        console.log("megh", e.target.value.trim() !== "")
        var search = e.target.value;
        if (search.trim() !== "") {
            console.log("finally i am in");
            var searchedInstu = this.state.InsData.filter(function (temp) {
                console.log(temp, temp.name.includes(search))
                if (temp.name.toLowerCase().includes(search.toLowerCase())) {
                    console.log(temp, search)
                    return true;
                }
                else {
                    return false;
                }
            })
            console.log(searchedInstu)
            this.setState({ searchedInstu });
        }
        else {
            this.setState({ searchedInstu: [] });
        }
    }
    /* componentWillUnmount() {
        if (this.tvWidget !== null) {
            this.tvWidget.remove();
            this.tvWidget = null;
        }
    } */
    onChangeLay(layout) {
        console.log(layout)
    }
    popWindow() {
        console.log("HEYY BUDDY DOUBLE")
        var newWindow = window.open("localhost:3000/trade", "", "width=300, height=200");
    }
    render() {
        var self = this;
        var layouts = {
            lg: [
                { i: 'a', x: 0, y: 0, w: 4, h: 2, minW: 4 },
                { i: 'b', x: 4, y: 0, w: 4, h: 2, minW: 4, static: true },
                { i: 'c', x: 8, y: 0, w: 4, h: 2, minW: 4 },
                { i: 'd', x: 0, y: 1, w: 12, h: 2, minW: 4 },
                { i: 'e', x: 0, y: 2, w: 12, h: 2, minW: 4 },
                { i: 'f', x: 0, y: 3, w: 12, h: 2, minW: 4 }
            ],
            md: [
                { i: 'a', x: 0, y: 0, w: 5, h: 2, minW: 5 },
                { i: 'b', x: 5, y: 0, w: 5, h: 2, minW: 5 },
                { i: 'c', x: 0, y: 1, w: 5, h: 2, minW: 5 },
                { i: 'd', x: 5, y: 1, w: 5, h: 2, minW: 5 },
                { i: 'e', x: 0, y: 2, w: 10, h: 2, minW: 5 },
                { i: 'f', x: 0, y: 3, w: 10, h: 2, minW: 5 }
            ],
            sm: [
                { i: 'a', x: 0, y: 0, w: 6, h: 2, minW: 6 },
                { i: 'b', x: 0, y: 1, w: 6, h: 2, minW: 6 },
                { i: 'c', x: 0, y: 2, w: 6, h: 2, minW: 6 },
                { i: 'd', x: 0, y: 3, w: 6, h: 2, minW: 6 },
                { i: 'e', x: 0, y: 4, w: 6, h: 2, minW: 6 },
                { i: 'f', x: 0, y: 5, w: 6, h: 2, minW: 6 }
            ],

            xs: [
                { i: 'a', x: 0, y: 0, w: 4, h: 2, minW: 4 },
                { i: 'b', x: 0, y: 1, w: 4, h: 2, minW: 4 },
                { i: 'c', x: 0, y: 2, w: 4, h: 2, minW: 4 },
                { i: 'd', x: 0, y: 3, w: 4, h: 2, minW: 4 },
                { i: 'e', x: 0, y: 4, w: 4, h: 2, minW: 4 },
                { i: 'f', x: 0, y: 5, w: 4, h: 2, minW: 4 }
            ],
            xxs: [
                { i: 'a', x: 0, y: 0, w: 2, h: 2, minW: 2 },
                { i: 'b', x: 0, y: 1, w: 2, h: 2, minW: 2 },
                { i: 'c', x: 0, y: 2, w: 2, h: 2, minW: 2 },
                { i: 'd', x: 0, y: 3, w: 2, h: 2, minW: 2 },
                { i: 'e', x: 0, y: 4, w: 2, h: 2, minW: 2 },
                { i: 'f', x: 0, y: 5, w: 2, h: 2, minW: 2 }

            ]
        };
        return (
            <Contact_wrap>
                <LoggedNavigation />
                <Grey_wrap_trade>
                    <Row>
                        <Col>
                            {/* <img src="/images/tradingview.png" width="100%" style={{ marginBottom: "30px" }} /> */}
                            <TraddingViewChart />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <Select defaultValue="lucy" style={{ width: 120 }} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="edit">Edit Layout</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ResponsiveReactGridLayout className="layout" layouts={layouts}
                                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                            /* onLayoutChange={(layout: Layout) => this.onChangeLay(layout)} */
                            >
                                <div key="a">
                                    <div onDoubleClick={this.popWindow.bind(this)} style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {
                                            this.state.insLoader == false ?
                                                <Left_div1>
                                                    <Instru>INSTRUMENTS</Instru>
                                                    {this.state.InsData.length > 0 ? <SearchInput
                                                        onChange={(e) => this.searchInstu(e)}
                                                        style={{ width: 200 }}
                                                    /> : ""}
                                                    <FIAT_wrap>
                                                        <FIAT>
                                                            <RadioSelect value={this.state.InsCurrency} size="large" buttonStyle="solid" onChange={this.onInsChange}>
                                                                <RadioButton value="BTC">BTC</RadioButton>
                                                                <RadioButton value="XRP">XRP</RadioButton>
                                                            </RadioSelect>
                                                        </FIAT>
                                                    </FIAT_wrap>
                                                    <InstruTable>
                                                        <TableIns
                                                            InsCurrency onRow={(record, rowIndex) => {
                                                                return {
                                                                    onClick: (event) => { self.currencyPair(record.name) },       // click row
                                                                };
                                                            }}
                                                            pagination={false} columns={columns} dataSource={this.state.searchedInstu.length == 0 ? this.state.InsData : this.state.searchedInstu} onChange={this.onChange} />
                                                    </InstruTable>
                                                    {(this.state.insLoader == true) ?
                                                        <Spin_single className="Single_spin">
                                                            <Spin size="small" />
                                                        </Spin_single>
                                                        : ""
                                                    }


                                                </Left_div1>
                                                :
                                                <Loader color="#1990ff" width="50" height='50' />
                                        }
                                    </div>
                                </div>
                                <div key="b">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {this.state.userBalLoader == false ?
                                            <Right_div1>
                                                <Tabs_right defaultActiveKey="1" onChange={this.callback}>
                                                    <TabPane tab="Market" key="1"><Market userBal={this.state.userBal} /></TabPane>
                                                    <TabPane tab="Limit" key="2"><Limit userBal={this.state.userBal} /></TabPane>
                                                    <TabPane tab="Stop-Limit" key="3"><StopLimit userBal={this.state.userBal} /></TabPane>
                                                </Tabs_right>
                                            </Right_div1>
                                            :
                                            <Loader color="#1990ff" width="50" height='50' />
                                        }
                                    </div>
                                </div>
                                <div key="c">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        <Left_div>
                                            <Instru>ORDER BOOK BBC/BTC</Instru>
                                            <BBC_wrap>
                                                <BuyTable io={io} />
                                            </BBC_wrap>

                                            <BBC_wrap2>
                                                <SellTable io={io} />
                                            </BBC_wrap2>

                                        </Left_div>
                                    </div>
                                </div>
                                <div key="d" >
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        <Right_div>
                                            <DepthChart io={io} />
                                        </Right_div>
                                    </div>
                                </div>
                                <div key="e">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        <Left_div2>
                                            <Instru>ORDER HISTORY</Instru>
                                            <HistoryTable io={io} />
                                        </Left_div2>
                                    </div>
                                </div>
                                <div key="f">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        <Left_div2>
                                            <Orderwrap>
                                                <InstruOrder>MY ORDERS AND TRADES</InstruOrder>
                                                <OrderTradeWrap >
                                                    <Selectmonth labelInValue defaultValue={{ key: '1' }} style={{ width: 120, marginRight: "30px" }} onChange={this.handleChange}>
                                                        <Option value="1">1 Month</Option>
                                                        <Option value="3">3 Months</Option>
                                                        <Option value="6">6 Months</Option>
                                                        <Option value="12">12 Months</Option>
                                                    </Selectmonth>
                                                    <FIAT_wrap2>
                                                        <FIAT>
                                                            <RadioSelect onChange={this.statusChange} defaultValue="a" size="large" buttonStyle="solid" className="order-tab-select">
                                                                <RadioButton value="a">COMPLETED</RadioButton>
                                                                <RadioButton value="b">PENDING</RadioButton>
                                                                <RadioButton value="c">CANCELED</RadioButton>
                                                            </RadioSelect>
                                                        </FIAT>
                                                    </FIAT_wrap2>
                                                </OrderTradeWrap>
                                            </Orderwrap>
                                            <OrderTrade pending={this.state.status} cancelOrder={(id, side, type) => { this.cancelOrder(id, side, type) }} orderTradeData={this.state.orderTradeData} />
                                            {(this.state.orderTradeLoader == true) ?
                                                <Spin_single className="Full_spin">
                                                    <Spin size="small" />
                                                </Spin_single>
                                                : ""
                                            }
                                        </Left_div2>
                                    </div>
                                </div>
                            </ResponsiveReactGridLayout>
                        </Col >
                    </Row >
                </Grey_wrap_trade >
                <CommonFooter />
            </Contact_wrap >
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        cryptoPair: state.walletReducer.cryptoPair !== undefined ? state.walletReducer.cryptoPair : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}
const mapDispatchToProps = dispatch => ({
    cryptoCurrency: (Pair) => dispatch(cryptoCurrency(Pair)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Trade);