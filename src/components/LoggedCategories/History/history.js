import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import moment from 'moment';
import { DatePicker,Checkbox  } from 'antd';
import { DropdownButton,MenuItem,ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons';

import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import {Contact_wrap, Grey_wrap} from "../../../styled-components/landingCategories/contactStyle"
import {ContainerContact,His_title,His_wrap,Tablediv,HisTable,HeadHis,Filter,EXPButton,Dropwrap,Dropwrap2,ButtonToolbarOne,DropdownButtonOne,Datediv,RangePickerS} from "../../../styled-components/loggedStyle/historyStyle"

const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: 'BUY', value: 'BUY' },
    { label: 'SELL', value: 'SELL' },
    { label: 'DEPOSIT', value: 'DEPOSIT' },
    { label: 'WITHDRAW', value: 'WITHDRAW' },
  ];

export default class History extends React.Component
{
    range(start, end) 
    {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        console.log(result);
        return result;
    }
    disabledDate(current) 
    {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    isabledRangeTime(_, type) 
    {
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
    changeDate(date: moment, dateString: string)
    {
        console.log(date,dateString)
    }
    onChangeCheck(checkedValues) {
        console.log('checked = ', checkedValues);
      }
    render()
    {
        
        return(
            <div>
                <Contact_wrap>
                    <LoggedNavigation />
                    <Grey_wrap>
                    <ContainerContact>
                        <HeadHis>
                            <Filter>
                                <div style={{display:"inline-flex",width:"390px",alignItems:"center"}}>
                                    <Dropwrap>
                                        <ButtonToolbarOne>
                                            <DropdownButtonOne title="Bitcoin" id="dropdown-size-medium">
                                                <MenuItem eventKey="1">Action</MenuItem>
                                                <MenuItem eventKey="2">Another action</MenuItem>
                                                <MenuItem eventKey="3">Something else here</MenuItem>
                                                <MenuItem eventKey="4">Separated link</MenuItem>
                                            </DropdownButtonOne>
                                        </ButtonToolbarOne>
                                    </Dropwrap>
                                    <FontAwesomeIcon icon={faExchangeAlt} color='#909090' style={{margin:"0px 20px"}}/>
                                    <Dropwrap2>
                                        <ButtonToolbarOne>
                                            <DropdownButtonOne title="Bitcoin" id="dropdown-size-medium">
                                                <MenuItem eventKey="1">Action</MenuItem>
                                                <MenuItem eventKey="2">Another action</MenuItem>
                                                <MenuItem eventKey="3">Something else here</MenuItem>
                                                <MenuItem eventKey="4">Separated link</MenuItem>
                                            </DropdownButtonOne>
                                        </ButtonToolbarOne>
                                    </Dropwrap2>
                                </div>
                                <Datediv>
                                    <RangePickerS
                                        disabledDate={this.disabledDate}
                                        disabledTime={this.disabledRangeTime}
                                        onChange={this.changeDate}
                                        format="YYYY-MM-DD"
                                    />
                                </Datediv>
                                <EXPButton>EXPORT</EXPButton>
                            </Filter>
                            <div style={{paddingLeft:"15px",marginTop:"20px"}}>
                                <CheckboxGroup options={options} defaultValue={['Apple']} onChange={this.onChangeCheck} />
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