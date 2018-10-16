import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from "styled-components";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { globalVariables } from '../../../Globals';

let { API_URL } = globalVariables;
const Option = Select.Option;
let Countries = [];


export default class CountryPick extends React.Component
{

    constructor(props){
        super(props);
        this.state={
            countries:[],
            country_selected:""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
       /*  console.log(`selected ${value}`); */
       this.setState({country_selected:value});
        this.props.onCountryChange(value);
    }

    handleBlur() {
        /* console.log('blur'); */
    }

    componentDidMount() 
    {
        fetch(API_URL + '/users/countries',{
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
        console.log(this.props,this.props.profileDetails.country)
        return(
            <Select
                showSearch
                value={this.state.country_selected!==""?this.state.country_selected:this.props.profileDetails.country}
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
  
