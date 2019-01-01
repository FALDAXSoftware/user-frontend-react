import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import styled from "styled-components";

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

    componentDidMount() {
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme == false)
                    this.setState({ dayCSS: "profile-day", monthCSS: "profile-month", yearCSS: "profile-year" })
                else
                    this.setState({ dayCSS: "profile-day-night", monthCSS: "profile-month-night", yearCSS: "profile-year-night" })
            }
        }
    }
    onChangeDate(date, type) {
        if (this.props.kyc !== "kyc") {
            if (type == "year") {
                this.setState({ year: date });
                fields[type] = date;
            } else if (type == "month") {
                let date1
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
            } else if (type == "day") {
                this.setState({ day: date });
                fields[type] = date;
            }
            let propFields
            if (this.props.profileDetails.dob !== null) {
                propFields = this.props.profileDetails.dob.split("/");
                if (fields["day"] == undefined && propFields[2] !== undefined) { fields["day"] = propFields[2] }
                if (fields["month"] == undefined && propFields[1] !== undefined) { fields["month"] = propFields[1] }
                if (fields["year"] == undefined && propFields[0] !== undefined) { fields["year"] = propFields[0] }

            }
            this.props.onDateChange(fields, "dob")
        } else {
            if (type == "year") {
                this.setState({ year: date });
                fields[type] = date;
            } else if (type == "month") {
                let date1
                this.setState({ month: date });
                date1 = '0' + date;
                fields[type] = date1;
            } else if (type == "day") {
                this.setState({ day: date });
                let date1 = '0' + date;
                fields[type] = date1;
            }
            this.props.onDateChange(fields, "dob")
        }
    }

    render() {
        let date, year, month, day
        if (this.props.kyc !== undefined) {
        } else {
            if (this.props.profileDetails.dob !== undefined && this.props.profileDetails.dob !== null) {
                date = this.props.profileDetails.dob.split("/")
                year = Number(date[0])
                month = date[1]
                day = Number(date[2])
            }
        }
        let higherDate = new Date().getFullYear() - 18;
        let lowerDate = higherDate - 100;

        return (
            <Picker_wrap>
                <DayPicker
                    defaultValue={day ? day : ''}
                    // mandatory
                    year={this.state.year}
                    // mandatory
                    month={this.state.month}
                    // mandatory if end={} is given in YearPicker
                    endYearGiven
                    // mandatory
                    value={this.state.day}
                    // mandatory
                    onChange={(day) => {
                        this.onChangeDate(day, "day")
                        /* console.log(day); */
                    }}
                    id={this.state.dayCSS}
                    name={'day'}
                    optionClasses={'option-day'}
                />

                <MonthPicker
                    defaultValue={month ? month : ''}
                    // mandatory if end={} is given in YearPicker
                    endYearGiven
                    caps
                    // mandatory
                    year={this.state.year}
                    // mandatory
                    value={this.state.month}
                    // mandatory
                    onChange={(month) => {
                        this.onChangeDate(month, "month")
                        /*  console.log(month); */
                    }}
                    id={this.state.monthCSS}
                    name={'month'}
                    optionClasses={'option-month'}
                />
                <YearPicker
                    defaultValue={year ? year : ''}
                    // default is 1900
                    start={lowerDate}
                    // default is current year
                    end={higherDate}
                    // default is ASCENDING
                    // mandatory
                    value={this.state.year}
                    // mandatory
                    onChange={(year) => {
                        this.onChangeDate(year, "year")
                        /* console.log(year); */
                    }}
                    id={this.state.yearCSS}
                    name={'year'}
                    optionClasses={'option-year'}
                />
            </Picker_wrap>
        );
    }
}
