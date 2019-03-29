import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import { Spin, Row, Col, Tabs, Input, Radio, Select, notification, Icon, Menu, Tooltip } from 'antd';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faLinkedinIn, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { widget } from '../../../charting_library/charting_library.min';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
/* import Tableofcoin from './TableofCoin'
import WalletDetails from './WalletDetails' */
import Loader from '../../../shared-components/Loader'
import Navigation from '../../Navigations/Navigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import Market from "./Market";
import Limit from "./Limit";
import StopLimit from "./StopLimit";
import BuySell from './BuySell';
import OrderHIstory from './orderHistory'
import DepthChart from './DepthChart';
import OrderTrade from './OrderTrade';
import { Container } from '../../../styled-components/homepage/style';
import { Contact_wrap, Grey_wrap } from "../../../styled-components/landingCategories/contactStyle"
import { cryptoCurrency } from '../../../Actions/LoggedCat/tradeActions'
import { Spin_Ex } from '../../../styled-components/homepage/style'
import {
    Row_wrap, Left_div, EditDiv, SwitchS, Layout, SaveButton, EditButton, MainTV, TVBar, Left_div1, Left_div2, Instru, SearchInput, Right_div1, Right_div, Buy_table,
    FIAT_wrap, FIAT_wrap2, FIAT, Sect, InstruTable, TableIns, Tabs_right, Row_wrap2, BBC_wrap, BBC_wrap2, BBC2, RadioSelect, Orderwrap, InstruOrder, Selectmonth, SettingDropdown
} from "../../../styled-components/loggedStyle/tradeStyle";
import {
    Spin_single
} from "../../../styled-components/loggedStyle/dashStyle"
import { globalVariables } from '../../../Globals';
import TradingViewChart from "../../TradingViewChart";


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

let { API_URL, tvChartURL } = globalVariables;
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
    padding-top:120px;
