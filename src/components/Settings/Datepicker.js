import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import styled from "styled-components";

const Picker_wrap = styled.div`

`
export default class Datepicker extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            year: null, month: null, day: null
        }
    }
    
    render()
    {
        return(
            <Picker_wrap>
                <YearPicker
                    defaultValue={'Year'}
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
                        this.setState({ year });
                        console.log(year);
                    }}
                    id={'profile-year'}
                    name={'year'}
                    optionClasses={'option-year'}
                />
                <MonthPicker
                    defaultValue={'Month'}
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
                        this.setState({ month });
                        console.log(month);
                    }}
                    id={'profile-month'}
                    name={'month'}
                    optionClasses={'option-month'}
                />
                <DayPicker
                    defaultValue={'Day'}
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
                        this.setState({ day });
                        console.log(day);
                    }}
                    id={'profile-day'}
                    name={'day'}
                    optionClasses={'option-day'}
                />
            </Picker_wrap>
        );
    }
}