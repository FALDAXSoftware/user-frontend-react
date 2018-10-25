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
            let date1
            this.setState({month:date});
            console.log(date,type)
            if(date==0)date1="jan";
            if(date==1)date1="feb";
            if(date==2)date1="mar";
            if(date==3)date1="apr";
            if(date==4)date1="may";
            if(date==5)date1="jun";
            if(date==6)date1="jul";
            if(date==7)date1="aug";
            if(date==8)date1 = "sep";
            if(date==9)date1="oct";
            if(date==10)date1="nov";
            if(date==11)date1="dec";
            
            fields[type] = date1;
        }
        else if(type=="day")
        {
            this.setState({day:date});
            fields[type] = date;
        }
        
        console.log(fields["day"],fields["year"],fields["month"], "State ===>" ,fields,this.props)
        let propFields
        if(this.props.profileDetails.dob!==null)
        {
            propFields = this.props.profileDetails.dob.split("/");
            if(fields["day"]==undefined && propFields[2]!==undefined){fields["day"]=propFields[2]}
            if(fields["month"]==undefined && propFields[1]!==undefined){fields["month"]=propFields[1]}
            if(fields["year"]==undefined && propFields[0]!==undefined){fields["year"]=propFields[0]}
            
        }
        
        console.log(propFields)
        
        this.props.onDateChange(fields,"dob")

    }
    render()
    {
        let date,year,month,day
        if(this.props.profileDetails.dob!==undefined && this.props.profileDetails.dob!==null)
        {
            date = this.props.profileDetails.dob.split("/")
            year = Number(date[0])
            month = date[1]
            day = Number(date[2])
        }
        /* console.log(year,month,day) */
        let higherDate = new Date().getFullYear()-18;
        let lowerDate = higherDate - 100;
        console.log(higherDate,lowerDate)
        return(
            <Picker_wrap>
                <YearPicker
                    defaultValue={year?year:'Year'}
                    // default is 1900
                    start={lowerDate}
                    // default is current year
                    end={higherDate}
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