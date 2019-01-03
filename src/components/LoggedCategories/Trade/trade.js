import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import { Row, Col, Tabs, Input, Radio } from 'antd';
import styled from 'styled-components';
/* import Tableofcoin from './TableofCoin'
import WalletDetails from './WalletDetails' */
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
import {
    Row_wrap, Left_div, Left_div1, Left_div2, Instru, SearchInput, Right_div1, Right_div, Buy_table,
    FIAT_wrap, FIAT, Sect, InstruTable, TableIns, Tabs_right, Row_wrap2, BBC_wrap, BBC_wrap2, BBC2
} from "../../../styled-components/loggedStyle/tradeStyle";
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
let io = sailsIOClient(socketIOClient);
const Search = Input.Search;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"} ;
    border-radius:5px;
    max-width:1170px;
    padding-bottom: 30px;
`
const Inputsearch = styled(Search)`
    width: 100%;
    height: 40px;
    >input
    {
        background-color:${props => props.theme.mode == "dark" ? "#020e18" : ""};
    }
    >span>i
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
const Table_wrap = styled.div`  
    margin-left:-30px;
    margin-right:-30px; 
    @media(max-width:1160px)
    {
        overflow:scroll
    }
`
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
}, {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
}, {
    title: 'Volume',
    dataIndex: 'volume',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.volume - b.volume
},
{
    title: 'Change',
    dataIndex: 'change',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.change - b.change
}];

const data = [{
    key: '1',
    name: 'John Brown',
    price: 32,
    volume: 'New York No. 1 Lake Park',
    change: "+0.92%"
}, {
    key: '2',
    name: 'Jim Green',
    price: 42,
    volume: 'London No. 1 Lake Park',
    change: "+0.92%"
}, {
    key: '3',
    name: 'Joe Black',
    price: 32,
    volume: 'Sidney No. 1 Lake Park',
    change: "+0.92%"
}, {
    key: '4',
    name: 'Jim Red',
    price: 32,
    volume: 'London No. 2 Lake Park',
    change: "+0.92%"
}];
const TabPane = Tabs.TabPane;

class Trade extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        io.sails.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.props.isLoggedIn
        }
    }
    searchChange(value) {

    }
    submitSearch(e) {

    }
    onChange(pagination, filters, sorter) {
        console.log('params', pagination, filters, sorter);
    }

    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <Contact_wrap>
                <LoggedNavigation />
                <Grey_wrap>
                    <ContainerContact>
                        <Row_wrap>
                            <Row>
                                <Col md={24} lg={14}>
                                    <Left_div1>
                                        <Instru>INSTRUMENTS</Instru>
                                        <SearchInput />
                                        <FIAT_wrap>
                                            <FIAT>
                                                <RadioGroup defaultValue="a" size="large" buttonStyle="solid">
                                                    <RadioButton value="a">Hangzhou</RadioButton>
                                                    <RadioButton value="b">Shanghai</RadioButton>
                                                    <RadioButton value="c">Beijing</RadioButton>
                                                    <RadioButton value="d">Chengdu</RadioButton>
                                                </RadioGroup>
                                            </FIAT>
                                        </FIAT_wrap>
                                        <InstruTable>
                                            <TableIns pagination={false} columns={columns} dataSource={data} onChange={this.onChange} />
                                        </InstruTable>
                                    </Left_div1>
                                </Col>
                                <Col md={24} lg={10}>
                                    <Right_div1>
                                        <Tabs_right defaultActiveKey="1" onChange={this.callback}>
                                            <TabPane tab="Market" key="1"><Market /></TabPane>
                                            <TabPane tab="Limit" key="2"><Limit /></TabPane>
                                            <TabPane tab="Stop-Limit" key="3"><StopLimit /></TabPane>
                                        </Tabs_right>
                                    </Right_div1>
                                </Col>
                            </Row>
                        </Row_wrap>
                        <Row_wrap2>
                            <Row>
                                <Col md={24} lg={12}>
                                    <Left_div>
                                        <Instru>ORDER BOOK BBC/BTC</Instru>
                                        <BBC_wrap>
                                            <BuyTable io={io} />
                                        </BBC_wrap>

                                        <BBC_wrap2>
                                            <SellTable io={io} />
                                        </BBC_wrap2>
                                    </Left_div>
                                </Col>
                                <Col md={24} lg={12}>
                                    <Right_div1>
                                        <DepthChart />
                                    </Right_div1>
                                </Col>
                            </Row>
                        </Row_wrap2>
                        <Row_wrap2>
                            <Row>
                                <Col span={24}>
                                    <Left_div2>
                                        <Instru>ORDER HISTORY</Instru>
                                        <HistoryTable io={io} />
                                    </Left_div2>
                                </Col>
                            </Row>
                        </Row_wrap2>
                        <Row_wrap2>
                            <Row>
                                <Col span={24}>
                                    <Left_div2>
                                        <Instru>MY ORDERS AND TRADES</Instru>
                                        <OrderTrade />
                                    </Left_div2>
                                </Col>
                            </Row>
                        </Row_wrap2>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
            </Contact_wrap>
        );
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Trade);