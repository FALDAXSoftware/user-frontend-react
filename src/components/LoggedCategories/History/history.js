import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components'
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker, Checkbox, Select } from 'antd';
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

const Option = Select.Option;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: 'BUY', value: 'BUY' },
    { label: 'SELL', value: 'SELL' },

];
const Select1 = styled(Select)`
    & .ant-select-selection
    {
        background-color:${props => props.theme.mode == "dark" ? "#01090f" : ""};
    }
    & .ant-select-arrow>i
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    & .ant-select-selection-selected-value
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
const Select2 = styled(Select)`
& .ant-select-selection
    {
        background-color:${props => props.theme.mode == "dark" ? "#01090f" : ""};
    }
    & .ant-select-arrow>i
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    & .ant-select-selection-selected-value
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
const CheckboxGroupS = styled(CheckboxGroup)`
    & .ant-checkbox-group-item>span
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinList: [],
            drop1List: [],
            drop2List: [],
            toDate: moment().format("YYYY-MM-DD"),
            fromDate: moment(moment().subtract(1, 'months'), "YYYY-MM-DD").format("YYYY-MM-DD"),
            historyData: [],
            sell: true,
            buy: true,
            send: true,
            receive: true,
            drop1Value: '',
            drop2Value: '',
        }
        this.historyResult = this.historyResult.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.repeatClick = this.repeatClick.bind(this);
        this.loadCoinList = this.loadCoinList.bind(this);
        this.selectChange1 = this.selectChange1.bind(this);
        this.selectChange2 = this.selectChange2.bind(this);
    }
    componentDidMount() {
        this.historyResult();
        this.loadCoinList();
    }
    loadCoinList() {
        var self = this;
        fetch(API_URL + "/coin-list", {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            },
        }).then(response => response.json())
            .then((responseData) => {
                self.setState({
                    coinList: responseData.data,
                    drop1List: responseData.data,
                    drop2List: responseData.data
                });
            }).catch(error => {
            });
    }
    historyResult() {
        let url = API_URL + `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&toDate=${this.state.toDate}&fromDate=${this.state.fromDate}&sell=${this.state.sell}`;
        if (this.state.drop1Value != '' && this.state.drop1Value != '') {
            url = url + '&symbol=' + this.state.drop1Value + '-' + this.state.drop2Value
        }
        fetch(url, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }).then(response => response.json())
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
        var fromDate = "";
        fromDate = dateString[0].format();
        var toDate = ""
        toDate = dateString[1].format();

        this.setState({ toDate, fromDate }, () => {
            self.historyResult();
        });
    }

    onChangeCheck(checkedValues) {
        var self = this;
        var send, receive, sell, buy;
        if (checkedValues.includes("SEND")) {
            send = true;
        } else {
            send = false;
        }
        if (checkedValues.includes("RECEIVE")) {
            receive = true;
        } else {
            receive = false;
        }
        if (checkedValues.includes("BUY")) {
            buy = true;
        } else {
            buy = false;
        }
        if (checkedValues.includes("SELL")) {
            sell = true;
        } else {
            sell = false;
        }
        this.setState({ send, receive, sell, buy }, () => {
            self.historyResult();
        });
    }
    selectChange1(value) {
        var self = this;
        let coinList = [...this.state.coinList];
        for (let index = 0; index < coinList.length; index++) {
            const element = coinList[index];
            if (element.coin == value) {
                coinList.splice(index, 1);
                break;
            }
        }
        this.setState({
            drop2List: coinList,
            drop1Value: value
        }, () => {
            self.historyResult();
        });
    }
    selectChange2(value) {
        var self = this;
        let coinList = [...this.state.coinList];
        for (let index = 0; index < coinList.length; index++) {
            const element = coinList[index];
            if (element.coin == value) {
                coinList.splice(index, 1);
                break;
            }
        }
        this.setState({
            drop1List: coinList,
            drop2Value: value

        }, () => {
            self.historyResult();
        });
    }
    repeatClick(data) {
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
                                        <Select1 showSearch style={{ width: 120 }} onChange={this.selectChange1}>
                                            {
                                                this.state.drop1List.map(element => (
                                                    <Option value={element.coin}>{element.coin}</Option>
                                                ))
                                            }
                                        </Select1>
                                        <FontAwesomeIcon icon={faExchangeAlt} color='#909090' style={{ margin: "0px 20px" }} />
                                        <Select2 showSearch style={{ width: 120 }} onChange={this.selectChange2}>
                                            {
                                                this.state.drop2List.map(element => (
                                                    <Option value={element.coin}>{element.coin}</Option>
                                                ))
                                            }
                                        </Select2>
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
                                    <EXPButton><CSVLink data={this.state.historyData}>EXPORT</CSVLink></EXPButton>
                                </Filter>
                                <div style={{ paddingLeft: "15px", marginTop: "20px" }}>
                                    <CheckboxGroupS options={options} defaultValue={['SEND', 'RECEIVE', 'SELL', 'BUY']} onChange={this.onChangeCheck} />
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
                                                <th>Side</th>
                                                <th>Filled price</th>
                                                <th>Amount</th>
                                                <th>FEE</th>
                                                <th>Volume</th>
                                                {/* <th>Repeat</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.historyData.length > 0 ?
                                                this.state.historyData.map(function (temp) {
                                                    var date = moment.utc(temp.created_at).local().format(`${self.props.profileData.date_format} HH:mm:ss`);
                                                    var side = Number(temp.user_id) == self.props.profileData.id ? temp.side : temp.side == "Buy" ? "Sell" : "Buy";
                                                    var fee = Number(temp.user_id) == self.props.profileData.id ? temp.user_fee.toFixed(2) : temp.requested_fee.toFixed(2);
                                                    return (<tr>
                                                        <td>{temp.symbol}</td>
                                                        <td>{date}</td>
                                                        <td>{side}</td>
                                                        <td>{temp.fill_price.toFixed(2)}</td>
                                                        <td>{temp.quantity.toFixed(2)}</td>
                                                        <td>{fee}</td>
                                                        <td>{(temp.fill_price * temp.quantity).toFixed(2)}</td>
                                                        {/* <td><Button onChange={() => self.repeatClick(temp)}>Repeat</Button></td> */}
                                                    </tr>);
                                                })
                                                : <tr><td colSpan="8" style={{
                                                    textAlign: "center", fontWeight: "600", fontSize: "17px",
                                                    color: "black", marginTop: "30px", fontFamily: "Open Sans"
                                                }}>No Data Found</td></tr>
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