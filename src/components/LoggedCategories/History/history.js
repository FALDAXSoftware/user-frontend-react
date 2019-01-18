import React, { Component } from 'react';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker, Checkbox, Select } from 'antd';
import { MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import { Contact_wrap, Grey_wrap } from "../../../styled-components/landingCategories/contactStyle"
import {
    ContainerContact, His_title, His_wrap, Tablediv, HisTable, HeadHis, Filter,
    EXPButton, Dropwrap, Dropwrap2, ButtonToolbarOne, DropdownButtonOne, Datediv, RangePickerS
} from "../../../styled-components/loggedStyle/historyStyle"
import { CSVLink, CSVDownload } from "react-csv";
import { globalVariables } from '../../../Globals';
import { Button } from 'antd/lib/radio';

let { API_URL } = globalVariables;
const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

const Option = Select.Option;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: 'BUY', value: 'BUY' },
    { label: 'SELL', value: 'SELL' },
    { label: 'SEND', value: 'SEND' },
    { label: 'RECEIVE', value: 'RECEIVE' },
];

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinList: [],
            toDate: moment().format("YYYY-MM-DD"),
            fromDate: moment(moment().subtract(1, 'months'), "YYYY-MM-DD").format("YYYY-MM-DD"),
            historyData: [],
            sell: true,
            buy: true,
            send: true,
            receive: true
        }
        this.historyResult = this.historyResult.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.repeatClick = this.repeatClick.bind(this);
    }
    componentDidMount() {
        this.historyResult();
    }
    historyResult() {

        fetch(API_URL + `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&toDate=${this.state.toDate}&fromDate=${this.state.fromDate}&sell=${this.state.sell}&symbol=ETH-BTC`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }

        })
            .then(response => response.json())
            .then((responseData) => {
                /*  this.setState({myCoins:responseData}); */
                this.setState({ historyData: responseData.data });
            })
            .catch(error => {
            })
    }
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    isabledRangeTime(_, type) {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }

    changeDate(date, dateString) {
        var self = this;
        console.log(date, dateString)
        var fromDate = "";
        fromDate = dateString[0].format();
        var toDate = ""
        toDate = dateString[1].format();
        console.log("dates ---- ", fromDate, toDate);

        this.setState({ toDate, fromDate }, () => {
            self.historyResult();
        });

    }

    onChangeCheck(checkedValues) {
        var self = this;
        var send, receive, sell, buy;
        if (checkedValues.includes("SEND")) {
            send = true;
        }
        else {
            send = false;
        }
        if (checkedValues.includes("RECEIVE")) {
            receive = true;
        }
        else {
            receive = false;
        }
        if (checkedValues.includes("BUY")) {
            buy = true;
        }
        else {
            buy = false;
        }
        if (checkedValues.includes("SELL")) {
            sell = true;
        }
        else {
            sell = false;
        }
        this.setState({ send, receive, sell, buy }, () => {
            self.historyResult();
        });
    }
    selectChange1(value) {
        console.log(value)
    }
    selectChange2(value) {
        console.log(value)
    }
    repeatClick(data) {
        console.log(data)
        if (data.order_type == "Limit") {
            let params = {
                symbol: data.symbol,
                side: data.side,
                order_type: data.order_type,
                orderQuantity: data.quantity,
                limit_price: data.limit_price
            };
            fetch(API_URL + "/limit/" + data.side.toLowerCase(), {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.props.isLoggedIn
                },
                body: JSON.stringify(params)
            }).then(response => response.json())
                .then((responseData) => {
                    if (responseData.status == 200) {
                        this.historyResult();
                    } else {
                    }
                }).catch(error => {

                });
        }
        else if (data.order_type == "StopLimit") {
            let params = {
                symbol: data.symbol,
                side: data.side,
                order_type: data.order_type,
                orderQuantity: data.quantity,
                limit_price: data.limit_price,
                stop_price: data.stop_price
            }
            fetch(API_URL + "/stop/limit/" + data.side.toLowerCase(), {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.props.isLoggedIn
                },
                body: JSON.stringify(params)
            }).then(response => response.json())
                .then((responseData) => {
                    if (responseData.status == 200) {
                        this.historyResult();
                    } else {

                    }
                }).catch(error => {

                });
        }
        else if (data.order_type == "Market") {
            let params = {
                symbol: data.symbol,
                side: data.side,
                order_type: data.order_type,
                orderQuantity: data.quantity
            }
            fetch(API_URL + "/market/" + data.side.toLowerCase(), {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.props.isLoggedIn
                },
                body: JSON.stringify(params)
            }).then(response => response.json())
                .then((responseData) => {
                    if (responseData.status == 200) {
                        this.historyResult();
                    } else {

                    }
                }).catch(error => {
                });
        }
    }
    getSide
    render() {
        var self = this;
        return (
            <div>
                <Contact_wrap>
                    <LoggedNavigation />
                    <Grey_wrap>
                        <ContainerContact>
                            <HeadHis>
                                <Filter>
                                    <div style={{ display: "inline-flex", width: "390px", alignItems: "center" }}>
                                        <Select style={{ width: 120 }} onChange={this.selectChange1}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        <FontAwesomeIcon icon={faExchangeAlt} color='#909090' style={{ margin: "0px 20px" }} />
                                        <Select style={{ width: 120 }} onChange={this.selectChange2}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </div>
                                    <Datediv>
                                        <RangePickerS
                                            disabledDate={this.disabledDate}
                                            disabledTime={this.disabledRangeTime}
                                            onChange={this.changeDate}
                                            defaultValue={[moment(moment().subtract(1, 'months'), "YYYY-MM-DD"), moment(moment(), "YYYY-MM-DD")]}
                                            format="YYYY-MM-DD"
                                        />
                                    </Datediv>
                                    <EXPButton><CSVLink data={csvData}>EXPORT</CSVLink></EXPButton>
                                </Filter>
                                <div style={{ paddingLeft: "15px", marginTop: "20px" }}>
                                    <CheckboxGroup options={options} defaultValue={['SEND', 'RECEIVE', 'SELL', 'BUY']} onChange={this.onChangeCheck} />
                                </div>
                            </HeadHis>
                            <His_wrap>
                                <His_title>HISTORY</His_title>
                                <Tablediv>
                                    <HisTable responsive striped condensed>
                                        <thead>
                                            <tr>
                                                <th>Coin</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                                <th>Filled price</th>
                                                <th>Amount</th>
                                                <th>FEE</th>
                                                <th>Volume</th>
                                                <th>Repeat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {console.log(this.state.historyData)}
                                            {this.state.historyData.length > 0 ?
                                                this.state.historyData.map(function (temp) {
                                                    console.log(temp)
                                                    var date = moment.utc(temp.created_at).local().format("MMM DD,YYYY HH:mm:ss");
                                                    return (<tr>
                                                        <td>{temp.symbol}</td>
                                                        <td>{date}</td>
                                                        <td>{temp.side}</td>
                                                        <td>{temp.fill_price}</td>
                                                        <td>{temp.quantity}</td>
                                                        <td>{temp.maker_fee}</td>
                                                        <td>{temp.fill_price * temp.quantity}</td>
                                                        <td><Button onChange={() => self.repeatClick(temp)}>Repeat</Button></td>
                                                    </tr>);
                                                })
                                                : ""
                                            }
                                        </tbody>
                                    </HisTable>
                                </Tablediv>
                            </His_wrap>
                        </ContainerContact>
                    </Grey_wrap>
                    <CommonFooter />
                </Contact_wrap>
            </div >
        );
    }
}


function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        profileData: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : {}
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}
export default connect(mapStateToProps)(History);