import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import styled from "styled-components";

const Picker_wrap = styled.div`

`
let fields = {};
export default class Datepicker extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            year: null, month: null, day: null
        }
    }

    onChangeDate(date,type)
    {
        if(type=="year")
        {
            this.setState({year:date});
            fields[type] = date;
        }
        else if(type=="month")
        {
            this.setState({month:date});
            fields[type] = Number(date) + 1;
        }
        else if(type=="day")
        {
            this.setState({day:date});
            fields[type] = date;
        }
        
        /* console.log(fields["day"],fields["year"],fields["month"], "State ===>" ,fields) */
        if(fields["day"]!==undefined && fields["year"]!==undefined && fields["month"]!==undefined)
        {
            this.props.onDateChange(fields)
        }

    }
    render()
    {
        let date,year,month,day
        if(this.props.profileDetails.dob!==undefined && this.props.profileDetails.dob!==null)
        {
            date = this.props.profileDetails.dob.split("/")
            year = Number(date[0])
            month = Number(date[1])
            day = Number(date[2])
        }
        /* console.log(year,month,day) */
        
        return(
            <Picker_wrap>
                <YearPicker
                    defaultValue={year?year:'Year'}
                    // default is 1900
                    start={1920}
                    // default is current year
                    end={2020}
                    // default is ASCENDING
                    reverse
                    // mandatory
                    value={this.state.year}
                    // mandatory
                    onChange={(year) => {
                        this.onChangeDate(year,"year")
                        /* console.log(year); */
                    }}
                    id={'profile-year'}
                    name={'year'}
                    optionClasses={'option-year'}
                />
                <MonthPicker
                    defaultValue={month?month:'Month'}
                    // default is full name
                    short
                    // default is Titlecase
                    caps
                    // mandatory if end={} is given in YearPicker
                    endYearGiven
                    // mandatory
                    year={this.state.year}
                    // mandatory
                    value={this.state.month}
                    // mandatory
                    onChange={(month) => {
                        this.onChangeDate(month,"month")
                       /*  console.log(month); */
                    }}
                    id={'profile-month'}
                    name={'month'}
                    optionClasses={'option-month'}
                />
                <DayPicker
                    defaultValue={day?day:'Day'}
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
                        this.onChangeDate(day,"day")
                        /* console.log(day); */
                    }}
                    id={'profile-day'}
                    name={'day'}
                    optionClasses={'option-day'}
                />
            </Picker_wrap>
        );
    }
}