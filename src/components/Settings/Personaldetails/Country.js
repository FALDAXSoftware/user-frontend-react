import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from "styled-components";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const Option = Select.Option;
let Countries = [];


export default class CountryPick extends React.Component
{

    constructor(props){
        super(props);
        this.state={
            countries:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.props.onCountryChange(value);
    }
    handleBlur() {
        console.log('blur');
    }
    componentDidMount() {
        fetch('http://192.168.2.224:1337/user/countries',{
        method:"get",
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:"Bearer " + this.props.isLoggedIn
        }})
        .then(response => response.json())
        .then((responseData) => {
            this.setState({countries:responseData.data,fetching:false,callOnce:true});
            console.log(responseData)
            Countries = responseData.data;
        
        });
    }
    
    render()
    {
        console.log(this.state,this.props)
        return(
            <Select
                showSearch
                defaultValue={this.props.profileDetails.country}
                placeholder="Select a Country"
                className="Country_Select"
                optionFilterProp="children"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {this.state.countries.map((country,index) => <Option key={index} value={country.name}>{country.name}</Option>)}
            </Select>
        );
    }
}
  
