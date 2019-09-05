import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Input, notification, Checkbox } from 'antd';
/* import { DropdownButton, ButtonToolbar } from 'react-bootstrap'; */
import styled from 'styled-components';
import SimpleReactValidator from "simple-react-validator";
import moment from 'moment';

import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader';
import { globalVariables } from 'Globals';

/* Styled-Components */
import { Heading, NotificationTable, WrapTable, AddButton } from 'STYLED-COMPONENTS/SETTINGS/accsettingsStyle'

let { API_URL } = globalVariables;



class ThreshholdNotification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            thresholdData: [],
            savedData: [],
            loader: false
        };
        this.validator = new SimpleReactValidator({
            lowerpositiveDecimal: { // name the rule
                message: 'Lower limit should be only positive decimals', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^(\d*\.)?\d+$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            },
            upperpositiveDecimal: { // name the rule
                message: 'Upper limit should be only positive decimals', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^(\d*\.)?\d+$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            },
        });
        this.columns = [
            {
                title: 'Coin',
                dataIndex: 'coin',
                key: 'coin',
            },
            {
                title: 'Lower Limit',
                dataIndex: 'lower_limit',
                key: 'lower_limit',
                align: "center",
                render: (value, record) => (
                    <div>
                        <Input
                            type="number"
                            min={0}
                            key={record.coin_id}
                            defaultValue={value}
                            onChange={(e) => this.inputChange("lower_limit", e, record)}
                            style={{ width: "150px" }}
                        />{` USD`}
                        {console.log(value, record)}
                        {this.validator.message("lower_limit", value, "required|lowerpositiveDecimal", "text-danger-validation", { required: "Lower limit is required." })}
                    </div>
                ),
            },
            {
                title: 'Upper Limit',
                dataIndex: 'upper_limit',
                key: 'upper_limit',
                align: "center",
                render: (value, record) => (
                    <div>
                        <Input
                            type="number"
                            min={0}
                            key={record.coin_id}
                            defaultValue={value}
                            onChange={(e) => this.inputChange("upper_limit", e, record)}
                            style={{ width: "150px" }}
                        />{` USD`}
                        {console.log(value, record)}
                        {this.validator.message("upper_limit", value, "required|upperpositiveDecimal", "text-danger-validation", { required: "Upper limit is required." })}
                    </div>
                ),
            },
            {
                title: 'Email Notification',
                key: 'is_email_notification',
                dataIndex: 'is_email_notification',
                align: "center",
                render: (value, record) => {
                    console.log(value, record);
                    return <Checkbox defaultChecked={value} key={record.coin_id} onChange={(e) => this.checkChange("is_email_notification", e, record)}></Checkbox>
                },
            },
            {
                title: 'SMS Notification',
                key: 'is_sms_notification',
                dataIndex: 'is_sms_notification',
                align: "center",
                render: (value, record) => {
                    console.log(value, record);
                    return <Checkbox defaultChecked={value} key={record.coin_id} onChange={(e) => this.checkChange("is_sms_notification", e, record)}></Checkbox>
                },
            },
        ];
        this.getData = this.getData.bind(this);
        this.addData = this.addData.bind(this);
        this.checkChange = this.checkChange.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    openNotificationWithIcon = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
            duration: 3,
        });
    }
    checkChange(key, e, record) {
        console.log(key, e.target.checked, record);
        const { thresholdData } = this.state;
        var tempData = thresholdData;
        (tempData).map(function (data, index) {
            if (data.coin_id == record.coin_id) {
                console.log(tempData[key])
                if (key == "is_email_notification")
                    tempData[index].is_email_notification = e.target.checked;
                else
                    tempData[index].is_sms_notification = e.target.checked;

            }
        })
        console.log("------>>>>>", tempData)
        this.setState({ thresholdData: tempData })
    }
    inputChange(key, e, record) {
        console.log(key, e.target.value, record)
        const { thresholdData } = this.state;
        var tempData = thresholdData;
        (tempData).map(function (data, index) {
            if (data.coin_id == record.coin_id) {
                console.log(tempData[key])
                if (key == "lower_limit")
                    tempData[index].lower_limit = Number(e.target.value);
                else
                    tempData[index].upper_limit = Number(e.target.value);
            }
        })
        console.log("------>>>>>", tempData)
        this.setState({ thresholdData: tempData })
    }
    getData() {

        let self = this;

        fetch(API_URL + `/users/get-user-thresholds`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn,
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.status == 200) {
                    console.log(responseData.data);
                    let b = JSON.parse(JSON.stringify(responseData.data));

                    self.setState({
                        thresholdData: b,
                        savedData: responseData.data
                    });
                }
                else {
                    self.openNotificationWithIcon("error", responseData.status, responseData.err);
                }
                self.setState({ loader: false });
            })
            .catch(error => {
                self.openNotificationWithIcon("error", "Error", "Something went wrong!");
                self.setState({ loader: false })
            })
    }
    addData() {
        if (this.validator.allValid()) {
            const { thresholdData } = this.state;
            this.setState({
                loader: true
            })
            fetch(API_URL + `/users/add-thresholds-limits`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + this.props.isLoggedIn,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(thresholdData)
            })
                .then(response => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    if (responseData.status == 200) {
                        console.log(responseData.data);
                        let b = JSON.parse(JSON.stringify(responseData.data));

                        this.setState({
                            thresholdData: responseData.data,
                            savedData: b
                        });
                    }
                    else {
                        this.openNotificationWithIcon("error", responseData.status, responseData.err);
                    }
                    this.setState({ loader: false });
                })
                .catch(error => {
                    this.openNotificationWithIcon("error", "Error", "Something went wrong!");
                    this.setState({ loader: false })
                })
        }
        else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }
    render() {
        const { thresholdData, savedData } = this.state;
        console.log(JSON.stringify(savedData) === JSON.stringify(thresholdData), savedData, "------>", thresholdData);
        let disabled = true;
        if (JSON.stringify(savedData) === JSON.stringify(thresholdData)) {
            disabled = true;
        }
        else {
            disabled = false;
        }
        return (
            <div>
                <Heading style={{ marginTop: "10px" }}>
                    <span>Threshold Notifications</span>
                </Heading>
                {console.log("------------->", thresholdData)}
                <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <WrapTable>
                        <NotificationTable
                            columns={this.columns}
                            bordered={true}
                            dataSource={thresholdData}
                            pagination={{ pageSize: 5, size: "small" }}
                        />
                    </WrapTable>
                </div>
                <AddButton disabled={disabled} onClick={this.addData}>Save</AddButton>
                {(this.state.loader === true) ?
                    <FaldaxLoader />
                    : ""
                }
            </div>
        );
    }


}

export default ThreshholdNotification;