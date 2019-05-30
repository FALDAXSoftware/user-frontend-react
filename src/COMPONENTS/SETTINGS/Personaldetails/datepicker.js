/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import styled from 'styled-components';

const Picker_wrap = styled.div`
`
let fields = {};

export default class Datepicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: null, month: null, day: null, dayCSS: '', monthCSS: "", yearCSS: ''
        }
    }
    /* Life-Cycle Methods */
    componentDidMount() {
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme === false)
                    this.setState({ dayCSS: "profile-day", monthCSS: "profile-month", yearCSS: "profile-year" })
                else
                    this.setState({ dayCSS: "profile-day-night", monthCSS: "profile-month-night", yearCSS: "profile-year-night" })
            }
        }
    }

    /* 
        Page: /editProfile --> KYC/Personal Details
        It is called when date is changed.
    */

    onChangeDate(date, type) {
        if (this.props.kyc !== "kyc") {
            if (type === "year") {
                this.setState({ year: date });
                fields[type] = date;
            } else if (type === "month") {
                let date1
                console.log("Datepicker", date)
                this.setState({ month: date });
                if (date == 0) date1 = "January";
                if (date == 1) date1 = "February";
                if (date == 2) date1 = "March";
                if (date == 3) date1 = "April";
                if (date == 4) date1 = "May";
                if (date == 5) date1 = "June";
                if (date == 6) date1 = "July";
                if (date == 7) date1 = "August";
                if (date == 8) date1 = "September";
                if (date == 9) date1 = "October";
                if (date == 10) date1 = "November";
                if (date == 11) date1 = "December";

                fields[type] = date1;
            } else if (type === "day") {
                this.setState({ day: date });
                fields[type] = date;
            }
            let propFields
            /* if (this.props.profileDetails.dob !== null) {
                propFields = this.props.profileDetails.dob.split("-");
                if (fields["day"]===undefined && propFields[2] !== undefined) { fields["day"] = propFields[2] }
                if (fields["month"]===undefined && propFields[1] !== undefined) { fields["month"] = propFields[1] }
                if (fields["year"]===undefined && propFields[0] !== undefined) { fields["year"] = propFields[0] }

            } */
            console.log(fields)
            this.props.onDateChange(fields, "dob")
        }
        else {
            if (type === "year") {
                this.setState({ year: date });
                fields[type] = date;
            } else if (type === "month") {
                let date1
                this.setState({ month: date });
                if (date === 0) date1 = "January";
                if (date === 1) date1 = "February";
                if (date === 2) date1 = "March";
                if (date === 3) date1 = "April";
                if (date === 4) date1 = "May";
                if (date === 5) date1 = "June";
                if (date === 6) date1 = "July";
                if (date === 7) date1 = "August";
                if (date === 8) date1 = "September";
                if (date === 9) date1 = "October";
                if (date === 10) date1 = "November";
                if (date === 11) date1 = "December";

                fields[type] = date1;
            } else if (type === "day") {
                this.setState({ day: date });
                fields[type] = date;
            }
            let propFields
            /* if (this.props.kycData2.dob !== null && this.props.kycData2.dob !== undefined) {
                propFields = this.props.kycData2.dob.split("-");
                if (fields["day"]===undefined && propFields[2] !== undefined) { fields["day"] = propFields[2] }
                if (fields["month"]===undefined && propFields[1] !== undefined) { fields["month"] = propFields[1] }
                if (fields["year"]===undefined && propFields[0] !== undefined) { fields["year"] = propFields[0] }

            } */
            this.props.onDateChange(fields, "dob")
        }
    }

    render() {
        let date, year, month, day
        if (this.props.kyc !== undefined) {
            if (this.props.kycData2 !== "" && this.props.kycData2 !== null && this.props.kycData2 !== undefined) {
                if (this.props.kycData2.dob !== undefined && this.props.kycData2.dob !== null) {
                    date = this.props.kycData2.dob.split("-")
                    year = Number(date[2])
                    month = date[1]
                    day = Number(date[0])
                    if (month !== null) {
                        month = Number(month) - 1;
                    }
                }
            }
        } else {
            if (this.props.profileDetails.dob !== undefined && this.props.profileDetails.dob !== null) {
                if (this.props.profileDetails.dob !== undefined) {
                    date = this.props.profileDetails.dob.split("-")
                    year = Number(date[2])
                    month = date[1]
                    day = Number(date[0])
                    if (month !== null) {
                        month = Number(month) - 1;
                    }
                }
            }
        }
        let higherDate = new Date().getFullYear() - 18;
        let lowerDate = higherDate - 100;

        return (
            <Picker_wrap>
                <Row>
                    <Col md={8} xl={8}>
                        <DayPicker
                            // mandatory
                            year={this.state.year}
                            // mandatory
                            month={this.state.month}
                            // mandatory if end={} is given in YearPicker
                            endYearGiven
                            // mandatory
                            value={this.state.day !== null ? this.state.day : day ? day : ''}
                            // mandatory
                            onChange={(day) => {
                                this.onChangeDate(day, "day")
                                /* console.log(day); */
                            }}
                            id={this.state.dayCSS}
                            name={'day'}
                            optionClasses={'option-day'}
                        />
                    </Col>
                    <Col md={8} xl={8}>
                        <MonthPicker
                            // mandatory if end={} is given in YearPicker
                            endYearGiven
                            // mandatory
                            year={this.state.year}
                            // mandatory
                            value={this.state.month !== null ? this.state.month : (month !== "" && month !== null) ? month : ''}
                            // mandatory
                            onChange={(month) => {
                                this.onChangeDate(month, "month")
                                /*  console.log(month); */
                            }}
                            id={this.state.monthCSS}
                            name={'month'}
                            optionClasses={'option-month'}
                        />
                    </Col>
                    <Col md={8} xl={8}>
                        <YearPicker
                            placeholder={"Select Year"}
                            // default is 1900
                            start={lowerDate}
                            // default is current year
                            end={higherDate}
                            // default is ASCENDING
                            // mandatory
                            value={this.state.year !== null ? this.state.year : (year ? year : "")}
                            // mandatory
                            onChange={(year) => {
                                this.onChangeDate(year, "year")
                                /* console.log(year); */
                            }}
                            id={this.state.yearCSS}
                            name={'year'}
                            optionClasses={'option-year'}
                        />
                    </Col>
                </Row>
            </Picker_wrap>
        );
    }
}
