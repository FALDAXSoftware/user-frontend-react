/* Built-in Packages */
import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Checkbox, Select, notification } from 'antd';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";

/* components */
import LoggedNavigation from 'COMPONENTS/NAVIGATIONS/loggednavigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { globalVariables } from 'Globals';

/* STYLED-COMPONENTS */
import { ContactWrap, GreyWrap } from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle"
import {
    ContainerContact, HisTitle, HisWrap, Tablediv, HisTable, HeadHis, Filter,
    EXPButton, FontAwesomeIconS, Datediv, RangePickerS
} from "STYLED-COMPONENTS/LOGGED_STYLE/historyStyle"
import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader'

let { API_URL } = globalVariables;

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: 'BUY', value: 'BUY' },
    { label: 'SELL', value: 'SELL' },
];
const Select1 = styled(Select)`
    & .ant-select-selection
    {
        background-color:${props => props.theme.mode === "dark" ? "#01090f" : ""};
    }
    & .ant-select-arrow>i
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & .ant-select-selection-selected-value
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & .ant-select-search__field
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & .ant-select-search__field
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
`
const Select2 = styled(Select)`
& .ant-select-selection
    {
        background-color:${props => props.theme.mode === "dark" ? "#01090f" : ""};
    }
    & .ant-select-arrow>i
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & .ant-select-selection-selected-value
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & .ant-select-search__field
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
`
const CheckboxGroupS = styled(CheckboxGroup)`
    & .ant-checkbox-group-item>span
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
`
const NDF = styled.div`
    text-align: center;
    font-weight: 600;
    font-size: 17px;
    color: ${props => props.theme.mode === "dark" ? "white" : "black"};
    font-family: "Open Sans";
    height:500px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-top:1px solid #ddd;
    @media(max-width:767px)
    {
        height:300px;
    }
    @media(max-width:575px)
    {
        height:250px;
    }
    @media(max-width:375px)
    {
        height:150px;
    }
`
const SideBuySell = styled.td`
    color:${props => props.side === true ? "#59b55d" : "#f13e46"} !important;
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
            loader: false,
            csvFields: []
        }
        this.historyResult = this.historyResult.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.repeatClick = this.repeatClick.bind(this);
        this.loadCoinList = this.loadCoinList.bind(this);
        this.selectChange1 = this.selectChange1.bind(this);
        this.selectChange2 = this.selectChange2.bind(this);
    }

    /* Life-Cycle Methods */

    componentDidMount() {
        this.historyResult();
        this.loadCoinList();
    }

    /* 
        Page: /history
        It is called from componentDidMount.
        API is called to get coin-list for dropdowns.
    */

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

    /* 
        Page: /history
        It is called from componentDidMount.
        API is called to get result of user's history.
    */

    historyResult() {
        let { drop1Value, drop2Value } = this.state;
        if (drop1Value !== null && drop2Value !== null) {
            
            
            let url = API_URL + `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&toDate=${this.state.toDate}&fromDate=${this.state.fromDate}&sell=${this.state.sell}`;
            if (this.state.toDate === "" && this.state.toDate === "") {
                url = API_URL + `/get-user-history?send=${this.state.send}&receive=${this.state.receive}&buy=${this.state.buy}&sell=${this.state.sell}`
            }
            if (this.state.drop1Value !== '' && this.state.drop1Value !== '') {
                url = url + '&symbol=' + this.state.drop1Value + '-' + this.state.drop2Value
            }
            this.setState({ loader: true },()=>{
                console.log("LOADER",this.state.loader)
            })
            fetch(url, {
                method: "get",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.props.isLoggedIn
                }
            }).then(response => response.json())
                .then((responseData) => {
                    /*this.setState({myCoins:responseData});*/
                    // console.log(responseData)
                    console.log("BHess",responseData.status === 200)
                    this.setState({ loader: false },()=>{
                        console.log("LOADER",this.state.loader)
                    })
                    if (responseData.status === 200) {
                        console.log(responseData.data.length,responseData.data.length>0)
                        let csvFields = [], self = this;
                        if (responseData.data.length > 0)
                        {
                            console.log(this.state.loader,responseData.data)
                            responseData.data.map(function (temp) {
                                let obj = {};
                                var coin = temp.symbol;
                                var date = moment.utc(temp.created_at).local().format(`${self.props.profileData.date_format} HH:mm:ss`);
                                var side = Number(temp.user_id) === self.props.profileData.id ? temp.side : temp.side === "Buy" ? "Sell" : "Buy";
                                var filledPrice = temp.fill_price.toFixed(4);
                                var amount = temp.quantity.toFixed(4);
                                var fee = Number(temp.user_id) === self.props.profileData.id ? temp.user_fee.toFixed(4) : temp.requested_fee.toFixed(4);
                                var volume = (temp.fill_price * temp.quantity).toFixed(4);

                                obj['date'] = date;
                                obj['side'] = side;
                                obj['filled_price'] = filledPrice;
                                obj['amount'] = amount;
                                obj['fee'] = fee;
                                obj['volume'] = volume;

                                console.log("ABCD",csvFields);
                                console.log("ABCD sg",obj);
                                csvFields.push(obj);
                            })
                            console.log("200 Response",this.state.loader);
                        }
                        console.log("200 Response",this.state.loader)
                        this.setState({ historyData: responseData.data, csvFields });
                    }
                    else
                        this.openNotificationWithIcon('error', "Error", responseData.err);


                        console.log("200 Response",this.state.loader)
                        this.setState({ loader: false })
                })
                .catch(error => {
                })
        }
    }

    /* 
        Page: /history
        It is called to show start and end of date-picker.
    */

    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    /* 
        Page: /history
        It is called to disable the date of today and before today.
    */

    disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

    /* 
        Page: /history
        It is called to set range which is valid.
    */

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

    /* 
        Page: /history
        It is called when a date is selected between a Range .
    */

    changeDate(date, dateString) {
        var self = this;
        var fromDate = "";
        fromDate = dateString[0]
        var toDate = ""
        toDate = dateString[1]

        this.setState({ toDate, fromDate }, () => {
            self.historyResult();
        });
    }

    /* 
        Page: /history
        It is called when we check any of the checkboxes .
    */

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

    /* 
        Page: /history
        It is called when a change happens in Select Tag for Coin first.
    */

    selectChange1(value) {
        var self = this;
        let coinList = [...this.state.coinList];
        for (let index = 0; index < coinList.length; index++) {
            const element = coinList[index];
            if (element.coin === value) {
                coinList.splice(index, 1);
                break;
            }
        }
        if (this.state.drop2Value !== "")
            this.setState({
                drop2List: coinList,
                drop1Value: value
            }, () => {
                self.historyResult();
            });
        else
            this.setState({
                drop2List: coinList,
                drop1Value: value,
                drop2Value: null
            }, () => {
                self.historyResult();
            });
    }

    /* 
        Page: /history
        It is called when a change happens in Select Tag for Coin second.
    */

    selectChange2(value) {
        var self = this;
        let coinList = [...this.state.coinList];
        for (let index = 0; index < coinList.length; index++) {
            const element = coinList[index];
            if (element.coin === value) {
                coinList.splice(index, 1);
                break;
            }
        }
        if (this.state.drop1Value !== "")
            this.setState({
                drop1List: coinList,
                drop2Value: value
            }, () => {
                self.historyResult();
            });
        else
            this.setState({
                drop1List: coinList,
                drop2Value: value,
                drop1Value: null
            }, () => {
                self.historyResult();
            });
    }

    /* 
        Page: /history
        It is called when u call repeat button in history table.
    */

    repeatClick(data) {
        if (data.order_type === "Limit") {
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
                    if (responseData.status === 200) {
                        this.historyResult();
                    } else {
                    }
                }).catch(error => {
                    this.openNotificationWithIcon('error', 'Error', "Something went wrong!");

                });
        }
        else if (data.order_type === "StopLimit") {
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
                    if (responseData.status === 200) {
                        this.historyResult();
                    } else {

                    }
                }).catch(error => {
                    this.openNotificationWithIcon('error', 'Error', "Something went wrong!");

                });
        }
        else if (data.order_type === "Market") {
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
                    if (responseData.status === 200) {
                        this.historyResult();
                    } else {

                    }
                }).catch(error => {
                    this.openNotificationWithIcon('error', 'Error', "Something went wrong!");
                });
        }
    }

    /* 
        Page: /history
        It is called for custom notifications.
    */

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
            duration: 5
        });
    };

    render() {
        var self = this;
        console.log("Render",this.state)
        return (
            <div>
                <ContactWrap>
                    <LoggedNavigation />
                    <GreyWrap>
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
                                        <FontAwesomeIconS icon={faExchangeAlt} color='#909090' />
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
                                    {this.state.csvFields !== undefined ? this.state.csvFields.length > 0 ? <EXPButton><CSVLink data={this.state.csvFields}>EXPORT</CSVLink></EXPButton> : "" : ""}
                                </Filter>
                                <div style={{ paddingLeft: "15px", marginTop: "20px" }}>
                                    <CheckboxGroupS options={options} defaultValue={['SEND', 'RECEIVE', 'SELL', 'BUY']} onChange={this.onChangeCheck} />
                                </div>
                            </HeadHis>
                            <HisWrap>
                                <HisTitle>HISTORY</HisTitle>
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
                                        {console.log(this.state.historyData)}
                                        {this.state.historyData !== undefined ?
                                            this.state.historyData.length > 0 ?
                                                <tbody>
                                                    {this.state.historyData.map(function (temp) {
                                                        var date = moment.utc(temp.created_at).local().format(`${self.props.profileData.date_format} HH:mm:ss`);
                                                        var side = Number(temp.user_id) === self.props.profileData.id ? temp.side : temp.side === "Buy" ? "Sell" : "Buy";
                                                        var fee = Number(temp.user_id) === self.props.profileData.id ? temp.user_fee.toFixed(4) : temp.requested_fee.toFixed(4);
                                                        return (<tr>
                                                            <td>{temp.symbol}</td>
                                                            <td>{date}</td>
                                                            {/* {console.log(side)} */}
                                                            <SideBuySell side={side === "Buy" ? true : false}>{side}</SideBuySell>
                                                            <td>{temp.fill_price.toFixed(4)}</td>
                                                            <td>{temp.quantity.toFixed(4)}</td>
                                                            <td>{fee}</td>
                                                            <td>{(temp.fill_price * temp.quantity).toFixed(4)}</td>
                                                            {/* <td><Button onChange={() => self.repeatClick(temp)}>Repeat</Button></td> */}
                                                        </tr>);
                                                    })}
                                                </tbody>
                                                : <NDF colSpan="8" >No Data Found</NDF> : ""
                                        }
                                    </HisTable>
                                </Tablediv>
                            </HisWrap>
                        </ContainerContact>
                    </GreyWrap>
                    <CommonFooter />
                    {(this.state.loader===true) ?
                        <FaldaxLoader />
                        : ""
                    }
                </ContactWrap>
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