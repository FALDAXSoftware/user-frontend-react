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
    { label: 'DEPOSIT', value: 'DEPOSIT' },
    { label: 'WITHDRAW', value: 'WITHDRAW' },
];

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinList: [],

        }
    }
    componentDidMount() {
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
        return current && current < moment().endOf('day');
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
        console.log(date, dateString)
    }

    onChangeCheck(checkedValues) {
        console.log(checkedValues)
    }
    selectChange1(value) {
        console.log(value)
    }
    selectChange2(value) {
        console.log(value)
    }
    render() {
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
                                            format="YYYY-MM-DD"
                                        />
                                    </Datediv>
                                    <EXPButton onChange={() => { <CSVDownload data={csvData} target="_blank" /> }}>EXPORT</EXPButton>
                                </Filter>
                                <div style={{ paddingLeft: "15px", marginTop: "20px" }}>
                                    <CheckboxGroup options={options} onChange={this.onChangeCheck} />
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
                                                <th>repeat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                        </tbody>
                                    </HisTable>
                                </Tablediv>
                            </His_wrap>
                        </ContainerContact>
                    </Grey_wrap>
                    <CommonFooter />
                </Contact_wrap>
            </div>
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
export default connect(mapStateToProps)(History);