`

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    className: 'tblInsName',
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
    className: 'tblInsPrice',
    sorter: (a, b) => a.price - b.price,
}, {
    title: 'Volume',
    dataIndex: 'volume',
    defaultSortOrder: 'ascend',
    className: 'tblInsVolumn',
    render: text => text.toFixed(4),
    sorter: (a, b) => a.volume - b.volume,
    sortDirections: ['descend', 'ascend'],
},
{
    title: 'Change',
    dataIndex: 'change',
    defaultSortOrder: 'ascend',
    className: 'tblInsChange',
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
            searchedInstu: null,
            userBal: {},
            insLoader: false,
            userBalLoader: false,
            instrumentTableHeight: 260,
            orderHistoryTableHeight: 330,
            myOrderTableHeight: 150,
            buySellOrderHeight: 91,
            depthChartHeight: 380,
            buySellLoader: false,
            hisLoader: false,
            depthLoader: false,
            editState: false,
            saveState: true,
            isFullscreen: false,
            prevlayout: JSON.parse(JSON.stringify(originalLayouts)),
            layouts: JSON.parse(JSON.stringify(originalLayouts)),
            MLS: "",
            loader: false
        };
        io = this.props.io;
        // io.sails.url = API_URL;
        this.handleChange = this.handleChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.getUserBal = this.getUserBal.bind(this);
        this.onInsChange = this.onInsChange.bind(this);
        this.getInstrumentData = this.getInstrumentData.bind(this);
        this.updateInstrumentsData = this.updateInstrumentsData.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.goFullScreen = this.goFullScreen.bind(this);
        this.exitFullScreen = this.exitFullScreen.bind(this);
        this.callback = this.callback.bind(this);
        // this.handleLayoutResize = this.handleLayoutResize.bind(this);
    }
    componentWillReceiveProps(props, newProps) {
        var self = this;
        if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
            if (props.cryptoPair.crypto !== this.state.crypto) {
                this.setState({ crypto: props.cryptoPair.crypto, prevRoom: props.cryptoPair.prevRoom }, () => {
                    self.orderSocket(self.state.timePeriod, self.state.status);
                    self.getUserBal();
                })
            }
            if (props.cryptoPair.currency !== this.state.currency) {
                this.setState({ currency: props.cryptoPair.currency, prevRoom: props.cryptoPair.prevRoom }, () => {
                    self.orderSocket(self.state.timePeriod, self.state.status)
                    self.getUserBal();
                })
            }
        }
    }
    componentDidMount() {
        var self = this;
        io.sails.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.props.isLoggedIn
        }
        this.orderSocket(this.state.timePeriod, this.state.status);
        this.getInstrumentData();
        this.getUserBal();
        io.socket.on("walletBalanceUpdate", (data) => {
            self.setState({ userBal: data });
        });
        io.socket.on('orderUpdated', (data) => {
            self.orderSocket(self.state.timePeriod, self.state.status);
            // self.getUserBal();

        });

    }
    onInsChange(e) {
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
    }
    getInstrumentData() {
        var self = this;
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

            if (body.status == 200) {
                self.updateInstrumentsData(body.data)
            }
        });
        io.socket.on('instrumentUpdate', (data) => {
            self.updateInstrumentsData(data)
        });

    }
    updateInstrumentsData(data) {
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
    class = "tbl-content"
    callback(key) {
        this.setState({
            MLS: key
        });
    }
    handleChange(value) {
        this.setState({ timePeriod: value.key });
        this.orderSocket(value.key, this.state.status);
    }
    statusChange(e) {
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
        this.setState({ orderTradeData: response })
    }
    cancelOrder(id, side, type) {
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
        this.props.cryptoCurrency(cryptoPair)
    }
    getUserBal() {
        var URL;
        this.setState({ userBalLoader: true });
        if (Object.keys(this.state.prevRoom).length > 0)
            URL = `/socket/get-user-balance?prevRoom=${this.state.prevRoom.crypto}-${this.state.prevRoom.currency}&room=${this.state.crypto}-${this.state.currency}&userId=${this.props.profileDetails.id}`
        else
            URL = `/socket/get-user-balance?room=${this.state.crypto}-${this.state.currency}&userId=${this.props.profileDetails.id}`
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
                this.setState({ userBal: res, userBalLoader: false })
            }
        });
        io.socket.on('orderUpdate', (data) => {

            this.setState({ userBal: data, userBalLoader: false })
        });
    }
    searchInstu(e) {
        var search = e.target.value;
        if (search.trim() !== "") {
            var searchedInstu = this.state.InsData.filter(function (temp) {
                if (temp.name.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
                else {
                    return false;
                }
            })
            this.setState({ searchedInstu });
        }
        else {
            this.setState({ searchedInstu: null });
        }
    }
    /* componentWillUnmount() {
        if (this.tvWidget !== null) {
            this.tvWidget.remove();
            this.tvWidget = null;
        }
    } */

    /* RGL starts here */
    // handleLayoutResize(layout, oldItem, newItem) {
    //     let self = this;
    //     console.log(layout, oldItem, newItem)
    //     if (oldItem.i == "instruments") {
    //         if (oldItem.h != newItem.h) {
    //             let newHeight = 0;
    //             if (newItem.h == 2) {
    //                 newHeight = 100;
    //             } else {
    //                 newHeight = 100 + (160 * (newItem.h - 2))
    //             }
    //             self.setState({
    //                 instrumentTableHeight: newHeight
    //             });
    //         }
    //     }

    //     if (oldItem.i == "orderHistory") {

    //         if (oldItem.h != newItem.h) {
    //             let newHeight = 0;
    //             if (newItem.h == 2) {
    //                 newHeight = 170;
    //             } else {
    //                 newHeight = 170 + (160 * (newItem.h - 2))
    //             }
    //             self.setState({
    //                 orderHistoryTableHeight: newHeight

    //             });
    //         }

    //     }
    //     if (oldItem.i == "myorder") {

    //         if (oldItem.h != newItem.h) {
    //             let newHeight = 0;
    //             if (newItem.h == 2) {
    //                 newHeight = 155;
    //             } else {
    //                 newHeight = 155 + (160 * (newItem.h - 2))
    //             }
    //             self.setState({
    //                 myOrderTableHeight: newHeight

    //             });
    //         }

    //     }
    //     if (oldItem.i == "buysellBook") {
    //         if (oldItem.h != newItem.h) {
    //             let newHeight = 0;
    //             if (newItem.h == 3) {
    //                 newHeight = 91;
    //             } else {
    //                 newHeight = 91 + (80 * (newItem.h - 3))
    //             }
    //             self.setState({
    //                 buySellOrderHeight: newHeight

    //             });
    //         }
    //     }
    // }
    onLayoutChange(currentLayout, wholeLayout) {
        let self = this;
        let instrumentTableHeight, orderHistoryTableHeight, myOrderTableHeight, buySellOrderHeight, depthChartHeight;
        for (let index = 0; index < currentLayout.length; index++) {
            const element = currentLayout[index];
            if (element.i == "instruments") {
                let newHeight = 0;
                if (element.h == 2) {
                    newHeight = 100;
                } else {
                    newHeight = 100 + (160 * (element.h - 2))
                }
                instrumentTableHeight = newHeight;
            }
            if (element.i == "orderHistory") {
                let newHeight = 0;
                if (element.h == 2) {
                    newHeight = 170;
                } else {
                    newHeight = 170 + (160 * (element.h - 2))
                }
                orderHistoryTableHeight = newHeight;
            }
            if (element.i == "myorder") {

                let newHeight = 0;
                if (element.h == 2) {
                    newHeight = 150;
                } else {
                    newHeight = 150 + (160 * (element.h - 2))
                }
                myOrderTableHeight = newHeight;
            }

            if (element.i == "buysellBook") {
                let newHeight = 0;
                if (element.h == 3) {
                    newHeight = 91;
                } else {
                    newHeight = 91 + (80 * (element.h - 3))
                }
                buySellOrderHeight = newHeight;
            }
            if (element.i == "depthChart") {
                let newHeight = 0;
                if (element.h == 3) {
                    newHeight = 380;
                } else {
                    newHeight = 380 + (160 * (element.h - 3))
                }
                depthChartHeight = newHeight;

            }
        }
        this.setState({
            layouts: wholeLayout,
            instrumentTableHeight,
            orderHistoryTableHeight,
            myOrderTableHeight,
            buySellOrderHeight,
            depthChartHeight
        });
    }
    saveToLS(key, value) {
        if (global.localStorage) {
            global.localStorage.setItem(
                "rgl-8",
                JSON.stringify({
                    [key]: value
                })
            );
        }
    }
    /* RGL ends here */

    popWindow() {
        var newWindow = window.open("localhost:3000/trade", "", "width=300, height=200");
    }
    buySellLoaderFunc(loader) {
        this.setState({ buySellLoader: loader })
    }
    hisFunc(loader) {
        this.setState({ hisLoader: loader });
    }
    depthLoaderFunc(loader) {
        this.setState({ depthLoader: loader });
    }
    editLayout() {
        if (this.state.editState == false)
            this.setState({ editState: true, saveState: false });
        else
            this.setState({ editState: false });
    }
    clearLayout() {
        if (this.state.saveState == false) {
            this.setState({ saveState: true, editState: false, layouts: this.state.prevlayout });

        }
        else {
            this.setState({ saveState: false });
        }
    }
    saveLayout() {
        if (this.state.saveState == false) {
            this.setState({ saveState: true, editState: false, prevlayout: this.state.layouts });
            this.saveToLS("layouts", this.state.layouts);
        }
        else {
            this.setState({ saveState: false });
        }

    }
    goFullScreen() {
        let body = document.getElementsByTagName("body");
        let element = body[0];
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { /* Firefox */
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE/Edge */
            element.msRequestFullscreen();
        }
        this.setState({
            isFullscreen: true
        });
    }
    exitFullScreen() {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.msExitFullscreen)
            document.msExitFullscreen();

        this.setState({
            isFullscreen: false
        });
    }
    render() {
        var self = this;

        const menu = (
            <Menu className="SettingMenu">
                <Menu.Item onClick={this.editLayout.bind(this)} disabled={this.state.editState} key="1">Edit Layout</Menu.Item>

                {self.state.isFullscreen &&
                    <Menu.Item key="2" onClick={this.exitFullScreen}><Icon type="fullscreen-exit" />Exit Full Screen</Menu.Item>
                }
                {!self.state.isFullscreen &&
                    <Menu.Item key="2" onClick={this.goFullScreen}><Icon type="fullscreen" /> Full Screen</Menu.Item>
                }
                <Menu.Item onClick={this.clearLayout.bind(this)} disabled={this.state.saveState} key="3">Clear Layout</Menu.Item>
                <Menu.Item onClick={this.saveLayout.bind(this)} disabled={this.state.saveState} key="2">Save</Menu.Item>
            </Menu>
        );
        return (
            <Contact_wrap>
                <SettingDropdown overlay={menu} placement="bottomLeft" trigger={["click"]} overlayClassName="dropSettings">
                    <Icon type="setting" />
                </SettingDropdown>
                <Navigation />
                <Grey_wrap_trade>
                    {/* <Row>
                        <Col>
                            <Layout>
                                <EditButton  >Edit Layout</EditButton>
                                <SaveButton>Save</SaveButton>
                            </Layout>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col>
                            {/* <img src="/images/tradingview.png" width="100%" style={{ marginBottom: "30px" }} /> */}

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ResponsiveReactGridLayout
                                className="layout"
                                layouts={this.state.layouts}
                                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                                isDraggable={this.state.editState}
                                isResizable={this.state.editState}
                                onBreakpointChange={(newBreakpoint: string, newCols: number) => console.log("BREAK", newBreakpoint, newCols)}
                                onLayoutChange={(layout, layouts) =>
                                    this.onLayoutChange(layout, layouts)
                                }

                            >
                                <div key="tradeView">
                                    <div style={{ height: "100%", width: "100%" }}>
                                        <MainTV >
                                            <TVBar>
                                                <div>
                                                    <span>{this.state.crypto}-{this.state.currency}</span>
                                                </div>
                                                <div onClick={() => { window.open(tvChartURL, '_blank', 'location=yes,height=800,width=1000,scrollbars=yes,status=yes'); }} style={{ marginLeft: "auto" }}>
                                                    <Tooltip placement="bottomLeft" title={"Chart in New Window"}>
                                                        <Icon type="arrows-alt" />
                                                    </Tooltip>
                                                </div>
                                            </TVBar>
                                            <TradingViewChart crypto={this.state.crypto} currency={this.state.currency} theme={this.props.theme} />
                                        </MainTV>
                                    </div>
                                </div>
                                <div key="instruments">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {
                                            this.state.insLoader == true ?

                                                <Loader color="#1990ff" width="50" height='50' />
                                                : ""
                                        }
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
                                                    pagination={false} columns={columns} dataSource={this.state.searchedInstu == null ? this.state.InsData : this.state.searchedInstu.length == 0 ? [] : this.state.searchedInstu} onChange={this.onChange} scroll={{ y: self.state.instrumentTableHeight }} />
                                            </InstruTable>
                                        </Left_div1>

                                    </div>
                                </div>
                                <div key="tradeAction">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {this.state.userBalLoader == true ?
                                            <Loader color="#1990ff" width="50" height='50' />
                                            : ""
                                        }
                                        <Right_div1>
                                            <Tabs_right defaultActiveKey="1" onChange={this.callback} className="tardeActionCard">
                                                <TabPane tab="Market" key="1"><Market MLS={this.state.MLS} userBal={this.state.userBal} /></TabPane>
                                                <TabPane tab="Limit" key="2"><Limit MLS={this.state.MLS} userBal={this.state.userBal} /></TabPane>
                                                <TabPane tab="Stop-Limit" key="3"><StopLimit MLS={this.state.MLS} userBal={this.state.userBal} /></TabPane>
                                            </Tabs_right>
                                        </Right_div1>

                                    </div>
                                </div>
                                <div key="buysellBook">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {this.state.buySellLoader == true
                                            ?
                                            <Loader color="#1990ff" width="50" height='50' />
                                            : ""
                                        }
                                        <BuySell crypto={this.state.crypto} currency={this.state.currency} buySellLoader={(loader) => { this.buySellLoaderFunc(loader) }} io={io} height={this.state.buySellOrderHeight} />
                                    </div>
                                </div>
                                <div key="depthChart" >
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {
                                            this.state.depthLoader == true ?
                                                <Loader color="#1990ff" width="50" height='50' />
                                                : ""
                                        }
                                        <Right_div>
                                            <DepthChart crypto={this.state.crypto} currency={this.state.currency} depthLoaderFunc={(loader) => this.depthLoaderFunc(loader)} io={io} height={this.state.depthChartHeight} />
                                        </Right_div>
                                    </div>
                                </div>
                                <div key="orderHistory">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {this.state.hisLoader == true
                                            ?
                                            <Loader color="#1990ff" width="50" height='50' />
                                            : ""
                                        }
                                        <OrderHIstory io={io} hisFunc={(loader) => this.hisFunc(loader)} height={self.state.orderHistoryTableHeight} />
                                    </div>
                                </div>
                                <div key="myorder">
                                    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                                        {this.state.orderTradeLoader == true ?
                                            <Loader color="#1990ff" width="50" height='50' />
                                            : ""
                                        }
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
                                            <OrderTrade profileDetails={this.props.profileDetails} pending={this.state.status} cancelOrder={(id, side, type) => { this.cancelOrder(id, side, type) }} orderTradeData={this.state.orderTradeData} height={self.state.myOrderTableHeight} />
                                        </Left_div2>
                                    </div>
                                </div>
                            </ResponsiveReactGridLayout>
                        </Col >
                    </Row >
                </Grey_wrap_trade >
                <CommonFooter />
                {(this.props.loader || this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Contact_wrap >
        );
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        cryptoPair: state.walletReducer.cryptoPair !== undefined ? state.walletReducer.cryptoPair : "",
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        loader: state.simpleReducer.loader ? state.simpleReducer.loader : false
    })
}
const mapDispatchToProps = dispatch => ({
    cryptoCurrency: (Pair) => dispatch(cryptoCurrency(Pair)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Trade);


function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {
                layouts: {
                    lg: [
                        { i: "tradeView", x: 0, y: 0, w: 12, h: 6, minW: 6, minH: 3 },
                        { i: 'instruments', x: 0, y: 1, w: 4, h: 3, minW: 4, minH: 2 },
                        { i: 'tradeAction', x: 4, y: 1, w: 4, h: 3, minW: 4, minH: 2, maxH: 5 },
                        { i: 'buysellBook', x: 8, y: 1, w: 4, h: 3, minW: 4, minH: 3 },
                        { i: 'depthChart', x: 0, y: 2, w: 6, h: 3, minH: 3, maxH: 3, minW: 4 },
                        { i: 'orderHistory', x: 7, y: 2, w: 6, h: 3, minH: 2, minW: 4 },
                        { i: 'myorder', x: 0, y: 4, w: 12, h: 2, minW: 6, minH: 2 }
                    ],
                    md: [
                        { i: "tradeView", x: 0, y: 0, w: 10, h: 3, minH: 3 },
                        { i: 'instruments', x: 0, y: 1, w: 5, h: 2, minW: 5 },
                        { i: 'tradeAction', x: 5, y: 1, w: 5, h: 2, minW: 5 },
                        { i: 'buysellBook', x: 0, y: 2, w: 5, h: 3, minH: 3, minW: 5 },
                        { i: 'depthChart', x: 5, y: 2, w: 5, h: 2, minW: 5 },
                        { i: 'orderHistory', x: 0, y: 3, w: 10, h: 2, minH: 2, minW: 5 },
                        { i: 'myorder', x: 0, y: 4, w: 10, h: 4, minW: 5, minH: 4 }
                    ],
                    sm: [
                        { i: "tradeView", x: 0, y: 0, w: 6, h: 3, minH: 3 },
                        { i: 'instruments', x: 0, y: 1, w: 6, h: 2, minW: 6 },
                        { i: 'tradeAction', x: 0, y: 2, w: 6, h: 2, minW: 6 },
                        { i: 'buysellBook', x: 0, y: 3, w: 6, h: 3, minH: 3, minW: 6 },
                        { i: 'depthChart', x: 0, y: 4, w: 6, h: 2, minW: 6 },
                        { i: 'orderHistory', x: 0, y: 5, w: 6, h: 2, minH: 2, minW: 6 },
                        { i: 'myorder', x: 0, y: 6, w: 6, h: 2, minW: 6 }
                    ],
                    xs: [
                        { i: "tradeView", x: 0, y: 0, w: 4, h: 3, minH: 3 },
                        { i: 'instruments', x: 0, y: 1, w: 4, h: 2, minW: 4 },
                        { i: 'tradeAction', x: 0, y: 2, w: 4, h: 2, minW: 4 },
                        { i: 'buysellBook', x: 0, y: 3, w: 4, h: 3, minH: 3, minW: 4 },
                        { i: 'depthChart', x: 0, y: 4, w: 4, h: 2, minW: 4 },
                        { i: 'orderHistory', x: 0, y: 5, w: 4, h: 2, minH: 2, minW: 4 },
                        { i: 'myorder', x: 0, y: 5, w: 5, h: 2, minW: 4 }
                    ],
                    xxs: [
                        { i: "tradeView", x: 0, y: 0, w: 2, h: 3, minH: 3 },
                        { i: 'instruments', x: 0, y: 1, w: 2, h: 2, minW: 2 },
                        { i: 'tradeAction', x: 0, y: 2, w: 2, h: 2, minW: 2 },
                        { i: 'buysellBook', x: 0, y: 3, w: 2, h: 3, minH: 3, minW: 2 },
                        { i: 'depthChart', x: 0, y: 4, w: 2, h: 2, minW: 2 },
                        { i: 'orderHistory', x: 0, y: 5, w: 2, h: 2, minH: 2, minW: 2 },
                        { i: 'myorder', x: 0, y: 6, w: 2, h: 2, minW: 2 }
                    ]
                }
            };
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}